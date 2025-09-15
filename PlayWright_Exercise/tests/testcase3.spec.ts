import { test, expect } from '../fixtures/fixtures';
import { BillingInfo } from "../pages-objects/checkout.page";

test('Verify users can buy an item using different payment methods (all payment methods)',
    async ({
        homePage,
        shoppingPage,
        checkoutPage,
        orderStatusPage,
        shoppingCartPage,
        logIn,
        emptyCart,
    }) => {
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