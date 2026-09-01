# merchant-dashboard

Playwright end-to-end test setup for this project.

## Prerequisites

- [Node.js](https://nodejs.org/) (includes `npm`)
- A Linux, macOS, or Windows machine with `sudo`/admin access (needed once, to install browser OS dependencies on Linux)

## Installation

1. **Clone/enter the project directory**

   ```bash
   cd merchant-dashboard
   ```

2. **Install project dependencies** (installs `playwright` and `@playwright/test`)

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

5. **Verify the install** by running the sample test suite

   ```bash
   npm test
   ```

   You should see tests pass for the `chromium`, `firefox`, and `webkit` projects.

## Running tests

```bash
npm test                              # run the full suite (all browsers)
npx playwright test --project=chromium   # run against a single browser
npx playwright test --headed             # run with a visible browser window
npx playwright show-report               # open the last HTML report
```

## Project structure

```
playwright.config.js   # test runner config (projects: chromium, firefox, webkit)
tests/                 # test specs
  example.spec.js      # sample test verifying the install works
```
