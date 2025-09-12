import { expect, Locator, Page } from "@playwright/test";
export class OrderStatusPage {
    readonly bank: Locator;
    readonly accountNumber: Locator;

    constructor(private page: Page) {
        this.bank = page.getByText(/Bank\:/i);
        this.accountNumber = page.getByText('Account number:');
    }

    async verifyOrderStatus() {
        await expect(this.page.getByText('Thank you. Your order has been received.')).toBeVisible({ timeout: 20000 });
        await expect(this.page.getByText('Citi Bank')).toBeVisible();
        await expect(this.page.getByText('1234567890')).toBeVisible();
        await expect(this.page.getByRole('row').filter({ hasText: 'Canon i-SENSYS LBP6030W' })).toBeVisible();
    }
}
