import { expect, Locator, Page } from "@playwright/test";
import { BillingInfo } from "../pages-objects/checkout.page"

export class OrderStatusPage {
    readonly bank: Locator;
    readonly accountNumber: Locator;

    constructor(private page: Page) {
        this.bank = page.getByText(/Bank\:/i);
        this.accountNumber = page.getByText('Account number:');
    }

    async verifyOrderStatus(billinginfo: BillingInfo) {
        await expect(this.page.getByText('Thank you. Your order has been received.')).toBeVisible({ timeout: 20000 });
        await expect(this.page.getByRole('listitem').filter({ hasText: 'Payment method: ' + billinginfo.paymentMethod })).toBeVisible();
        //await expect(this.page.getByText('Citi Bank')).toBeVisible();
        //await expect(this.page.getByText('1234567890')).toBeVisible();

        const itemCount = billinginfo.items.length;

        for (let i = 0; i < itemCount; i++) {
            await expect(this.page.getByRole('row').filter({ hasText: billinginfo.items[i] })).toBeVisible();
        }
    }
}
