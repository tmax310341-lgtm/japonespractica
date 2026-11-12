// Pruebas de la app en un navegador real (Chromium sin pantalla).
//   npm run test:e2e            ejecuta todas
//   npx playwright test --ui    modo interactivo para depurar
const { defineConfig, devices } = require('@playwright/test');

const PORT = 4173;

module.exports = defineConfig({
    testDir: './tests/e2e',
    timeout: 60_000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [['github'], ['list']] : 'list',
    use: {
        baseURL: `http://127.0.0.1:${PORT}/`,
        // Las pruebas no deben depender de la voz del sistema ni de permisos
        permissions: [],
        trace: 'retain-on-failure'
    },
    projects: [
        { name: 'escritorio', use: { ...devices['Desktop Chrome'] } },
        { name: 'movil', use: { ...devices['Pixel 7'] }, testMatch: /smoke|navigation/ }
    ],
    webServer: {
        command: `node tests/serve.js ${PORT}`,
        url: `http://127.0.0.1:${PORT}/`,
        reuseExistingServer: !process.env.CI
    }
});
