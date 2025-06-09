import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ScanResolver from 'src/resolver/ScanResolver'
import { scanUrl } from 'src/utils/scanUrl'
import { User } from 'src/entities/User'
import { Scan } from 'src/entities/Scan'
import { Tag } from 'src/entities/Tag'
import { Frequency } from 'src/entities/Frequency'
import { pubSub } from 'src/utils/pubSub'
import { ContextType } from 'src/schema/context'

// Mock external dependencies
vi.mock('src/utils/scanUrl')
vi.mock('src/entities/User')
vi.mock('src/entities/Scan')
vi.mock('src/entities/Tag')
vi.mock('src/entities/Frequency')
vi.mock('src/utils/pubSub')

describe('scanResolver - createNewScan', () => {
    let scanResolver: ScanResolver
    let mockContext: ContextType

    beforeEach(() => {
        vi.resetAllMocks()
        scanResolver = new ScanResolver()

        // Mock authenticated context
        mockContext = {
            id: 1,
            email: 'test@example.com',
        } as ContextType
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should throw error when user is not authenticated', async () => {
        // Arrange: Mock unauthenticated context
        const unauthenticatedContext = { id: undefined } as ContextType
        const scanInput = {
            title: 'Test Scan',
            url: 'https://example.com',
            tagIds: [],
            frequencyId: 1,
        }

        // Act & Assert: Expect authentication error
        await expect(
            scanResolver.createNewScan(scanInput, unauthenticatedContext),
        ).rejects.toThrow('You must be logged in to create a scan')
    })

    it('should create scan successfully for authenticated user', async () => {
        // Arrange: Mock successful dependencies
        const mockUser = { id: 1, email: 'test@example.com' }
        const mockScanResult = {
            url: 'https://example.com',
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: 150,
            sslCertificate: '30 days',
            isOnline: true,
        }
        const mockSavedScan = {
            id: 1,
            title: 'Test Scan',
            ...mockScanResult,
            user: mockUser,
            save: vi.fn(),
        }
        // Set up the save mock to return the scan object
        mockSavedScan.save.mockResolvedValue(mockSavedScan)

        vi.mocked(User.findOneByOrFail).mockResolvedValue(mockUser as any)
        vi.mocked(scanUrl).mockResolvedValue(mockScanResult)
        vi.mocked(Scan.create).mockReturnValue(mockSavedScan as any)
        vi.mocked(pubSub.publish).mockImplementation(() => {})

        const scanInput = {
            title: 'Test Scan',
            url: 'https://example.com',
            tagIds: [],
            frequencyId: undefined,
        }

        // Act: Call createNewScan
        const result = await scanResolver.createNewScan(scanInput, mockContext)

        // Assert: Verify the scan was created correctly
        expect(User.findOneByOrFail).toHaveBeenCalledWith({ id: 1 })
        expect(scanUrl).toHaveBeenCalledWith('https://example.com')
        expect(Scan.create).toHaveBeenCalledWith({
            title: 'Test Scan',
            url: 'https://example.com',
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: 150,
            sslCertificate: '30 days',
            isOnline: true,
            user: mockUser,
        })
        expect(mockSavedScan.save).toHaveBeenCalled()
        expect(pubSub.publish).toHaveBeenCalledWith('SCAN_CREATED', mockSavedScan)
        expect(result).toBe(mockSavedScan)
    })

    it('should handle tags when provided', async () => {
        // Arrange: Mock with tags
        const mockUser = { id: 1, email: 'test@example.com' }
        const mockTags = [{ id: 1, name: 'Production' }, { id: 2, name: 'API' }]
        const mockScanResult = {
            url: 'https://example.com',
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: 150,
            sslCertificate: '30 days',
            isOnline: true,
        }
        const mockSavedScan = {
            id: 1,
            title: 'Test Scan',
            ...mockScanResult,
            user: mockUser,
            tags: mockTags,
            save: vi.fn(),
        }
        // Set up the save mock to return the scan object
        mockSavedScan.save.mockResolvedValue(mockSavedScan)

        vi.mocked(User.findOneByOrFail).mockResolvedValue(mockUser as any)
        vi.mocked(scanUrl).mockResolvedValue(mockScanResult)
        vi.mocked(Tag.findByIds).mockResolvedValue(mockTags as any)
        vi.mocked(Scan.create).mockReturnValue(mockSavedScan as any)
        vi.mocked(pubSub.publish).mockImplementation(() => {})

        const scanInput = {
            title: 'Test Scan',
            url: 'https://example.com',
            tagIds: [1, 2],
            frequencyId: undefined,
        }

        // Act: Call createNewScan
        await scanResolver.createNewScan(scanInput, mockContext)

        // Assert: Verify tags were handled
        expect(Tag.findByIds).toHaveBeenCalledWith([1, 2])
        expect(mockSavedScan.tags).toEqual(mockTags)
    })

    it('should handle frequency when provided', async () => {
        // Arrange: Mock with frequency
        const mockUser = { id: 1, email: 'test@example.com' }
        const mockFrequency = { id: 1, name: 'Daily', intervalMinutes: 1440 }
        const mockScanResult = {
            url: 'https://example.com',
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: 150,
            sslCertificate: '30 days',
            isOnline: true,
        }
        const mockSavedScan = {
            id: 1,
            title: 'Test Scan',
            ...mockScanResult,
            user: mockUser,
            frequency: mockFrequency,
            nextScanAt: expect.any(Date),
            save: vi.fn(),
        }
        // Set up the save mock to return the scan object
        mockSavedScan.save.mockResolvedValue(mockSavedScan)

        vi.mocked(User.findOneByOrFail).mockResolvedValue(mockUser as any)
        vi.mocked(scanUrl).mockResolvedValue(mockScanResult)
        vi.mocked(Frequency.findOne).mockResolvedValue(mockFrequency as any)
        vi.mocked(Scan.create).mockReturnValue(mockSavedScan as any)
        vi.mocked(pubSub.publish).mockImplementation(() => {})

        const scanInput = {
            title: 'Test Scan',
            url: 'https://example.com',
            tagIds: [],
            frequencyId: 1,
        }

        // Act: Call createNewScan
        await scanResolver.createNewScan(scanInput, mockContext)

        // Assert: Verify frequency was handled
        expect(Frequency.findOne).toHaveBeenCalledWith({ where: { id: 1 } })
        expect(mockSavedScan.frequency).toEqual(mockFrequency)
        expect(mockSavedScan.nextScanAt).toBeInstanceOf(Date)
    })

    it('should throw error when scanUrl fails', async () => {
        // Arrange: Mock scanUrl error
        const mockUser = { id: 1, email: 'test@example.com' }
        vi.mocked(User.findOneByOrFail).mockResolvedValue(mockUser as any)
        vi.mocked(scanUrl).mockResolvedValue({ error: 'Invalid URL format' })

        const scanInput = {
            title: 'Test Scan',
            url: 'invalid-url',
            tagIds: [],
            frequencyId: undefined,
        }

        // Act & Assert: Expect scanUrl error to be thrown
        await expect(
            scanResolver.createNewScan(scanInput, mockContext),
        ).rejects.toThrow('Invalid URL format')

        expect(User.findOneByOrFail).toHaveBeenCalledWith({ id: 1 })
        expect(scanUrl).toHaveBeenCalledWith('invalid-url')
        expect(Scan.create).not.toHaveBeenCalled()
    })

    it('should throw error when user is not found', async () => {
        // Arrange: Mock user not found
        vi.mocked(User.findOneByOrFail).mockRejectedValue(new Error('User not found'))

        const scanInput = {
            title: 'Test Scan',
            url: 'https://example.com',
            tagIds: [],
            frequencyId: undefined,
        }

        // Act & Assert: Expect user not found error
        await expect(
            scanResolver.createNewScan(scanInput, mockContext),
        ).rejects.toThrow('User not found')

        expect(User.findOneByOrFail).toHaveBeenCalledWith({ id: 1 })
        expect(scanUrl).not.toHaveBeenCalled()
    })
})
