import "@testing-library/jest-dom";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MemoryRouter } from "react-router";
import type { ReactElement } from "react";
import BaseScanForm from "../components/BaseScanForm";

// Mock sonner for toast notifications
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

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
});

describe("BaseScanForm", () => {
    // Test: Component renders with required props
    test("renders with minimal required props", () => {
        const mockOnSubmit = vi.fn();

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
            />
        );

        // Check that URL field is always present (required for both variants)
        expect(screen.getByLabelText(/URL to scan/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    // Test: URL field validation
    test("validates URL field correctly", async () => {
        const mockOnSubmit = vi.fn();

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
            />
        );

        const submitButton = screen.getByRole("button", { name: /submit/i });

        // Submit without URL should show validation error
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/enter a valid url/i)).toBeInTheDocument();
        });

        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    // Test: Valid URL submission
    test("submits form with valid URL", async () => {
        const mockOnSubmit = vi.fn();

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
            />
        );

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /submit/i });

        fireEvent.change(urlInput, { target: { value: "https://example.com" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                url: "https://example.com"
            });
        });
    });

    // Test: Title field when showTitle is true
    test("renders title field when showTitle prop is true", () => {
        const mockOnSubmit = vi.fn();

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
                showTitle={true}
            />
        );

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    });

    // Test: Title field validation when shown
    test("validates title field when showTitle is true", async () => {
        const mockOnSubmit = vi.fn();

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
                showTitle={true}
            />
        );

        const submitButton = screen.getByRole("button", { name: /submit/i });

        // Submit without title should show validation error
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/title is required/i)).toBeInTheDocument();
        });
    });

    // Test: Tag selector when showTags is true
    test("renders tag selector when showTags prop is true", () => {
        const mockOnSubmit = vi.fn();
        const mockTags = [
            { id: 1, name: "Web App", color: "#00FF00" },
            { id: 2, name: "API", color: "#FFFF00" }
        ];

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
                showTags={true}
                availableTags={mockTags}
            />
        );

        expect(screen.getByText(/tags/i)).toBeInTheDocument();
    });

    // Test: Frequency selector when showFrequency is true
    test("renders frequency selector when showFrequency prop is true", () => {
        const mockOnSubmit = vi.fn();
        const mockFrequencies = [
            { id: 1, name: "Every 15 minutes", intervalMinutes: 15 },
            { id: 2, name: "Every hour", intervalMinutes: 60 }
        ];

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
                showFrequency={true}
                availableFrequencies={mockFrequencies}
            />
        );

        expect(screen.getByText(/frequency/i)).toBeInTheDocument();
    });

    // Test: Loading state
    test("shows loading state when isLoading is true", () => {
        const mockOnSubmit = vi.fn();

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={true}
                submitButtonText="Submit"
                loadingText="Creating..."
            />
        );

        expect(screen.getByText(/creating.../i)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeDisabled();
    });

    // Test: Full form submission with all fields
    test("submits complete form with all fields when all options are enabled", async () => {
        const mockOnSubmit = vi.fn();
        const mockTags = [
            { id: 1, name: "Web App", color: "#00FF00" },
            { id: 2, name: "API", color: "#FFFF00" }
        ];
        const mockFrequencies = [
            { id: 1, name: "Every 15 minutes", intervalMinutes: 15 },
            { id: 2, name: "Every hour", intervalMinutes: 60 }
        ];

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Create Scan"
                showTitle={true}
                showTags={true}
                showFrequency={true}
                availableTags={mockTags}
                availableFrequencies={mockFrequencies}
            />
        );

        // Fill all form fields
        const titleInput = screen.getByLabelText(/title/i);
        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /create scan/i });

        fireEvent.change(titleInput, { target: { value: "Test Website" } });
        fireEvent.change(urlInput, { target: { value: "https://test.com" } });

        // Select frequency
        const frequencySelect = screen.getByRole("combobox", { name: /frequency/i });
        fireEvent.click(frequencySelect);
        const frequencyOption = screen.getByRole("option", { name: "Every 15 minutes" });
        fireEvent.click(frequencyOption);

        // Select tag
        const tagSelect = screen.getByRole("combobox", { name: /tags/i });
        fireEvent.click(tagSelect);
        const tagOption = screen.getByRole("option", { name: "Web App" });
        fireEvent.click(tagOption);

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                title: "Test Website",
                url: "https://test.com",
                frequencyId: 1,
                tagIds: [1]
            });
        });
    });

    // Test: Custom styling props
    test("applies custom styling when provided", () => {
        const mockOnSubmit = vi.fn();
        const customClassName = "custom-form-class";

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
                className={customClassName}
            />
        );

        // Check that custom class is applied to the form container
        const formContainer = screen.getByRole("form") || screen.getByTestId("base-scan-form");
        expect(formContainer).toHaveClass(customClassName);
    });

    // Test: Error handling
    test("handles form submission errors gracefully", async () => {
        const mockOnSubmit = vi.fn().mockRejectedValue(new Error("Submission failed"));

        renderWithProviders(
            <BaseScanForm
                onSubmit={mockOnSubmit}
                isLoading={false}
                submitButtonText="Submit"
            />
        );

        const urlInput = screen.getByLabelText(/URL to scan/i);
        const submitButton = screen.getByRole("button", { name: /submit/i });

        fireEvent.change(urlInput, { target: { value: "https://example.com" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
        });

        // Form should handle the error gracefully without crashing
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });
}); 