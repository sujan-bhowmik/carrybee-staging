# merchant-dashboard

[![Playwright Tests](https://github.com/sujan-bhowmik/merchant-dashboard/actions/workflows/playwright.yml/badge.svg)](https://github.com/sujan-bhowmik/merchant-dashboard/actions/workflows/playwright.yml)

Playwright end-to-end test suite for the merchant dashboard, built around the Page Object Model pattern.

📊 Latest [Allure test report](https://sujan-bhowmik.github.io/merchant-dashboard/) (auto-published on every push to `master`).

## Prerequisites

- [Node.js](https://nodejs.org/) (includes `npm`)
- A Linux, macOS, or Windows machine with `sudo`/admin access (needed once, to install browser OS dependencies on Linux)

## Installation

1. **Clone/enter the project directory**

   ```bash
   cd merchant-dashboard
   ```

2. **Install project dependencies**

   ```bash
   npm install
   ```

3. **Download the browser binaries** (Chromium, Firefox, WebKit)

   ```bash
   npx playwright install
   ```

4. **Install OS-level dependencies** (Linux only — installs shared libraries the browsers need; requires `sudo`)

   ```bash
   sudo npx playwright install-deps
   ```

   > On macOS/Windows this step isn't needed.

5. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in `.env` with real values (base URL, login credentials, etc). `.env` is gitignored — never commit it. `playwright.config.js` loads it automatically via `dotenv`.

6. **Verify the install** by running the sample test suite

   ```bash
   npm test
   ```

   You should see tests pass for the `chromium`, `firefox`, and `webkit` projects.

## Running tests

```bash
npm test                                 # run the full suite (all browsers)
npx playwright test --project=chromium   # run against a single browser
npx playwright test --headed             # run with a visible browser window
npx playwright test tests/example.spec.js   # run one file
npx playwright show-report                  # open the last HTML report
```

### Generating tests by recording actions (Codegen)

Instead of writing selectors by hand, you can record a browser session and let Playwright generate the code for you. This opens a real browser window, so run it in your own terminal (not headless/CI):

```bash
npx playwright codegen https://playwright.dev/
```

Useful options:

```bash
npx playwright codegen -o tests/generated.spec.js <url>   # save output straight to a file
npx playwright codegen -b firefox <url>                   # record in Firefox instead of Chromium
```

Copy the interesting bits of the generated code into a real spec, then refactor it to use a Page Object (see below) instead of leaving raw selectors inline.

## Test reports

Two reports are generated on every run:

- **Playwright HTML report** — `npx playwright show-report` (local only; not published anywhere)
- **Allure report** — richer history/trends, generated to `allure-report/` and auto-published to GitHub Pages by CI on every push to `master`:
  - View it locally: `npm run report:allure:generate && npm run report:allure:open`
  - View the latest published one: https://sujan-bhowmik.github.io/merchant-dashboard/

## Project structure

```
playwright.config.js       # test runner config: browsers, reporters, loads .env
.env.example                # template for required environment variables
.github/workflows/          # CI: runs tests, publishes HTML + Allure reports

pages/                      # Page Object Model classes — one per page/screen
  PlaywrightDevPage.js       # locators + actions for the Playwright homepage
  login.js                   # locators + actions for the login page

tests/
  fixtures.js                # extends Playwright's `test` with page-object fixtures
  example.spec.js            # sample spec using the fixtures
  data/
    params.js                 # shared test data/constants

api-endpoints/
  api-endpoints.js           # API endpoint constants for API-level tests

utils/                      # shared test helper functions (empty for now)
```

## Writing tests

### The Page Object Model (POM)

Each page/screen gets its own class under `pages/`. A page object holds:

- **locators** — how to find elements on that page
- **actions** — the things a user can do on that page (click, fill, navigate)

```js
// pages/login.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Log in' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

module.exports = { LoginPage };
```

The test itself then reads like plain English instead of a pile of selectors.

### Fixtures

`tests/fixtures.js` wires each page object into Playwright's fixture system, so a spec can just ask for `loginPage` or `playwrightDevPage` as a parameter — no manual `new PageClass(page)` needed:

```js
// tests/example.spec.js
const { test, expect } = require('./fixtures');

test.describe('Playwright homepage', () => {
  test('has title', async ({ page, playwrightDevPage }) => {
    await playwrightDevPage.goto();
    await expect(page).toHaveTitle(/Playwright/);
  });
});
```

To add a new page object:

1. Create `pages/<name>.js` with a class exposing locators + actions.
2. Register it in `tests/fixtures.js`:
   ```js
   const { MyNewPage } = require('../pages/myNewPage');
   // ...inside test.extend({ ... })
   myNewPage: async ({ page }, use) => {
     await use(new MyNewPage(page));
   },
   ```
3. Use it in any spec: `test('...', async ({ myNewPage }) => { ... })`.

### Grouping tests

Use `test.describe('...', () => { ... })` to group related tests — they'll show up nested under that name in the console output and in reports.

## Continuous Integration

Every push/PR to `master` or `main` triggers `.github/workflows/playwright.yml`, which:

1. Installs dependencies and browsers (with OS deps) on a clean Ubuntu runner
2. Runs the full test suite across chromium, firefox, and webkit
3. Uploads the Playwright HTML report and Allure report as downloadable build artifacts
4. On `master`, publishes the Allure report to GitHub Pages

Check the badge at the top of this README for the current status, or see the [Actions tab](https://github.com/sujan-bhowmik/merchant-dashboard/actions) for run history.
