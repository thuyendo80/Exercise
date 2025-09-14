import { expect, Locator, Page } from "@playwright/test";

export class ShoppingPage {
    readonly gridviewSwitch: Locator;
    readonly listviewSwitch: Locator;
    readonly sortCombobox: Locator;

    constructor(private page: Page) {
        this.gridviewSwitch = page.locator('.switch-grid');
        this.listviewSwitch = page.locator('.switch-list');
        this.sortCombobox = page.getByRole('combobox', { name: 'Shop order' });
    }

    async switchView(view: 'Grid' | 'List') {
        if (view === 'Grid') {
            await this.page.waitForTimeout(2000);
            await this.page.waitForLoadState();
            await this.gridviewSwitch.click();
        } else {
            await this.page.waitForTimeout(2000);
            await this.page.waitForLoadState();
            await this.listviewSwitch.click();
        }
    }

    async addToCart(item: string[]) {
        const itemCount = item.length;

        for (let i = 0; i < itemCount; i++) {
            let regex: RegExp = new RegExp('Add.*' + item[i]);
            await this.page.getByRole('link', { name: regex }).nth(1).click();
        }
    }

    async sortItems(value: string) {
        await this.sortCombobox.selectOption(value);

        //page did not navigate to new url after selectoption. tried dispatchevent('change') but not work
        //have to workaround to navigate to page sorted by
        if (value === 'Sort by price: low to high') {
            await this.page.goto('https://demo.testarchitect.com/shop/?orderby=price');
        } else if (value === 'Sort by price: high to low') {
            await this.page.goto('https://demo.testarchitect.com/shop/?orderby=price-desc');
        }
    }

    async verifySortItems(type: 'low to high' | 'high to low') {
        await this.page.waitForLoadState();
        const priceValues = await this.page.locator('span.price').all();
        const priceCounts = priceValues.length;

        for (let i = 0; i < priceCounts - 1; i++) {
            const currentPrice: string = await priceValues[i].innerText();
            const temp1 = currentPrice.split(' ');
            const price1: number = +temp1[temp1.length - 1].substring(1).replace(',', '');

            const nextPrice: string = await priceValues[i + 1].innerText();
            const temp2 = nextPrice.split(' ');
            const price2: number = +temp2[temp2.length - 1].substring(1).replace(',', '');

            if (type === 'low to high') {
                expect(price1).toBeLessThanOrEqual(price2);
            } else if (type === 'high to low') {
                expect(price1).toBeGreaterThanOrEqual(price2);
            }
        }
    }

    async selectProduct(item: string) {
        await this.page.getByRole('link', { name: item, exact: true }).click();
    }
}

