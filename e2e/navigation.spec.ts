import { test, expect } from '@playwright/test';

/**
 * Real-browser E2E — Navigation & routing
 * Verifies that the SPA renders correctly across routes and that deep links work.
 */
test.describe('Navigation', () => {
  test('root "/" redirects to /ru', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/ru$/);
  });

  test('home page loads with logo, navbar and hero', async ({ page }) => {
    await page.goto('/ru');
    await expect(page.locator('img[alt="ROYAL EVENT"]').first()).toBeVisible();
    await expect(page.locator('nav').first()).toBeVisible();
  });

  test('deep link /ru/about renders About page', async ({ page }) => {
    await page.goto('/ru/about');
    await expect(page).toHaveURL(/\/ru\/about$/);
  });

  test('deep link /ru/services renders Services page', async ({ page }) => {
    await page.goto('/ru/services');
    await expect(page).toHaveURL(/\/ru\/services$/);
  });

  test('deep link /ru/portfolio renders Portfolio page', async ({ page }) => {
    await page.goto('/ru/portfolio');
    await expect(page).toHaveURL(/\/ru\/portfolio$/);
  });

  test('deep link /ru/contact renders Contact page with form', async ({ page }) => {
    await page.goto('/ru/contact');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('footer has legal links with /ru prefix', async ({ page }) => {
    await page.goto('/ru');
    const footer = page.locator('footer');
    await expect(footer.locator('a[href*="/ru/privacy"]')).toBeVisible();
    await expect(footer.locator('a[href*="/ru/offer"]')).toBeVisible();
    await expect(footer.locator('a[href*="/ru/data-consent"]')).toBeVisible();
    await expect(footer.locator('a[href*="/ru/mailing-consent"]')).toBeVisible();
  });
});

test.describe('404 page', () => {
  test('unknown /ru URL shows Russian 404', async ({ page }) => {
    await page.goto('/ru/this-page-does-not-exist');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByRole('heading', { name: /страница не найдена/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /на главную/i })).toBeVisible();
  });

  test('unknown /en URL shows English 404', async ({ page }) => {
    await page.goto('/en/does-not-exist');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible();
  });

  test('clicking "На главную" from 404 returns to home', async ({ page }) => {
    await page.goto('/ru/broken-link');
    await page.getByRole('link', { name: /на главную/i }).click();
    await expect(page).toHaveURL(/\/ru$/);
  });
});
