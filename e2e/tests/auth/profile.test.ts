import 'dotenv/config'
import { test, expect} from '../setup/base'

test.describe('Profile Page', () => {
    test('User should be able to see their profile', async ({page}) => {
        await page.goto('/profile')

        const headingPage = page.getByRole('heading', { name: 'Profile Settings' });

        const nameProfil =  page.getByText(process.env.LOGIN_TEST_USERNAME as string, { exact: true });

        await expect(headingPage).toBeVisible()
        await expect(headingPage).toHaveText('Profile Settings')

        await expect(nameProfil).toBeVisible()
        await expect(nameProfil).toHaveText(process.env.LOGIN_TEST_USERNAME as string)
    })
})