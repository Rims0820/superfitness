import { test, expect } from '@playwright/test';

test('verify chat coach ui', async ({ page }) => {
  await page.goto('http://localhost:4173/chat');
  await expect(page.getByLabel('Message to coach')).toBeVisible();
  await page.screenshot({ path: 'verification/screenshots/final_check.png' });
});
