import { beforeEach, describe, expect, it, vi } from 'vitest'
import ScanResolver from 'src/resolver/ScanResolver'
import { scanUrl } from 'src/utils/scanUrl'

// Mock the scanUrl utility
vi.mock('src/utils/scanUrl')

describe('scanResolver - previewScan', () => {
    let scanResolver: ScanResolver

    beforeEach(() => {
        vi.resetAllMocks()
        scanResolver = new ScanResolver()
    })

    it('should return scan preview data for a valid URL', async () => {
        // Arrange: Mock successful scanUrl response
        const mockScanResult = {
            url: 'https://example.com',
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: 150,
            sslCertificate: '30 days',
            isOnline: true,
        }

        vi.mocked(scanUrl).mockResolvedValue(mockScanResult)

        // Act: Call the previewScan query
        const result = await scanResolver.previewScan('https://example.com')

        // Assert: Verify the result matches expected structure
        expect(scanUrl).toHaveBeenCalledWith('https://example.com')
        expect(result).toEqual({
            url: 'https://example.com',
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: 150,
            sslCertificate: '30 days',
            isOnline: true,
        })
    })

    it('should throw an error when scanUrl returns an error', async () => {
        // Arrange: Mock scanUrl to return an error
        const mockErrorResult = { error: 'Invalid URL format' }
        vi.mocked(scanUrl).mockResolvedValue(mockErrorResult)

        // Act & Assert: Expect the query to throw an error
        await expect(scanResolver.previewScan('invalid-url')).rejects.toThrow('Invalid URL format')
        expect(scanUrl).toHaveBeenCalledWith('invalid-url')
    })

    it('should handle different status codes correctly', async () => {
        // Arrange: Mock scanUrl with different status codes
        const mockScanResult = {
            url: 'https://example.com',
            statusCode: 404,
            statusMessage: 'Not Found',
            responseTime: 75,
            sslCertificate: 'Error retrieving SSL expiry',
            isOnline: false,
        }

        vi.mocked(scanUrl).mockResolvedValue(mockScanResult)

        // Act: Call the previewScan query
        const result = await scanResolver.previewScan('https://example.com')

        // Assert: Verify the result includes the error status
        expect(result).toEqual({
            url: 'https://example.com',
            statusCode: 404,
            statusMessage: 'Not Found',
            responseTime: 75,
            sslCertificate: 'Error retrieving SSL expiry',
            isOnline: false,
        })
    })

    it('should handle SSL certificate errors gracefully', async () => {
        // Arrange: Mock scanUrl with SSL error
        const mockScanResult = {
            url: 'https://example.com',
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: 100,
            sslCertificate: 'Error retrieving SSL expiry',
            isOnline: true,
        }

        vi.mocked(scanUrl).mockResolvedValue(mockScanResult)

        // Act: Call the previewScan query
        const result = await scanResolver.previewScan('https://example.com')

        // Assert: Verify SSL error is handled
        expect(result.sslCertificate).toBe('Error retrieving SSL expiry')
        expect(result.isOnline).toBe(true)
    })
})
