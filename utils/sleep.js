/**
 * Pauses for the given duration.
 *
 * Prefer Playwright's auto-waiting/web-first assertions (`expect(...).toBeVisible()`,
 * `locator.waitFor()`, etc.) over this — reach for `sleep` only as a last resort,
 * e.g. to ride out a fixed client-side debounce with no observable event to wait on.
 *
 * @param {number} ms milliseconds to wait
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { sleep };
