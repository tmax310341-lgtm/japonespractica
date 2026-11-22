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
    '\n;globalThis.__p2 = { P2_BLOCKS, P2_EXAM, P2_BANK, P2_READINGS, P2_VERBS, P2_VERB_TRAPS, p2Candidates, p2BuildExam, p2Prepare };';
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

// Preguntas generadas: se ejecutan muchas veces para cubrir el azar
for (let i = 0; i < 400; i++) {
    for (const block of ['tiempo', 'verbos']) {
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

console.log(`ok - 2.º parcial: ${P.P2_BANK.length} preguntas fijas y ${checks} comprobaciones`);
