import { expect, Locator, Page } from "@playwright/test";

export class MyAccountPage {
    readonly dashboard: Locator;
    readonly orders: Locator;
    readonly subcriptions: Locator;
    readonly downloads: Locator;
    readonly addresses: Locator;
    readonly accountDetails: Locator;
    readonly logout: Locator;
    readonly ordersHistory: Locator;
    readonly orderDetailsTable: Locator;

    constructor(private page: Page) {
        this.dashboard = page.getByRole('link', { name: ' Dashboard' });
        this.orders = page.getByRole('link', { name: ' Orders' });
        this.subcriptions = page.getByRole('link', { name: ' Subcriptions' });
        this.downloads = page.getByRole('link', { name: ' Downloads' });
        this.addresses = page.getByRole('link', { name: ' Addresses' });
        this.accountDetails = page.getByRole('link', { name: ' Accoount details' });
        this.logout = page.getByRole('link', { name: ' Logout' });
        this.ordersHistory = page.getByRole('table');
        this.orderDetailsTable = page.getByRole('table').filter({ hasText: 'Product' }).filter({ hasText: 'Total' });
    }

    async selectItemInNavigation(item: Locator) {
        await item.click();
    }

    async verifyOrderHistory(number: string,) {
        await expect(this.ordersHistory.getByRole('row').filter({ hasText: number })).toBeVisible();
    }

    async viewOrderDetails(number: string,) {
        await this.ordersHistory.getByRole('row').filter({ hasText: number }).getByRole('link', { name: 'VIEW' }).click();
    }

    async verifyOrderDetails(number: string, item: string[]) {
        await expect(this.page.getByText('Order ' + number)).toBeVisible();
        const itemCount = item.length;

        for (let i = 0; i < itemCount; i++) {
            await expect(this.orderDetailsTable.getByRole('row').filter({ hasText: item[i] })).toBeVisible();
        }
    }
}