import {test, expect} from '../setup/base'

test.describe('Invite Pages', () => {
    test('User should be redirected to the homepage if logged in - Login', async ({page}) => {
        await page.goto('/login')

        const headingPage = page.getByRole('heading', { name: 'Scan URLs Quickly and Easily' });

        await expect(headingPage).toBeVisible()
        await expect(page).toHaveURL('/')
    })
        test('User should be redirected to the homepage if logged in - Signup', async ({page}) => {
        await page.goto('/signup')

        const headingPage = page.getByRole('heading', { name: 'Scan URLs Quickly and Easily' });

        await expect(headingPage).toBeVisible()
        await expect(page).toHaveURL('/')
    })
})