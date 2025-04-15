import { test, expect } from "@playwright/test";

let errors: Error[] = [];
 
test.describe("Basic test", () => {
   //accèder à la page d'accueil

       test.beforeEach(async ({ page }) => {
   
           // push errors if there is any
           page.on('pageerror', (error: Error) => {
               errors.push(error);
           })
   
           page.on('console', msg => {
               if (msg.type() === 'error') {
                   console.error('Console error:', msg.text());
                   errors.push(new Error(`Console error: ${msg.text()}`));
               }
           });
           
           // Navigate to the home page
           await page.goto('/');
       });
   
       test.afterEach(() => {
           // Expect to have 0 errors after each test
           expect(errors).toHaveLength(0);
       });

       test('user can see the title of the page', async ({ page} ) => {
          await expect(page.getByRole("link", { name: "See all my scans" })).toBeVisible();

       })
  
  //vérifier que le lien 'See all my scans'
 });