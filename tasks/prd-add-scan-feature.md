# Product Requirements Document (PRD): Add Scan Form Feature

## 1. Introduction / Overview
The Add Scan Form Feature will enable both unauthenticated visitors and authenticated users to create and preview website scans directly from the homepage or dashboard. Visitors can quickly try the scan tool without an account, while logged-in users can fully configure scans (title, URL, tags, frequency) and have them saved for ongoing monitoring.

## 2. Goals
- Provide a quick, zero-friction scan experience for new visitors.
- Encourage account creation by prompting users to log in when saving scans.
- Deliver a reusable form component that adapts based on authentication state.
- Allow authenticated users to organize scans with titles, tags, and scheduled frequencies.
- Ensure maintainable, testable code following TDD and monorepo conventions.

## 3. User Stories
- As a visitor (not logged in), I want to enter a URL on the homepage to try out the scan feature.
- As a visitor, I want to be redirected to a scan preview page after submitting a URL to see scan results.
- As a visitor, I want to be prompted to log in after seeing scan results so I can save and manage them later.
- As a logged-in user, I want to create a scan with a title, URL, tags, and frequency so I can organize my scans.
- As a logged-in user, I want to select a scan frequency from predefined options so scans run automatically.
- As a logged-in user, I want to create new tags inline in the form so I can label my scans flexibly.
- As a logged-in user, I want to submit the scan form and have it saved so I can access it later in my dashboard.
- As a developer, I want the scan form to be a reusable component so I can use it on the homepage and in the dashboard.
- As a developer, I want the form behavior to adapt based on authentication status so fields and flows adjust accordingly.

## 4. Functional Requirements
1. The system must render a public scan form on the homepage containing only a required URL input.
2. On public form submit, the app must navigate to `/scan/preview?url={encodedUrl}`.
3. The scan preview page must fetch scan data using a new `previewScan(url)` GraphQL query and display `statusCode`, `statusMessage`, `responseTime`, `sslCertificate`, and `isOnline`.
4. The scan preview page must show a "Log in to save" button for unauthenticated users that navigates to the login page.
5. The system must render an authenticated scan form on the dashboard with title, URL, tag selector (with inline tag creation), and frequency dropdown (options fetched from backend).
6. All authenticated form fields must be required and validated (URL format, non-empty title, etc.).
7. On successful authenticated form submit, the system must call `createNewScan` GraphQL mutation, save the scan, then navigate to `/dashboard/scan/{scanId}` and display a success message.
8. Inline tag creation must call `createNewTag` mutation and refresh the tag list.
9. The `ScanForm` component must be implemented by composing a base form (`BaseScanForm`) and two variants (`PublicScanForm`, `AuthScanForm`).

## 5. Visual Feature (Mermaid Diagram)
```mermaid
flowchart LR
  Visitor((Visitor)) --> PublicScanForm["<PublicScanForm />"]
  PublicScanForm -->|submit URL| Redirect["navigate /scan/preview?url={encodedUrl}"]
  Redirect --> PreviewPage["<ScanPreviewPage />"]
  PreviewPage -->|usePreviewScanQuery| PreviewQuery
  PreviewQuery --> ScanResolver
  ScanResolver --> scanUrlUtil["scanUrl util"]
  scanUrlUtil --> ScanResolver
  PreviewQuery --> PreviewPage
  PreviewPage --> LoginPrompt["Log in to save button"]

  User((Logged-in User)) --> AuthScanForm["<AuthScanForm />"]
  AuthScanForm -->|createNewScan(data)| CreateMutation
  CreateMutation --> Database[(PostgreSQL)]
  CreateMutation --> PubSub[(SCAN_CREATED)]
  CreateMutation --> AuthScanForm
  AuthScanForm -->|redirect| Dashboard["/dashboard/scan/{scanId}"]
``` 

## 6. Non-Goals (Out of Scope)
- Persisting public scan results beyond the current page load (no DB storage for visitors).
- Advanced filtering or historical scan management on the preview page.
- Offline support or refresh-persistent ephemeral scan data.

## 7. Design Considerations
- Use existing ShadCN UI components and Tailwind styling.
- Public form uses homepage theme (dark background); dashboard form uses default white background.
- Inline tag creation can be implemented as a modal or in-place input within the tag dropdown.

## 8. Technical Considerations
- Add new GraphQL query `previewScan(url: String!): ScanPreview!` in `ScanResolver`.
- Use Zod schema `scanUrlResponseSchema` for preview type validation.
- Regenerate GraphQL hooks via `graphql-codegen`.
- Update React Router config to include `/scan/preview` route.
- Implement TDD with Vitest for `PublicScanForm`, `AuthScanForm`, and `ScanPreviewPage`.

## 9. Success Metrics
- Increase in trial scan usage (visitor scans).
- Conversion rate from trial scan to user signup.
- Number of scans created by authenticated users.

## 10. Open Questions
- None. 