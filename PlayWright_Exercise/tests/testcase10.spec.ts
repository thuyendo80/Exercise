import { test, expect } from "@playwright/test";
import { LogIn } from "../pages-objects/login.page";
import { HomePage } from "../pages-objects/home.page";
import { ShoppingPage } from "../pages-objects/shopping.page";
import { ProductDetailsPage } from "../pages-objects/productDetails.page";
import { CommonUtils } from "../utils/commonUtils";

test('Verify users can post a review', async ({ page }) => {
    const logIn = new LogIn(page);
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    const items = 'AirPods';
    const yourReview = 'Very good!. Should buy this one. ' + CommonUtils.generateRandomString(5);

    await homePage.navigate();

    await logIn.login('thuyen.do@agest.vn', 'PlaywrightTest123!');

    await homePage.goToPage(homePage.shop);

    await shoppingPage.selectProduct(items);

    await productDetailsPage.selectTab('Reviews');

    await productDetailsPage.submitReview(productDetailsPage.fourStar, yourReview);

    await productDetailsPage.selectTab('Reviews');

    await productDetailsPage.verifyReview('4', yourReview);
});