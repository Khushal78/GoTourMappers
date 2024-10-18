import {test, expect} from '@playwright/test';
import path from 'path';

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

test("should allow the user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`)
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("This is the description of the Hotel");
    await page.locator('[name="pricePerNight"]').fill("1001");
    await page.selectOption('select[name="starRating"]',"3")

    await page.getByText("Budget").click();

    await page.getByLabel("Free WiFi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name = "imageFiles"]',[
        path.join(__dirname, 'files', 'Deltin-Suites.jpeg'),
        path.join(__dirname, 'files', 'sub_album_pic6420200425.2131.jpeg'),
    ]);

    await page.getByRole("button",{name:"Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
})

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);
  
    await expect(page.getByText("Dublin Getaways")).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
    await expect(page.getByText("Dublin,Ireland")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("$1190 per night")).toBeVisible();
    await expect(page.getByText("2 adults,3 children")).toBeVisible();
    await expect(page.getByText("2 Star Rating")).toBeVisible();
  
    await expect(
      page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  });

  test("should edit hotel", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);
  
    await page.getByRole("link", { name: "View Details" }).first().click();
  
    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue("LaCasaVilla");
    await page.locator('[name="name"]').fill("La Dallas");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel updated successfully")).toBeVisible();
  
    await page.reload();
    await expect(page.locator('[name="name"]')).toHaveValue("La Dallas");
    await page.locator('[name="name"]').fill("LaCasaVilla");
    await page.getByRole("button", { name: "Save" }).click();

  });  


