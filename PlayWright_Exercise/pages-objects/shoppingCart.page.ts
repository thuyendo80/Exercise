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
        await expect(this.page.getByText('Shopping cart Checkout Order')).toBeVisible();
        const removeButtons = await this.itemTable.getByRole('link', { name: 'Remove' }).all();
        const buttonCounts = removeButtons.length;

        for (let i = buttonCounts - 1; i >= 0; i--) {
            const remove = removeButtons[i];
            await remove.click();
        }
    }
}