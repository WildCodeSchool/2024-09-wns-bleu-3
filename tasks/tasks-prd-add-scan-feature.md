# Tasks for Add Scan Form Feature

## Relevant Files

- `backend/src/resolver/ScanResolver.ts` - Needs update to add the `previewScan` query and add auth check to `createNewScan`.
- `backend/src/utils/scanUrl.ts` - Existing utility for scanning URLs that will be used by the preview endpoint.
- `backend/src/schema/context.ts` - Contains the context type used for authentication checks.
- `backend/src/inputs/ScanPreview.ts` - GraphQL object type for scan preview results (non-persisted).
- `backend/test/previewScan.test.ts` - Unit tests for the previewScan GraphQL query.
- `backend/test/createNewScan.test.ts` - Unit tests for the createNewScan mutation with authentication.
- `frontend/src/components/BaseScanForm.tsx` - New reusable form component that will be the foundation for both form variants.
- `frontend/src/components/PublicScanForm.tsx` - New component implementing the minimal URL-only form for unauthenticated users.
- `frontend/src/components/AuthScanForm.tsx` - New component implementing the full scan form for authenticated users.
- `frontend/src/schema/ScanFormSchema.ts` - Schema file to define validation rules for both form variants.
- `frontend/src/pages/ScanPreviewPage.tsx` - New page to display scan preview results for unauthenticated users.
- `frontend/src/components/CreateTagInput.tsx` - New component for inline tag creation within the auth form.
- `frontend/src/graphql/queries.ts` - To add the new GraphQL query for scan preview.
- `frontend/src/graphql/mutations.ts` - Contains existing mutations that will be used.
- `frontend/src/test/BaseScanForm.test.tsx` - Unit tests for the base form component.
- `frontend/src/test/PublicScanForm.test.tsx` - Unit tests for public form variant.
- `frontend/src/test/AuthScanForm.test.tsx` - Unit tests for authenticated form variant.
- `frontend/src/test/ScanPreviewPage.test.tsx` - Unit tests for the preview page.
- `frontend/src/test/CreateTagInput.test.tsx` - Unit tests for tag creation component.
- `frontend/src/App.tsx` - To update routing configuration.

### Notes

- Follow TDD approach: write tests before implementing functionality.
- All tests should be run using `npm test` from within the frontend or backend directories.
- The frontend uses React 19, Vite, TypeScript, ShadCN UI, and Tailwind CSS.
- The backend uses TypeScript, GraphQL (via type-graphql) with GraphQL Yoga/Express, and TypeORM.
- Authentication is handled via the context object (`ContextType`) which contains user ID if authenticated.
- For GraphQL codegen, run `npx graphql-codegen --config codegen.ts` from the frontend directory.
- Remember to consider both light theme (dashboard) and dark theme (homepage) when styling components.

## Tasks

- [x] 1.0 Backend GraphQL Schema and Resolver Updates ✅ COMPLETED
  - [x] 1.1 Write unit test for `previewScan` query in `backend/src/test/previewScan.test.ts`
  - [x] 1.2 Define `ScanPreview` object type in `ScanResolver.ts` with required fields
  - [x] 1.3 Implement `previewScan` query in `ScanResolver.ts` as a public endpoint (no auth check)
  - [x] 1.4 Modify `createNewScan` mutation to require authentication by checking `context.id`
  - [x] 1.5 Write unit test for the updated `createNewScan` with auth check
  - [x] 1.6 Verify the `scanUrl` utility handles error cases properly
  - [x] 1.7 Run and verify unit tests for both the query and updated mutation
  - [x] 1.8 Test both endpoints manually using GraphQL Playground

- [ ] 2.0 Form Component Architecture
  - [ ] 2.1 Write test for `BaseScanForm` component in `frontend/src/test/BaseScanForm.test.tsx`
  - [ ] 2.2 Create schema for form validation in `frontend/src/schema/ScanFormSchema.ts`
  - [ ] 2.3 Implement `BaseScanForm` component with common form logic
  - [ ] 2.4 Write test for `PublicScanForm` in `frontend/src/test/PublicScanForm.test.tsx`
  - [ ] 2.5 Implement `PublicScanForm` component with URL-only field
  - [ ] 2.6 Write test for `AuthScanForm` in `frontend/src/test/AuthScanForm.test.tsx`
  - [ ] 2.7 Implement `AuthScanForm` with title, URL, tag selector, and frequency dropdown
  - [ ] 2.8 Update any existing form usage to use the new components
  - [ ] 2.9 Add proper form validation for both form variants
  - [ ] 2.10 Ensure forms have appropriate loading states during submission

- [ ] 3.0 Scan Preview Page Implementation
  - [ ] 3.1 Add `previewScan` query to `frontend/src/graphql/queries.ts`
  - [ ] 3.2 Run GraphQL codegen to generate TypeScript hooks
  - [ ] 3.3 Write test for `ScanPreviewPage` in `frontend/src/test/ScanPreviewPage.test.tsx`
  - [ ] 3.4 Create `ScanPreviewPage.tsx` with URL param extraction
  - [ ] 3.5 Implement data fetching using `usePreviewScanQuery` hook
  - [ ] 3.6 Design and implement the UI for displaying scan results
  - [ ] 3.7 Add loading and error states to the preview page
  - [ ] 3.8 Implement "Log in to save" button with redirect to login page
  - [ ] 3.9 Test preview page with various URLs (valid, invalid, slow response)

- [ ] 4.0 Inline Tag Creation Feature
  - [ ] 4.1 Write test for `CreateTagInput` in `frontend/src/test/CreateTagInput.test.tsx`
  - [ ] 4.2 Implement `CreateTagInput` component with tag creation UI
  - [ ] 4.3 Integrate the `useCreateNewTagMutation` from existing GraphQL mutations
  - [ ] 4.4 Add color picker for new tags
  - [ ] 4.5 Implement validation for tag name (prevent duplicates)
  - [ ] 4.6 Add success/error feedback for tag creation
  - [ ] 4.7 Ensure newly created tags appear in the dropdown immediately
  - [ ] 4.8 Integrate the component into `AuthScanForm`

- [ ] 5.0 Integration and Routing
  - [ ] 5.1 Update `frontend/src/App.tsx` to add `/scan/preview` route
  - [ ] 5.2 Place `PublicScanForm` on the homepage
  - [ ] 5.3 Place `AuthScanForm` on the dashboard
  - [ ] 5.4 Test navigation flow from public form to preview page
  - [ ] 5.5 Test navigation flow from preview page to login
  - [ ] 5.6 Test authentication state handling in both forms
  - [ ] 5.7 Test navigation after authenticated form submission
  - [ ] 5.8 Verify all components work in both light and dark themes
  - [ ] 5.9 Perform end-to-end testing of both form variants
  - [ ] 5.10 Address any cross-browser compatibility issues 