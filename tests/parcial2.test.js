// Banco de preguntas del 2.º parcial y preguntas generadas (horas, días y verbos).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const context = vm.createContext({ console, document: { addEventListener() {} }, state: {} });
const source = ['js/utils.js', 'data/parcial2.js', 'js/parcial2.js']
    .map(f => fs.readFileSync(path.join(root, f), 'utf8').replace(/^if \(typeof module[\s\S]*$/m, ''))
    .join('\n;\n') +
    '\n;globalThis.__p2 = { P2_BLOCKS, P2_EXAM, P2_BANK, P2_READINGS, P2_VERBS, P2_VERB_TRAPS, P2_KATAKANA, P2_NUMBERS_KANJI, P2_NUMBER_EXAMPLES, P2_MONTHS, P2_CULTURE, P2_SUKI_FORMS, p2Candidates, p2BuildExam, p2Prepare, p2ToRomaji, p2HasJapanese };';
vm.runInContext(source, context, { filename: 'parcial2.js' });
const P = context.__p2;

let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks++; };
const blockIds = P.P2_BLOCKS.map(b => b.id);

function checkQuestion(raw, label) {
    ok(blockIds.includes(raw.b), `${label}: bloque desconocido «${raw.b}»`);
    ok(Array.isArray(raw.o) && raw.o.length === 4, `${label}: debe tener 4 opciones`);
    ok(new Set(raw.o).size === 4, `${label}: opciones repetidas ${raw.o.join(' / ')}`);
    ok(raw.o.every(x => String(x).trim()), `${label}: opción vacía`);
    ok(raw.q && raw.q.trim(), `${label}: falta el enunciado`);
    ok(raw.e && raw.e.trim().length > 8, `${label}: falta la explicación`);
    if (raw.s && /Completa/.test(raw.q)) ok(raw.s.includes('（　）'), `${label}: la frase no tiene hueco （　）`);
    if (raw.b === 'lectura') ok(P.P2_READINGS[raw.r], `${label}: lectura «${raw.r}» inexistente`);
}

// Banco fijo
P.P2_BANK.forEach((raw, i) => checkQuestion(raw, `P2_BANK[${i}]`));
const prompts = P.P2_BANK.map(q => q.q + '|' + (q.s || '') + '|' + q.o[0]);
ok(new Set(prompts).size === prompts.length, 'no hay preguntas repetidas en el banco');

// Cada bloque tiene preguntas suficientes para el examen y el examen suma lo previsto
const examTotal = P.P2_BLOCKS.reduce((n, b) => n + b.examCount, 0);
ok(examTotal === P.P2_EXAM.questions, `los bloques suman ${examTotal} preguntas y el examen tiene ${P.P2_EXAM.questions}`);
for (const b of P.P2_BLOCKS) {
    ok(P.P2_BANK.filter(q => q.b === b.id).length >= Math.max(b.examCount, 8), `el bloque ${b.id} tiene pocas preguntas`);
}

// Verbos: las formas incorrectas nunca coinciden con la correcta
for (const v of P.P2_VERBS) {
    const traps = P.P2_VERB_TRAPS[v.dict];
    ok(traps && traps.length === 3 && !traps.includes(v.masu), `trampas de ${v.dict}`);
}

// Nuevos conjuntos de referencia de la guía L2–L3
ok(Array.isArray(P.P2_KATAKANA) && P.P2_KATAKANA.length >= 15, 'P2_KATAKANA completo');
ok(Array.isArray(P.P2_NUMBERS_KANJI) && P.P2_NUMBERS_KANJI.length === 13, 'P2_NUMBERS_KANJI con 13 entradas');
ok(Array.isArray(P.P2_NUMBER_EXAMPLES) && P.P2_NUMBER_EXAMPLES.length >= 6, 'P2_NUMBER_EXAMPLES completo');
ok(Array.isArray(P.P2_MONTHS) && P.P2_MONTHS.length === 12, 'P2_MONTHS con 12 meses');
ok(Array.isArray(P.P2_CULTURE) && P.P2_CULTURE.length >= 4, 'P2_CULTURE con aspectos culturales');
ok(P.P2_SUKI_FORMS && P.P2_SUKI_FORMS.pastNeg === 'すきではありませんでした', 'P2_SUKI_FORMS completo');

// Preguntas generadas: se ejecutan muchas veces para cubrir el azar
for (let i = 0; i < 400; i++) {
    for (const block of ['tiempo', 'verbos', 'numeros', 'katakana']) {
        for (const c of P.p2Candidates(block, 6).filter(c => c.id.startsWith('g-'))) checkQuestion(c.raw, c.id);
    }
}

// El examen tiene el número previsto de preguntas, sin repetir y con la respuesta entre las opciones
for (let i = 0; i < 100; i++) {
    const exam = P.p2BuildExam();
    ok(exam.length === P.P2_EXAM.questions, `el examen tiene ${exam.length} preguntas`);
    ok(new Set(exam.map(q => q.id)).size === exam.length, 'preguntas repetidas en un examen');
    ok(exam.every(q => q.options.includes(q.correct)), 'una pregunta del examen no incluye la respuesta correcta');
}

// Conversor a rōmaji (hiragana, katakana, kanjis y partículas)
const romajiCases = [
    ['コーヒー', 'koohii'],
    ['コンピューター', 'konpyuutaa'],
    ['パーティー', 'paatii'],
    ['カフェ', 'kafe'],
    ['インターネット', 'intaanetto'],
    ['スポーツ', 'supootsu'],
    ['ジュース', 'juusu'],
    ['わたしは', 'watashi wa'],
    ['パンを', 'pan wo'],
    ['バスで', 'basu de'],
    ['月曜日', 'getsuyoubi'],
    ['4月', 'shigatsu'],
    ['図書館', 'toshokan'],
    ['一万二千三百四十五', 'ichiman nisen sanbyaku yonjuugo']
];
for (const [jp, expected] of romajiCases) {
    assert.strictEqual(P.p2ToRomaji(jp), expected, `rōmaji de ${jp}`);
    checks++;
}
for (const k of P.P2_KATAKANA) {
    const r = P.p2ToRomaji(k.jp);
    ok(!P.p2HasJapanese(r) && r.length > 0, `katakana sin convertir en ${k.jp}: ${r}`);
}
for (const r of Object.values(P.P2_READINGS)) {
    const conv = P.p2ToRomaji(r.text);
    ok(!P.p2HasJapanese(conv) && conv.length > 10, `lectura sin convertir en ${r.title}: ${conv}`);
}
for (const raw of P.P2_BANK) {
    if (raw.s) ok(!P.p2HasJapanese(P.p2ToRomaji(raw.s)), `frase sin convertir: ${raw.s}`);
    for (const opt of raw.o) {
        if (P.p2HasJapanese(opt)) ok(!P.p2HasJapanese(P.p2ToRomaji(opt)), `opción sin convertir: ${opt}`);
    }
}

console.log(`ok - 2.º parcial: ${P.P2_BANK.length} preguntas fijas y ${checks} comprobaciones`);
