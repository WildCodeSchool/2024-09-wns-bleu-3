import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'

// Mock the useAuth hook
const mockUseAuth = vi.fn()
vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => mockUseAuth()
}))

// Mock the Sidebar component
vi.mock('@/components/Sidebar', () => ({
    Sidebar: () => <div data-testid="sidebar">Sidebar Component</div>
}))

// Mock the SidebarTrigger component
vi.mock('@/components/SidebarTrigger', () => ({
    SidebarTrigger: ({ className }: { className?: string }) => (
        <button data-testid="sidebar-trigger" className={className}>
            Toggle Sidebar
        </button>
    )
}))

// Mock shadcn components
vi.mock('@/components/ui/sidebar', () => ({
    SidebarProvider: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="sidebar-provider">{children}</div>
    ),
    SidebarInset: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div data-testid="sidebar-inset" className={className}>{children}</div>
    )
}))

vi.mock('@/components/ui/button', () => ({
    Button: ({ children, className, variant, size, ...props }: {
        children: React.ReactNode
        className?: string
        variant?: string
        size?: string
        [key: string]: unknown
    }) => (
        <button
            data-testid="button"
            className={className}
            data-variant={variant}
            data-size={size}
            {...props}
        >
            {children}
        </button>
    )
}))

vi.mock('@/components/ui/badge', () => ({
    Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <span data-testid="badge" className={className}>{children}</span>
    )
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    Bell: () => <span data-testid="bell-icon">Bell</span>,
    Plus: () => <span data-testid="plus-icon">Plus</span>
}))

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <MockedProvider mocks={[]}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </MockedProvider>
)

