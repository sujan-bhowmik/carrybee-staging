const { LoginPage } = require('../pages/login');

/** Playwright fixture: exposes `loginPage` to any test that requests it. */
module.exports = {
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
};
