// KotoDojo · 2.º parcial / Final (Japonés 1, Tobira Lecciones 2 y 3): guía completa, tarjetas y simulacro
//
// Modos de la pestaña Parcial que gestiona este archivo:
//   p2sim     inicio del simulacro, sesión en curso y resultados
//   p2guide   guía completa de los 9 temas del parcial final (con filtros y audio)
//   p2cards   tarjetas interactivas de repaso por tema
// Las preguntas están en data/parcial2.js; aquí se generan además preguntas de horas,
// días, meses, verbos (presente/pasado), números y katakana para que cada simulacro sea distinto.

let p2Session = null;      // sesión en curso (examen, práctica o repaso)
let p2TimerId = null;
let p2GuideSection = 'all';
let p2CardsState = { cat: 'all', index: 0, flipped: false, deck: null };

const P2_LETTERS = ['A', 'B', 'C', 'D'];

// ---------- Progreso guardado (historial y errores) ----------
function p2Progress() {
    if (!state.parcial2 || typeof state.parcial2 !== 'object') state.parcial2 = { history: [], mistakes: [], showRomaji: false };
    if (!Array.isArray(state.parcial2.history)) state.parcial2.history = [];
    if (!Array.isArray(state.parcial2.mistakes)) state.parcial2.mistakes = [];
    if (typeof state.parcial2.showRomaji !== 'boolean') state.parcial2.showRomaji = false;
    return state.parcial2;
}

// ---------- Conversor a Rōmaji (ayuda opcional para lectura en el parcial) ----------
const P2_KANJI_ROMAJI = [
    ['一万二千三百四十五', 'ichiman nisen sanbyaku yonjuugo'],
    ['五万六百七十八', 'goman roppyaku nanajuuhachi'],
    ['二十五千', 'nijuugosen'], ['二千五百', 'nisen gohyaku'],
    ['二万五千', 'niman gosen'], ['五万二千', 'goman nisen'],
    ['四十五', 'yonjuugo'], ['七十八', 'nanajuuhachi'],
    ['三百', 'sanbyaku'], ['六百', 'roppyaku'], ['八百', 'happyaku'],
    ['三千', 'sanzen'], ['八千', 'hassen'],
    ['一万', 'ichiman'], ['二万', 'niman'], ['五万', 'goman'],
    ['二千', 'nisen'], ['五千', 'gosen'],
    ['12月', 'juunigatsu'], ['11月', 'juuichigatsu'], ['10月', 'juugatsu'],
    ['9月', 'kugatsu'], ['8月', 'hachigatsu'], ['7月', 'shichigatsu'],
    ['6月', 'rokugatsu'], ['5月', 'gogatsu'], ['4月', 'shigatsu'],
    ['3月', 'sangatsu'], ['2月', 'nigatsu'], ['1月', 'ichigatsu'],
    ['月曜日', 'getsuyoubi'], ['火曜日', 'kayoubi'], ['水曜日', 'suiyoubi'],
    ['木曜日', 'mokuyoubi'], ['金曜日', 'kinyoubi'], ['土曜日', 'doyoubi'], ['日曜日', 'nichiyoubi'],
    ['曜日', 'youbi'],
    ['学校生活', 'gakkou seikatsu'], ['図書館', 'toshokan'], ['学校', 'gakkou'],
    ['今日', 'kyou'], ['昨日', 'kinou'], ['明日', 'ashita'],
    ['毎朝', 'maiasa'], ['毎晩', 'maiban'], ['毎日', 'mainichi'],
    ['週末', 'shuumatsu'], ['先週', 'senshuu'], ['来週', 'raishuu'],
    ['挨拶', 'aisatsu'], ['食事', 'shokuji'], ['今', 'ima'], ['家', 'ie'], ['雨', 'ame'],
    ['7時', 'shichiji'], ['9時', 'kuji'], ['5時', 'goji'], ['4時', 'yoji'], ['時', 'ji'],
    ['一', 'ichi'], ['二', 'ni'], ['三', 'san'], ['四', 'yon'], ['五', 'go'],
    ['六', 'roku'], ['七', 'nana'], ['八', 'hachi'], ['九', 'kyuu'], ['十', 'juu'],
    ['百', 'hyaku'], ['千', 'sen'], ['万', 'man'],
    ['月', 'getsu'], ['火', 'ka'], ['水', 'sui'], ['木', 'moku'], ['金', 'kin'], ['土', 'do'], ['日', 'nichi']
];

const P2_KATA_DIGRAPHS = {
    'ヴァ': 'va', 'ヴィ': 'vi', 'ヴ': 'vu', 'ヴェ': 've', 'ヴォ': 'vo'
};

const P2_KANA_DIGRAPHS = {
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho', 'しぇ': 'she',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo', 'じぇ': 'je',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho', 'ちぇ': 'che',
    'てぃ': 'ti', 'でぃ': 'di', 'とぅ': 'tu', 'どぅ': 'du',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ふぁ': 'fa', 'ふぃ': 'fi', 'ふぇ': 'fe', 'ふぉ': 'fo',
    'うぃ': 'wi', 'うぇ': 'we', 'うぉ': 'wo', 'つぁ': 'tsa'
};

const P2_KANA_SINGLE = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo', 'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n'
};

function p2HasJapanese(text) {
    return /[\u3040-\u30ff\u4e00-\u9faf]/.test(String(text || ''));
}

