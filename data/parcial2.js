// KotoDojo · 2.º parcial — Japonés 1, Lección 2 «まいにちのせいかつ» (Tobira, cuadernillo 1, págs. 56–57)
//
// Banco de preguntas de opción múltiple. En cada pregunta:
//   b  bloque (ver P2_BLOCKS)        q  enunciado en español
//   s  frase en japonés (opcional)   o  opciones: LA PRIMERA ES LA CORRECTA (se mezclan al mostrarlas)
//   e  explicación de la regla       r  id de la lectura (solo en el bloque «lectura»)
// Las preguntas de horas y verbos se completan con otras generadas en js/parcial2.js.

const P2_BLOCKS = [
    { id: 'particulas', name: 'Partículas', icon: 'fa-link', examCount: 5 },
    { id: 'tiempo', name: 'Tiempo y horas', icon: 'fa-clock', examCount: 4 },
    { id: 'verbos', name: 'Verbos', icon: 'fa-person-running', examCount: 4 },
    { id: 'orden', name: 'Orden de la oración', icon: 'fa-arrow-down-1-9', examCount: 2 },
    { id: 'frecuencia', name: 'Frecuencia', icon: 'fa-chart-simple', examCount: 2 },
    { id: 'conectores', name: 'Conectores', icon: 'fa-arrows-turn-right', examCount: 1 },
    { id: 'vocabulario', name: 'Vocabulario', icon: 'fa-book', examCount: 1 },
    { id: 'lectura', name: 'Lectura', icon: 'fa-book-open-reader', examCount: 1 }
];

const P2_EXAM = { questions: 20, minutes: 30, passGrade: 3.0 };

// ---------- Datos de referencia (págs. 56–57) para la guía y las preguntas generadas ----------
const P2_HOURS = [
    { n: 1, hira: 'いちじ' }, { n: 2, hira: 'にじ' }, { n: 3, hira: 'さんじ' }, { n: 4, hira: 'よじ', ex: true },
    { n: 5, hira: 'ごじ' }, { n: 6, hira: 'ろくじ' }, { n: 7, hira: 'しちじ', ex: true }, { n: 8, hira: 'はちじ' },
    { n: 9, hira: 'くじ', ex: true }, { n: 10, hira: 'じゅうじ' }, { n: 11, hira: 'じゅういちじ' }, { n: 12, hira: 'じゅうにじ' }
];
// Lecturas incorrectas típicas, para usarlas como distractores
const P2_HOUR_TRAPS = { 4: ['よんじ', 'しじ'], 7: ['ななじ', 'なのじ'], 9: ['きゅうじ', 'きゅじ'] };

const P2_DAYS = [
    { es: 'lunes', hira: 'げつようび' }, { es: 'martes', hira: 'かようび' }, { es: 'miércoles', hira: 'すいようび' },
    { es: 'jueves', hira: 'もくようび' }, { es: 'viernes', hira: 'きんようび' }, { es: 'sábado', hira: 'どようび' },
    { es: 'domingo', hira: 'にちようび' }
];

const P2_VERBS = [
    { dict: 'おきる', masu: 'おきます', type: 'ru', es: 'levantarse', p: 'に (hora)' },
    { dict: 'ねる', masu: 'ねます', type: 'ru', es: 'dormir / acostarse', p: 'に (hora)' },
    { dict: 'たべる', masu: 'たべます', type: 'ru', es: 'comer', p: 'を' },
    { dict: 'みる', masu: 'みます', type: 'ru', es: 'ver / mirar', p: 'を' },
    { dict: 'いく', masu: 'いきます', type: 'u', es: 'ir', p: 'に (destino)' },
    { dict: 'かえる', masu: 'かえります', type: 'u', es: 'volver a casa', p: 'に (destino)', trap: true },
    { dict: 'かう', masu: 'かいます', type: 'u', es: 'comprar', p: 'を' },
    { dict: 'きく', masu: 'ききます', type: 'u', es: 'escuchar / preguntar', p: 'を (cosa) · に (persona)' },
    { dict: 'のむ', masu: 'のみます', type: 'u', es: 'beber', p: 'を' },
    { dict: 'よむ', masu: 'よみます', type: 'u', es: 'leer', p: 'を' },
    { dict: 'くる', masu: 'きます', type: 'irr', es: 'venir', p: 'に (destino)' },
    { dict: 'する', masu: 'します', type: 'irr', es: 'hacer', p: 'を' }
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
    'する': ['すります', 'するます', 'さます']
};

const P2_TYPE_NAMES = { ru: 'Verbo ru (ichidan)', u: 'Verbo u (godan)', irr: 'Verbo irregular' };

