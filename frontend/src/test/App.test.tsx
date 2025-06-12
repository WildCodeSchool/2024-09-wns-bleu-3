import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import App from '@/App'

// Mock the useAuth hook
const mockUseAuth = vi.fn()
vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => mockUseAuth()
}))

// Mock the GraphQL query
const mockUseQuery = vi.fn()
vi.mock('@apollo/client', async () => {
    const actual = await vi.importActual('@apollo/client')
    return {
        ...actual,
        useQuery: () => mockUseQuery()
    }
})

// Mock components to avoid complex rendering
vi.mock('@/components/Header', () => ({
    default: () => <div data-testid="header">Header</div>
}))

vi.mock('@/components/Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}))

vi.mock('@/layouts/DashboardLayout', () => ({
    DashboardLayout: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dashboard-layout">{children}</div>
    )
}))

vi.mock('@/pages/HomePage', () => ({
    default: () => <div data-testid="home-page">Home Page</div>
}))

vi.mock('@/pages/DashboardPage', () => ({
    default: () => <div data-testid="dashboard-page">Dashboard Page</div>
}))

vi.mock('@/pages/PricingPage', () => ({
    default: () => <div data-testid="pricing-page">Pricing Page</div>
}))

vi.mock('@/pages/LoginPage', () => ({
    default: () => <div data-testid="login-page">Login Page</div>
}))

vi.mock('@/pages/ProfilePage', () => ({
    default: () => <div data-testid="profile-page">Profile Page</div>
}))

// Mock Toaster
vi.mock('sonner', () => ({
    Toaster: () => <div data-testid="toaster">Toaster</div>
}))

// Test wrapper component
const TestWrapper = ({ children, initialEntries = ['/'] }: {
    children: React.ReactNode
    initialEntries?: string[]
}) => (
    <MockedProvider mocks={[]}>
        <MemoryRouter initialEntries={initialEntries}>
            {children}
        </MemoryRouter>
    </MockedProvider>
)

describe('App Routing', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        // Mock successful GraphQL query
        mockUseQuery.mockReturnValue({
            loading: false,
            error: null,
            data: { getAllScans: [] }
        })
    })

    describe('Public Routes (with Header/Footer)', () => {
        beforeEach(() => {
            // Mock unauthenticated user
            mockUseAuth.mockReturnValue({
                user: null,
                loading: false,
                error: null,
                isLoggedIn: false,
                refetch: vi.fn()
            })
        })

        it('renders home page with header and footer', () => {
            render(
                <TestWrapper initialEntries={['/']}>
                    <App />
                </TestWrapper>
            )

            expect(screen.getByTestId('home-page')).toBeInTheDocument()
            expect(screen.getByTestId('header')).toBeInTheDocument()
            expect(screen.getByTestId('footer')).toBeInTheDocument()
            expect(screen.queryByTestId('dashboard-layout')).not.toBeInTheDocument()
        })

        it('renders login page with header and footer', () => {
            render(
                <TestWrapper initialEntries={['/login']}>
                    <App />
                </TestWrapper>
            )

            expect(screen.getByTestId('login-page')).toBeInTheDocument()
            expect(screen.getByTestId('header')).toBeInTheDocument()
            expect(screen.getByTestId('footer')).toBeInTheDocument()
            expect(screen.queryByTestId('dashboard-layout')).not.toBeInTheDocument()
        })
    })

    describe('Private Routes (with DashboardLayout)', () => {
        beforeEach(() => {
            // Mock authenticated user
            mockUseAuth.mockReturnValue({
                user: { id: 1, username: 'testuser', email: 'test@example.com' },
                loading: false,
                error: null,
                isLoggedIn: true,
                refetch: vi.fn()
            })
        })

        it('renders dashboard page with DashboardLayout (no header/footer)', () => {
            render(
                <TestWrapper initialEntries={['/dashboard']}>
                    <App />
                </TestWrapper>
            )

            expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
            expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
            expect(screen.queryByTestId('header')).not.toBeInTheDocument()
            expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
        })

        it('renders pricing page with DashboardLayout', () => {
            render(
                <TestWrapper initialEntries={['/pricing']}>
                    <App />
                </TestWrapper>
            )

            expect(screen.getByTestId('pricing-page')).toBeInTheDocument()
            expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
            expect(screen.queryByTestId('header')).not.toBeInTheDocument()
            expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
        })

        it('renders profile page with DashboardLayout', () => {
            render(
                <TestWrapper initialEntries={['/profile']}>
                    <App />
                </TestWrapper>
            )

            expect(screen.getByTestId('profile-page')).toBeInTheDocument()
            expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
            expect(screen.queryByTestId('header')).not.toBeInTheDocument()
            expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
        })
    })

    describe('Authentication Redirects', () => {
        it('redirects unauthenticated users from dashboard to home', () => {
            mockUseAuth.mockReturnValue({
                user: null,
                loading: false,
                error: null,
                isLoggedIn: false,
                refetch: vi.fn()
            })

            render(
                <TestWrapper initialEntries={['/dashboard']}>
                    <App />
                </TestWrapper>
            )

            // Should redirect to home page with header/footer
            expect(screen.getByTestId('home-page')).toBeInTheDocument()
            expect(screen.getByTestId('header')).toBeInTheDocument()
            expect(screen.getByTestId('footer')).toBeInTheDocument()
            expect(screen.queryByTestId('dashboard-layout')).not.toBeInTheDocument()
        })

        it('redirects unauthenticated users from pricing to home', () => {
            mockUseAuth.mockReturnValue({
                user: null,
                loading: false,
                error: null,
                isLoggedIn: false,
                refetch: vi.fn()
            })

            render(
                <TestWrapper initialEntries={['/pricing']}>
                    <App />
                </TestWrapper>
            )

            // Should redirect to home page
            expect(screen.getByTestId('home-page')).toBeInTheDocument()
            expect(screen.getByTestId('header')).toBeInTheDocument()
            expect(screen.getByTestId('footer')).toBeInTheDocument()
        })
    })

    describe('Loading States', () => {
        it('shows loading state during authentication check', () => {
            mockUseAuth.mockReturnValue({
                user: null,
                loading: true,
                error: null,
                isLoggedIn: false,
                refetch: vi.fn()
            })

            render(
                <TestWrapper initialEntries={['/dashboard']}>
                    <App />
                </TestWrapper>
            )

            expect(screen.getByText('Loading...')).toBeInTheDocument()
        })

        it('shows loading state during GraphQL query', () => {
            mockUseAuth.mockReturnValue({
                user: { id: 1, username: 'testuser' },
                loading: false,
                error: null,
                isLoggedIn: true,
                refetch: vi.fn()
            })

            mockUseQuery.mockReturnValue({
                loading: true,
                error: null,
                data: null
            })

            render(
                <TestWrapper initialEntries={['/dashboard']}>
                    <App />
                </TestWrapper>
            )

            expect(screen.getByText('Loading...')).toBeInTheDocument()
        })
    })

    describe('Error States', () => {
        it('shows error state for GraphQL errors', () => {
            mockUseAuth.mockReturnValue({
                user: { id: 1, username: 'testuser' },
                loading: false,
                error: null,
                isLoggedIn: true,
                refetch: vi.fn()
            })

            mockUseQuery.mockReturnValue({
                loading: false,
                error: { message: 'Network error' },
                data: null
            })

            render(
                <TestWrapper initialEntries={['/dashboard']}>
                    <App />
                </TestWrapper>
            )

            expect(screen.getByText('Error : Network error')).toBeInTheDocument()
        })
    })
}) 