describe('DashboardLayout', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Rendering', () => {
        it('renders the layout structure correctly', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div data-testid="test-content">Test Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            // Check main layout structure
            expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument()
            expect(screen.getByTestId('sidebar')).toBeInTheDocument()
            expect(screen.getByTestId('sidebar-inset')).toBeInTheDocument()

            // Check content is rendered
            expect(screen.getByTestId('test-content')).toBeInTheDocument()
        })

        it('renders background decorative elements', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            const { container } = render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            // Check for gradient background classes
            const mainContainer = container.querySelector('.bg-gradient-to-br')
            expect(mainContainer).toBeInTheDocument()
            expect(mainContainer).toHaveClass('from-rose-50', 'via-blue-50', 'to-violet-50')

            // Check for decorative blur elements
            const blurElements = container.querySelectorAll('.blur-3xl, .blur-2xl')
            expect(blurElements).toHaveLength(3)
        })

        it('renders header area with greeting and buttons', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'johndoe' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            // Check greeting text
            expect(screen.getByText(/Good morning, johndoe/)).toBeInTheDocument()
            expect(screen.getByText(/Your infrastructure is running smoothly/)).toBeInTheDocument()

            // Check action buttons
            const buttons = screen.getAllByTestId('button')
            expect(buttons).toHaveLength(2)

            // Check notifications button
            expect(screen.getByText('Notifications')).toBeInTheDocument()
            expect(screen.getByTestId('bell-icon')).toBeInTheDocument()
            expect(screen.getByTestId('badge')).toHaveTextContent('3')

            // Check add monitor button
            expect(screen.getByText('Add Monitor')).toBeInTheDocument()
            expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
        })

        it('renders mobile sidebar trigger', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            const sidebarTrigger = screen.getByTestId('sidebar-trigger')
            expect(sidebarTrigger).toBeInTheDocument()
            expect(sidebarTrigger).toHaveClass('md:hidden')
        })
    })

    describe('Authentication States', () => {
        it('handles authenticated user with username', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'alice' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            expect(screen.getByText(/Good morning, alice/)).toBeInTheDocument()
        })

        it('handles user with no username', () => {
            mockUseAuth.mockReturnValue({
                user: {}
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            expect(screen.getByText(/Good morning, User/)).toBeInTheDocument()
        })

        it('handles null user', () => {
            mockUseAuth.mockReturnValue({
                user: null
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            expect(screen.getByText(/Good morning, User/)).toBeInTheDocument()
        })

        it('handles undefined user', () => {
            mockUseAuth.mockReturnValue({
                user: undefined
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            expect(screen.getByText(/Good morning, User/)).toBeInTheDocument()
        })
    })

    describe('Component Integration', () => {
        it('passes children to the main content area', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div data-testid="child-component">Child Component</div>
                        <p data-testid="child-text">Some text content</p>
                    </DashboardLayout>
                </TestWrapper>
            )

            expect(screen.getByTestId('child-component')).toBeInTheDocument()
            expect(screen.getByTestId('child-text')).toBeInTheDocument()
        })

        it('wraps content with SidebarProvider', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument()
        })

        it('applies correct classes to SidebarInset', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            const sidebarInset = screen.getByTestId('sidebar-inset')
            expect(sidebarInset).toHaveClass('flex-1', 'overflow-auto', 'relative', 'z-10')
        })
    })

    describe('Styling and Layout', () => {
        it('applies correct button styling classes', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            const buttons = screen.getAllByTestId('button')

            // Notifications button (outline variant)
            expect(buttons[0]).toHaveAttribute('data-variant', 'outline')
            expect(buttons[0]).toHaveAttribute('data-size', 'sm')
            expect(buttons[0]).toHaveClass('bg-white/60', 'backdrop-blur-sm', 'border-white/50')

            // Add Monitor button (primary)
            expect(buttons[1]).toHaveAttribute('data-size', 'sm')
            expect(buttons[1]).toHaveClass('btn-dashboard-primary')
        })

        it('applies animation classes to content', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            const { container } = render(
                <TestWrapper>
                    <DashboardLayout>
                        <div data-testid="content">Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            const animatedDiv = container.querySelector('.animate-fade-in')
            expect(animatedDiv).toBeInTheDocument()
            expect(animatedDiv).toContainElement(screen.getByTestId('content'))
        })

        it('applies gradient text classes to heading', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            const { container } = render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            const heading = container.querySelector('h1')
            expect(heading).toHaveClass(
                'text-3xl',
                'font-bold',
                'bg-gradient-to-r',
                'from-slate-800',
                'via-blue-700',
                'to-purple-700',
                'bg-clip-text',
                'text-transparent'
            )
        })
    })

    describe('Responsive Behavior', () => {
        it('applies responsive classes correctly', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            const { container } = render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            // Check responsive header layout
            const headerDiv = container.querySelector('.flex.flex-col.md\\:flex-row')
            expect(headerDiv).toBeInTheDocument()

            // Check responsive button text
            const notificationSpan = screen.getByText('Notifications')
            expect(notificationSpan).toHaveClass('hidden', 'md:inline')

            // Check mobile sidebar trigger
            const sidebarTrigger = screen.getByTestId('sidebar-trigger')
            expect(sidebarTrigger).toHaveClass('md:hidden')
        })
    })

    describe('Accessibility', () => {
        it('maintains semantic HTML structure', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            const { container } = render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            // Check for proper heading hierarchy
            const heading = container.querySelector('h1')
            expect(heading).toBeInTheDocument()

            // Check for proper paragraph structure
            const paragraph = container.querySelector('p')
            expect(paragraph).toBeInTheDocument()
        })

        it('provides proper button structure', () => {
            mockUseAuth.mockReturnValue({
                user: { username: 'testuser' }
            })

            render(
                <TestWrapper>
                    <DashboardLayout>
                        <div>Content</div>
                    </DashboardLayout>
                </TestWrapper>
            )

            const buttons = screen.getAllByTestId('button')
            expect(buttons).toHaveLength(2)

            // All buttons should be properly structured
            buttons.forEach(button => {
                expect(button.tagName).toBe('BUTTON')
            })
        })
    })
}) 