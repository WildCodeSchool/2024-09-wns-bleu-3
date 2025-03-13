import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import ScanForm from "../components/FormAddScan";

const createScanMock = vi.fn(({ onCompleted }) => {
    if (onCompleted) onCompleted();
    return { loading: false };
});

const useGetAllFrequencesQueryMock = vi.fn(() => {
    return ({
        data: {
            getAllFrequences: [
                { id: 1, name: "Daily", intervalMinutes: 60 },
                { id: 2, name: "Weekly", intervalMinutes: 30 },
            ]
        }
    })

});

const useGetAllTagsMock = vi.fn(() => ({
    data: {
        getAllTags: [
            { id: 1, name: "Vitrine", color: "blue" },
        ]
    }
}));

vi.mock("../generated/graphql-types", () => ({
    useCreateNewScanMutation: () => [createScanMock],
    useGetAllFrequencesQuery: () => ({
        data: {
            getAllFrequences: [
                { id: 1, name: "Daily", intervalMinutes: 60 },
                { id: 2, name: "Weekly", intervalMinutes: 30 },
            ]
        }
    }),
    useGetAllTagsQuery: () => useGetAllTagsMock,
}));

test("displays ScanForm", async () => {
    const user = userEvent.setup()
    render(
        <ScanForm />
    );

    // expect(screen.getByRole('button', { name: /start scanning/i })).toBeInTheDocument();
    // expect(screen.getByText(/URL to scan/i)).toBeInTheDocument();
    // expect(screen.getByText(/Title/i)).toBeInTheDocument();
    // expect(screen.getByText(/Select a frequency/i)).toBeInTheDocument();
    // expect(screen.getByText(/Select a tag/i)).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText("My Website Monitor");
    const urlInput = screen.getByPlaceholderText("https://example.com");
    const frequencySelect = screen.getByTestId("freqSelect");
    const tagSelect = screen.getByRole("select", { name: "tag" });
    const submitButton = screen.getByRole("button");
    fireEvent.change(titleInput, { target: { value: "youtube" } });
    fireEvent.change(urlInput, { target: { value: "https://youtube.com" } });
    user.selectOptions(frequencySelect, "1");
    user.selectOptions(tagSelect, "1");
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(createScanMock).toHaveBeenCalledWith(
            expect.objectContaining({
                variables: { data: { title: "youtube", url: "https://youtube.com", frequencyId: 3, tagIds: 1 } },
            })
        );
    });
});