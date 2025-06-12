## Relevant Files

- `frontend/src/components/Sidebar.tsx` - Custom sidebar component using shadcn sidebar system.
- `frontend/src/components/SidebarTrigger.tsx` - Mobile toggle button for sidebar.
- `frontend/src/components/SidebarMenu.tsx` - Menu items and navigation components.
- `frontend/src/layouts/DashboardLayout.tsx` - Wrapper providing sidebar + gradient background.
- `frontend/src/pages/DashboardPage.tsx` - Existing page; visual markup refactored to match design.
- `frontend/src/components/BaseScanForm.tsx` - Style update only for form inputs and container.
- `frontend/src/components/AuthScanForm.tsx` - Style update only for authenticated user form.
- `frontend/src/components/ActiveIssues.tsx` - Style update only for issues table.
- `frontend/src/App.tsx` - Update routing to apply DashboardLayout to dashboard routes.
- `frontend/src/pages/PricingPage.tsx` - Dummy pricing page routed from Upgrade buttons.
- `frontend/tailwind.config.js` - Update with new colors, gradients and extended utility classes.
- `frontend/src/test/components/Sidebar.test.tsx` - Unit tests for custom sidebar component.
- `frontend/src/test/components/SidebarTrigger.test.tsx` - Unit tests for sidebar trigger component.
- `frontend/src/test/layouts/DashboardLayout.test.tsx` - Unit tests for layout component.
- `frontend/src/test/pages/DashboardPage.test.tsx` - Unit tests for DashboardPage glassmorphism styling.
- `frontend/src/test/components/ActiveIssues.test.tsx` - Unit tests for ActiveIssues component styling updates.
- `frontend/src/test/components/BaseScanForm.test.tsx` - Unit tests for BaseScanForm glassmorphism styling.
- `e2e/tests/dashboard.spec.ts` - E2E tests ensuring UI loads with sidebar.
- `frontend/src/components/ui/sheet.tsx` - shadcn Sheet component for mobile sidebar.
- `frontend/src/components/ui/scroll-area.tsx` - shadcn ScrollArea component for sidebar navigation.
- `frontend/src/components/ui/sidebar.tsx` - shadcn Sidebar component system (already installed).
- `frontend/components.json` - shadcn configuration verified for Tailwind v4 + React 19 compatibility.

### Notes

- Ensure all existing GraphQL queries and data structures remain unchanged.
- Keep all data-testid attributes for maintaining test coverage.
- The pattern uses a layout wrapper approach rather than modifying component internals.
- All UI changes are purely cosmetic - no business logic modifications.
- Use context7 documentation for shadcn/ui component reference with Tailwind v4 compatibility.
- Install additional shadcn components as needed via CLI or manual creation.
- Use Boring avatar for avatar component from the documentation : https://boringavatars.com/

## Tasks

