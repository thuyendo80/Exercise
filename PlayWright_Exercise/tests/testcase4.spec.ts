import { test, expect } from '../fixtures/fixtures';
import { SortCategory } from '../type/enum';

test('Verify users can sort items by price',
    async ({
        page,
        homePage,
        shoppingPage,
        logIn,
    }) => {
        await logIn();

        await homePage.goToPage(homePage.shop);

        await shoppingPage.switchView('List');

        await shoppingPage.sortItems(SortCategory.PRICE);

        await shoppingPage.verifySortItems(SortCategory.PRICE);

        await shoppingPage.sortItems(SortCategory.PRICEDESC);

        await shoppingPage.verifySortItems(SortCategory.PRICEDESC);
    });