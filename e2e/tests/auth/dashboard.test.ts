import {test, expect} from '../setup/base'

test.describe('Dashboard', () => {
    test('User should be able to see the dashboard', async ({page}) => {
        await page.goto('/dashboard')

        const headingPage = page.getByRole('heading', { name: 'Welcome, Florian'});
        
        const totalScans = page.getByText('Total Scans');
        const activeScans = page.getByText('Active Scans');
        
        const activeIssues = page.getByRole('heading', { name: 'Active Issues' });

        await expect(headingPage).toBeVisible()
        await expect(totalScans).toBeVisible()
        await expect(activeScans).toBeVisible()
        await expect(activeIssues).toBeVisible()
        
    })
})