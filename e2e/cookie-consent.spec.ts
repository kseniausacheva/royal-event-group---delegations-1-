import { test, expect } from '@playwright/test';

/**
 * Real-browser E2E — Cookie consent
 * Verifies the banner flow: show on first visit, persist after accept.
 */
test.describe('Cookie banner', () => {
  test('shows on first visit and disappears after accepting', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/ru');

    // Banner visible
    const acceptBtn = page.getByRole('button', { name: /согласен/i });
    await expect(acceptBtn).toBeVisible({ timeout: 5000 });

    // Click accept
    await acceptBtn.click();

    // Banner should hide
    await expect(acceptBtn).toBeHidden();

    // localStorage should have the consent
    const stored = await page.evaluate(() => localStorage.getItem('cookie-consent'));
    expect(stored).toBe('true');
  });

  test('does not re-appear on next navigation after accepting', async ({ page }) => {
    await page.goto('/ru');
    // Pre-set consent
    await page.evaluate(() => localStorage.setItem('cookie-consent', 'true'));
    await page.reload();

    // Navigate to another page
    await page.goto('/ru/about');
    await expect(page.getByRole('button', { name: /согласен/i })).toBeHidden();
  });

  test('shows English copy on /en route', async ({ page }) => {
    await page.goto('/ru');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.goto('/en');
    await expect(page.getByRole('button', { name: /accept/i })).toBeVisible();
  });
});
