import {test, expect} from '../setup/base'

test.describe('Disconnect', () => {
    test('User should be able to disconnect', async ({page}) => {
        await page.goto('/')

        await page.getByRole('banner').locator('rect').nth(2).click();

        await page.getByRole('menuitem', { name: 'Logout' }).click();

        const buttonLogin = page.getByRole('link', { name: 'Sign in' });

        await expect(buttonLogin).toBeVisible()
    })
})