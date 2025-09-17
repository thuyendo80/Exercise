import { test, expect } from '../fixtures/fixtures';
import { BillingInfo } from "../pages-objects/checkout.page";

test('Verify orders appear in order history',
    async ({
        homePage,
        shoppingPage,
        checkoutPage,
        shoppingCartPage,
        myAccountPage,
        logIn,
        emptyCart,
    }) => {
        const billInfo1: BillingInfo = {
            firstname: 'Thuyen',
            lastname: 'Do',
            country: 'Vietnam',
            address: '123 Ly Thuong Kiet',
            city: 'Ho Chi Minh',
            email: 'thuyen.do@email.com',
            phone: '0919123456',
            items: ['AirPods', 'Beats Solo3 Wireless On-Ear'],
            paymentMethod: 'Check payments',
        };

        const billInfo2: BillingInfo = {
            firstname: 'aa',
            lastname: 'bbb',
            country: 'Vietnam',
            address: '123 Ly Thuong Kiet',
            city: 'Ho Chi Minh',
            email: 'a.do@email.com',
            phone: '0919123456',
            items: ['AirPods'],
            paymentMethod: 'Cash on delivery',
        };

        await logIn();

        await emptyCart();

        //Order1
        await homePage.goToPage(homePage.shop);
        await shoppingPage.addToCart(billInfo1.items);
        await homePage.openCart();
        await shoppingCartPage.proceedToCheckout();
        await checkoutPage.fillBillingDetails(billInfo1);
        const orderNumber1: string = await checkoutPage.getOrderNumber();

        //Order2
        await homePage.goToPage(homePage.shop);
        await shoppingPage.addToCart(billInfo2.items);
        await homePage.openCart();
        await shoppingCartPage.proceedToCheckout();
        await checkoutPage.fillBillingDetails(billInfo2);
        const orderNumber2: string = await checkoutPage.getOrderNumber();

        await homePage.goToPage(homePage.myAccount);

        await myAccountPage.selectItemInNavigation(myAccountPage.orders);

        await myAccountPage.verifyOrderHistory(orderNumber1);
        await myAccountPage.verifyOrderHistory(orderNumber2);

        await myAccountPage.viewOrderDetails(orderNumber1);
        await myAccountPage.verifyOrderDetails(orderNumber1, billInfo1.items);

        await myAccountPage.selectItemInNavigation(myAccountPage.orders);

        await myAccountPage.viewOrderDetails(orderNumber2);
        await myAccountPage.verifyOrderDetails(orderNumber2, billInfo2.items);
    });