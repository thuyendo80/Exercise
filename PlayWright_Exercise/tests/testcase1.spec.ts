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

    await homePage.navigate();
    await homePage.alldepartment.click();
    await homePage.alldepartment.click();

    await homePage.electronic.click();

    await shoppingPage.switchView('Grid');
    await expect(shoppingPage.gridviewSwitch).toHaveAttribute('class', /.*active/);

    await shoppingPage.switchView('List');
    await expect(shoppingPage.listviewSwitch).toHaveAttribute('class', /.*active/);

    await shoppingPage.addToCart('Canon i-SENSYS LBP6030W');

    await homePage.cart.click();

    await expect(shoppingPage.itemRow.filter({ hasText: 'Canon i-SENSYS LBP6030W' })).toBeVisible();

    await checkOutPage.proceedToCheckOut.click();

    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');

    await checkOutPage.fillBilligDetails('Thuyen', 'Do', 'Vietnam', '123 Ly Thuong Kiet', 'Ho Chi Minh', 'thuyen.do@email.com', '091912346')

    await expect(page.getByText('Thank you. Your order has been received.')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Citi Bank')).toBeVisible();
    await expect(page.getByText('1234567890')).toBeVisible();
    await expect(page.getByRole('row').filter({ hasText: 'Canon i-SENSYS LBP6030W' })).toBeVisible();
});