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
        await this.page.getByText('Shopping cart Checkout Order').waitFor({ state: 'visible' });
        const removeButtons = await this.itemTable.getByRole('link', { name: 'Remove' }).all();
        const buttonCounts = removeButtons.length;

        for (const remove of removeButtons.reverse()) {
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
            await expect(this.itemRow.filter({ hasText: item }).getByRole('spinbutton', { name: item + ' quantity' })).toHaveValue(quantity);
        }

        if (subTotal) {
            await expect(this.itemRow.filter({ hasText: item }).getByRole('cell', { name: '$' }).nth(1)).toHaveText(subTotal, { timeout: 15000 });
        }
    }

    async clickMinusQuanity(item: string) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.itemRow.filter({ hasText: item }).locator('span.minus').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickPlusQuanity(item: string) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.itemRow.filter({ hasText: item }).locator('span.plus').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterQuanity(item: string, quantity: string) {
        const qtyTextbox = this.itemRow.filter({ hasText: item }).getByRole('spinbutton', { name: item + ' quantity' });
        await qtyTextbox.fill(quantity);
    }
}