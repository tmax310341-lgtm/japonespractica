// Calidad de los datos de estudio: silabarios, vocabulario, niveles, números y fechas.
// Carga los archivos de data/ y js/numbers.js, js/time.js en un contexto aislado de Node.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const context = vm.createContext({ console });
const exportNames = ['HIRAGANA_DATA', 'KATAKANA_DATA', 'EXPANDED_VOCABULARY', 'KATAKANA_VOCABULARY', 'LOOKALIKES_DATA',
    'WORD_SEARCH_THEMES', 'KANA_STROKES_SVG', 'STROKE_DATA', 'numberToJapanese', 'TIME_HOURS_DATA', 'TIME_MINUTES_DATA',
    'TIME_MONTHS_DATA', 'TIME_DAYS_DATA', 'SHIRITORI_WORDS', 'shiritoriAllowedStarts'];
const files = ['data/kana-strokes-svg.js', 'data/kana.js', 'data/vocabulary.js', 'data/stroke-steps.js', 'js/numbers.js', 'js/time.js',
    'js/game-shiritori.js'];
const source = files.map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n;\n') +
    `\n;globalThis.__data = { ${exportNames.join(', ')} };`;
vm.runInContext(source, context, { filename: 'datos-kotodojo.js' });
const D = context.__data;

let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks++; };

// ---------- Conversor kana → rōmaji (Hepburn) para comprobar los datos ----------
const BASE = {
    あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o', か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko', さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
    た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to', な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no', は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
    ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo', や: 'ya', ゆ: 'yu', よ: 'yo', ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro', わ: 'wa', を: 'wo', ん: 'n',
    が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go', ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo', だ: 'da', ぢ: 'dji', づ: 'dzu', で: 'de', ど: 'do',
    ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo', ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po', ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o', ゔ: 'vu'
};
const YOON = { ゃ: 'a', ゅ: 'u', ょ: 'o' };
const toHira = s => [...s].map(c => (c >= 'ァ' && c <= 'ヶ' ? String.fromCharCode(c.charCodeAt(0) - 0x60) : c)).join('');

function kanaToRomaji(kana) {
    const s = [...toHira(kana)];
    let out = '';
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const next = s[i + 1];
        if (c === 'っ') {
            const r = kanaToRomaji(s.slice(i + 1, i + 3).join(''));
            out += r.startsWith('ch') ? 't' : r.charAt(0);
            continue;
        }
        if (c === 'ー') {
            const vowels = out.match(/[aeiou]/g);
            out += vowels ? vowels[vowels.length - 1] : '';
            continue;
        }
        if (next && YOON[next] && BASE[c]) {
            const b = BASE[c];
            out += (/^(shi|chi|ji|dji)$/.test(b) ? b.replace(/i$/, '').replace(/^dj/, 'dy') : b.slice(0, -1) + 'y') + YOON[next];
            i++;
            continue;
        }
        if (next && 'ぁぃぅぇぉ'.includes(next) && BASE[c]) {
            const v = BASE[next];
            out += c === 'ふ' ? 'f' + v : 'てで'.includes(c) ? BASE[c][0] + v : c === 'う' ? 'w' + v : c === 'ゔ' ? 'v' + v : BASE[c].slice(0, -1) + v;
            i++;
            continue;
        }
        out += BASE[c] !== undefined ? BASE[c] : c;
    }
    return out;
}

