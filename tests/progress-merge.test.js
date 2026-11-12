const assert = require('assert');
const { mergeProgress, mergeStreak, mergeSrsStore } = require('../js/progress-merge.js');
let n = 0;
const t = (name, fn) => { fn(); n++; console.log('ok -', name); };

t('sin remoto devuelve local', () => {
    const l = { xp: 5 };
    assert.deepStrictEqual(mergeProgress(l, null), l);
});
t('sin local devuelve remoto', () => {
    assert.deepStrictEqual(mergeProgress(null, { xp: 7 }), { xp: 7 });
});
t('XP: el mayor', () => {
    assert.strictEqual(mergeProgress({ xp: 50, savedAt: 2 }, { xp: 120, savedAt: 1 }).xp, 120);
});
t('ajustes del guardado más reciente', () => {
    const m = mergeProgress({ theme: 'theme-light', savedAt: 10 }, { theme: 'theme-matcha', savedAt: 20 });
    assert.strictEqual(m.theme, 'theme-matcha');
    assert.strictEqual(m.savedAt, 20);
});
t('dispositivo nuevo (sin savedAt) toma ajustes de la nube', () => {
    const m = mergeProgress({ theme: 'theme-dark', xp: 0 }, { theme: 'theme-kanagawa', xp: 300, savedAt: 5 });
    assert.strictEqual(m.theme, 'theme-kanagawa');
});
t('racha: mismo día, la mayor', () => {
    assert.deepStrictEqual(mergeStreak({ lastActiveDate: '2026-11-11', streak: 3 }, { lastActiveDate: '2026-11-11', streak: 7 }), { lastActiveDate: '2026-11-11', streak: 7 });
});
t('racha: dispositivo nuevo hoy continúa la de ayer', () => {
    assert.deepStrictEqual(mergeStreak({ lastActiveDate: '2026-11-11', streak: 1 }, { lastActiveDate: '2026-11-10', streak: 5 }), { lastActiveDate: '2026-11-11', streak: 6 });
});
t('racha: cruza fin de mes', () => {
    assert.deepStrictEqual(mergeStreak({ lastActiveDate: '2026-12-01', streak: 1 }, { lastActiveDate: '2026-11-30', streak: 9 }), { lastActiveDate: '2026-12-01', streak: 10 });
});
t('racha: hueco de varios días no continúa', () => {
    assert.deepStrictEqual(mergeStreak({ lastActiveDate: '2026-11-11', streak: 1 }, { lastActiveDate: '2026-11-05', streak: 9 }), { lastActiveDate: '2026-11-11', streak: 1 });
});
t('SRS: entrada sin repasos no pisa a una con repasos', () => {
    const local = { 'あ': { box: 1, reviews: 0, lastReviewed: 999 } };
    const remote = { 'あ': { box: 3, reviews: 8, lastReviewed: 100 } };
    assert.strictEqual(mergeSrsStore(local, remote)['あ'].box, 3);
});
t('SRS: gana el repaso más reciente y se unen claves', () => {
    const local = { 'あ': { box: 2, reviews: 4, lastReviewed: 500 }, 'い': { box: 1, reviews: 1, lastReviewed: 1 } };
    const remote = { 'あ': { box: 3, reviews: 6, lastReviewed: 400 }, 'う': { box: 2, reviews: 2, lastReviewed: 2 } };
    const m = mergeSrsStore(local, remote);
    assert.strictEqual(m['あ'].box, 2);
    assert.deepStrictEqual(Object.keys(m).sort(), ['あ', 'い', 'う']);
});
t('Etapas: acumula niveles, puntuaciones y maestría', () => {
    const local = { savedAt: 2, stagesAutoProgress: { unlockedIndex: 2, masteredLevels: ['a', 'ka'], selectedLevelId: 'sa', levelScores: { a: { bestScore: 80, attempts: 2, lastCompleted: 5 } }, kanaMastery: { 'あ': { mastery: 2, lastPracticed: 9 } } } };
    const remote = { savedAt: 1, stagesAutoProgress: { unlockedIndex: 4, masteredLevels: ['a', 'ta'], selectedLevelId: 'ta', levelScores: { a: { bestScore: 95, attempts: 1, lastCompleted: 3 }, ta: { bestScore: 60, attempts: 1, lastCompleted: 4 } }, kanaMastery: { 'あ': { mastery: 3, lastPracticed: 1 }, 'た': { mastery: 1, lastPracticed: 4 } } } };
    const p = mergeProgress(local, remote).stagesAutoProgress;
    assert.strictEqual(p.unlockedIndex, 4);
    assert.deepStrictEqual(p.masteredLevels.sort(), ['a', 'ka', 'ta']);
    assert.strictEqual(p.selectedLevelId, 'sa');
    assert.deepStrictEqual(p.levelScores.a, { bestScore: 95, attempts: 2, lastCompleted: 5 });
    assert.deepStrictEqual(p.kanaMastery['あ'], { mastery: 3, lastPracticed: 9 });
    assert.ok(p.levelScores.ta && p.kanaMastery['た']);
});
t('no muta las entradas', () => {
    const l = { xp: 1, savedAt: 1, srs: { 'あ': { reviews: 1, lastReviewed: 1 } } };
    const r = { xp: 2, savedAt: 2, srs: {} };
    const ls = JSON.stringify(l), rs = JSON.stringify(r);
    mergeProgress(l, r);
    assert.strictEqual(JSON.stringify(l), ls); assert.strictEqual(JSON.stringify(r), rs);
});
console.log(`\n${n} pruebas OK`);
