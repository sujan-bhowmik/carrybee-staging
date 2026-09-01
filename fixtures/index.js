const base = require('@playwright/test');
const loginFixture = require('./login');
const playwrightDevPageFixture = require('./playwrightDevPage');

/**
 * Extends the base Playwright test with page object fixtures so specs
 * can request `playwrightDevPage` / `loginPage` directly instead of
 * instantiating them by hand.
 *
 * Each fixture lives in its own file in this folder — to add a new one,
 * create fixtures/<name>.js exporting `{ <name>: async ({ page }, use) => ... }`
 * and merge it in below.
 */
const test = base.test.extend({
  ...playwrightDevPageFixture,
  ...loginFixture,
});

module.exports = { test, expect: base.expect };
