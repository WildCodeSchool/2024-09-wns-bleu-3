import {test, expect} from '../setup/base'

test.describe('Dashboard', () => {
    test('User should be able to see the dashboard', async ({page}) => {
        await page.goto('/dashboard')

        const headingPage = page.getByRole('button', { name: 'avatar Welcome, Florian f.' });
        
        const totalScans = page.getByText('TOTAL', { exact: true });
        const addNewScan = page.getByRole('heading', { name: 'ADD NEW SCAN' });

        const activeIssues = page.getByRole('main').getByText('ISSUES', { exact: true });

        await expect(headingPage).toBeVisible()
        await expect(totalScans).toBeVisible()
        await expect(addNewScan).toBeVisible()
        await expect(activeIssues).toBeVisible()
        
    })
})