import { expect, Locator, Page } from "@playwright/test";
import { SortCategory } from '../type/enum';

export class ShoppingPage {
    readonly gridviewSwitch: Locator;
    readonly listviewSwitch: Locator;
    readonly sortCombobox: Locator;

    constructor(private page: Page) {
        this.gridviewSwitch = page.locator('.switch-grid');
        this.listviewSwitch = page.locator('.switch-list');
        this.sortCombobox = page.getByRole('combobox', { name: 'Shop order' });
    };

    async switchView(view: 'Grid' | 'List') {
        if (view === 'Grid') {
            await this.page.waitForLoadState('domcontentloaded');
            await this.gridviewSwitch.click();
            await this.page.waitForURL(/view_mode=grid/);
        } else {
            await this.page.waitForLoadState('domcontentloaded');
            await this.listviewSwitch.click();
            await this.page.waitForURL(/view_mode=list/);
        };
    };

    async verifyViewSwitched(view: 'Grid' | 'List') {
        if (view === 'Grid') {
            await expect(this.gridviewSwitch).toHaveAttribute('class', /.*active/);
        } else {
            await expect(this.listviewSwitch).toHaveAttribute('class', /.*active/);
        };
    };

    async addToCart(item: string[]) {
        const itemCount = item.length;

        for (let i = 0; i < itemCount; i++) {
            let regex: RegExp = new RegExp('Add.*' + item[i]);
            await this.page.getByRole('link', { name: regex }).nth(1).click();
        };
    };

    async sortItems(sortCategory: SortCategory) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.sortCombobox.selectOption(sortCategory);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForURL(/orderby/);

        switch (sortCategory) {
            case SortCategory.PRICE:
                await this.page.waitForURL(/orderby=price/);
                break;
            case SortCategory.PRICEDESC:
                await this.page.waitForURL(/orderby=price-desc/);
                break;
        }
    };

    async verifySortItems(sortCategory: SortCategory) {
        await this.page.waitForLoadState('domcontentloaded');
        const priceValues = await this.page.locator('span.price').all();
        const priceCounts = priceValues.length;

        for (let i = 0; i < priceCounts - 1; i++) {
            const currentPrice: string = await priceValues[i].innerText();
            const temp1 = currentPrice.split(' ');
            const price1: number = +temp1[temp1.length - 1].substring(1).replace(',', '');

            const nextPrice: string = await priceValues[i + 1].innerText();
            const temp2 = nextPrice.split(' ');
            const price2: number = +temp2[temp2.length - 1].substring(1).replace(',', '');

            switch (sortCategory) {
                case SortCategory.PRICE:
                    expect(price1).toBeLessThanOrEqual(price2);
                    break;
                case SortCategory.PRICEDESC:
                    expect(price1).toBeGreaterThanOrEqual(price2);
                    break;
            };
        };
    };

    async selectProduct(item: string) {
        await this.page.getByRole('link', { name: item, exact: true }).click();
    };
};

