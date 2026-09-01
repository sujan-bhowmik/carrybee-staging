/**
 * Page Object Model for the Playwright homepage (https://playwright.dev/).
 */
class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://playwright.dev/';

    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.installationHeading = page.getByRole('heading', { name: 'Installation' });
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async title() {
    return this.page.title();
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }
}

module.exports = { PlaywrightDevPage };
