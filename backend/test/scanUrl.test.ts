import { scanUrl } from 'src/utils/scanUrl'
import axios from 'axios'
import { getSSLCertificateExpireTime } from 'src/utils/getSSLCertificateExpiration'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('axios')
vi.mock('src/utils/getSSLCertificateExpiration')

describe('scanUrl', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it.concurrent.for([
        [200, 'OK', true],
        [201, 'Created', true],
        [301, 'Moved Permanently', false],
        [403, 'Forbidden', false],
        [500, 'Internal Server Error', false],
    ])('should return a valid scan response for status %i (%s)', async ([statusCode, statusMessage, isOnline]) => {
        // vi.mocked is a type help to use the mocked function

        vi.mocked(axios.get).mockResolvedValue({
            status: statusCode,
            statusText: statusMessage,
            data: {},
        })

        vi.mocked(getSSLCertificateExpireTime).mockResolvedValue('30 days')

        const result = await scanUrl('https://example.com')

        expect(axios.get).toHaveBeenCalledWith('https://example.com', expect.any(Object))

        expect(result).toEqual({
            url: 'https://example.com',
            statusCode,
            statusMessage,
            responseTime: expect.any(Number),
            sslCertificate: '30 days',
            isOnline,
        })
    })

    it('should handle SSL certificate fetch failure gracefully', async () => {
        vi.mocked(axios.get).mockResolvedValue({
            status: 200,
            statusText: 'OK',
            data: {},
        })

        vi.mocked(getSSLCertificateExpireTime).mockRejectedValue(new Error('SSL failed'))

        const result = await scanUrl('https://example.com')

        expect(result).toEqual({
            url: 'https://example.com',
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: expect.any(Number),
            sslCertificate: 'Error retrieving SSL expiry',
            isOnline: true,
        })
    })

    it('should not create scan if URL is invalid', async () => {
        const result = await scanUrl('https://invalid-url')

        expect(result).toEqual({
            error: 'An error occured',
        })
    })

    it('should handle network timeout errors', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('ECONNABORTED: timeout'))

        const result = await scanUrl('https://example.com')

        expect(result).toEqual({
            error: 'An error occured',
        })
    })

    it('should handle network connection errors', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('ENOTFOUND: getaddrinfo'))

        const result = await scanUrl('https://nonexistent-domain.com')

        expect(result).toEqual({
            error: 'An error occured',
        })
    })

    it('should handle malformed URLs', async () => {
        const result = await scanUrl('not-a-url')

        expect(result).toEqual({
            error: 'An error occured',
        })
    })

    it('should handle empty URL', async () => {
        const result = await scanUrl('')

        expect(result).toEqual({
            error: 'An error occured',
        })
    })
})
