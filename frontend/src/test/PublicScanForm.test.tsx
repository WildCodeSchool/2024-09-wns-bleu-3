import "@testing-library/jest-dom";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MemoryRouter } from "react-router";
import type { ReactElement } from "react";
import PublicScanForm from "../components/PublicScanForm";

// Mock sonner for toast notifications
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock useNavigate for routing tests
const navigateMock = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

// Mock ResizeObserver to avoid test errors
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

// Apollo Client wrapper for tests
function renderWithProviders(ui: ReactElement) {
    const client = new ApolloClient({
        uri: "http://localhost:4000/graphql",
        cache: new InMemoryCache(),
    });

    return render(
        <ApolloProvider client={client}>
            <MemoryRouter>{ui}</MemoryRouter>
        </ApolloProvider>,
    );
}

// Reset mocks before each test
beforeEach(() => {
    vi.clearAllMocks();
    navigateMock.mockReset();
});

describe("PublicScanForm", () => {
    // Test: Component renders correctly
    test("renders public scan form with URL field only", () => {
        renderWithProviders(<PublicScanForm />);

        // Should have URL field
        expect(screen.getByLabelText(/URL to scan/i)).toBeInTheDocument();

        // Should have submit button
        expect(screen.getByRole("button", { name: /scan your website/i })).toBeInTheDocument();

        // Should have appropriate heading for public form
        expect(screen.getByText(/quick url check/i)).toBeInTheDocument();

        // Should NOT have title field (public form is URL-only)
        expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();

        // Should NOT have tags field
        expect(screen.queryByText(/tags/i)).not.toBeInTheDocument();

        // Should NOT have frequency field
        expect(screen.queryByText(/frequency/i)).not.toBeInTheDocument();
    });

    // Test: Dark theme styling (homepage variant)
    test("applies dark theme styling by default", () => {
        renderWithProviders(<PublicScanForm />);

        const formContainer = screen.getByTestId("base-scan-form");

        // Should have dark theme classes
        expect(formContainer).toHaveClass("bg-[#0a2540]");
        expect(formContainer).toHaveClass("border-[#0c2d4d]");
    });

    // Test: URL validation
    test.skip("validates URL field and shows error for invalid URL", async () => {
        renderWithProviders(<PublicScanForm />);

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /scan your website/i });

        // Submit with invalid URL
        fireEvent.change(urlInput, { target: { value: "invalid-url" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid http or https url/i)).toBeInTheDocument();
        });

        // Should not navigate
        expect(navigateMock).not.toHaveBeenCalled();
    });

    // Test: Empty URL validation
    test("shows validation error when URL is empty", async () => {
        renderWithProviders(<PublicScanForm />);

        const submitButton = screen.getByRole("button", { name: /scan your website/i });

        // Submit without URL
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/url is required/i)).toBeInTheDocument();
        });

        // Should not navigate
        expect(navigateMock).not.toHaveBeenCalled();
    });

    // Test: Valid URL submission and navigation
    test("navigates to preview page with valid URL", async () => {
        renderWithProviders(<PublicScanForm />);

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /scan your website/i });

        // Submit with valid URL
        fireEvent.change(urlInput, { target: { value: "https://example.com" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith("/scan/preview?url=https%3A%2F%2Fexample.com");
        });
    });

    // Test: URL encoding for navigation
    test("properly encodes URL parameters when navigating", async () => {
        renderWithProviders(<PublicScanForm />);

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /scan your website/i });

        // Submit with URL that needs encoding
        const complexUrl = "https://example.com/path?param=value&other=test";
        fireEvent.change(urlInput, { target: { value: complexUrl } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith(
                `/scan/preview?url=${encodeURIComponent(complexUrl)}`
            );
        });
    });

    // Test: Loading state
    test.skip("shows loading state during form submission", async () => {
        // Mock navigate to be async so we can catch loading state
        navigateMock.mockImplementation(() => {
            return new Promise(resolve => setTimeout(resolve, 100));
        });

        renderWithProviders(<PublicScanForm />);

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /scan your website/i });

        // Fill valid URL
        fireEvent.change(urlInput, { target: { value: "https://example.com" } });

        // Submit form
        fireEvent.click(submitButton);

        // Should show loading state briefly
        expect(screen.getByText(/checking.../i)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();

        // Wait for navigation to complete
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalled();
        });
    });

    // Test: Form reset after submission
    test("resets form after successful submission", async () => {
        renderWithProviders(<PublicScanForm />);

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /scan your website/i });

        // Submit with valid URL
        fireEvent.change(urlInput, { target: { value: "https://example.com" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalled();
        });

        // Form should be reset
        expect(urlInput).toHaveValue("");
    });

    // Test: Multiple URL formats
    test("accepts various valid URL formats", async () => {
        const validUrls = [
            "https://example.com",
            "http://example.com",
            "https://subdomain.example.com",
            "https://example.com/path",
            "https://example.com:8080",
            "https://example.com/path?query=value",
            "https://example.com/path#fragment"
        ];

        for (const url of validUrls) {
            const { unmount } = renderWithProviders(<PublicScanForm />);

            const urlInput = screen.getByLabelText(/URL to scan/i);
            const submitButton = screen.getByRole("button", { name: /scan your website/i });

            fireEvent.change(urlInput, { target: { value: url } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(navigateMock).toHaveBeenCalledWith(
                    `/scan/preview?url=${encodeURIComponent(url)}`
                );
            });

            // Reset for next iteration
            navigateMock.mockReset();
            unmount();
        }
    });

    // Test: Accessibility
    test("has proper accessibility attributes", () => {
        renderWithProviders(<PublicScanForm />);

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /scan your website/i });

        // Check ARIA attributes
        expect(urlInput).toHaveAttribute("aria-label", "URL to scan");
        expect(urlInput).toHaveAttribute("type", "url");
        expect(submitButton).toHaveAttribute("type", "submit");

        // Check form structure
        expect(screen.getByRole("form")).toBeInTheDocument();
    });

    // Test: Keyboard navigation
    test("supports keyboard navigation", async () => {
        renderWithProviders(<PublicScanForm />);

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const form = screen.getByRole("form");

        // Focus on URL input
        urlInput.focus();
        expect(urlInput).toHaveFocus();

        // Type URL
        fireEvent.change(urlInput, { target: { value: "https://example.com" } });

        // Submit form (Enter key triggers form submission)
        fireEvent.submit(form);

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith("/scan/preview?url=https%3A%2F%2Fexample.com");
        });
    });

    // Test: Error handling for navigation failures
    test("handles navigation errors gracefully", async () => {
        // Mock navigate to throw an error
        navigateMock.mockImplementation(() => {
            throw new Error("Navigation failed");
        });

        renderWithProviders(<PublicScanForm />);

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /scan your website/i });

        fireEvent.change(urlInput, { target: { value: "https://example.com" } });
        fireEvent.click(submitButton);

        // Should handle error gracefully without crashing
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalled();
        });

        // Form should still be functional
        expect(screen.getByLabelText(/URL to scan/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /scan your website/i })).toBeInTheDocument();
    });
}); 