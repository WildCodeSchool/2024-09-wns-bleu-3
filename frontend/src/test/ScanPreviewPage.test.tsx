import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ScanPreviewPage from '../pages/ScanPreviewPage';
import { PREVIEW_SCAN } from '../graphql/queries';

// Mock react-router hooks
const mockNavigate = vi.fn();
const mockGet = vi.fn();
const mockSetSearchParams = vi.fn();

// Create a mock URLSearchParams that we can control
const mockSearchParams = {
    get: mockGet,
};

vi.mock('react-router', () => ({
    useNavigate: () => mockNavigate,
    useSearchParams: () => [mockSearchParams, mockSetSearchParams],
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock sonner for toast notifications
vi.mock('sonner', () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn(),
    },
}));

describe('ScanPreviewPage', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createMockProvider = (mocks: any[] = []) => {
        return ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={mocks} addTypename={false}>
                {children}
            </MockedProvider>
        );
    };

    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();
        // Set default URL parameter
        mockGet.mockReturnValue('https://example.com');
    });

    describe('URL Parameter Handling', () => {
        it('should render with URL from search parameters', () => {
            const MockProvider = createMockProvider();
            render(<ScanPreviewPage />, { wrapper: MockProvider });

            // Should not show "no url provided" error
            expect(screen.queryByText(/no url provided/i)).not.toBeInTheDocument();
        });

        it('should handle missing URL parameter', () => {
            // Override the mock for this test to return null
            mockGet.mockReturnValue(null);

            const MockProvider = createMockProvider();
            render(<ScanPreviewPage />, { wrapper: MockProvider });

            expect(screen.getByText(/no url provided/i)).toBeInTheDocument();
        });

        it('should handle empty URL parameter', () => {
            // Override the mock for this test to return empty string
            mockGet.mockReturnValue('');

            const MockProvider = createMockProvider();
            render(<ScanPreviewPage />, { wrapper: MockProvider });

            expect(screen.getByText(/no url provided/i)).toBeInTheDocument();
        });
    });

    describe('Data Fetching', () => {
        it('should fetch scan preview data on mount', async () => {
            const mockQuery = {
                request: {
                    query: PREVIEW_SCAN,
                    variables: { url: 'https://example.com' }
                },
                result: {
                    data: {
                        previewScan: {
                            url: 'https://example.com',
                            statusCode: 200,
                            statusMessage: 'OK',
                            responseTime: 150,
                            sslCertificate: '30 days',
                            isOnline: true
                        }
                    }
                }
            };

            const MockProvider = createMockProvider([mockQuery]);
            render(<ScanPreviewPage />, { wrapper: MockProvider });

            await waitFor(() => {
                expect(screen.getByText('https://example.com')).toBeInTheDocument();
                expect(screen.getByText('200')).toBeInTheDocument();
                expect(screen.getByText('OK')).toBeInTheDocument();
                expect(screen.getByText('150ms')).toBeInTheDocument();
                expect(screen.getByText('30 days')).toBeInTheDocument();
            });
        });

        it('should display loading state while fetching data', () => {
            const mockQuery = {
                request: {
                    query: PREVIEW_SCAN,
                    variables: { url: 'https://example.com' }
                },
                delay: 1000, // Simulate slow response
                result: {
                    data: {
                        previewScan: {
                            url: 'https://example.com',
                            statusCode: 200,
                            statusMessage: 'OK',
                            responseTime: 150,
                            sslCertificate: '30 days',
                            isOnline: true
                        }
                    }
                }
            };

            const MockProvider = createMockProvider([mockQuery]);
            render(<ScanPreviewPage />, { wrapper: MockProvider });

            expect(screen.getByText(/scanning url/i)).toBeInTheDocument();
            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });
    });

    describe('Login Prompt', () => {
        it('should show login prompt for unauthenticated users', async () => {
            const mockQuery = {
                request: {
                    query: PREVIEW_SCAN,
                    variables: { url: 'https://example.com' }
                },
                result: {
                    data: {
                        previewScan: {
                            url: 'https://example.com',
                            statusCode: 200,
                            statusMessage: 'OK',
                            responseTime: 150,
                            sslCertificate: '30 days',
                            isOnline: true
                        }
                    }
                }
            };

            const MockProvider = createMockProvider([mockQuery]);
            render(<ScanPreviewPage />, { wrapper: MockProvider });

            await waitFor(() => {
                expect(screen.getByText(/login to save this scan/i)).toBeInTheDocument();
                expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
            });
        });
    });
}); 