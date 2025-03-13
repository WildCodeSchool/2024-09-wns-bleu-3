import axios from 'axios'
import { scanUrl } from '../utils/scanUrl'
import { getSSLCertificateExpireTime } from '../utils/getSSLCertificateExpiration'

// Mock axios and getSSLCertificateExpireTime
jest.mock('axios')
jest.mock('./getSSLCertificateExpiration')

const mockedAxios = axios as any;
const mockedGetSSLCertificateExpireTime = getSSLCertificateExpireTime as any;

describe('scanUrl', () => {
    it.only('should return valid url data', async () => {
        const url = 'https://example.com/'
        const response = {
            status: 200,
            statusText: 'OK',
            data: {},
        }
        const expireTime = '2023-12-31T23:59:59Z'

        mockedAxios.get.mockResolvedValue(response)
        mockedGetSSLCertificateExpireTime.mockResolvedValue(expireTime)

        const result = await scanUrl(url)

        expect(result).toEqual({
            url,
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: expect.any(Number),
            sslCertificate: expireTime,
            isOnline: true,
        })
    })

    it('should return an error for invalid URL', async () => {
        const url = 'invalid-url'

        const result = await scanUrl(url)

        expect(result).toEqual({ error: 'An error occured' })
    })
})