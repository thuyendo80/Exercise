import { test, expect } from "@playwright/test";
import { LogIn } from "../pages-objects/login.page";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";

test('Verify users can sort items by price', async ({ page }) => {
    const logIn = new LogIn(page);
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);

    await homePage.navigate();

    await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');

    await homePage.goToPage(homePage.shop);

    await shoppingPage.switchView('List');

    await shoppingPage.sortItems('Sort by price: low to high');

    await shoppingPage.verifySortItems('low to high');

    await shoppingPage.sortItems('Sort by price: high to low');

    await shoppingPage.verifySortItems('high to low');
});