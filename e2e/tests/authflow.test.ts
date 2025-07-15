import {test, expect} from './setup/base'

test.describe('Authentication flow', () => {

    test('User should be able to sign up', async ({page}) => {
            await page.goto('/signup')
      
            /*
             * Use a random suffix so every test run uses fresh credentials. This avoids
             * UNIQUE constraint violations when the same user already exists in the
             * database from a previous local run.
             */
            const rand = Math.random().toString(36).slice(2, 8)

            // Username sign-up
            await page.getByRole('textbox', { name: 'Username' }).click()
            await page.getByRole('textbox', { name: 'Username' }).fill(`test_${rand}`)

            // Email sign-up
            await page.getByRole('textbox', { name: 'Email address' }).click()
            await page.getByRole('textbox', { name: 'Email address' }).fill(`test_${rand}@example.com`)

            // Password sign-up – any strong dummy password works
            await page.getByRole('textbox', { name: 'Password' }).click()
            await page.getByRole('textbox', { name: 'Password' }).fill('Playwright1!')
        
            await page.getByRole('button', { name: 'Create Account' }).click();
        
            const toastSuccess = page.getByText('You’ve successfully signed up');

            await expect(toastSuccess).toBeVisible();
    })

    test('User should be able to login', async ({page}) => {
        await page.goto('/login')
        //Email login
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(process.env.LOGIN_TEST_EMAIL as string);

        // PWD login
        await page.getByRole('textbox', { name: 'Mot de passe' }).click();
        await page.getByRole('textbox', { name: 'Mot de passe' }).fill(process.env.LOGIN_TEST_PWD as string);

        await page.getByRole('button', { name: 'Se connecter' }).click();

        await page.waitForURL('/dashboard')
        await expect(page).toHaveURL('/dashboard')
    } )
})