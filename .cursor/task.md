# Add Modular Scan Form to Dashboard (V2)

This plan details the steps required to add a scan submission form to the dashboard. The form will be a refactored version of the existing scan creation component, designed to be modular and support both authenticated and unauthenticated user states, with a clear user flow for anonymous submissions.

## Phase 1: Pre-development & Backend

- [ ] **File Discovery**:
  - Locate the main dashboard component (likely `frontend/src/pages/Dashboard.tsx`).
  - Locate the existing standalone "create scan" component to be refactored.
- [ ] **Backend - `Scan` Entity**:
  - Modify the `Scan` entity in [`backend/src/entities/Scan.ts`](mdc:backend/src/entities/Scan.ts). The relationship to the `User` entity must be made nullable (`@ManyToOne(() => User, (user) => user.scans, { nullable: true })`).
- [ ] **Backend - `createAnonymousScan` Mutation**:
  - Add a new mutation, `createAnonymousScan`, to [`backend/src/resolver/ScanResolver.ts`](mdc:backend/src/resolver/ScanResolver.ts).
  - Define the new mutation in [`backend/src/schema/scan.graphql`](mdc:backend/src/schema/scan.graphql) to accept only a `url`.
  - The resolver will hardcode the `frequency` to a default (e.g., 60 minutes) and associate no `tags`.
- [ ] **Backend - Security**:
  - Implement IP-based rate-limiting on the `createAnonymousScan` mutation to prevent abuse. This can be done with middleware like `express-rate-limit`.
- [ ] **Backend - Data Lifecycle**:
  - Create a new cron job in [`backend/src/cron/`](mdc:backend/src/cron) to delete anonymous scans older than 48 hours. This prevents database bloat from orphaned data.

## Phase 2: Frontend Development

- [ ] **Authentication Hook**:
  - Verify that a reliable `useAuth` hook exists for checking user authentication status on the client. If not, create one. It should provide a simple `isAuthenticated: boolean` flag.
- [ ] **Refactor to `ScanForm.tsx`**:
  - Create a new reusable component, `frontend/src/components/ScanForm.tsx`, by refactoring the existing scan creation form.
  - The component will accept an `isAuthenticated: boolean` prop.
  - **Authenticated State (`isAuthenticated={true}`)**: Renders all fields (URL, tags, frequencies) and calls the existing `createScan` mutation.
  - **Unauthenticated State (`isAuthenticated={false}`)**: Renders only the URL input, shows a disabled frequency display, and calls the new `createAnonymousScan` mutation.
- [ ] **Error Handling**:
  - Implement state within `ScanForm.tsx` to display clear error messages to the user (e.g., "Invalid URL," "You are submitting too fast, please wait").
- [ ] **Integrate `ScanForm` into Dashboard**:
  - Import and render `<ScanForm isAuthenticated={...} />` in the main dashboard component, passing the status from the `useAuth` hook.
- [ ] **Create `AnonymousScanResult` Page**:
  - Create a new page component at `frontend/src/pages/AnonymousScanResult.tsx`.
  - On successful submission, the `ScanForm` will redirect the user to this page (e.g., `/scan/{scanId}`).
  - The `scanId` will be temporarily saved to `localStorage` to allow for page refresh.
  - This page will fetch the scan data using the ID and display the results.
  - It will feature a prominent Call-to-Action (CTA): "Sign up now to save your scan history and set up alerts!"

## Phase 3: Testing

- [ ] **Backend**:
  - Add Vitest unit tests for the `createAnonymousScan` resolver and the new cron job.
- [ ] **Frontend**:
  - Create Vitest/RTL tests for `ScanForm.tsx` in both its authenticated and unauthenticated states, including error states.
  - Test the `AnonymousScanResult.tsx` page to ensure it correctly fetches and displays data.
- [ ] **E2E**:
  - Update the Playwright test in [`e2e/tests/createScan.test.ts`](mdc:e2e/tests/createScan.test.ts) for the new dashboard flow.
  - Create a new E2E test for the full anonymous user journey: submitting the form, being redirected, and seeing the result.

### Relevant Files

- `backend/src/entities/Scan.ts` - To be modified
- `backend/src/resolver/ScanResolver.ts` - To be modified
- `backend/src/schema/scan.graphql` - To be modified
- `backend/src/cron/cleanupScans.ts` - To be created
- `frontend/src/hooks/useAuth.ts` - To be created/verified
- `frontend/src/components/ScanForm.tsx` - To be created
- `frontend/src/pages/Dashboard.tsx` - To be modified
- `frontend/src/pages/AnonymousScanResult.tsx` - To be created
- `e2e/tests/createScan.test.ts` - To be modified
