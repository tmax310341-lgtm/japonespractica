// Tras una primera visita, la app abre y funciona sin conexión (service worker).
const { test, expect } = require('@playwright/test');
const { openApp, visibleTab } = require('./helpers');

test('funciona sin conexión después de la primera visita', async ({ page, context }) => {
    await openApp(page);
    await page.evaluate(async () => {
        await navigator.serviceWorker.ready;
    });
    // Recargar para que la página quede controlada por el service worker
    await page.reload();
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    // Esperar a que termine la precarga
    await page.waitForFunction(async () => {
        const cache = await caches.open('kotodojo-app-v1');
        return (await cache.keys()).length >= 30;
    });

    await context.setOffline(true);
    await page.goto('./#numeros');
    await page.reload();
    await page.waitForFunction(() => window.__appLoaded === true);
    await expect.poll(() => visibleTab(page)).toBe('numbers');
    await expect(page.locator('#tab-numbers')).toContainText('万');
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(9, 13, 22)');
    await context.setOffline(false);
});
