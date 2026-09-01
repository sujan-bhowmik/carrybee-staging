const { test, expect } = require('./fixtures');

test.describe('Playwright homepage', () => {
  test('has title', async ({ page, playwrightDevPage }) => {
    await playwrightDevPage.goto();
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link works', async ({ playwrightDevPage }) => {
    await playwrightDevPage.goto();
    await playwrightDevPage.clickGetStarted();
    await expect(playwrightDevPage.installationHeading).toBeVisible();
  });
});
