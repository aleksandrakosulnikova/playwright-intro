import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  const link = page.getByRole('link', { name: 'Get started' });
  await link.click();

  // Expects page to have a heading with the name of Installation.
  const heading = page.getByRole('heading', { name: 'Installation' })
  await expect(heading).toBeVisible();
});

//Домашка №15

test("Has GitHub button", async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const linkGitHub = page.getByRole("link", { name: "GitHub repository"});
  await expect(linkGitHub).toBeVisible();
});


test("Has Discord button", async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const linkDiscord = page.getByRole("link", { name: "Discord server"});
  await expect(linkDiscord).toBeVisible();
});


test("Has Dark Mode switcher button", async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const buttonDarkModeSwitcher = page.getByRole("button", { name: "Switch between dark and light mode (currently system mode)"});
  await expect(buttonDarkModeSwitcher).toBeVisible();
});