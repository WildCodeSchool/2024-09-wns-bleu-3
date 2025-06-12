import { test, expect } from './setup/base'

test.describe('Dashboard UI - Glassmorphism Design', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto('/login')
        await page.getByRole('textbox', { name: 'Email' }).fill(process.env.LOGIN_TEST_EMAIL as string)
        await page.getByRole('textbox', { name: 'Mot de passe' }).fill(process.env.LOGIN_TEST_PWD as string)
        await page.getByRole('button', { name: 'Se connecter' }).click()
        await page.waitForURL('/dashboard')
    })

    test('Dashboard loads with sidebar and glassmorphism styling', async ({ page }) => {
        // Check that we're on the dashboard
        await expect(page).toHaveURL('/dashboard')
        
        // Check for sidebar presence
        const sidebar = page.locator('[data-testid="sidebar"]')
        await expect(sidebar).toBeVisible()
        
        // Check for logo in sidebar
        const logo = page.getByText('Sonar')
        await expect(logo).toBeVisible()
        
        // Check for navigation menu items
        await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Security Scans' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Scan History' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible()
        
        // Check for premium upgrade card
        const upgradeCard = page.getByText('Upgrade to Pro')
        await expect(upgradeCard).toBeVisible()
    })

    test('Dashboard displays greeting with gradient text', async ({ page }) => {
        // Check for welcome message with gradient styling
        const welcomeHeading = page.locator('h1').filter({ hasText: 'Welcome' })
        await expect(welcomeHeading).toBeVisible()
        
        // Check for subtitle
        const subtitle = page.getByText('Here\'s an overview of your URL monitoring')
        await expect(subtitle).toBeVisible()
    })

    test('Statistics cards display with glassmorphism effects', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(2000)
        
        // Check for stats cards
        const totalScansCard = page.getByText('Total Scans').first()
        await expect(totalScansCard).toBeVisible()
        
        const healthyCard = page.getByText('Healthy').first()
        await expect(healthyCard).toBeVisible()
        
        const issuesCard = page.getByText('Issues').first()
        await expect(issuesCard).toBeVisible()
        
        // Verify cards have glassmorphism styling (backdrop-blur classes)
        const statsCards = page.locator('.glass-card')
        await expect(statsCards.first()).toBeVisible()
    })

    test('Create New Scan form displays with glassmorphism styling', async ({ page }) => {
        // Check for Create New Scan section
        const createScanHeading = page.getByText('Create New Scan')
        await expect(createScanHeading).toBeVisible()
        
        // Check for form fields
        await expect(page.getByLabel('Title')).toBeVisible()
        await expect(page.getByLabel('URL to scan')).toBeVisible()
        await expect(page.getByLabel('Select frequency')).toBeVisible()
        await expect(page.getByLabel('Select tags')).toBeVisible()
        
        // Check for submit button with dashboard styling
        const createButton = page.getByRole('button', { name: 'Create Scan' })
        await expect(createButton).toBeVisible()
    })

    test('Active Issues section displays with glassmorphism styling', async ({ page }) => {
        // Check for Active Issues section
        const activeIssuesHeading = page.getByText('Active Issues')
        await expect(activeIssuesHeading).toBeVisible()
        
        // Check for issues table or no issues message
        const issuesTable = page.locator('table')
        const noIssuesMessage = page.getByText('No active issues found')
        
        // Either table or no issues message should be visible
        await expect(issuesTable.or(noIssuesMessage)).toBeVisible()
    })

    test('Sidebar navigation works correctly', async ({ page }) => {
        // Test navigation to different pages
        await page.getByRole('link', { name: 'Settings' }).click()
        await expect(page).toHaveURL('/profile')
        
        // Navigate back to dashboard
        await page.getByRole('link', { name: 'Dashboard' }).click()
        await expect(page).toHaveURL('/dashboard')
    })

    test('Premium upgrade navigation works', async ({ page }) => {
        // Click on upgrade button in sidebar
        const upgradeButton = page.getByText('Upgrade to Pro').first()
        await upgradeButton.click()
        
        // Should navigate to pricing page
        await expect(page).toHaveURL('/pricing')
        
        // Check pricing page loads correctly
        await expect(page.getByText('Choose Your Plan')).toBeVisible()
        
        // Navigate back to dashboard
        await page.getByText('Back to Dashboard').click()
        await expect(page).toHaveURL('/dashboard')
    })

    test('User profile section displays correctly', async ({ page }) => {
        // Check for user profile in sidebar
        const userProfile = page.locator('[data-testid="user-profile"]')
        await expect(userProfile).toBeVisible()
        
        // Check for logout button
        const logoutButton = page.getByRole('button', { name: 'Logout' })
        await expect(logoutButton).toBeVisible()
    })

    test('Mobile responsiveness - sidebar toggle', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })
        
        // Check if sidebar trigger is visible on mobile
        const sidebarTrigger = page.locator('[data-testid="sidebar-trigger"]')
        await expect(sidebarTrigger).toBeVisible()
        
        // Click to open sidebar
        await sidebarTrigger.click()
        
        // Sidebar should be visible
        const sidebar = page.locator('[data-testid="sidebar"]')
        await expect(sidebar).toBeVisible()
    })

    test('Form submission works correctly', async ({ page }) => {
        // Fill out the scan form
        await page.getByLabel('Title').fill('E2E Test Scan')
        await page.getByLabel('URL to scan').fill('https://example.com')
        
        // Select frequency (if dropdown is available)
        const frequencySelect = page.getByLabel('Select frequency')
        if (await frequencySelect.isVisible()) {
            await frequencySelect.click()
            await page.getByText('Every hour').click()
        }
        
        // Submit form
        await page.getByRole('button', { name: 'Create Scan' }).click()
        
        // Should show success message or redirect
        await page.waitForTimeout(2000)
        
        // Check for success indication (toast or updated UI)
        const successToast = page.getByText('created successfully')
        await expect(successToast.or(page.locator('.toast'))).toBeVisible({ timeout: 5000 })
    })

    test('Logout functionality works', async ({ page }) => {
        // Click logout button
        const logoutButton = page.getByRole('button', { name: 'Logout' })
        await logoutButton.click()
        
        // Should redirect to home page
        await expect(page).toHaveURL('/')
        
        // Should show login/signup options
        await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
    })
}) 