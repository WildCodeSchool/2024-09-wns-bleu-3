import { test, expect } from "@playwright/test";
 
test("Go to home page", async ({ page }) => {
   //accèder à la page d'accueil
   await page.goto("/");
  
  //attendre que la page soit complètement chargée
   await page.waitForLoadState("networkidle");
  
  //vérifier que le lien 'See all my scans'
  await expect(page.getByRole("link", { name: "See all my scans" })).toBeVisible();
 });