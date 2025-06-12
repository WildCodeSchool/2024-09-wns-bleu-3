import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import DashboardPage from '@/pages/DashboardPage'
import { GET_DASHBOARD_USER_DATA } from '@/graphql/queries'

// Mock the AuthScanForm component
vi.mock('@/components/AuthScanForm', () => ({
    default: () => <div data-testid="auth-scan-form">Auth Scan Form</div>
}))

// Mock the ActiveIssues component
vi.mock('@/components/ActiveIssues', () => ({
    default: () => <div data-testid="active-issues">Active Issues Component</div>
}))

// Mock GraphQL query with complete data structure
const mockQuery = {
    request: {
        query: GET_DASHBOARD_USER_DATA,
        variables: {}
    },
    result: {
        data: {
            getAllScansByUserId: {
                username: 'testuser',
                totalScans: 5,
                totalIssues: 2,
                scans: [
                    {
                        id: 1,
                        title: 'Test Scan 1',
                        url: 'https://example1.com',
                        statusCode: 200,
                        statusMessage: 'OK',
                        responseTime: 150,
                        sslCertificate: 'Valid',
                        isOnline: true,
                        createdAt: '2024-01-01T00:00:00Z',
                        updatedAt: '2024-01-01T00:00:00Z',
                        lastScannedAt: '2024-01-01T00:00:00Z',
                        frequency: {
                            id: 1,
                            intervalMinutes: 5,
                            name: 'Every 5 minutes',
                            __typename: 'Frequency'
                        },
                        tags: [],
                        __typename: 'Scan'
                    },
                    {
                        id: 2,
                        title: 'Test Scan 2',
                        url: 'https://example2.com',
                        statusCode: 200,
                        statusMessage: 'OK',
                        responseTime: 200,
                        sslCertificate: 'Valid',
                        isOnline: true,
                        createdAt: '2024-01-01T00:00:00Z',
                        updatedAt: '2024-01-01T00:00:00Z',
                        lastScannedAt: '2024-01-01T00:00:00Z',
                        frequency: {
                            id: 1,
                            intervalMinutes: 5,
                            name: 'Every 5 minutes',
                            __typename: 'Frequency'
                        },
                        tags: [],
                        __typename: 'Scan'
                    }
                ],
                issues: [
                    {
                        id: '1',
                        issue: 'Status code is 404',
                        issueType: 'STATUS_CODE',
                        scanId: 2,
                        __typename: 'Issue'
                    },
                    {
                        id: '2',
                        issue: 'SSL certificate expired',
                        issueType: 'SSL_CERTIFICATE',
                        scanId: 2,
                        __typename: 'Issue'
                    }
                ],
                __typename: 'ScanByUserId'
            }
        }
    }
}

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <MockedProvider mocks={[mockQuery]}>
        <MemoryRouter>
            {children}
        </MemoryRouter>
    </MockedProvider>
)

describe('DashboardPage', () => {
    describe('Glassmorphism Styling', () => {
        it('renders with glassmorphism styling applied', async () => {
            const { container } = render(
                <TestWrapper>
                    <DashboardPage />
                </TestWrapper>
            )

            // Wait for data to load
            await screen.findByText('Total Monitors')

            // Check for glassmorphism classes on cards
            const glassmorphismCards = container.querySelectorAll('.bg-white\\/60.backdrop-blur-xl')
            expect(glassmorphismCards.length).toBeGreaterThan(0)

            // Check for shadow effects
            const shadowElements = container.querySelectorAll('.shadow-xl')
            expect(shadowElements.length).toBeGreaterThan(0)

            // Check for gradient decorative elements
            const gradientElements = container.querySelectorAll('.bg-gradient-to-br')
            expect(gradientElements.length).toBeGreaterThan(0)

            // Check for blur decorative elements
            const blurElements = container.querySelectorAll('.blur-2xl, .blur-3xl')
            expect(blurElements.length).toBeGreaterThan(0)
        })

        it('displays the new card titles and structure', async () => {
            render(
                <TestWrapper>
                    <DashboardPage />
                </TestWrapper>
            )

            // Wait for data to load and check new card titles
            await screen.findByText('Total Monitors')
            expect(screen.getByText('Total Monitors')).toBeInTheDocument()
            expect(screen.getByText('Healthy')).toBeInTheDocument()
            expect(screen.getByText('Issues')).toBeInTheDocument()
            expect(screen.getByText('Free Plan')).toBeInTheDocument()
            expect(screen.getByText('Quick Add Monitor')).toBeInTheDocument()
        })

        it('renders the AuthScanForm and ActiveIssues components', async () => {
            render(
                <TestWrapper>
                    <DashboardPage />
                </TestWrapper>
            )

            // Wait for components to render
            await screen.findByTestId('auth-scan-form')
            expect(screen.getByTestId('auth-scan-form')).toBeInTheDocument()
            expect(screen.getByTestId('active-issues')).toBeInTheDocument()
        })

        it('shows loading state correctly', () => {
            const loadingMock = {
                request: {
                    query: GET_DASHBOARD_USER_DATA,
                    variables: {}
                },
                delay: 30000 // Simulate loading
            }

            render(
                <MockedProvider mocks={[loadingMock]}>
                    <MemoryRouter>
                        <DashboardPage />
                    </MemoryRouter>
                </MockedProvider>
            )

            expect(screen.getByText('Loading...')).toBeInTheDocument()
        })

        it('shows error state correctly', async () => {
            const errorMock = {
                request: {
                    query: GET_DASHBOARD_USER_DATA,
                    variables: {}
                },
                error: new Error('Network error')
            }

            render(
                <MockedProvider mocks={[errorMock]}>
                    <MemoryRouter>
                        <DashboardPage />
                    </MemoryRouter>
                </MockedProvider>
            )

            // Wait for error to appear
            await screen.findByText(/There is an error: Network error/)
            expect(screen.getByText(/There is an error: Network error/)).toBeInTheDocument()
        })
    })
}) 