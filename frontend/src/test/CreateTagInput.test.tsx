import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import CreateTagInput from '../components/CreateTagInput';
import { CreateNewTagDocument } from '../generated/graphql-types';

// Mock react-router for navigation
vi.mock('react-router', () => ({
    useNavigate: () => vi.fn()
}));

// Mock sonner for toast notifications
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

describe('CreateTagInput', () => {
    const mockOnTagCreated = vi.fn();
    const mockOnCancel = vi.fn();

    // Mock GraphQL mutation for successful tag creation
    const successfulCreateTagMock = {
        request: {
            query: CreateNewTagDocument,
            variables: {
                data: {
                    name: 'New Tag',
                    color: '#3b82f6'
                }
            }
        },
        result: {
            data: {
                createNewTag: {
                    id: 1,
                    name: 'New Tag',
                    color: '#3b82f6'
                }
            }
        }
    };

    // Mock GraphQL mutation for failed tag creation
    const failedCreateTagMock = {
        request: {
            query: CreateNewTagDocument,
            variables: {
                data: {
                    name: 'Duplicate Tag',
                    color: '#3b82f6'
                }
            }
        },
        error: new Error('Tag with this name already exists')
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the tag creation form with all required fields', () => {
        render(
            <MockedProvider mocks={[]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        // Check for form elements
        expect(screen.getByLabelText(/tag name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/tag color/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create tag/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('validates required tag name field', async () => {
        render(
            <MockedProvider mocks={[]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const createButton = screen.getByRole('button', { name: /create tag/i });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByText(/tag name is required/i)).toBeInTheDocument();
        });
    });

    it('validates tag name length constraints', async () => {
        render(
            <MockedProvider mocks={[]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const nameInput = screen.getByLabelText(/tag name/i);

        // Test minimum length
        fireEvent.change(nameInput, { target: { value: 'a' } });
        fireEvent.click(screen.getByRole('button', { name: /create tag/i }));

        await waitFor(() => {
            expect(screen.getByText(/tag name must be at least 2 characters/i)).toBeInTheDocument();
        });

        // Test maximum length
        const longName = 'a'.repeat(51);
        fireEvent.change(nameInput, { target: { value: longName } });
        fireEvent.click(screen.getByRole('button', { name: /create tag/i }));

        await waitFor(() => {
            expect(screen.getByText(/tag name must be at most 50 characters/i)).toBeInTheDocument();
        });
    });

    it('has a default color selected', () => {
        render(
            <MockedProvider mocks={[]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const colorInput = screen.getByLabelText(/tag color/i) as HTMLInputElement;
        expect(colorInput.value).toBe('#3b82f6'); // Default blue color
    });

    it('allows color selection from predefined options', () => {
        render(
            <MockedProvider mocks={[]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        // Check that color picker options are available
        const colorOptions = screen.getAllByRole('button', { name: /select color/i });
        expect(colorOptions.length).toBeGreaterThan(0);

        // Click on a color option
        fireEvent.click(colorOptions[0]);

        const colorInput = screen.getByLabelText(/tag color/i) as HTMLInputElement;
        expect(colorInput.value).toMatch(/^#[0-9a-fA-F]{6}$/); // Valid hex color
    });

    it('successfully creates a new tag and calls onTagCreated', async () => {
        render(
            <MockedProvider mocks={[successfulCreateTagMock]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        // Fill in the form
        const nameInput = screen.getByLabelText(/tag name/i);
        fireEvent.change(nameInput, { target: { value: 'New Tag' } });

        // Submit the form
        const createButton = screen.getByRole('button', { name: /create tag/i });
        fireEvent.click(createButton);

        // Wait for the mutation to complete
        await waitFor(() => {
            expect(mockOnTagCreated).toHaveBeenCalledWith({
                id: 1,
                name: 'New Tag',
                color: '#3b82f6'
            });
        });
    });

    it('shows loading state during tag creation', async () => {
        render(
            <MockedProvider mocks={[successfulCreateTagMock]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const nameInput = screen.getByLabelText(/tag name/i);
        fireEvent.change(nameInput, { target: { value: 'New Tag' } });

        const createButton = screen.getByRole('button', { name: /create tag/i });
        fireEvent.click(createButton);

        // Check for loading state
        expect(screen.getByText(/creating.../i)).toBeInTheDocument();
        expect(createButton).toBeDisabled();
    });

    it('handles tag creation errors gracefully', async () => {
        render(
            <MockedProvider mocks={[failedCreateTagMock]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const nameInput = screen.getByLabelText(/tag name/i);
        fireEvent.change(nameInput, { target: { value: 'Duplicate Tag' } });

        const createButton = screen.getByRole('button', { name: /create tag/i });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByText(/tag with this name already exists/i)).toBeInTheDocument();
        });

        // Should not call onTagCreated on error
        expect(mockOnTagCreated).not.toHaveBeenCalled();
    });

    it('calls onCancel when cancel button is clicked', () => {
        render(
            <MockedProvider mocks={[]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('resets form after successful tag creation', async () => {
        render(
            <MockedProvider mocks={[successfulCreateTagMock]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const nameInput = screen.getByLabelText(/tag name/i) as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: 'New Tag' } });

        const createButton = screen.getByRole('button', { name: /create tag/i });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(mockOnTagCreated).toHaveBeenCalled();
        });

        // Form should be reset
        expect(nameInput.value).toBe('');
    });

    it('has proper accessibility attributes', () => {
        render(
            <MockedProvider mocks={[]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        // Check for proper labels and ARIA attributes
        const nameInput = screen.getByLabelText(/tag name/i);
        expect(nameInput).toHaveAttribute('aria-label', 'Tag name');
        expect(nameInput).toHaveAttribute('type', 'text');

        const colorInput = screen.getByLabelText(/tag color/i);
        expect(colorInput).toHaveAttribute('aria-label', 'Tag color');
        expect(colorInput).toHaveAttribute('type', 'color');

        // Check form has proper role
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
        render(
            <MockedProvider mocks={[]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const nameInput = screen.getByLabelText(/tag name/i);
        const createButton = screen.getByRole('button', { name: /create tag/i });
        const cancelButton = screen.getByRole('button', { name: /cancel/i });

        // Check that elements can receive focus
        nameInput.focus();
        expect(document.activeElement).toBe(nameInput);

        // Tab navigation should work
        fireEvent.keyDown(nameInput, { key: 'Tab' });
        // Note: Actual tab navigation testing would require more complex setup
        // This test ensures the elements are focusable
        expect(createButton).not.toBeDisabled();
        expect(cancelButton).not.toBeDisabled();
    });

    it('trims whitespace from tag name', async () => {
        render(
            <MockedProvider mocks={[{
                request: {
                    query: CreateNewTagDocument,
                    variables: {
                        data: {
                            name: 'Trimmed Tag',
                            color: '#3b82f6'
                        }
                    }
                },
                result: {
                    data: {
                        createNewTag: {
                            id: 1,
                            name: 'Trimmed Tag',
                            color: '#3b82f6'
                        }
                    }
                }
            }]}>
                <CreateTagInput
                    onTagCreated={mockOnTagCreated}
                    onCancel={mockOnCancel}
                />
            </MockedProvider>
        );

        const nameInput = screen.getByLabelText(/tag name/i);
        fireEvent.change(nameInput, { target: { value: '  Trimmed Tag  ' } });

        const createButton = screen.getByRole('button', { name: /create tag/i });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(mockOnTagCreated).toHaveBeenCalledWith({
                id: 1,
                name: 'Trimmed Tag',
                color: '#3b82f6'
            });
        });
    });
}); 