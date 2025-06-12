import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import BaseScanForm from '@/components/BaseScanForm'


// Mock data
const mockTags = [
    { id: 1, name: 'Production', color: '#ff0000' },
    { id: 2, name: 'Development', color: '#00ff00' }
]

const mockFrequencies = [
    { id: 1, name: 'Every 5 minutes', intervalMinutes: 5 },
    { id: 2, name: 'Every hour', intervalMinutes: 60 }
]

const mockOnSubmit = vi.fn()

describe('BaseScanForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Glassmorphism Styling', () => {
        it('applies glassmorphism styling for light variant', () => {
            render(
                <BaseScanForm
                    onSubmit={mockOnSubmit}
                    isLoading={false}
                    submitButtonText="Submit"
                    variant="light"
                />
            )

            const form = screen.getByTestId('base-scan-form')
            expect(form).toHaveClass('glass-card')
            expect(form).toHaveClass('bg-white/60')
            expect(form).toHaveClass('backdrop-blur-xl')
            expect(form).toHaveClass('border-white/50')
        })

        it('applies gradient text to title', () => {
            render(
                <BaseScanForm
                    onSubmit={mockOnSubmit}
                    isLoading={false}
                    submitButtonText="Submit"
                    variant="light"
                />
            )

            const title = screen.getByText('Quick URL Check')
            expect(title).toHaveClass('text-gradient-dashboard')
        })

        it('applies glassmorphism styling to input fields', () => {
            render(
                <BaseScanForm
                    onSubmit={mockOnSubmit}
                    isLoading={false}
                    submitButtonText="Submit"
                    variant="light"
                    showTitle={true}
                    availableTags={mockTags}
                    availableFrequencies={mockFrequencies}
                />
            )

            const urlInput = screen.getByLabelText('URL to scan')
            expect(urlInput).toHaveClass('bg-white/80')
            expect(urlInput).toHaveClass('backdrop-blur-sm')
            expect(urlInput).toHaveClass('border-white/60')
            expect(urlInput).toHaveClass('transition-dashboard')
        })

        it('applies dashboard button styling to submit button', () => {
            render(
                <BaseScanForm
                    onSubmit={mockOnSubmit}
                    isLoading={false}
                    submitButtonText="Create Scan"
                    variant="light"
                />
            )

            const submitButton = screen.getByRole('button', { name: 'Create Scan' })
            expect(submitButton).toHaveClass('btn-dashboard-primary')
            expect(submitButton).toHaveClass('hover-lift')
            expect(submitButton).toHaveClass('transition-dashboard')
        })
    })

    describe('Form Functionality', () => {
        it('renders all fields when showTitle, showTags, and showFrequency are true', () => {
            render(
                <BaseScanForm
                    onSubmit={mockOnSubmit}
                    isLoading={false}
                    submitButtonText="Submit"
                    showTitle={true}
                    showTags={true}
                    showFrequency={true}
                    availableTags={mockTags}
                    availableFrequencies={mockFrequencies}
                />
            )

            expect(screen.getByLabelText('Title')).toBeInTheDocument()
            expect(screen.getByLabelText('URL to scan')).toBeInTheDocument()
            expect(screen.getByLabelText('Select tags')).toBeInTheDocument()
            expect(screen.getByLabelText('Select frequency')).toBeInTheDocument()
        })

        it('submits form with correct data', async () => {
            render(
                <BaseScanForm
                    onSubmit={mockOnSubmit}
                    isLoading={false}
                    submitButtonText="Submit"
                    showTitle={true}
                    availableTags={mockTags}
                    availableFrequencies={mockFrequencies}
                />
            )

            const titleInput = screen.getByLabelText('Title')
            const urlInput = screen.getByLabelText('URL to scan')
            const submitButton = screen.getByRole('button', { name: 'Submit' })

            fireEvent.change(titleInput, { target: { value: 'Test Scan' } })
            fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
            fireEvent.click(submitButton)

            await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalledWith({
                    title: 'Test Scan',
                    url: 'https://example.com'
                })
            })
        })

        it('shows loading state correctly', () => {
            render(
                <BaseScanForm
                    onSubmit={mockOnSubmit}
                    isLoading={true}
                    submitButtonText="Submit"
                    loadingText="Creating..."
                />
            )

            expect(screen.getByText('Creating...')).toBeInTheDocument()
            expect(screen.getByRole('button')).toBeDisabled()
        })
    })

    describe('Dark Theme', () => {
        it('applies dark theme styling correctly', () => {
            render(
                <BaseScanForm
                    onSubmit={mockOnSubmit}
                    isLoading={false}
                    submitButtonText="Submit"
                    variant="dark"
                />
            )

            const form = screen.getByTestId('base-scan-form')
            expect(form).toHaveClass('bg-[#0a2540]')
            expect(form).toHaveClass('border-[#0c2d4d]')
        })
    })
}) 