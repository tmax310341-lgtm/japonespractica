// KotoDojo · Palabras de clase (1er parcial)
        // ==========================================================
        // PRÁCTICA 1ER PARCIAL (JAPONÉS 1 • PROF. YENY • JAVERIANA)
        // ==========================================================

        
        function playSuccessChime() {
            if (typeof playSoundTone === 'function') {
                playSoundTone(587.33, 'sine', 0.15);
                setTimeout(() => playSoundTone(880, 'sine', 0.22), 100);
            }
        }

        function playErrorBuzzer() {
            if (typeof playSoundTone === 'function') {
                playSoundTone(220, 'sawtooth', 0.25);
            }
        }

        const EXAM_PARCIAL_DATA = {
            VOCABULARY: [
                // Objetos
                { kana: 'ほん', romaji: 'hon', es: 'Libro', cat: 'objects', icon: 'fa-book', example: 'これ は ほん です。' },
                { kana: 'みず', romaji: 'mizu', es: 'Agua', cat: 'objects', icon: 'fa-glass-water', example: 'みず を のみます。' },
                { kana: 'えんぴつ', romaji: 'enpitsu', es: 'Lápiz', cat: 'objects', icon: 'fa-pencil', example: 'わたし の えんぴつ です。' },
                { kana: 'かさ', romaji: 'kasa', es: 'Paraguas', cat: 'objects', icon: 'fa-umbrella', example: 'その かさ は わたし の です。' },
                { kana: 'けいたい', romaji: 'keitai', es: 'Celular / Móvil', cat: 'objects', icon: 'fa-mobile-screen', example: 'けいたい は いくら ですか。' },
                { kana: 'かばん', romaji: 'kaban', es: 'Mochila / Bolso', cat: 'objects', icon: 'fa-briefcase', example: 'せんせい の かばん です。' },
                { kana: 'おべんとう', romaji: 'obentou', es: 'Bentō (Almuerzo empacado)', cat: 'objects', icon: 'fa-box', example: 'おいしい おべんとう です。' },
                { kana: 'おにぎり', romaji: 'onigiri', es: 'Onigiri (Bola de arroz)', cat: 'objects', icon: 'fa-bowl-rice', example: 'おにぎり を たべます。' },
                { kana: 'でんわ', romaji: 'denwa', es: 'Teléfono', cat: 'objects', icon: 'fa-phone', example: 'うち の でんわ です。' },
                { kana: 'まんが', romaji: 'manga', es: 'Manga / Cómic japonés', cat: 'objects', icon: 'fa-book-open', example: 'にほん の まんが です。' },
                { kana: 'ふでばこ', romaji: 'fudebako', es: 'Estuche / Cartuchera', cat: 'objects', icon: 'fa-pen-ruler', example: 'この ふでばこ は だれ の ですか。' },
                { kana: 'じしょ', romaji: 'jisho', es: 'Diccionario', cat: 'objects', icon: 'fa-spell-check', example: 'これ は にほんご の じしょ です。' },
                { kana: 'めがね', romaji: 'megane', es: 'Gafas / Lentes', cat: 'objects', icon: 'fa-glasses', example: 'わたし の めがね です。' },
                { kana: 'おちゃ', romaji: 'ocha', es: 'Té japonés / Té verde', cat: 'objects', icon: 'fa-mug-hot', example: 'おちゃ を のみます。' },
                { kana: 'とけい', romaji: 'tokei', es: 'Reloj', cat: 'objects', icon: 'fa-clock', example: 'あの とけい は いくら ですか。' },
                { kana: 'ノート', romaji: 'nooto', es: 'Cuaderno', cat: 'objects', icon: 'fa-book-bookmark', example: 'がくせい の ノート です。' },
                { kana: 'けしごむ', romaji: 'keshigomu', es: 'Borrador / Goma', cat: 'objects', icon: 'fa-eraser', example: 'ちいさい けしごむ です。' },
                { kana: 'ペン', romaji: 'pen', es: 'Bolígrafo / Lapicero', cat: 'objects', icon: 'fa-pen', example: 'あかい ペン です。' },
                { kana: 'さいふ', romaji: 'saifu', es: 'Billetera / Cartera', cat: 'objects', icon: 'fa-wallet', example: 'わたし の さいふ です。' },
                { kana: 'かぎ', romaji: 'kagi', es: 'Llave', cat: 'objects', icon: 'fa-key', example: 'くるま の かぎ です。' },
                { kana: 'くるま', romaji: 'kuruma', es: 'Carro / Automóvil', cat: 'objects', icon: 'fa-car', example: 'にほん の くるま です。' },
                { kana: 'じてんしゃ', romaji: 'jitensha', es: 'Bicicleta', cat: 'objects', icon: 'fa-bicycle', example: 'ともだち の じてんしゃ です。' },
                { kana: 'しんぶん', romaji: 'shinbun', es: 'Periódico', cat: 'objects', icon: 'fa-newspaper', example: 'きょう の しんぶん です。' },

                // Personas y Profesiones
                { kana: 'せんせい', romaji: 'sensei', es: 'Profesor(a) / Maestro(a)', cat: 'people', icon: 'fa-chalkboard-user', example: 'イエニ せんせい です。' },
                { kana: 'がくせい', romaji: 'gakusei', es: 'Estudiante', cat: 'people', icon: 'fa-user-graduate', example: 'わたし は だいがくせい です。' },
                { kana: 'いしゃ', romaji: 'isha', es: 'Médico / Doctor(a)', cat: 'people', icon: 'fa-user-doctor', example: 'ちち は いしゃ です。' },
                { kana: 'かいしゃいん', romaji: 'kaishain', es: 'Empleado de empresa', cat: 'people', icon: 'fa-user-tie', example: 'たなかさん は かいしゃいん です。' },
                { kana: 'しゅふ', romaji: 'shufu', es: 'Amo(a) de casa', cat: 'people', icon: 'fa-house-user', example: 'はは は しゅふ です。' },
                { kana: 'エンジニア', romaji: 'enjinia', es: 'Ingeniero(a)', cat: 'people', icon: 'fa-laptop-code', example: 'カルロスさん は エンジニア です。' },
                { kana: 'ともだち', romaji: 'tomodachi', es: 'Amigo / Amiga', cat: 'people', icon: 'fa-user-group', example: 'わたし の ともだち です。' },
                { kana: 'おとうさん', romaji: 'otousan', es: 'Padre (respetuoso)', cat: 'people', icon: 'fa-person', example: 'おとうさん は なんさい ですか。' },
                { kana: 'おかあさん', romaji: 'okaasan', es: 'Madre (respetuosa)', cat: 'people', icon: 'fa-person-dress', example: 'おかあさん は せんせい です。' },
                { kana: 'おにいさん', romaji: 'oniisan', es: 'Hermano mayor', cat: 'people', icon: 'fa-person', example: 'おにいさん は 20さい です。' },
                { kana: 'おねえさん', romaji: 'oneesan', es: 'Hermana mayor', cat: 'people', icon: 'fa-person-dress', example: 'おねえさん は いしゃ です。' },
                { kana: 'おとうと', romaji: 'otouto', es: 'Hermano menor', cat: 'people', icon: 'fa-child', example: 'おとうと は がくせい です。' },
                { kana: 'いもうと', romaji: 'imouto', es: 'Hermana menor', cat: 'people', icon: 'fa-child-dress', example: 'いもうと は 15さい です。' },

                // Países, Lugares e Idiomas
                { kana: 'にほん', romaji: 'nihon', es: 'Japón (país)', cat: 'places', icon: 'fa-mountain-sun', example: 'にほん に いきます。' },
                { kana: 'ちゅうごく', romaji: 'chuugoku', es: 'China (país)', cat: 'places', icon: 'fa-earth-asia', example: 'ワンさん は ちゅうごくじん です。' },
                { kana: 'かんこく', romaji: 'kankoku', es: 'Corea del Sur (país)', cat: 'places', icon: 'fa-earth-asia', example: 'キムさん は かんこくじん です。' },
                { kana: 'ロシア', romaji: 'roshia', es: 'Rusia (país)', cat: 'places', icon: 'fa-earth-europe', example: 'ロシアご が できます。' },
                { kana: 'タイ', romaji: 'tai', es: 'Tailandia (país)', cat: 'places', icon: 'fa-earth-asia', example: 'タイ から きました。' },
                { kana: 'アメリカ', romaji: 'amerika', es: 'Estados Unidos (país)', cat: 'places', icon: 'fa-flag-usa', example: 'スミスさん は アメリカじん です。' },
                { kana: 'だいがく', romaji: 'daigaku', es: 'Universidad', cat: 'places', icon: 'fa-building-columns', example: 'ハベリアナ だいがく です。' },
                { kana: 'ぎんこう', romaji: 'ginkou', es: 'Banco (entidad)', cat: 'places', icon: 'fa-piggy-bank', example: 'ぎんこう は あそこ です。' },
                { kana: 'びょういん', romaji: 'byouin', es: 'Hospital', cat: 'places', icon: 'fa-hospital', example: 'びょういん に いきます。' },
                { kana: 'うち', romaji: 'uchi', es: 'Casa / Hogar propio', cat: 'places', icon: 'fa-house', example: 'うち に かえります。' },
                { kana: 'がっこう', romaji: 'gakkou', es: 'Escuela / Colegio', cat: 'places', icon: 'fa-school', example: 'がっこう は ここ です。' }
            ],

            CULTURE: [
                {
                    title: 'Era Reiwa (令和)',
                    period: '2019 ~ Presente',
                    desc: 'La era imperial actual de Japón. Comenzó el 1 de mayo de 2019 con la entronización del emperador Naruhito tras la abdicación de Akihito (era Heisei). Su nombre oficial se traduce como "Bella Armonía".',
                    icon: 'fa-crown',
                    tip: 'Dato cultural importante: ¿Cuál es la era actual de Japón? -> 令和 (Reiwa)'
                },
                {
                    title: 'Saludos al Salir de Casa',
                    period: 'Costumbre Diaria',
                    desc: 'Quien sale de casa dice: 「いってきます」(Ittekimasu: "Voy y vuelvo"). Quien permanece en el hogar le responde: 「いってらっしゃい」(Itterasshai: "Que te vaya bien / Ve y regresa seguro").',
                    icon: 'fa-door-open',
                    tip: 'Fórmula fija: いってきます ⇄ いってらっしゃい'
                },
                {
                    title: 'Saludos al Volver a Casa',
                    period: 'Costumbre Diaria',
                    desc: 'Quien regresa a casa anuncia su llegada diciendo: 「ただいま」(Tadaima: "Ya llegué / He vuelto"). Quien está adentro le da la bienvenida: 「おかえりなさい」(Okaerinasai: "Bienvenido de vuelta").',
                    icon: 'fa-house-chimney-user',
                    tip: 'Fórmula fija: ただいま ⇄ おかえりなさい'
                },
                {
                    title: 'Momijigari (もみじ狩り)',
                    period: 'Otoño (Aki)',
                    desc: 'Costumbre tradicional japonesa de salir a contemplar y admirar el cambio de coloración de las hojas otoñales, en especial el follaje rojizo de los arces japoneses (momiji). Es el análogo otoñal del Hanami de primavera.',
                    icon: 'fa-leaf',
                    tip: 'Concepto cultural: Contemplar las hojas rojas y doradas de otoño'
                }
            ],

            Q1_QUESTIONS: [
                {
                    id: 'q1_1',
                    text: 'Completa con la partícula adecuada (marcador de tema):',
                    sentence: 'わたし [ ___ ] たなか です。',
                    options: ['は', 'が', 'の', 'も'],
                    correct: 0,
                    explanation: 'La partícula 「は」(pronunciada wa) señala el tema o tópico de la oración: "En cuanto a mí, soy Tanaka".'
                },
                {
                    id: 'q1_2',
                    text: 'Indica qué partícula expresa inclusión ("también"):',
                    sentence: 'マリアさん は がくせい です。わたし [ ___ ] がくせい です。',
                    options: ['の', 'も', 'は', 'か'],
                    correct: 1,
                    explanation: 'La partícula 「も」 sustituye a 「は」 cuando se expresa igualdad o inclusión ("también"): "Yo también soy estudiante".'
                },
                {
                    id: 'q1_3',
                    text: 'Completa la relación de posesión de este objeto:',
                    sentence: 'これ は だれ [ ___ ] かばん ですか。',
                    options: ['は', 'が', 'の', 'も'],
                    correct: 2,
                    explanation: 'La partícula 「の」 une dos sustantivos indicando posesión o pertenencia: "¿De quién es esta mochila?".'
                },
                {
                    id: 'q1_4',
                    text: '¿Qué partícula acompaña obligatoriamente al verbo de habilidad 「できます」?',
                    sentence: 'わたし は にほんご [ ___ ] すこし できます。',
                    options: ['を', 'が', 'は', 'に'],
                    correct: 1,
                    explanation: 'Con verbos de habilidad o potencial como 「できます / できません」, el objeto se marca siempre con 「が」.'
                },
                {
                    id: 'q1_5',
                    text: 'Selecciona la forma negativa formal correcta de 「です」:',
                    sentence: 'スミスさん は いしゃ [ ___ ]。',
                    options: ['じゃありません', 'でした', 'ですか', 'ありません'],
                    correct: 0,
                    explanation: 'La negación formal de 「です」 en tiempo presente es 「じゃありません」(o 「ではありません」): "El Sr. Smith no es médico".'
                },
                {
                    id: 'q1_6',
                    text: 'Elige el demostrativo cuando el objeto está lejos de ambos hablantes:',
                    sentence: '[ ___ ] は ほん です。',
                    options: ['これ', 'それ', 'あれ', 'どれ'],
                    correct: 2,
                    explanation: '「これ」 (cerca de mí), 「それ」 (cerca de ti), 「あれ」 (lejos de ambos hablantes).'
                },
                {
                    id: 'q1_7',
                    text: 'Elige el modificador demostrativo que acompaña directamente a un sustantivo:',
                    sentence: '[ ___ ] かさ は わたし の です。',
                    options: ['これ', 'この', 'ここ', 'それ'],
                    correct: 1,
                    explanation: 'Se utiliza 「この + sustantivo」 para calificar directamente un objeto. 「これ」 va solo y no puede modificar a un sustantivo inmediatamente.'
                },
                {
                    id: 'q1_8',
                    text: '¿Cómo se pregunta en japonés el precio de un objeto?',
                    sentence: 'この とけい は [ ___ ] ですか。',
                    options: ['いくら', 'なんさい', 'だれ', 'どこ'],
                    correct: 0,
                    explanation: '「いくら ですか」 significa "¿Cuánto vale / cuánto cuesta?".'
                },
                {
                    id: 'q1_9',
                    text: '¿Cómo se pregunta la edad a una persona?',
                    sentence: 'たなかさん は [ ___ ] ですか。',
                    options: ['なんさい', 'いくら', 'なに', 'だれ'],
                    correct: 0,
                    explanation: '「なんさい (何歳) ですか」 significa "¿Cuántos años tienes / tiene?".'
                },
                {
                    id: 'q1_10',
                    text: '¿Cuál es la forma tradicional irregular para 20 años de edad?',
                    sentence: 'わたし は 20さい ([ ___ ]) です。',
                    options: ['はたち', 'にじゅうさい', 'じゅっさい', 'はつか'],
                    correct: 0,
                    explanation: 'La edad de 20 años tiene la lectura irregular única 「はたち」(hatachi).'
                }
            ],

            Q2_QUESTIONS: [
                {
                    id: 'q2_1',
                    translation: 'Esto es un diccionario.',
                    tokens: ['これ', 'は', 'じしょ', 'です'],
                    correctOrder: ['これ', 'は', 'じしょ', 'です']
                },
                {
                    id: 'q2_2',
                    translation: 'Ese paraguas es de la profesora.',
                    tokens: ['その', 'かさ', 'は', 'せんせい', 'の', 'です'],
                    correctOrder: ['その', 'かさ', 'は', 'せんせい', 'の', 'です']
                },
                {
                    id: 'q2_3',
                    translation: 'Yo puedo hablar un poco de japonés.',
                    tokens: ['わたし', 'は', 'にほんご', 'が', 'すこし', 'できます'],
                    correctOrder: ['わたし', 'は', 'にほんご', 'が', 'すこし', 'できます']
                },
                {
                    id: 'q2_4',
                    translation: '¿De quién es esta cartuchera?',
                    tokens: ['この', 'ふでばこ', 'は', 'だれ', 'の', 'ですか'],
                    correctOrder: ['この', 'ふでばこ', 'は', 'だれ', 'の', 'ですか']
                },
                {
                    id: 'q2_5',
                    translation: 'El señor Lee no es japonés.',
                    tokens: ['リーさん', 'は', 'にほんじん', 'じゃありません'],
                    correctOrder: ['リーさん', 'は', 'にほんじん', 'じゃありません']
                },
                {
                    id: 'q2_6',
                    translation: 'Aquel carro vale 800 yenes.',
                    tokens: ['あれ', 'は', 'はっぴゃく', 'えん', 'です'],
                    correctOrder: ['あれ', 'は', 'はっぴゃく', 'えん', 'です']
                },
                {
                    id: 'q2_7',
                    translation: 'Mi amigo tiene 19 años.',
                    tokens: ['ともだち', 'は', 'じゅうきゅうさい', 'です'],
                    correctOrder: ['ともだち', 'は', 'じゅうきゅうさい', 'です']
                },
                {
                    id: 'q2_8',
                    translation: 'María también es estudiante universitaria.',
                    tokens: ['マリアさん', 'も', 'だいがくせい', 'です'],
                    correctOrder: ['マリアさん', 'も', 'だいがくせい', 'です']
                }
            ],

            Q3_QUESTIONS: [
                {
                    id: 'q3_1',
                    audioText: 'これ は だれの かさ ですか。',
                    situation: 'Un compañero encuentra un paraguas en el salón de clase y pregunta señalándolo:',
                    question: '¿Qué está preguntando exactamente?',
                    options: [
                        '¿De quién es este paraguas?',
                        '¿Cuánto cuesta este paraguas?',
                        '¿Dónde compraste este paraguas?',
                        '¿Este paraguas es nuevo?'
                    ],
                    correct: 0,
                    explanation: '「だれ の かさ ですか」 significa "¿De quién es este paraguas?". 「これ」 sitúa el paraguas junto a quien habla.'
                },
                {
                    id: 'q3_2',
                    audioText: 'この とけい は さんぜん えん です。',
                    situation: 'En una tienda en Akihabara, preguntas el valor de un reloj y el empleado te responde:',
                    question: '¿Cuál es el valor exacto del reloj según el audio?',
                    options: [
                        '3,000 yenes',
                        '300 yenes',
                        '30,000 yenes',
                        '800 yenes'
                    ],
                    correct: 0,
                    explanation: '「さんぜん えん」 significa 3.000 yenes. Si fuera 300 diría 「さんびゃく えん」.'
                },
                {
                    id: 'q3_3',
                    audioText: 'いってきます。いってらっしゃい。',
                    situation: 'Kenji sale por la mañana rumbo a sus clases de japonés en la universidad:',
                    question: '¿Qué saludo dijo Kenji al cruzar la puerta y qué le respondió su madre?',
                    options: [
                        'Kenji: いってきます (Voy y vengo) | Madre: いってらっしゃい (Que te vaya bien)',
                        'Kenji: ただいま (Ya llegué) | Madre: おかえりなさい (Bienvenido)',
                        'Kenji: おはようございます | Madre: こんにちは',
                        'Kenji: さようなら | Madre: じゃあね'
                    ],
                    correct: 0,
                    explanation: 'La fórmula protocolaria al salir del hogar es 「いってきます」 por quien sale y 「いってらっしゃい」 por quien despide.'
                },
                {
                    id: 'q3_4',
                    audioText: 'わたし は タイご が できません。でも えいご が できます。',
                    situation: 'Una estudiante de intercambio explica sus capacidades de idiomas:',
                    question: '¿Qué idiomas domina y cuál no según lo escuchado?',
                    options: [
                        'No habla tailandés, pero sí domina el inglés',
                        'Habla tailandés e inglés con total fluidez',
                        'Solo puede hablar japonés y tailandés',
                        'No sabe hablar ni tailandés ni inglés'
                    ],
                    correct: 0,
                    explanation: '「タイご が できません」(no puedo tailandés) seguido de 「えいご が できます」(sí puedo inglés).'
                },
                {
                    id: 'q3_5',
                    audioText: 'たなかさん は なんさい ですか。はたち です。',
                    situation: 'La profesora consulta la edad del nuevo estudiante Tanaka:',
                    question: '¿Cuántos años tiene el estudiante Tanaka?',
                    options: [
                        '20 años (はたち)',
                        '18 años (じゅうはっさい)',
                        '21 años (にじゅういっさい)',
                        '10 años (じゅっさい)'
                    ],
                    correct: 0,
                    explanation: '「はたち」 es la expresión tradicional e irregular japonesa para los 20 años de edad.'
                },
                {
                    id: 'q3_6',
                    audioText: 'その けいたい は わたし の じゃありません。せんせい の です。',
                    situation: 'En la mesa de estudio hay un teléfono móvil y se aclara su pertenencia:',
                    question: '¿A quién le pertenece realmente el celular?',
                    options: [
                        'A la profesora (no es del alumno que habla)',
                        'Al alumno que está hablando',
                        'A un amigo del alumno',
                        'Al director de la escuela'
                    ],
                    correct: 0,
                    explanation: '「わたし の じゃありません」(no es mío) + 「せんせい の です」(es de la profesora).'
                }
            ]
        };

        function formatJapaneseAge(age) {
            if (age === 20) {
                return {
                    age: 20,
                    hiragana: 'はたち',
                    altHiragana: 'にじゅっさい',
                    romaji: 'hatachi (nijussai)',
                    irregular: true,
                    note: '¡20 años es especial! Tradicionalmente se dice はたち (hatachi).'
                };
            }
            const tens = Math.floor(age / 10);
            const units = age % 10;
            
            let prefix = '';
            let prefixRom = '';
            if (tens === 1) {
                prefix = 'じゅう';
                prefixRom = 'juu';
            } else if (tens > 1) {
                const tDigit = DIGIT_HIRAGANA[tens];
                prefix = tDigit.hira + 'じゅう';
                prefixRom = tDigit.romaji + '-juu';
            }
            
            let suffix = '';
            let suffixRom = '';
            let isIrreg = false;
            let note = '';
            
            if (units === 0 && tens > 0) {
                if (tens === 1) {
                    suffix = 'じゅっさい';
                    suffixRom = 'jussai';
                } else {
                    const tDigit = DIGIT_HIRAGANA[tens];
                    suffix = tDigit.hira + 'じゅっさい';
                    suffixRom = tDigit.romaji + '-jussai';
                }
                prefix = '';
                prefixRom = '';
                isIrreg = true;
                note = 'Las decenas redondas usan el sokuon っ (〜じゅっさい).';
            } else if (units === 1) {
                suffix = 'いっさい';
                suffixRom = 'issai';
                isIrreg = true;
                note = 'El 1 usa sokuon っ (〜いっさい).';
            } else if (units === 8) {
                suffix = 'はっさい';
                suffixRom = 'hassai';
                isIrreg = true;
                note = 'El 8 usa sokuon っ (〜はっさい).';
            } else if (units === 4) {
                suffix = 'よんさい';
                suffixRom = 'yonsai';
            } else if (units === 7) {
                suffix = 'ななさい';
                suffixRom = 'nanasai';
            } else {
                const uDigit = DIGIT_HIRAGANA[units];
                suffix = uDigit.hira + 'さい';
                suffixRom = uDigit.romaji + 'sai';
            }
            
            return {
                age: age,
                hiragana: prefix + suffix,
                romaji: prefixRom ? (prefixRom + '-' + suffixRom) : suffixRom,
                irregular: isIrreg,
                note: note
            };
        }

        // Initialize Parcial Tab
        function initParcialTab() {
            if (!state.parcial) {
                state.parcial = {
                    mode: 'guide',
                    simSubMode: 'q1',
                    guideCategory: 'all',
                    streak: 0,
                    score: 0,
                    totalAnswered: 0,
                    q1Index: 0,
                    q1Answered: false,
                    q2Index: 0,
                    q2ActiveId: null,
                    q2SelectedChips: [],
                    q2AvailableChips: null,
                    q2Checked: false,
                    q2IsCorrect: false,
                    q3Index: 0,
                    q3Answered: false,
                    flashcardIndex: 0,
                    flashcardFilter: 'all',
                    flashcardFlipped: false,
                    pricesSubMode: 'prices',
                    currentPriceTarget: 500,
                    currentAgeTarget: 20
                };
            }
            updateParcialHeaderStats();
            setParcialMode(state.parcial.mode || 'guide', true);
        }

        function updateParcialHeaderStats() {
            const streakEl = document.getElementById('parcialStreakDisplay');
            const scoreEl = document.getElementById('parcialScoreDisplay');
            const gradeEl = document.getElementById('parcialExamGradeBadge');

            if (streakEl) streakEl.innerHTML = '<i class="fa-solid fa-fire text-amber-400 text-sm"></i> ' + (state.parcial.streak || 0);
            if (scoreEl) scoreEl.textContent = state.parcial.score || 0;

            if (gradeEl) {
                if (!state.parcial.totalAnswered || state.parcial.totalAnswered === 0) {
                    gradeEl.textContent = '5.0 / 5.0';
                } else {
                    const acc = (state.parcial.score / state.parcial.totalAnswered);
                    const grade = Math.max(1.0, Math.min(5.0, (acc * 5.0))).toFixed(1);
                    gradeEl.textContent = grade + ' / 5.0';
                }
            }
        }

        function setParcialMode(mode, force) {
            if (!force && state.parcial.mode === mode) return;
            state.parcial.mode = mode;

            document.querySelectorAll('.parcial-mode-tab').forEach(btn => {
                const btnMode = btn.id.replace('btn-parcial-mode-', '');
                if (btnMode === mode) {
                    btn.className = 'parcial-mode-tab flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 stage-theme-primary-btn shadow-md';
                } else {
                    btn.className = 'parcial-mode-tab flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent';
                }
            });

            renderParcialWorkspace();
        }

        function renderParcialWorkspace() {
            const container = document.getElementById('parcialWorkspaceContainer');
            if (!container) return;

            const mode = state.parcial.mode || 'guide';
            if (mode === 'guide') {
                renderParcialGuide(container);
            } else if (mode === 'sim') {
                renderParcialSimulator(container);
            } else if (mode === 'prices') {
                renderParcialPricesAges(container);
            } else if (mode === 'flashcards') {
                renderParcialFlashcards(container);
            }
        }

        // ==========================================================
        // SUB-MODE 1: GUÍA DE ESTUDIO
        // ==========================================================
        function renderParcialGuide(container) {
            const cat = state.parcial.guideCategory || 'all';
            let vocabList = EXAM_PARCIAL_DATA.VOCABULARY;
            if (cat !== 'all') {
                vocabList = vocabList.filter(v => v.cat === cat);
            }

            container.innerHTML = `
                <div class="space-y-6">
                    <!-- Categorías y Filtros Rápidos -->
                    <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Filtro de Vocabulario:</span>
                            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">${vocabList.length} palabras</span>
                        </div>
                        <div class="flex flex-wrap gap-1.5">
                            <button type="button" data-action="setParcialGuideCategory" data-args='["all"]' class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${cat === 'all' ? 'bg-emerald-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                Todos (46)
                            </button>
                            <button type="button" data-action="setParcialGuideCategory" data-args='["objects"]' class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${cat === 'objects' ? 'bg-emerald-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                🎒 Objetos (23)
                            </button>
                            <button type="button" data-action="setParcialGuideCategory" data-args='["people"]' class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${cat === 'people' ? 'bg-emerald-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                👥 Personas (12)
                            </button>
                            <button type="button" data-action="setParcialGuideCategory" data-args='["places"]' class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${cat === 'places' ? 'bg-emerald-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                🌏 Países / Lugares (11)
                            </button>
                        </div>
                    </div>

                    <!-- Vocabulario Grid con Audio -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        ${vocabList.map(item => `
                            <div class="bg-slate-900/90 hover:bg-slate-850 border border-slate-800/90 hover:border-emerald-500/40 rounded-2xl p-3 flex flex-col justify-between gap-2 transition group relative shadow-md">
                                <div class="flex items-start justify-between">
                                    <div class="w-7 h-7 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center text-xs">
                                        <i class="fa-solid ${item.icon}"></i>
                                    </div>
                                    <button aria-label="Pronunciación" type="button" data-action="speakJapanese" data-args='["${item.kana}"]' title="Pronunciación" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center text-xs transition active:scale-90">
                                        <i class="fa-solid fa-volume-high"></i>
                                    </button>
                                </div>
                                <div>
                                    <span class="font-jp text-lg sm:text-xl font-black text-white block group-hover:text-emerald-300 transition">${item.kana}</span>
                                    <span class="text-[11px] font-mono text-emerald-400/80 block">${item.romaji}</span>
                                    <span class="text-xs text-slate-300 font-medium block mt-1 leading-tight">${item.es}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Bloques Gramaticales Clave -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                        <!-- Demostrativos: これ vs この -->
                        <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
                            <h3 class="text-base font-bold text-white flex items-center gap-2 mb-3">
                                <i class="fa-solid fa-arrows-split-up-and-left text-amber-400"></i>
                                <span>Demostrativos (これ/それ/あれ vs この/その/あの)</span>
                            </h3>
                            <div class="overflow-x-auto">
                                <table class="w-full text-xs text-left text-slate-300 border-collapse">
                                    <thead>
                                        <tr class="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                                            <th class="py-2 px-2">Distancia</th>
                                            <th class="py-2 px-2 text-amber-300">Solo (Sustantivo)</th>
                                            <th class="py-2 px-2 text-emerald-300">+ Sustantivo</th>
                                            <th class="py-2 px-2">Lugar</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-800/60 font-jp">
                                        <tr>
                                            <td class="py-2.5 px-2 font-sans text-slate-400">Cerca de mí</td>
                                            <td class="py-2.5 px-2 font-bold text-amber-300">これ <span class="font-sans font-normal text-[10px] text-slate-400">(esto)</span></td>
                                            <td class="py-2.5 px-2 font-bold text-emerald-300">この 〜 <span class="font-sans font-normal text-[10px] text-slate-400">(este/a)</span></td>
                                            <td class="py-2.5 px-2 text-slate-300">ここ <span class="font-sans font-normal text-[10px] text-slate-400">(aquí)</span></td>
                                        </tr>
                                        <tr>
                                            <td class="py-2.5 px-2 font-sans text-slate-400">Cerca de ti</td>
                                            <td class="py-2.5 px-2 font-bold text-amber-300">それ <span class="font-sans font-normal text-[10px] text-slate-400">(eso)</span></td>
                                            <td class="py-2.5 px-2 font-bold text-emerald-300">その 〜 <span class="font-sans font-normal text-[10px] text-slate-400">(ese/a)</span></td>
                                            <td class="py-2.5 px-2 text-slate-300">そこ <span class="font-sans font-normal text-[10px] text-slate-400">(ahí)</span></td>
                                        </tr>
                                        <tr>
                                            <td class="py-2.5 px-2 font-sans text-slate-400">Lejos de ambos</td>
                                            <td class="py-2.5 px-2 font-bold text-amber-300">あれ <span class="font-sans font-normal text-[10px] text-slate-400">(aquello)</span></td>
                                            <td class="py-2.5 px-2 font-bold text-emerald-300">あの 〜 <span class="font-sans font-normal text-[10px] text-slate-400">(aquel/la)</span></td>
                                            <td class="py-2.5 px-2 text-slate-300">あそこ <span class="font-sans font-normal text-[10px] text-slate-400">(allá)</span></td>
                                        </tr>
                                        <tr>
                                            <td class="py-2.5 px-2 font-sans text-slate-400">Interrogativo</td>
                                            <td class="py-2.5 px-2 font-bold text-amber-300">どれ <span class="font-sans font-normal text-[10px] text-slate-400">(¿cuál?)</span></td>
                                            <td class="py-2.5 px-2 font-bold text-emerald-300">どの 〜 <span class="font-sans font-normal text-[10px] text-slate-400">(¿cuál?)</span></td>
                                            <td class="py-2.5 px-2 text-slate-300">どこ <span class="font-sans font-normal text-[10px] text-slate-400">(¿dónde?)</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                                💡 <strong>Regla de oro gramatical:</strong> No se puede decir <em>"これ かさ"</em> (¡error!). Se dice <strong>「この かさ」</strong> (este paraguas) o <strong>「これ は かさ です」</strong> (esto es un paraguas).
                            </div>
                        </div>

                        <!-- Partículas Fundamentales -->
                        <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
                            <h3 class="text-base font-bold text-white flex items-center gap-2 mb-3">
                                <i class="fa-solid fa-puzzle-piece text-emerald-400"></i>
                                <span>Partículas Fundamentales (は, も, が, の)</span>
                            </h3>
                            <div class="space-y-2.5 text-xs text-slate-300">
                                <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-jp font-bold">は (wa)</span>
                                        <span class="font-bold text-white">Marcador de Tema</span>
                                    </div>
                                    <p class="text-slate-400">Se escribe con kana は pero se lee <em>wa</em> cuando funciona como partícula de tema. Ej: <code>わたし は がくせい です。</code></p>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-jp font-bold">も (mo)</span>
                                        <span class="font-bold text-white">Inclusión ("También")</span>
                                    </div>
                                    <p class="text-slate-400">Sustituye a は para expresar identidad compartida. Ej: <code>マリアさん も がくせい です。</code> (María también es estudiante).</p>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-jp font-bold">が (ga)</span>
                                        <span class="font-bold text-white">Capacidad / Habilidad</span>
                                    </div>
                                    <p class="text-slate-400">Obligatoria con el verbo <code>できます / できません</code> (poder / dominar un idioma). Ej: <code>にほんご が できます。</code></p>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-jp font-bold">の (no)</span>
                                        <span class="font-bold text-white">Posesión y Pertenencia</span>
                                    </div>
                                    <p class="text-slate-400">Une dos sustantivos: <code>[Poseedor] の [Objeto]</code>. Ej: <code>せんせい の かばん</code> (el bolso del profesor), <code>だれ の ですか</code> (¿de quién es?).</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Cultura Japonesa -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
                        <h3 class="text-base font-bold text-white flex items-center gap-2 mb-4">
                            <i class="fa-solid fa-torii-gate text-rose-400"></i>
                            <span>Cultura y Costumbres de Japón</span>
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            ${EXAM_PARCIAL_DATA.CULTURE.map(item => `
                                <div class="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between gap-3">
                                    <div>
                                        <div class="flex items-center gap-2 text-rose-400 mb-2">
                                            <i class="fa-solid ${item.icon}"></i>
                                            <span class="font-bold text-xs text-white">${item.title}</span>
                                        </div>
                                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 inline-block mb-2">${item.period}</span>
                                        <p class="text-xs text-slate-300 leading-relaxed">${item.desc}</p>
                                    </div>
                                    <div class="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300 font-medium">
                                        📌 ${item.tip}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        function setParcialGuideCategory(cat) {
            state.parcial.guideCategory = cat;
            renderParcialWorkspace();
        }

        // ==========================================================
        // SUB-MODE 2: SIMULADOR TIPO PARCIAL (Q1, Q2, Q3)
        // ==========================================================
        function getParcialSimWorkspace() {
            return document.getElementById('parcialSimWorkspace') || document.getElementById('parcialWorkspaceContainer');
        }

        function renderParcialSimulator(container) {
            const sub = state.parcial.simSubMode || 'q1';

            container.innerHTML = `
                <div class="space-y-6">
                    <!-- Selector de Modalidad de Ejercicio -->
                    <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Ejercicio:</span>
                        <div class="flex flex-wrap gap-2">
                            <button type="button" data-action="setParcialSimSubMode" data-args='["q1"]' id="btn-sim-q1"
                                class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${sub === 'q1' ? 'bg-amber-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                <i class="fa-solid fa-list-check"></i>
                                <span>1. Partículas y Gramática</span>
                            </button>
                            <button type="button" data-action="setParcialSimSubMode" data-args='["q2"]' id="btn-sim-q2"
                                class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${sub === 'q2' ? 'bg-amber-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                <i class="fa-solid fa-arrow-down-a-z"></i>
                                <span>2. Ordenar Oración (Scramble)</span>
                            </button>
                            <button type="button" data-action="setParcialSimSubMode" data-args='["q3"]' id="btn-sim-q3"
                                class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${sub === 'q3' ? 'bg-amber-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                <i class="fa-solid fa-headphones"></i>
                                <span>3. Comprensión Auditiva</span>
                            </button>
                        </div>
                    </div>

                    <div id="parcialSimWorkspace">
                        <!-- Injected by specific simulator renderer -->
                    </div>
                </div>
            `;

            const simContainer = document.getElementById('parcialSimWorkspace') || container;
            if (!simContainer) return;

            if (sub === 'q1') renderParcialQ1(simContainer);
            else if (sub === 'q2') renderParcialQ2(simContainer);
            else if (sub === 'q3') renderParcialQ3(simContainer);
        }

        function setParcialSimSubMode(sub) {
            state.parcial.simSubMode = sub;
            renderParcialSimulator(document.getElementById('parcialWorkspaceContainer'));
        }

        // Q1: Partículas y Gramática
        function renderParcialQ1(container) {
            if (!container) return;
            const list = EXAM_PARCIAL_DATA.Q1_QUESTIONS;
            const idx = state.parcial.q1Index % list.length;
            const q = list[idx];
            state.parcial.q1Answered = false;

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl max-w-2xl mx-auto">
                    <div class="flex items-center justify-between gap-2 mb-4">
                        <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                            Pregunta ${idx + 1} de ${list.length}
                        </span>
                        <button type="button" data-action="speakJapanese" data-args='["${q.sentence.replace('[ ___ ]', '')}"]' class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold flex items-center gap-1.5 transition active:scale-95">
                            <i class="fa-solid fa-volume-high"></i> Escuchar
                        </button>
                    </div>

                    <h4 class="text-sm sm:text-base font-semibold text-slate-300 mb-2">${q.text}</h4>
                    <div class="py-6 px-4 my-4 rounded-2xl bg-slate-950 border border-slate-800 text-center shadow-inner">
                        <span class="font-jp text-2xl sm:text-3xl font-black text-white tracking-wide leading-relaxed">
                            ${q.sentence.replace('[ ___ ]', '<span class="px-3 py-1 mx-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold underline decoration-amber-400">[ ? ]</span>')}
                        </span>
                    </div>

                    <!-- Opciones de Respuesta -->
                    <div id="q1OptionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        ${q.options.map((opt, optIdx) => `
                            <button type="button" data-action="selectParcialQ1Option" data-args='[${optIdx}]' id="btn-q1-opt-${optIdx}"
                                class="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700/80 hover:border-amber-400/60 font-jp text-lg sm:text-xl font-bold text-white transition active:scale-98 flex items-center justify-center gap-3 min-h-[48px]">
                                <span class="w-6 h-6 rounded-md bg-slate-900 text-slate-400 font-sans text-xs flex items-center justify-center font-bold">${optIdx + 1}</span>
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Explanation Container -->
                    <div id="q1FeedbackBox" class="mt-5 hidden"></div>

                    <!-- Next Button -->
                    <div class="mt-6 flex flex-col sm:flex-row justify-end">
                        <button type="button" data-action="nextParcialQ1" id="btn-q1-next" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-sakura-500 text-white font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-102 active:scale-98 transition flex items-center justify-center gap-2">
                            <span>Siguiente Pregunta (Enter)</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        function selectParcialQ1Option(optIdx) {
            if (state.parcial.q1Answered) return;
            state.parcial.q1Answered = true;

            const list = EXAM_PARCIAL_DATA.Q1_QUESTIONS;
            const q = list[state.parcial.q1Index % list.length];
            const isCorrect = (optIdx === q.correct);

            state.parcial.totalAnswered = (state.parcial.totalAnswered || 0) + 1;
            if (isCorrect) {
                state.parcial.streak = (state.parcial.streak || 0) + 1;
                state.parcial.score = (state.parcial.score || 0) + 1;
                playSuccessChime();
            } else {
                state.parcial.streak = 0;
                playErrorBuzzer();
            }
            updateParcialHeaderStats();

            // Highlight buttons
            q.options.forEach((opt, idx) => {
                const btn = document.getElementById('btn-q1-opt-' + idx);
                if (!btn) return;
                btn.disabled = true;
                if (idx === q.correct) {
                    btn.className = 'py-3 px-4 rounded-xl bg-emerald-600/30 border border-emerald-500 text-emerald-300 font-jp text-lg sm:text-xl font-bold flex items-center justify-center gap-3 shadow-md scale-[1.02] min-h-[48px]';
                } else if (idx === optIdx) {
                    btn.className = 'py-3 px-4 rounded-xl bg-rose-600/30 border border-rose-500 text-rose-300 font-jp text-lg sm:text-xl font-bold flex items-center justify-center gap-3 shadow-md min-h-[48px]';
                } else {
                    btn.className = 'py-3 px-4 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-500 font-jp text-lg sm:text-xl font-bold flex items-center justify-center gap-3 opacity-50 min-h-[48px]';
                }
            });

            // Show explanation
            const fbBox = document.getElementById('q1FeedbackBox');
            if (fbBox) {
                fbBox.className = 'mt-5 p-4 rounded-2xl border ' + (isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200');
                fbBox.innerHTML = `
                    <div class="flex items-start gap-3 text-xs">
                        <i class="fa-solid ${isCorrect ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-400'} text-base mt-0.5"></i>
                        <div class="w-full">
                            <span class="font-bold block mb-1">${isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}</span>
                            <p class="leading-relaxed">${q.explanation}</p>
                            ${!isCorrect ? `
                                <div class="mt-3">
                                    <button type="button" data-action="retryParcialQ1" class="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow">
                                        <i class="fa-solid fa-rotate-left"></i> Reintentar pregunta
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
                fbBox.classList.remove('hidden');
            }
        }

        function retryParcialQ1() {
            state.parcial.q1Answered = false;
            renderParcialQ1(getParcialSimWorkspace());
        }

        function nextParcialQ1() {
            state.parcial.q1Index = (state.parcial.q1Index + 1) % EXAM_PARCIAL_DATA.Q1_QUESTIONS.length;
            state.parcial.q1Answered = false;
            renderParcialQ1(getParcialSimWorkspace());
        }

        // Q2: Ordenar Oraciones (Word Scramble)
        function renderParcialQ2(container) {
            if (!container) return;
            const list = EXAM_PARCIAL_DATA.Q2_QUESTIONS;
            const idx = state.parcial.q2Index % list.length;
            const q = list[idx];

            // Initialize shuffled tokens ONLY if transitioning to a different question or not yet initialized
            if (state.parcial.q2ActiveId !== q.id || !state.parcial.q2AvailableChips) {
                state.parcial.q2ActiveId = q.id;
                const shuffled = [...q.tokens];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                // If it accidentally shuffled into the exact answer and there's >1 token, swap two
                if (shuffled.join('') === q.correctOrder.join('') && shuffled.length > 1) {
                    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
                }
                state.parcial.q2AvailableChips = shuffled;
                state.parcial.q2SelectedChips = [];
                state.parcial.q2Checked = false;
                state.parcial.q2IsCorrect = false;
            }

            const isChecked = !!state.parcial.q2Checked;
            const isCorrect = !!state.parcial.q2IsCorrect;
            const allPlaced = state.parcial.q2AvailableChips.length === 0;
            const hasSelected = state.parcial.q2SelectedChips.length > 0;

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl max-w-2xl mx-auto">
                    <div class="flex items-center justify-between gap-2 mb-4">
                        <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                            Ejercicio ${idx + 1} de ${list.length}
                        </span>
                        <button type="button" data-action="retryParcialQ2" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition active:scale-95" title="Reiniciar ejercicio actual">
                            <i class="fa-solid fa-rotate-left"></i> Reiniciar
                        </button>
                    </div>

                    <h4 class="text-sm font-semibold text-slate-400 mb-1">Ordena los bloques en japonés para formar:</h4>
                    <div class="py-3 px-4 rounded-xl bg-slate-950/70 border border-slate-800 text-amber-300 font-bold text-base sm:text-lg mb-5">
                        « ${q.translation} »
                    </div>

                    <!-- Selected Chips Container (The Answer Bar) -->
                    <div class="flex items-center justify-between gap-2 mb-2">
                        <span class="text-xs text-slate-400 font-bold uppercase tracking-wider">
                            ${isChecked ? (isCorrect ? '✅ Tu Oración (Correcto):' : '❌ Tu Oración:') : 'Tu Oración (Haz clic en un bloque para retirarlo):'}
                        </span>
                        ${!isChecked && hasSelected ? `
                            <button type="button" data-action="resetParcialQ2" class="text-[11px] text-slate-400 hover:text-rose-400 transition flex items-center gap-1">
                                <i class="fa-solid fa-trash-can"></i> Limpiar todo
                            </button>
                        ` : ''}
                    </div>

                    <div id="q2AnswerSlot" class="min-h-[64px] p-3 rounded-2xl bg-slate-950 border-2 ${isChecked ? (isCorrect ? 'border-emerald-500/80 bg-emerald-950/20' : 'border-rose-500/80 bg-rose-950/20') : 'border-dashed border-slate-700'} flex flex-wrap items-center gap-2 shadow-inner transition-colors duration-200">
                        ${!hasSelected ? `
                            <span class="text-xs text-slate-500 italic flex items-center gap-2">
                                <i class="fa-solid fa-hand-pointer text-amber-400/70"></i>
                                Haz clic en los bloques de abajo en el orden adecuado...
                            </span>
                        ` : state.parcial.q2SelectedChips.map((chip, cIdx) => `
                            <button type="button" ${isChecked ? 'disabled' : `data-action="removeParcialQ2Chip" data-args='[${cIdx}]'`}
                                title="${isChecked ? '' : 'Haz clic para retirar'}"
                                class="px-3.5 py-2.5 rounded-xl ${isChecked ? (isCorrect ? 'bg-emerald-600 text-white border border-emerald-400' : 'bg-rose-600 text-white border border-rose-400') : 'bg-slate-800 hover:bg-rose-900/60 border border-slate-700 hover:border-rose-500 text-white'} font-jp text-base sm:text-lg font-bold shadow transition active:scale-95 flex items-center gap-2 group">
                                <span>${chip}</span>
                                ${!isChecked ? `<i class="fa-solid fa-xmark text-xs opacity-60 group-hover:opacity-100 group-hover:text-rose-300"></i>` : ''}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Available Chips Pool -->
                    <div class="mt-5">
                        <div class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Bloques Disponibles:</div>
                        <div class="flex flex-wrap gap-2.5 p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 min-h-[58px] items-center">
                            ${allPlaced && !isChecked ? `
                                <div class="w-full text-center py-2 px-3 text-xs font-semibold text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-circle-check"></i>
                                    <span>¡Todos los bloques colocados! Presiona <strong>Comprobar Orden</strong> o pulsa <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-mono">Enter</kbd></span>
                                </div>
                            ` : (state.parcial.q2AvailableChips.length === 0 ? `
                                <span class="text-xs text-slate-600 italic">No quedan bloques por colocar</span>
                            ` : state.parcial.q2AvailableChips.map((chip, aIdx) => `
                                <button type="button" ${isChecked ? 'disabled' : `data-action="addParcialQ2Chip" data-args='[${aIdx}]'`}
                                    class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-600 hover:text-white border border-slate-700 text-amber-300 font-jp text-base sm:text-lg font-bold shadow-md transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]">
                                    ${chip}
                                </button>
                            `).join(''))}
                        </div>
                    </div>

                    <!-- Feedback Box -->
                    ${isChecked ? `
                        <div id="q2FeedbackBox" class="mt-5 p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200'}">
                            <div class="flex items-start gap-3 text-xs sm:text-sm">
                                <i class="fa-solid ${isCorrect ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-400'} text-xl mt-0.5 shrink-0"></i>
                                <div class="space-y-1 w-full">
                                    <span class="font-bold text-sm block ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}">
                                        ${isCorrect ? '¡Excelente orden sintáctico!' : 'Orden incorrecto'}
                                    </span>
                                    ${!isCorrect ? `
                                        <div class="text-xs text-slate-300 pt-1">
                                            <span class="text-slate-400">Tu respuesta:</span>
                                            <span class="font-jp font-bold text-rose-300 ml-1">${state.parcial.q2SelectedChips.join(' ') || '(vacío)'}</span>
                                        </div>
                                        <div class="text-xs text-slate-300">
                                            <span class="text-slate-400">Orden correcto:</span>
                                            <span class="font-jp font-bold text-emerald-300 ml-1">${q.correctOrder.join(' ')}</span>
                                        </div>
                                    ` : `
                                        <p class="leading-relaxed font-jp text-base text-white font-bold">${q.correctOrder.join(' ')}</p>
                                    `}
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Action Buttons -->
                    <div class="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <button type="button" data-action="speakJapanese" data-args='["${q.correctOrder.join('')}"]' class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95">
                            <i class="fa-solid fa-volume-high"></i>
                            <span>Escuchar Oración</span>
                        </button>

                        <div class="flex items-center gap-2 sm:ml-auto w-full sm:w-auto">
                            ${!isChecked ? `
                                <button type="button" data-action="checkParcialQ2" id="btn-q2-check"
                                    ${!hasSelected ? 'disabled' : ''}
                                    class="w-full sm:w-auto px-5 py-2.5 rounded-xl ${allPlaced ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400/50 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/30'} text-white font-bold text-sm transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none flex items-center justify-center gap-1.5">
                                    <i class="fa-solid fa-check"></i> <span>Comprobar Orden</span>
                                </button>
                            ` : (isCorrect ? `
                                <button type="button" data-action="nextParcialQ2" id="btn-q2-next"
                                    class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 hover:scale-102 active:scale-98 transition flex items-center justify-center gap-2 ring-2 ring-emerald-400/60">
                                    <span>Siguiente Ejercicio (Enter)</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            ` : `
                                <button type="button" data-action="retryParcialQ2"
                                    class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-1.5">
                                    <i class="fa-solid fa-rotate-left"></i> <span>Reintentar</span>
                                </button>
                                <button type="button" data-action="nextParcialQ2" id="btn-q2-next"
                                    class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm transition active:scale-95 flex items-center justify-center gap-1.5">
                                    <span>Saltar</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            `)}
                        </div>
                    </div>
                </div>
            `;
        }

        function addParcialQ2Chip(idx) {
            if (state.parcial.q2Checked) return;
            if (!state.parcial.q2AvailableChips || !state.parcial.q2AvailableChips[idx]) return;
            const chip = state.parcial.q2AvailableChips.splice(idx, 1)[0];
            state.parcial.q2SelectedChips.push(chip);
            renderParcialQ2(getParcialSimWorkspace());
        }

        function removeParcialQ2Chip(idx) {
            if (state.parcial.q2Checked) return;
            if (!state.parcial.q2SelectedChips || !state.parcial.q2SelectedChips[idx]) return;
            const chip = state.parcial.q2SelectedChips.splice(idx, 1)[0];
            state.parcial.q2AvailableChips.push(chip);
            renderParcialQ2(getParcialSimWorkspace());
        }

        function resetParcialQ2() {
            if (state.parcial.q2Checked) return;
            if (state.parcial.q2SelectedChips && state.parcial.q2SelectedChips.length > 0) {
                state.parcial.q2AvailableChips = [...(state.parcial.q2AvailableChips || []), ...state.parcial.q2SelectedChips];
                state.parcial.q2SelectedChips = [];
                renderParcialQ2(getParcialSimWorkspace());
            }
        }

        function retryParcialQ2() {
            state.parcial.q2ActiveId = null;
            state.parcial.q2AvailableChips = null;
            state.parcial.q2SelectedChips = [];
            state.parcial.q2Checked = false;
            state.parcial.q2IsCorrect = false;
            renderParcialQ2(getParcialSimWorkspace());
        }

        function checkParcialQ2() {
            if (state.parcial.q2Checked) return;
            if (!state.parcial.q2SelectedChips || state.parcial.q2SelectedChips.length === 0) return;

            const list = EXAM_PARCIAL_DATA.Q2_QUESTIONS;
            const q = list[state.parcial.q2Index % list.length];
            const isCorrect = (state.parcial.q2SelectedChips.join('') === q.correctOrder.join(''));

            state.parcial.q2Checked = true;
            state.parcial.q2IsCorrect = isCorrect;
            state.parcial.totalAnswered = (state.parcial.totalAnswered || 0) + 1;

            if (isCorrect) {
                state.parcial.streak = (state.parcial.streak || 0) + 1;
                state.parcial.score = (state.parcial.score || 0) + 1;
                playSuccessChime();
                speakJapanese(q.correctOrder.join(''));
            } else {
                state.parcial.streak = 0;
                playErrorBuzzer();
            }
            updateParcialHeaderStats();
            renderParcialQ2(getParcialSimWorkspace());
        }

        function nextParcialQ2() {
            state.parcial.q2Index = (state.parcial.q2Index + 1) % EXAM_PARCIAL_DATA.Q2_QUESTIONS.length;
            state.parcial.q2ActiveId = null;
            state.parcial.q2AvailableChips = null;
            state.parcial.q2SelectedChips = [];
            state.parcial.q2Checked = false;
            state.parcial.q2IsCorrect = false;
            renderParcialQ2(getParcialSimWorkspace());
        }

        // Q3: Comprensión Auditiva y Situaciones
        function renderParcialQ3(container) {
            if (!container) return;
            const list = EXAM_PARCIAL_DATA.Q3_QUESTIONS;
            const idx = state.parcial.q3Index % list.length;
            const q = list[idx];
            state.parcial.q3Answered = false;

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl max-w-2xl mx-auto">
                    <div class="flex items-center justify-between gap-2 mb-4">
                        <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                            Audio Situacional ${idx + 1} de ${list.length}
                        </span>
                        <span class="text-xs text-slate-400"><i class="fa-solid fa-ear-listen text-sky-400"></i> Escucha atenta</span>
                    </div>

                    <!-- Situational Context Card -->
                    <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-5">
                        <div class="flex items-start gap-3">
                            <div class="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                                <i class="fa-solid fa-circle-info"></i>
                            </div>
                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Contexto de la situación:</span>
                                <p class="text-sm text-slate-200 mt-0.5">${q.situation}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Audio Trigger Banner -->
                    <div class="py-5 px-4 rounded-2xl bg-gradient-to-r from-sky-950/40 to-slate-950 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg mb-6">
                        <div class="flex items-center gap-3">
                            <button aria-label="Reproducir" type="button" data-action="speakJapanese" data-args='["${q.audioText}"]' class="w-12 h-12 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center text-lg shadow-lg shadow-sky-500/30 transition active:scale-95 shrink-0">
                                <i class="fa-solid fa-play"></i>
                            </button>
                            <div>
                                <span class="text-xs font-bold text-white block">Reproducir Audio de la Situación</span>
                                <span class="text-[11px] text-slate-400">Presiona tantas veces como necesites</span>
                            </div>
                        </div>
                        <button type="button" data-action="speakJapanese" data-args='["${q.audioText}"]' class="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition">
                            <i class="fa-solid fa-repeat"></i> Repetir Audio
                        </button>
                    </div>

                    <!-- Question Prompt -->
                    <h4 class="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-circle-question text-amber-400"></i>
                        <span>${q.question}</span>
                    </h4>

                    <!-- Options Grid -->
                    <div class="grid grid-cols-1 gap-2.5">
                        ${q.options.map((opt, optIdx) => `
                            <button type="button" data-action="selectParcialQ3Option" data-args='[${optIdx}]' id="btn-q3-opt-${optIdx}"
                                class="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700/80 hover:border-sky-400/60 text-left text-xs sm:text-sm font-semibold text-slate-200 transition active:scale-98 flex items-center gap-3 min-h-[48px]">
                                <span class="w-6 h-6 rounded-md bg-slate-900 text-slate-400 font-sans text-xs flex items-center justify-center font-bold shrink-0">${optIdx + 1}</span>
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Explanation Container -->
                    <div id="q3FeedbackBox" class="mt-5 hidden"></div>

                    <!-- Next Button -->
                    <div class="mt-6 flex flex-col sm:flex-row justify-end">
                        <button type="button" data-action="nextParcialQ3" id="btn-q3-next" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-sakura-500 text-white font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-102 active:scale-98 transition flex items-center justify-center gap-2">
                            <span>Siguiente Audio (Enter)</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        function selectParcialQ3Option(optIdx) {
            if (state.parcial.q3Answered) return;
            state.parcial.q3Answered = true;

            const list = EXAM_PARCIAL_DATA.Q3_QUESTIONS;
            const q = list[state.parcial.q3Index % list.length];
            const isCorrect = (optIdx === q.correct);

            state.parcial.totalAnswered = (state.parcial.totalAnswered || 0) + 1;
            if (isCorrect) {
                state.parcial.streak = (state.parcial.streak || 0) + 1;
                state.parcial.score = (state.parcial.score || 0) + 1;
                playSuccessChime();
            } else {
                state.parcial.streak = 0;
                playErrorBuzzer();
            }
            updateParcialHeaderStats();

            q.options.forEach((opt, idx) => {
                const btn = document.getElementById('btn-q3-opt-' + idx);
                if (!btn) return;
                btn.disabled = true;
                if (idx === q.correct) {
                    btn.className = 'py-3 px-4 rounded-xl bg-emerald-600/30 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-md scale-[1.01]';
                } else if (idx === optIdx) {
                    btn.className = 'py-3 px-4 rounded-xl bg-rose-600/30 border border-rose-500 text-rose-300 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-md';
                } else {
                    btn.className = 'py-3 px-4 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-500 text-xs sm:text-sm font-semibold flex items-center gap-3 opacity-50';
                }
            });

            const fbBox = document.getElementById('q3FeedbackBox');
            if (fbBox) {
                fbBox.className = 'mt-5 p-4 rounded-2xl border ' + (isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200');
                fbBox.innerHTML = `
                    <div class="flex items-start gap-3 text-xs">
                        <i class="fa-solid ${isCorrect ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-400'} text-base mt-0.5"></i>
                        <div class="w-full">
                            <span class="font-bold block mb-1">${isCorrect ? '¡Comprensión auditiva acertada!' : 'Respuesta errónea'}</span>
                            <p class="leading-relaxed mb-1">${q.explanation}</p>
                            <span class="font-jp text-xs text-white font-bold block mt-1">Texto original: ${q.audioText}</span>
                            ${!isCorrect ? `
                                <div class="mt-3">
                                    <button type="button" data-action="retryParcialQ3" class="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow">
                                        <i class="fa-solid fa-rotate-left"></i> Reintentar audio
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
                fbBox.classList.remove('hidden');
            }
        }

        function retryParcialQ3() {
            state.parcial.q3Answered = false;
            renderParcialQ3(getParcialSimWorkspace());
        }

        function nextParcialQ3() {
            state.parcial.q3Index = (state.parcial.q3Index + 1) % EXAM_PARCIAL_DATA.Q3_QUESTIONS.length;
            state.parcial.q3Answered = false;
            renderParcialQ3(getParcialSimWorkspace());
        }

        // ==========================================================
        // SUB-MODE 3: PRECIOS Y EDADES
        // ==========================================================
        function renderParcialPricesAges(container) {
            const sub = state.parcial.pricesSubMode || 'prices';

            container.innerHTML = `
                <div class="space-y-6">
                    <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Módulo de Números en Uso:</span>
                        <div class="flex flex-wrap gap-2">
                            <button type="button" data-action="setParcialPricesSubMode" data-args='["prices"]' id="btn-sub-prices"
                                class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${sub === 'prices' ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                <i class="fa-solid fa-yen-sign"></i>
                                <span>Precios (〜えん)</span>
                            </button>
                            <button type="button" data-action="setParcialPricesSubMode" data-args='["ages"]' id="btn-sub-ages"
                                class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${sub === 'ages' ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                                <i class="fa-solid fa-cake-candles"></i>
                                <span>Edades (〜さい)</span>
                            </button>
                        </div>
                    </div>

                    <div id="parcialPricesAgesWorkspace"></div>
                </div>
            `;

            const work = document.getElementById('parcialPricesAgesWorkspace');
            if (!work) return;

            if (sub === 'prices') renderParcialPricesView(work);
            else renderParcialAgesView(work);
        }

        function setParcialPricesSubMode(sub) {
            state.parcial.pricesSubMode = sub;
            renderParcialPricesAges(document.getElementById('parcialWorkspaceContainer'));
        }

        function renderParcialPricesView(container) {
            const curVal = state.parcial.currentPriceTarget || 500;
            const pObj = numberToJapanese(curVal);
            const hira = pObj.hiragana + 'えん';
            const rom = pObj.romaji + ' en';

            container.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Tarjeta Principal de Precio Activo -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-3">
                                <span class="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/40">
                                    Precio en Yenes (円)
                                </span>
                                <span class="text-xs text-slate-400 font-mono">0 - 999¥</span>
                            </div>

                            <div class="text-center py-6 px-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner my-2">
                                <span class="text-3xl sm:text-5xl font-black text-amber-400 font-mono block">¥${curVal.toLocaleString()}</span>
                                <span class="font-jp text-xl sm:text-2xl font-bold text-white block mt-2">${hira}</span>
                                <span class="text-xs sm:text-sm font-mono text-emerald-400 block mt-1">${rom}</span>
                            </div>
                        </div>

                        <div>
                            <button type="button" data-action="speakJapanese" data-args='["${hira}"]' class="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition active:scale-98 flex items-center justify-center gap-2 mt-4">
                                <i class="fa-solid fa-volume-high"></i>
                                <span>Escuchar Pronunciación Nativa</span>
                            </button>

                            <!-- Presets Rápidos -->
                            <div class="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800">
                                <span class="text-[11px] font-bold text-slate-400 block w-full mb-1">Valores y Precios Clave:</span>
                                <button type="button" data-action="setParcialPriceTarget" data-args='[100]' class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold">¥100</button>
                                <button type="button" data-action="setParcialPriceTarget" data-args='[300]' class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold" title="Mutación: さんびゃく">¥300 ⚠️</button>
                                <button type="button" data-action="setParcialPriceTarget" data-args='[500]' class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold">¥500</button>
                                <button type="button" data-action="setParcialPriceTarget" data-args='[600]' class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold" title="Mutación: ろっぴゃく">¥600 ⚠️</button>
                                <button type="button" data-action="setParcialPriceTarget" data-args='[800]' class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold" title="Mutación: はっぴゃく">¥800 ⚠️</button>
                                <button type="button" data-action="setParcialPriceTarget" data-args='[999]' class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold">¥999</button>
                                <button type="button" data-action="setParcialRandomPrice" class="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold ml-auto">
                                    <i class="fa-solid fa-dice"></i> Aleatorio
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Guía de Preguntas y Mutaciones -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                        <div>
                            <h4 class="text-sm font-bold text-white flex items-center gap-2 mb-3">
                                <i class="fa-solid fa-circle-question text-amber-400"></i>
                                <span>¿Cómo Preguntar Precios en Japonés?</span>
                            </h4>
                            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-4">
                                <span class="font-jp text-lg font-bold text-white block">「これ は いくら ですか。」</span>
                                <span class="text-xs text-slate-400 block mt-0.5">Kore wa ikura desu ka? (¿Cuánto cuesta esto?)</span>
                                <span class="font-jp text-base font-bold text-amber-300 block mt-2">「${hira} です。」</span>
                                <span class="text-xs text-slate-400 block mt-0.5">Cuesta ¥${curVal.toLocaleString()} yenes.</span>
                            </div>

                            <h4 class="text-sm font-bold text-white flex items-center gap-2 mb-2">
                                <i class="fa-solid fa-triangle-exclamation text-amber-400"></i>
                                <span>Las 3 Mutaciones Clave en Centenas (〜ひゃく):</span>
                            </h4>
                            <div class="space-y-2 text-xs">
                                <div class="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                                    <strong>300:</strong> さん + ひゃく → <span class="font-jp font-bold text-white text-sm">さんびゃく</span> (san<strong>byaku</strong>)
                                </div>
                                <div class="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                                    <strong>600:</strong> ろく + ひゃく → <span class="font-jp font-bold text-white text-sm">ろっぴゃく</span> (ro<strong>ppyaku</strong>)
                                </div>
                                <div class="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                                    <strong>800:</strong> はち + ひゃく → <span class="font-jp font-bold text-white text-sm">はっぴゃく</span> (ha<strong>ppyaku</strong>)
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-200">
                            💡 Para decir miles se usa <strong>〜せん (sen)</strong>, ej: 3.000 = <strong>さんぜん (sanzen)</strong>.
                        </div>
                    </div>
                </div>
            `;
        }

        function setParcialPriceTarget(val) {
            state.parcial.currentPriceTarget = val;
            renderParcialPricesAges(document.getElementById('parcialWorkspaceContainer'));
        }

        function setParcialRandomPrice() {
            const pool = [100, 150, 200, 300, 380, 500, 600, 750, 800, 850, 999, Math.floor(Math.random() * 998) + 1];
            state.parcial.currentPriceTarget = pool[Math.floor(Math.random() * pool.length)];
            renderParcialPricesAges(document.getElementById('parcialWorkspaceContainer'));
        }

        function renderParcialAgesView(container) {
            const curAge = state.parcial.currentAgeTarget || 20;
            const ageObj = formatJapaneseAge(curAge);

            container.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Tarjeta Principal de Edad Activa -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-3">
                                <span class="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
                                    Edad en Años (〜さい / 歳)
                                </span>
                                ${ageObj.irregular ? `
                                    <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                                        ⚠️ Excepción Fonética
                                    </span>
                                ` : ''}
                            </div>

                            <div class="text-center py-6 px-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner my-2">
                                <span class="text-3xl sm:text-5xl font-black text-rose-400 font-mono block">${curAge} años</span>
                                <span class="font-jp text-2xl sm:text-3xl font-bold text-white block mt-2">${ageObj.hiragana}</span>
                                <span class="text-xs sm:text-sm font-mono text-emerald-400 block mt-1">${ageObj.romaji}</span>
                            </div>
                            ${ageObj.note ? `
                                <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 mt-3 text-center">
                                    ${ageObj.note}
                                </div>
                            ` : ''}
                        </div>

                        <div>
                            <button type="button" data-action="speakJapanese" data-args='["${ageObj.hiragana}"]' class="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition active:scale-98 flex items-center justify-center gap-2 mt-4">
                                <i class="fa-solid fa-volume-high"></i>
                                <span>Escuchar Pronunciación</span>
                            </button>

                            <!-- Presets Rápidos -->
                            <div class="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800">
                                <span class="text-[11px] font-bold text-slate-400 block w-full mb-1">Edades Típicas Evaluadas:</span>
                                <button type="button" data-action="setParcialAgeTarget" data-args='[1]' class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">1: いっさい</button>
                                <button type="button" data-action="setParcialAgeTarget" data-args='[8]' class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">8: はっさい</button>
                                <button type="button" data-action="setParcialAgeTarget" data-args='[10]' class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">10: じゅっさい</button>
                                <button type="button" data-action="setParcialAgeTarget" data-args='[19]' class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold">19 años</button>
                                <button type="button" data-action="setParcialAgeTarget" data-args='[20]' class="px-3 py-1 rounded bg-rose-500 text-white text-xs font-mono font-extrabold shadow" title="¡Muy importante!">20: はたち ⭐</button>
                                <button type="button" data-action="setParcialAgeTarget" data-args='[21]' class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">21 años</button>
                                <button type="button" data-action="setParcialRandomAge" class="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold ml-auto">
                                    <i class="fa-solid fa-dice"></i> Aleatoria
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Guía de Preguntas de Edad -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                        <div>
                            <h4 class="text-sm font-bold text-white flex items-center gap-2 mb-3">
                                <i class="fa-solid fa-circle-question text-rose-400"></i>
                                <span>¿Cómo Preguntar la Edad?</span>
                            </h4>
                            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-4">
                                <span class="font-jp text-lg font-bold text-white block">「たなかさん は なんさい ですか。」</span>
                                <span class="text-xs text-slate-400 block mt-0.5">Tanaka-san wa nansai desu ka? (¿Cuántos años tiene Tanaka?)</span>
                                <span class="font-jp text-base font-bold text-rose-300 block mt-2">「${ageObj.hiragana} です。」</span>
                                <span class="text-xs text-slate-400 block mt-0.5">Tiene ${curAge} años.</span>
                            </div>

                            <h4 class="text-sm font-bold text-white flex items-center gap-2 mb-2">
                                <i class="fa-solid fa-star text-amber-400"></i>
                                <span>Regla de Oro: 20 Años (はたち)</span>
                            </h4>
                            <p class="text-xs text-slate-300 leading-relaxed mb-3">
                                En la cultura japonesa tradicional, cumplir 20 años marcaba la entrada formal a la adultez (<em>Seijin no Hi</em>). Por ello, se dice únicamente <strong>「はたち」(hatachi)</strong> sin agregar el sufijo <em>sai</em>.
                            </p>
                            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                                <div class="flex justify-between text-slate-300">
                                    <span>Forma correcta y tradicional:</span>
                                    <span class="font-jp font-bold text-emerald-400">はたち です。</span>
                                </div>
                                <div class="flex justify-between text-slate-400">
                                    <span>Forma coloquial moderna:</span>
                                    <span class="font-jp">にじゅっさい です。</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
                            💡 Ojo con las terminaciones en <strong>1 (いっさい)</strong> y <strong>8 (はっさい)</strong>: llevan siempre sokuon (っ pequeño).
                        </div>
                    </div>
                </div>
            `;
        }

        function setParcialAgeTarget(val) {
            state.parcial.currentAgeTarget = val;
            renderParcialPricesAges(document.getElementById('parcialWorkspaceContainer'));
        }

        function setParcialRandomAge() {
            const pool = [1, 8, 10, 15, 18, 19, 20, 21, 25, 28, 30, Math.floor(Math.random() * 50) + 1];
            state.parcial.currentAgeTarget = pool[Math.floor(Math.random() * pool.length)];
            renderParcialPricesAges(document.getElementById('parcialWorkspaceContainer'));
        }

        // ==========================================================
        // SUB-MODE 4: FLASHCARDS (46)
        // ==========================================================
        function renderParcialFlashcards(container) {
            const filter = state.parcial.flashcardFilter || 'all';
            let list = EXAM_PARCIAL_DATA.VOCABULARY;
            if (filter !== 'all') {
                list = list.filter(v => v.cat === filter);
            }
            if (list.length === 0) list = EXAM_PARCIAL_DATA.VOCABULARY;

            const idx = state.parcial.flashcardIndex % list.length;
            const card = list[idx];
            const isFlipped = !!state.parcial.flashcardFlipped;

            container.innerHTML = `
                <div class="max-w-xl mx-auto space-y-5">
                    <!-- Filtros y Progreso -->
                    <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tarjeta:</span>
                            <span class="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-bold">${idx + 1} / ${list.length}</span>
                        </div>
                        <div class="flex flex-wrap gap-1.5">
                            <button type="button" data-action="setParcialFlashcardFilter" data-args='["all"]' class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${filter === 'all' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}">Todas</button>
                            <button type="button" data-action="setParcialFlashcardFilter" data-args='["objects"]' class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${filter === 'objects' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}">Objetos</button>
                            <button type="button" data-action="setParcialFlashcardFilter" data-args='["people"]' class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${filter === 'people' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}">Personas</button>
                            <button type="button" data-action="setParcialFlashcardFilter" data-args='["places"]' class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${filter === 'places' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}">Lugares</button>
                        </div>
                    </div>

                    <!-- 3D Interactive Card -->
                    <div data-action="flipParcialFlashcard" class="cursor-pointer min-h-[300px] sm:min-h-[340px] rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 shadow-2xl relative select-none ${isFlipped ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/50 border-2 border-rose-500/50' : 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 border-2 border-emerald-500/50 hover:scale-[1.01]'}">
                        
                        <!-- Card Top Bar -->
                        <div class="flex items-center justify-between">
                            <span class="px-3 py-1 rounded-full text-xs font-bold ${isFlipped ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}">
                                ${isFlipped ? 'Significado en Español' : 'Palabra en Japonés'}
                            </span>
                            <button aria-label="Escuchar audio" type="button" data-action="speakJapanese" data-args='["${card.kana}"]' data-stop title="Escuchar audio" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white flex items-center justify-center text-sm shadow transition active:scale-90">
                                <i class="fa-solid fa-volume-high"></i>
                            </button>
                        </div>

                        <!-- Center Card Content -->
                        <div class="text-center py-6">
                            ${!isFlipped ? `
                                <div class="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl mb-4">
                                    <i class="fa-solid ${card.icon}"></i>
                                </div>
                                <h3 class="font-jp text-4xl sm:text-5xl font-black text-white tracking-wider mb-2">${card.kana}</h3>
                                <p class="text-sm font-mono text-emerald-400 font-bold">${card.romaji}</p>
                            ` : `
                                <div class="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-2xl mb-4">
                                    <i class="fa-solid ${card.icon}"></i>
                                </div>
                                <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-2">${card.es}</h3>
                                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left mt-3">
                                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Ejemplo en Contexto:</span>
                                    <span class="font-jp text-sm font-bold text-rose-300 block mt-1">${card.example}</span>
                                </div>
                            `}
                        </div>

                        <!-- Card Bottom Bar -->
                        <div class="text-center text-xs text-slate-500">
                            <span><i class="fa-solid fa-hand-pointer"></i> Haz clic o presiona <kbd class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Espacio</kbd> para voltear</span>
                        </div>
                    </div>

                    <!-- Navigation Controls -->
                    <div class="flex items-center justify-between gap-3">
                        <button type="button" data-action="navParcialFlashcard" data-args='[-1]' class="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-sm flex items-center gap-2 border border-slate-700 transition active:scale-95 shadow">
                            <i class="fa-solid fa-chevron-left"></i>
                            <span>Anterior</span>
                        </button>

                        <button type="button" data-action="flipParcialFlashcard" class="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-600/30 transition active:scale-95">
                            <i class="fa-solid fa-rotate"></i>
                            <span>Voltear</span>
                        </button>

                        <button type="button" data-action="navParcialFlashcard" data-args='[1]' class="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-sm flex items-center gap-2 border border-slate-700 transition active:scale-95 shadow">
                            <span>Siguiente</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        function flipParcialFlashcard() {
            state.parcial.flashcardFlipped = !state.parcial.flashcardFlipped;
            renderParcialFlashcards(document.getElementById('parcialWorkspaceContainer'));
        }

        function navParcialFlashcard(delta) {
            const filter = state.parcial.flashcardFilter || 'all';
            let list = EXAM_PARCIAL_DATA.VOCABULARY;
            if (filter !== 'all') list = list.filter(v => v.cat === filter);
            if (list.length === 0) list = EXAM_PARCIAL_DATA.VOCABULARY;

            let cur = state.parcial.flashcardIndex || 0;
            cur = (cur + delta + list.length) % list.length;
            state.parcial.flashcardIndex = cur;
            state.parcial.flashcardFlipped = false;
            renderParcialFlashcards(document.getElementById('parcialWorkspaceContainer'));
        }

        function setParcialFlashcardFilter(filter) {
            state.parcial.flashcardFilter = filter;
            state.parcial.flashcardIndex = 0;
            state.parcial.flashcardFlipped = false;
            renderParcialFlashcards(document.getElementById('parcialWorkspaceContainer'));
        }
