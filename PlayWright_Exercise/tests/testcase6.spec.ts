import { test, expect } from '../fixtures/fixtures';
import { BillingInfo } from "../pages-objects/checkout.page";

test('Verify users try to buy an item without logging in (As a guest)',
    async ({
        homePage,
        shoppingPage,
        shoppingCartPage,
        orderStatusPage,
        checkoutPage,
    }) => {
        let billInfo: BillingInfo = {
            firstname: 'Thuyen',
            lastname: 'Do',
            country: 'Vietnam',
            address: '123 Ly Thuong Kiet',
            city: 'Ho Chi Minh',
            email: 'thuyen.do@email.com',
            phone: '0919123456',
            items: ['Robotic Arm Edge'],
            paymentMethod: 'Check payments',
        };

        await homePage.navigate();

        await homePage.goToPage(homePage.shop);

        await shoppingPage.addToCart(billInfo.items);

        await homePage.openCart();

        await shoppingCartPage.verifyShoppingCart(billInfo.items);

        await shoppingCartPage.proceedToCheckout();

        await checkoutPage.fillBillingDetails(billInfo);

        await orderStatusPage.verifyOrderStatus(billInfo);

    });