function p2NormalizeKanaText(str) {
    let s = String(str || '');
    for (const [k, r] of Object.entries(P2_KATA_DIGRAPHS)) {
        if (s.includes(k)) s = s.split(k).join(r);
    }
    for (const [k, r] of P2_KANJI_ROMAJI) {
        if (s.includes(k)) s = s.split(k).join(r);
    }
    return s.replace(/[\u30A1-\u30F6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

function p2ConvertChunk(rawChunk) {
    const s = p2NormalizeKanaText(rawChunk);
    let out = '';
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === 'っ') {
            const pair = s.slice(i + 1, i + 3);
            const nextRom = P2_KANA_DIGRAPHS[pair] || P2_KANA_SINGLE[s[i + 1]] || '';
            if (nextRom.startsWith('ch')) out += 't';
            else if (/^[bcdfghjklmnpqrstvwxyz]/.test(nextRom)) out += nextRom[0];
            continue;
        }
        if (ch === 'ー') {
            const m = out.match(/[aeiou](?!.*[aeiou])/);
            out += m ? m[0] : '-';
            continue;
        }
        const pair = s.slice(i, i + 2);
        if (P2_KANA_DIGRAPHS[pair]) {
            out += P2_KANA_DIGRAPHS[pair];
            i++;
            continue;
        }
        if (P2_KANA_SINGLE[ch]) {
            out += P2_KANA_SINGLE[ch];
            continue;
        }
        out += ch;
    }
    return out;
}

function p2ConvertToken(token) {
    const norm = String(token || '')
        .replace(/（[\s\u3000]*）/g, ' ( ) ')
        .replace(/（/g, '(').replace(/）/g, ')')
        .replace(/：/g, ': ').replace(/、/g, ', ').replace(/。/g, '.')
        .replace(/？/g, '?').replace(/！/g, '!')
        .replace(/・/g, ' · ').replace(/〜/g, '~')
        .replace(/[「」]/g, '');

    return norm.split(/( +)/).map(part => {
        if (!part || /^ +$/.test(part)) return part;
        const m = part.match(/^([(~]*)(.*?)([.,?!:)]*)$/);
        if (!m) return p2ConvertChunk(part);
        const [, pre, core, post] = m;
        if (!core) return pre + post;
        if (core === 'こんにちは') return pre + 'konnichiwa' + post;
        if (core === 'こんばんは') return pre + 'konbanwa' + post;
        if (core === 'は') return pre + 'wa' + post;
        if (core === 'を') return pre + 'wo' + post;
        if (core.endsWith('は')) return pre + p2ConvertChunk(core.slice(0, -1)) + ' wa' + post;
        if (core.endsWith('を')) return pre + p2ConvertChunk(core.slice(0, -1)) + ' wo' + post;
        if (core.endsWith('で') && core.length >= 3 && !core.endsWith('まで') && core !== 'あとで') {
            return pre + p2ConvertChunk(core.slice(0, -1)) + ' de' + post;
        }
        return pre + p2ConvertChunk(core) + post;
    }).join('');
}

function p2ToRomaji(text) {
    return String(text || '')
        .split(/ +/)
        .map(p2ConvertToken)
        .join(' ')
        .replace(/\s+/g, ' ')
        .replace(/\s+([.,?!:])/g, '$1')
        .trim();
}

function p2WordByWordHtml(jpText) {
    return String(jpText || '').split(/ +/).filter(Boolean).map(tok => {
        if (!p2HasJapanese(tok)) {
            return `<span class="inline-block mr-2 mb-1.5 align-top">${p2Escape(tok)}</span>`;
        }
        return `<span class="inline-flex flex-col items-start mr-2 mb-1.5 align-top">
            <span>${p2Escape(tok)}</span>
            <span class="p2-romaji text-[11px] sm:text-xs font-mono font-normal text-amber-300 leading-tight mt-0.5">${p2Escape(p2ToRomaji(tok))}</span>
        </span>`;
    }).join('');
}

function p2PromptRomajiHtml(q) {
    if (!q || !q.q || /¿Cómo se lee/i.test(q.q)) return '';
    const matches = [...String(q.q).matchAll(/「([^」]+)」/g)]
        .map(m => m[1])
        .filter(p2HasJapanese);
    if (!matches.length) return '';
    const pairs = matches.map(jp => `${p2Escape(jp)} → ${p2Escape(p2ToRomaji(jp))}`).join(' · ');
    return `<p class="p2-romaji text-xs font-mono text-amber-300 mt-1">${pairs}</p>`;
}

function p2ToggleRomaji() {
    const prog = p2Progress();
    prog.showRomaji = !prog.showRomaji;
    saveStateToStorage();
    if (state.parcial && state.parcial.mode === 'p2cards') {
        renderParcial2Cards(document.getElementById('parcialWorkspaceContainer'));
    } else {
        p2Render();
    }
}

function p2RomajiToggleBtnHtml(compact = false) {
    const on = Boolean(p2Progress().showRomaji);
    const label = compact ? (on ? 'Rōmaji ON' : 'Rōmaji OFF') : (on ? 'Rōmaji debajo: ON' : 'Mostrar rōmaji: OFF');
    return `<button type="button" id="p2RomajiToggleBtn" data-action="p2ToggleRomaji" aria-pressed="${on}"
        title="Mostrar u ocultar la lectura en rōmaji debajo de las palabras japonesas"
        class="px-3 ${compact ? 'py-1.5 text-xs' : 'py-2.5 text-sm'} rounded-xl font-bold border transition active:scale-95 inline-flex items-center gap-1.5 ${on ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm' : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:text-white'}">
        <i class="fa-solid fa-spell-check"></i>
        <span>${label}</span>
    </button>`;
}

function p2Escape(text) {
    return String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const p2Pick = list => list[Math.floor(Math.random() * list.length)];

function p2PickDistinct(list, count, exclude = []) {
    return shuffleArray(list.filter(x => !exclude.includes(x))).slice(0, count);
}

function p2SpeakBtn(kana, label = 'Escuchar', extraClass = '') {
    if (!kana) return '';
    const args = p2Escape(JSON.stringify([kana]));
    return `<button type="button" data-action="speakJapanese" data-args='${args}' data-stop aria-label="${p2Escape(label)}" title="${p2Escape(label)}"
        class="w-7 h-7 shrink-0 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white inline-flex items-center justify-center text-xs transition active:scale-90 ${extraClass}">
        <i class="fa-solid fa-volume-high"></i>
    </button>`;
}

// Pregunta lista para mostrar: opciones mezcladas y respuesta correcta guardada como texto
function p2Prepare(raw, id) {
    return {
        id,
        b: raw.b,
        q: raw.q,
        s: raw.s || '',
        r: raw.r || null,
        correct: raw.o[0],
        options: shuffleArray([...raw.o]),
        e: raw.e,
        source: raw          // con la respuesta correcta en primer lugar, para guardarla en «errores»
    };
}

// ---------- Preguntas generadas ----------
function p2GenerateHour() {
    const hour = p2Pick(P2_HOURS);
    const half = Math.random() < 0.35;
    const read = h => h.hira + (half ? 'はん' : '');
    const label = `${hour.n}:${half ? '30' : '00'}`;
    const traps = (P2_HOUR_TRAPS[hour.n] || []).map(t => t + (half ? 'はん' : ''));
    const others = p2PickDistinct(P2_HOURS.filter(h => h.n !== hour.n).map(read), 3);
    const options = [read(hour), ...traps, ...others].filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
    if (Math.random() < 0.5) {
        return {
            id: `g-hora-${label}`,
            raw: {
                b: 'tiempo', q: `¿Cómo se dice «las ${label}»?`, o: options,
                e: hour.ex ? `Excepción: ${hour.n} en punto se dice ${hour.hira}.${half ? ' Y media = 〜はん.' : ''}` :
                    `${hour.n} en punto = ${hour.hira}${half ? '; y media se añade はん' : ''}.`
            }
        };
    }
    const wrongLabels = p2PickDistinct(P2_HOURS.filter(h => h.n !== hour.n).map(h => `${h.n}:${half ? '30' : '00'}`), 3);
    return {
        id: `g-lectura-hora-${label}`,
        raw: {
            b: 'tiempo', q: `¿Qué hora es 「${read(hour)}」?`, o: [label, ...wrongLabels],
            e: `${read(hour)} = ${label}.${hour.ex ? ` ${hour.hira} es una de las excepciones (よじ, しちじ, くじ).` : ''}`
        }
    };
}

function p2GenerateDay() {
    const day = p2Pick(P2_DAYS);
    const others = p2PickDistinct(P2_DAYS.filter(d => d !== day), 3);
    const r = Math.random();
    if (r < 0.35) {
        return {
            id: `g-dia-kanji-${day.es}`,
            raw: {
                b: 'tiempo', q: `¿Qué día de la semana representa 「${day.kanji}」?`,
                o: [day.es, ...others.map(d => d.es)],
                e: `${day.kanji} (${day.hira}) = ${day.es} (${day.elem}).`
            }
        };
    }
    if (r < 0.65) {
        return {
            id: `g-dia-kanji-hira-${day.es}`,
            raw: {
                b: 'tiempo', q: `¿Cómo se lee 「${day.kanji}」 (${day.es})?`,
                o: [day.hira, ...others.map(d => d.hira)],
                e: `${day.kanji} se lee ${day.hira} (${day.romaji}).`
            }
        };
    }
    if (r < 0.85) {
        return { id: `g-dia-${day.hira}`, raw: { b: 'tiempo', q: `¿Qué día es 「${day.hira}」?`, o: [day.es, ...others.map(d => d.es)], e: `${day.hira} (${day.kanji}) = ${day.es}.` } };
    }
    return { id: `g-dia-es-${day.es}`, raw: { b: 'tiempo', q: `¿Cómo se dice «${day.es}»?`, o: [day.hira, ...others.map(d => d.hira)], e: `${day.es} = ${day.kanji} (${day.hira}).` } };
}

function p2GenerateMonth() {
    const m = p2Pick(P2_MONTHS);
    const traps = P2_MONTH_TRAPS[m.n] || [];
    const others = p2PickDistinct(P2_MONTHS.filter(x => x !== m), 3);
    if (Math.random() < 0.55) {
        const readOpts = [m.hira, ...traps, ...others.map(x => x.hira)].filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
        return {
            id: `g-mes-read-${m.n}`,
            raw: {
                b: 'tiempo', q: `¿Cómo se lee 「${m.kanji}」 (${m.es})?`,
                o: readOpts,
                e: `${m.kanji} (${m.es}) se lee ${m.hira}.${m.ex ? ' ¡Es una de las 3 excepciones (4月 しがつ, 7月 しちがつ, 9月 くがつ)!' : ''}`
            }
        };
    }
    return {
        id: `g-mes-es-${m.n}`,
        raw: {
            b: 'tiempo', q: `¿Qué mes es 「${m.hira}」?`,
            o: [m.es, ...others.map(x => x.es)],
            e: `${m.hira} (${m.kanji}) corresponde a ${m.es}.`
        }
    };
}

function p2GenerateVerb() {
    const verb = p2Pick(P2_VERBS);
    const kind = Math.random();
    const neg = verb.masu.replace(/ます$/, 'ません');
    const pastPos = verb.masu.replace(/ます$/, 'ました');
    const pastNeg = verb.masu.replace(/ます$/, 'ませんでした');

    if (kind < 0.24) {
        return {
            id: `g-masu-${verb.dict}`,
            raw: {
                b: 'verbos', q: `Forma ます (presente +) de 「${verb.dict}」 (${verb.es}):`, o: [verb.masu, ...P2_VERB_TRAPS[verb.dict]],
                e: verb.type === 'ru' ? `Verbo ru: se quita る y se añade ます → ${verb.masu}.` :
                    verb.type === 'u' ? `Verbo u: la última sílaba pasa a la fila i + ます → ${verb.masu}.${verb.trap ? ' ¡Ojo! かえる parece verbo ru, pero es u.' : ''}` :
                        `Irregular: ${verb.dict} → ${verb.masu}.`
            }
        };
    }
    if (kind < 0.46) {
        const traps = P2_VERB_TRAPS[verb.dict].map(t => t.replace(/ます$/, 'ません'));
        return {
            id: `g-masen-${verb.dict}`,
            raw: { b: 'verbos', q: `Forma negativa presente (〜ません) de 「${verb.dict}」:`, o: [neg, ...traps], e: `${verb.masu} → ${neg}: se cambia ます por ません.` }
        };
    }
    if (kind < 0.68) {
        const traps = P2_VERB_TRAPS[verb.dict].map(t => t.replace(/ます$/, 'ました'));
        return {
            id: `g-mashita-${verb.dict}`,
            raw: {
                b: 'verbos', q: `Pasado afirmativo (〜ました) de 「${verb.masu}」 (${verb.es}):`,
                o: [pastPos, ...traps],
                e: `En pasado afirmativo, 〜ます cambia a 〜ました: ${verb.masu} → ${pastPos}.`
            }
        };
    }
    if (kind < 0.88) {
        const stemTrap = P2_VERB_TRAPS[verb.dict][0].replace(/ます$/, 'ませんでした');
        const opts = [pastNeg, neg, pastPos, stemTrap].filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
        return {
            id: `g-masendeshita-${verb.dict}`,
            raw: {
                b: 'verbos', q: `Pasado negativo (〜ませんでした) de 「${verb.masu}」 (${verb.es}):`,
                o: opts,
                e: `En pasado negativo se añade でした al negativo: ${neg} → ${pastNeg}.`
            }
        };
    }
    const names = Object.values(P2_TYPE_NAMES);
    return {
        id: `g-tipo-${verb.dict}`,
        raw: {
            b: 'verbos', q: `¿Qué tipo de verbo es 「${verb.dict}」 (${verb.es})?`,
            o: [P2_TYPE_NAMES[verb.type], ...names.filter(n => n !== P2_TYPE_NAMES[verb.type]), 'Adjetivo'],
            e: `${verb.dict} → ${verb.masu}: ${P2_TYPE_NAMES[verb.type].toLowerCase()}.${verb.trap ? ' Termina en -eru, pero es verbo u.' : ''}`
        }
    };
}

function p2GenerateNumber() {
    if (Math.random() < 0.5) {
        const item = p2Pick(P2_NUMBERS_KANJI);
        const others = p2PickDistinct(P2_NUMBERS_KANJI.filter(x => x !== item), 3);
        if (Math.random() < 0.5) {
            return {
                id: `g-num-kanji-${item.n}`,
                raw: {
                    b: 'numeros', q: `¿Qué cantidad representa el kanji 「${item.kanji}」?`,
                    o: [item.n, ...others.map(x => x.n)],
                    e: `${item.kanji} (${item.hira} / ${item.romaji}) representa ${item.n}.`
                }
            };
        }
        return {
            id: `g-num-es-${item.n}`,
            raw: {
                b: 'numeros', q: `¿Cuál es el kanji del número «${item.n}»?`,
                o: [item.kanji, ...others.map(x => x.kanji)],
                e: `${item.n} se escribe ${item.kanji} (${item.hira}).`
            }
        };
    }
    const ex = p2Pick(P2_NUMBER_EXAMPLES);
    const others = p2PickDistinct(P2_NUMBER_EXAMPLES.filter(x => x !== ex), 3);
    if (Math.random() < 0.55) {
        return {
            id: `g-num-ex-read-${ex.num}`,
            raw: {
                b: 'numeros', q: `¿Cómo se lee 「${ex.num} (${ex.kanji})」?`,
                o: [ex.hira, ...others.map(x => x.hira)],
                e: `${ex.num} (${ex.kanji}) = ${ex.hira} (${ex.romaji}). ${ex.note}.`
            }
        };
    }
    return {
        id: `g-num-ex-val-${ex.num}`,
        raw: {
            b: 'numeros', q: `¿Qué número corresponde a 「${ex.kanji}」?`,
            o: [ex.num, ...others.map(x => x.num)],
            e: `${ex.kanji} se lee ${ex.hira} y equivale a ${ex.num}.`
        }
    };
}

function p2GenerateKatakana() {
    const item = p2Pick(P2_KATAKANA);
    const others = p2PickDistinct(P2_KATAKANA.filter(x => x.es !== item.es && x.jp !== item.jp), 3);
    if (Math.random() < 0.55) {
        return {
            id: `g-kata-es-${item.jp}`,
            raw: {
                b: 'katakana', q: `¿Qué significa la palabra en katakana 「${item.jp}」?`,
                o: [item.es, ...others.map(x => x.es)],
                e: `${item.jp} se lee «${item.romaji}» y significa ${item.es}.`
            }
        };
    }
    return {
        id: `g-kata-jp-${item.jp}`,
        raw: {
            b: 'katakana', q: `¿Cómo se escribe «${item.es}» en katakana?`,
            o: [item.jp, ...others.map(x => x.jp)],
            e: `«${item.es}» en katakana es ${item.jp} (${item.romaji}).`
        }
    };
}

const P2_GENERATORS = {
    tiempo: [p2GenerateHour, p2GenerateDay, p2GenerateMonth],
    verbos: [p2GenerateVerb],
    numeros: [p2GenerateNumber],
    katakana: [p2GenerateKatakana]
};

// Candidatas de un bloque: las del banco más algunas generadas
function p2Candidates(block, generated = 6) {
    const list = P2_BANK.map((raw, i) => ({ id: `b${i}`, raw })).filter(x => x.raw.b === block);
    const gens = P2_GENERATORS[block] || [];
    for (let i = 0; i < generated && gens.length; i++) list.push(p2Pick(gens)());
    return list;
}

function p2TakeUnique(candidates, count, used) {
    const out = [];
    for (const c of shuffleArray(candidates)) {
        if (out.length >= count) break;
        if (used.has(c.id)) continue;
        used.add(c.id);
        out.push(p2Prepare(c.raw, c.id));
    }
    return out;
}

function p2BuildExam() {
    const used = new Set();
    const questions = [];
    P2_BLOCKS.forEach(block => questions.push(...p2TakeUnique(p2Candidates(block.id), block.examCount, used)));
    return questions;
}

function p2BuildPractice(blockId, count = 10) {
    return p2TakeUnique(p2Candidates(blockId, 12), count, new Set());
}

// ---------- Inicio de sesiones ----------
function p2StartExam() {
    p2StartSession('exam', p2BuildExam(), 'Simulacro de examen');
    p2Session.deadline = Date.now() + P2_EXAM.minutes * 60 * 1000;
    p2StartTimer();
    p2Render();
}

function p2StartPractice(blockId) {
    if (state.parcial && state.parcial.mode !== 'p2sim') {
        state.parcial.mode = 'p2sim';
        if (typeof setParcialMode === 'function') setParcialMode('p2sim', true);
    }
    const block = P2_BLOCKS.find(b => b.id === blockId);
    p2StartSession('practice', p2BuildPractice(blockId), `Práctica: ${block ? block.name : blockId}`);
    p2Render();
}

function p2StartReview() {
    const mistakes = p2Progress().mistakes;
    if (!mistakes.length) {
        showToast('No tienes errores guardados. ¡Haz un simulacro primero!', 'info');
        return;
    }
    const questions = shuffleArray([...mistakes]).slice(0, 15).map(m => p2Prepare(m.raw, m.id));
    p2StartSession('review', questions, 'Repaso de mis errores');
    p2Render();
}

function p2StartSession(mode, questions, title) {
    p2StopTimer();
    p2Session = { mode, title, questions, index: 0, answers: questions.map(() => null), startedAt: Date.now(), finished: false };
}

function p2ExitSession() {
    if (p2Session && p2Session.mode === 'exam' && !p2Session.finished &&
        !confirm('¿Salir del simulacro? Se perderán las respuestas de este intento.')) return;
    p2StopTimer();
    p2Session = null;
    p2Render();
}

// ---------- Temporizador del examen ----------
function p2StartTimer() {
    p2StopTimer();
    p2TimerId = setInterval(() => {
        if (!p2Session || p2Session.finished) { p2StopTimer(); return; }
        const left = p2Session.deadline - Date.now();
        const el = document.getElementById('p2Timer');
        if (el) el.textContent = p2FormatTime(left);
        if (left <= 0) {
            showToast('⏰ Se acabó el tiempo. El simulacro se ha entregado.', 'info');
            p2FinishExam();
        }
    }, 1000);
}

function p2StopTimer() {
    if (p2TimerId) clearInterval(p2TimerId);
    p2TimerId = null;
}

function p2FormatTime(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

// ---------- Respuestas ----------
function p2Choose(optionIndex) {
    const s = p2Session;
    if (!s || s.finished) return;
    const q = s.questions[s.index];
    if (!q || optionIndex < 0 || optionIndex >= q.options.length) return;

    if (s.mode === 'exam') {
        s.answers[s.index] = q.options[optionIndex];
        p2Render();
        return;
    }
    if (s.answers[s.index] !== null) return;      // en práctica no se cambia la respuesta
    const chosen = q.options[optionIndex];
    s.answers[s.index] = chosen;
    const ok = chosen === q.correct;
    state.parcial.totalAnswered = (state.parcial.totalAnswered || 0) + 1;
    if (ok) {
        state.parcial.score = (state.parcial.score || 0) + 1;
        state.parcial.streak = (state.parcial.streak || 0) + 1;
        if (typeof addXP === 'function') addXP(5);
        if (typeof playSuccessChime === 'function') playSuccessChime();
        if (s.mode === 'review') p2ForgetMistake(q.id);
    } else {
        state.parcial.streak = 0;
        if (typeof playErrorBuzzer === 'function') playErrorBuzzer();
        p2RememberMistake(q);
    }
    if (typeof updateParcialHeaderStats === 'function') updateParcialHeaderStats();
    saveStateToStorage();
    p2Render();
}

function p2Go(delta) {
    const s = p2Session;
    if (!s || s.finished) return;
    const next = s.index + delta;
    if (next >= 0 && next < s.questions.length) {
        s.index = next;
        p2Render();
    } else if (next >= s.questions.length && s.mode !== 'exam') {
        p2FinishPractice();
    }
}

function p2GoTo(index) {
    if (!p2Session || p2Session.finished) return;
    p2Session.index = Math.max(0, Math.min(p2Session.questions.length - 1, index));
    p2Render();
}

function p2RememberMistake(q) {
    const prog = p2Progress();
    if (!prog.mistakes.some(m => m.id === q.id)) {
        prog.mistakes.unshift({ id: q.id, raw: q.source });
        prog.mistakes = prog.mistakes.slice(0, 60);
    }
}

function p2ForgetMistake(id) {
    const prog = p2Progress();
    prog.mistakes = prog.mistakes.filter(m => m.id !== id);
}

function p2ConfirmFinish() {
    const s = p2Session;
    if (!s) return;
    const blank = s.answers.filter(a => a === null).length;
    if (blank && !confirm(`Tienes ${blank} pregunta(s) sin responder. ¿Entregar el simulacro?`)) return;
    p2FinishExam();
}

function p2Grade(correct, total) {
    return total ? Math.round((correct / total) * 50) / 10 : 0;
}

function p2Summary() {
    const s = p2Session;
    const byBlock = {};
    let correct = 0;
    s.questions.forEach((q, i) => {
        const ok = s.answers[i] === q.correct;
        if (ok) correct++;
        byBlock[q.b] = byBlock[q.b] || { ok: 0, total: 0 };
        byBlock[q.b].total++;
        if (ok) byBlock[q.b].ok++;
    });
    return { correct, total: s.questions.length, grade: p2Grade(correct, s.questions.length), byBlock };
}

function p2FinishExam() {
    const s = p2Session;
    if (!s || s.finished) return;
    p2StopTimer();
    s.finished = true;
    s.finishedAt = Date.now();
    const sum = p2Summary();
    s.questions.forEach((q, i) => { if (s.answers[i] !== q.correct) p2RememberMistake(q); });

    const prog = p2Progress();
    prog.history.unshift({
        date: new Date(s.finishedAt).toISOString(),
        correct: sum.correct,
        total: sum.total,
        grade: sum.grade,
        seconds: Math.round((s.finishedAt - s.startedAt) / 1000),
        byBlock: sum.byBlock
    });
    prog.history = prog.history.slice(0, 20);

    state.parcial.totalAnswered = (state.parcial.totalAnswered || 0) + sum.total;
    state.parcial.score = (state.parcial.score || 0) + sum.correct;
    if (typeof addXP === 'function') addXP(sum.correct * 5);
    if (typeof updateParcialHeaderStats === 'function') updateParcialHeaderStats();
    saveStateToStorage();
    p2Render();
}

function p2FinishPractice() {
    const s = p2Session;
    if (!s) return;
    s.finished = true;
    s.finishedAt = Date.now();
    p2Render();
}

// ---------- Interfaz: Simulacro y Práctica ----------
function p2Render() {
    const container = document.getElementById('parcialWorkspaceContainer');
    if (!container || !state.parcial || state.parcial.mode !== 'p2sim') return;
    if (!p2Session) container.innerHTML = p2HomeHtml();
    else if (p2Session.finished) container.innerHTML = p2ResultsHtml();
    else container.innerHTML = p2QuestionHtml();
}

const P2_CARD = 'bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5';
const P2_BTN = 'px-4 py-2.5 rounded-xl text-sm font-bold transition active:scale-98';

function p2HomeHtml() {
    const prog = p2Progress();
    const blocks = P2_BLOCKS.map(b => {
        const count = P2_BANK.filter(q => q.b === b.id).length + (P2_GENERATORS[b.id] ? 12 : 0);
        return `<button type="button" data-action="p2StartPractice" data-args='["${b.id}"]'
            class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/60 text-left transition active:scale-98">
            <span class="text-sm font-bold text-white flex items-center gap-2"><i class="fa-solid ${b.icon} stage-theme-accent-text"></i>${b.name}</span>
            <span class="text-[11px] text-slate-400">${count}+ preguntas</span>
        </button>`;
    }).join('');
    const history = prog.history.slice(0, 5).map(h => {
        const d = new Date(h.date);
        const pass = h.grade >= P2_EXAM.passGrade;
        return `<li class="flex items-center justify-between text-xs py-1.5 border-b border-slate-800 last:border-0">
            <span class="text-slate-400">${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span class="text-slate-300">${h.correct}/${h.total}</span>
            <span class="font-black ${pass ? 'text-emerald-400' : 'text-rose-400'}">${h.grade.toFixed(1)}</span>
        </li>`;
    }).join('');

    return `<div class="space-y-5">
        <div class="${P2_CARD} border-emerald-500/40">
            <h3 class="text-lg font-black text-white flex items-center gap-2"><i class="fa-solid fa-file-pen stage-theme-accent-text"></i> Simulacro de examen final (L2–L3)</h3>
            <p class="text-sm text-slate-300 mt-1">${P2_EXAM.questions} preguntas de opción múltiple de los 9 temas de la guía · ${P2_EXAM.minutes} minutos ·
                nota sobre 5,0 (aprueba con ${P2_EXAM.passGrade.toFixed(1)}). Verás los resultados al entregar, como en el parcial virtual.</p>
            <div class="flex flex-wrap gap-2 mt-4">
                <button type="button" id="p2StartExamBtn" data-action="p2StartExam" class="${P2_BTN} stage-theme-primary-btn shadow-md">
                    <i class="fa-solid fa-play mr-1"></i> Empezar simulacro
                </button>
                <button type="button" data-action="setParcialMode" data-args='["p2guide"]' class="${P2_BTN} bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700">
                    <i class="fa-solid fa-book-bookmark mr-1"></i> Ver guía de la profe
                </button>
                <button type="button" data-action="setParcialMode" data-args='["p2cards"]' class="${P2_BTN} bg-slate-800 text-sky-300 hover:bg-slate-700 border border-slate-700">
                    <i class="fa-solid fa-clone mr-1"></i> Tarjetas de repaso
                </button>
                ${p2RomajiToggleBtnHtml(false)}
            </div>
            <p class="text-[11px] text-slate-400 mt-2">Puedes activar o desactivar <strong>Rōmaji</strong> en cualquier momento para ver la pronunciación debajo de cada palabra (hiragana y katakana).</p>
        </div>
        <div class="${P2_CARD}">
            <h3 class="text-base font-black text-white">Práctica por tema</h3>
            <p class="text-xs text-slate-400 mt-1 mb-3">10 preguntas del tema elegido, con la respuesta, audio y explicación al instante.</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">${blocks}</div>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
            <div class="${P2_CARD}">
                <h3 class="text-base font-black text-white">Repasar mis errores</h3>
                <p class="text-xs text-slate-400 mt-1">${prog.mistakes.length ? `Tienes ${prog.mistakes.length} pregunta(s) para repasar. Al acertarlas, salen de la lista.` : 'Aquí aparecerán las preguntas que falles.'}</p>
                <button type="button" data-action="p2StartReview" ${prog.mistakes.length ? '' : 'disabled'}
                    class="${P2_BTN} mt-3 bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 disabled:opacity-40">Repasar (${prog.mistakes.length})</button>
            </div>
            <div class="${P2_CARD}">
                <h3 class="text-base font-black text-white">Últimos simulacros</h3>
                ${history ? `<ul class="mt-2">${history}</ul>` : '<p class="text-xs text-slate-400 mt-1">Todavía no has hecho ningún simulacro.</p>'}
            </div>
        </div>
    </div>`;
}

function p2QuestionHtml() {
    const s = p2Session;
    const q = s.questions[s.index];
    const answer = s.answers[s.index];
    const isExam = s.mode === 'exam';
    const revealed = !isExam && answer !== null;
    const block = P2_BLOCKS.find(b => b.id === q.b);
    const reading = q.r ? P2_READINGS[q.r] : null;
    const progressPct = Math.round(((s.index + 1) / s.questions.length) * 100);
    const hasJpAudio = p2HasJapanese(q.correct);
    const showRomaji = Boolean(p2Progress().showRomaji);

    const options = q.options.map((opt, i) => {
        let style = 'bg-slate-950/60 border-slate-700 text-white hover:border-emerald-500/60';
        if (isExam && answer === opt) style = 'p2-selected bg-emerald-500/15 border-emerald-400 text-white';
        if (revealed) {
            if (opt === q.correct) style = 'bg-emerald-500/20 border-emerald-400 text-emerald-200';
            else if (opt === answer) style = 'bg-rose-500/20 border-rose-400 text-rose-200';
            else style = 'bg-slate-950/40 border-slate-800 text-slate-500';
        }
        return `<button type="button" data-action="p2Choose" data-args='[${i}]' id="p2-opt-${i}" ${revealed ? 'disabled' : ''}
            class="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition active:scale-98 ${style}">
            <span class="w-7 h-7 shrink-0 rounded-lg bg-slate-800 text-slate-300 text-xs font-black flex items-center justify-center">${P2_LETTERS[i]}</span>
            <span class="flex-1 min-w-0">
                <span class="font-jp text-base sm:text-lg font-bold block">${p2Escape(opt)}</span>
                ${showRomaji && p2HasJapanese(opt) ? `<span class="p2-romaji block text-xs font-mono font-normal text-amber-300 mt-0.5">${p2Escape(p2ToRomaji(opt))}</span>` : ''}
            </span>
        </button>`;
    }).join('');

    const map = isExam ? `<div class="flex flex-wrap gap-1.5 mt-4" aria-label="Mapa de preguntas">${s.questions.map((_, i) =>
        `<button type="button" data-action="p2GoTo" data-args='[${i}]' aria-label="Pregunta ${i + 1}"
            class="w-8 h-8 rounded-lg text-xs font-bold border ${i === s.index ? 'border-emerald-400 text-white' : 'border-slate-700 text-slate-400'} ${s.answers[i] !== null ? 'bg-emerald-500/20' : 'bg-slate-950/60'}">${i + 1}</button>`).join('')}</div>` : '';

    const nav = isExam ? `
        <div class="flex flex-wrap items-center justify-between gap-2 mt-5">
            <button type="button" data-action="p2Go" data-args='[-1]' ${s.index === 0 ? 'disabled' : ''} class="${P2_BTN} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 disabled:opacity-40"><i class="fa-solid fa-arrow-left mr-1"></i> Anterior</button>
            <button type="button" id="p2FinishBtn" data-action="p2ConfirmFinish" class="${P2_BTN} bg-amber-500 text-slate-950 hover:bg-amber-400">Entregar</button>
            <button type="button" data-action="p2Go" data-args='[1]' ${s.index === s.questions.length - 1 ? 'disabled' : ''} class="${P2_BTN} stage-theme-primary-btn disabled:opacity-40">Siguiente <i class="fa-solid fa-arrow-right ml-1"></i></button>
        </div>` : (revealed ? `
        <div class="mt-4 p-4 rounded-xl border ${answer === q.correct ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-rose-500/40 bg-rose-500/10'}">
            <div class="flex items-start justify-between gap-2">
                <p class="font-black ${answer === q.correct ? 'text-emerald-300' : 'text-rose-300'}">${answer === q.correct ? '✓ ¡Correcto!' : `✗ La respuesta correcta es: <span class="font-jp">${p2Escape(q.correct)}</span>`}</p>
                ${hasJpAudio ? p2SpeakBtn(q.correct.split(' / ')[0], 'Escuchar respuesta') : ''}
            </div>
            <p class="text-sm text-slate-200 mt-1">${p2Escape(q.e)}</p>
        </div>
        <div class="flex justify-end mt-4">
            <button type="button" id="p2NextBtn" data-action="p2Go" data-args='[1]' class="${P2_BTN} stage-theme-primary-btn">${s.index === s.questions.length - 1 ? 'Ver resumen' : 'Siguiente'} <i class="fa-solid fa-arrow-right ml-1"></i></button>
        </div>` : '');

    return `<div class="${P2_CARD} space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
                <p class="text-[11px] uppercase tracking-wider font-bold text-slate-400">${p2Escape(s.title)}</p>
                <p class="text-sm font-bold text-white">Pregunta ${s.index + 1} de ${s.questions.length} · <span class="stage-theme-accent-text">${block ? block.name : ''}</span></p>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                ${p2RomajiToggleBtnHtml(true)}
                ${isExam ? `<span class="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 font-mono font-bold text-amber-300" aria-label="Tiempo restante"><i class="fa-solid fa-clock mr-1"></i><span id="p2Timer">${p2FormatTime(s.deadline - Date.now())}</span></span>` : ''}
                <button type="button" data-action="p2ExitSession" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800">Salir</button>
            </div>
        </div>
        <div class="h-1.5 rounded-full bg-slate-800 overflow-hidden"><div class="h-full bg-emerald-500 transition-all" style="width:${progressPct}%"></div></div>
        ${reading ? `<div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div class="flex items-center justify-between gap-2 mb-1">
                <p class="text-xs font-bold text-slate-400">Lectura: <span class="font-jp">${p2Escape(reading.title)}</span>${showRomaji ? ` <span class="p2-romaji font-mono font-normal text-amber-300">(${p2Escape(p2ToRomaji(reading.title))})</span>` : ''}</p>
                ${p2SpeakBtn(reading.text, 'Escuchar lectura')}
            </div>
            ${showRomaji
                ? `<div class="font-jp text-base leading-normal text-white flex flex-wrap pt-1">${p2WordByWordHtml(reading.text)}</div>`
                : `<p class="font-jp text-base leading-loose text-white">${p2Escape(reading.text)}</p>`}
        </div>` : ''}
        <div>
            <p class="text-sm sm:text-base text-slate-200 font-semibold">${p2Escape(q.q)}</p>
            ${showRomaji ? p2PromptRomajiHtml(q) : ''}
            ${q.s ? (showRomaji
                ? `<div class="font-jp text-xl sm:text-2xl font-bold text-white mt-2 flex flex-wrap">${p2WordByWordHtml(q.s)}</div>`
                : `<p class="font-jp text-xl sm:text-2xl font-bold text-white mt-2 leading-relaxed">${p2Escape(q.s)}</p>`) : ''}
        </div>
        <div class="grid gap-2.5">${options}</div>
        <p class="hidden sm:block text-[11px] text-slate-500">Teclado: 1–4 o A–D para responder${isExam ? ', ← → para moverte' : ', Enter para seguir'}.</p>
        ${nav}
        ${map}
    </div>`;
}

function p2ResultsHtml() {
    const s = p2Session;
    const sum = p2Summary();
    const isExam = s.mode === 'exam';
    const pass = sum.grade >= P2_EXAM.passGrade;
    const minutes = Math.round(((s.finishedAt || Date.now()) - s.startedAt) / 60000);
    const blocks = Object.entries(sum.byBlock).map(([id, r]) => {
        const b = P2_BLOCKS.find(x => x.id === id);
        const pct = Math.round((r.ok / r.total) * 100);
        return `<div>
            <div class="flex justify-between text-xs"><span class="text-slate-300">${b ? b.name : id}</span><span class="font-bold text-white">${r.ok}/${r.total}</span></div>
            <div class="h-2 rounded-full bg-slate-800 mt-1 overflow-hidden"><div class="h-full ${pct >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}" style="width:${pct}%"></div></div>
        </div>`;
    }).join('');
    const showRomaji = Boolean(p2Progress().showRomaji);
    const wrong = s.questions.map((q, i) => ({ q, a: s.answers[i] })).filter(x => x.a !== x.q.correct).map(({ q, a }) => `
        <li class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <p class="text-xs text-slate-400">${p2Escape(q.q)}</p>
            ${q.s ? `<p class="font-jp font-bold text-white">${p2Escape(q.s)}</p>` : ''}
            ${q.s && showRomaji ? `<p class="p2-romaji text-xs font-mono text-amber-300">${p2Escape(p2ToRomaji(q.s))}</p>` : ''}
            <p class="text-sm mt-1"><span class="text-rose-300">Tu respuesta: <span class="font-jp">${a === null ? '(sin responder)' : p2Escape(a)}</span></span> ·
                <span class="text-emerald-300">Correcta: <span class="font-jp">${p2Escape(q.correct)}</span></span></p>
            <p class="text-xs text-slate-300 mt-1">${p2Escape(q.e)}</p>
        </li>`).join('');

    return `<div class="space-y-5">
        <div class="${P2_CARD} text-center">
            <p class="text-xs uppercase tracking-wider font-bold text-slate-400">${p2Escape(s.title)}</p>
            <p id="p2Grade" class="text-5xl font-black mt-2 ${pass ? 'text-emerald-400' : 'text-rose-400'}">${sum.grade.toFixed(1)}</p>
            <p class="text-sm text-slate-300 mt-1">${sum.correct} de ${sum.total} correctas${isExam ? ` · ${minutes} min` : ''} ·
                <span class="font-bold ${pass ? 'text-emerald-300' : 'text-rose-300'}">${pass ? 'Aprobado' : 'Por debajo de ' + P2_EXAM.passGrade.toFixed(1)}</span></p>
            <div class="flex flex-wrap justify-center gap-2 mt-4">
                ${isExam ? `<button type="button" data-action="p2StartExam" class="${P2_BTN} stage-theme-primary-btn">Nuevo simulacro</button>` : ''}
                <button type="button" data-action="p2StartReview" class="${P2_BTN} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">Repasar mis errores</button>
                <button type="button" data-action="p2ExitSession" class="${P2_BTN} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">Volver</button>
            </div>
        </div>
        <div class="${P2_CARD} space-y-3"><h3 class="text-base font-black text-white">Aciertos por tema</h3>${blocks}</div>
        ${wrong ? `<div class="${P2_CARD}"><h3 class="text-base font-black text-white mb-3">Revisa estas preguntas</h3><ul class="space-y-2">${wrong}</ul></div>` :
            `<div class="${P2_CARD} text-center text-emerald-300 font-bold">¡Sin errores! 🎉</div>`}
    </div>`;
}

// ---------- Guía completa del parcial final (Tobira L2 y L3) ----------
const P2_GUIDE_TABS = [
    ['all', 'Todo'],
    ['katakana', '1. Katakana'],
    ['numeros', '2. Números'],
    ['tiempo', '3–4. Tiempo'],
    ['verbos', '5. Verbos ±Pasado'],
    ['vocabulario', '6. Vocabulario'],
    ['gramatica', '7–8. Gramática'],
    ['cultura', '9. Cultura']
];

function p2SetGuideSection(sec) {
    p2GuideSection = sec || 'all';
    const container = document.getElementById('parcialWorkspaceContainer');
    if (container && state.parcial && state.parcial.mode === 'p2guide') {
        renderParcial2Guide(container);
    }
}

function p2PracticeBadge(blockId, label = 'Practicar tema') {
    return `<button type="button" data-action="p2StartPractice" data-args='["${blockId}"]'
        class="px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition">
        <i class="fa-solid fa-play mr-1"></i>${label}
    </button>`;
}

function renderParcial2Guide(container) {
    const show = id => p2GuideSection === 'all' || p2GuideSection === id;

    const filterBar = `<div class="flex flex-wrap gap-1.5 bg-slate-900 border border-slate-800 p-2 rounded-2xl" role="group" aria-label="Filtrar secciones de la guía">
        ${P2_GUIDE_TABS.map(([id, label]) => `<button type="button" data-action="p2SetGuideSection" data-args='["${id}"]'
            class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${p2GuideSection === id ? 'stage-theme-primary-btn shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'}">${label}</button>`).join('')}
    </div>`;

    // 1. Katakana
    const katakanaHtml = !show('katakana') ? '' : `<div class="${P2_CARD} space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="text-base font-black text-white">1. Katakana — Lectura de palabras extranjeras</h3>
            ${p2PracticeBadge('katakana')}
        </div>
        <p class="text-xs text-slate-300">Recuerda: el trazo <strong class="font-jp text-amber-300">ー</strong> alarga la vocal anterior (ej. コーヒー = k<strong>oo</strong>h<strong>ii</strong>, コンピューター = konpy<strong>uu</strong>t<strong>aa</strong>).</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            ${P2_KATAKANA.map(k => `<div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2">
                <div class="min-w-0">
                    <div class="font-jp font-bold text-white truncate">${k.jp}</div>
                    <div class="text-[11px] font-mono text-emerald-400 truncate">${k.romaji}</div>
                    <div class="text-xs text-slate-300 truncate">${k.es}</div>
                </div>
                ${p2SpeakBtn(k.jp, `Escuchar ${k.jp}`)}
            </div>`).join('')}
        </div>
    </div>`;

    // 2. Números y Kanji 1 - 10,000+
    const numerosHtml = !show('numeros') ? '' : `<div class="${P2_CARD} space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="text-base font-black text-white">2. Números y Kanji (1 – 10.000+)</h3>
            ${p2PracticeBadge('numeros')}
        </div>
        <p class="text-xs text-slate-300">Tip: en japonés se agrupa por <strong class="font-jp text-amber-300">万 (まん = 10.000)</strong>, cada 4 ceros, no por miles como en español.</p>
        <div class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2">
            ${P2_NUMBERS_KANJI.map(item => `<div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
                <div class="text-[11px] font-mono text-slate-400">${item.n}</div>
                <div class="font-jp text-xl font-black text-white">${item.kanji}</div>
                <div class="font-jp text-xs text-amber-300 font-bold">${item.hira}</div>
                <div class="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-400">
                    <span>${item.romaji}</span>${p2SpeakBtn(item.audio, `Escuchar ${item.n}`, 'w-6 h-6')}
                </div>
            </div>`).join('')}
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead><tr class="text-[10px] uppercase text-slate-400 border-b border-slate-800"><th class="py-1.5">Número</th><th>Kanji</th><th>Lectura</th><th>Nota</th><th>Audio</th></tr></thead>
                <tbody class="divide-y divide-slate-800/70">
                    ${P2_NUMBER_EXAMPLES.map(ex => `<tr>
                        <td class="py-2 font-mono font-bold text-white">${ex.num}</td>
                        <td class="font-jp font-bold text-amber-300">${ex.kanji}</td>
                        <td class="font-jp text-slate-200">${ex.hira} <span class="text-[10px] font-mono text-slate-400">(${ex.romaji})</span></td>
                        <td class="text-slate-400">${ex.note}</td>
                        <td>${p2SpeakBtn(ex.hira, `Escuchar ${ex.num}`, 'w-6 h-6')}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
    </div>`;

    // 3–4. Horas, Días (Kanji) y Meses
    const hours = P2_HOURS.map(h => `<div class="p-2 rounded-lg text-center border ${h.ex ? 'border-amber-400/60 bg-amber-500/10' : 'border-slate-800 bg-slate-950/60'}">
        <div class="text-xs text-slate-400">${h.n}:00</div>
        <div class="font-jp font-bold ${h.ex ? 'text-amber-300' : 'text-white'}">${h.hira}</div>
        <div class="mt-1">${p2SpeakBtn(h.hira, `Escuchar ${h.n}:00`, 'w-6 h-6')}</div>
    </div>`).join('');
    const days = P2_DAYS.map(d => `<div class="p-2.5 rounded-xl text-center border border-slate-800 bg-slate-950/60 space-y-1">
        <div class="text-xs font-bold text-slate-300">${d.es}</div>
        <div class="font-jp text-base font-black text-white">${d.kanji}</div>
        <div class="font-jp text-xs text-amber-300">${d.hira}</div>
        <div class="text-[10px] text-slate-400">${d.elem} · ${p2SpeakBtn(d.hira, `Escuchar ${d.es}`, 'w-6 h-6')}</div>
    </div>`).join('');
    const months = P2_MONTHS.map(m => `<div class="p-2 rounded-lg text-center border ${m.ex ? 'border-amber-400/60 bg-amber-500/10' : 'border-slate-800 bg-slate-950/60'} space-y-0.5">
        <div class="text-[11px] text-slate-400 capitalize">${m.es}</div>
        <div class="font-jp font-black ${m.ex ? 'text-amber-300' : 'text-white'}">${m.kanji}</div>
        <div class="font-jp text-xs ${m.ex ? 'text-amber-200' : 'text-slate-200'}">${m.hira}</div>
        <div>${p2SpeakBtn(m.hira, `Escuchar ${m.es}`, 'w-6 h-6')}</div>
    </div>`).join('');

    const tiempoHtml = !show('tiempo') ? '' : `<div class="space-y-4">
        <div class="${P2_CARD} space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="text-base font-black text-white">3. Días de la semana (Kanji 〜曜日) y Horas 〜じ</h3>
                ${p2PracticeBadge('tiempo')}
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">${days}</div>
            <p class="text-xs text-slate-400">こんしゅう = esta semana · せんしゅう = semana pasada · らいしゅう = próxima · しゅうまつ = fin de semana · なんようび = ¿qué día?</p>
            <h4 class="text-sm font-black text-white pt-2">Horas 〜じ <span class="text-xs text-amber-300 font-bold">(en amarillo, las 3 excepciones: 4, 7 y 9)</span></h4>
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-1.5">${hours}</div>
            <p class="text-xs text-slate-400">〜はん = y media (くじはん) · 〜ごろ = alrededor de (にじごろ) · ごぜん = a. m. · ごご = p. m., antes de la hora (ごご さんじ) · なんじ = ¿qué hora? · いつ = ¿cuándo?</p>
        </div>
        <div class="${P2_CARD} space-y-2">
            <h3 class="text-base font-black text-white">4. Meses del año <span class="text-xs text-amber-300 font-bold">(Número + 月 がつ · excepciones: 4月, 7月, 9月)</span></h3>
            <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">${months}</div>
        </div>
    </div>`;

    // 5. Verbos - Forma 〜ます Presente y Pasado
    const verbsRows = P2_VERBS.map(v => {
        const pastPos = v.masu.replace(/ます$/, 'ました');
        const presNeg = v.masu.replace(/ます$/, 'ません');
        const pastNeg = v.masu.replace(/ます$/, 'ませんでした');
        return `<tr class="border-b border-slate-800">
            <td class="py-2 pr-2">
                <div class="font-bold text-white text-xs">${v.es}</div>
                <div class="text-[11px] font-jp text-slate-400">${v.dict} · <span class="${v.type === 'ru' ? 'text-sky-300' : v.type === 'u' ? 'text-emerald-300' : 'text-amber-300'}">${v.type === 'irr' ? 'irr' : v.type}${v.trap ? ' ⚠️' : ''}</span></div>
            </td>
            <td class="py-2 pr-2 font-jp text-white font-bold">${v.masu}</td>
            <td class="py-2 pr-2 font-jp text-emerald-300 font-bold">${pastPos}</td>
            <td class="py-2 pr-2 font-jp text-slate-300">${presNeg}</td>
            <td class="py-2 pr-2 font-jp text-rose-300">${pastNeg}</td>
            <td class="py-2 text-center">${p2SpeakBtn(v.masu, `Escuchar ${v.masu}`, 'w-6 h-6')}</td>
        </tr>`;
    }).join('');
    const sukiRow = `<tr class="bg-amber-500/10 border-t border-amber-500/30">
        <td class="py-2 px-1">
            <div class="font-bold text-amber-300 text-xs">${P2_SUKI_FORMS.label} (usa が)</div>
            <div class="text-[10px] text-slate-400">Adjetivo-na</div>
        </td>
        <td class="py-2 pr-2 font-jp text-white font-bold">${P2_SUKI_FORMS.presPos}</td>
        <td class="py-2 pr-2 font-jp text-emerald-300 font-bold">${P2_SUKI_FORMS.pastPos}</td>
        <td class="py-2 pr-2 font-jp text-slate-300">${P2_SUKI_FORMS.presNeg}</td>
        <td class="py-2 pr-2 font-jp text-rose-300">${P2_SUKI_FORMS.pastNeg}</td>
        <td class="py-2 text-center">${p2SpeakBtn(P2_SUKI_FORMS.presPos, 'Escuchar すきです', 'w-6 h-6')}</td>
    </tr>`;

    const verbosHtml = !show('verbos') ? '' : `<div class="${P2_CARD} overflow-x-auto space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="text-base font-black text-white">5. Verbos — Forma 〜ます (Presente y Pasado)</h3>
            ${p2PracticeBadge('verbos')}
        </div>
        <table class="w-full text-left text-xs sm:text-sm min-w-[600px]">
            <thead><tr class="text-[11px] uppercase text-slate-400 border-b border-slate-800"><th class="pb-2">Español / Diccionario</th><th class="pb-2">Presente +</th><th class="pb-2 text-emerald-300">Pasado +</th><th class="pb-2">Presente −</th><th class="pb-2 text-rose-300">Pasado −</th><th class="pb-2 text-center">Audio</th></tr></thead>
            <tbody>${verbsRows}${sukiRow}</tbody>
        </table>
        <p class="text-xs text-slate-400">Reglas: <b>ru</b> quita る + ます (たべる → たべます). <b>u</b> cambia la vocal u → i + ます (のむ → のみます). ⚠️ かえる termina en -eru pero es u: かえります. Pasado afirmativo = <b>〜ました</b>; pasado negativo = <b>〜ませんでした</b>.</p>
    </div>`;

    // 6. Vocabulario cotidiano
    const vocabHtml = !show('vocabulario') ? '' : `<div class="space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 px-1">
            <h3 class="text-base font-black text-white">6. Vocabulario cotidiano (comida, bebida, lugares y tiempo)</h3>
            ${p2PracticeBadge('vocabulario')}
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
            ${P2_GUIDE_VOCAB.map(g => `<div class="${P2_CARD}">
                <h4 class="text-sm font-black stage-theme-accent-text mb-2.5">${g.cat}</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${g.items.map(([jp, es, audio]) => `<div class="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2 text-xs">
                        <div class="min-w-0">
                            <span class="font-jp font-bold text-white block truncate">${jp}</span>
                            <span class="text-slate-400 block truncate">${es}</span>
                        </div>
                        ${p2SpeakBtn(audio || jp, `Escuchar ${jp}`, 'w-6 h-6')}
                    </div>`).join('')}
                </div>
            </div>`).join('')}
        </div>
    </div>`;

    // 7–8. Gramática (Orden, Partículas, Frecuencia y Conectores)
    const particles = [
        ['を', 'Objeto directo', 'パンを たべます。', 'パンを たべます'],
        ['に', 'Destino / Hora exacta', '学校に いきます。7時に おきます。', 'がっこうに いきます'],
        ['で', 'Lugar de acción / Medio', '図書館で べんきょうします。バスで きます。', 'バスで きます'],
        ['から', 'Desde / porque', '9時から べんきょうします。', 'くじから べんきょうします'],
        ['まで', 'Hasta', '5時まで はたらきます。', 'ごじまで はたらきます'],
        ['が', 'Sujeto / con すきです', '雨が ふります。コーヒーが すきです。', 'コーヒーが すきです'],
        ['は', 'Tema de la oración', 'わたしは がくせいです。', 'わたしは がくせいです'],
        ['も', 'También', 'わたしも のみます。', 'わたしも のみます'],
        ['の', 'Posesión / 〜の あとで', 'クラスの あとで', 'クラスの あとで'],
        ['×', 'Tiempos relativos (sin に): まいにち, きょう, あした, こんしゅう…', 'あした いきます。', 'あした いきます']
    ].map(([p, use, ex, audio]) => `<tr class="border-b border-slate-800">
        <td class="py-2 pr-2 font-jp font-black stage-theme-accent-text whitespace-nowrap">${p}</td>
        <td class="py-2 pr-2 text-xs sm:text-sm text-slate-200">${use}</td>
        <td class="py-2 pr-2 font-jp text-xs sm:text-sm text-white">${ex}</td>
        <td class="py-2 text-center">${p2SpeakBtn(audio, `Escuchar ${ex}`, 'w-6 h-6')}</td>
    </tr>`).join('');

    const gramaticaHtml = !show('gramatica') ? '' : `<div class="space-y-4">
        <div class="${P2_CARD}">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h3 class="text-base font-black text-white">Orden de la oración</h3>
                ${p2PracticeBadge('orden')}
            </div>
            <p class="font-jp text-base sm:text-lg text-white mt-2 leading-relaxed">わたしは ＋ まいにち/しちじに ＋ がっこうで ＋ ごはんを ＋ <span class="stage-theme-accent-text">たべます</span>。</p>
            <p class="text-xs text-slate-400 mt-1">Tema は → tiempo → lugar で/に → objeto を → <b>verbo siempre al final</b>. Cada partícula va DETRÁS de su palabra.</p>
        </div>
        <div class="${P2_CARD} overflow-x-auto space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="text-base font-black text-white">7. Gramática — Partículas clave</h3>
                ${p2PracticeBadge('particulas')}
            </div>
            <table class="w-full text-left"><tbody>${particles}</tbody></table>
        </div>
        <div class="${P2_CARD} space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="text-base font-black text-white">Frecuencia y 8. Conectores</h3>
                <div class="flex gap-1.5">${p2PracticeBadge('frecuencia', 'Frecuencia')}${p2PracticeBadge('conectores', 'Conectores')}</div>
            </div>
            <p class="font-jp text-white">ぜんぜん → あまり → ときどき → よく → まいにち</p>
            <p class="text-xs text-slate-400">0 % → 100 %. <b>ぜんぜん y あまり van con verbo negativo</b> (〜ません / 〜ませんでした).</p>
            <div class="grid sm:grid-cols-3 gap-2.5 pt-2">
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between"><span class="font-jp font-black text-amber-300">それから</span>${p2SpeakBtn('たべます。それから ねます。', 'Escuchar ejemplo それから', 'w-6 h-6')}</div>
                    <div class="text-xs text-slate-400">Y luego / después</div>
                    <div class="font-jp text-xs text-white">たべます。それから ねます。</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between"><span class="font-jp font-black text-sky-300">でも</span>${p2SpeakBtn('いそがしいです。でも、たのしいです。', 'Escuchar ejemplo でも', 'w-6 h-6')}</div>
                    <div class="text-xs text-slate-400">Pero / sin embargo</div>
                    <div class="font-jp text-xs text-white">いそがしいです。でも、たのしいです。</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <div class="flex items-center justify-between"><span class="font-jp font-black text-emerald-300">だから</span>${p2SpeakBtn('つかれました。だから、やすみます。', 'Escuchar ejemplo だから', 'w-6 h-6')}</div>
                    <div class="text-xs text-slate-400">Por eso / por lo tanto</div>
                    <div class="font-jp text-xs text-white">つかれました。だから、やすみます。</div>
                </div>
            </div>
        </div>
    </div>`;

    // 9. Aspectos culturales
    const culturaHtml = !show('cultura') ? '' : `<div class="${P2_CARD} space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="text-base font-black text-white">9. Aspectos culturales vistos en clase</h3>
            ${p2PracticeBadge('cultura')}
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${P2_CULTURE.map(c => `<div class="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-black text-emerald-300 flex items-center gap-1.5"><i class="fa-solid ${c.icon}"></i>${c.title}</span>
                    ${p2SpeakBtn(c.audio, `Escuchar ${c.jp}`, 'w-6 h-6')}
                </div>
                <div class="font-jp text-sm font-bold text-white">${c.jp}</div>
                <p class="text-xs text-slate-300 leading-relaxed">${c.desc}</p>
            </div>`).join('')}
        </div>
    </div>`;

    container.innerHTML = `<div class="space-y-5">
        ${filterBar}
        ${katakanaHtml}
        ${numerosHtml}
        ${tiempoHtml}
        ${verbosHtml}
        ${vocabHtml}
        ${gramaticaHtml}
        ${culturaHtml}
        <div class="text-center flex flex-wrap justify-center gap-3">
            <button type="button" data-action="setParcialMode" data-args='["p2cards"]' class="${P2_BTN} bg-slate-800 text-sky-300 hover:bg-slate-700 border border-slate-700"><i class="fa-solid fa-clone mr-1"></i> Repasar con tarjetas</button>
            <button type="button" data-action="setParcialMode" data-args='["p2sim"]' class="${P2_BTN} stage-theme-primary-btn">Ir al simulacro <i class="fa-solid fa-arrow-right ml-1"></i></button>
        </div>
    </div>`;
}

function renderParcial2Simulator() {
    p2Render();
}

// ---------- Tarjetas de repaso (p2cards) ----------
const P2_CARD_CATS = [
    ['all', 'Todas'],
    ['katakana', 'Katakana'],
    ['numeros', 'Números'],
    ['tiempo', 'Días y Meses'],
    ['verbos', 'Verbos (±Pasado)'],
    ['vocabulario', 'Vocabulario'],
    ['cultura', 'Cultura']
];

function p2BuildCardDeck(cat) {
    const all = [];
    P2_KATAKANA.forEach(k => all.push({ cat: 'katakana', label: `Katakana · ${k.cat}`, front: k.jp, sub: k.romaji, back: k.es, detail: 'Palabra de lectura en katakana', audio: k.jp }));
    P2_NUMBERS_KANJI.forEach(n => all.push({ cat: 'numeros', label: `Kanji Nº ${n.n}`, front: n.kanji, sub: `${n.hira} (${n.romaji})`, back: `Número ${n.n}`, detail: 'Kanji fundamental de números', audio: n.audio }));
    P2_NUMBER_EXAMPLES.forEach(ex => all.push({ cat: 'numeros', label: 'Número compuesto / mutación', front: ex.kanji, sub: ex.num, back: ex.hira, detail: `${ex.romaji} · ${ex.note}`, audio: ex.hira }));
    P2_DAYS.forEach(d => all.push({ cat: 'tiempo', label: `Día · ${d.elem}`, front: d.kanji, sub: d.hira, back: d.es, detail: d.romaji, audio: d.hira }));
    P2_MONTHS.forEach(m => all.push({ cat: 'tiempo', label: m.ex ? 'Mes (Excepción ⭐)' : 'Mes del año', front: m.kanji, sub: m.hira, back: m.es, detail: m.romaji, audio: m.hira }));
    P2_VERBS.forEach(v => {
        const pastPos = v.masu.replace(/ます$/, 'ました');
        const presNeg = v.masu.replace(/ます$/, 'ません');
        const pastNeg = v.masu.replace(/ます$/, 'ませんでした');
        all.push({
            cat: 'verbos',
            label: `Verbo (${v.type === 'irr' ? 'irregular' : v.type})`,
            front: v.masu,
            sub: `${v.dict} · usa ${v.p}`,
            back: v.es,
            detail: `Pasado +: ${pastPos} | Pres −: ${presNeg} | Pas −: ${pastNeg}`,
            audio: v.masu
        });
    });
    all.push({
        cat: 'verbos',
        label: 'Adjetivo-na (usa が)',
        front: P2_SUKI_FORMS.presPos,
        sub: 'コーヒーが すきです',
        back: P2_SUKI_FORMS.label,
        detail: `Pasado +: ${P2_SUKI_FORMS.pastPos} | Pres −: ${P2_SUKI_FORMS.presNeg} | Pas −: ${P2_SUKI_FORMS.pastNeg}`,
        audio: P2_SUKI_FORMS.presPos
    });
    P2_GUIDE_VOCAB.forEach(g => g.items.forEach(([jp, es, audio]) => all.push({
        cat: 'vocabulario', label: `Vocabulario · ${g.cat}`, front: jp, sub: '', back: es, detail: 'Tobira Lecciones 2 y 3', audio: audio || jp
    })));
    P2_CULTURE.forEach(c => all.push({ cat: 'cultura', label: 'Cultura', front: c.jp, sub: c.title, back: c.desc, detail: '', audio: c.audio }));
    return cat === 'all' ? all : all.filter(x => x.cat === cat);
}

function p2GetCardsDeck() {
    if (!p2CardsState.deck) p2CardsState.deck = p2BuildCardDeck(p2CardsState.cat);
    return p2CardsState.deck;
}

function p2SetCardCategory(cat) {
    p2CardsState = { cat: cat || 'all', index: 0, flipped: false, deck: p2BuildCardDeck(cat || 'all') };
    renderParcial2Cards(document.getElementById('parcialWorkspaceContainer'));
}

function p2FlipCard() {
    p2CardsState.flipped = !p2CardsState.flipped;
    renderParcial2Cards(document.getElementById('parcialWorkspaceContainer'));
}

function p2NavCard(delta) {
    const deck = p2GetCardsDeck();
    if (!deck.length) return;
    p2CardsState.index = (p2CardsState.index + delta + deck.length) % deck.length;
    p2CardsState.flipped = false;
    renderParcial2Cards(document.getElementById('parcialWorkspaceContainer'));
}

function p2ShuffleCards() {
    p2CardsState.deck = shuffleArray([...p2GetCardsDeck()]);
    p2CardsState.index = 0;
    p2CardsState.flipped = false;
    renderParcial2Cards(document.getElementById('parcialWorkspaceContainer'));
}

function renderParcial2Cards(container) {
    if (!container) return;
    const deck = p2GetCardsDeck();
    if (!deck.length) return;
    const idx = ((p2CardsState.index % deck.length) + deck.length) % deck.length;
    const card = deck[idx];
    const flipped = p2CardsState.flipped;
    const showRomaji = Boolean(p2Progress().showRomaji);

    const catBar = `<div class="flex flex-wrap gap-1.5 justify-center">
        ${P2_CARD_CATS.map(([id, label]) => `<button type="button" data-action="p2SetCardCategory" data-args='["${id}"]'
            class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${p2CardsState.cat === id ? 'stage-theme-primary-btn shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'}">${label}</button>`).join('')}
    </div>`;

    container.innerHTML = `<div class="space-y-5 max-w-2xl mx-auto">
        ${catBar}
        <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 px-1">
            <span>Tarjeta <strong class="text-white">${idx + 1}</strong> de ${deck.length}</span>
            <div class="flex items-center gap-2">
                ${p2RomajiToggleBtnHtml(true)}
                <button type="button" data-action="p2ShuffleCards" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition">
                    <i class="fa-solid fa-shuffle mr-1"></i>Mezclar
                </button>
            </div>
        </div>
        <div data-action="p2FlipCard" role="button" tabindex="0" aria-label="Voltear tarjeta" id="p2CardSurface"
            class="${P2_CARD} min-h-[240px] flex flex-col items-center justify-center text-center cursor-pointer border-2 ${flipped ? 'border-emerald-500/60' : 'border-slate-700 hover:border-sky-500/50'} select-none space-y-3">
            <div class="w-full flex items-center justify-between text-xs">
                <span class="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold">${p2Escape(card.label)}</span>
                ${p2SpeakBtn(card.audio, `Escuchar ${card.front}`)}
            </div>
            ${!flipped ? `
                <div class="py-4 space-y-2">
                    <div class="font-jp text-3xl sm:text-4xl font-black text-white">${p2Escape(card.front)}</div>
                    ${card.sub ? `<div class="text-sm font-jp text-slate-400">${p2Escape(card.sub)}</div>` : ''}
                    ${showRomaji && p2HasJapanese(card.front) && (!card.sub || p2HasJapanese(card.sub)) ? `<div class="p2-romaji text-xs font-mono text-amber-300">${p2Escape(p2ToRomaji(card.front))}</div>` : ''}
                </div>
                <span class="text-xs text-slate-400"><i class="fa-solid fa-rotate mr-1"></i>Toca la tarjeta o pulsa Espacio para ver el significado</span>
            ` : `
                <div class="py-3 space-y-2">
                    <div class="text-xl sm:text-2xl font-black text-emerald-300 leading-snug">${p2Escape(card.back)}</div>
                    <div class="font-jp text-sm text-white font-bold">${p2Escape(card.front)}${card.sub ? ` · ${p2Escape(card.sub)}` : ''}</div>
                    ${card.detail ? `<div class="text-xs text-slate-300 font-jp pt-1">${p2Escape(card.detail)}</div>` : ''}
                </div>
                <span class="text-xs text-slate-400"><i class="fa-solid fa-rotate mr-1"></i>Toca para volver al frente</span>
            `}
        </div>
        <div class="flex items-center justify-center gap-3">
            <button type="button" id="p2CardPrevBtn" data-action="p2NavCard" data-args='[-1]' class="${P2_BTN} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">
                <i class="fa-solid fa-arrow-left mr-1"></i> Anterior
            </button>
            <button type="button" id="p2CardFlipBtn" data-action="p2FlipCard" class="${P2_BTN} stage-theme-primary-btn">
                <i class="fa-solid fa-rotate mr-1"></i> Voltear
            </button>
            <button type="button" id="p2CardNextBtn" data-action="p2NavCard" data-args='[1]' class="${P2_BTN} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">
                Siguiente <i class="fa-solid fa-arrow-right ml-1"></i>
            </button>
        </div>
        <p class="hidden sm:block text-center text-[11px] text-slate-500">Teclado: Espacio para voltear, ← → para cambiar de tarjeta.</p>
    </div>`;
}

// ---------- Teclado: simulacro (1–4 / A–D, Enter, flechas) y tarjetas (Espacio, flechas) ----------
document.addEventListener('keydown', e => {
    const tab = document.getElementById('tab-parcial');
    if (!tab || tab.classList.contains('hidden') || !state.parcial) return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;

    if (state.parcial.mode === 'p2cards') {
        let handledCard = true;
        if (e.key === ' ') p2FlipCard();
        else if (e.key === 'ArrowRight') p2NavCard(1);
        else if (e.key === 'ArrowLeft') p2NavCard(-1);
        else handledCard = false;
        if (handledCard) {
            e.preventDefault();
            e.stopPropagation();
        }
        return;
    }

    if (!p2Session || p2Session.finished || state.parcial.mode !== 'p2sim') return;

    const key = e.key.toLowerCase();
    let handled = true;
    if (key >= '1' && key <= '4') p2Choose(Number(key) - 1);
    else if (['a', 'b', 'c', 'd'].includes(key)) p2Choose(key.charCodeAt(0) - 97);
    else if (key === 'arrowright' && p2Session.mode === 'exam') p2Go(1);
    else if (key === 'arrowleft' && p2Session.mode === 'exam') p2Go(-1);
    else if (key === 'enter' && p2Session.mode !== 'exam' && p2Session.answers[p2Session.index] !== null) p2Go(1);
    else handled = false;
    if (handled) {
        e.preventDefault();
        e.stopPropagation();
    }
});
