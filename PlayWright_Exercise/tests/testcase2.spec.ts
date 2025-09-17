import { test, expect } from '../fixtures/fixtures';
import { BillingInfo } from "../pages-objects/checkout.page";

test("Verify users can buy multiple item successfully",
    async ({
        homePage,
        shoppingPage,
        checkoutPage,
        orderStatusPage,
        shoppingCartPage,
        logIn,
        emptyCart,
    }) => {
        const billInfo: BillingInfo = {
            firstname: 'Thuyen',
            lastname: 'Do',
            country: 'Vietnam',
            address: '123 Ly Thuong Kiet',
            city: 'Ho Chi Minh',
            email: 'thuyen.do@email.com',
            phone: '0919123456',
            items: ['AirPods', 'Beats Solo3 Wireless On-Ear'],
            paymentMethod: 'Direct bank transfer',
        };

        await logIn();

        await emptyCart();

        await homePage.goToPage(homePage.shop);

        await shoppingPage.addToCart(billInfo.items);

        await homePage.openCart();

        await shoppingCartPage.verifyShoppingCart(billInfo.items);

        await shoppingCartPage.proceedToCheckout();

        await checkoutPage.fillBillingDetails(billInfo);

        await orderStatusPage.verifyOrderStatus(billInfo);

    });