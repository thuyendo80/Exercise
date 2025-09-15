import { expect } from "@playwright/test";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";
import { CheckOutPage } from "../pages-objects/checkout.page";
import { OrderStatusPage } from "../pages-objects/orderStatus.page";
import { BillingInfo } from "../pages-objects/checkout.page";
import { ShoppingCartPage } from "../pages-objects/shoppingCart.page";
import { MyAccountPage } from "../pages-objects/myAccount.page";
import { test } from '../fixtures/fixtures';

test('Verify orders appear in order history', async ({ page, logIn, emptyCart }) => {
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const shoppingCart = new ShoppingCartPage(page);
    const checkOutPage = new CheckOutPage(page);
    const orderStatusPage = new OrderStatusPage(page);
    const myAccountPage = new MyAccountPage(page);

    let billInfo1: BillingInfo = {
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

    let billInfo2: BillingInfo = {
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
    await shoppingCart.proceedToCheckout();
    await checkOutPage.fillBillingDetails(billInfo1);
    const orderNumber1: string = await checkOutPage.getOrderNumber();

    //Order2
    await homePage.goToPage(homePage.shop);
    await shoppingPage.addToCart(billInfo2.items);
    await homePage.openCart();
    await shoppingCart.proceedToCheckout();
    await checkOutPage.fillBillingDetails(billInfo2);
    const orderNumber2: string = await checkOutPage.getOrderNumber();

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