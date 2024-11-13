import { test, expect } from '@playwright/test';

// Define desktop and mobile viewport sizes
const desktopViewport = { width: 1280, height: 720 };
const mobileViewport = { width: 375, height: 667 };

// Group for Handoff tests, containing both desktop and mobile tests
test.describe('Handoff', () => {

  // Desktop tests within Handoff group
  test.describe('Desktop', () => {
    test.use({ viewport: desktopViewport }); // Set the viewport for desktop

    test('Test Case 2687: Handoff - Verify valid pickup search', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1765 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.waitForTimeout(2000); 
      await expect(page.locator('#locationCard').first()).toBeVisible();
      await expect(page.getByText('Zippy\'s Restaurants')).toBeVisible();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await expect(page).toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
    });

    test('Test Case 2688: Handoff - Verify valid delivery search', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.getByRole('button', { name: 'Delivery Icon Delivery' }).click();
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1765 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.waitForTimeout(2000); 
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await expect(page).toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
    });

    test('Test Case 2689: Handoff - Verify invalid delivery search', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.getByRole('button', { name: 'Delivery Icon Delivery' }).click();
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('2 alaska');
      await page.waitForTimeout(2000); 
      await page.getByText('Alaska Ave, Greenville, SC 29607 US').click();
      await page.waitForTimeout(2000); 
      await expect(page.getByRole('button', { name: 'START ORDER' })).not.toBeVisible();
      await expect(page.getByText('DELIVERY IS NOT AVAILABLE')).toBeVisible();
      await expect(page).not.toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
    });

    test('Test Case 2690: Handoff - Verify invalid pickup search', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('2 alaska');
      await page.waitForTimeout(2000); 
      await page.getByText('Alaska Ave, Greenville, SC 29607 US').click();
      await page.waitForTimeout(2000); 
      await expect(page.getByRole('button', { name: 'START ORDER' })).not.toBeVisible();
      await expect(page.getByText('PICKUP IS NOT AVAILABLE')).toBeVisible();
      await expect(page).not.toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
    });

    test('Test Case 2691: Handoff - Verify closed and unavailable stores for pickup', async ({ page }) => {
      // Mock restaurants as available but closed
      await page.route('**/locations?*', async (route) => {
        const response = await route.fetch(); // Fetch the original response
        const body = await response.json();   // Parse the response body
    
        // Modify the response body
        body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = false;
        });
    
        // Send the modified response
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify(body),
        });
      });
    
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1765 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.waitForTimeout(2000); 
      await expect(page.locator('#locationCard').first()).toBeVisible();
      await expect(page.getByText('Zippy\'s Restaurants')).toBeVisible();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await expect(page).not.toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
      await expect(page.getByRole('heading', { name: 'PRE-ORDER ONLY' })).toBeVisible();
    });
    

  });

  // Mobile tests within Handoff group
  test.describe('Mobile', () => {
    test.use({ viewport: mobileViewport }); // Set the viewport for mobile

    test('Test Case 2687: Handoff - Verify valid pickup search', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1765 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await expect(page.locator('#locationCard').first()).toBeVisible();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await expect(page.getByText('Zippy\'s Restaurants')).toBeVisible();
    });

    test('Test Case 2688: Handoff - Verify valid delivery search', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.getByRole('button', { name: 'Delivery Icon Delivery' }).click();
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1765 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await expect(page).toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
    });

    test('Test Case 2689: Handoff - Verify invalid delivery search', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.getByRole('button', { name: 'Delivery Icon Delivery' }).click();
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('2 alaska');
      await page.waitForTimeout(2000); 
      await page.getByText('Alaska Ave, Greenville, SC 29607 US').click();
      await page.waitForTimeout(2000); 
      await expect(page.getByRole('button', { name: 'START ORDER' })).not.toBeVisible();
      await expect(page.getByText('DELIVERY IS NOT AVAILABLE')).toBeVisible();
      await expect(page).not.toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
    });

    test('Test Case 2690: Handoff - Verify invalid pickup search', async ({ page }) => {
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('2 alaska');
      await page.waitForTimeout(2000); 
      await page.getByText('Alaska Ave, Greenville, SC 29607 US').click();
      await page.waitForTimeout(2000); 
      await expect(page.getByRole('button', { name: 'START ORDER' })).not.toBeVisible();
      await expect(page.getByText('PICKUP IS NOT AVAILABLE')).toBeVisible();
      await expect(page).not.toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
    });

    test('Test Case 2691: Handoff - Verify closed and unavailable stores for pickup', async ({ page }) => {
      // Mock restaurants as available but closed
      await page.route('**/locations?*', async (route) => {
        const response = await route.fetch(); // Fetch the original response
        const body = await response.json();   // Parse the response body
    
        // Modify the response body
        body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = false;
        });
    
        // Send the modified response
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify(body),
        });
      });
    
      await page.goto('https://dev-zippys-web.azurewebsites.net/');
      await page.locator('#orderLocationSearchBox').click();
      await page.locator('#orderLocationSearchBox').fill('1765 s king st');
      await page.getByText('S King St, Honolulu, HI 96826 US').click();
      await page.waitForTimeout(2000); 
      await expect(page.locator('#locationCard').first()).toBeVisible();
      await expect(page.getByText('Zippy\'s Restaurants')).toBeVisible();
      await page.getByRole('button', { name: 'START ORDER' }).click();
      await expect(page).not.toHaveURL('https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor');
      await expect(page.getByRole('heading', { name: 'PRE-ORDER ONLY' })).toBeVisible();
    });

  });
});