// Comparación flexible (vocales largas, n/m, apóstrofos, を = o)
const loose = r => r.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[\s'’\-.,!?、。/()（）~〜]/g, '').replace(/m(?=[bpm])/g, 'n').replace(/wo/g, 'o')
    .replace(/ou|oo/g, 'o').replace(/uu/g, 'u').replace(/aa/g, 'a').replace(/ii/g, 'i').replace(/ee|ei/g, 'e');
const sameReading = (kana, romaji) => {
    const clean = kana.replace(/[（(].*?[)）]/g, '');
    // は como partícula en saludos (こんにちは = konnichiwa)
    const variants = [kanaToRomaji(clean), kanaToRomaji(clean.replace(/は$/, 'わ'))];
    return variants.some(v => loose(v) === loose(romaji));
};

// ---------- Silabarios ----------
ok(D.HIRAGANA_DATA.length === D.KATAKANA_DATA.length, 'hiragana y katakana tienen el mismo número de sonidos');
const romH = D.HIRAGANA_DATA.map(h => h.romaji);
ok(new Set(romH).size === romH.length, 'no hay rōmaji repetidos en HIRAGANA_DATA');
for (const h of D.HIRAGANA_DATA) ok(sameReading(h.hiragana, h.romaji), `rōmaji de ${h.hiragana} (${h.romaji})`);
for (const k of D.KATAKANA_DATA) {
    ok(sameReading(k.katakana, k.romaji), `rōmaji de ${k.katakana} (${k.romaji})`);
    const h = D.HIRAGANA_DATA.find(x => x.romaji === k.romaji);
    ok(h && toHira(k.katakana) === h.hiragana, `${k.katakana} corresponde a su hiragana`);
}
for (const kana of [...D.HIRAGANA_DATA.map(h => h.hiragana), ...D.KATAKANA_DATA.map(k => k.katakana)]) {
    if ([...kana].length === 1) ok(D.KANA_STROKES_SVG[kana], `${kana} tiene trazos SVG`);
}

// ---------- Vocabulario ----------
for (const [name, list, key] of [['EXPANDED_VOCABULARY', D.EXPANDED_VOCABULARY, 'hiragana'], ['KATAKANA_VOCABULARY', D.KATAKANA_VOCABULARY, 'katakana']]) {
    const words = list.map(w => w[key]);
    const repeated = [...new Set(words.filter((w, i) => words.indexOf(w) !== i))];
    ok(repeated.length === 0, `${name} no tiene palabras repetidas: ${repeated.join(', ')}`);
    const wrong = list.filter(w => !sameReading(w[key], w.romaji)).map(w => `${w[key]} (${w.romaji})`);
    ok(wrong.length === 0, `${name}: el rōmaji no coincide con el kana en ${wrong.join(', ')}`);
    ok(list.every(w => w.spanish && w.spanish.trim()), `${name}: todas las palabras tienen traducción`);
}
const mixed = D.EXPANDED_VOCABULARY.filter(w => /[^\u3040-\u309f]/.test(w.hiragana)).map(w => w.hiragana);
ok(mixed.length === 0, `EXPANDED_VOCABULARY solo contiene hiragana: ${mixed.join(', ')}`);

// ---------- Shiritori: toda palabra (salvo las acabadas en ん) tiene continuación ----------
const deadEnds = D.SHIRITORI_WORDS.filter(w => !w.endsInN &&
    !D.SHIRITORI_WORDS.some(o => o.word !== w.word && D.shiritoriAllowedStarts(w.last).includes(o.first)));
ok(deadEnds.length === 0, `Shiritori sin continuación posible: ${deadEnds.map(w => w.word).join(', ')}`);

// ---------- Gemelos y Sopa de Letras ----------
for (const l of D.LOOKALIKES_DATA) {
    ok(l.options.includes(l.target), `gemelos ${l.id}: el objetivo está entre las opciones`);
    ok(new Set(l.options).size === l.options.length, `gemelos ${l.id}: opciones sin repetir`);
}
for (const [key, theme] of Object.entries(D.WORD_SEARCH_THEMES)) {
    const words = theme.words.map(w => w.word);
    ok(new Set(words).size === words.length, `sopa de letras «${key}»: sin palabras repetidas`);
    ok(theme.words.every(w => sameReading(w.word, w.romaji)), `sopa de letras «${key}»: rōmaji correcto`);
}

// ---------- Números ----------
const NUMBERS = {
    0: 'ぜろ', 4: 'よん', 7: 'なな', 9: 'きゅう', 14: 'じゅうよん', 40: 'よんじゅう', 99: 'きゅうじゅうきゅう', 100: 'ひゃく',
    300: 'さんびゃく', 600: 'ろっぴゃく', 800: 'はっぴゃく', 1000: 'せん', 3000: 'さんぜん', 8000: 'はっせん', 3600: 'さんぜんろっぴゃく',
    10000: 'いちまん', 12345: 'いちまんにせんさんびゃくよんじゅうご', 100000: 'じゅうまん', 1000000: 'ひゃくまん',
    8000000: 'はっぴゃくまん', 10000000: 'いっせんまん', 18000000: 'いっせんはっぴゃくまん',
    99999999: 'きゅうせんきゅうひゃくきゅうじゅうきゅうまんきゅうせんきゅうひゃくきゅうじゅうきゅう'
};
const KANJI = { 10: '十', 100: '百', 1000: '千', 3000: '三千', 10000: '一万', 11000: '一万千', 100000: '十万',
    10000000: '一千万', 99999999: '九千九百九十九万九千九百九十九' };
for (const [n, kanji] of Object.entries(KANJI)) {
    ok(D.numberToJapanese(Number(n)).kanji === kanji, `${n} se escribe ${kanji}`);
}
for (const [n, reading] of Object.entries(NUMBERS)) {
    const r = D.numberToJapanese(Number(n));
    ok(r.hiragana === reading, `${n} se lee ${reading} (la app dice ${r.hiragana})`);
    ok(sameReading(r.hiragana, r.romaji), `${n}: el rōmaji (${r.romaji}) coincide con la lectura`);
}

// ---------- Horas y fechas ----------
const expectReading = (list, num, hira) => {
    const item = list.find(x => x.num === num);
    ok(item && item.hira === hira, `${num} se lee ${hira} (la app dice ${item && item.hira})`);
};
[[4, 'よじ'], [7, 'しちじ'], [9, 'くじ']].forEach(([n, h]) => expectReading(D.TIME_HOURS_DATA, n, h));
[[1, 'いっぷん'], [3, 'さんぷん'], [6, 'ろっぷん'], [10, 'じゅっぷん']].forEach(([n, h]) => expectReading(D.TIME_MINUTES_DATA, n, h));
[[4, 'しがつ'], [7, 'しちがつ'], [9, 'くがつ']].forEach(([n, h]) => expectReading(D.TIME_MONTHS_DATA, n, h));
[[1, 'ついたち'], [2, 'ふつか'], [8, 'ようか'], [10, 'とおか'], [14, 'じゅうよっか'], [20, 'はつか'], [24, 'にじゅうよっか']]
    .forEach(([n, h]) => expectReading(D.TIME_DAYS_DATA, n, h));
for (const list of [D.TIME_HOURS_DATA, D.TIME_MINUTES_DATA, D.TIME_MONTHS_DATA, D.TIME_DAYS_DATA]) {
    for (const x of list) ok(sameReading(x.hira, x.romaji), `rōmaji de ${x.hira} (${x.romaji})`);
}
ok(D.TIME_DAYS_DATA.length === 31, 'hay 31 días del mes');

console.log(`ok - datos: ${checks} comprobaciones`);
