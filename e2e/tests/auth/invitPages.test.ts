import {test, expect} from '../setup/base'

test.describe('Invite Pages', () => {
    test('User should be redirected to the dashboard if logged in - Login', async ({page}) => {
        await page.goto('/login')

        const headingPage = page.getByRole('button', { name: 'avatar Welcome, Florian f.' });

        await expect(headingPage).toBeVisible()
        await expect(page).toHaveURL('/dashboard')
    })
        test('User should be redirected to the dashboard if logged in - Signup', async ({page}) => {
        await page.goto('/signup')

        const headingPage = page.getByRole('button', { name: 'avatar Welcome, Florian f.' });

        await expect(headingPage).toBeVisible()
        await expect(page).toHaveURL('/dashboard')
    })
})