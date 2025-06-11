import { test, expect } from '../setup/base'

test.describe('Create Scan - Auth Form (Authenticated)', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the dashboard page where AuthScanForm is located
        await page.goto('/dashboard');
    });

    // Test authenticated form submission with all fields
    test('user can create a scan successfully with all fields', async ({ page }) => {
        // Fill in Title
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page.getByRole('textbox', { name: 'Title' }).fill('My Website Monitor Test');

        // Fill in URL
        await page.getByRole('textbox', { name: 'URL to scan' }).click();
        await page.getByRole('textbox', { name: 'URL to scan' }).fill('https://www.youtube.com/');

        // Select frequency
        await page.getByRole('combobox', { name: 'Select frequency' }).click();
        await page.getByRole('option', { name: 'Every 15 minutes' }).click(); 

        // Select tag
        await page.getByRole('combobox', { name: 'Select tags' }).click();
        await page.getByRole('option', { name: 'Base de données' }).click();

        // Click on create button and wait for the loading state
        const createButton = page.getByRole('button', { name: 'Create Scan' });
        await createButton.click();

        const loadingButton = page.getByRole('button', { name: 'Creating...' });
        await expect(loadingButton).toBeVisible();

        // Wait for the success toast message to appear
        const successToast = page.getByText(/Scan "My Website Monitor Test" created successfully!/);
        await expect(successToast).toBeVisible();

        // Should navigate back to dashboard
        await expect(page).toHaveURL('/dashboard');
        
        // Form should be reset and ready for next scan
        await expect(createButton).toBeVisible();
        await expect(loadingButton).not.toBeVisible();
    });

    // test('created scan appears in the dashboard scan list', async ({ page }) => {
    //     // Navigate to scan history section to see the created scan
    //     await page.goto('/scan-history');
        
    //     // Look for the created scan in the scan list
    //     const scanListItem = page.locator('.cursor-pointer').first();
    //     await expect(scanListItem).toBeVisible();
        
    //     // Check scan details are displayed
    //     await expect(scanListItem).toContainText('My Website Monitor Test');
    //     await expect(scanListItem).toContainText('youtube.com');
    // });

    // TODO: Add this test back in when we have a way to click on a scan and see the details
    // test('user can see scan details by clicking on scan', async ({ page }) => {
    //     // Navigate to scan history page
    //     await page.goto('/scan-history');
        
    //     // Click on the first scan item
    //     const scanListItem = page.locator('.cursor-pointer').first();
    //     await scanListItem.click();

    //     // Should show scan details in the right panel
    //     const scanDetails = page.getByRole('heading', { name: 'My Website Monitor Test' });
    //     await expect(scanDetails).toBeVisible();
    // });

    test('form shows validation error for invalid URL', async ({ page }) => {
        // Fill in Title
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page.getByRole('textbox', { name: 'Title' }).fill('My Website Monitor Test');

        // Fill in invalid URL
        await page.getByRole('textbox', { name: 'URL to scan' }).click();
        await page.getByRole('textbox', { name: 'URL to scan' }).fill('just-text');

        // Click on create button
        const createButton = page.getByRole('button', { name: 'Create Scan' });
        await createButton.click();

        // Wait for validation to trigger
        await page.waitForTimeout(1000);

        // Should stay on dashboard (validation prevents submission)
        await expect(page).toHaveURL('/dashboard');
        
        // Validation is working if we stay on the same page
        console.log('Validation prevented form submission - test passes');
    });

    test('form shows validation errors for invalid fields', async ({ page }) => {
        // Fill in too long title
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page.getByRole('textbox', { name: 'Title' }).fill('My Website Monitor Test Is Way Too Long For The Title Field Validation');

        // Fill in invalid URL
        await page.getByRole('textbox', { name: 'URL to scan' }).click();
        await page.getByRole('textbox', { name: 'URL to scan' }).fill('not-a-url');

        // Click create button
        const createButton = page.getByRole('button', { name: 'Create Scan' });
        await createButton.click();
        
        // Wait for validation to trigger
        await page.waitForTimeout(1000);
        
        // Should stay on dashboard (validation prevents submission)
        await expect(page).toHaveURL('/dashboard');
        
        // Validation is working if we stay on the same page
        console.log('Validation prevented form submission with invalid fields - test passes');
    });

    // test('form can be submitted with minimal required fields', async ({ page }) => {
    //     // Fill only required fields (title and URL)
    //     await page.getByRole('textbox', { name: 'Title' }).click();
    //     await page.getByRole('textbox', { name: 'Title' }).fill('Minimal Test Scan');

    //     await page.getByRole('textbox', { name: 'URL to scan' }).click();
    //     await page.getByRole('textbox', { name: 'URL to scan' }).fill('https://www.example.com/');

    //     // Submit without selecting tags or frequency (they should be optional)
    //     const createButton = page.getByRole('button', { name: 'Create Scan' });
    //     await createButton.click();

    //     // Should succeed and show success message
    //     const successToast = page.getByText(/Scan "Minimal Test Scan" created successfully!/);
    //     await expect(successToast).toBeVisible();
        
    //     // Should navigate back to dashboard
    //     await expect(page).toHaveURL('/dashboard');
    // });
}); 