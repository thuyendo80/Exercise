import { test, expect } from '../fixtures/fixtures';
import { BillingInfo } from "../pages-objects/checkout.page";

test("Verify users can buy an item successfully",
    async ({
        page,
        homePage,
        shoppingPage,
        shoppingCartPage,
        checkoutPage,
        orderStatusPage,
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
            items: ['Canon i-SENSYS LBP6030W'],
            paymentMethod: 'Direct bank transfer',
        };

        await logIn();

        await emptyCart();

        await homePage.selectItemInNavigation('Electronic Components & Supplies');

        await shoppingPage.switchView('Grid');
        await shoppingPage.verifyViewSwitched('Grid');

        await shoppingPage.switchView('List');
        await shoppingPage.verifyViewSwitched('List');

        await shoppingPage.addToCart(billInfo.items);

        await homePage.openCart();

        await shoppingCartPage.verifyShoppingCart(billInfo.items);

        await shoppingCartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutPageVisible();

        await checkoutPage.fillBillingDetails(billInfo);

        await orderStatusPage.verifyOrderStatus(billInfo);

    });