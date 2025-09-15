import { expect } from "@playwright/test";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";
import { CheckOutPage } from "../pages-objects/checkout.page";
import { OrderStatusPage } from "../pages-objects/orderStatus.page";
import { ShoppingCartPage } from "../pages-objects/shoppingCart.page";
import { test } from '../fixtures/fixtures';

test('Verify users can clear the cart', async ({ page, logIn }) => {
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const shoppingCart = new ShoppingCartPage(page);
    const checkOutPage = new CheckOutPage(page);
    const orderStatusPage = new OrderStatusPage(page);

    const items = ['Bose SoundLink Mini', 'Robotic Arm Edge', 'iPad Air 2'];

    await logIn();

    await homePage.goToPage(homePage.shop);

    await shoppingPage.addToCart(items);

    await homePage.openCart();

    await shoppingCart.clearShoppingCart();

    await expect(page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY' })).toBeVisible();
});