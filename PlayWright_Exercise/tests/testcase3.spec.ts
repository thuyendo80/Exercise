import { test, expect } from "@playwright/test";
import { LogIn } from "../pages-objects/login.page";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";
import { CheckOutPage } from "../pages-objects/checkout.page";
import { OrderStatusPage } from "../pages-objects/orderStatus.page";
import { BillingInfo } from "../pages-objects/checkout.page";
import { ShoppingCartPage } from "../pages-objects/shoppingCart.page";

test('Verify users can buy an item using different payment methods (all payment methods)', async ({ page }) => {
    const logIn = new LogIn(page);
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const shoppingCart = new ShoppingCartPage(page);
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
        items: ['AirPods'],
        paymentMethod: 'Cash on delivery',
    };

    await homePage.navigate();

    await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');

    await homePage.openCart();

    await shoppingCart.clearShoppingCart();

    await homePage.goToPage(homePage.shop);

    await shoppingPage.addToCart(billInfo.items);

    await homePage.openCart();

    await shoppingCart.verifyShoppingCart(billInfo.items);

    await shoppingCart.proceedToCheckout();

    await checkOutPage.fillBillingDetails(billInfo);

    await orderStatusPage.verifyOrderStatus(billInfo);

});