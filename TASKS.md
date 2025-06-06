# Add Modular Scan Form to Dashboard

This plan details the steps required to add a scan submission form to the dashboard. The form will be a refactored version of the existing scan creation component, designed to be modular and support both authenticated and unauthenticated user states, with a clear user flow for anonymous submissions.

## Completed Tasks

_No tasks completed yet._

## In Progress Tasks

### Phase 1: Pre-development & Backend
- [ ] **File Discovery**: Locate the main dashboard component and the existing "create scan" component.
- [ ] **Backend - `Scan` Entity**: Modify `backend/src/entities/Scan.ts` to make the `User` relationship nullable.
- [ ] **Backend - `createAnonymousScan` Mutation**: Add the `createAnonymousScan` mutation to the resolver and schema.
- [ ] **Backend - Security**: Implement IP-based rate-limiting on the `createAnonymousScan` mutation.
- [ ] **Backend - Data Lifecycle**: Create a cron job to delete old anonymous scans.

### Phase 2: Frontend Development
- [ ] **Authentication Hook**: Verify or create a reliable `useAuth` hook.
- [ ] **Refactor to `ScanForm.tsx`**: Create the reusable `ScanForm.tsx` component with authenticated/unauthenticated states.
- [ ] **Error Handling**: Implement user-facing error handling in `ScanForm.tsx`.
- [ ] **Integrate `ScanForm` into Dashboard**: Add the `ScanForm` to the dashboard page.
- [ ] **Create `AnonymousScanResult` Page**: Build the result page for anonymous scans with a CTA to sign up.

### Phase 3: Testing
- [ ] **Backend Tests**: Add Vitest unit tests for the new mutation and cron job.
- [ ] **Frontend Tests**: Create Vitest/RTL tests for the new components and their states.
- [ ] **E2E Tests**: Update existing E2E tests and create a new one for the anonymous user journey.

## Future Tasks

_No future tasks identified yet._

## Implementation Plan

The implementation will be done in three phases:
1.  **Pre-development & Backend**: Set up the database schema, create the new API endpoint for anonymous scans, and implement necessary security and data cleanup mechanisms.
2.  **Frontend Development**: Refactor the UI into a modular component, build the new anonymous result page, and integrate everything into the dashboard.
3.  **Testing**: Ensure the new functionality is robust and bug-free with comprehensive unit, integration, and end-to-end tests.

### Relevant Files

-   `backend/src/entities/Scan.ts` - To be modified
-   `backend/src/resolver/ScanResolver.ts` - To be modified
-   `backend/src/schema/scan.graphql` - To be modified
-   `backend/src/cron/cleanupScans.ts` - To be created
-   `frontend/src/hooks/useAuth.ts` - To be created/verified
-   `frontend/src/components/ScanForm.tsx` - To be created
-   `frontend/src/pages/Dashboard.tsx` - To be modified
-   `frontend/src/pages/AnonymousScanResult.tsx` - To be created
-   `e2e/tests/createScan.test.ts` - To be modified 