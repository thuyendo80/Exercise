import { test, expect } from "@playwright/test"
import { HomePage } from "../pages-objects/home.page"
import { ShoppingPage } from "../pages-objects/shopping.page"
import { CheckOutPage } from "../pages-objects/checkout.page"
import { OrderStatusPage } from "../pages-objects/orderStatus.page"

test("Verify users can buy an item successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const checkOutPage = new CheckOutPage(page);
    const orderStatusPage = new OrderStatusPage(page);

    let billInfo: BillingInfo = {
        firstname: 'Thuyen',
        lastname: 'Do',
        country: 'Vietnam',
        address: '123 Ly Thuong Kiet',
        city: 'Ho Chi Minh',
        email: 'thuyen.do@email.com',
        phone: '0919123456',
    }

    await homePage.navigate();

    await homePage.selectItemInNavigation('Electronic Components \& Supplies');

    await shoppingPage.switchView('Grid');
    await expect(shoppingPage.gridviewSwitch).toHaveAttribute('class', /.*active/);

    await shoppingPage.switchView('List');
    await expect(shoppingPage.listviewSwitch).toHaveAttribute('class', /.*active/);

    await shoppingPage.addToCart('Canon i-SENSYS LBP6030W');

    await homePage.openCart();

    await expect(shoppingPage.itemRow.filter({ hasText: 'Canon i-SENSYS LBP6030W' })).toBeVisible();

    await checkOutPage.proceedToCheckout();

    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');

    await checkOutPage.fillBillingDetails(billInfo);

    await orderStatusPage.verifyOrderStatus();
});