import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
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
                    url: "https://youtube.com/"
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
                    { id: 1, name: "production" },
                    { id: 2, name: "staging" },
                    { id: 3, name: "vitrine" }
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
                    { id: 1, name: "Every 30 minutes" },
                    { id: 2, name: "Hourly" }
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