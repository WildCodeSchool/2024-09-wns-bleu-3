import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ScanForm from "../components/FormAddScan";

const isDev = import.meta.env.DEV;

const createScanMock = vi.fn(({ onCompleted }) => {
  if (onCompleted) onCompleted();
  return { loading: false };
});

vi.mock("../generated/graphql-types", () => ({
  useCreateNewScanMutation: () => [createScanMock],
  useGetAllFrequencesQuery: () => ({
    data: {
      getAllFrequences: [
        { id: 1, name: "Daily", intervalMinutes: 60 },
        { id: 2, name: "Weekly", intervalMinutes: 30 },
      ],
    },
  }),
  useGetAllTagsQuery: () => ({
    data: { getAllTags: [{ id: 1, name: "Vitrine" }] },
  }),
}));

describe.runIf(isDev)("ScanForm", () => {

  test("matches the snapshot when rendered", () => {
    const { asFragment } = render(<ScanForm />);
    expect(asFragment()).toMatchSnapshot();
  })

  test("Create a scan", async () => {
    // const user = userEvent.setup();
  
    render(<ScanForm />);
    // screen.debug();
  
    const titleInput = screen.getByPlaceholderText("My Website Monitor");
    const urlInput = screen.getByPlaceholderText("https://example.com");
    const frequencySelect = screen.getByTestId('freqSelectButton');
    const tagSelect = screen.getByTestId('tagSelectButton');
    const submitButton = screen.getByRole("button");
  
    fireEvent.change(titleInput, { target: { value: "youtube" } });
    fireEvent.change(urlInput, { target: { value: "https://youtube.com" } });
  
    // To target the select frequence, we need to click on the trigger
    fireEvent.click(frequencySelect);
    const vitrineOption = screen.getByRole("option", { name: "Daily" });
    fireEvent.click(vitrineOption);
  
    // To target the select tag, we need to click on the trigger
    fireEvent.click(tagSelect);
    const tagOption = screen.getByRole("option", { name: "Vitrine" });
    fireEvent.click(tagOption);
  
  
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(createScanMock).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            data: {
              title: "youtube",
              url: "https://youtube.com",
              tagIds: [1],
              frequencyId: 1,
            },
          },
        })
      );
  
      expect(createScanMock).toHaveBeenCalledTimes(1);
  
    });
  });

  test("Display error message if title or url is empty", async () => {
    render(<ScanForm />);
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Le titre est requis")).toBeInTheDocument();
      expect(screen.getByText("Veuillez entrer une URL valide")).toBeInTheDocument();
    });
  });

});
