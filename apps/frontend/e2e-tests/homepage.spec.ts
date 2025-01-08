import { test, expect, Page } from "@playwright/test";

test("homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("My inventory");
});
