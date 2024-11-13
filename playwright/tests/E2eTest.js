import { test, expect } from '@playwright/test';

// Define desktop and mobile viewport sizes
const desktopViewport = { width: 1280, height: 720 };
const mobileViewport = { width: 375, height: 667 };

// Group for Handoff tests, containing both desktop and mobile tests
test.describe('Order Confirmation', () => {

  // Desktop tests within Handoff group
  test.describe('Desktop', () => {
    test.use({ viewport: desktopViewport }); // Set the viewport for desktop

    test('Order Confirmation - Verify complete an order', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.getByRole('button', { name: 'Delivery Icon Delivery' }).click();
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1765 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await page.getByRole('button', { name: 'TEST CATEGORY' }).click();
      await page.getByRole('button', { name: 'Shoyu Shoyu Product with the' }).click();
      await page.goto('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor/products/688976');
      await page.getByRole('button', { name: 'ADD TO CART' }).click();
      await page.getByRole('button', { name: 'TEST CATEGORY' }).click();
      await page.getByRole('button', { name: 'Shoyu Shoyu Product with the' }).click();
      await page.getByRole('button', { name: 'ADD TO CART' }).click();
      await page.getByTestId('cartButton').click();
      await page.waitForTimeout(2000);
      await page.getByTestId('CartCheckoutButton').click();
      await page.waitForTimeout(2000);
      await page.getByLabel('First Name*').click();
      await page.getByLabel('First Name*').fill('jhonatan');
      await page.getByLabel('First Name*').press('Tab');
      await page.getByLabel('Delivery Address*').press('Tab');
      await page.getByLabel('Last Name*').fill('test');
      await page.getByLabel('Last Name*').press('Tab');
      await page.getByLabel('Delivery Instructions').fill('delivery instructions');
      await page.getByLabel('Email Address*').click();
      await page.getByLabel('Email Address*').fill('aaa@aaa.com');
      await page.getByLabel('Email Address*').press('Tab');
      await page.getByLabel('Phone Number*').fill('234-234-6565');
      await page.getByTestId('button-tip-20').click();
      await page.waitForTimeout(2000);
      await expect(page.getByTestId('CheckoutAmountReview-5-value')).toContainText('$7.73');
      await page.getByTestId('button-order-confirmation').click();
      await expect(page.getByTestId('order-header-title')).toContainText('Order Received!');
    });
  });

  // Mobile tests within Handoff group
  test.describe('Mobile', () => {
    test.use({ viewport: mobileViewport }); // Set the viewport for mobile

    test('Order Confirmation - Verify complete an order', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.getByRole('button', { name: 'Delivery Icon Delivery' }).click();
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1765 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await page.getByRole('button', { name: 'TEST CATEGORY' }).click();
      await page.getByRole('button', { name: 'Shoyu Shoyu Product with the' }).click();
      await page.goto('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor/products/688976');
      await page.getByRole('button', { name: 'ADD TO CART' }).click();
      await page.getByRole('button', { name: 'TEST CATEGORY' }).click();
      await page.getByRole('button', { name: 'Shoyu Shoyu Product with the' }).click();
      await page.getByRole('button', { name: 'ADD TO CART' }).click();
      await page.getByTestId('cartButton').click();
      await page.waitForTimeout(2000);
      await page.getByTestId('CartCheckoutButton').click();
      await page.waitForTimeout(2000);
      await page.getByLabel('First Name*').click();
      await page.getByLabel('First Name*').fill('jhonatan');
      await page.getByLabel('First Name*').press('Tab');
      await page.getByLabel('Delivery Address*').press('Tab');
      await page.getByLabel('Last Name*').fill('test');
      await page.getByLabel('Last Name*').press('Tab');
      await page.getByLabel('Delivery Instructions').fill('delivery instructions');
      await page.getByLabel('Email Address*').click();
      await page.getByLabel('Email Address*').fill('aaa@aaa.com');
      await page.getByLabel('Email Address*').press('Tab');
      await page.getByLabel('Phone Number*').fill('234-234-6565');
      await page.getByTestId('button-tip-20').click();
      await page.waitForTimeout(2000);
      await expect(page.getByTestId('CheckoutAmountReview-5-value')).toContainText('$7.73');
      await page.getByTestId('button-order-confirmation').click();
      await expect(page.getByTestId('order-header-title')).toContainText('Order Received!');
    });
  });
});
