import 'dotenv/config'
import {expect, test as setup } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const storageFilePath = path.resolve(__dirname, '../../.auth/user.json');

if(fs.existsSync(storageFilePath)) {
  setup.skip(true, 'Auth already setup, skipping test');
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
      await expect(page).toHaveURL('/')

      // const storageFilePath = path.resolve(__dirname, '../../playwright/.auth/storageState.json');
  
      await page.context().storageState({path: storageFilePath});
      // console.log(`✅ Auth storage state saved to ${storageFilePath}`);
  
  
  })
})