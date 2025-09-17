import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    readonly description: Locator;
    readonly reviews: Locator;
    readonly oneStar: Locator;
    readonly twoStar: Locator;
    readonly threeStar: Locator;
    readonly fourStar: Locator;
    readonly fiveStar: Locator;
    readonly yourReview: Locator;
    readonly submit: Locator;

    constructor(private page: Page) {
        this.description = page.getByRole('link', { name: 'Description' });
        this.reviews = page.getByRole('link', { name: /Reviews/ });
        this.oneStar = page.getByRole('link', { name: '󩌍1' });
        this.twoStar = page.getByRole('link', { name: '󩌍󩌍2' });
        this.threeStar = page.getByRole('link', { name: '󩌍󩌍󩌍3' });
        this.fourStar = page.getByRole('link', { name: '󩌍󩌍󩌍󩌍4' });
        this.fiveStar = page.getByRole('link', { name: '󩌍󩌍󩌍󩌍󩌍' });
        this.yourReview = page.getByRole('textbox', { name: 'Your review *' });
        this.submit = page.getByRole('button', { name: 'Submit' });
    }

    async selectTab(tab: 'Description' | 'Reviews') {
        if (tab === 'Description') {
            await this.description.click();
        } else {
            await this.reviews.click();
        }
    }

    async submitReview(star: Locator, review: string) {
        await star.click();
        await this.yourReview.fill(review);
        await this.submit.click();
    }

    async verifyReview(star: '1' | '2' | '3' | '4' | '5', review: string) {
        const newReview: Locator = this.page.getByText(`Rated ${star} out of 5 Your review is awaiting approval ${review}`);
        await expect(newReview).toBeVisible();
        await expect(newReview.getByRole('img', { name: `Rated ${star} out of 5` })).toBeVisible();
    }
}

