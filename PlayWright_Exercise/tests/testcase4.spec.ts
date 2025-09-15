import { test, expect } from '../fixtures/fixtures';

test('Verify users can sort items by price',
    async ({
        homePage,
        shoppingPage,
        logIn,
    }) => {
        await logIn();

        await homePage.goToPage(homePage.shop);

        await shoppingPage.switchView('List');

        await shoppingPage.sortItems('Sort by price: low to high');

        await shoppingPage.verifySortItems('low to high');

        await shoppingPage.sortItems('Sort by price: high to low');

        await shoppingPage.verifySortItems('high to low');
    });