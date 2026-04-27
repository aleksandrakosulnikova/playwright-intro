import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker"

//const TD_URL = 'https://fe-delivery.tallinn-learning.ee';
const APP_URL = process.env.APP_URL || "missing APP_URL env var";
const APP_USER  = process.env.APP_USER || "missing APP_USER env var";
const APP_PASSWORD = process.env.APP_PASSWORD || "missing APP_PASSWORD env var";


test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

});

//ТЕСТ НА УРОКЕ
test('TD negative auth test 1', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');
    const errorPopup = page.locator('[data-name="authorizationError-popup"]');


    await username.fill('user3');
    await password.fill('qwerqwerqwerqwerqwer');
    await signInBtn.click();
    await expect(errorPopup).toBeVisible();
});

//ТЕСТ С БИБЛИОТЕКОЙ FAKER
test('Неуспешная авторизация с некорректным логином и некорректным паролем', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');
    const errorPopup = page.locator('[data-name="authorizationError-popup"]');

    await username.fill(faker.internet.username());
    await password.fill(faker.internet.password());
    await signInBtn.click();
    await expect(errorPopup).toBeVisible();
});

test('Неуспешная авторизация с корректным логином и некорректным паролем', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');
    const errorPopup = page.locator('[data-name="authorizationError-popup"]');

    await username.fill(APP_USER);
    await password.fill(faker.internet.password());
    await signInBtn.click();
    await expect(errorPopup).toBeVisible();
});

test('Неуспешная авторизация с корректным паролем и некорректным логином', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');
    const errorPopup = page.locator('[data-name="authorizationError-popup"]');

    await username.fill(faker.internet.username());
    await password.fill(APP_PASSWORD);
    await signInBtn.click();
    await expect(errorPopup).toBeVisible();
});

test('Неуспешная авторизация с пустыми полями логина и пароля', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');

    await username.fill("");
    await password.fill("");
    await expect(signInBtn).toBeEnabled();
    //тут прикол, что открывая страницу с пустыми полями, то кнопка активна, а когда ты вводишь что-то и удаляешь - она уже неактивна
});

test('Неуспешная авторизация с пустым полем пароля и корректным логином', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');

    await username.fill(APP_USER);
    await password.fill("");
    await expect(signInBtn).toBeDisabled();
});

test('Неуспешная авторизация с пустым полем логина и корректным паролем', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');

    await username.fill("");
    await password.fill(APP_PASSWORD);
    await expect(signInBtn).toBeDisabled();
});