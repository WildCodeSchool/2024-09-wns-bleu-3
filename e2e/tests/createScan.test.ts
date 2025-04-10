import { test, expect } from '@playwright/test';
import { Client } from 'pg';

test.describe('Create Scan', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the home page
        await page.goto('/');
        // Wait for the page to load
        await page.waitForLoadState('networkidle');
        // Click on the "See all my scans" link
    });

    // TODO: faire un test pour voir si le form existe

    // TODO: corriger le texte de création de scan, juste pour voir si la création fonctionne et si c'est visible dans la page après la création ?

    // TODO: faire un test pour voir si le scan est disponible, je suis capable de voir les détails et si le response time est dispo etc.

    // TODO: est-ce que je fais un test pour voir si c'est bien enregistré en BDD ?


    // Je veux aller sur la page / créer un scan et trouver mon scan dans la page
    test('user can create and view the scan result', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page.getByRole('textbox', { name: 'Title' }).fill('Test Scan Creation for PlayWright');
        await page.getByRole('textbox', { name: 'URL to scan' }).click();
        await page.getByRole('textbox', { name: 'URL to scan' }).fill('https://vitest.dev/');
        await page.getByTestId('freqSelectButton').click();
        await page.getByRole('option', { name: 'Every 15 minutes' }).click();
        await page.getByTestId('tagSelectButton').click();
        await page.getByRole('option', { name: 'Base de données' }).click();
        await page.getByRole('button', { name: 'Start Scanning' }).click();
        await page.getByText('Test Scan Creation for PlayWrighthttps://vitest.dev/200').first().click();
    });
});


// test("create scan well registered in DB", async ({ page }) => { 
//     const client = new Client({
//         host: process.env.DB_HOST || "db",
//         user: "postgres",
//         database: "postgres",
//         password: "postgres",
//     })

//     await client.connect();

//     const res = await client.query("SELECT * FROM scan WHERE title = 'Vitest Website Monitor' AND url = 'https://vitest.dev/'");
//     await client.end();
//     expect(res.rows.length).toBe(1);
//     expect(res.rows[0].title).toBe("Vitest Website Monitor");
//     expect(res.rows[0].url).toBe("https://vitest.dev/");

// })