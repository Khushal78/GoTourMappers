import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async({page}) => {
    await page.goto(UI_URL);
   
//get the sign in button
  await page.getByRole("link",{name:"Sign in"}).click(); 
  
  await expect(page.getByRole("heading",{name:"Sign in"})).toBeVisible();

  await page.locator("[name='email']").fill("k@k.com");
  await page.locator("[name='password']").fill("kkkkkk");

  await page.getByRole("button", {name:"Login"}).click();

  await expect(page.getByText("Sign in Successfull!")).toBeVisible();
});

test("should show hotel search results" ,async({page})=>{
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Jaipur");
    await page.getByRole("button",{name:"Search"}).click();

    await expect(page.getByText("Hotels found in Jaipur")).toBeVisible();
    await expect(page.getByText("Hyatt Regency")).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Jaipur");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Hyatt Regency").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Dalhousie");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Snow Valley Resorts").click();
  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("Total Cost:  £6000.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link", { name: "MyBookings" }).click();
  await expect(page.getByText("Snow Valley Resorts")).toBeVisible();
});