const P2_GUIDE_VOCAB = [
    { cat: 'Momentos del día', items: [['あさ', 'mañana'], ['ひる', 'mediodía'], ['よる', 'noche'], ['きょう', 'hoy'], ['あした', 'mañana (día)'], ['やすみ', 'descanso / día libre']] },
    { cat: 'Comidas y bebidas', items: [['ごはん', 'comida / arroz'], ['あさごはん', 'desayuno'], ['ひるごはん', 'almuerzo'], ['ばんごはん', 'cena'], ['おちゃ', 'té verde'], ['みず', 'agua'], ['コーヒー', 'café']] },
    { cat: 'Lugares', items: [['いえ / うち', 'casa'], ['がっこう', 'escuela'], ['しょくどう', 'cafetería, comedor'], ['としょかん', 'biblioteca'], ['へや', 'habitación'], ['りょう', 'residencia'], ['アパート', 'apartamento'], ['カフェ', 'café (local)'], ['クラス', 'clase'], ['ジム', 'gimnasio'], ['レストラン', 'restaurante']] },
    { cat: 'Actividades', items: [['テレビ', 'televisión'], ['ニュース', 'noticias'], ['インターネット / ネット', 'internet'], ['しゅくだい', 'tarea'], ['ゲーム', 'videojuego'], ['スポーツ', 'deporte'], ['べんきょう', 'estudio'], ['アルバイト / バイト', 'trabajo de medio tiempo'], ['かいもの', 'compras'], ['コンサート', 'concierto'], ['パーティー', 'fiesta']] },
    { cat: 'Expresiones', items: [['それから', 'y luego'], ['だから', 'por eso'], ['でも', 'pero'], ['たくさん', 'mucho'], ['ちょっと', 'un poco'], ['いいですね', '¡qué bien!'], ['〜の あとで', 'después de 〜'], ['〜は ちょっと…', '〜 no me gusta mucho…']] }
];

// ---------- Lecturas (textos originales al estilo de «わたしの いちにち») ----------
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

    // ======================= TIEMPO Y HORAS =======================
    { b: 'tiempo', q: '¿Cómo se dice «las 4:00»?', o: ['よじ', 'よんじ', 'しじ', 'よっじ'], e: 'Excepción: las 4 es よじ (no よんじ ni しじ).' },
    { b: 'tiempo', q: '¿Cómo se dice «las 7:00»?', o: ['しちじ', 'ななじ', 'しっじ', 'なのじ'], e: 'Las 7 se dice しちじ (no ななじ).' },
    { b: 'tiempo', q: '¿Cómo se dice «las 9:00»?', o: ['くじ', 'きゅうじ', 'くうじ', 'きゅじ'], e: 'Excepción: las 9 es くじ (no きゅうじ).' },
    { b: 'tiempo', q: '¿Cómo se dice «las 9:30»?', o: ['くじはん', 'きゅうじはん', 'くじさんじゅう', 'はんくじ'], e: '〜はん = y media, se añade después de la hora: くじはん.' },
    { b: 'tiempo', q: '¿Cómo se dice «las 4:30»?', o: ['よじはん', 'よんじはん', 'はんよじ', 'しじはん'], e: 'よじ + はん = よじはん.' },
    { b: 'tiempo', q: '¿Qué significa 「にじごろ」?', o: ['alrededor de las 2', 'a las 2 en punto', 'antes de las 2', 'desde las 2'], e: '〜ごろ = aproximadamente, alrededor de: にじごろ.' },
    { b: 'tiempo', q: '¿Qué significa 「ごご」?', o: ['p. m. / por la tarde', 'a. m.', 'mediodía exacto', 'medianoche'], e: 'ごぜん = a. m.; ごご = p. m. Van antes de la hora: ごご さんじ.' },
    { b: 'tiempo', q: '¿Cómo se dice «las 8 de la mañana»?', o: ['ごぜん はちじ', 'はちじ ごぜん', 'ごご はちじ', 'あさ はちじん'], e: 'ごぜん / ごご van ANTES de la hora: ごぜん はちじ.' },
    { b: 'tiempo', q: '¿Qué día es 「すいようび」?', o: ['miércoles', 'jueves', 'martes', 'viernes'], e: 'すい (水, agua) = miércoles. もく = jueves, か = martes, きん = viernes.' },
    { b: 'tiempo', q: '¿Qué día es 「もくようび」?', o: ['jueves', 'miércoles', 'lunes', 'sábado'], e: 'もく (木, árbol) = jueves.' },
    { b: 'tiempo', q: '¿Qué día es 「きんようび」?', o: ['viernes', 'jueves', 'domingo', 'martes'], e: 'きん (金, oro) = viernes.' },
    { b: 'tiempo', q: '¿Cómo se dice «sábado»?', o: ['どようび', 'にちようび', 'げつようび', 'かようび'], e: 'ど (土, tierra) = sábado. にち = domingo.' },
    { b: 'tiempo', q: '¿Cómo se dice «domingo»?', o: ['にちようび', 'どようび', 'げつようび', 'もくようび'], e: 'にち (日, sol) = domingo.' },
    { b: 'tiempo', q: '¿Cómo se dice «lunes»?', o: ['げつようび', 'かようび', 'きんようび', 'すいようび'], e: 'げつ (月, luna) = lunes.' },
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

    // ======================= VERBOS =======================
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
    { b: 'verbos', q: 'Completa con la forma correcta:', s: 'わたしは まいにち あさごはんを（　）。', o: ['たべます', 'たべるです', 'たべります', 'たべまして'], e: 'まいにち (100 %) va con afirmativo: まいにち たべます.' },

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
    { b: 'lectura', r: 'r3', q: '¿Cuál de estas afirmaciones es verdadera?', o: ['Yui nunca toma café', 'Yui toma café a veces', 'A Yui no le gusta el té', 'Yui trabaja por la mañana'], e: '「コーヒーは ぜんぜん のみません」: ぜんぜん + negativo = nunca.' }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { P2_BLOCKS, P2_EXAM, P2_HOURS, P2_HOUR_TRAPS, P2_DAYS, P2_VERBS, P2_VERB_TRAPS, P2_TYPE_NAMES, P2_GUIDE_VOCAB, P2_READINGS, P2_BANK };
}
