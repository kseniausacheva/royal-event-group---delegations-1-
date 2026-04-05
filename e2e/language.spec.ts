import { test, expect } from '@playwright/test';

/**
 * Real-browser E2E — Language switching
 * Verifies that RU/EN toggle updates URL and persists while navigating.
 */
test.describe('Language switching', () => {
  test('switching RU -> EN on about page updates URL prefix', async ({ page }) => {
    await page.goto('/ru/about');
    await page.getByRole('button', { name: 'EN', exact: true }).first().click();
    await expect(page).toHaveURL(/\/en\/about$/);
  });

  test('switching EN -> RU on contact page updates URL prefix', async ({ page }) => {
    await page.goto('/en/contact');
    await page.getByRole('button', { name: 'RU', exact: true }).first().click();
    await expect(page).toHaveURL(/\/ru\/contact$/);
  });

  test('document.lang attribute reflects current language', async ({ page }) => {
    await page.goto('/ru');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');

    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('English route renders home page with nav', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded' });
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible({ timeout: 10000 });
    // Logo should also be visible
    await expect(page.locator('img[alt="ROYAL EVENT"]').first()).toBeVisible();
  });
});
