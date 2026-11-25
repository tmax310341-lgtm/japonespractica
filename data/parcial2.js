// KotoDojo · 2.º parcial / Final — Japonés 1, Lecciones 2 y 3 (Tobira)
//
// Banco de preguntas de opción múltiple. En cada pregunta:
//   b  bloque (ver P2_BLOCKS)        q  enunciado en español
//   s  frase en japonés (opcional)   o  opciones: LA PRIMERA ES LA CORRECTA (se mezclan al mostrarlas)
//   e  explicación de la regla       r  id de la lectura (solo en el bloque «lectura»)
// Las preguntas de horas, días, meses, verbos, números y katakana se completan con generadores en js/parcial2.js.

const P2_BLOCKS = [
    { id: 'particulas', name: 'Partículas', icon: 'fa-link', examCount: 4 },
    { id: 'tiempo', name: 'Horas, días y meses', icon: 'fa-clock', examCount: 3 },
    { id: 'verbos', name: 'Verbos (pres. y pas.)', icon: 'fa-person-running', examCount: 3 },
    { id: 'numeros', name: 'Números y Kanji', icon: 'fa-hashtag', examCount: 2 },
    { id: 'katakana', name: 'Katakana', icon: 'fa-language', examCount: 2 },
    { id: 'orden', name: 'Orden de la oración', icon: 'fa-arrow-down-1-9', examCount: 1 },
    { id: 'frecuencia', name: 'Frecuencia', icon: 'fa-chart-simple', examCount: 1 },
    { id: 'conectores', name: 'Conectores', icon: 'fa-arrows-turn-right', examCount: 1 },
    { id: 'vocabulario', name: 'Vocabulario', icon: 'fa-book', examCount: 1 },
    { id: 'lectura', name: 'Lectura', icon: 'fa-book-open-reader', examCount: 1 },
    { id: 'cultura', name: 'Cultura', icon: 'fa-torii-gate', examCount: 1 }
];

const P2_EXAM = { questions: 20, minutes: 30, passGrade: 3.0 };

// ---------- 1. Katakana (palabras de la guía y de Tobira L2–L3) ----------
const P2_KATAKANA = [
    { jp: 'コーヒー', romaji: 'koohii', es: 'café', cat: 'Bebida' },
    { jp: 'パン', romaji: 'pan', es: 'pan', cat: 'Comida' },
    { jp: 'テレビ', romaji: 'terebi', es: 'televisión / TV', cat: 'Objetos' },
    { jp: 'ケーキ', romaji: 'keeki', es: 'pastel / torta', cat: 'Comida' },
    { jp: 'コンピューター', romaji: 'konpyuutaa', es: 'computador', cat: 'Objetos' },
    { jp: 'バス', romaji: 'basu', es: 'bus / autobús', cat: 'Transporte' },
    { jp: 'ジュース', romaji: 'juusu', es: 'jugo', cat: 'Bebida' },
    { jp: 'スーパー', romaji: 'suupaa', es: 'supermercado', cat: 'Lugares' },
    { jp: 'レストラン', romaji: 'resutoran', es: 'restaurante', cat: 'Lugares' },
    { jp: 'コンビニ', romaji: 'konbini', es: 'tienda de conveniencia', cat: 'Lugares' },
    { jp: 'アパート', romaji: 'apaato', es: 'apartamento', cat: 'Lugares' },
    { jp: 'カフェ', romaji: 'kafe', es: 'café (local)', cat: 'Lugares' },
    { jp: 'クラス', romaji: 'kurasu', es: 'clase', cat: 'Estudio' },
    { jp: 'ジム', romaji: 'jimu', es: 'gimnasio', cat: 'Lugares' },
    { jp: 'ニュース', romaji: 'nyuusu', es: 'noticias', cat: 'Medios' },
    { jp: 'インターネット', romaji: 'intaanetto', es: 'internet', cat: 'Medios' },
    { jp: 'ゲーム', romaji: 'geemu', es: 'videojuego', cat: 'Actividades' },
    { jp: 'スポーツ', romaji: 'supootsu', es: 'deporte', cat: 'Actividades' },
    { jp: 'アルバイト', romaji: 'arubaito', es: 'trabajo de medio tiempo', cat: 'Actividades' },
    { jp: 'コンサート', romaji: 'konsaato', es: 'concierto', cat: 'Actividades' },
    { jp: 'パーティー', romaji: 'paatii', es: 'fiesta', cat: 'Actividades' }
];

// ---------- 2. Números y Kanji (1 a 10,000+) ----------
const P2_NUMBERS_KANJI = [
    { n: '1', kanji: '一', hira: 'いち', audio: 'いち', romaji: 'ichi' },
    { n: '2', kanji: '二', hira: 'に', audio: 'に', romaji: 'ni' },
    { n: '3', kanji: '三', hira: 'さん', audio: 'さん', romaji: 'san' },
    { n: '4', kanji: '四', hira: 'よん / し', audio: 'よん', romaji: 'yon / shi' },
    { n: '5', kanji: '五', hira: 'ご', audio: 'ご', romaji: 'go' },
    { n: '6', kanji: '六', hira: 'ろく', audio: 'ろく', romaji: 'roku' },
    { n: '7', kanji: '七', hira: 'なな / しち', audio: 'なな', romaji: 'nana / shichi' },
    { n: '8', kanji: '八', hira: 'はち', audio: 'はち', romaji: 'hachi' },
    { n: '9', kanji: '九', hira: 'きゅう / く', audio: 'きゅう', romaji: 'kyuu / ku' },
    { n: '10', kanji: '十', hira: 'じゅう', audio: 'じゅう', romaji: 'juu' },
    { n: '100', kanji: '百', hira: 'ひゃく', audio: 'ひゃく', romaji: 'hyaku' },
    { n: '1,000', kanji: '千', hira: 'せん', audio: 'せん', romaji: 'sen' },
    { n: '10,000', kanji: '万', hira: 'まん', audio: 'まん', romaji: 'man' }
];

const P2_NUMBER_EXAMPLES = [
    { num: '300', kanji: '三百', hira: 'さんびゃく', romaji: 'sanbyaku', note: 'Mutación (hyaku → byaku)' },
    { num: '600', kanji: '六百', hira: 'ろっぴゃく', romaji: 'roppyaku', note: 'Mutación (sokuon + pyaku)' },
    { num: '800', kanji: '八百', hira: 'はっぴゃく', romaji: 'happyaku', note: 'Mutación (sokuon + pyaku)' },
    { num: '3,000', kanji: '三千', hira: 'さんぜん', romaji: 'sanzen', note: 'Mutación (sen → zen)' },
    { num: '8,000', kanji: '八千', hira: 'はっせん', romaji: 'hassen', note: 'Mutación (sokuon + sen)' },
    { num: '12,345', kanji: '一万二千三百四十五', hira: 'いちまん にせん さんびゃく よんじゅうご', romaji: 'ichiman nisen sanbyaku yonjuugo', note: '1×万 + 2345' },
    { num: '25,000', kanji: '二万五千', hira: 'にまん ごせん', romaji: 'niman gosen', note: '2×万 + 5000' },
    { num: '50,678', kanji: '五万六百七十八', hira: 'ごまん ろっぴゃく ななじゅうはち', romaji: 'goman roppyaku nanajuuhachi', note: '5×万 + 678' }
];

// ---------- 3–4. Horas, Días de la semana y Meses ----------
const P2_HOURS = [
    { n: 1, hira: 'いちじ' }, { n: 2, hira: 'にじ' }, { n: 3, hira: 'さんじ' }, { n: 4, hira: 'よじ', ex: true },
    { n: 5, hira: 'ごじ' }, { n: 6, hira: 'ろくじ' }, { n: 7, hira: 'しちじ', ex: true }, { n: 8, hira: 'はちじ' },
    { n: 9, hira: 'くじ', ex: true }, { n: 10, hira: 'じゅうじ' }, { n: 11, hira: 'じゅういちじ' }, { n: 12, hira: 'じゅうにじ' }
];
// Lecturas incorrectas típicas, para usarlas como distractores
const P2_HOUR_TRAPS = { 4: ['よんじ', 'しじ'], 7: ['ななじ', 'なのじ'], 9: ['きゅうじ', 'きゅじ'] };

const P2_DAYS = [
    { es: 'lunes', kanji: '月曜日', hira: 'げつようび', romaji: 'getsuyoubi', elem: '🌙 Luna' },
    { es: 'martes', kanji: '火曜日', hira: 'かようび', romaji: 'kayoubi', elem: '🔥 Fuego' },
    { es: 'miércoles', kanji: '水曜日', hira: 'すいようび', romaji: 'suiyoubi', elem: '💧 Agua' },
    { es: 'jueves', kanji: '木曜日', hira: 'もくようび', romaji: 'mokuyoubi', elem: '🌲 Árbol' },
    { es: 'viernes', kanji: '金曜日', hira: 'きんようび', romaji: 'kinyoubi', elem: '🪙 Oro' },
    { es: 'sábado', kanji: '土曜日', hira: 'どようび', romaji: 'doyoubi', elem: '⛰️ Tierra' },
    { es: 'domingo', kanji: '日曜日', hira: 'にちようび', romaji: 'nichiyoubi', elem: '☀️ Sol' }
];

