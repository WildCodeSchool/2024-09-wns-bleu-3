import 'dotenv/config'
import { test, expect} from '../setup/base'

test.describe('Profile Page', () => {
    test('User should be able to see their profile and update it', async ({page}) => {
        await page.goto('/profile')

        const headingPage = page.getByRole('heading', { name: 'Profile Settings' });

        const nameProfil =  page.getByText(process.env.LOGIN_TEST_USERNAME as string, { exact: true });

        await expect(headingPage).toBeVisible()
        await expect(headingPage).toHaveText('Profile Settings')

        await expect(nameProfil).toBeVisible()
        await expect(nameProfil).toHaveText(process.env.LOGIN_TEST_USERNAME as string)


        await page.locator('div').filter({ hasText: /^Usernameflorian$/ }).getByRole('button').click();

        await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill('florianr');
        await page.getByRole('button', { name: 'Save' }).click();

        const toastSuccess = page.getByText('Your username has been successfully updated!');
        await expect(toastSuccess).toBeVisible();

        const nameProfilUpdated = page.getByText('florianr', { exact: true });
        await expect(nameProfilUpdated).toBeVisible()

        await page.locator('div').filter({ hasText: /^Usernameflorianr$/ }).getByRole('button').click();
        await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill('florian');
        await page.getByRole('button', { name: 'Save' }).click();

        const nameReUpdated = page.getByText('florian', { exact: true });
        await expect(nameReUpdated).toBeVisible()

    })
})