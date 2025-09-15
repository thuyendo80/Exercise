import { expect } from "@playwright/test";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";
import { test } from '../fixtures/fixtures';

test('Verify users can sort items by price', async ({ page, logIn }) => {
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);

    await logIn();

    await homePage.goToPage(homePage.shop);

    await shoppingPage.switchView('List');

    await shoppingPage.sortItems('Sort by price: low to high');

    await shoppingPage.verifySortItems('low to high');

    await shoppingPage.sortItems('Sort by price: high to low');

    await shoppingPage.verifySortItems('high to low');
});