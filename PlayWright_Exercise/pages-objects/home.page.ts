import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly signupButton: Locator;
    readonly alldepartment: Locator;
    readonly electronic: Locator;
    readonly closeButton: Locator;
    readonly cart: Locator;
    readonly checkoutButton: Locator;
    readonly home: Locator;
    readonly aboutUs: Locator;
    readonly shop: Locator;
    readonly myAccount: Locator;

    constructor(private page: Page) {
        this.signupButton = page.getByRole('link', { name: 'Log in / Sign up' });
        this.alldepartment = page.getByText("All departments");
        this.electronic = page.getByRole('link', { name: ' Electronic Components &' });
        this.closeButton = page.getByRole("button", { name: "Close" });
        //this.cart = page.getByRole('link', { name: '1 $' });
        this.cart = page.getByRole('link', { name: /\d\s\$/ });
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
        this.home = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Home' });
        this.aboutUs = page.locator('#menu-main-menu-1').getByRole('link', { name: 'About Us' });
        this.shop = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Shop' });
        this.myAccount = page.getByRole('link', { name: 'thuyen.do' });
    }

    async navigate() {
        await this.page.goto('/');
        await this.closeButton.click();
        await expect(this.signupButton).toBeVisible({ timeout: 10000 });
    }

    async selectItemInNavigation(item: string) {
        const items = item.split('/');
        const counts = items.length;

        await this.alldepartment.click();
        await this.alldepartment.waitFor();
        await this.alldepartment.click();

        for (let i = 0; i < counts; i++) {
            await this.page.getByRole('listitem').filter({ hasText: items[i] }).click();
        }
    }

    async openCart() {
        await this.page.waitForLoadState();
        await this.cart.click();
        await this.cart.click();
    }

    async goToPage(item: Locator) {
        await item.click();
    }
}
