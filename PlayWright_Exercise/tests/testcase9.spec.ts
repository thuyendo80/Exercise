import { test, expect } from '../fixtures/fixtures';

test('Verify users can update quantity of product in cart',
    async ({
        homePage,
        shoppingPage,
        shoppingCartPage,
        logIn,
        emptyCart,
    }) => {
        const items = ['AirPods'];

        await logIn();

        await emptyCart();

        await homePage.goToPage(homePage.shop);

        await shoppingPage.addToCart(items);

        await homePage.openCart();

        await shoppingCartPage.verifyItemDetails(items[0], '1');

        await shoppingCartPage.clickPlusQuanity(items[0]);

        await shoppingCartPage.verifyItemDetails(items[0], '2');

        await shoppingCartPage.enterQuanity(items[0], '4');

        await shoppingCartPage.verifyItemDetails(items[0], '4', '$1,160.00');

        await shoppingCartPage.clickMinusQuanity(items[0]);

        await shoppingCartPage.verifyItemDetails(items[0], '3', '$870.00');

    });