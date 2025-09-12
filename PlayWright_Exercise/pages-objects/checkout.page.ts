import { expect, Locator, Page } from "@playwright/test";
export class CheckOutPage {
    readonly proceedToCheckOut: Locator;
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
        this.proceedToCheckOut = page.getByRole('link', { name: 'Proceed to checkout' });
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

    async fillBilligDetails(firstname: string, lastname: string, country: string, streetaddress: string, city: string, email: string, phone: string, zipcode?: string, company?: string, apartment?: string, notes?: string) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.country.click();
        await this.page.getByRole('option', { name: country }).click();
        //await checkOut.country.selectOption('Vietnam');
        await this.streetAddress.fill(streetaddress);
        await this.city.fill(city);
        await this.phone.fill(phone);
        await this.email.fill(email);

        //Optional
        if (zipcode !== undefined) {
            await this.zipCode.fill(zipcode);
        }
        if (company !== undefined) {
            await this.company.fill(company);
        }
        if (apartment !== undefined) {
            await this.apartment.fill(apartment);
        }
        if (notes !== undefined) {
            await this.notes.fill(notes);
        }
        await this.placeOrder.click();
    }

    async proceedToCheckout() {
        await this.proceedToCheckOut.click();
    }
}

