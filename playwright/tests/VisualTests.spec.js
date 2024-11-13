// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const urls = require(path.resolve(__dirname, '../../cypress/fixtures/urls.json'));

for (const url of urls) {
  test(`Visual - ${url}`, async ({ page, baseURL }) => {
    await page.goto(baseURL + url);
    const screenshotName = url.replace(/\//g, '_') + '.png';
    await expect(page).toHaveScreenshot(screenshotName, {timeout:60000});
  });
}
