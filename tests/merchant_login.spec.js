const { test, expect } = require('../fixtures');
const { sleep } = require('../utils/sleep');

test.describe('Merchant Login', () => {
  test('should log in successfully with valid credentials', async ({ page, loginPage }) => {
    await loginPage.goto();

    const validPhone = process.env.LOGIN_PHONE;
    const validPassword = process.env.LOGIN_PASSWORD;

    // Give the page a moment to finish hydrating before interacting with it
    // (see the hydration NOTE on the submit button locator in pages/login.js).
    await sleep(500);

    await loginPage.login(validPhone, validPassword);

    await expect(page).toHaveURL(/dashboard/);
  });

  test('should show error message with invalid credentials', async ({ page, loginPage }) => {
    await loginPage.goto();

    const invalidPhone = '+0987654321';
    const invalidPassword = 'invalidPassword';

    await loginPage.login(invalidPhone, invalidPassword);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(/Invalid phone number or password/);
  });
});
