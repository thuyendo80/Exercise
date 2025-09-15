import { test, expect } from '../fixtures/fixtures';
import { CommonUtils } from "../utils/commonUtils";

test('Verify users can post a review',
    async ({
        homePage,
        shoppingPage,
        productDetailsPage,
        logIn,
    }) => {
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