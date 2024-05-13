import { test, expect } from "@playwright/test";

const { MAIL, PASSWORD } = process.env;

test.beforeEach(async () => {
  if (!MAIL) {
    throw new Error("Error: mail was not provided");
  }
  if (!PASSWORD) {
    throw new Error("Error: password was not provided");
  }
});

test("auth", async ({ page }) => {
  await page.goto("https://agro-management.itcase.pro/auth/");

  await page.getByTestId("usernameFieldInput").fill(MAIL!);
  await page.getByTestId("passwordFieldInput").fill(PASSWORD!);
  await page.getByTestId("submitButton").click();

  await page.waitForURL("https://agro-management.itcase.pro/");
  await expect(page.getByAltText("qr_code_ios")).toBeVisible();
});
