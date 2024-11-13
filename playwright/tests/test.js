import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test1', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test2', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test0', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test3', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test4', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test5', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test6', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test7', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test8', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test9', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test10', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test11', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test12', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test13', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test14', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test15', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test16', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test17', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test18', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});

test('test19', async ({ page }) => {
    await page.goto("https://dev-zippys-web.azurewebsites.net/");
    await page.locator('#orderLocationSearchBox').click();
    await page.locator('#orderLocationSearchBox').fill('new york');
    await page.getByText('New York City, NY US').click();
    await page.getByRole('heading', { name: 'Zippy\'s Restaurants' }).click();
    await page.getByRole('button', { name: 'SELECT LOCATION' }).click();
    await expect(page.getByRole('main')).toContainText('Pickup time');
    await expect(page.locator('div').filter({ hasText: /^MENU WILL BE HERE$/ })).toBeVisible();
});