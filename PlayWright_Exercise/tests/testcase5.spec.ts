import { test, expect } from "@playwright/test";
import { LogIn } from "../pages-objects/login.page";
import { HomePage } from "../pages-objects/home.page";
import { MyAccountPage } from "../pages-objects/myAccount.page";

test('Verify orders appear in order history', async ({ page }) => {
    const logIn = new LogIn(page);
    const homePage = new HomePage(page);
    const myAccountPage = new MyAccountPage(page);

    const orderNumber: string = '#14513';
    const items = ['AirPods', 'Beats Solo3 Wireless On-Ear'];

    await homePage.navigate();

    await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');

    await myAccountPage.selectItemInNavigation(myAccountPage.orders);

    await myAccountPage.verifyOrderHistory(orderNumber);

    await myAccountPage.viewOrderDetails(orderNumber);

    await myAccountPage.verifyOrderDetails(orderNumber, items);
});