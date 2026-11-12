// Lógica de los juegos, ejecutada muchas veces para cubrir el azar.
const { test, expect } = require('@playwright/test');
const { openApp, openTab, expectNoErrors } = require('./helpers');

for (const syllabary of ['hiragana', 'katakana']) {
    test(`quiz rápido (${syllabary}): usa el silabario activo y 4 opciones distintas con la correcta`, async ({ page }) => {
        const errors = await openApp(page);
        await page.evaluate(s => setGlobalSyllabary(s), syllabary);
        await openTab(page, 'quiz');
        const problems = await page.evaluate(s => {
            const out = [];
            const isKata = c => /[゠-ヿ]/.test(c);
            for (let i = 0; i < 80; i++) {
                initQuizQuestion();
                const q = state.currentQuizQuestion;
                const shown = document.getElementById('quizSymbolDisplay').textContent;
                const opts = [...document.querySelectorAll('#quizOptionsGrid button span:last-child')].map(e => e.textContent);
                if ((s === 'katakana') !== isKata(shown)) out.push(`muestra ${shown} con ${s}`);
                if (new Set(opts).size !== 4) out.push(`opciones repetidas ${opts}`);
                if (!opts.includes(q.romaji)) out.push(`falta la correcta ${q.romaji} en ${opts}`);
            }
            return out;
        }, syllabary);
        expect(problems).toEqual([]);
        expectNoErrors(errors);
    });

    test(`memoria (${syllabary}): parejas completas del silabario activo`, async ({ page }) => {
        const errors = await openApp(page);
        await page.evaluate(s => setGlobalSyllabary(s), syllabary);
        await openTab(page, 'memory');
        const result = await page.evaluate(() => {
            initMemoryGame();
            const cards = state.memoryCards || [];
            const byPair = {};
            cards.forEach(c => { byPair[c.matchId] = (byPair[c.matchId] || 0) + 1; });
            const kanaCards = cards.filter(c => c.kanaObj).map(c => c.kanaObj.hiragana);
            return { total: cards.length, badPairs: Object.values(byPair).filter(n => n !== 2).length, kana: kanaCards.join('') };
        });
        expect(result.total).toBeGreaterThan(0);
        expect(result.badPairs).toBe(0);
        expect(/[゠-ヿ]/.test(result.kana)).toBe(syllabary === 'katakana');
        expectNoErrors(errors);
    });
}

test('etapas: los distractores no repiten ni suenan igual que la respuesta', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'stages');
    const problems = await page.evaluate(() => {
        const out = [];
        for (const syl of ['hiragana', 'katakana']) {
            setGlobalSyllabary(syl);
            const data = getActiveKanaDataset();
            // Sesión con grupos que contienen kanas homófonos (じ/ぢ, ず/づ, お/を)
            state.stageSession = { ...(state.stageSession || {}), pool: data.filter(k => ['a', 'za', 'da', 'wa', 'ja', 'dya'].includes(k.group)) };
            for (const target of state.stageSession.pool) {
                for (let i = 0; i < 15; i++) {
                    const d = getStageDistractors(target, 3);
                    const chars = d.map(x => x.hiragana);
                    if (chars.length !== 3) out.push(`${target.hiragana}: ${chars.length} distractores`);
                    if (new Set(chars.map(kanaSoundKey)).size !== chars.length) out.push(`${target.hiragana}: distractores repetidos ${chars}`);
                    const clash = chars.filter(c => areKanaHomophones(c, target.hiragana));
                    if (clash.length) out.push(`${target.hiragana}: distractor homófono ${clash}`);
                }
            }
        }
        return [...new Set(out)];
    });
    expect(problems).toEqual([]);
    expectNoErrors(errors);
});

test('shiritori: siempre hay una continuación válida o la cadena se completa', async ({ page }) => {
    const errors = await openApp(page);
    await openTab(page, 'shiritori');
    const result = await page.evaluate(() => {
        const out = { moves: 0, completed: 0, stuck: [] };
        for (let game = 0; game < 8; game++) {
            initShiritoriGame();
            for (let move = 0; move < 60; move++) {
                const cur = state.shiritoriCurrentWord;
                const allowed = shiritoriAllowedStarts(cur.last);
                const grid = document.getElementById('shiritoriOptionsGrid');
                if (/Cadena completada/.test(grid.textContent)) { out.completed++; break; }
                const used = new Set(state.shiritoriChain.map(c => c.word));
                const valid = SHIRITORI_WORDS.filter(w => allowed.includes(w.first) && !w.endsInN && !used.has(w.word));
                const shownValid = [...grid.querySelectorAll('button .font-jp')].map(e => e.textContent)
                    .filter(word => valid.some(v => v.word === word));
                if (!shownValid.length) {
                    // Sin opción válida visible solo es correcto si solo quedan palabras acabadas en ん
                    if (valid.length) out.stuck.push(`${cur.word} → ${allowed}`);
                    break;
                }
                chooseShiritoriWord(valid.find(v => v.word === shownValid[0]));
                out.moves++;
            }
        }
        return out;
    });
    expect(result.stuck).toEqual([]);
    expect(result.moves).toBeGreaterThan(20);
    expectNoErrors(errors);
});

test('etapas 5-8: aceptan las variantes de rōmaji (ji para ぢ, o para を…)', async ({ page }) => {
    const errors = await openApp(page);
    const ok = await page.evaluate(() => [
        romajiMatches('ji', 'dji'), romajiMatches('zu', 'dzu'), romajiMatches('o', 'wo'), romajiMatches('si', 'shi'),
        !romajiMatches('ka', 'ki')
    ]);
    expect(ok).toEqual([true, true, true, true, true]);
    expectNoErrors(errors);
});
