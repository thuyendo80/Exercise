import { test, expect } from '../fixtures/fixtures';

test('Verify users can clear the cart',
    async ({
        page,
        homePage,
        shoppingPage,
        logIn,
        emptyCart,
    }) => {
        const items = ['Bose SoundLink Mini', 'Robotic Arm Edge', 'iPad Air 2'];

        await logIn();

        await homePage.goToPage(homePage.shop);

        await shoppingPage.addToCart(items);

        await homePage.openCart();

        await emptyCart();

        await expect(page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY' })).toBeVisible();
    });