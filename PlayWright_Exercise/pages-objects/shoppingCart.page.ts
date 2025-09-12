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
        const counts = this.itemTable.getByRole('row').count;

        for (let i = +counts; i > 0; i--) {
            await this.itemTable.getByRole('row').nth(i).getByRole('link', { name: 'Remove' }).click();
        }
    }
}