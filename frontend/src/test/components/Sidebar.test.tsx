import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { MockedProvider } from '@apollo/client/testing'
import { Sidebar } from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

// Mock the useAuth hook
const mockUseAuth = vi.fn()
vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => mockUseAuth()
}))

// Mock boring-avatars
vi.mock('boring-avatars', () => ({
    default: ({ name, size }: { name: string; size: number }) => (
        <div data-testid="boring-avatar" data-name={name} data-size={size}>
            Avatar for {name}
        </div>
    )
}))

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <MockedProvider mocks={[]}>
        <BrowserRouter>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </BrowserRouter>
    </MockedProvider>
)

describe('Sidebar Component', () => {
    const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        isLoggedIn: true,
        __typename: 'UserInfo' as const
    }

    beforeEach(() => {
        // Reset mocks before each test
        vi.clearAllMocks()

        // Default mock implementation
        mockUseAuth.mockReturnValue({
            user: mockUser,
            loading: false,
            error: null,
            isLoggedIn: true,
            refetch: vi.fn()
        })

        // Mock window.location.href
        Object.defineProperty(window, 'location', {
            value: { href: '' },
            writable: true
        })
    })

    describe('Rendering', () => {
        it('renders the sidebar with logo and branding', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            // Check for logo and branding
            expect(screen.getByText('Sonar')).toBeInTheDocument()
            expect(screen.getByText('Security Monitor')).toBeInTheDocument()
        })

        it('renders all navigation items', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            // Check for navigation items
            expect(screen.getByText('Dashboard')).toBeInTheDocument()
            expect(screen.getByText('Security Scans')).toBeInTheDocument()
            expect(screen.getByText('Scan History')).toBeInTheDocument()
            expect(screen.getByText('Settings')).toBeInTheDocument()
            expect(screen.getByText('Help & Support')).toBeInTheDocument()
        })

        it('renders premium upgrade card', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            expect(screen.getByText('Upgrade to Pro')).toBeInTheDocument()
            expect(screen.getByText('Get unlimited scans and advanced security features')).toBeInTheDocument()
            expect(screen.getByText('Upgrade Now')).toBeInTheDocument()
        })

        it('renders user profile section', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            expect(screen.getByText(mockUser.email)).toBeInTheDocument()
            expect(screen.getByText('Free Plan')).toBeInTheDocument()
            expect(screen.getByText('Beta')).toBeInTheDocument()
        })

        it('renders boring avatar with correct props', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            const avatar = screen.getByTestId('boring-avatar')
            expect(avatar).toHaveAttribute('data-name', mockUser.email)
            expect(avatar).toHaveAttribute('data-size', '32')
        })
    })

    describe('Navigation Links', () => {
        it('renders navigation links with correct hrefs', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
            const scansLink = screen.getByRole('link', { name: /security scans/i })
            const historyLink = screen.getByRole('link', { name: /scan history/i })
            const settingsLink = screen.getByRole('link', { name: /settings/i })
            const helpLink = screen.getByRole('link', { name: /help & support/i })

            expect(dashboardLink).toHaveAttribute('href', '/dashboard')
            expect(scansLink).toHaveAttribute('href', '/scans')
            expect(historyLink).toHaveAttribute('href', '/history')
            expect(settingsLink).toHaveAttribute('href', '/settings')
            expect(helpLink).toHaveAttribute('href', '/help')
        })

        it('renders upgrade link with correct href', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            const upgradeLink = screen.getByRole('link', { name: /upgrade now/i })
            expect(upgradeLink).toHaveAttribute('href', '/pricing')
        })
    })

    describe('User Interactions', () => {
        it('handles logout button click', () => {
            // Mock localStorage.clear
            const mockClear = vi.fn()
            Object.defineProperty(window, 'localStorage', {
                value: { clear: mockClear },
                writable: true
            })

            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            const logoutButton = screen.getByRole('button', { name: /logout/i })
            fireEvent.click(logoutButton)

            expect(mockClear).toHaveBeenCalled()
            expect(window.location.href).toBe('/')
        })
    })

    describe('User States', () => {
        it('handles user with no email', () => {
            mockUseAuth.mockReturnValue({
                user: { ...mockUser, email: '' },
                loading: false,
                error: null,
                isLoggedIn: true,
                refetch: vi.fn()
            })

            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            expect(screen.getByText('User')).toBeInTheDocument()
            const avatar = screen.getByTestId('boring-avatar')
            expect(avatar).toHaveAttribute('data-name', 'User')
        })

        it('handles null user', () => {
            mockUseAuth.mockReturnValue({
                user: null,
                loading: false,
                error: null,
                isLoggedIn: false,
                refetch: vi.fn()
            })

            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            expect(screen.getByText('User')).toBeInTheDocument()
            const avatar = screen.getByTestId('boring-avatar')
            expect(avatar).toHaveAttribute('data-name', 'User')
        })

        it('handles loading state', () => {
            mockUseAuth.mockReturnValue({
                user: null,
                loading: true,
                error: null,
                isLoggedIn: false,
                refetch: vi.fn()
            })

            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            // Component should still render with fallback values
            expect(screen.getByText('Sonar')).toBeInTheDocument()
            expect(screen.getByText('User')).toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('has proper ARIA labels and screen reader text', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            // Check for screen reader text
            expect(screen.getByText('Logout')).toBeInTheDocument()

            // Check that logout button has accessible name
            const logoutButton = screen.getByRole('button', { name: /logout/i })
            expect(logoutButton).toBeInTheDocument()
        })

        it('has proper semantic structure', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            // Check for navigation structure
            const links = screen.getAllByRole('link')
            expect(links.length).toBeGreaterThan(0)

            const buttons = screen.getAllByRole('button')
            expect(buttons.length).toBeGreaterThan(0)
        })
    })

    describe('Styling and Classes', () => {
        it('applies glassmorphism styling', () => {
            const { container } = render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            // Check for glassmorphism class
            const sidebar = container.querySelector('[data-slot="sidebar"]')
            expect(sidebar).toHaveClass('glass-sidebar')
        })

        it('applies transition classes to interactive elements', () => {
            render(
                <TestWrapper>
                    <Sidebar />
                </TestWrapper>
            )

            const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
            expect(dashboardLink).toHaveClass('transition-dashboard', 'hover-lift-subtle')
        })
    })
}) 