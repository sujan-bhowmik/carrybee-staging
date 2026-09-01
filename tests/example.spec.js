const { test, expect } = require('@playwright/test');
const { PlaywrightDevPage } = require('../pages/PlaywrightDevPage');

test('has title', async ({ page }) => {
  const playwrightDevPage = new PlaywrightDevPage(page);
  await playwrightDevPage.goto();
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link works', async ({ page }) => {
  const playwrightDevPage = new PlaywrightDevPage(page);
  await playwrightDevPage.goto();
  await playwrightDevPage.clickGetStarted();
  await expect(playwrightDevPage.installationHeading).toBeVisible();
});
