const { test, expect } = require('../fixtures');
const { sleep } = require('../utils/sleep');

test.describe('Merchant Add Parcel', () => {
  test('Merchant should be able toAdd a Regular Parcel successfully', async ({ page, loginPage }) => {


    // Navigate to the login page and log in with valid credentials
    await loginPage.goto();

    const validPhone = process.env.LOGIN_PHONE;
    const validPassword = process.env.LOGIN_PASSWORD;

    // Give the page a moment to finish hydrating before interacting with it
    // (see the hydration NOTE on the submit button locator in pages/login.js).
    await sleep(500);

    await loginPage.login(validPhone, validPassword);

    await expect(page).toHaveURL(/dashboard/);

    await sleep(5000);

    // Click on the "Add Parcel" button
    await page.locator("//button[normalize-space()='Add Parcel']").click();
    await sleep(3000);

    // Select Store
    // NOTE: the trigger's id is a React useId() value (e.g. "_r_1f_-form-item")
    // that is regenerated on every render, so it can't be relied on. The
    // accessible name ("Store") is stable and is what shadcn/Radix exposes
    // via role=combobox.
    await page.getByRole('combobox', { name: 'Store' }).click();
    await page.getByRole('option', { name: 'Gulshan Mart Store 1', exact: true }).click();

    // Fill in the recipient's phone number and name
    const recipientPhone = page.locator("//input[@id='recipientPhone']");
    await recipientPhone.fill('01800-135353');
    await expect(recipientPhone).toHaveValue('01800-135353');
    const recipientName = page.locator("//input[@id='recipientName']");
    await recipientName.fill('John Doe');
    await expect(recipientName).toHaveValue('John Doe');

    // Fill in the merchant order ID
    const merchantOrderId = page.locator("//input[@id='merchantOrderId']");
    await merchantOrderId.fill('ORD123456');
    await expect(merchantOrderId).toHaveValue('ORD123456');


    // Fill in the recipient's address
    await page.locator("//input[@id='recipientAddress']").fill('Mirpur 10 Circle, Mirpur 10, Sector 10, Dhaka, Bangladesh');
    await expect(page.locator("//input[@id='recipientAddress']")).toHaveValue('Mirpur 10 Circle, Mirpur 10, Sector 10, Dhaka, Bangladesh');

    // Filling the address triggers a debounced geocoding lookup that pops up
    // an "Address" confirmation dialog; it must be confirmed before the form
    // underneath is interactable again. It does not auto-fill the Delivery
    // Location fields below, so that still has to be done manually.
    await page.getByRole('dialog', { name: 'Address' }).getByRole('button', { name: 'Confirm Address' }).click();

    // Set Delivery Location
    // This is a 3-step cascading combobox (City -> Zone -> Area) that opens
    // in a dialog; each selection advances to the next step.
    await page.getByRole('combobox', { name: 'Delivery Location *' }).click();
    await page.getByRole('option', { name: 'Dhaka', exact: true }).click();
    await page.getByRole('option', { name: 'Mirpur 10', exact: true }).click();
    await page.getByRole('option', { name: 'Sector 10', exact: true }).click();

    // Put parcel Weight
    await page.locator("//input[@id='itemWeight']").fill('2.5');

    // Put Quantity by clicking the plus button
    // (identified by its lucide "plus" icon rather than an unstable id)
    await page.locator('button:has(svg.lucide-plus)').click();
    await expect(page.locator('div.flex-1.text-center')).toHaveText('2');

    // Input Parcel Description
    await page.locator('[name="productDescription"]').fill('Electronics');

    // Put COD Amount in BDT
    await page.locator("//input[@id='cod']").fill('500');

    // Put Product Value in BDT
    await page.locator("//input[@id='productValue']").fill('1000');


    // Press Submit Button
    // (there are two Submit buttons in the DOM for responsive layouts;
    // scope to the visible one)
    await page.locator('button[type="submit"]:visible').click();


    // Wait for the success message to appear
    const successMessage = page.locator('text=Order created successfully');
    await expect(successMessage).toBeVisible();

  });

});
