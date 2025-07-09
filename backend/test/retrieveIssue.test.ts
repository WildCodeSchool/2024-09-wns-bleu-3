import {describe, expect, it, vi} from 'vitest'

import { issuesArray } from 'src/utils/issuesArray'
import { Scan } from 'src/entities/Scan'

vi.mock('uuid', () => {
    return {
        v4: vi.fn(() => 'mocked-uuid'),
    }
})

describe('issuesArray', () => {
    it('should return an empty array when no scans are provided', async () => { 
        const result = issuesArray([])

        expect(result).toEqual([])
    })
    it('should return an array of issues for a given scan', async () => {
        const scans: Partial<Scan>[] = [{ id: 3, statusCode: 200, sslCertificate: '500 days', responseTime: 150 }]

        const result = issuesArray(scans as Scan[])

        expect(result).toEqual([
            {
                id: 'mocked-uuid',
                scanId: 3,
                issueType: 'RESPONSE_TIME',
                issue: 'Response time is too long: 150ms',
            },
        ])
    })

    it('should return an array of issues for multiple scans', async () => {
        const scans: Partial<Scan>[] = [
            { id: 1, statusCode: 200, sslCertificate: '500 days', responseTime: 150 },
            { id: 2, statusCode: 404, sslCertificate: 'Expired', responseTime: 50 },
        ]

        const result = issuesArray(scans as Scan[])

        expect(result).toEqual([
            {
                id: 'mocked-uuid',
                scanId: 1,
                issueType: 'RESPONSE_TIME',
                issue: 'Response time is too long: 150ms',
            },
            {
                id: 'mocked-uuid',
                scanId: 2,
                issueType: 'STATUS_CODE',
                issue: 'Status code is 404',
            },
            {
                id: 'mocked-uuid',
                scanId: 2,
                issueType: 'SSL_CERTIFICATE',
                issue: 'SSL certificate is expired',
            },
        ])
    })

    it('should return no issue for a scan with no issues', async () => {
        const scans: Partial<Scan>[] = [{id: 1, statusCode: 200, sslCertificate: '500 days', responseTime: 50 }]
        const result = issuesArray(scans as Scan[])
        expect(result).toEqual([])
    })

    it('should return an issue for a scan with status code not in 200-299 range', async () => {
        const scans: Partial<Scan>[] = [{ id: 1, statusCode: 404, sslCertificate: '500 days', responseTime: 50 }]
        const result = issuesArray(scans as Scan[])
        expect(result).toEqual([
            {
                id: 'mocked-uuid',
                scanId: 1,
                issueType: 'STATUS_CODE',
                issue: 'Status code is 404',
            },
        ])
    })

    it('should return an issue for a scan with expired SSL certificate', async () => {
        const scans: Partial<Scan>[] = [{ id: 1, statusCode: 200, sslCertificate: 'Expired', responseTime: 50 }]
        const result = issuesArray(scans as Scan[])
        expect(result).toEqual([
            {
                id: 'mocked-uuid',
                scanId: 1,
                issueType: 'SSL_CERTIFICATE',
                issue: 'SSL certificate is expired',
            },
        ])
    })
    it('should return an issue for a scan with response time greater than 100ms', async () => {     
        const scans: Partial<Scan>[] = [{ id: 1, statusCode: 200, sslCertificate: '500 days', responseTime: 150 }]
        const result = issuesArray(scans as Scan[])
        expect(result).toEqual([
            {
                id: 'mocked-uuid',
                scanId: 1,
                issueType: 'RESPONSE_TIME',
                issue: 'Response time is too long: 150ms',
            },
        ])
    })
})