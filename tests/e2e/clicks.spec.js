// Pulsa los botones de cada pestaña (en hiragana y en katakana) y falla si aparece algún error.
// Así se detectaron, por ejemplo, el fallo de los kanas débiles con katakana y el atajo Enter roto.
const { test } = require('@playwright/test');
const { TABS, openApp, openTab, visibleTab, expectNoErrors } = require('./helpers');

const CLICKS_PER_TAB = 30;

for (const syllabary of ['hiragana', 'katakana']) {
    for (const tab of TABS) {
        test(`clics en «${tab}» (${syllabary})`, async ({ page }) => {
            const errors = await openApp(page);
            if (syllabary === 'katakana') await page.evaluate(() => setGlobalSyllabary('katakana'));
            // Algo de historial SRS para que existan «kanas débiles»
            await page.evaluate(() => {
                getActiveKanaDataset().slice(0, 6).forEach((k, i) => recordKanaResult(k.char || k.hiragana, i % 2 === 0));
                saveStateToStorage();
            });
            await openTab(page, tab);

            for (let i = 0; i < CLICKS_PER_TAB; i++) {
                const clicked = await page.evaluate(({ t, i }) => {
                    const sec = document.getElementById('tab-' + t);
                    const visible = el => el.offsetParent !== null && !el.disabled;
                    const els = [...sec.querySelectorAll('[data-action]')].filter(visible);
                    // Saltar acciones que reinician todo el progreso (piden confirmación)
                    const safe = els.filter(el => !/reset|Reset|clearAll/.test(el.dataset.action));
                    if (i >= safe.length) return false;
                    safe[i].click();
                    return true;
                }, { t: tab, i });
                if (!clicked) break;
                await page.waitForTimeout(60);
                if ((await visibleTab(page)) !== tab) await openTab(page, tab);
            }
            expectNoErrors(errors);
        });
    }
}
