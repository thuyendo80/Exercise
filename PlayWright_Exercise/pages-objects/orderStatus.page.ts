import { expect, Locator, Page } from "@playwright/test";
export class OrderStatusPage {
    readonly bank: Locator;
    readonly accountNumber: Locator;

    constructor(private page: Page) {
        this.bank = page.getByText(/Bank\:/i);
        this.accountNumber = page.getByText('Account number:');
    }
}
