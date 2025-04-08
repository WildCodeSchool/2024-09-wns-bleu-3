import "@testing-library/jest-dom";
import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router";
import Header from "../components/Header";

// Composants simples pour nos routes de test
const Home = () => <div>Page d'accueil</div>;
const Scans = () => <div>Page de scans</div>;
const Login = () => <div>Page de connexion</div>;
const SignIn = () => <div>Page d'inscription</div>;

// Composant pour afficher l'emplacement actuel
const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
};

describe("Header Component Navigation", () => {
    test.skip("navigation vers la page de connexion fonctionne correctement", async () => {
        // Configuration de userEvent
        const user = userEvent.setup();

        // Rendu de l'application avec le routeur et les routes ainsi que le HEADER
        render(
            <MemoryRouter initialEntries={['/']}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/scans" element={<Scans />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignIn />} />
                </Routes>
                <LocationDisplay />
            </MemoryRouter>
        );

        // Vérifier que nous sommes sur la page d'accueil au début
        expect(screen.getByText("Page d'accueil")).toBeInTheDocument();

        // Trouver et cliquer sur le lien de connexion
        const loginLink = screen.getByRole("link", { name: /Sign in/i });
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute("href", "/login");

        // Cliquer sur le lien
        await user.click(loginLink);

        // Vérifier que nous sommes maintenant sur la page de connexion
        expect(screen.getByText("Se connecter à Sonar")).toBeInTheDocument();
        expect(screen.getByTestId("location-display")).toHaveTextContent("/login");

        // Trouver et cliquer sur le lien d'inscription
        const registerLink = screen.getByRole("link", { name: /Sign up/i });
        expect(registerLink).toBeInTheDocument();
        expect(registerLink).toHaveAttribute("href", "/signup");

        // Cliquer sur le lien
        await user.click(registerLink);

        // Vérifier que nous sommes maintenant sur la page d'inscription
        expect(screen.getByText("Create an Account")).toBeInTheDocument();
        expect(screen.getByTestId("location-display")).toHaveTextContent("/signin");

        // Trouver et cliquer sur le lien de la page des scans
        // const scansLink = screen.getByRole("link", { name: /See all my scans/i });
        // expect(scansLink).toBeInTheDocument();
        // expect(scansLink).toHaveAttribute("href", "/scans");

        // Cliquer sur le lien
        // await user.click(scansLink);

        // Vérifier que nous sommes maintenant sur la page des scans
        // expect(screen.getByText("Page de scans")).toBeInTheDocument();
        // expect(screen.getByTestId("location-display")).toHaveTextContent("/scans");

        // Trouver et cliquer sur le lien de la page d'accueil
        // const homeLink = screen.getByRole("link", { name: /Accueil/i });

        // expect(homeLink).toBeInTheDocument();
        // expect(homeLink).toHaveAttribute("href", "/");

        // Cliquer sur le lien
        // await user.click(homeLink);

        // Vérifier que nous sommes maintenant sur la page d'accueil
        // expect(screen.getByText("Page d'accueil")).toBeInTheDocument();
        // expect(screen.getByTestId("location-display")).toHaveTextContent("/");
    });
});