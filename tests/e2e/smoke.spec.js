// La app arranca y todas las pestañas se pintan sin errores, en los 6 temas.
const { test, expect } = require('@playwright/test');
const { TABS, openApp, openTab, expectNoErrors } = require('./helpers');

test('arranca en «Aprender» sin errores', async ({ page }) => {
    const errors = await openApp(page);
    await expect(page.locator('#tab-study')).toBeVisible();
    await expect(page.locator('#tab-study')).toContainText('あ');
    // Números, Horas y Parcial se cargan bajo demanda
    expect(await page.evaluate(() => typeof initNumbersGame)).toBe('undefined');
    expectNoErrors(errors);
});

test('todas las pestañas se pintan con contenido', async ({ page }) => {
    const errors = await openApp(page);
    for (const tab of TABS) {
        await openTab(page, tab);
        const section = page.locator('#tab-' + tab);
        await expect(section, tab).toBeVisible();
        expect((await section.innerText()).trim().length, `contenido de ${tab}`).toBeGreaterThan(80);
    }
    expectNoErrors(errors);
});

test('los 6 temas se aplican sin errores', async ({ page }) => {
    const errors = await openApp(page);
    for (const theme of ['theme-dark', 'theme-matcha', 'theme-sumie', 'theme-light', 'theme-tatami', 'theme-kanagawa']) {
        await page.evaluate(t => selectTheme(t), theme);
        await expect(page.locator('body')).toHaveClass(new RegExp(theme));
        const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        expect(bg, theme).not.toBe('rgba(0, 0, 0, 0)');
    }
    expectNoErrors(errors);
});

test('cambiar a katakana repinta las pestañas sin errores', async ({ page }) => {
    const errors = await openApp(page);
    await page.evaluate(() => setGlobalSyllabary('katakana'));
    for (const tab of ['study', 'stages', 'draw', 'progress', 'quiz', 'memory']) {
        await openTab(page, tab);
    }
    await expect(page.locator('#tab-memory')).toBeVisible();
    expectNoErrors(errors);
});
