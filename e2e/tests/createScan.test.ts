import { test, expect} from './setup/base'

test.describe('Create Scan', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the home page
        await page.goto('/');
    });

    // Je veux aller sur la page / créer un scan
    test('user can create a scan succesfully', async ({ page }) => {
        //Fill in Title
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page.getByRole('textbox', { name: 'Title' }).fill('My Website Monitor Test');

        // Fill in URL
        await page.getByRole('textbox', { name: 'URL to scan' }).click();
        await page.getByRole('textbox', { name: 'URL to scan' }).fill('https://www.youtube.com/');

        // Select frequency
        await page.locator('button[name="frequency-combobox"]').click();
        await page.getByRole('option', { name: 'Every 15 minutes' }).click(); 

        // Select tag
        await page.locator('button[name="tag-combobox"]').click();
        await page.getByRole('option', { name: 'Base de données' }).click();

        // Click on create button and wait for the loading state
        const startButton = page.getByRole('button', { name: 'Start Scanning' });
        await startButton.click();

        const loadButton = page.getByRole('button', { name: 'Creating...' });

        await expect(loadButton).toBeVisible();

        // Wait for the toast message to appear
        const successToast = page.getByText('Scan [My Website Monitor Test] has been created successfully');
        await expect(successToast).toBeVisible();

        await expect(startButton).toBeVisible();
        await expect(loadButton).not.toBeVisible();
    });

    test('Scan appears in the scan history', async ({page }) => {
        const createdScan =  page.locator('.md\\:col-span-1 > div').first();
        await expect(createdScan).toBeVisible();
        await expect(createdScan).toHaveText('My Website Monitor Testhttps://www.youtube.com/200');
    })

    test('User can see scan details of his scan', async ({ page}) => {
        const createdScan =  page.locator('.md\\:col-span-1 > div').first();
        await expect(createdScan).toHaveText("My Website Monitor Testhttps://www.youtube.com/200");
        await createdScan.click();

        const scanDetails = page.getByRole('heading', { name: 'My Website Monitor Test' });

        await expect(scanDetails).toBeVisible();
        await expect(scanDetails).toHaveText('My Website Monitor Test');
    })

    test('User cant submit a wrong URL in Scan', async ({ page }) => {
         //Fill in Title
         await page.getByRole('textbox', { name: 'Title' }).click();
         await page.getByRole('textbox', { name: 'Title' }).fill('My Website Monitor Test');
 
         // Fill in URL
         await page.getByRole('textbox', { name: 'URL to scan' }).click();
         await page.getByRole('textbox', { name: 'URL to scan' }).fill('https://www.youtube');
 
         // Select frequency
         await page.locator('button[name="frequency-combobox"]').click();
         await page.getByRole('option', { name: 'Every 15 minutes' }).click(); 
 
         // Select tag
         await page.locator('button[name="tag-combobox"]').click();
         await page.getByRole('option', { name: 'Base de données' }).click();
 
         // Click on create button and wait for the loading state
         const startButton = page.getByRole('button', { name: 'Start Scanning' });
         await startButton.click();
 
        // Wait for the toast message to appear
        const errorToast = page.getByText('An error occured while creating the scan. Try again');
        await expect(errorToast).toBeVisible();
        
        await expect(startButton).toBeVisible();
    })

    test('Show error with Zod Validation if the fields are not valid', async ({ page}) => {
                //Fill in Title
                await page.getByRole('textbox', { name: 'Title' }).click();
                await page.getByRole('textbox', { name: 'Title' }).fill('My Website Monitor Test Is Too Long Here');

                const titleError = page.getByText('Title is too long');

        
                // Fill in URL
                await page.getByRole('textbox', { name: 'URL to scan' }).click();
                await page.getByRole('textbox', { name: 'URL to scan' }).fill('test');

                const urlError = page.getByText('Enter a valid URL');

        
                // No Select frequency or frequency
                const frequencyError = page.getByText('Enter a valid frequency');

                // Click on create button and wait for the loading state
                const startButton = page.getByRole('button', { name: 'Start Scanning' });
                await startButton.click();
                
                await expect(titleError).toBeVisible();
                await expect(urlError).toBeVisible();
                await expect(frequencyError).toBeVisible();
    })
});