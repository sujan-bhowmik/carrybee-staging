/**
 * Page Object Model for the merchant dashboard login page
 * (https://stage-merchant.carrybee.com/login).
 *
 * The form is phone + password (not email/username): a phone input with a
 * country-code selector, a password field with a show/hide toggle, and a
 * submit button.
 *
 * NOTE: the submit button's server-rendered (pre-hydration) label reads
 * "Save Changes" — a stale SSR artifact from a shared component. After the
 * client hydrates it correctly shows "Login". Locating it by id/type
 * instead of visible text avoids depending on that hydration timing.
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = '/login';

    this.countryCodeButton = page.locator('button[aria-haspopup="dialog"]').first();
    this.phoneInput = page.locator('#phone');
    this.passwordInput = page.locator('#password');
    this.showPasswordButton = page.getByRole('button', { name: 'Show Password' });
    this.submitButton = page.locator('form button[type="submit"]');
    this.forgotPasswordLink = page.locator('a[href="/forgot-password"]');
    this.registerLink = page.getByRole('link', { name: 'Register Now' });
  }

  async goto() {
    await this.page.goto(this.path);
  }

  async login(phone, password) {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

module.exports = { LoginPage };
