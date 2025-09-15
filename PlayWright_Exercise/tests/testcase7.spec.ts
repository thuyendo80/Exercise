import { test, expect } from '../fixtures/fixtures';
import { BillingInfo } from "../pages-objects/checkout.page";
import { MandatoryFields } from "../pages-objects/checkout.page";

test('Ensure proper error handling when mandatory fields are blank',
    async ({
        homePage,
        shoppingCartPage,
        shoppingPage,
        checkoutPage,
        logIn,
    }) => {
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

        await logIn();

        await homePage.goToPage(homePage.shop);

        await shoppingPage.addToCart(billInfo.items);

        await homePage.openCart();

        await shoppingCartPage.proceedToCheckout();

        await checkoutPage.fillBillingDetails(billInfo);

        await checkoutPage.verifyMandatoryField(mandatoryfields);

    });