// Menú, direcciones por pestaña (#etapas…), botón atrás y atajos de teclado.
const { test, expect } = require('@playwright/test');
const { openApp, openTab, visibleTab, expectNoErrors } = require('./helpers');

test('el menú abre una pestaña y la URL cambia', async ({ page }) => {
    const errors = await openApp(page);
    await page.locator('#mobileMenuBtn').click();
    await page.locator('#nav-numbers').click();
    await expect(page.locator('#tab-numbers')).toBeVisible();
    await expect(page).toHaveURL(/#numeros$/);
    expectNoErrors(errors);
});

test('atrás y adelante recorren las pestañas', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'numbers');
    await openTab(page, 'stages');
    await openTab(page, 'parcial');
    await page.goBack();
    await expect.poll(() => visibleTab(page)).toBe('stages');
    await page.goBack();
    await expect.poll(() => visibleTab(page)).toBe('numbers');
    await page.goBack();
    await expect.poll(() => visibleTab(page)).toBe('study');
    await page.goForward();
    await expect.poll(() => visibleTab(page)).toBe('numbers');
    expectNoErrors(errors);
});

test('un enlace directo abre esa pestaña', async ({ page }) => {
    const errors = await openApp(page, '#horas');
    await expect.poll(() => visibleTab(page)).toBe('time');
    await expect(page.locator('#tab-time')).toContainText('時');
    expectNoErrors(errors);
});

test('Enter pasa al siguiente ejercicio en el dictado de números', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'numbers');
    await page.evaluate(() => { setNumbersPillar('practice'); setNumbersMode('dictation'); });
    await page.keyboard.press('1');
    await page.keyboard.press('Enter');
    const next = page.locator('#tab-numbers button[data-action="nextNumbersDictationChallenge"]');
    await expect(next).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(next).toHaveCount(0);
    expectNoErrors(errors);
});
