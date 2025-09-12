import { test, expect } from "@playwright/test"
import { LogIn } from "../pages-objects/login.page"
import { HomePage } from "../pages-objects/home.page"
import { ShoppingPage } from "../pages-objects/shopping.page"
import { CheckOutPage } from "../pages-objects/checkout.page"
import { OrderStatusPage } from "../pages-objects/orderStatus.page"
import { BillingInfo } from "../pages-objects/checkout.page"
import { ShoppingCart } from "../pages-objects/shoppingCart.page"

test("Verify users can buy multiple item successfully", async ({ page }) => {
    const logIn = new LogIn(page);
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const shoppingCart = new ShoppingCart(page);
    const checkOutPage = new CheckOutPage(page);
    const orderStatusPage = new OrderStatusPage(page);

    let billInfo: BillingInfo = {
        firstname: 'Thuyen',
        lastname: 'Do',
        country: 'Vietnam',
        address: '123 Ly Thuong Kiet',
        city: 'Ho Chi Minh',
        email: 'thuyen.do@email.com',
        phone: '0919123456',
        items: ['AirPods', 'Beats Solo3 Wireless On-Ear'],
    }

    await homePage.navigate();

    await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');

    await homePage.openCart();

    await shoppingCart.clearShoppingCart();

    await homePage.goToPage(homePage.shop);

    await shoppingPage.addToCart('AirPods');
    await shoppingPage.addToCart('Beats Solo3 Wireless On-Ear');

    await homePage.openCart();

    await expect(shoppingCart.itemRow.filter({ hasText: 'AirPods' })).toBeVisible();
    await expect(shoppingCart.itemRow.filter({ hasText: 'Beats Solo3 Wireless On-Ear' })).toBeVisible();

    await shoppingCart.proceedToCheckout();

    await checkOutPage.fillBillingDetails(billInfo);

    await orderStatusPage.verifyOrderStatus(billInfo);

});