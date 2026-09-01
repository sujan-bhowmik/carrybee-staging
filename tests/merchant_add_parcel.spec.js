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

    //Set Delivery Location

    await page.locator('div.flex.flex-wrap.items-center.gap-1').locator('div').nth(2).click();

    



    // Fill in the parcel details
    const parcelWeight = page.locator("//input[@id='parcelWeight']");
    await parcelWeight.fill('2.5');
    await expect(parcelWeight).toHaveValue('2.5');

    const parcelDescription = page.locator("//textarea[@id='parcelDescription']");
    await parcelDescription.fill('Electronics');
    await expect(parcelDescription).toHaveValue('Electronics');

    // Submit the form
    await page.locator("//button[normalize-space()='Submit']").click();

    // Wait for the success message to appear
    const successMessage = page.locator("//div[contains(text(),'Parcel added successfully')]");
    await expect(successMessage).toBeVisible(); 










  });












});
