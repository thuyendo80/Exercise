import { test as baseTest } from '@playwright/test';
import { LogInPage } from "../pages-objects/login.page";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingCartPage } from "../pages-objects/shoppingCart.page";
/*
type MyFixtures = {
    loggedInPage: Page;
};

export const test = baseTest.extend<MyFixtures>({
    loggedInPage: async ({ page }, use) => {
        const logIn = new LogIn(page);
        const homePage = new HomePage(page);

        await homePage.navigate();

        await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');

        await use(page);
    },
});
*/
type MyFixtures = {
    logIn: () => Promise<void>;
    emptyCart: () => Promise<void>;
};

export const test = baseTest.extend<MyFixtures>({
    logIn: async ({ page }, use) => {
        await use(async () => {
            const logIn = new LogInPage(page);
            const homePage = new HomePage(page);

            await homePage.navigate();

            await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');
            //await use('thuyen.do');
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
