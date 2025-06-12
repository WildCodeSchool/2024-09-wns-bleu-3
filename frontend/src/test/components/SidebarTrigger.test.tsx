import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SidebarTrigger } from '@/components/SidebarTrigger'
import { SidebarProvider } from '@/components/ui/sidebar'

// Mock the cn utility
vi.mock('@/lib/utils', () => ({
    cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <SidebarProvider>
        {children}
    </SidebarProvider>
)

describe('SidebarTrigger Component', () => {
    describe('Rendering', () => {
        it('renders the trigger button', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            const button = screen.getByRole('button', { name: /toggle sidebar/i })
            expect(button).toBeInTheDocument()
        })

        it('renders with menu icon', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            // Check for the menu icon (lucide-react Menu component)
            const button = screen.getByRole('button', { name: /toggle sidebar/i })
            expect(button).toBeInTheDocument()

            // The Menu icon should be present as an SVG
            const svg = button.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })

        it('has proper screen reader text', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            expect(screen.getByText('Toggle Sidebar')).toBeInTheDocument()
        })
    })

    describe('Styling', () => {
        it('applies default classes', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            const button = screen.getByRole('button', { name: /toggle sidebar/i })

            // Check for expected classes
            expect(button).toHaveClass('h-9', 'w-9', 'p-0', 'md:hidden')
            expect(button).toHaveClass('transition-dashboard', 'hover-lift-subtle')
            expect(button).toHaveClass('border', 'bg-white/10', 'backdrop-blur-sm')
        })

        it('applies custom className when provided', () => {
            const customClass = 'custom-test-class'

            render(
                <TestWrapper>
                    <SidebarTrigger className={customClass} />
                </TestWrapper>
            )

            const button = screen.getByRole('button', { name: /toggle sidebar/i })
            expect(button).toHaveClass(customClass)
        })

        it('is hidden on desktop (md:hidden)', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            const button = screen.getByRole('button', { name: /toggle sidebar/i })
            expect(button).toHaveClass('md:hidden')
        })
    })

    describe('Interactions', () => {
        it('is clickable', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            const button = screen.getByRole('button', { name: /toggle sidebar/i })

            // Should not throw when clicked
            expect(() => {
                fireEvent.click(button)
            }).not.toThrow()
        })

        it('has proper button attributes', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            const button = screen.getByRole('button', { name: /toggle sidebar/i })

            // Should be a button element
            expect(button.tagName).toBe('BUTTON')

            // Should not be disabled
            expect(button).not.toBeDisabled()
        })
    })

    describe('Accessibility', () => {
        it('has proper ARIA attributes', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            const button = screen.getByRole('button', { name: /toggle sidebar/i })

            // Should have accessible name
            expect(button).toHaveAccessibleName('Toggle Sidebar')
        })

        it('is keyboard accessible', () => {
            render(
                <TestWrapper>
                    <SidebarTrigger />
                </TestWrapper>
            )

            const button = screen.getByRole('button', { name: /toggle sidebar/i })

            // Should be focusable
            button.focus()
            expect(document.activeElement).toBe(button)

            // Should respond to keyboard events
            expect(() => {
                fireEvent.keyDown(button, { key: 'Enter' })
                fireEvent.keyDown(button, { key: ' ' })
            }).not.toThrow()
        })
    })

    describe('Integration with SidebarProvider', () => {
        it('renders without SidebarProvider and shows error boundary behavior', () => {
            // This test ensures the component handles missing context gracefully
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            expect(() => {
                render(<SidebarTrigger />)
            }).toThrow()

            consoleSpy.mockRestore()
        })

        it('renders correctly within SidebarProvider', () => {
            expect(() => {
                render(
                    <TestWrapper>
                        <SidebarTrigger />
                    </TestWrapper>
                )
            }).not.toThrow()

            const button = screen.getByRole('button', { name: /toggle sidebar/i })
            expect(button).toBeInTheDocument()
        })
    })
}) 