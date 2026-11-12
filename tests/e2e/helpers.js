// Utilidades compartidas por las pruebas de Playwright.
const { expect } = require('@playwright/test');

const TABS = ['study', 'stages', 'draw', 'blinddraw', 'dictation', 'lookalikes', 'shiritori', 'wordbuilder',
    'wordsearch', 'memory', 'quiz', 'progress', 'numbers', 'time', 'parcial'];

// Mensajes de consola que no indican un fallo de la app
const IGNORED_CONSOLE = [/Failed to load resource/i, /net::ERR_/i];

// Abre la app y empieza a registrar errores. Devuelve la lista (se rellena durante la prueba).
async function openApp(page, hash = '') {
    const errors = [];
    page.on('pageerror', err => errors.push(`pageerror: ${err.message}`));
    page.on('console', msg => {
        if (msg.type() === 'error' && !IGNORED_CONSOLE.some(re => re.test(msg.text()))) {
            errors.push(`console: ${msg.text()}`);
        }
    });
    page.on('dialog', d => d.dismiss().catch(() => {}));
    // Las pruebas no tocan el proyecto real de Firebase
    await page.route('**/firebasejs/**', route => route.abort());
    await page.goto('./' + hash);
    await page.waitForFunction(() => window.__appLoaded === true);
    return errors;
}

async function visibleTab(page) {
    return page.evaluate(() => {
        const s = document.querySelector('section.tab-content:not(.hidden)');
        return s ? s.id.replace('tab-', '') : null;
    });
}

// Cambia de pestaña y espera a que su contenido (y módulo diferido, si lo tiene) esté listo
async function openTab(page, tab) {
    await page.evaluate(t => switchTab(t), tab);
    await page.waitForFunction(t => {
        const s = document.getElementById('tab-' + t);
        return s && !s.classList.contains('hidden') && (typeof tabModulesReady !== 'function' || tabModulesReady(t));
    }, tab);
    await page.waitForTimeout(150);
}

function expectNoErrors(errors) {
    expect(errors, errors.join('\n')).toEqual([]);
}

module.exports = { TABS, openApp, openTab, visibleTab, expectNoErrors };
