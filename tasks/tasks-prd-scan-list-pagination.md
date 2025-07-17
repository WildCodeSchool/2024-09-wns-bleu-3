# Scan List Pagination Implementation Tasks

## Relevant Files

- `backend/src/resolver/ScanResolver.ts` - Contains the GraphQL resolver for scan queries that need pagination.
- `backend/src/schema/scanSchema.ts` - GraphQL schema definitions to be updated for pagination.
- `backend/src/entities/Scan.ts` - Database entity that will be queried with pagination.
- `backend/src/inputs/PaginationInput.ts` - New file for pagination input parameters.
- `backend/test/paginatedScans.test.ts` - Tests for backend pagination functionality.
- `frontend/src/graphql/queries.ts` - Contains GraphQL queries to be updated with pagination parameters.
- `frontend/src/generated/graphql-types.ts` - Auto-generated GraphQL types that will be updated after schema changes.
- `frontend/src/components/dashborad/ScanListHistory.tsx` - Main component that will implement the "Load More" UI.
- `frontend/src/hooks/useLoadMore.ts` - New hook to manage offset pagination state.
- `frontend/src/components/ui/button.tsx` - Button component to be used for "Load More" functionality.
- `frontend/src/test/ScanListHistory.test.tsx` - Tests for the "Load More" implementation.

### Notes

- Backend pagination will be implemented at the database query level using offset/limit for optimal performance
- We'll add a `hasMore` boolean flag to indicate whether more results are available
- Search functionality will be handled server-side to work with pagination
- Tests should cover both the "Load More" UI and the backend pagination logic
- The implementation should preserve loaded items when applying filters or switching tabs

## Tasks

- [ ] 1.0 Update Backend GraphQL Schema for Pagination
  - [ ] 1.1 Create a new PaginationInput type with offset, limit parameters
  - [ ] 1.2 Create test cases for the pagination schema types
  - [ ] 1.3 Update ScanResponse type to include pagination metadata (totalCount, hasMore)
  - [ ] 1.4 Modify getAllScansByUserId query to accept pagination parameters
  - [ ] 1.5 Update schema documentation with pagination parameter descriptions
  - [ ] 1.6 Run tests to verify schema changes

- [ ] 2.0 Implement Backend Pagination Logic
  - [ ] 2.1 Write tests for paginated scan queries
  - [ ] 2.2 Create helper function to calculate pagination metadata
  - [ ] 2.3 Update ScanResolver to accept offset/limit parameters
  - [ ] 2.4 Implement database query with offset/limit pagination
  - [ ] 2.5 Add server-side search functionality that works with pagination
  - [ ] 2.6 Implement filter handling with pagination
  - [ ] 2.7 Add hasMore flag calculation logic
  - [ ] 2.8 Ensure count queries are optimized for performance
  - [ ] 2.9 Run tests to verify backend pagination functionality

- [ ] 3.0 Update Frontend GraphQL Queries for Pagination
  - [ ] 3.1 Write tests for updated GraphQL queries
  - [ ] 3.2 Update GET_DASHBOARD_USER_DATA query to include offset/limit parameters
  - [ ] 3.3 Update query response handling for paginated data structure
  - [ ] 3.4 Add client-side TypeScript types for pagination parameters and response
  - [ ] 3.5 Update codegen configuration to generate new types
  - [ ] 3.6 Run codegen to generate updated TypeScript types
  - [ ] 3.7 Run tests to verify frontend query changes

- [ ] 4.0 Implement "Load More" UI
  - [ ] 4.1 Write tests for "Load More" button functionality
  - [ ] 4.2 Create "Load More" button UI in ScanListHistory component
  - [ ] 4.3 Style the button to match existing design
  - [ ] 4.4 Implement responsive design for mobile
  - [ ] 4.5 Add loading spinner during data fetching
  - [ ] 4.6 Implement logic to hide button when hasMore is false
  - [ ] 4.7 Handle empty states when no results are available
  - [ ] 4.8 Add error handling for failed requests
  - [ ] 4.9 Run tests to verify UI implementation

- [ ] 5.0 Add State Management for Offset Pagination
  - [ ] 5.1 Write tests for offset pagination state management
  - [ ] 5.2 Create useLoadMore custom hook
  - [ ] 5.3 Implement state for offset and loaded items
  - [ ] 5.4 Add logic to preserve loaded items during filter changes
  - [ ] 5.5 Implement state persistence between tab switches
  - [ ] 5.6 Add URL query parameter support for shareable state
  - [ ] 5.7 Reset pagination when search query changes
  - [ ] 5.8 Handle hasMore flag to show/hide "Load More" button
  - [ ] 5.9 Run tests to verify state management functionality

- [ ] 6.0 Implement Testing for Pagination
  - [ ] 6.1 Create end-to-end tests for "Load More" functionality
  - [ ] 6.2 Test pagination with various filter combinations
  - [ ] 6.3 Test search functionality with pagination
  - [ ] 6.4 Test edge cases (initial load, no more results, empty results)
  - [ ] 6.5 Test accessibility of "Load More" button
  - [ ] 6.6 Performance testing for large datasets
  - [ ] 6.7 Test state preservation between filter/tab changes
  - [ ] 6.8 Document test results and any performance findings 