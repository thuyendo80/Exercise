import { test as baseTest } from '@playwright/test';
import { LogInPage } from "../pages-objects/login.page";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingCartPage } from "../pages-objects/shoppingCart.page";
import { ShoppingPage } from '../pages-objects/shopping.page';
import { MyAccountPage } from '../pages-objects/myAccount.page';
import { ProductDetailsPage } from '../pages-objects/productDetails.page';
import { OrderStatusPage } from '../pages-objects/orderStatus.page';
import { CheckOutPage } from '../pages-objects/checkout.page';

type Pages = {
    homePage: HomePage;
    shoppingPage: ShoppingPage;
    shoppingCartPage: ShoppingCartPage;
    myAccountPage: MyAccountPage;
    productDetailsPage: ProductDetailsPage;
    orderStatusPage: OrderStatusPage;
    checkoutPage: CheckOutPage;
};

type MyFixtures = {
    logIn: () => Promise<void>;
    emptyCart: () => Promise<void>;
};

export const test = baseTest.extend<Pages & MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    shoppingPage: async ({ page }, use) => {
        await use(new ShoppingPage(page));
    },

    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },

    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },

    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },

    orderStatusPage: async ({ page }, use) => {
        await use(new OrderStatusPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckOutPage(page));
    },

    logIn: async ({ page }, use) => {
        await use(async () => {
            const logIn = new LogInPage(page);
            const homePage = new HomePage(page);

            await homePage.navigate();

            await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');
        });
    },

    emptyCart: async ({ page }, use) => {
        await use(async () => {
            const homePage = new HomePage(page);
            const shoppingCart = new ShoppingCartPage(page);

            await homePage.openCart();
            await shoppingCart.clearShoppingCart();
        });
    },
});

export { expect } from '@playwright/test';