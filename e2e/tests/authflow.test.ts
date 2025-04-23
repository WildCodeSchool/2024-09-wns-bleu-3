import {test, expect} from './setup/base'

test.describe('Authentication flow', () => {

    test('User should be able to sign up', async ({page}) => {
            await page.goto('/signup')
      
            // Username sign up
            await page.getByRole('textbox', { name: 'Username' }).click();
            await page.getByRole('textbox', { name: 'Username' }).fill(process.env.SIGN_IN_TEST_USERNAME as string);
        
            // Email sign up
        
            await page.getByRole('textbox', { name: 'Email address' }).click();
          await page.getByRole('textbox', { name: 'Email address' }).fill(process.env.SIGN_IN_TEST_EMAIL as string);
      
            // Password sign up
        
            await page.getByRole('textbox', { name: 'Password' }).click();
            await page.getByRole('textbox', { name: 'Password' }).fill(process.env.SIGN_IN_TEST_PWD as string);
        
            await page.getByRole('button', { name: 'Create Account' }).click();
        
            const toastSuccess = page.getByText('You’ve successfully signed up');

            await expect(toastSuccess).toBeVisible();
            await expect(page).toHaveURL('/')
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

        await page.waitForURL('/')
        await expect(page).toHaveURL('/')
    } )
})