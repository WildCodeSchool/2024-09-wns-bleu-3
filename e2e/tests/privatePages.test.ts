import {test, expect} from './setup/base'

test.describe('Private Pages', () => {
    test('User should be redirected to the homepage if not logged in - Dashboard', async ({page}) => {
        await page.goto('/dashboard')

        const headingPage = page.getByRole('heading', { name: 'Scan URLs Quickly and Easily' });

        await expect(headingPage).toBeVisible()
        await expect(page).toHaveURL('/')
    })
    test('User should be redirected to the homepage if not logged in - Profile', async ({page}) => {
        await page.goto('/profile')

        const headingPage = page.getByRole('heading', { name: 'Scan URLs Quickly and Easily' });

        await expect(headingPage).toBeVisible()
        await expect(page).toHaveURL('/')
    })
})