const P2_MONTHS = [
    { n: 1, kanji: '1月', hira: 'いちがつ', romaji: 'ichigatsu', es: 'enero' },
    { n: 2, kanji: '2月', hira: 'にがつ', romaji: 'nigatsu', es: 'febrero' },
    { n: 3, kanji: '3月', hira: 'さんがつ', romaji: 'sangatsu', es: 'marzo' },
    { n: 4, kanji: '4月', hira: 'しがつ', romaji: 'shigatsu', es: 'abril', ex: true },
    { n: 5, kanji: '5月', hira: 'ごがつ', romaji: 'gogatsu', es: 'mayo' },
    { n: 6, kanji: '6月', hira: 'ろくがつ', romaji: 'rokugatsu', es: 'junio' },
    { n: 7, kanji: '7月', hira: 'しちがつ', romaji: 'shichigatsu', es: 'julio', ex: true },
    { n: 8, kanji: '8月', hira: 'はちがつ', romaji: 'hachigatsu', es: 'agosto' },
    { n: 9, kanji: '9月', hira: 'くがつ', romaji: 'kugatsu', es: 'septiembre', ex: true },
    { n: 10, kanji: '10月', hira: 'じゅうがつ', romaji: 'juugatsu', es: 'octubre' },
    { n: 11, kanji: '11月', hira: 'じゅういちがつ', romaji: 'juuichigatsu', es: 'noviembre' },
    { n: 12, kanji: '12月', hira: 'じゅうにがつ', romaji: 'juunigatsu', es: 'diciembre' }
];
const P2_MONTH_TRAPS = { 4: ['よんがつ', 'よがつ'], 7: ['なながつ', 'なのがつ'], 9: ['きゅうがつ', 'きゅがつ'] };

// ---------- 5. Verbos (Forma 〜ます en Presente y Pasado) ----------
const P2_VERBS = [
    { dict: 'おきる', masu: 'おきます', type: 'ru', es: 'levantarse / despertarse', p: 'に (hora)' },
    { dict: 'ねる', masu: 'ねます', type: 'ru', es: 'dormir / acostarse', p: 'に (hora)' },
    { dict: 'たべる', masu: 'たべます', type: 'ru', es: 'comer', p: 'を' },
    { dict: 'みる', masu: 'みます', type: 'ru', es: 'ver / mirar', p: 'を' },
    { dict: 'いく', masu: 'いきます', type: 'u', es: 'ir', p: 'に (destino)' },
    { dict: 'かえる', masu: 'かえります', type: 'u', es: 'regresar / volver a casa', p: 'に (destino)', trap: true },
    { dict: 'かう', masu: 'かいます', type: 'u', es: 'comprar', p: 'を' },
    { dict: 'きく', masu: 'ききます', type: 'u', es: 'escuchar / preguntar', p: 'を (cosa) · に (persona)' },
    { dict: 'のむ', masu: 'のみます', type: 'u', es: 'beber', p: 'を' },
    { dict: 'よむ', masu: 'よみます', type: 'u', es: 'leer', p: 'を' },
    { dict: 'くる', masu: 'きます', type: 'irr', es: 'venir', p: 'に (destino) · で (medio)' },
    { dict: 'する', masu: 'します', type: 'irr', es: 'hacer', p: 'を' },
    { dict: 'はたらく', masu: 'はたらきます', type: 'u', es: 'trabajar', p: 'から・まで / で' },
    { dict: 'かく', masu: 'かきます', type: 'u', es: 'escribir', p: 'を' },
    { dict: 'べんきょうする', masu: 'べんきょうします', type: 'irr', es: 'estudiar', p: 'を / で' },
    { dict: 'やすむ', masu: 'やすみます', type: 'u', es: 'descansar', p: 'から・まで' }
];
// Formas ます mal construidas, para usarlas como distractores
const P2_VERB_TRAPS = {
    'おきる': ['おきります', 'おきるます', 'おけます'],
    'ねる': ['ねります', 'ねるます', 'ねいます'],
    'たべる': ['たべります', 'たべるます', 'たびます'],
    'みる': ['みります', 'みるます', 'めます'],
    'いく': ['いくます', 'いかます', 'いけます'],
    'かえる': ['かえます', 'かえるます', 'かえいます'],
    'かう': ['かうます', 'かわます', 'かえます'],
    'きく': ['きくます', 'きかます', 'きけます'],
    'のむ': ['のむます', 'のまます', 'のめます'],
    'よむ': ['よむます', 'よまます', 'よめます'],
    'くる': ['くります', 'くるます', 'こます'],
    'する': ['すります', 'するます', 'さます'],
    'はたらく': ['はたらくます', 'はたらかます', 'はたらけます'],
    'かく': ['かくます', 'かかます', 'かけます'],
    'べんきょうする': ['べんきょうすります', 'べんきょうするます', 'べんきょうさます'],
    'やすむ': ['やすむます', 'やすまます', 'やすめます']
};

const P2_TYPE_NAMES = { ru: 'Verbo ru (ichidan)', u: 'Verbo u (godan)', irr: 'Verbo irregular' };

const P2_SUKI_FORMS = {
    label: 'Gustar',
    presPos: 'すきです',
    pastPos: 'すきでした',
    presNeg: 'すきではありません',
    pastNeg: 'すきではありませんでした',
    note: 'Adjetivo-na (usa が: コーヒーが すきです · pasado y negación con です/でした)'
};

// ---------- 6. Vocabulario cotidiano ----------
const P2_GUIDE_VOCAB = [
    {
        cat: 'Comida',
        items: [
            ['ごはん', 'arroz / comida', 'ごはん'],
            ['パン', 'pan', 'パン'],
            ['にく', 'carne', 'にく'],
            ['さかな', 'pescado', 'さかな'],
            ['やさい', 'verdura', 'やさい'],
            ['たまご', 'huevo', 'たまご'],
            ['くだもの', 'fruta', 'くだもの'],
            ['あさごはん', 'desayuno', 'あさごはん'],
            ['ひるごはん', 'almuerzo', 'ひるごはん'],
            ['ばんごはん', 'cena', 'ばんごはん'],
            ['ケーキ', 'pastel', 'ケーキ']
        ]
    },
    {
        cat: 'Bebida',
        items: [
            ['みず', 'agua', 'みず'],
            ['おちゃ', 'té', 'おちゃ'],
            ['コーヒー', 'café', 'コーヒー'],
            ['ジュース', 'jugo', 'ジュース'],
            ['ぎゅうにゅう', 'leche', 'ぎゅうにゅう']
        ]
    },
    {
        cat: 'Lugares',
        items: [
            ['がっこう', 'escuela', 'がっこう'],
            ['図書館 (としょかん)', 'biblioteca', 'としょかん'],
            ['スーパー', 'supermercado', 'スーパー'],
            ['えき', 'estación', 'えき'],
            ['びょういん', 'hospital', 'びょういん'],
            ['こうえん', 'parque', 'こうえん'],
            ['レストラン', 'restaurante', 'レストラン'],
            ['コンビニ', 'tienda de conveniencia', 'コンビニ'],
            ['しょくどう', 'cafetería / comedor', 'しょくどう'],
            ['いえ / うち', 'casa', 'うち'],
            ['へや', 'habitación', 'へや'],
            ['りょう', 'residencia', 'りょう'],
            ['アパート', 'apartamento', 'アパート'],
            ['カフェ', 'café (local)', 'カフェ'],
            ['ジム', 'gimnasio', 'ジム']
        ]
    },
    {
        cat: 'Expresiones de tiempo',
        items: [
            ['今日 (きょう)', 'hoy', 'きょう'],
            ['昨日 (きのう)', 'ayer', 'きのう'],
            ['明日 (あした)', 'mañana (día)', 'あした'],
            ['今 (いま)', 'ahora', 'いま'],
            ['毎朝 (まいあさ)', 'cada mañana', 'まいあさ'],
            ['毎晩 (まいばん)', 'cada noche', 'まいばん'],
            ['毎日 (まいにち)', 'todos los días', 'まいにち'],
            ['週末 (しゅうまつ)', 'fin de semana', 'しゅうまつ'],
            ['先週 (せんしゅう)', 'la semana pasada', 'せんしゅう'],
            ['来週 (らいしゅう)', 'la próxima semana', 'らいしゅう'],
            ['こんしゅう', 'esta semana', 'こんしゅう'],
            ['けさ', 'esta mañana', 'けさ'],
            ['ゆうべ', 'anoche', 'ゆうべ'],
            ['あさ / ひる / よる', 'mañana / mediodía / noche', 'あさ'],
            ['やすみ', 'descanso / día libre', 'やすみ']
        ]
    },
    {
        cat: 'Actividades y expresiones',
        items: [
            ['テレビ', 'televisión', 'テレビ'],
            ['ニュース', 'noticias', 'ニュース'],
            ['インターネット', 'internet', 'インターネット'],
            ['しゅくだい', 'tarea', 'しゅくだい'],
            ['ゲーム', 'videojuego', 'ゲーム'],
            ['スポーツ', 'deporte', 'スポーツ'],
            ['べんきょう', 'estudio', 'べんきょう'],
            ['アルバイト / バイト', 'trabajo de medio tiempo', 'アルバイト'],
            ['かいもの', 'compras', 'かいもの'],
            ['コンサート', 'concierto', 'コンサート'],
            ['パーティー', 'fiesta', 'パーティー'],
            ['それから', 'y luego / después', 'それから'],
            ['だから', 'por eso', 'だから'],
            ['でも', 'pero', 'でも'],
            ['たくさん / ちょっと', 'mucho / un poco', 'たくさん'],
            ['いいですね', '¡qué bien!', 'いいですね'],
            ['〜の あとで', 'después de 〜', 'あとで'],
            ['〜は ちょっと…', '〜 no me gusta mucho…', 'ちょっと']
        ]
    }
];

