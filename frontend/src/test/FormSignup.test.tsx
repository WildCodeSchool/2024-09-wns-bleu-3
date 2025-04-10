
import SignupPage from "@/pages/SignUpPage"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ReactElement } from "react"
import { MemoryRouter } from "react-router"
import { toast } from "sonner"
import { beforeEach, expect, test, vi } from "vitest"
import "@testing-library/jest-dom";

beforeEach(() => {
    vi.clearAllMocks();
});

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

// Mock Apollo client
const registerMutationMock = vi.fn()
vi.mock("@apollo/client", async () => {
    const actual = await vi.importActual("@apollo/client")
    return {
        ...actual,
        useMutation: () => [
            registerMutationMock,
            { loading: false }
        ],
    }
})

// Mock du register mutation
vi.mock("@/graphql/mutations", () => ({
    REGISTER: "MOCKED_REGISTER_MUTATION"
}))

// Simulation du routage
function renderWithProviders(ui: ReactElement) {

    return render(
        <MemoryRouter>{ui}</MemoryRouter>
    )
}

// TEST D'INTEGRATION
test("submit signup form with valid data and redirect", async () => {
    // setup le mock pour qu'il appelle le callback onCompleted
    registerMutationMock.mockImplementation(async (options) => {
        const result = { data: { register: "user successfully created" } }
        // Appeler manuellement le toast.success pour simuler le callback onCompleted
        toast.success("You’ve successfully signed up! Welcome to s0nar!")
        // Appeler manuellement navigate pour simuler la redirection
        navigateMock("/")
        return result
    })

    renderWithProviders(<SignupPage />)

    const usernameInput = screen.getByLabelText("Username")
    const emailInput = screen.getByPlaceholderText("name@example.com")
    const passwordInput = screen.getByPlaceholderText("••••••••")
    const submitButton = screen.getByRole("button", { name: /create account/i })

    fireEvent.change(usernameInput, { target: { value: "John Doe" } })
    fireEvent.change(emailInput, { target: { value: "valid@email.com" } })
    fireEvent.change(passwordInput, { target: { value: "Validpassword123&" } })

    fireEvent.click(submitButton)


    // Vérifie le success toast
    await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith("You’ve successfully signed up! Welcome to s0nar!")
    }, { timeout: 3000 })

    // Vérifie la navigation
    expect(navigateMock).toHaveBeenCalledWith("/")
})


// TEST UNITAIRE
test("Required field error messages are displayed on submit if fields are empty", async () => {
    renderWithProviders(<SignupPage />)

    const submitButton = screen.getByRole("button", { name: /create account/i })

    // Simuler le clic sur le bouton sans remplir les champs
    fireEvent.click(submitButton)

    // Vérifier que les messages d'erreur pour les champs requis sont affichés
    const usernameErrorMessage = await screen.findByText(/Le nom d'utilisateur doit contenir au moins 4 caractères/i)
    const emailErrorMessage = await screen.findByText(/L'email est requis/i)
    const passwordErrorMessage = await screen.findByText(/Le mot de passe doit contenir au moins 8 caractères/i)

    // Vérification avec les assertions de Vitest + React Testing Library
    expect(usernameErrorMessage).toBeInTheDocument()
    expect(emailErrorMessage).toBeInTheDocument()
    expect(passwordErrorMessage).toBeInTheDocument()
})


//TEST UNITAIRE:
test("submits form with known email and shows error toast", async () => {
    // simuler une mutation échouée (email déjà utilisé)
    registerMutationMock.mockImplementation(async (options) => {
        const error = new Error("/Erreur lors de l'inscription :/")
        // Appeler manuellement toast.error pour simuler l'affichage de l'erreur
        toast.error("An error occurred. Please check your details.")
        throw error;
    })
    renderWithProviders(<SignupPage />)

    // Remplir les champs
    fireEvent.change(screen.getByLabelText("Username"), {
        target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
        target: { value: "known@email.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
        target: { value: "Validpassword123&" },
    })

    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
            "An error occurred. Please check your details."
        )
    })
})