- [x] 1.0 Set up environment for UI redesign
  - [x] 1.1 Verify Tailwind v4 configuration in package.json and postcss.config.js
  - [x] 1.2 Set up shadcn components needed for the redesign (use context7 tool for documentation)
    - [x] 1.2.1 Install or update necessary shadcn components: Sheet, ScrollArea, Avatar, etc.
    - [x] 1.2.2 Check component compatibility with Tailwind v4 and React 19
    - [x] 1.2.3 Review context7 documentation for current class naming conventions
  - [x] 1.3 Update tailwind.config.js with custom colors from the mock-up (#1F5CFF, #924FFF, #0A2540, etc.)
  - [x] 1.4 Add gradient utilities for background and text elements
  - [x] 1.5 Define custom shadow variants for cards and buttons
  - [x] 1.6 Configure backdrop-blur and glassmorphism utilities
  - [x] 1.7 Add animation utilities for hover effects and transitions
  - [x] 1.8 Create test utility classes to verify configuration

- [x] 2.0 Create Sidebar component with SidebarProvider context
  - [x] 2.1 Implement SidebarProvider context for managing open/closed state
  - [x] 2.2 Set up shadcn Sheet component for mobile sidebar slide-out
  - [x] 2.3 Build SidebarHeader with logo and branding
  - [x] 2.4 Implement ScrollArea component for navigation overflow
  - [x] 2.5 Create SidebarContent with navigation links matching design
  - [x] 2.6 Develop SidebarFooter with user profile and logout button
  - [x] 2.7 Add Premium upgrade card with gradient background
  - [x] 2.8 Implement responsive behavior (collapse on mobile)
  - [x] 2.9 Add toggle button for mobile view
  - [x] 2.10 Style navigation items with active states
  - [x] 2.11 Ensure all links have proper routing
  - [x] 2.12 Write tests for sidebar rendering and state management

- [x] 3.0 Develop DashboardLayout component as a wrapper
  - [x] 3.1 Create basic layout structure with flex container
  - [x] 3.2 Add gradient background with blur effects (following context7 patterns)
  - [x] 3.3 Integrate Sidebar component
  - [x] 3.4 Add responsive main content area
  - [x] 3.5 Create header area for greeting and action buttons
  - [x] 3.6 Implement shadcn Badge component for notification counter
  - [x] 3.7 Apply conditional rendering based on authentication state
  - [x] 3.8 Ensure layout preserves existing component props/children
  - [x] 3.9 Write tests for layout rendering with and without auth
  - [x] 3.10 Validate responsive behavior across breakpoints

- [x] 4.0 Update App.tsx routing to use DashboardLayout
  - [x] 4.1 Modify PrivateRoute to wrap dashboard pages with DashboardLayout
  - [x] 4.2 Ensure Header is only shown for unauthenticated routes
  - [x] 4.3 Add route for new PricingPage
  - [x] 4.4 Test route transitions and layout application
  - [x] 4.5 Verify authentication state properly controls layout

- [x] 5.0 Refactor DashboardPage component styles
  - [x] 5.1 Update greeting section with gradient text and layout
  - [x] 5.2 Restyle notification and add monitor buttons using shadcn Button
  - [x] 5.3 Redesign statistics cards with shadcn Card and custom icon pills
  - [x] 5.4 Apply glassmorphism effects to card backgrounds
  - [x] 5.5 Update color scheme to match design reference
  - [x] 5.6 Ensure responsive grid layout matches design
  - [x] 5.7 Preserve all existing data props and rendering logic
  - [x] 5.8 Test with various data states (loading, error, empty)

- [x] 6.0 Update form components styling
  - [x] 6.1 Restyle BaseScanForm to match glassmorphism design
  - [x] 6.2 Implement shadcn Input, Select and Label components
  - [x] 6.3 Update AuthScanForm container and spacing
  - [x] 6.4 Style form inputs with shadows and focus states
  - [x] 6.5 Update button styles with gradients
  - [x] 6.6 Ensure form retains all validation and submission logic
  - [x] 6.7 Test form interactions and visual feedback states

- [x] 7.0 Redesign ActiveIssues component
  - [x] 7.1 Update card container with glassmorphism effect
  - [x] 7.2 Implement shadcn Table components
  - [x] 7.3 Restyle table headers and rows
  - [x] 7.4 Update issue badges with shadcn Badge component
  - [x] 7.5 Style checkbox and interactive elements
  - [x] 7.6 Ensure table remains responsive
  - [x] 7.7 Preserve all data handling and event handlers
  - [x] 7.8 Test with various data scenarios

- [x] 8.0 Create simple PricingPage component
  - [x] 8.1 Design basic pricing page layout with shadcn Card components
  - [x] 8.2 Add dummy pricing tiers with gradient cards
  - [x] 8.3 Include shadcn Button components for actions
  - [x] 8.4 Include return navigation to dashboard
  - [x] 8.5 Ensure consistent styling with dashboard theme
  - [x] 8.6 Test routing to/from pricing page

- [ ] 9.0 End-to-end testing and validation
  - [x] 9.1 Create or update Playwright tests for authenticated dashboard view
  - [ ] 9.2 Test sidebar navigation and responsiveness
  - [ ] 9.3 Verify all interactive elements function properly
  - [ ] 9.4 Validate layout on mobile, tablet and desktop viewports
  - [ ] 9.5 Ensure performance metrics remain within baseline
  - [ ] 9.6 Fix any visual regressions or accessibility issues
  - [ ] 9.7 Run accessibility checks on new components

- [x] 10.0 Fix UI design and navigation issues
  - [x] 10.1 Fix dashboard glassmorphism styling to match reference design
  - [x] 10.2 Update color scheme and glassy effects based on dashboard-refont.tsx.old
  - [x] 10.3 Fix button text colors (white instead of black) and sizing
  - [x] 10.4 Adjust layout widths and proportions to match reference
  - [x] 10.5 Fix authenticated user navigation restrictions
  - [x] 10.6 Restore PublicScanForm original styling for homepage
  - [x] 10.7 Remove "See all my scans" button from homepage and header

- [x] 11.0 Fix remaining UI issues to match reference design exactly
  - [x] 11.1 Fix page width to take full screen width
  - [x] 11.2 Update Sidebar styling to match reference design exactly
  - [x] 11.3 Improve overall glassmorphism effects and visual appeal
  - [x] 11.4 Fix layout proportions and spacing to match reference
  - [x] 11.5 Update navigation styling and active states

- [x] 12.0 Fix critical sidebar and layout issues
  - [x] 12.1 Fix sidebar z-index to appear above dashboard content
  - [x] 12.2 Fix text alignment issues in sidebar (Sonar logo and user name)
  - [x] 12.3 Add proper background colors to match reference design
  - [x] 12.4 Ensure sidebar layout and positioning is correct

- [x] 13.0 Fix spacing and sizing issues
  - [x] 13.1 Add more space between sidebar and dashboard content
  - [x] 13.2 Reduce size of stats cards (Total Monitors, Healthy, Issues)
  - [x] 13.3 Fix sidebar height and proportions
  - [x] 13.4 Optimize overall layout spacing and proportions
  - [x] 13.5 Add right spacing to dashboard and fix sidebar height layout
  - [x] 13.6 Implement vibrant gradient background system with decorative elements
  - [x] 13.7 Fix sidebar full height issue with proper h-screen classes
  - [x] 13.8 Fix text alignment in stats cards to be left-aligned
  - [x] 13.9 Implement proper logout functionality using GraphQL mutation 