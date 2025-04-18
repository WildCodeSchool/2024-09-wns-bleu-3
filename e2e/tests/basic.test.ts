import { test, expect} from './setup/base'
 
test.describe("Basic test", () => {
   //accèder à la page d'accueil

       test.beforeEach(async ({ page }) => {
           // Navigate to the home page
           await page.goto('/');
       });

       test('user can see the title of the page', async ({ page} ) => {
          await expect(page.getByRole("link", { name: "See all my scans" })).toBeVisible();

       })
  
  //vérifier que le lien 'See all my scans'
 });