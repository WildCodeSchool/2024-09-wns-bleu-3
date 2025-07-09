import 'dotenv/config'
import {expect, test as setup } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const storageFilePath = path.resolve(__dirname, '../../.auth/user.json');

/**
 * Always recreate the storage state to avoid using an expired / invalid JWT that
 * would make authenticated pages (like /dashboard) fail locally.
 */
if (fs.existsSync(storageFilePath)) {
  fs.rmSync(storageFilePath, { force: true });
}

setup.describe('Auth setup', () => {
  setup('Login and save storage state', async ({page}) => {

      // Login the user and retrieve data login

      await page.goto('/login')

      // Email login

      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill(process.env.LOGIN_TEST_EMAIL as string);

      // PWD login

      await page.getByRole('textbox', { name: 'Mot de passe' }).click();
      await page.getByRole('textbox', { name: 'Mot de passe' }).fill(process.env.LOGIN_TEST_PWD as string);

      // Button login

      await page.getByRole('button', { name: 'Se connecter' }).click();
      await page.waitForURL('/');
      await page.reload()

      // Check if the user is logged in

      await page.getByRole('banner').locator('rect').nth(2).click();


      await expect(page.getByText('florian')).toBeVisible();

        
      await page.context().storageState({path: storageFilePath});

      console.log(`Storage state saved to ${storageFilePath}`);
  
  })
})