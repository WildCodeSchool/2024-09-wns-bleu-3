import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ScanForm from "../components/FormAddScan";


//variable isDev qui vérifie si les tests s'exécutent dans un environnement de développement
const isDev = import.meta.env.DEV;

// createScanMock qui imite l'appel API pour créer un scan
const createScanMock = vi.fn(({ onCompleted }) => {
  if (onCompleted) onCompleted();
  return { loading: false };
});

// useCreateNewScanMutation : Renvoie la fonction simulée pour créer des scans
// useGetAllFrequencesQuery : Renvoie des données d'exemple pour les fréquences (options Quotidien et Hebdomadaire)
// useGetAllTagsQuery : Renvoie des données d'exemple pour les tags (le tag "Vitrine")
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

  // Ce test s'assure que le rendu du composant reste cohérent entre les exécutions de test
  test("matches the snapshot when rendered", () => {
    const { asFragment } = render(<ScanForm />);
    expect(asFragment()).toMatchSnapshot();
  })

  // Test de soumission du formulaire
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

    // Pour cibler le select de fréquence on cible le trigger
    fireEvent.click(frequencySelect);
    const vitrineOption = screen.getByRole("option", { name: "Daily" });
    fireEvent.click(vitrineOption);

    // Pareil pour tag, on cible le trigger pour faire apparaitre les options pour en sélectionner une
    fireEvent.click(tagSelect);
    const tagOption = screen.getByRole("option", { name: "Vitrine" });
    fireEvent.click(tagOption);


    // On délcenche la soumission du form
    fireEvent.click(submitButton);


    // Vérifie la soumission en contrôlant :
    // Que la mutation simulée a été appelée avec les bonnes données
    // Qu'elle a été appelée exactement une fois
    await waitFor(() => {
      expect(createScanMock).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
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

  //Ce test s'assure que le formulaire valide correctement les entrées utilisateur
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