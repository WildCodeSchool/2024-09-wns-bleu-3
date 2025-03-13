import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import ScanForm from "../components/FormAddScan"; // Updated to match the component name
import { CREATE_NEW_SCAN } from "../graphql/mutations";
import { GET_ALL_TAGS } from "../graphql/queries";
import { GET_ALL_FREQUENCIES } from "../graphql/queries";

const mocks = [
    {
        request: {
            query: CREATE_NEW_SCAN,
            variables: {
                data: {
                    title: "youtube",
                    url: "https://youtube.com/",
                    frequencyId: 1,
                    tagIds: [3]
                }
            }
        },
        result: {
            data: {
                createScan: {
                    __typename: "Scan",
                    id: "1",
                    title: "youtube",
                    url: "https://youtube.com/",
                    frequencyId: "140",
                    tagIds: [3]
                }
            }
        }
    },
    {
        request: {
            query: GET_ALL_TAGS,
        },
        result: {
            data: {
                getAllTags: [
                    { id: 1, name: "web", color: "green" },

                ]
            }
        }
    },
    {
        request: {
            query: GET_ALL_FREQUENCIES,
        },
        result: {
            data: {
                getAllFrequences: [
                    { id: 2, name: "360", intervalMinutes: 360 },
                    { id: 3, name: "140", intervalMinutes: 140 }
                ]
            }
        }
    },
];

test("displays ScanForm", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ScanForm />
        </MockedProvider>
    );

    expect(screen.getByRole('button', { name: /start scanning/i })).toBeInTheDocument();
    expect(screen.getByText(/URL to scan/i)).toBeInTheDocument();
    expect(screen.getByText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Select a frequency/i)).toBeInTheDocument();
    expect(screen.getByText(/Select a tag/i)).toBeInTheDocument();
});


test("creates a new scan", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ScanForm />
        </MockedProvider>
    );

    // Récupérer les champs et le bouton
    const titleInput = screen.getByLabelText(/title/i);
    const urlInput = screen.getByLabelText(/url to scan/i);
    const tagInput = screen.getByLabelText(/Select a tag/i)
    const frequencyInput = screen.getByLabelText(/Select a frequency/i)
    const submitButton = screen.getByRole("button", { name: /start scanning/i });

    // Simuler l'entrée utilisateur
    await userEvent.type(titleInput, "youtube");
    await userEvent.type(urlInput, "https://youtube.com/");
    await userEvent.selectOptions(tagInput, "web");
    await userEvent.selectOptions(frequencyInput, "");



    // Soumettre le formulaire
    await userEvent.click(submitButton);

    // Vérifier si l'entrée est bien soumise et une réponse est affichée
    expect(await screen.findByText("Creating...")).toBeInTheDocument();
});