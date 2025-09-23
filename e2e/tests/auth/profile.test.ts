import 'dotenv/config'
import { test, expect } from '../setup/base'

test.describe('Profile Page', () => {
    test('User should be able to see their profile and update it', async ({ page }) => {
        await page.goto('/profile')

        const headingPage = page.getByRole('heading', { name: 'PROFILE INFORMATION' });
        await expect(headingPage).toBeVisible()
        await expect(headingPage).toHaveText('PROFILE INFORMATION')

        const usernameLabel = page.locator('label:has-text("Username")');
        await expect(usernameLabel).toBeVisible();

        const usernameDiv = page.locator('label:has-text("Username")').locator('..').locator('div.text-lg').first();
        await expect(usernameDiv).toBeVisible();

        const currentUsername = await usernameDiv.textContent();
        console.log('Current username displayed:', currentUsername);

        await page.getByRole('button', { name: 'Edit Username' }).click();

        const textbox = page.getByRole('textbox');
        await expect(textbox).toBeVisible();

        const inputValue = await textbox.inputValue();
        expect(inputValue).toBe(currentUsername);

        await textbox.fill('florianr');
        await page.getByRole('button', { name: 'Save' }).click();

        const toastSuccess = page.getByText('Your username has been successfully updated!');
        await expect(toastSuccess).toBeVisible();

        const nameProfilUpdated = page.getByText('florianr', { exact: true });
        await expect(nameProfilUpdated).toBeVisible();

        await page.getByRole('button', { name: 'Edit Username' }).click();
        await page.getByRole('textbox').fill(currentUsername || 'florian');
        await page.getByRole('button', { name: 'Save' }).click();

        const nameReUpdated = page.getByText(currentUsername || 'florian', { exact: true });
        await expect(nameReUpdated).toBeVisible();
    })
})