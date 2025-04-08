import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "@/components/Header";
import { MockedProvider } from '@apollo/client/testing';

const isDev = import.meta.env.DEV;

// Mock the navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock("../generated/graphql-types", () => ({
    // Mock the user info query
    useGetUserInfoQuery: () => ({
        data: {
            getUserInfo: [{
                id: 1,
                isLoggedIn: true,
                email: "jean@gmail.com",
                username: "Jean"
            }]
        },
        loading: false,
        error: undefined,
    }),

    // Mock the logout mutation
    useLogoutMutation: () => {
        return [
            vi.fn(), // The logout function
            { loading: false, error: undefined } // The mutation result
        ];
    }
}));

describe.runIf(isDev)("Header", () => {
    test("displays header with navigation links correctly", async () => {
        render(
            <MockedProvider addTypename={false}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </MockedProvider>
        );

        // Check main navigation text
        expect(await screen.findByText("nar")).toBeInTheDocument();

        // Check scan
        const allScansLink = screen.getByRole("link", { name: /See all my scans/i });
        expect(allScansLink).toBeInTheDocument();
        expect(allScansLink).toHaveAttribute("href", "/scans");
        // Check sign-in
        const signInLink = screen.getByRole("link", { name: /Sign in/i });
        expect(signInLink).toBeInTheDocument();
        expect(signInLink).toHaveAttribute("href", "/login");

        // Check sign-up link
        const signUpLink = screen.getByRole("link", { name: /Sign up/i });
        expect(signUpLink).toBeInTheDocument();
        expect(signUpLink).toHaveAttribute("href", "/signup");
    });
});