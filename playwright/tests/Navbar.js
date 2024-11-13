import { test, expect } from '@playwright/test';

// Define desktop and mobile viewport sizes
const desktopViewport = { width: 1280, height: 720 };
const mobileViewport = { width: 375, height: 667 };

// Group for Handoff tests, containing both desktop and mobile tests
test.describe('Navbar', () => {

  // Desktop tests within Handoff group
  test.describe('Desktop', () => {
    test.use({ viewport: desktopViewport }); // Set the viewport for desktop

    test('Test Case 2686: Navbar - Verify Navbar navigation', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await expect(page.getByTestId('zippysLogoSearchLink')).toBeVisible();
      await expect(page.getByTestId('aboutZippysLink')).toBeVisible();
      await expect(page.getByTestId('signUpLink')).toBeVisible();
      await expect(page.getByTestId('logInLink')).toBeVisible();
      await expect(page.getByTestId('cartButton')).toBeVisible();
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1725 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.getByText('Zippy\'s Restaurants').click();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await expect(page.getByTestId('zippysLogoMenuLink')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Pickup Icon Zippy\'s' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Pickup time ASAP editIcon' })).toBeVisible();
      await expect(page.getByTestId('cartButton')).toBeVisible();
      await expect(page.getByTestId('aboutZippysLink')).toBeVisible();
      await expect(page.getByTestId('signUpLink')).toBeVisible();
      await expect(page.getByTestId('logInLink')).toBeVisible();
    });
  });

  // Mobile tests within Handoff group
  test.describe('Mobile', () => {
    test.use({ viewport: mobileViewport }); // Set the viewport for mobile

    test('Test Case 2686: Navbar - Verify Navbar navigation', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await expect(page.getByTestId('zippysLogoSearchLink')).toBeVisible();
      await page.getByTestId('hamburgerButton').click();
      await expect(page.getByTestId('aboutZippysLink')).toBeVisible();
      await expect(page.getByTestId('signUpLink')).toBeVisible();
      await expect(page.getByTestId('logInLink')).toBeVisible();
      await expect(page.getByTestId('cartButton')).toBeVisible();
      await page.getByTestId('hamburgerNavCloseButton').click();
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1725 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.getByText('Zippy\'s Restaurants').click();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await expect(page.getByTestId('zippysLogoMenuLink')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Pickup Icon Pickup from Zippy' })).toBeVisible();
      await expect(page.getByTestId('cartButton')).toBeVisible();
      await page.getByTestId('hamburgerButton').click();
      await expect(page.getByTestId('aboutZippysLink')).toBeVisible();
      await expect(page.getByTestId('signUpLink')).toBeVisible();
      await expect(page.getByTestId('logInLink')).toBeVisible();
    });
  });
});
