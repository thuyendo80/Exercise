import { expect, Locator, Page } from "@playwright/test";
import { ref } from "process";
export class ShoppingPage {
    readonly gridviewSwitch: Locator;
    readonly listviewSwitch: Locator;
    //readonly listview: Locator;
    readonly itemTable: Locator;
    readonly itemRow: Locator;

    constructor(private page: Page) {
        this.gridviewSwitch = page.locator('.switch-grid');
        this.listviewSwitch = page.locator('.switch-list');
        //this.listview = page.getByRole('link', { name: ' List' })

        this.itemTable = page.getByRole('table');
        this.itemRow = this.itemTable.getByRole('row');
    }

    async switchView(view: string) {
        console.log(view);
        if (view === 'Grid') {
            this.gridviewSwitch.click();
        } else {
            this.listviewSwitch.click();
        }
    }

    async addToCart(item: string) {
        let regex: RegExp = new RegExp('Add.*' + item);
        await this.page.getByRole('link', { name: regex }).nth(1).click();
    }
}

