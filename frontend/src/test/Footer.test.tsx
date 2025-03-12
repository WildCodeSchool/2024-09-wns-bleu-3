import "@testing-library/jest-dom"; // TODO check if needed
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { MemoryRouter } from "react-router";

test("displays footer", async () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    expect(await screen.findByText("Terms")).toBeInTheDocument();
});