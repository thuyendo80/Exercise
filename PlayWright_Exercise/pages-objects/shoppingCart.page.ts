import { expect, Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
    readonly proceedToCheckOut: Locator;
    readonly itemTable: Locator;
    readonly itemRow: Locator;

    constructor(private page: Page) {
        this.proceedToCheckOut = page.getByRole('link', { name: 'Proceed to checkout' });
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

    async verifyShoppingCart(item: string[]) {
        const itemCount = item.length;

        for (let i = 0; i < itemCount; i++) {
            await expect(this.itemRow.filter({ hasText: item[i] })).toBeVisible();
        }
    }

    async verifyItemDetails(item: string, quantity?: string, subTotal?: string) {
        if (quantity) {
            //const qtyTextbox = this.itemRow.filter({ hasText: item }).getByRole('spinbutton', { name: item + ' quantity' });
            //const qty = await qtyTextbox.inputValue();
            await expect(this.itemRow.filter({ hasText: item }).getByRole('spinbutton', { name: item + ' quantity' })).toHaveValue(quantity);
            //expect(qty).toEqual(quantity);
        }

        if (subTotal) {
            await expect(this.itemRow.filter({ hasText: item }).getByRole('cell', { name: '$' }).nth(1)).toHaveText(subTotal, { timeout: 10000 });
        }
    }

    async clickMinusQuanity(item: string) {
        await this.page.waitForLoadState();
        await this.itemRow.filter({ hasText: item }).locator('span.minus').click();
        await this.page.waitForLoadState();
    }

    async clickPlusQuanity(item: string) {
        await this.page.waitForLoadState();
        await this.itemRow.filter({ hasText: item }).locator('span.plus').click();
        await this.page.waitForLoadState();
    }

    async enterQuanity(item: string, quantity: string) {
        const qtyTextbox = this.itemRow.filter({ hasText: item }).getByRole('spinbutton', { name: item + ' quantity' });
        await qtyTextbox.fill(quantity);
    }
}