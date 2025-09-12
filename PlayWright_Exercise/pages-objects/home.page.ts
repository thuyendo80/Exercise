import { expect, Locator, Page } from "@playwright/test";
export class HomePage {
    readonly alldepartment: Locator;
    readonly electronic: Locator;
    readonly closeButton: Locator;
    readonly cart: Locator;
    readonly checkoutButton: Locator;

    constructor(private page: Page) {
        this.alldepartment = page.getByText("All departments");
        this.electronic = page.getByRole('link', { name: ' Electronic Components &' });
        this.closeButton = page.getByRole("button", { name: "Close" });
        this.cart = page.getByRole('link', { name: '1 $' });
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
    }

    async navigate() {
        await this.page.goto('/');
        await this.closeButton.click();
    }

    async selectItemInNavigation(item: string) {
        const items = item.split('/');
        const counts = items.length;

        await this.alldepartment.click();
        await this.alldepartment.click();

        for (let i = 0; i < counts; i++) {
            let regex: RegExp = new RegExp(items[i]);
            await this.page.getByRole('link', { name: regex }).click();
        }
    }

    async openCart() {
        await this.cart.click();
    }
}
