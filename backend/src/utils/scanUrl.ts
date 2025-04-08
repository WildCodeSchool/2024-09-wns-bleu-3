import axios from 'axios'
import z from 'zod'
import { getSSLCertificateExpireTime } from './getSSLCertificateExpiration'

const scanUrlResponseSchema = z.object({
    url: z.string().url(),
    statusCode: z.number(),
    statusMessage: z.string(),
    responseTime: z.number(),
    sslCertificate: z.string().optional(),
    isOnline: z.boolean(),
})

// To create a type with the zod schema
type scanUrlResponse = z.infer<typeof scanUrlResponseSchema>

export async function scanUrl(url: string): Promise<scanUrlResponse | { error: string }> {
    // To verify if the URL is an url with the Zod schema
    const urlParse = scanUrlResponseSchema.shape.url.safeParse(url)
    if (!urlParse.success) {
        return { error: 'An error occur' }
    }
    try {
        // To do the request, validateStatus on true to retrieve all the status code without the catch
        const startTime = Date.now()

        const response = await axios.get(url, { timeout: 5000, validateStatus: () => true })

        const endTime = Date.now()

        // To get the responseTime
        const responseTime = endTime - startTime

        // Use the function to get the time remaining to SSL expiration
        let expireTime = ''
        try {
            expireTime = await getSSLCertificateExpireTime(url)
        } catch (error) {
            console.error({ 'An error occured in getSSLCertificateExpireTime': error })
            expireTime = 'Error retrieving SSL expiry'
        }

        console.log(response.data)
        console.log(response)

        const urlData = {
            url,
            statusCode: response.status,
            statusMessage: response.statusText,
            responseTime,
            sslCertificate: expireTime || '',
            isOnline: response.status >= 200 && response.status < 300,
        }

        // Parse urlData into Zod Schema
        const result = scanUrlResponseSchema.safeParse(urlData)

        if (!result.success) {
            throw new Error('Invalid response structure')
        }

        return result.data
    }
    catch (error) {
        console.error({ 'An error occured in scanUrl': error })
        return {
            error: 'An error occured',
        }
    }
}
