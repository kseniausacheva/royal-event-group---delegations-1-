import { test, expect } from '@playwright/test';

/**
 * Real-browser E2E — Contact form
 * Full user scenario: visit contact page, fill form, submit with mocked backend,
 * and see success screen. Network is intercepted so we don't actually send email.
 */
test.describe('Contact form', () => {
  test('user fills and submits the contact form successfully', async ({ page }) => {
    // Intercept backend call
    await page.route('**/api/contact', async (route) => {
      const request = route.request();
      const body = request.postDataJSON();
      expect(body).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
        message: expect.any(String),
      });
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/ru/contact');

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    // Fill fields
    await form.locator('input[type="text"]').fill('Ксения Тест');
    await form.locator('input[type="email"]').fill('test@example.com');
    await form.locator('textarea').fill('Хочу организовать корпоративный выезд в Египет');

    // Required consent checkboxes
    await page.locator('#data-consent').check();
    await page.locator('#offer-consent').check();

    // Submit
    await form.getByRole('button', { name: /отправить/i }).click();

    // Success screen
    await expect(page.getByText(/заявка отправлена/i)).toBeVisible({ timeout: 5000 });
  });

  test('shows error state when backend returns 500', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      })
    );

    await page.goto('/ru/contact');
    const form = page.locator('form').first();
    await form.locator('input[type="text"]').fill('Test');
    await form.locator('input[type="email"]').fill('test@example.com');
    await form.locator('textarea').fill('Test message');
    await page.locator('#data-consent').check();
    await page.locator('#offer-consent').check();
    await form.getByRole('button', { name: /отправить/i }).click();

    // Error message should appear, success screen should NOT
    await expect(page.getByText(/заявка отправлена/i)).toBeHidden();
  });

  test('cannot submit without required consent checkboxes (HTML5 validation)', async ({ page }) => {
    let requestMade = false;
    await page.route('**/api/contact', async (route) => {
      requestMade = true;
      await route.fulfill({ status: 200, body: '{}' });
    });

    await page.goto('/ru/contact');
    const form = page.locator('form').first();
    await form.locator('input[type="text"]').fill('Test');
    await form.locator('input[type="email"]').fill('test@example.com');
    await form.locator('textarea').fill('Test');
    // Intentionally skip required checkboxes
    await form.getByRole('button', { name: /отправить/i }).click();

    // Give it a moment — request should not happen due to HTML5 required
    await page.waitForTimeout(500);
    expect(requestMade).toBe(false);
  });
});
