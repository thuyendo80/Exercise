import { expect } from "@playwright/test";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";
import { ShoppingCartPage } from "../pages-objects/shoppingCart.page";
import { test } from '../fixtures/fixtures';

test('Verify users can update quantity of product in cart', async ({ page, logIn, emptyCart }) => {
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const shoppingCart = new ShoppingCartPage(page);

    const items = ['AirPods'];

    await logIn();

    await emptyCart();

    await homePage.goToPage(homePage.shop);

    await shoppingPage.addToCart(items);

    await homePage.openCart();

    await shoppingCart.verifyItemDetails(items[0], '1');

    await shoppingCart.clickPlusQuanity(items[0]);

    await shoppingCart.verifyItemDetails(items[0], '2');

    await shoppingCart.enterQuanity(items[0], '4');

    await shoppingCart.verifyItemDetails(items[0], '4', '$1,160.00');

    await shoppingCart.clickMinusQuanity(items[0]);

    await shoppingCart.verifyItemDetails(items[0], '3', '$870.00');

});