// ---------- 9. Aspectos culturales vistos en clase ----------
const P2_CULTURE = [
    {
        title: '挨拶 (あいさつ) · Saludos diarios',
        jp: 'おはようございます・こんにちは',
        audio: 'おはようございます',
        icon: 'fa-hand-peace',
        desc: 'おはようございます (buenos días hasta ~10 a. m.), こんにちは (buenas tardes durante el día) y こんばんは (buenas noches al saludar).'
    },
    {
        title: 'おじぎ · La reverencia',
        jp: 'おじぎをします',
        audio: 'おじぎ',
        icon: 'fa-person-praying',
        desc: 'En Japón se saluda inclinándose como muestra de respeto, gratitud o despedida, evitando el contacto físico (abrazos o apretones) al presentarse.'
    },
    {
        title: '学校生活 · Vida escolar y valores',
        jp: 'そうじ・がんばって',
        audio: 'がんばって',
        icon: 'fa-school',
        desc: 'Los estudiantes limpian su propia escuela (そうじ), aprendiendo trabajo en equipo y respeto por los espacios. Además se valora mucho la puntualidad y el esfuerzo (がんばる).'
    },
    {
        title: '家のあいさつ · Salir y volver a casa',
        jp: 'いってきます ⇄ ただいま',
        audio: 'いってきます',
        icon: 'fa-door-open',
        desc: 'Al salir se dice いってきます («voy y vuelvo») y quien queda responde いってらっしゃい. Al regresar se dice ただいま y responden おかえりなさい.'
    },
    {
        title: '食事のあいさつ · En la mesa',
        jp: 'いただきます ⇄ ごちそうさまでした',
        audio: 'いただきます',
        icon: 'fa-utensils',
        desc: 'Antes de comer se dice いただきます agradeciendo por los alimentos y quienes los prepararon; al terminar se dice ごちそうさまでした.'
    }
];

// ---------- Lecturas (textos de rutina y pasado) ----------
const P2_READINGS = {
    r1: {
        title: 'マリアさんの いちにち',
        text: 'わたしは マリアです。だいがくせいです。わたしは まいにち しちじに おきます。あさごはんを たべます。それから、はちじはんに がっこうに いきます。ひるごはんは しょくどうで たべます。ごご よじに うちに かえります。よる、テレビを みます。じゅういちじごろ ねます。'
    },
    r2: {
        title: 'けんさんの しゅうまつ',
        text: 'けんさんは しゅうまつ よく ジムに いきます。どようびの あさ、ジムで スポーツを します。でも、にちようびは あまり ジムに いきません。にちようびは うちで ゲームを します。けんさんは コーヒーが すきです。だから、まいにち カフェで コーヒーを のみます。'
    },
    r3: {
        title: 'ゆいさんの すいようび',
        text: 'ゆいさんは すいようびに くじから じゅうにじまで クラスが あります。クラスの あとで、としょかんで しゅくだいを します。ゆいさんは おちゃが だいすきです。でも、コーヒーは ぜんぜん のみません。ごご ろくじに アルバイトに いきます。'
    },
    r4: {
        title: 'たなかさんの きのう',
        text: 'きのう、たなかさんは ごぜん はちじに おきました。バスで がっこうに いきました。としょかんで にじまで べんきょうしました。それから、スーパーで パンと ぎゅうにゅうを かいました。よる、つかれました。だから、テレビを みませんでした。じゅうじに ねました。'
    }
};

