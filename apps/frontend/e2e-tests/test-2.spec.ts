import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('enter email or username').click();
  await page.getByPlaceholder('enter email or username').fill('denniskinuthisw@gmail.com');
  await page.getByPlaceholder('enter password').click();
  await page.getByPlaceholder('enter password').fill('password');
  await page.getByLabel('Show password').check();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByText('Sign inemail or usernamepasswordShow passwordSign inDon\'t have an account?Sign').click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();
});
