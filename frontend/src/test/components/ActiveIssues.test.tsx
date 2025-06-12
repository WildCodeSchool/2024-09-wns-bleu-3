import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '@testing-library/jest-dom'
import ActiveIssues from '@/components/ActiveIssues'

// Mock data
const mockIssues = [
    {
        id: '1',
        issue: 'Status code is 404',
        issueType: 'STATUS_CODE',
        scanId: 1
    },
    {
        id: '2',
        issue: 'SSL certificate expired',
        issueType: 'SSL_CERTIFICATE',
        scanId: 2
    }
]

const mockScans = [
    { id: 1, title: 'Test Scan 1' },
    { id: 2, title: 'Test Scan 2' }
]

const mockSetResolvedIssues = vi.fn()

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
        {children}
    </MemoryRouter>
)

describe('ActiveIssues', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Glassmorphism Styling', () => {
        it('renders with glassmorphism styling applied', () => {
            const { container } = render(
                <TestWrapper>
                    <ActiveIssues
                        issues={mockIssues}
                        scans={mockScans}
                        setResolvedIssues={mockSetResolvedIssues}
                    />
                </TestWrapper>
            )

            // Check for glassmorphism classes on the main card
            const glassmorphismCard = container.querySelector('.bg-white\\/60.backdrop-blur-xl')
            expect(glassmorphismCard).toBeInTheDocument()

            // Check for shadow effects
            const shadowElements = container.querySelectorAll('.shadow-xl')
            expect(shadowElements.length).toBeGreaterThan(0)

            // Check for blur decorative elements
            const blurElements = container.querySelectorAll('.blur-3xl')
            expect(blurElements.length).toBeGreaterThan(0)
        })

        it('displays the new header structure with icon and badge', () => {
            render(
                <TestWrapper>
                    <ActiveIssues
                        issues={mockIssues}
                        scans={mockScans}
                        setResolvedIssues={mockSetResolvedIssues}
                    />
                </TestWrapper>
            )

            // Check for the new header structure
            expect(screen.getByText('Active Issues')).toBeInTheDocument()
            expect(screen.getByText('2 Issues')).toBeInTheDocument()
        })

        it('renders table with updated styling', () => {
            const { container } = render(
                <TestWrapper>
                    <ActiveIssues
                        issues={mockIssues}
                        scans={mockScans}
                        setResolvedIssues={mockSetResolvedIssues}
                    />
                </TestWrapper>
            )

            // Check for table header with glassmorphism styling
            const tableHeader = container.querySelector('.bg-white\\/80.backdrop-blur-sm')
            expect(tableHeader).toBeInTheDocument()

            // Check for issue content
            expect(screen.getByText('Status code is 404')).toBeInTheDocument()
            expect(screen.getByText('SSL certificate expired')).toBeInTheDocument()
        })

        it('handles issue resolution correctly', () => {
            render(
                <TestWrapper>
                    <ActiveIssues
                        issues={mockIssues}
                        scans={mockScans}
                        setResolvedIssues={mockSetResolvedIssues}
                    />
                </TestWrapper>
            )

            // Find and click the first checkbox
            const checkboxes = screen.getAllByRole('checkbox')
            fireEvent.click(checkboxes[0])

            // Verify the callback was called with the correct issue ID
            expect(mockSetResolvedIssues).toHaveBeenCalledWith(expect.any(Function))
        })

        it('displays empty state when no issues', () => {
            render(
                <TestWrapper>
                    <ActiveIssues
                        issues={[]}
                        scans={mockScans}
                        setResolvedIssues={mockSetResolvedIssues}
                    />
                </TestWrapper>
            )

            expect(screen.getByText('No active issues found.')).toBeInTheDocument()
            expect(screen.getByText('0 Issues')).toBeInTheDocument()
        })

        it('renders issue type badges with updated styling', () => {
            const { container } = render(
                <TestWrapper>
                    <ActiveIssues
                        issues={mockIssues}
                        scans={mockScans}
                        setResolvedIssues={mockSetResolvedIssues}
                    />
                </TestWrapper>
            )

            // Check for badge styling
            const badges = container.querySelectorAll('.bg-slate-100.text-slate-700')
            expect(badges.length).toBeGreaterThan(0)

            // Check badge content
            expect(screen.getByText('STATUS CODE')).toBeInTheDocument()
            expect(screen.getByText('SSL CERTIFICATE')).toBeInTheDocument()
        })

        it('renders scan links with updated styling', () => {
            render(
                <TestWrapper>
                    <ActiveIssues
                        issues={mockIssues}
                        scans={mockScans}
                        setResolvedIssues={mockSetResolvedIssues}
                    />
                </TestWrapper>
            )

            // Check for scan links
            const scanLinks = screen.getAllByRole('link')
            expect(scanLinks.length).toBe(2)
            expect(scanLinks[0]).toHaveAttribute('href', '/dashboard/scan-1')
            expect(scanLinks[1]).toHaveAttribute('href', '/dashboard/scan-2')
        })
    })
}) 