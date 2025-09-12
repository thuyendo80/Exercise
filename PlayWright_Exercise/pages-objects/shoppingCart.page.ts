import { expect, Locator, Page } from "@playwright/test";
export class ShoppingCart {
    readonly proceedToCheckOut: Locator;
    readonly itemTable: Locator;
    readonly itemRow: Locator;

    constructor(private page: Page) {
        this.proceedToCheckOut = page.getByRole('link', { name: 'Proceed to checkout' });
        //this.itemTable = page.getByRole('table').nth(2);
        this.itemTable = page.getByRole('table').filter({ hasText: 'Product' });
        this.itemRow = page.getByRole('row');
    }

    async proceedToCheckout() {
        await this.proceedToCheckOut.click();
    }

    async clearShoppingCart() {
        await expect(this.page).toHaveTitle(/Cart/);
        await this.page.waitForTimeout(10000);
        const removeButtons = await this.itemTable.getByRole('link', { name: 'Remove' }).all();

        for (const remove of removeButtons) {
            await remove.click();
        }
        //await this.itemTable.getByRole('row').nth(2).getByRole('link', { name: 'Remove' }).click();
    }
}