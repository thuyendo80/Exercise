import { expect } from "@playwright/test";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";
import { ProductDetailsPage } from "../pages-objects/productDetails.page";
import { CommonUtils } from "../utils/commonUtils";
import { test } from '../fixtures/fixtures';

test('Verify users can post a review', async ({ page, logIn }) => {
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    const items = 'AirPods';
    const yourReview = 'Very good!. Should buy this one. ' + CommonUtils.generateRandomString(5);

    await logIn();

    await homePage.goToPage(homePage.shop);

    await shoppingPage.selectProduct(items);

    await productDetailsPage.selectTab('Reviews');

    await productDetailsPage.submitReview(productDetailsPage.fourStar, yourReview);

    await productDetailsPage.selectTab('Reviews');

    await productDetailsPage.verifyReview('4', yourReview);
});