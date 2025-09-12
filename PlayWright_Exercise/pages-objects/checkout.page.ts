import { expect, Locator, Page } from "@playwright/test";

export interface BillingInfo {
    firstname: string;
    lastname: string;
    country: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    items: string[];
    zipcode?: string;
    company?: string;
    apartment?: string;
    notes?: string;
}

export class CheckOutPage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly country: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly placeOrder: Locator;

    //Optional
    readonly zipCode: Locator;
    readonly company: Locator;
    readonly apartment: Locator;
    readonly notes: Locator;

    constructor(private page: Page) {
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.country = page.getByRole('combobox', { name: 'Country / Region' });

        this.streetAddress = page.getByRole('textbox', { name: 'Street address *' });
        this.city = page.getByRole('textbox', { name: 'Town / City *' });
        this.email = page.getByRole('textbox', { name: 'Email address *' });
        this.phone = page.getByRole('textbox', { name: 'Phone *' });
        this.placeOrder = page.getByRole('button', { name: 'Place order' });

        //Optional
        this.zipCode = page.getByRole('textbox', { name: 'ZIP Code *' });
        this.company = page.getByRole('textbox', { name: 'Company name (optional)' });
        this.apartment = page.getByRole('textbox', { name: 'Apartment, suite, unit, etc' });
        this.notes = page.getByRole('textbox', { name: 'Order notes (optional)' });
    }

    async fillBillingDetails(billinginfo: BillingInfo) {
        await this.firstName.fill(billinginfo.firstname);
        await this.lastName.fill(billinginfo.lastname);
        await this.country.click();
        await this.page.getByRole('option', { name: billinginfo.country }).click();
        await this.streetAddress.fill(billinginfo.address);
        await this.city.fill(billinginfo.city);
        await this.phone.fill(billinginfo.phone);
        await this.email.fill(billinginfo.email);

        //Optional
        if (billinginfo.zipcode) {
            await this.zipCode.fill(billinginfo.zipcode);
        }
        if (billinginfo.company) {
            await this.company.fill(billinginfo.company);
        }
        if (billinginfo.apartment) {
            await this.apartment.fill(billinginfo.apartment);
        }
        if (billinginfo.notes) {
            await this.notes.fill(billinginfo.notes);
        }
        await this.placeOrder.click();
    }
}



