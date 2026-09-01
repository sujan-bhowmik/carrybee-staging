const base = require('@playwright/test');
const { PlaywrightDevPage } = require('../pages/PlaywrightDevPage');
const { LoginPage } = require('../pages/login');

/**
 * Extends the base Playwright test with page object fixtures so specs
 * can request `playwrightDevPage` / `loginPage` directly instead of
 * instantiating them by hand.
 */
const test = base.test.extend({
  playwrightDevPage: async ({ page }, use) => {
    await use(new PlaywrightDevPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

module.exports = { test, expect: base.expect };
