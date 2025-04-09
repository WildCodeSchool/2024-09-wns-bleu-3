import LoginPage from "@/pages/LoginPage"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import type { ReactElement } from "react"
import { MemoryRouter } from "react-router"
import { expect, test, vi, beforeEach } from "vitest"
import { toast } from "sonner"
import "@testing-library/jest-dom";

// Mock sonner
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

// Mock useNavigate
const navigateMock = vi.fn()
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router")
    return {
        ...actual,
        useNavigate: () => navigateMock,
    }
})

// Mock GraphQL module
const loginMutationMock = vi.fn()
vi.mock("@/generated/graphql-types", () => ({
    useLoginMutation: () => [loginMutationMock, { loading: false }],
}))

// Simulation d'Apollo Client et du routage
function renderWithProviders(ui: ReactElement) {
    const client = new ApolloClient({
        uri: "http://localhost:4000/graphql",
        cache: new InMemoryCache(),
    })

    return render(
        <ApolloProvider client={client}>
            <MemoryRouter>{ui}</MemoryRouter>
        </ApolloProvider>,
    )
}

// Mock ResizeObserver pour éviter l'erreur de ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

// reset mocks avant chaque test
beforeEach(() => {
    vi.clearAllMocks();
    loginMutationMock.mockReset();
});

test("submits form with valid data and redirects", async () => {
    // mock en cas de succès de la mutation
    loginMutationMock.mockImplementation(({ onCompleted }) => {
        onCompleted({ login: { token: "fake-token" } })
        return { data: { login: { token: "fake-token" } } }
    })

    renderWithProviders(<LoginPage />)

    const emailInput = screen.getByPlaceholderText("email@example.com")
    const passwordInput = screen.getByPlaceholderText("••••••••")
    const submitButton = screen.getByRole("button", { name: /se connecter/i })

    fireEvent.change(emailInput, { target: { value: "valid@email.com" } })
    fireEvent.change(passwordInput, { target: { value: "Validpassword123&" } })

    fireEvent.click(submitButton)

    // Vérifier le success toast de login
    await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith("You’ve successfully logged in! Welcome to s0nar!")
    })

    // Vérifier que la navigation a eu lieu
    expect(navigateMock).toHaveBeenCalledWith("/")
})



test("Required field error messages are displayed on submit if fields are empty", async () => {
    renderWithProviders(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: /se connecter/i });

    // Simuler le clic sur le bouton sans remplir les champs
    fireEvent.click(submitButton);

    // Vérifier que les messages d'erreur pour les champs requis sont affichés
    const emailErrorMessage = await screen.findByText(/L'email est requis/i);
    const passwordErrorMessage = await screen.findByText(/Le mot de passe doit contenir au moins 8 caractères/i);

    // Vérification avec les assertions de Vitest + React Testing Library
    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
});

test("submits form with invalid data (unknown email) and displays error messages", async () => {
    // mock en cas d'erreur
    loginMutationMock.mockImplementation(({ onError }) => {
        if (onError) {
            const errorMessage = "Erreur de connexion: Incorrect login"
            onError(new Error(errorMessage))
        }
        return { errors: [{ message: "Erreur de connexion: Incorrect login" }] }
    })

    renderWithProviders(<LoginPage />)

    const emailInput = screen.getByPlaceholderText("email@example.com")
    const passwordInput = screen.getByPlaceholderText("••••••••")
    const submitButton = screen.getByRole("button", { name: /se connecter/i })

    // Remplir le formulaire avec des données invalides
    fireEvent.change(emailInput, { target: { value: "unknown@email.com" } })
    fireEvent.change(passwordInput, { target: { value: "Validpassword123&" } })

    fireEvent.click(submitButton)

    // Vérifier que le toast error est appelé
    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Login failed. Please check your credentials and try again.")
    })

})
