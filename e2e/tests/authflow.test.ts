import { test, expect } from './setup/base'

test.describe('Authentication flow', () => {

    test('User should be able to sign up', async ({ page }) => {
        await page.goto('/signup')

        // random suffix pour éviter les collisions d’email en BDD
        const rand = Math.random().toString(36).slice(2, 8)

        // Username
        await page.getByRole('textbox', { name: 'Username' }).click()
        await page.getByRole('textbox', { name: 'Username' }).fill(`test_${rand}`)

        // Email
        await page.getByRole('textbox', { name: 'Email address' }).click()
        await page.getByRole('textbox', { name: 'Email address' }).fill(`test_${rand}@example.com`)

        // Password
        await page.getByRole('textbox', { name: 'Password' }).click()
        await page.getByRole('textbox', { name: 'Password' }).fill('Playwright1!')

        await page.getByRole('button', { name: 'Create Account' }).click()

        // Nouveau message de toast (tolérant)
        await expect(
            page.getByText(/Registration started|Confirmation email sent/i)
        ).toBeVisible({ timeout: 10_000 })

        // (optionnel) si l'app redirige vers la home après submit
        // await page.waitForURL('**/', { timeout: 10_000 })
    })

    test('User should be able to login', async ({ page }) => {
        await page.goto('/login')

        // Email login
        await page.getByRole('textbox', { name: 'Email' }).click()
        await page.getByRole('textbox', { name: 'Email' }).fill(process.env.LOGIN_TEST_EMAIL as string)

        // Password login
        await page.getByRole('textbox', { name: 'Mot de passe' }).click()
        await page.getByRole('textbox', { name: 'Mot de passe' }).fill(process.env.LOGIN_TEST_PWD as string)

        await page.getByRole('button', { name: 'Se connecter' }).click()

        await page.waitForURL('/dashboard')
        await expect(page).toHaveURL('/dashboard')
    })
})
