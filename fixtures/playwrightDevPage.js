const { PlaywrightDevPage } = require('../pages/PlaywrightDevPage');

/** Playwright fixture: exposes `playwrightDevPage` to any test that requests it. */
module.exports = {
  playwrightDevPage: async ({ page }, use) => {
    await use(new PlaywrightDevPage(page));
  },
};
