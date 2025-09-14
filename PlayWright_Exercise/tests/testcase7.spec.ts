import { test, expect } from "@playwright/test";
import { LogIn } from "../pages-objects/login.page";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";
import { CheckOutPage } from "../pages-objects/checkout.page";
import { ShoppingCartPage } from "../pages-objects/shoppingCart.page";
import { BillingInfo } from "../pages-objects/checkout.page";
import { MandatoryFields } from "../pages-objects/checkout.page";

test('Ensure proper error handling when mandatory fields are blank', async ({ page }) => {
    const logIn = new LogIn(page);
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const shoppingCart = new ShoppingCartPage(page);
    const checkOutPage = new CheckOutPage(page);

    let billInfo: BillingInfo = {
        firstname: 'Thuyen',
        lastname: 'Do',
        country: 'Vietnam',
        city: 'Ho Chi Minh',
        email: 'thuyen.do@email.com',
        items: ['AirPods', 'Beats Solo3 Wireless On-Ear'],
        paymentMethod: 'Cash on delivery',
    };

    let mandatoryfields: MandatoryFields = {
        address: 'check',
        phone: 'check',
    };

    await homePage.navigate();

    await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');

    await homePage.goToPage(homePage.shop);

    await shoppingPage.addToCart(billInfo.items);

    await homePage.openCart();

    await shoppingCart.proceedToCheckout();

    await checkOutPage.fillBillingDetails(billInfo);

    await checkOutPage.verifyMandatoryField(mandatoryfields);

});