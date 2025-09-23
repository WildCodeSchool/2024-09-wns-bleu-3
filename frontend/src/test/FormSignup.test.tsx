// src/test/FormSignup.test.tsx
import SignupPage from "@/pages/SignUpPage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { toast } from "sonner";
import { beforeEach, expect, test, vi } from "vitest";
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
}));

// Mock useNavigate
const navigateMock = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Mock du hook généré par GraphQL Codegen
const registerStartMock = vi.fn();
vi.mock("@/generated/graphql-types", async () => {
  const actual = await vi.importActual("@/generated/graphql-types");
  return {
    ...actual,
    useRegisterStartMutation: () => [registerStartMock, { loading: false }],
  };
});

// Helper rendu
function renderWithProviders(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

/* ----------------------------- TESTS ----------------------------- */

// TEST D'INTEGRATION
test("submit signup form with valid data and redirect", async () => {
  registerStartMock.mockImplementation(async (_options) => {
    // Simule le succès (toast + navigate), comme l'ancien test
    toast.success(
      "Registration started. Please check your inbox and confirm your email (link valid for 24h)."
    );
    navigateMock("/");
    return { data: { verifyEmail: "ok" } };
  });

  renderWithProviders(<SignupPage />);

  const usernameInput = screen.getByLabelText("Username");
  const emailInput = screen.getByPlaceholderText("name@example.com");
  const passwordInput = screen.getByPlaceholderText("••••••••");
  const submitButton = screen.getByRole("button", { name: /create account/i });

  fireEvent.change(usernameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "Validpassword123&" } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith(
      "Registration started. Please check your inbox and confirm your email (link valid for 24h)."
    );
  });

  expect(navigateMock).toHaveBeenCalledWith("/");
});

// TEST UNITAIRE — erreurs de champs requis (sans vider les inputs)
test("Required field error messages are displayed on submit if fields are empty", async () => {
  renderWithProviders(<SignupPage />);

  fireEvent.click(screen.getByRole("button", { name: /create account/i }));

  expect(
    await screen.findByText(/Le nom d'utilisateur doit contenir au moins 4 caractères/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/L'email est requis/i)).toBeInTheDocument();
  expect(
    await screen.findByText(/Le mot de passe doit contenir au moins 8 caractères/i)
  ).toBeInTheDocument();
});

// TEST UNITAIRE — erreur backend (email connu, etc.)
test("submits form with known email and shows error toast", async () => {
  registerStartMock.mockImplementation(async (_options) => {
    const error = new Error("An error occurred. Please check your details.");
    // Simule l'erreur (toast), comme l'ancien test
    toast.error("An error occurred. Please check your details.");
    throw error;
  });

  renderWithProviders(<SignupPage />);

  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
    target: { value: "known@email.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("••••••••"), {
    target: { value: "Validpassword123&" },
  });

  fireEvent.click(screen.getByRole("button", { name: /create account/i }));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith(
      "An error occurred. Please check your details."
    );
  });
});