const P2_BANK = [
    // ======================= PARTÍCULAS =======================
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'わたしは まいあさ しちじ（　）おきます。', o: ['に', 'で', 'を', '×'], e: 'Una hora exacta (しちじ = las 7) lleva に: しちじに おきます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'あした（　）アニメを みます。', o: ['×', 'に', 'で', 'を'], e: 'あした, きょう, まいにち, こんしゅう… son tiempos relativos: NO llevan に (×).' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'まいにち（　）コーヒーを のみます。', o: ['×', 'に', 'を', 'で'], e: 'まいにち (todos los días) no lleva partícula: まいにち コーヒーを のみます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'としょかん（　）しゅくだいを します。', o: ['で', 'に', 'を', 'が'], e: 'で marca el lugar donde se realiza una acción: としょかんで しゅくだいを します.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'がっこう（　）いきます。', o: ['に', 'で', 'を', 'が'], e: 'Con verbos de movimiento (いく, くる, かえる), に marca el destino: がっこうに いきます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'ごご ろくじに うち（　）かえります。', o: ['に', 'で', 'を', 'は'], e: 'かえる (volver) indica movimiento: el destino lleva に → うちに かえります.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'あさごはん（　）たべます。', o: ['を', 'の', 'で', 'が'], e: 'を marca el objeto directo del verbo: あさごはんを たべます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'よる、ニュース（　）みます。', o: ['を', 'に', 'で', 'が'], e: 'Lo que se ve es el objeto directo: ニュースを みます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'カフェで おちゃ（　）のみます。', o: ['を', 'で', 'に', 'が'], e: 'Lo que se bebe es el objeto directo: おちゃを のみます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'ジム（　）スポーツを します。', o: ['で', 'に', 'を', 'が'], e: 'La acción (hacer deporte) ocurre en el gimnasio: ジムで します.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'わたしは おんがく（　）すきです。', o: ['が', 'を', 'で', 'に'], e: 'Con すきです, lo que gusta se marca con が: おんがくが すきです.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'A：ゲーム（　）なにが すきですか。', o: ['は', 'を', 'で', 'に'], e: 'は presenta el tema: «En cuanto a juegos, ¿cuál te gusta?» → ゲームは なにが すきですか.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'たなかさんは ゲームを します。わたし（　）ゲームを します。', o: ['も', 'を', 'で', 'に'], e: 'も significa «también» y reemplaza a は: わたしも ゲームを します.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'クラス（　）あとで、カフェに いきます。', o: ['の', 'に', 'で', 'を'], e: 'Sustantivo + の あとで = «después de»: クラスの あとで.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'どようび（　）かいものに いきます。', o: ['に', 'で', 'を', 'が'], e: 'Los días de la semana pueden llevar に (どようびに): son un momento concreto, no relativo como あした.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'しょくどう（　）ひるごはんを たべます。', o: ['で', 'に', 'を', 'が'], e: 'El lugar donde se come lleva で: しょくどうで たべます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'こんしゅう（　）テストが あります。', o: ['×', 'に', 'で', 'を'], e: 'こんしゅう (esta semana) es un tiempo relativo como らいしゅう o あした: sin partícula.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'くじ（　）ごじまで アルバイトを します。', o: ['から', 'まで', 'に', 'で'], e: '〜から 〜まで = «desde… hasta…»: くじから ごじまで.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'ともだちの うち（　）ゲームを します。', o: ['で', 'に', 'を', 'が'], e: 'Jugar es una acción que ocurre en casa del amigo: うちで します.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'らいしゅう（　）コンサートに いきます。', o: ['×', 'に', 'で', 'を'], e: 'らいしゅう (la próxima semana) es un tiempo relativo: no lleva に.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'わたし（　）へやは ちいさいです。', o: ['の', 'は', 'が', 'を'], e: 'の indica posesión: わたしの へや = mi habitación.' },
    { b: 'particulas', q: 'Completa con la partícula correcta (medio de transporte):', s: 'わたしは まいにち バス（　）きます。', o: ['で', 'に', 'を', 'へ'], e: 'で también indica el medio de transporte: バスで きます (vengo en bus).' },
    { b: 'particulas', q: 'Completa con la partícula correcta (sujeto):', s: 'あしたは あめ（　）ふります。', o: ['が', 'を', 'で', 'に'], e: 'が marca el sujeto de fenómenos y verbos intransitivos: あめが ふります (llueve).' },
    { b: 'particulas', q: 'Completa con la partícula correcta («hasta»):', s: 'ごご ごじ（　）はたらきます。', o: ['まで', 'から', 'に', 'で'], e: 'まで indica el límite final («hasta»): ごじまで はたらきます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta («desde»):', s: 'ごぜん くじ（　）べんきょうします。', o: ['から', 'まで', 'を', 'で'], e: 'から indica el punto de partida («desde»): くじから べんきょうします.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'あさ パン（　）たべます。', o: ['を', 'に', 'で', 'が'], e: 'パン es el objeto directo de たべます: パンを たべます.' },
    { b: 'particulas', q: '¿Qué partícula marca el lugar DONDE se hace una acción?', o: ['で', 'に', 'を', 'は'], e: 'で = lugar de la acción (としょかんで よみます). に = destino o momento exacto.' },
    { b: 'particulas', q: '¿Qué partícula marca el DESTINO con いく, くる o かえる?', o: ['に', 'で', 'を', 'が'], e: 'に marca el destino de un movimiento: がっこうに いきます.' },
    { b: 'particulas', q: '¿Cuál de estas expresiones de tiempo SÍ lleva に?', o: ['ろくじ', 'まいにち', 'あした', 'こんしゅう'], e: 'Solo las horas y fechas concretas llevan に (ろくじに). まいにち, あした y こんしゅう no.' },
    { b: 'particulas', q: '¿Cuál de estas expresiones de tiempo NO lleva に?', o: ['きょう', 'しちじ', 'くじはん', 'じゅうじ'], e: 'きょう (hoy) es relativo: no lleva に. Las horas (しちじに, くじはんに…) sí.' },
    { b: 'particulas', q: 'En 「わたしも コーヒーを のみます」, ¿qué significa も?', o: ['también', 'pero', 'en (lugar)', 'a (destino)'], e: 'も = «también»: Yo también bebo café.' },
    { b: 'particulas', q: '¿Qué oración es correcta?', o: ['としょかんで ほんを よみます。', 'としょかんに ほんを よみます。', 'としょかんを ほんで よみます。', 'としょかんで ほんに よみます。'], e: 'Lugar de la acción + で, objeto + を: としょかんで ほんを よみます.' },
    { b: 'particulas', q: '¿Qué oración es correcta?', o: ['じゅうじに ねます。', 'じゅうじで ねます。', 'じゅうじを ねます。', 'じゅうじが ねます。'], e: 'La hora exacta en que ocurre algo lleva に: じゅうじに ねます.' },
    { b: 'particulas', q: '¿Qué oración es correcta?', o: ['まいにち ジムに いきます。', 'まいにちに ジムに いきます。', 'まいにち ジムで いきます。', 'まいにち ジムを いきます。'], e: 'まいにち sin partícula; destino de いく con に: まいにち ジムに いきます.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'せんせい（　）ききます。', o: ['に', 'を', 'で', 'の'], e: 'きく con el sentido de «preguntar a alguien»: la persona lleva に (せんせいに ききます).' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'おんがく（　）ききます。', o: ['を', 'に', 'で', 'が'], e: 'きく con el sentido de «escuchar algo»: la cosa lleva を (おんがくを ききます).' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'A：なんじ（　）ねますか。 B：じゅうにじに ねます。', o: ['に', 'で', 'を', 'が'], e: 'なんじ (qué hora) pregunta por una hora exacta: lleva に → なんじに.' },
    { b: 'particulas', q: 'Completa con la partícula correcta:', s: 'わたしは コーヒー（　）すきです。おちゃ（も）すきです。', o: ['が', 'を', 'に', 'で'], e: 'すきです marca con が lo que gusta; en la segunda parte も sustituye a が.' },

    // ======================= KATAKANA =======================
    { b: 'katakana', q: '¿Qué significa la palabra en katakana 「コーヒー」?', o: ['café', 'jugo', 'pastel', 'pan'], e: 'コーヒー (koohii) significa café. El guion ー alarga la vocal.' },
    { b: 'katakana', q: '¿Qué significa 「パン」?', o: ['pan', 'pasta', 'arroz', 'pastel'], e: 'パン (pan) significa pan.' },
    { b: 'katakana', q: '¿Qué significa 「テレビ」?', o: ['televisión', 'teléfono', 'computador', 'tabla'], e: 'テレビ (terebi) viene de television y significa televisión.' },
    { b: 'katakana', q: '¿Qué significa 「ケーキ」?', o: ['pastel / torta', 'café', 'queso', 'galleta'], e: 'ケーキ (keeki) viene de cake y significa pastel.' },
    { b: 'katakana', q: '¿Qué significa 「コンピューター」?', o: ['computador', 'concierto', 'conveniencia', 'comedor'], e: 'コンピューター (konpyuutaa) significa computador.' },
    { b: 'katakana', q: '¿Qué significa 「バス」?', o: ['bus / autobús', 'baño', 'vaso', 'bici'], e: 'バス (basu) significa bus / autobús.' },
    { b: 'katakana', q: '¿Qué significa 「ジュース」?', o: ['jugo', 'sopa', 'leche', 'agua'], e: 'ジュース (juusu) viene de juice y significa jugo.' },
    { b: 'katakana', q: '¿Qué lugar es 「スーパー」?', o: ['supermercado', 'restaurante', 'estación', 'hospital'], e: 'スーパー (suupaa) es la abreviación de supermarket (supermercado).' },
    { b: 'katakana', q: '¿Qué lugar es 「レストラン」?', o: ['restaurante', 'residencia', 'parque', 'tienda'], e: 'レストラン (resutoran) significa restaurante.' },
    { b: 'katakana', q: '¿Qué es un 「コンビニ」?', o: ['tienda de conveniencia', 'concierto', 'computador', 'comedor escolar'], e: 'コンビニ (konbini) viene de convenience store (tienda 24 h muy común en Japón).' },
    { b: 'katakana', q: '¿Para qué sirve el trazo 「ー」 en palabras como コーヒー o ケーキ?', o: ['Alarga el sonido de la vocal anterior', 'Indica consonante doble', 'Separa dos palabras', 'Cambia la palabra a pasado'], e: 'En katakana, ー (choonpu) duplica la duración de la vocal anterior: コー (koo), ヒー (hii).' },
    { b: 'katakana', q: '¿Cómo se escribe «bus» en katakana?', o: ['バス', 'パス', 'パン', 'ビル'], e: 'バス (basu) = bus. Con maru (パ) sería pa-.' },

    // ======================= NÚMEROS Y KANJI =======================
    { b: 'numeros', q: '¿Qué número representa el kanji 「四」?', o: ['4', '5', '6', '7'], e: '四 se lee よん / し y representa el 4 (cuatro).' },
    { b: 'numeros', q: '¿Qué número representa el kanji 「七」?', o: ['7', '4', '9', '10'], e: '七 se lee なな / しち y representa el 7 (siete).' },
    { b: 'numeros', q: '¿Qué cantidad representa el kanji 「百」?', o: ['100', '10', '1,000', '10,000'], e: '百 (ひゃく / hyaku) vale 100.' },
    { b: 'numeros', q: '¿Qué cantidad representa el kanji 「千」?', o: ['1,000', '100', '10,000', '10'], e: '千 (せん / sen) vale 1,000.' },
    { b: 'numeros', q: '¿Qué cantidad representa el kanji 「万」?', o: ['10,000', '1,000', '100,000', '100'], e: '万 (まん / man) vale 10,000 y es la base para contar números grandes en japonés.' },
    { b: 'numeros', q: '¿Cómo se lee 「300 (三百)」?', o: ['さんびゃく', 'さんひゃく', 'さんぴゃく', 'みひゃく'], e: '300 es una mutación fonética obligatoria: さんびゃく (sanbyaku).' },
    { b: 'numeros', q: '¿Cómo se lee 「600 (六百)」?', o: ['ろっぴゃく', 'ろくひゃく', 'ろくびゃく', 'ろっひゃく'], e: '600 muta con sokuon y p: ろっぴゃく (roppyaku).' },
    { b: 'numeros', q: '¿Cómo se lee 「800 (八百)」?', o: ['はっぴゃく', 'はちひゃく', 'はちびゃく', 'はっびゃく'], e: '800 muta a はっぴゃく (happyaku).' },
    { b: 'numeros', q: '¿Cómo se lee 「3,000 (三千)」?', o: ['さんぜん', 'さんせん', 'さんっせん', 'みせん'], e: '3,000 muta la s a z: さんぜん (sanzen).' },
    { b: 'numeros', q: '¿Qué número es 「一万二千三百四十五」?', o: ['12,345', '1,234', '123,450', '21,345'], e: '一万 (10,000) + 二千 (2,000) + 三百 (300) + 四十五 (45) = 12,345.' },
    { b: 'numeros', q: '¿Cómo se escribe en kanji 「25,000」?', o: ['二万五千', '二十五千', '二千五百', '五万二千'], e: 'Se agrupa por decenas de mil (万): 2×10,000 (二万) + 5,000 (五千) = 二万五千.' },
    { b: 'numeros', q: '¿Qué número es 「五万六百七十八」?', o: ['50,678', '5,678', '56,780', '50,768'], e: '五万 (50,000) + 六百 (600) + 七十八 (78) = 50,678.' },

    // ======================= TIEMPO, DÍAS Y MESES =======================
    { b: 'tiempo', q: '¿Cómo se dice «las 4:00»?', o: ['よじ', 'よんじ', 'しじ', 'よっじ'], e: 'Excepción: las 4 es よじ (no よんじ ni しじ).' },
    { b: 'tiempo', q: '¿Cómo se dice «las 7:00»?', o: ['しちじ', 'ななじ', 'しっじ', 'なのじ'], e: 'Las 7 se dice しちじ (no ななじ).' },
    { b: 'tiempo', q: '¿Cómo se dice «las 9:00»?', o: ['くじ', 'きゅうじ', 'くうじ', 'きゅじ'], e: 'Excepción: las 9 es くじ (no きゅうじ).' },
    { b: 'tiempo', q: '¿Cómo se dice «las 9:30»?', o: ['くじはん', 'きゅうじはん', 'くじさんじゅう', 'はんくじ'], e: '〜はん = y media, se añade después de la hora: くじはん.' },
    { b: 'tiempo', q: '¿Cómo se dice «las 4:30»?', o: ['よじはん', 'よんじはん', 'はんよじ', 'しじはん'], e: 'よじ + はん = よじはん.' },
    { b: 'tiempo', q: '¿Qué significa 「にじごろ」?', o: ['alrededor de las 2', 'a las 2 en punto', 'antes de las 2', 'desde las 2'], e: '〜ごろ = aproximadamente, alrededor de: にじごろ.' },
    { b: 'tiempo', q: '¿Qué significa 「ごご」?', o: ['p. m. / por la tarde', 'a. m.', 'mediodía exacto', 'medianoche'], e: 'ごぜん = a. m.; ごご = p. m. Van antes de la hora: ごご さんじ.' },
    { b: 'tiempo', q: '¿Cómo se dice «las 8 de la mañana»?', o: ['ごぜん はちじ', 'はちじ ごぜん', 'ごご はちじ', 'あさ はちじん'], e: 'ごぜん / ごご van ANTES de la hora: ごぜん はちじ.' },
    { b: 'tiempo', q: '¿Qué día es 「すいようび (水曜日)」?', o: ['miércoles', 'jueves', 'martes', 'viernes'], e: 'すい (水, agua) = miércoles. もく = jueves, か = martes, きん = viernes.' },
    { b: 'tiempo', q: '¿Qué día es 「もくようび (木曜日)」?', o: ['jueves', 'miércoles', 'lunes', 'sábado'], e: 'もく (木, árbol) = jueves.' },
    { b: 'tiempo', q: '¿Qué día es 「きんようび (金曜日)」?', o: ['viernes', 'jueves', 'domingo', 'martes'], e: 'きん (金, oro) = viernes.' },
    { b: 'tiempo', q: '¿Cómo se dice «sábado»?', o: ['どようび', 'にちようび', 'げつようび', 'かようび'], e: 'ど (土, tierra) = sábado. にち = domingo.' },
    { b: 'tiempo', q: '¿Cómo se dice «domingo»?', o: ['にちようび', 'どようび', 'げつようび', 'もくようび'], e: 'にち (日, sol) = domingo.' },
    { b: 'tiempo', q: '¿Cómo se dice «lunes»?', o: ['げつようび', 'かようび', 'きんようび', 'すいようび'], e: 'げつ (月, luna) = lunes.' },
    { b: 'tiempo', q: '¿Qué día corresponde al kanji 「火曜日」?', o: ['martes', 'lunes', 'jueves', 'sábado'], e: '火 (か, fuego) + 曜日 = 火曜日 (かようび), martes.' },
    { b: 'tiempo', q: '¿Cómo se lee «abril (4月)»?', o: ['しがつ', 'よんがつ', 'よがつ', 'しげつ'], e: 'Excepción obligatoria: abril siempre es しがつ (nunca よんがつ).' },
    { b: 'tiempo', q: '¿Cómo se lee «julio (7月)»?', o: ['しちがつ', 'なながつ', 'なのがつ', 'しちげつ'], e: 'Excepción obligatoria: julio siempre es しちがつ.' },
    { b: 'tiempo', q: '¿Cómo se lee «septiembre (9月)»?', o: ['くがつ', 'きゅうがつ', 'きゅがつ', 'ここのがつ'], e: 'Excepción obligatoria: septiembre siempre es くがつ (nunca きゅうがつ).' },
    { b: 'tiempo', q: '¿Qué mes es 「じゅうにがつ (12月)」?', o: ['diciembre', 'octubre', 'noviembre', 'febrero'], e: '12 (じゅうに) + 月 (がつ) = diciembre.' },
    { b: 'tiempo', q: '¿Qué significa 「昨日 (きのう)」?', o: ['ayer', 'hoy', 'mañana', 'ahora'], e: '昨日 (きのう) = ayer. 今日 (きょう) = hoy, 明日 (あした) = mañana.' },
    { b: 'tiempo', q: '¿Qué significa 「毎朝 (まいあさ)」?', o: ['cada mañana', 'cada noche', 'todos los días', 'esta mañana'], e: '毎朝 (まいあさ) = cada mañana. 毎晩 (まいばん) = cada noche.' },
    { b: 'tiempo', q: '¿Qué significa 「先週 (せんしゅう)」?', o: ['la semana pasada', 'esta semana', 'la próxima semana', 'fin de semana'], e: '先週 (せんしゅう) = la semana pasada.' },
    { b: 'tiempo', q: '¿Cómo se pregunta «¿qué día de la semana?»?', o: ['なんようび', 'なんじ', 'いつ', 'なんにち'], e: 'なんようび = qué día de la semana. なんじ = qué hora; いつ = cuándo.' },
    { b: 'tiempo', q: '¿Qué significa 「なんじ」?', o: ['¿qué hora?', '¿cuándo?', '¿qué día?', '¿cuántas horas?'], e: 'なんじ = qué hora. いつ = cuándo (en general).' },
    { b: 'tiempo', q: '¿Qué significa 「らいしゅう」?', o: ['la próxima semana', 'esta semana', 'el fin de semana', 'la semana pasada'], e: 'こんしゅう = esta semana; らいしゅう = la próxima; しゅうまつ = fin de semana.' },
    { b: 'tiempo', q: '¿Qué significa 「しゅうまつ」?', o: ['fin de semana', 'esta semana', 'todos los días', 'la próxima semana'], e: 'しゅうまつ = fin de semana.' },
    { b: 'tiempo', q: 'A：なんじに おきますか。 ¿Cuál es una respuesta correcta?', o: ['しちじに おきます。', 'しちじで おきます。', 'げつようびです。', 'はい、おきます。'], e: 'Pregunta por una hora: responde con la hora + に: しちじに おきます.' },
    { b: 'tiempo', q: '「くじから ごじまで アルバイトを します」 ¿Cuántas horas trabaja?', o: ['8 horas', '5 horas', '9 horas', '4 horas'], e: 'De las 9 (くじ) hasta las 5 (ごじ) = 8 horas.' },
    { b: 'tiempo', q: '¿Qué significa 「あさ」?', o: ['mañana (parte del día)', 'mañana (día siguiente)', 'noche', 'mediodía'], e: 'あさ = la mañana (parte del día). あした = mañana (el día siguiente).' },
    { b: 'tiempo', q: '¿Qué significa 「あした」?', o: ['mañana (día siguiente)', 'hoy', 'la mañana (parte del día)', 'ayer'], e: 'あした = mañana, el día siguiente. あさ = la mañana del día.' },
    { b: 'tiempo', q: '¿Cómo se dice «las 12:30»?', o: ['じゅうにじはん', 'じゅうにはんじ', 'はんじゅうにじ', 'じゅうにじさん'], e: 'Hora + はん: じゅうにじ + はん = じゅうにじはん.' },
    { b: 'tiempo', q: '¿Cómo se dice «alrededor de las 11 de la noche»?', o: ['ごご じゅういちじごろ', 'ごぜん じゅういちじごろ', 'じゅういちじごろ ごご', 'ごご ごろ じゅういちじ'], e: 'ごご + hora + ごろ: ごご じゅういちじごろ.' },
    { b: 'tiempo', q: '¿Qué significa 「いつ」?', o: ['¿cuándo?', '¿qué hora?', '¿dónde?', '¿qué?'], e: 'いつ = cuándo. Normalmente no lleva に.' },

    // ======================= VERBOS (PRESENTE Y PASADO) =======================
    { b: 'verbos', q: '¿Qué tipo de verbo es 「かえる」 (volver)?', o: ['Verbo u (godan)', 'Verbo ru (ichidan)', 'Verbo irregular', 'Verbo する'], e: 'Trampa: かえる termina en -eru pero es verbo u → かえります (no かえます).' },
    { b: 'verbos', q: '¿Qué tipo de verbo es 「たべる」?', o: ['Verbo ru (ichidan)', 'Verbo u (godan)', 'Verbo irregular', 'Verbo する'], e: 'たべる es verbo ru: se quita る y se añade ます → たべます.' },
    { b: 'verbos', q: '¿Qué tipo de verbo es 「くる」?', o: ['Verbo irregular', 'Verbo ru (ichidan)', 'Verbo u (godan)', 'No es un verbo'], e: 'Solo hay dos irregulares: くる → きます y する → します.' },
    { b: 'verbos', q: '¿Cuál de estos verbos es un verbo ru?', o: ['みる', 'のむ', 'いく', 'かう'], e: 'Verbos ru de la lección: おきる, ねる, たべる, みる.' },
    { b: 'verbos', q: '¿Cuál de estos verbos es un verbo u?', o: ['よむ', 'ねる', 'おきる', 'たべる'], e: 'よむ → よみます (u → i + ます). ねる, おきる y たべる son ru.' },
    { b: 'verbos', q: 'Forma ます de 「かえる」:', o: ['かえります', 'かえます', 'かえるます', 'かえいます'], e: 'かえる es verbo u: る → り + ます = かえります.' },
    { b: 'verbos', q: 'Forma ます de 「くる」:', o: ['きます', 'くります', 'くるます', 'こます'], e: 'くる es irregular: きます.' },
    { b: 'verbos', q: 'Forma ます de 「のむ」:', o: ['のみます', 'のむます', 'のめます', 'のまます'], e: 'Verbo u: む → み + ます = のみます.' },
    { b: 'verbos', q: 'Forma negativa (〜ません) de 「みる」:', o: ['みません', 'みりません', 'みるません', 'みまさん'], e: 'Verbo ru: quita る + ません → みません.' },
    { b: 'verbos', q: 'Forma negativa (〜ません) de 「いく」:', o: ['いきません', 'いくません', 'いかません', 'いけません'], e: 'Verbo u: く → き + ません = いきません.' },
    { b: 'verbos', q: 'Forma negativa (〜ません) de 「する」:', o: ['しません', 'すません', 'するません', 'さません'], e: 'する es irregular: します / しません.' },
    { b: 'verbos', q: '¿Cuál es la forma de diccionario de 「おきます」?', o: ['おきる', 'おきく', 'おきむ', 'おける'], e: 'おきます viene de おきる (verbo ru: levantarse).' },
    { b: 'verbos', q: '¿Cuál es la forma de diccionario de 「かいます」?', o: ['かう', 'かいる', 'かく', 'かえる'], e: 'かいます viene de かう (comprar). かえる = volver.' },
    { b: 'verbos', q: '¿Qué significa 「ねます」?', o: ['dormir / acostarse', 'levantarse', 'comer', 'leer'], e: 'ねる = dormir, irse a la cama → ねます.' },
    { b: 'verbos', q: '¿Qué significa 「かえります」?', o: ['volver (a casa)', 'comprar', 'cambiar', 'escribir'], e: 'かえる = volver al lugar de origen: うちに かえります.' },
    { b: 'verbos', q: '¿Qué significa 「ききます」?', o: ['escuchar / preguntar', 'ir', 'ver', 'llegar'], e: 'きく = escuchar (algo を) o preguntar (a alguien に).' },
    { b: 'verbos', q: '¿Qué verbo completa la oración?', s: 'まいばん テレビを（　）。', o: ['みます', 'いきます', 'かえります', 'おきます'], e: 'テレビを + ver: テレビを みます.' },
    { b: 'verbos', q: '¿Qué verbo completa la oración?', s: 'としょかんで ほんを（　）。', o: ['よみます', 'のみます', 'ねます', 'きます'], e: 'ほん (libro) + leer: ほんを よみます.' },
    { b: 'verbos', q: '¿Qué verbo completa la oración?', s: 'カフェで コーヒーを（　）。', o: ['のみます', 'たべます', 'みます', 'かえります'], e: 'Las bebidas se toman con のむ: コーヒーを のみます.' },
    { b: 'verbos', q: '¿Qué verbo completa la oración?', s: 'ごご ごじに うちに（　）。', o: ['かえります', 'たべます', 'よみます', 'のみます'], e: 'うちに + movimiento: うちに かえります (volver a casa).' },
    { b: 'verbos', q: '¿Qué verbo completa la oración?', s: 'としょかんで しゅくだいを（　）。', o: ['します', 'いきます', 'きます', 'ねます'], e: 'しゅくだいを する = hacer la tarea → します.' },
    { b: 'verbos', q: '¿Cuál de estos verbos NO usa を con su objeto?', o: ['いく', 'たべる', 'よむ', 'かう'], e: 'いく es de movimiento: lleva に (destino), no を.' },
    { b: 'verbos', q: '「わたしは あまり テレビを みません」 está en…', o: ['negativo presente / futuro', 'afirmativo', 'pasado', 'pregunta'], e: '〜ません = negativo no pasado (presente o futuro).' },
    { b: 'verbos', q: 'Forma ます de 「べんきょうする」:', o: ['べんきょうします', 'べんきょうきます', 'べんきょうすります', 'べんきょうさます'], e: 'Los verbos 〜する siguen a する: べんきょうします.' },
    { b: 'verbos', q: '¿Cómo se dice «voy a hacer compras»?', o: ['かいものに いきます', 'かいものを いきます', 'かいものに かいます', 'かいものが いきます'], e: 'Actividad + に + いく = ir a hacer algo: かいものに いきます.' },
    { b: 'verbos', q: 'Completa con el verbo en tiempo correcto:', s: 'わたしは まいにち あさごはんを（　）。', o: ['たべます', 'たべるです', 'たべります', 'たべまして'], e: 'まいにち (100 %) va con afirmativo presente: まいにち たべます.' },
    // Pasado positivo (〜ました), pasado negativo (〜ませんでした), nuevos verbos y すきです
    { b: 'verbos', q: 'Completa en PASADO afirmativo (〜ました):', s: 'きのう、わたしは としょかんで（　）。', o: ['べんきょうしました', 'べんきょうします', 'べんきょうしません', 'べんきょうしでした'], e: 'きのう (ayer) exige pasado: 〜ます pasa a 〜ました → べんきょうしました.' },
    { b: 'verbos', q: '¿Cómo se dice «dormí / me acosté» (pasado de ねます)?', o: ['ねました', 'ねます', 'ねません', 'ねませんでした'], e: 'El pasado afirmativo cambia ます por ました: ねます → ねました.' },
    { b: 'verbos', q: '¿Cómo se dice «fui» (pasado de いきます)?', o: ['いきました', 'いきます', 'いくました', 'いかました'], e: 'いきます → いきました (pasado afirmativo).' },
    { b: 'verbos', q: '¿Cómo se dice «no trabajé» (pasado negativo)?', o: ['はたらきませんでした', 'はたらきません', 'はたらきました', 'はたらくませんでした'], e: 'El pasado negativo añade でした a 〜ません: はたらきませんでした.' },
    { b: 'verbos', q: 'Completa en PASADO negativo (ayer no vi TV):', s: 'きのう、テレビを（　）。', o: ['みませんでした', 'みません', 'みました', 'みなかったです'], e: 'Con きのう y sentido negativo se usa 〜ませんでした: みませんでした.' },
    { b: 'verbos', q: '¿Cómo se dice «no escuché / no pregunté» (pasado negativo)?', o: ['ききませんでした', 'ききません', 'ききました', 'きくませんでした'], e: 'ききます → ききません → ききませんでした.' },
    { b: 'verbos', q: '¿Cómo se dice «no vine» (pasado negativo de きます)?', o: ['きませんでした', 'きました', 'きません', 'くませんでした'], e: 'きます → きません → きませんでした.' },
    { b: 'verbos', q: '¿Qué significa 「かきました」?', o: ['escribí', 'leí', 'escuché', 'compré'], e: 'かきます (escribir) en pasado: かきました (escribí). Comprar es かいました.' },
    { b: 'verbos', q: '¿Qué significa 「やすみます」?', o: ['descansar', 'trabajar', 'escribir', 'regresar'], e: 'やすみます (de やすむ) significa descansar / ausentarse.' },
    { b: 'verbos', q: '¿Qué significa 「はたらきます」?', o: ['trabajar', 'estudiar', 'levantarse', 'descansar'], e: 'はたらきます (de はたらく) significa trabajar.' },
    { b: 'verbos', q: '¿Cuál es el pasado afirmativo de 「すきです」 (me gustaba)?', o: ['すきでした', 'すきました', 'すきですした', 'すきではありません'], e: 'すきです usa la cópula です: su pasado afirmativo es すきでした.' },
    { b: 'verbos', q: '¿Cuál es el presente negativo de 「すきです」 (no me gusta)?', o: ['すきではありません', 'すきません', 'すきじゃました', 'すきでした'], e: 'La negación formal de すきです es すきではありません (o すきじゃありません).' },
    { b: 'verbos', q: '¿Cuál es el pasado negativo de 「すきです」 (no me gustaba)?', o: ['すきではありませんでした', 'すきませんでした', 'すきではありません', 'すきでませんでした'], e: 'Pasado negativo de です: すきではありません + でした → すきではありませんでした.' },
    { b: 'verbos', q: 'Completa en pasado:', s: 'けさ、ろくじに（　）。', o: ['おきました', 'おきます', 'おきります', 'おきるました'], e: 'けさ (esta mañana, ya pasó) usa pasado afirmativo: おきました (me levanté).' },

    // ======================= ORDEN DE LA ORACIÓN =======================
    { b: 'orden', q: '¿Qué oración tiene el orden correcto?', o: ['わたしは まいにち しちじに おきます。', 'わたしは おきます まいにち しちじに。', 'おきます わたしは しちじに まいにち。', 'わたしは まいにち おきます しちじに。'], e: 'En japonés el verbo va SIEMPRE al final: Tema は + tiempo + verbo.' },
    { b: 'orden', q: '¿Qué oración tiene el orden correcto?', o: ['たなかさんは しょくどうで ひるごはんを たべます。', 'たなかさんは たべます しょくどうで ひるごはんを。', 'たなかさんは しょくどうで たべます ひるごはんを。', 'たなかさんは ひるごはんを たべます しょくどうで。'], e: 'Orden típico: Tema は + lugar で + objeto を + verbo al final.' },
    { b: 'orden', q: '¿Qué oración tiene el orden correcto?', o: ['あした ともだちと カフェに いきます。', 'あした いきます ともだちと カフェに。', 'いきます あした カフェに ともだちと。', 'あした ともだちと いきます カフェに。'], e: 'El verbo (いきます) va al final; los complementos van antes.' },
    { b: 'orden', q: 'Ordena: ［ がっこうに / わたしは / いきます / はちじに ］', o: ['わたしは はちじに がっこうに いきます。', 'はちじに いきます わたしは がっこうに。', 'がっこうに わたしは いきます はちじに。', 'いきます わたしは はちじに がっこうに。'], e: 'Tema (わたしは) + tiempo (はちじに) + destino (がっこうに) + verbo.' },
    { b: 'orden', q: 'Ordena: ［ よく / を / ニュース / みます ］', o: ['よく ニュースを みます。', 'よく を ニュース みます。', 'ニュース よく みます を。', 'みます よく ニュースを。'], e: 'La partícula va DESPUÉS del sustantivo (ニュースを) y el verbo al final.' },
    { b: 'orden', q: '¿Dónde va la partícula を?', o: ['Justo después del objeto: ほんを', 'Antes del objeto: を ほん', 'Al final de la oración', 'Antes del verbo, separada del objeto'], e: 'Las partículas siempre van DETRÁS de la palabra que marcan: ほんを よみます.' },
    { b: 'orden', q: '¿Qué oración tiene el orden correcto?', o: ['よる としょかんで しゅくだいを します。', 'よる しゅくだいを します としょかんで。', 'します よる としょかんで しゅくだいを。', 'よる で としょかん しゅくだいを します。'], e: 'Tiempo + lugar で + objeto を + verbo. La partícula va después de としょかん.' },
    { b: 'orden', q: '¿Qué oración tiene el orden correcto?', o: ['わたしは コーヒーが すきです。', 'わたしは すきです コーヒーが。', 'すきです わたしは コーヒーが。', 'わたしは が コーヒー すきです。'], e: 'X が すきです: lo que gusta + が, y すきです al final.' },
    { b: 'orden', q: 'Ordena: ［ うちに / ごご ろくじに / かえります / マリアさんは ］', o: ['マリアさんは ごご ろくじに うちに かえります。', 'かえります マリアさんは うちに ごご ろくじに。', 'マリアさんは かえります ごご ろくじに うちに。', 'うちに かえります マリアさんは ごご ろくじに。'], e: 'Tema + tiempo + destino + verbo al final.' },
    { b: 'orden', q: '¿Qué pregunta tiene el orden correcto?', o: ['しゅうまつ なにを しますか。', 'なにを しますか しゅうまつ。', 'しますか なにを しゅうまつ。', 'しゅうまつ しますか なにを。'], e: 'En una pregunta, か va al final, después del verbo: 〜しますか.' },
    { b: 'orden', q: '¿Qué oración tiene el orden correcto?', o: ['クラスの あとで としょかんに いきます。', 'あとで の クラス としょかんに いきます。', 'クラスの としょかんに あとで いきます。', 'いきます クラスの あとで としょかんに。'], e: 'Sustantivo + の あとで («después de…»), y el verbo al final.' },
    { b: 'orden', q: '¿Qué oración tiene el orden correcto?', o: ['わたしは ぜんぜん コーヒーを のみません。', 'わたしは ぜんぜん のみません コーヒーを。', 'わたしは コーヒーを ぜんぜん のみます。', 'のみません わたしは ぜんぜん コーヒーを。'], e: 'Verbo al final, y ぜんぜん exige verbo negativo (のみません).' },

    // ======================= FRECUENCIA =======================
    { b: 'frecuencia', q: 'Completa:', s: 'わたしは ぜんぜん テレビを（　）。', o: ['みません', 'みます', 'みる', 'みましょう'], e: 'ぜんぜん (nunca, nada) va SIEMPRE con verbo negativo: みません.' },
    { b: 'frecuencia', q: 'Completa:', s: 'たなかさんは あまり コーヒーを（　）。', o: ['のみません', 'のみます', 'のむ', 'のみ'], e: 'あまり (no mucho) va con verbo negativo: あまり のみません.' },
    { b: 'frecuencia', q: 'Completa:', s: 'わたしは（　）ジムに いきます。(Voy a menudo al gimnasio.)', o: ['よく', 'ぜんぜん', 'あまり', 'ちょっと'], e: 'よく = a menudo, con verbo afirmativo: よく いきます.' },
    { b: 'frecuencia', q: 'Ordena de MENOS a MÁS frecuente:', o: ['ぜんぜん → あまり → ときどき → よく → まいにち', 'あまり → ぜんぜん → よく → ときどき → まいにち', 'ときどき → あまり → ぜんぜん → まいにち → よく', 'まいにち → よく → ときどき → あまり → ぜんぜん'], e: 'ぜんぜん (0 %) < あまり < ときどき < よく < まいにち (100 %).' },
    { b: 'frecuencia', q: '¿Qué significa 「ときどき」?', o: ['a veces', 'siempre', 'nunca', 'a menudo'], e: 'ときどき = a veces (frecuencia media).' },
    { b: 'frecuencia', q: '¿Qué significa 「あまり 〜ません」?', o: ['no mucho / casi no', 'nunca', 'a veces', 'todos los días'], e: 'あまり + negativo = no muy a menudo.' },
    { b: 'frecuencia', q: '¿Qué oración es correcta?', o: ['ときどき カフェに いきます。', 'ぜんぜん カフェに いきます。', 'あまり カフェに いきます。', 'ときどき カフェに いきません よく。'], e: 'ときどき va con afirmativo. ぜんぜん y あまり exigen negativo.' },
    { b: 'frecuencia', q: '¿Qué oración es correcta?', o: ['あまり ゲームを しません。', 'あまり ゲームを します。', 'ぜんぜん ゲームを します。', 'よく ゲームを しません。'], e: 'あまり + negativo (しません). よく va con afirmativo.' },
    { b: 'frecuencia', q: '«Nunca bebo café» se dice:', o: ['ぜんぜん コーヒーを のみません。', 'あまり コーヒーを のみます。', 'ぜんぜん コーヒーを のみます。', 'ときどき コーヒーを のみません。'], e: 'Nunca = ぜんぜん + negativo: ぜんぜん のみません.' },
    { b: 'frecuencia', q: '¿Qué palabra significa «todos los días»?', o: ['まいにち', 'まいしゅう', 'ときどき', 'きょう'], e: 'まいにち = todos los días; まいしゅう = todas las semanas.' },

    // ======================= CONECTORES =======================
    { b: 'conectores', q: 'Elige el conector:', s: 'あさ しちじに おきます。（　）、がっこうに いきます。', o: ['それから', 'でも', 'だから', 'じゃ'], e: 'それから = y luego (acciones en orden): me levanto, y luego voy a la escuela.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'おちゃが すきです。（　）、まいにち のみます。', o: ['だから', 'でも', 'それから', 'ちょっと'], e: 'だから = por eso (causa → consecuencia): me gusta el té, por eso lo bebo a diario.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'コーヒーが すきです。（　）、よるは のみません。', o: ['でも', 'だから', 'それから', 'たくさん'], e: 'でも = pero (contraste): me gusta el café, pero de noche no lo bebo.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'アニメが だいすきです。（　）、よく みます。', o: ['だから', 'でも', 'それから', 'ええ'], e: 'Gustar mucho → verlo a menudo es consecuencia: だから.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'ばんごはんを たべます。（　）、テレビを みます。', o: ['それから', 'だから', 'でも', 'じゃ'], e: 'Dos acciones en secuencia (cenar → ver TV): それから.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'ジムが すきです。（　）、あまり いきません。', o: ['でも', 'だから', 'それから', 'たくさん'], e: 'Contraste (me gusta, pero no voy mucho): でも.' },
    { b: 'conectores', q: '¿Qué significa 「だから」?', o: ['por eso / así que', 'pero', 'y luego', 'también'], e: 'だから introduce una consecuencia.' },
    { b: 'conectores', q: '¿Qué significa 「でも」?', o: ['pero / sin embargo', 'por eso', 'y luego', 'entonces (bueno…)'], e: 'でも introduce un contraste.' },
    { b: 'conectores', q: '¿Qué significa 「それから」?', o: ['y luego / después', 'pero', 'por eso', 'a veces'], e: 'それから indica la siguiente acción en una secuencia.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'しゅうまつは やすみです。（　）、ともだちと コンサートに いきます。', o: ['だから', 'でも', 'ちょっと', 'じゃ'], e: 'Es día libre → por eso voy al concierto: だから.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'いそがしいです。（　）、たのしいです。', o: ['でも', 'だから', 'それから', 'そして'], e: 'Contraste («Estoy ocupado, pero es divertido»): でも.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'つかれました。（　）、やすみます。', o: ['だから', 'でも', 'それから', 'ちょっと'], e: 'Causa y consecuencia («Estoy cansado, por eso descanso»): だから.' },
    { b: 'conectores', q: 'Elige el conector:', s: 'ごはんを たべます。（　）、ねます。', o: ['それから', 'でも', 'だから', 'も'], e: 'Secuencia temporal («Como, y luego duermo»): それから.' },

    // ======================= VOCABULARIO =======================
    { b: 'vocabulario', q: '¿Qué significa 「としょかん」?', o: ['biblioteca', 'cafetería', 'escuela', 'habitación'], e: 'としょかん = biblioteca.' },
    { b: 'vocabulario', q: '¿Qué significa 「しょくどう」?', o: ['cafetería / comedor', 'biblioteca', 'restaurante elegante', 'cocina de casa'], e: 'しょくどう = comedor, cafetería (de la escuela).' },
    { b: 'vocabulario', q: '¿Qué significa 「りょう」?', o: ['residencia estudiantil', 'apartamento', 'gimnasio', 'clase'], e: 'りょう = residencia (dormitorio de estudiantes).' },
    { b: 'vocabulario', q: '¿Qué significa 「ばんごはん」?', o: ['cena', 'almuerzo', 'desayuno', 'merienda'], e: 'あさごはん = desayuno, ひるごはん = almuerzo, ばんごはん = cena.' },
    { b: 'vocabulario', q: '¿Qué significa 「ひるごはん」?', o: ['almuerzo', 'cena', 'desayuno', 'arroz'], e: 'ひる = mediodía → ひるごはん = almuerzo.' },
    { b: 'vocabulario', q: '¿Cómo se dice «tarea»?', o: ['しゅくだい', 'しゅうまつ', 'しょくどう', 'しごと'], e: 'しゅくだい = tarea. しゅくだいを します.' },
    { b: 'vocabulario', q: '¿Cómo se dice «agua»?', o: ['みず', 'おちゃ', 'ごはん', 'みる'], e: 'みず = agua; おちゃ = té verde.' },
    { b: 'vocabulario', q: '¿Qué significa 「かいもの」?', o: ['compras', 'camino', 'fiesta', 'concierto'], e: 'かいもの = compras: かいものに いきます.' },
    { b: 'vocabulario', q: '¿Qué significa 「やすみ」?', o: ['descanso / día libre', 'noche', 'trabajo', 'mañana'], e: 'やすみ = descanso, día libre, vacaciones.' },
    { b: 'vocabulario', q: '¿Qué significa 「アルバイト（バイト）」?', o: ['trabajo de medio tiempo', 'deporte', 'tarea', 'videojuego'], e: 'アルバイト / バイト = trabajo de medio tiempo: アルバイトを します.' },
    { b: 'vocabulario', q: '¿Qué significa 「へや」?', o: ['habitación', 'casa', 'escuela', 'gimnasio'], e: 'へや = habitación, cuarto.' },
    { b: 'vocabulario', q: '¿Qué significa 「たくさん」?', o: ['mucho / muchos', 'un poco', 'a veces', 'nunca'], e: 'たくさん = mucho. ちょっと = un poco.' },
    { b: 'vocabulario', q: 'A：おんがくは なにが すきですか。 B：「〜は ちょっと…」 ¿Qué quiere decir B?', o: ['Que eso no le gusta mucho', 'Que le encanta', 'Que no entiende la pregunta', 'Que tiene poco tiempo'], e: '〜は ちょっと… es una forma suave de decir que algo no te gusta mucho.' },
    { b: 'vocabulario', q: '¿Qué significa 「いいですね」?', o: ['¡Qué bien! / Suena bien', 'No, gracias', 'Hasta luego', 'Lo siento'], e: 'いいですね = ¡qué bien!, se usa para reaccionar positivamente.' },
    { b: 'vocabulario', q: '¿Qué significa 「クラスの あとで」?', o: ['después de clase', 'antes de clase', 'durante la clase', 'en la clase'], e: 'Sustantivo + の あとで = después de…' },
    { b: 'vocabulario', q: '¿Qué significa 「ごはん」?', o: ['comida / arroz cocido', 'pan', 'té', 'noche'], e: 'ごはん = comida, arroz cocido.' },
    { b: 'vocabulario', q: '¿Cómo se dice «gimnasio»?', o: ['ジム', 'カフェ', 'クラス', 'アパート'], e: 'ジム = gimnasio.' },
    { b: 'vocabulario', q: '¿Qué significa 「よる」?', o: ['noche', 'mediodía', 'mañana', 'tarde'], e: 'あさ = mañana, ひる = mediodía, よる = noche.' },
    { b: 'vocabulario', q: '¿Qué significa 「にく」?', o: ['carne', 'pescado', 'verdura', 'huevo'], e: 'にく = carne, さかな = pescado, やさい = verdura, たまご = huevo.' },
    { b: 'vocabulario', q: '¿Qué significa 「さかな」?', o: ['pescado', 'carne', 'fruta', 'leche'], e: 'さかな = pescado.' },
    { b: 'vocabulario', q: '¿Qué significa 「やさい」?', o: ['verdura', 'fruta', 'huevo', 'arroz'], e: 'やさい = verdura / vegetales.' },
    { b: 'vocabulario', q: '¿Cómo se dice «huevo»?', o: ['たまご', 'にく', 'パン', 'みず'], e: 'たまご = huevo.' },
    { b: 'vocabulario', q: '¿Cómo se dice «leche»?', o: ['ぎゅうにゅう', 'おちゃ', 'みず', 'ジュース'], e: 'ぎゅうにゅう = leche.' },
    { b: 'vocabulario', q: '¿Qué lugar es 「えき」?', o: ['estación (de tren)', 'hospital', 'parque', 'biblioteca'], e: 'えき = estación.' },
    { b: 'vocabulario', q: '¿Qué lugar es 「びょういん」?', o: ['hospital', 'parque', 'escuela', 'estación'], e: 'びょういん = hospital.' },
    { b: 'vocabulario', q: '¿Qué lugar es 「こうえん」?', o: ['parque', 'hospital', 'comedor', 'supermercado'], e: 'こうえん = parque.' },

    // ======================= LECTURA =======================
    { b: 'lectura', r: 'r1', q: '¿A qué hora se levanta María?', o: ['A las 7', 'A las 8:30', 'A las 4', 'A las 11'], e: '「まいにち しちじに おきます」: se levanta a las 7.' },
    { b: 'lectura', r: 'r1', q: '¿Dónde almuerza María?', o: ['En el comedor de la escuela', 'En casa', 'En un café', 'En la biblioteca'], e: '「ひるごはんは しょくどうで たべます」.' },
    { b: 'lectura', r: 'r1', q: '¿Qué hace María por la noche?', o: ['Ve televisión', 'Va al gimnasio', 'Hace la tarea en la biblioteca', 'Trabaja'], e: '「よる、テレビを みます」.' },
    { b: 'lectura', r: 'r1', q: '¿A qué hora, aproximadamente, se acuesta?', o: ['Alrededor de las 11', 'A las 7', 'A las 4 de la tarde', 'A las 8:30'], e: '「じゅういちじごろ ねます」: ごろ = alrededor de.' },
    { b: 'lectura', r: 'r2', q: '¿Qué hace Ken el sábado por la mañana?', o: ['Hace deporte en el gimnasio', 'Juega videojuegos en casa', 'Toma café en casa', 'Duerme'], e: '「どようびの あさ、ジムで スポーツを します」.' },
    { b: 'lectura', r: 'r2', q: '¿Con qué frecuencia va Ken al gimnasio los domingos?', o: ['No mucho', 'Todos los domingos', 'A menudo', 'Siempre por la mañana'], e: '「にちようびは あまり ジムに いきません」: あまり + negativo = no mucho.' },
    { b: 'lectura', r: 'r2', q: '¿Por qué toma café Ken todos los días?', o: ['Porque le gusta el café', 'Porque trabaja en un café', 'Porque tiene sueño', 'Porque es domingo'], e: '「コーヒーが すきです。だから、まいにち…のみます」: だから indica la razón.' },
    { b: 'lectura', r: 'r3', q: '¿De qué hora a qué hora tiene clase Yui los miércoles?', o: ['De 9 a 12', 'De 12 a 6', 'De 6 a 9', 'De 9 a 6'], e: '「くじから じゅうにじまで クラスが あります」.' },
    { b: 'lectura', r: 'r3', q: '¿Qué hace Yui después de clase?', o: ['La tarea en la biblioteca', 'Toma café', 'Va al trabajo', 'Ve la televisión'], e: '「クラスの あとで、としょかんで しゅくだいを します」.' },
    { b: 'lectura', r: 'r3', q: '¿Cuál de estas afirmaciones es verdadera?', o: ['Yui nunca toma café', 'Yui toma café a veces', 'A Yui no le gusta el té', 'Yui trabaja por la mañana'], e: '「コーヒーは ぜんぜん のみません」: ぜんぜん + negativo = nunca.' },
    { b: 'lectura', r: 'r4', q: '¿Cómo fue Tanaka a la escuela ayer?', o: ['En bus', 'En bicicleta', 'A pie', 'En tren'], e: '「バスで がっこうに いきました」: で indica el medio de transporte.' },
    { b: 'lectura', r: 'r4', q: '¿Qué compró Tanaka en el supermercado?', o: ['Pan y leche', 'Carne y verduras', 'Café y pastel', 'Pescado y arroz'], e: '「スーパーで パンと ぎゅうにゅうを かいました」.' },
    { b: 'lectura', r: 'r4', q: '¿Por qué no vio televisión Tanaka por la noche?', o: ['Porque estaba cansado', 'Porque no tiene televisor', 'Porque estudió hasta las 11', 'Porque fue a una fiesta'], e: '「つかれました。だから、テレビを みませんでした」: estuvo cansado, por eso no vio TV.' },

    // ======================= CULTURA =======================
    { b: 'cultura', q: '¿Qué saludo se usa por la mañana en Japón?', o: ['おはようございます', 'こんばんは', 'おやすみなさい', 'さようなら'], e: 'おはようございます significa «buenos días».' },
    { b: 'cultura', q: '¿Qué saludo se usa al llegar de noche o saludar al anochecer?', o: ['こんばんは', 'おはようございます', 'こんにちは', 'いただきます'], e: 'こんばんは se usa para saludar por la noche.' },
    { b: 'cultura', q: '¿Qué costumbre representa el término 「おじぎ」?', o: ['Inclinarse (reverencia) al saludar como señal de respeto', 'Quitarse los zapatos al entrar a la escuela', 'Aplaudir antes de comer', 'Dar un abrazo al presentarse'], e: 'おじぎ es la inclinación o reverencia tradicional para saludar, agradecer o pedir disculpas.' },
    { b: 'cultura', q: 'En la vida escolar japonesa (学校生活), ¿quién limpia las aulas y pasillos?', o: ['Los propios estudiantes (そうじ)', 'Solo empresas externas por la noche', 'Únicamente los profesores', 'Los padres de familia'], e: 'En Japón los estudiantes limpian su escuela diariamente (そうじ) para cuidar el espacio común.' },
    { b: 'cultura', q: '¿Qué valor expresa la frase 「がんばって！」 (ganbatte)?', o: ['¡Ánimo / Esfuérzate!', '¡Buen provecho!', '¡Disculpa la molestia!', '¡Bienvenido a casa!'], e: 'がんばる / がんばって refleja la cultura del esfuerzo y la constancia.' },
    { b: 'cultura', q: 'Al salir de casa, ¿qué dice la persona que se va?', o: ['いってきます', 'ただいま', 'おかえりなさい', 'ごちそうさまでした'], e: 'Quien sale dice いってきます («voy y vuelvo»), y en casa le responden いってらっしゃい.' },
    { b: 'cultura', q: 'Al regresar a casa, ¿qué te responden quienes estaban adentro?', o: ['おかえりなさい', 'いってきます', 'いってらっしゃい', 'こんにちは'], e: 'Tú dices ただいま («ya volví») y responden おかえりなさい («bienvenido/a de vuelta»).' },
    { b: 'cultura', q: '¿Qué se dice justo antes de empezar a comer?', o: ['いただきます', 'ごちそうさまでした', 'ただいま', 'おはようございます'], e: 'いただきます expresa gratitud por la comida antes de empezar.' },
    { b: 'cultura', q: '¿Qué se dice al terminar de comer para agradecer la comida?', o: ['ごちそうさまでした', 'いただきます', 'いってきます', 'すみません'], e: 'ごちそうさまでした agradece la comida y a quien la preparó al finalizar.' },
    { b: 'cultura', q: '¿Qué rasgo es especialmente valorado en la escuela y el trabajo en Japón?', o: ['La puntualidad y el esfuerzo constante', 'Llegar 15 minutos después como cortesía', 'Evitar saludar al entrar al aula', 'No usar fórmulas de respeto'], e: 'La puntualidad estricta y la dedicación (がんばる) son pilares de la cultura escolar y laboral japonesa.' }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        P2_BLOCKS,
        P2_EXAM,
        P2_KATAKANA,
        P2_NUMBERS_KANJI,
        P2_NUMBER_EXAMPLES,
        P2_HOURS,
        P2_HOUR_TRAPS,
        P2_DAYS,
        P2_MONTHS,
        P2_MONTH_TRAPS,
        P2_VERBS,
        P2_VERB_TRAPS,
        P2_TYPE_NAMES,
        P2_SUKI_FORMS,
        P2_GUIDE_VOCAB,
        P2_CULTURE,
        P2_READINGS,
        P2_BANK
    };
}
