// 2.º parcial: simulacro completo, práctica por tema, repaso de errores, guía y selector de parcial.
const { test, expect } = require('@playwright/test');
const { openApp, openTab, expectNoErrors } = require('./helpers');

test('simulacro completo: 20 preguntas, nota y errores guardados', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'parcial');
    await expect(page.locator('#parcialHeroTitle')).toHaveText('Mi día a día');
    await page.locator('#p2StartExamBtn').click();
    await expect(page.locator('#p2Timer')).toBeVisible();

    // Responder todas con la primera opción (con teclado en la mitad, con el ratón en la otra mitad)
    for (let i = 0; i < 20; i++) {
        await expect(page.getByText(`Pregunta ${i + 1} de 20`)).toBeVisible();
        if (i % 2 === 0) await page.keyboard.press('1');
        else await page.locator('#p2-opt-0').click();
        await expect(page.locator('#p2-opt-0')).toHaveClass(/p2-selected/);
        if (i < 19) await page.keyboard.press('ArrowRight');
    }
    await page.locator('#p2FinishBtn').click();

    const grade = Number(await page.locator('#p2Grade').innerText());
    expect(grade).toBeGreaterThanOrEqual(0);
    expect(grade).toBeLessThanOrEqual(5);
    await expect(page.getByText('Aciertos por tema')).toBeVisible();

    const saved = await page.evaluate(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return { attempts: data.parcial2.history.length, total: data.parcial2.history[0].total, mistakes: data.parcial2.mistakes.length };
    });
    expect(saved.attempts).toBe(1);
    expect(saved.total).toBe(20);
    // La nota corresponde a los aciertos guardados
    expect(saved.mistakes).toBe(20 - Math.round(grade * 4));
    expectNoErrors(errors);
});

test('práctica por tema: corrige al instante y explica la regla', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'parcial');
    await page.locator('[data-action="p2StartPractice"][data-args=\'["particulas"]\']').click();
    await expect(page.getByText('Práctica: Partículas')).toBeVisible();
    for (let i = 0; i < 10; i++) {
        await page.locator('#p2-opt-0').click();
        await expect(page.getByText(/¡Correcto!|La respuesta correcta es/)).toBeVisible();
        await page.locator('#p2NextBtn').click();
    }
    await expect(page.locator('#p2Grade')).toBeVisible();
    expectNoErrors(errors);
});

test('repasar errores: las preguntas acertadas salen de la lista', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'parcial');
    // Guardar dos errores fallando a propósito
    await page.locator('[data-action="p2StartPractice"][data-args=\'["verbos"]\']').click();
    const wrongIndex = () => page.evaluate(() => {
        const q = p2Session.questions[p2Session.index];
        return q.options.findIndex(o => o !== q.correct);
    });
    for (let i = 0; i < 2; i++) {
        await page.locator(`#p2-opt-${await wrongIndex()}`).click();
        await page.locator('#p2NextBtn').click();
    }
    await page.locator('[data-action="p2ExitSession"]').first().click();
    await expect(page.getByRole('button', { name: 'Repasar (2)' })).toBeVisible();

    await page.getByRole('button', { name: 'Repasar (2)' }).click();
    for (let i = 0; i < 2; i++) {
        const right = await page.evaluate(() => {
            const q = p2Session.questions[p2Session.index];
            return q.options.indexOf(q.correct);
        });
        await page.locator(`#p2-opt-${right}`).click();
        await page.locator('#p2NextBtn').click();
    }
    expect(await page.evaluate(() => state.parcial2.mistakes.length)).toBe(0);
    expectNoErrors(errors);
});

test('guía completa, filtros por sección y cambio al 1.er parcial', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'parcial');
    await page.locator('#btn-parcial-mode-p2guide').click();
    const workspace = page.locator('#parcialWorkspaceContainer');
    await expect(workspace).toContainText('コーヒー');
    await expect(workspace).toContainText('一万');
    await expect(workspace).toContainText('月曜日');
    await expect(workspace).toContainText('しがつ');
    await expect(workspace).toContainText('くじ');
    await expect(workspace).toContainText('かえります');
    await expect(workspace).toContainText('ねました');
    await expect(workspace).toContainText('すきではありませんでした');
    await expect(workspace).toContainText('ぜんぜん');
    await expect(workspace).toContainText('おじぎ');

    // Probar filtro de sección en la guía
    await page.locator('[data-action="p2SetGuideSection"][data-args=\'["verbos"]\']').click();
    await expect(workspace).toContainText('べんきょうしませんでした');
    await page.locator('[data-action="p2SetGuideSection"][data-args=\'["all"]\']').click();

    await page.locator('#btn-parcial-exam-p1').click();
    await expect(page.locator('#parcialP1Nav')).toBeVisible();
    await expect(page.locator('#parcialP2Nav')).toBeHidden();
    await expect(page.locator('#parcialHeroTitle')).toHaveText('Palabras y Frases de Clase');

    await page.locator('#btn-parcial-exam-p2').click();
    await expect(page.locator('#parcialP2Nav')).toBeVisible();
    await expect(page.locator('#p2StartExamBtn')).toBeVisible();
    expectNoErrors(errors);
});

test('tarjetas de repaso: voltear, filtrar por tema y avanzar', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'parcial');
    await page.locator('#btn-parcial-mode-p2cards').click();
    await expect(page.locator('#p2CardSurface')).toBeVisible();

    await page.locator('#p2CardFlipBtn').click();
    await expect(page.locator('#p2CardSurface')).toContainText('Toca para volver al frente');

    await page.locator('[data-action="p2SetCardCategory"][data-args=\'["verbos"]\']').click();
    await page.locator('#p2CardFlipBtn').click();
    await expect(page.locator('#p2CardSurface')).toContainText('Pasado +:');

    await page.locator('#p2CardNextBtn').click();
    await expect(page.locator('#parcialWorkspaceContainer')).toContainText('Tarjeta 2');
    expectNoErrors(errors);
});

test('opción de rōmaji: se activa, muestra rōmaji debajo de las palabras, persiste y se desactiva', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'parcial');
    await page.locator('[data-action="p2StartPractice"][data-args=\'["katakana"]\']').click();

    const toggle = page.locator('#p2RomajiToggleBtn');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('.p2-romaji')).toHaveCount(0);

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(await page.locator('.p2-romaji').count()).toBeGreaterThan(0);
    const savedOn = await page.evaluate(() => JSON.parse(localStorage.getItem(STORAGE_KEY)).parcial2.showRomaji);
    expect(savedOn).toBe(true);

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('.p2-romaji')).toHaveCount(0);
    expectNoErrors(errors);
});
