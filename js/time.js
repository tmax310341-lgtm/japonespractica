// KotoDojo · Horas, fechas y tiempo
        // ==========================================================
        // MÓDULO DE LA HORA, FECHAS Y TIEMPO (時間・日時)
        // BASADO EN EL TALLER OFICIAL: NÚMEROS, HORA Y VERBOS
        // ==========================================================

        const TIME_HOURS_DATA = [
            { num: 1, kanji: '一時', hira: 'いちじ', romaji: 'ichiji', isException: false },
            { num: 2, kanji: '二時', hira: 'にじ', romaji: 'niji', isException: false },
            { num: 3, kanji: '三時', hira: 'さんじ', romaji: 'sanji', isException: false },
            { num: 4, kanji: '四時', hira: 'よじ', romaji: 'yoji', isException: true, note: '¡NUNCA shiji ni yonji! Siempre よじ (yoji).' },
            { num: 5, kanji: '五時', hira: 'ごじ', romaji: 'goji', isException: false },
            { num: 6, kanji: '六時', hira: 'ろくじ', romaji: 'rokuji', isException: false },
            { num: 7, kanji: '七時', hira: 'しちじ', romaji: 'shichiji', isException: true, note: 'Se usa しちじ (shichiji) preferentemente sobre nanaji.' },
            { num: 8, kanji: '八時', hira: 'はちじ', romaji: 'hachiji', isException: false },
            { num: 9, kanji: '九時', hira: 'くじ', romaji: 'kuji', isException: true, note: '¡NUNCA kyuuji! Siempre くじ (kuji).' },
            { num: 10, kanji: '十時', hira: 'じゅうじ', romaji: 'juuji', isException: false },
            { num: 11, kanji: '十一時', hira: 'じゅういちじ', romaji: 'juuichiji', isException: false },
            { num: 12, kanji: '十二時', hira: 'じゅうにじ', romaji: 'juuniji', isException: false }
        ];

        const TIME_MINUTES_DATA = [
            { num: 1, kanji: '一分', hira: 'いっぷん', romaji: 'ippun', group: 'pun', isException: true, note: 'Sokuon + pun' },
            { num: 2, kanji: '二分', hira: 'にふん', romaji: 'nifun', group: 'fun', isException: false },
            { num: 3, kanji: '三分', hira: 'さんぷん', romaji: 'sanpun', group: 'pun', isException: true, note: 'Muta a -pun con n' },
            { num: 4, kanji: '四分', hira: 'よんぷん', romaji: 'yonpun', group: 'pun', isException: true, note: 'yon + pun' },
            { num: 5, kanji: '五分', hira: 'ごふん', romaji: 'gofun', group: 'fun', isException: false },
            { num: 6, kanji: '六分', hira: 'ろっぷん', romaji: 'roppun', group: 'pun', isException: true, note: 'Sokuon + pun' },
            { num: 7, kanji: '七分', hira: 'ななふん', romaji: 'nanafun', group: 'fun', isException: false },
            { num: 8, kanji: '八分', hira: 'はっぷん', romaji: 'happun', group: 'pun', isException: true, note: 'Sokuon + pun (o はちふん)' },
            { num: 9, kanji: '九分', hira: 'きゅうふん', romaji: 'kyuufun', group: 'fun', isException: false },
            { num: 10, kanji: '十分', hira: 'じゅっぷん', romaji: 'juppun', alt: 'じっぷん (jippun)', group: 'pun', isException: true, note: 'Sokuon + pun' },
            { num: 15, kanji: '十五分', hira: 'じゅうごふん', romaji: 'juugofun', group: 'fun', isException: false },
            { num: 20, kanji: '二十分', hira: 'にじゅっぷん', romaji: 'nijuppun', group: 'pun', isException: true },
            { num: 25, kanji: '二十五分', hira: 'にじゅうごふん', romaji: 'nijuugofun', group: 'fun', isException: false },
            { num: 30, kanji: '三十分', hira: 'さんじゅっぷん', romaji: 'sanjuppun', group: 'pun', isException: true, note: 'También se dice 半 (はん - han)' },
            { num: 35, kanji: '三十五分', hira: 'さんじゅうごふん', romaji: 'sanjuugofun', group: 'fun', isException: false },
            { num: 40, kanji: '四十分', hira: 'よんじゅっぷん', romaji: 'yonjuppun', group: 'pun', isException: true },
            { num: 45, kanji: '四十五分', hira: 'よんじゅうごふん', romaji: 'yonjuugofun', group: 'fun', isException: false },
            { num: 50, kanji: '五十分', hira: 'ごじゅっぷん', romaji: 'gojuppun', group: 'pun', isException: true },
            { num: 55, kanji: '五十五分', hira: 'ごじゅうごふん', romaji: 'gojuugofun', group: 'fun', isException: false }
        ];

        const TIME_MONTHS_DATA = [
            { num: 1, nameEs: 'enero', kanji: '一月', hira: 'いちがつ', romaji: 'ichigatsu', isException: false },
            { num: 2, nameEs: 'febrero', kanji: '二月', hira: 'にがつ', romaji: 'nigatsu', isException: false },
            { num: 3, nameEs: 'marzo', kanji: '三月', hira: 'さんがつ', romaji: 'sangatsu', isException: false },
            { num: 4, nameEs: 'abril', kanji: '四月', hira: 'しがつ', romaji: 'shigatsu', isException: true, note: '¡NUNCA yongatsu! Siempre しがつ (shigatsu).' },
            { num: 5, nameEs: 'mayo', kanji: '五月', hira: 'ごがつ', romaji: 'gogatsu', isException: false },
            { num: 6, nameEs: 'junio', kanji: '六月', hira: 'ろくがつ', romaji: 'rokugatsu', isException: false },
            { num: 7, nameEs: 'julio', kanji: '七月', hira: 'しちがつ', romaji: 'shichigatsu', isException: true, note: '¡NUNCA nanagatsu! Siempre しちがつ (shichigatsu).' },
            { num: 8, nameEs: 'agosto', kanji: '八月', hira: 'はちがつ', romaji: 'hachigatsu', isException: false },
            { num: 9, nameEs: 'septiembre', kanji: '九月', hira: 'くがつ', romaji: 'kugatsu', isException: true, note: '¡NUNCA kyuugatsu! Siempre くがつ (kugatsu).' },
            { num: 10, nameEs: 'octubre', kanji: '十月', hira: 'じゅうがつ', romaji: 'juugatsu', isException: false },
            { num: 11, nameEs: 'noviembre', kanji: '十一月', hira: 'じゅういちがつ', romaji: 'juuichigatsu', isException: false },
            { num: 12, nameEs: 'diciembre', kanji: '十二月', hira: 'じゅうにがつ', romaji: 'juunigatsu', isException: false }
        ];

        const TIME_DAYS_DATA = [
            { num: 1, kanji: '一日', hira: 'ついたち', romaji: 'tsuitachi', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 2, kanji: '二日', hira: 'ふつか', romaji: 'futsuka', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 3, kanji: '三日', hira: 'みっか', romaji: 'mikka', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 4, kanji: '四日', hira: 'よっか', romaji: 'yokka', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 5, kanji: '五日', hira: 'いつか', romaji: 'itsuka', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 6, kanji: '六日', hira: 'むいか', romaji: 'muika', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 7, kanji: '七日', hira: 'なのか', romaji: 'nanoka', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 8, kanji: '八日', hira: 'ようか', romaji: 'youka', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 9, kanji: '九日', hira: 'ここのか', romaji: 'kokonoka', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 10, kanji: '十日', hira: 'とおか', romaji: 'tooka', isSpecial: true, note: 'Lectura nativa especial' },
            { num: 11, kanji: '十一日', hira: 'じゅういちにち', romaji: 'juuichinichi' },
            { num: 12, kanji: '十二日', hira: 'じゅうににち', romaji: 'juuninichi' },
            { num: 13, kanji: '十三日', hira: 'じゅうさんにち', romaji: 'juusannichi' },
            { num: 14, kanji: '十四日', hira: 'じゅうよっか', romaji: 'juuyokka', isSpecial: true, note: 'Irregular: juu + yokka' },
            { num: 15, kanji: '十五日', hira: 'じゅうごにち', romaji: 'juugonichi' },
            { num: 16, kanji: '十六日', hira: 'じゅうろくにち', romaji: 'juurokunichi' },
            { num: 17, kanji: '十七日', hira: 'じゅうしちにち', romaji: 'juushichinichi', alt: 'じゅうななにち' },
            { num: 18, kanji: '十八日', hira: 'じゅうはちにち', romaji: 'juuhachinichi' },
            { num: 19, kanji: '十九日', hira: 'じゅうくにち', romaji: 'juukunichi', alt: 'じゅうきゅうにち' },
            { num: 20, kanji: '二十日', hira: 'はつか', romaji: 'hatsuka', isSpecial: true, note: 'Lectura única tradicional: はつか' },
            { num: 21, kanji: '二十一日', hira: 'にじゅういちにち', romaji: 'nijuuichinichi' },
            { num: 22, kanji: '二十二日', hira: 'にじゅうににち', romaji: 'nijuuninichi' },
            { num: 23, kanji: '二十三日', hira: 'にじゅうさんにち', romaji: 'nijuusannichi' },
            { num: 24, kanji: '二十四日', hira: 'にじゅうよっか', romaji: 'nijuuyokka', isSpecial: true, note: 'Irregular: nijuu + yokka' },
            { num: 25, kanji: '二十五日', hira: 'にじゅうごにち', romaji: 'nijuugonichi' },
            { num: 26, kanji: '二十六日', hira: 'にじゅうろくにち', romaji: 'nijuurokunichi' },
            { num: 27, kanji: '二十七日', hira: 'にじゅうしちにち', romaji: 'nijuushichinichi' },
            { num: 28, kanji: '二十八日', hira: 'にじゅうはちにち', romaji: 'nijuuhachinichi' },
            { num: 29, kanji: '二十九日', hira: 'にじゅうくにち', romaji: 'nijuukunichi' },
            { num: 30, kanji: '三十日', hira: 'さんじゅうにち', romaji: 'sanjuunichi' },
            { num: 31, kanji: '三十一日', hira: 'さんじゅういちにち', romaji: 'sanjuuichinichi' }
        ];

        const TIME_WEEKDAYS_DATA = [
            {
                day: 'Lunes',
                baseKanji: '月',
                elementName: 'Luna',
                elementEmoji: '🌙',
                meaning: 'Luna / Mes. Representa la luna creciente en el cielo nocturno.',
                strokes: 4,
                kanji: '月曜日',
                hira: 'げつようび',
                romaji: 'getsuyoubi',
                element: 'Luna (月)',
                mnemonic: 'Lunes = Día de la Luna (como Moon-day en inglés).'
            },
            {
                day: 'Martes',
                baseKanji: '火',
                elementName: 'Fuego',
                elementEmoji: '🔥',
                meaning: 'Fuego / Llama. Llamas ardientes; asociado al planeta Marte (火星).',
                strokes: 4,
                kanji: '火曜日',
                hira: 'かようび',
                romaji: 'kayoubi',
                element: 'Fuego (火)',
                mnemonic: 'Martes = Día del Fuego (asociado a Marte).'
            },
            {
                day: 'Miércoles',
                baseKanji: '水',
                elementName: 'Agua',
                elementEmoji: '💧',
                meaning: 'Agua / Corriente. Río o corriente de agua; asociado al planeta Mercurio (水星).',
                strokes: 4,
                kanji: '水曜日',
                hira: 'すいようび',
                romaji: 'suiyoubi',
                element: 'Agua (水)',
                mnemonic: 'Miércoles = Día del Agua (asociado a Mercurio).'
            },
            {
                day: 'Jueves',
                baseKanji: '木',
                elementName: 'Árbol / Madera',
                elementEmoji: '🌲',
                meaning: 'Árbol / Madera. Tronco con ramas y raíces; asociado al planeta Júpiter (木星).',
                strokes: 4,
                kanji: '木曜日',
                hira: 'もくようび',
                romaji: 'mokuyoubi',
                element: 'Árbol/Madera (木)',
                mnemonic: 'Jueves = Día del Árbol / Madera (asociado a Júpiter).'
            },
            {
                day: 'Viernes',
                baseKanji: '金',
                elementName: 'Oro / Metal / Dinero',
                elementEmoji: '🪙',
                meaning: 'Oro / Metal / Dinero. Pepitas minerales bajo la tierra; asociado a Venus (金星).',
                strokes: 8,
                kanji: '金曜日',
                hira: 'きんようび',
                romaji: 'kinyoubi',
                element: 'Oro/Metal (金)',
                mnemonic: 'Viernes = Día del Oro / Dinero (¡día de sueldo y salir!).'
            },
            {
                day: 'Sábado',
                baseKanji: '土',
                elementName: 'Tierra / Suelo',
                elementEmoji: '⛰️',
                meaning: 'Tierra / Suelo. Montículo o brote de arcilla; asociado a Saturno (土星).',
                strokes: 3,
                kanji: '土曜日',
                hira: 'どようび',
                romaji: 'doyoubi',
                element: 'Tierra (土)',
                mnemonic: 'Sábado = Día de la Tierra (asociado a Saturno).'
            },
            {
                day: 'Domingo',
                baseKanji: '日',
                elementName: 'Sol / Día',
                elementEmoji: '☀️',
                meaning: 'Sol / Día. El disco solar radiante con su núcleo central.',
                strokes: 4,
                kanji: '日曜日',
                hira: 'にちようび',
                romaji: 'nichiyoubi',
                element: 'Sol (日)',
                mnemonic: 'Domingo = Día del Sol (como Sun-day en inglés).'
            }
        ];

        const TIME_ROUTINE_VERBS_DATA = [
            { hira: 'おきます', romaji: 'okimasu', es: 'Levantarse / despertarse', icon: 'fa-sun', ex: 'しちじに おきます (7:00)' },
            { hira: 'ねます', romaji: 'nemasu', es: 'Acostarse / dormir', icon: 'fa-moon', ex: 'じゅういちじに ねます (11:00)' },
            { hira: 'はたらきます', romaji: 'hatarakimasu', es: 'Trabajar', icon: 'fa-briefcase', ex: 'はちじから ごじまで はたらきます (8–5)' },
            { hira: 'やすみます', romaji: 'yasumimasu', es: 'Descansar', icon: 'fa-mug-hot', ex: 'いちじから にじまで やすみます (1–2)' },
            { hira: 'べんきょうします', romaji: 'benkyou shimasu', es: 'Estudiar', icon: 'fa-book-open', ex: 'くじから じゅうにじまで べんきょうします (9–12)' },
            { hira: 'おわります', romaji: 'owarimasu', es: 'Terminar', icon: 'fa-flag-checkered', ex: 'ろくじに おわります (6:00)' }
        ];

        const TIME_SENTENCES_DATA = [
            {
                pattern: 'Preguntar la hora',
                jp: '何時ですか。',
                hira: 'なんじですか。',
                romaji: 'nanji desu ka.',
                es: '¿Qué hora es?'
            },
            {
                pattern: 'Hora exacta',
                jp: '3時です。',
                hira: 'さんじです。',
                romaji: 'sanji desu.',
                es: 'Son las 3.'
            },
            {
                pattern: 'Hora con minutos',
                jp: '7時20分です。',
                hira: 'しちじ にじゅっぷんです。',
                romaji: 'shichiji nijuppun desu.',
                es: 'Son las 7:20.'
            },
            {
                pattern: 'Media hora (半)',
                jp: '午後3時半です。',
                hira: 'ごご さんじはんです。',
                romaji: 'gogo sanjihan desu.',
                es: 'Son las 3:30 p.m. (3 y media de la tarde).'
            },
            {
                pattern: 'AM / Mañana',
                jp: '午前8時です。',
                hira: 'ごぜん はちじです。',
                romaji: 'gozen hachiji desu.',
                es: 'Son las 8:00 a.m.'
            },
            {
                pattern: 'Preguntar hora de acción (に)',
                jp: 'なんじに おきますか。',
                hira: 'なんじに おきますか。',
                romaji: 'nanji ni okimasu ka.',
                es: '¿A qué hora te levantas?'
            },
            {
                pattern: 'Rutina (Partícula に)',
                jp: 'わたしは しちじに おきます。',
                hira: 'わたしは しちじに おきます。',
                romaji: 'watashi wa shichiji ni okimasu.',
                es: 'Me levanto a las 7:00.'
            },
            {
                pattern: 'Rutina (Partícula に)',
                jp: 'わたしは じゅういちじに ねます。',
                hira: 'わたしは じゅういちじに ねます。',
                romaji: 'watashi wa juuichiji ni nemasu.',
                es: 'Me acuesto a las 11:00.'
            },
            {
                pattern: 'Rango (から ... まで)',
                jp: 'わたしは いちじから にじまで やすみます。',
                hira: 'わたしは いちじから にじまで やすみます。',
                romaji: 'watashi wa ichiji kara niji made yasumimasu.',
                es: 'Descanso de 1:00 a 2:00.'
            },
            {
                pattern: 'Estudio (から ... まで)',
                jp: 'わたしは くじから ごじまで べんきょうします。',
                hira: 'わたしは くじから ごじまで べんきょうします。',
                romaji: 'watashi wa kuji kara goji made benkyou shimasu.',
                es: 'Estudio de 9:00 a 5:00.'
            },
            {
                pattern: 'Pregunta de rango',
                jp: 'なんじから なんじまで はたらきますか。',
                hira: 'なんじから なんじまで はたらきますか。',
                romaji: 'nanji kara nanji made hatarakimasu ka.',
                es: '¿De qué hora a qué hora trabajas?'
            }
        ];

        // Función que convierte una hora (1..12, 0..59, period) en su lectura fonética y en kanji
        function formatTimePhrase(hour, minute, period = 'pm') {
            const hData = TIME_HOURS_DATA.find(h => h.num === hour) || TIME_HOURS_DATA[2];
            const periodKanji = period === 'am' ? '午前' : '午後';
            const periodHira = period === 'am' ? 'ごぜん' : 'ごご';
            const periodRomaji = period === 'am' ? 'gozen' : 'gogo';

            let minKanji = '';
            let minHira = '';
            let minRomaji = '';

            if (minute === 0) {
                // Sin minutos
            } else if (minute === 30) {
                minKanji = '半';
                minHira = 'はん';
                minRomaji = 'han';
            } else {
                // Buscar si está en tabla o componer
                const exactMin = TIME_MINUTES_DATA.find(m => m.num === minute);
                if (exactMin) {
                    minKanji = exactMin.kanji;
                    minHira = exactMin.hira;
                    minRomaji = exactMin.romaji;
                } else {
                    // Minuto compuesto (ej. 17 -> 10 + 7, 23 -> 20 + 3)
                    const tens = Math.floor(minute / 10);
                    const units = minute % 10;
                    let tK = '', tH = '', tR = '';
                    let uK = '', uH = '', uR = '';

                    if (units === 0 && tens > 0) {
                        if (tens === 1) {
                            minKanji = '十分'; minHira = 'じゅっぷん'; minRomaji = 'juppun';
                        } else {
                            const d = DIGIT_HIRAGANA[tens];
                            minKanji = DIGIT_KANJI[tens] + '十分';
                            minHira = d.hira + 'じゅっぷん';
                            minRomaji = d.romaji + 'juppun';
                        }
                    } else {
                        if (tens > 0) {
                            if (tens === 1) {
                                tK = '十'; tH = 'じゅう'; tR = 'juu';
                            } else {
                                const d = DIGIT_HIRAGANA[tens];
                                tK = DIGIT_KANJI[tens] + '十';
                                tH = d.hira + 'じゅう';
                                tR = d.romaji + 'juu';
                            }
                        }
                        if (units > 0) {
                            const uMinData = TIME_MINUTES_DATA.find(m => m.num === units);
                            if (uMinData) {
                                uK = uMinData.kanji;
                                uH = uMinData.hira;
                                uR = uMinData.romaji;
                            }
                        }
                        minKanji = tK + uK;
                        minHira = tH + uH;
                        minRomaji = (tR ? tR + ' ' : '') + uR;
                    }
                }
            }

            const fullKanji = periodKanji + hData.kanji + minKanji + 'です';
            const fullHira = periodHira + ' ' + hData.hira + (minHira ? ' ' + minHira : '') + 'です';
            const fullRomaji = periodRomaji + ' ' + hData.romaji + (minRomaji ? ' ' + minRomaji : '') + ' desu';

            return {
                hour,
                minute,
                period,
                kanji: fullKanji,
                hiragana: fullHira,
                romaji: fullRomaji,
                shortKanji: periodKanji + hData.kanji + minKanji,
                shortHira: periodHira + hData.hira + minHira,
                blocksKanji: [periodKanji, hData.kanji, minKanji || '整'].filter(b => b !== '整'),
                blocksKana: [periodHira, hData.hira, minHira || '整'].filter(b => b !== '整')
            };
        }

        // ==========================================================
        // CONTROLADOR PRINCIPAL DEL TALLER DE TIEMPO
        // ==========================================================
        function initTimeGame() {
            if (!state.timeConfig) {
                state.timeConfig = {
                    mode: 'guide',
                    guideSubTab: 'hours',
                    scriptMode: 'kanji',
                    streak: 0,
                    score: 0
                };
            }
            if (!state.timeClockState) {
                state.timeClockState = { hour: 3, minute: 30, period: 'pm' };
            }
            updateTimeHeaderStats();
            setTimeMode(state.timeConfig.mode || 'guide', true);
        }

        function updateTimeHeaderStats() {
            const streakEl = document.getElementById('timeStreakDisplay');
            const scoreEl = document.getElementById('timeScoreDisplay');
            const scriptModeLabel = document.getElementById('timeScriptModeLabel');

            if (streakEl) streakEl.innerHTML = '<i class="fa-solid fa-fire text-amber-400 text-sm"></i> ' + (state.timeConfig.streak || 0);
            if (scoreEl) scoreEl.textContent = state.timeConfig.score || 0;
            if (scriptModeLabel) scriptModeLabel.textContent = (state.timeConfig.scriptMode === 'kanji') ? '漢 Kanji' : 'あ Kanas';
        }

        function toggleTimeScriptMode() {
            if (!state.timeConfig) state.timeConfig = {};
            state.timeConfig.scriptMode = (state.timeConfig.scriptMode === 'kanji') ? 'kana' : 'kanji';
            saveStateToStorage();
            updateTimeHeaderStats();
            // Re-render current mode
            const mode = state.timeConfig.mode || 'guide';
            if (mode === 'guide') renderTimeGuide();
            else if (mode === 'builder') nextTimeBuilderChallenge();
            else if (mode === 'listening') nextTimeListeningChallenge();
            else if (mode === 'quiz') nextTimeQuizChallenge();
        }

        function setTimeMode(mode, skipSave) {
            state.timeConfig.mode = mode;
            if (!skipSave) saveStateToStorage();

            const tabs = document.querySelectorAll('.time-mode-tab');
            tabs.forEach(tab => {
                const tabMode = tab.id.replace('btn-time-mode-', '');
                if (tabMode === mode) {
                    tab.className = 'time-mode-tab flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 stage-theme-primary-btn shadow-md';
                } else {
                    tab.className = 'time-mode-tab flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800';
                }
            });

            if (mode === 'guide') {
                renderTimeGuide();
            } else if (mode === 'builder') {
                nextTimeBuilderChallenge();
            } else if (mode === 'listening') {
                nextTimeListeningChallenge();
            } else if (mode === 'quiz') {
                nextTimeQuizChallenge();
            }
        }

        function setTimeGuideSubTab(subTab) {
            state.timeConfig.guideSubTab = subTab;
            saveStateToStorage();
            renderTimeGuide();
        }

        // ==========================================================
        // MODO 1: GUÍA Y RELOJ INTERACTIVO
        // ==========================================================
        function updateClockHands(hour, minute) {
            const hourHand = document.getElementById('svgClockHourHand');
            const minuteHand = document.getElementById('svgClockMinuteHand');
            if (!hourHand || !minuteHand) return;

            const hourAngle = ((hour % 12) + minute / 60) * 30;
            const minuteAngle = minute * 6;

            hourHand.setAttribute('transform', `rotate(${hourAngle} 100 100)`);
            minuteHand.setAttribute('transform', `rotate(${minuteAngle} 100 100)`);
        }

        function buildClockPhraseHtml(phrase, isKanji) {
            const primaryText = isKanji ? phrase.kanji : phrase.hiragana;
            const secondaryText = isKanji ? phrase.hiragana : phrase.kanji;
            const halfHourNote = phrase.minute === 30
                ? `<div class="pt-1">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-jp text-amber-300 font-semibold">
                            <i class="fa-solid fa-lightbulb text-[10px]"></i> Media hora: 半 (はん) — también válido 三十分 (さんじゅっぷん)
                        </span>
                   </div>`
                : '';

            return `
                <div class="space-y-1">
                    <div class="text-2xl sm:text-3xl font-black text-white font-jp tracking-wide flex items-center justify-center gap-2">
                        <span>${primaryText}</span>
                        <button type="button" data-action="speakJapanese" data-args='["${phrase.hiragana}"]' class="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                            <i class="fa-solid fa-volume-high text-sm"></i>
                        </button>
                    </div>
                    <div class="text-xs sm:text-sm font-jp text-amber-300 font-bold">
                        ${secondaryText}
                    </div>
                    <div class="text-[11px] font-mono text-slate-400">
                        ${phrase.romaji}
                    </div>
                    ${halfHourNote}
                </div>
            `;
        }

        function syncClockControlsUI() {
            const h = state.timeClockState.hour;
            const m = state.timeClockState.minute;
            const p = state.timeClockState.period;

            updateClockHands(h, m);

            const hourDigits = document.getElementById('clockHourDigits');
            if (hourDigits) hourDigits.textContent = String(h);

            const minDigits = document.getElementById('clockMinuteDigits');
            if (minDigits) minDigits.textContent = String(m).padStart(2, '0');

            const amBtn = document.getElementById('btnClockPeriodAM');
            const pmBtn = document.getElementById('btnClockPeriodPM');
            if (amBtn) {
                amBtn.className = 'flex-1 py-2 rounded-xl text-xs font-bold transition ' +
                    (p === 'am' ? 'bg-sky-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white');
            }
            if (pmBtn) {
                pmBtn.className = 'flex-1 py-2 rounded-xl text-xs font-bold transition ' +
                    (p === 'pm' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white');
            }

            updateClockReadout();
        }

        function adjustClockTime(deltaHour, deltaMinute) {
            let h = state.timeClockState.hour + deltaHour;
            let m = state.timeClockState.minute + deltaMinute;

            while (m < 0) { m += 60; h -= 1; }
            while (m >= 60) { m -= 60; h += 1; }

            while (h < 1) h += 12;
            while (h > 12) h -= 12;

            state.timeClockState.hour = h;
            state.timeClockState.minute = m;

            syncClockControlsUI();
        }

        function setClockPeriod(p) {
            state.timeClockState.period = p;
            syncClockControlsUI();
        }

        function setClockPreset(h, m, p, autoSpeak = true) {
            state.timeClockState.hour = h;
            state.timeClockState.minute = m;
            state.timeClockState.period = p;
            syncClockControlsUI();
            if (autoSpeak) {
                const phrase = formatTimePhrase(h, m, p);
                speakJapanese(phrase.hiragana);
            }
        }

        function updateClockReadout() {
            const h = state.timeClockState.hour;
            const m = state.timeClockState.minute;
            const p = state.timeClockState.period;
            const phrase = formatTimePhrase(h, m, p);

            const displayEl = document.getElementById('clockLivePhraseContainer');
            if (displayEl) {
                const isKanji = (state.timeConfig?.scriptMode || 'kanji') === 'kanji';
                displayEl.innerHTML = buildClockPhraseHtml(phrase, isKanji);
            }
        }

        function renderTimeGuide() {
            const container = document.getElementById('timeWorkspaceContainer');
            if (!container) return;

            const sub = state.timeConfig.guideSubTab || 'hours';
            const h = state.timeClockState.hour;
            const m = state.timeClockState.minute;
            const p = state.timeClockState.period;
            const phrase = formatTimePhrase(h, m, p);
            const isKanji = (state.timeConfig?.scriptMode || 'kanji') === 'kanji';

            const hourAngle = ((h % 12) + m / 60) * 30;
            const minAngle = m * 6;

            // Sub-nav pills
            const subTabsMeta = [
                { id: 'hours', label: 'Horas (時)', icon: 'fa-clock' },
                { id: 'minutes', label: 'Minutos (分)', icon: 'fa-stopwatch' },
                { id: 'days', label: 'Días (日)', icon: 'fa-calendar-day' },
                { id: 'months', label: 'Meses (月)', icon: 'fa-calendar' },
                { id: 'weekdays', label: 'Semana (曜日)', icon: 'fa-calendar-week' },
                { id: 'sentences', label: 'Oraciones (会話)', icon: 'fa-comments' }
            ];

            let subContentHtml = '';

            if (sub === 'hours') {
                subContentHtml = `
                    <div class="space-y-4 animate-fade-in">
                        <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                            <span class="text-xs font-bold text-amber-300 flex items-center gap-2 uppercase tracking-wide">
                                <i class="fa-solid fa-triangle-exclamation text-amber-400"></i> Las 3 Excepciones Obligatorias de Horas:
                            </span>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                Se usa el sufijo <strong class="text-white font-jp">〜時 (じ - ji)</strong>. Las horas <strong class="text-amber-300">4, 7 y 9</strong> son excepciones estrictas:
                            </p>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300">
                                    <strong>4:00 → 四時 (よじ)</strong><br><span class="text-[10px] text-slate-400">¡NUNCA shiji ni yonji!</span>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300">
                                    <strong>7:00 → 七時 (しちじ)</strong><br><span class="text-[10px] text-slate-400">Habitual frente a nanaji</span>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300">
                                    <strong>9:00 → 九時 (くじ)</strong><br><span class="text-[10px] text-slate-400">¡NUNCA kyuuji!</span>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                            ${TIME_HOURS_DATA.map(item => `
                                <div class="p-3 rounded-2xl bg-slate-950 border ${item.isException ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-800'} hover:border-sky-400/50 flex flex-col justify-between gap-2 transition group">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-xl font-black ${item.isException ? 'text-amber-300' : 'text-white'}">${item.num}:00</span>
                                        <button type="button" data-action="speakJapanese" data-args='["${item.hira}"]' class="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <div class="font-jp text-lg font-bold text-white">${item.kanji} (${item.hira})</div>
                                        <div class="font-mono text-xs text-slate-400">${item.romaji}${item.isException ? ' ⭐' : ''}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else if (sub === 'minutes') {
                subContentHtml = `
                    <div class="space-y-4 animate-fade-in">
                        <div class="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 space-y-1.5">
                            <span class="text-xs font-bold text-sky-300 flex items-center gap-2 uppercase tracking-wide">
                                <i class="fa-solid fa-circle-info text-sky-400"></i> La Regla de los Minutos: 〜ふん (fun) vs 〜ぷん (pun)
                            </span>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                Los minutos se dividen en dos grupos fonéticos. Los que terminan en <strong class="text-amber-300">1, 3, 4, 6, 8, 10</strong> mutan a <strong class="text-white font-jp">〜ぷん (-pun)</strong> con sokuon (consonante doble).
                            </p>
                            <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                                <span><strong>Regla de media hora:</strong> 30 minutos se dice <strong class="text-amber-300 font-jp">半 (はん - han)</strong> o <strong class="text-sky-300 font-jp">三十分 (さんじゅっぷん)</strong>. Ej: 3:30 = <span class="font-jp text-white">三時半 (さんじはん)</span></span>
                                <button type="button" data-action="speakJapanese" data-args='["さんじはん"]' class="text-amber-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                            ${TIME_MINUTES_DATA.map(item => `
                                <div class="p-3 rounded-2xl bg-slate-950 border ${item.group === 'pun' ? 'border-amber-500/40' : 'border-slate-800'} hover:border-sky-400/50 flex flex-col justify-between gap-1.5 transition">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-lg font-black ${item.group === 'pun' ? 'text-amber-300' : 'text-slate-200'}">${item.num} min</span>
                                        <button type="button" data-action="speakJapanese" data-args='["${item.hira}"]' class="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <div class="font-jp text-base font-bold text-white">${item.kanji} (${item.hira})</div>
                                        <div class="font-mono text-xs text-slate-400">${item.romaji} <span class="text-[10px] px-1 py-0.2 rounded ${item.group === 'pun' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}">${item.group}</span></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else if (sub === 'days') {
                subContentHtml = `
                    <div class="space-y-4 animate-fade-in">
                        <div class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
                            <span class="text-xs font-bold text-rose-300 flex items-center gap-2 uppercase tracking-wide">
                                <i class="fa-solid fa-star text-rose-400"></i> Días del Mes: Conteo Nativo Especial (1 al 10, 14, 20 y 24)
                            </span>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                Los días del 1 al 10 usan el sistema nativo ancestral japonés (<em class="text-amber-300">Yamato Kotoba</em>), ¡no usan <em>ichi-nichi</em> ni <em>ni-nichi</em>! Además, <strong>14, 20 y 24</strong> tienen lecturas irregulares que debes memorizar:
                            </p>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                            ${TIME_DAYS_DATA.map(item => `
                                <div class="p-3 rounded-2xl bg-slate-950 border ${item.isSpecial ? 'border-rose-500/50 bg-rose-500/5' : 'border-slate-800'} hover:border-sky-400/50 flex flex-col justify-between gap-1.5 transition">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-lg font-black ${item.isSpecial ? 'text-rose-300' : 'text-slate-200'}">Día ${item.num}</span>
                                        <button type="button" data-action="speakJapanese" data-args='["${item.hira}"]' class="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <div class="font-jp text-base font-bold text-white">${item.kanji} (${item.hira})</div>
                                        <div class="font-mono text-xs text-slate-400">${item.romaji}${item.isSpecial ? ' ⚠️' : ''}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else if (sub === 'months') {
                subContentHtml = `
                    <div class="space-y-4 animate-fade-in">
                        <div class="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1.5">
                            <span class="text-xs font-bold text-purple-300 flex items-center gap-2 uppercase tracking-wide">
                                <i class="fa-solid fa-calendar text-purple-400"></i> Meses del Año: 〜月 (がつ - gatsu) y las 3 Excepciones
                            </span>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                Los meses se nombran simplemente diciendo el número + <strong class="text-white font-jp">月 (がつ)</strong>. Ten sumo cuidado con <strong>abril (4), julio (7) y septiembre (9)</strong>:
                            </p>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                            ${TIME_MONTHS_DATA.map(item => `
                                <div class="p-3.5 rounded-2xl bg-slate-950 border ${item.isException ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-800'} hover:border-sky-400/50 flex flex-col justify-between gap-1.5 transition">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <span class="font-mono text-lg font-black ${item.isException ? 'text-amber-300' : 'text-slate-200'}">Mes ${item.num}</span>
                                            <span class="block text-[11px] font-semibold capitalize text-slate-400">${item.nameEs}</span>
                                        </div>
                                        <button type="button" data-action="speakJapanese" data-args='["${item.hira}"]' class="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <div class="font-jp text-lg font-bold text-white">${item.kanji} (${item.hira})</div>
                                        <div class="font-mono text-xs text-slate-400">${item.romaji}${item.isException ? ' ⭐' : ''}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else if (sub === 'weekdays') {
                subContentHtml = `
                    <div class="space-y-5 animate-fade-in">
                        <!-- Banner Explicativo Cósmico y de Elementos -->
                        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-sky-500/15 border-2 border-emerald-500/30 space-y-2">
                            <div class="flex items-center justify-between gap-2 flex-wrap">
                                <span class="text-xs font-bold text-emerald-300 flex items-center gap-2 uppercase tracking-wide">
                                    <i class="fa-solid fa-calendar-week text-emerald-400"></i> Los 7 Días de la Semana: Kanjis, Trazos y Significados
                                </span>
                                <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                                    七曜 (Shichiyō) + 五行 (Gogyō)
                                </span>
                            </div>
                            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                En japonés, los 7 días de la semana no tienen nombres arbitrarios: representan los <strong class="text-white">7 astros del cosmos</strong> y los <strong class="text-emerald-300">5 elementos de la naturaleza</strong> (Sol, Luna, Fuego, Agua, Madera, Metal y Tierra). Todos se forman sumando el kanji elemental + el sufijo común <strong class="text-amber-300 font-jp">曜日 (ようび - youbi)</strong>.
                            </p>
                            <div class="pt-1 flex flex-wrap gap-2 text-xs">
                                <span class="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-jp">
                                    Fórmula: <strong class="text-amber-400">[Elemento]</strong> + <span class="text-sky-300 font-bold">曜日 (ようび)</span>
                                </span>
                                <button type="button" data-action="showKanaStrokeModal" data-args='["曜"]' class="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 font-bold flex items-center gap-1.5 transition">
                                    <i class="fa-solid fa-paintbrush text-amber-400 text-xs"></i> Trazos de 曜 (18 trazos)
                                </button>
                            </div>
                        </div>

                        <!-- Grilla de Tarjetas Interactivas de los 7 Días con Guía de Trazos -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                            ${TIME_WEEKDAYS_DATA.map(item => `
                                <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between gap-3 shadow-sm transition group">
                                    <div class="flex items-start justify-between gap-2">
                                        <div class="flex items-center gap-3">
                                            <!-- Kanji elemental en badge visual -->
                                            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-emerald-500/40 flex items-center justify-center font-jp text-2xl font-black text-white group-hover:text-emerald-300 transition shadow-md shrink-0">
                                                ${item.baseKanji}
                                            </div>
                                            <div>
                                                <div class="flex items-center gap-1.5">
                                                    <span class="text-sm font-black text-white">${item.day}</span>
                                                    <span class="text-sm">${item.elementEmoji}</span>
                                                </div>
                                                <div class="font-jp text-lg font-black text-amber-300">${item.kanji}</div>
                                                <div class="font-jp text-xs text-slate-400">${item.hira} <span class="font-mono text-[11px] text-slate-500">(${item.romaji})</span></div>
                                            </div>
                                        </div>
                                        <button type="button" data-action="speakJapanese" data-args='["${item.hira}"]' class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 flex items-center justify-center transition active:scale-90 shrink-0" title="Escuchar pronunciación">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>

                                    <!-- Explicación de significado del Kanji -->
                                    <div class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                                        <div class="flex items-center justify-between text-[11px]">
                                            <span class="font-bold text-emerald-400 uppercase tracking-wide">
                                                Elemento: ${item.elementName}
                                            </span>
                                            <span class="font-mono text-slate-400 font-bold">${item.strokes} trazos</span>
                                        </div>
                                        <p class="text-[11px] text-slate-300 leading-tight">${item.meaning}</p>
                                        <div class="text-[10px] text-amber-200/90 font-medium italic pt-0.5 border-t border-slate-800">
                                            💡 ${item.mnemonic}
                                        </div>
                                    </div>

                                    <!-- Botones de Acción de Caligrafía -->
                                    <div class="flex items-center gap-2 pt-1 border-t border-slate-900">
                                        <button type="button" data-action="showKanaStrokeModal" data-args='["${item.baseKanji}"]'
                                            class="flex-1 py-1.5 px-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                                            title="Ver animación trazo por trazo de ${item.baseKanji}">
                                            <i class="fa-solid fa-paintbrush text-[11px] text-rose-400"></i>
                                            <span>Trazos (${item.baseKanji})</span>
                                        </button>
                                        <button type="button" data-action="practiceKanjiInCanvas" data-args='["${item.baseKanji}"]'
                                            class="flex-1 py-1.5 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                                            title="Dibujar ${item.baseKanji} en el lienzo interactivo">
                                            <i class="fa-solid fa-pen-nib text-[11px] text-amber-400"></i>
                                            <span>Lienzo</span>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}

                            <!-- Tarjeta Especial para el Kanji Común 曜 (you) -->
                            <div class="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950/40 border-2 border-indigo-500/40 flex flex-col justify-between gap-3 shadow-md">
                                <div class="flex items-start justify-between gap-2">
                                    <div class="flex items-center gap-3">
                                        <div class="w-12 h-12 rounded-2xl bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center font-jp text-2xl font-black text-indigo-300 shadow-md shrink-0">
                                            曜
                                        </div>
                                        <div>
                                            <span class="text-xs font-black text-indigo-300 uppercase tracking-wide">Sufijo Universal</span>
                                            <div class="font-jp text-lg font-black text-white">〜曜日 <span class="text-xs font-normal text-slate-300">(ようび)</span></div>
                                            <div class="text-[11px] text-slate-400">Lectura On: <strong>ヨウ (you)</strong></div>
                                        </div>
                                    </div>
                                    <button type="button" data-action="speakJapanese" data-args='["ようび"]' class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 flex items-center justify-center transition active:scale-90 shrink-0" title="Escuchar">
                                        <i class="fa-solid fa-volume-high text-xs"></i>
                                    </button>
                                </div>

                                <div class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                                    <div class="flex items-center justify-between text-[11px]">
                                        <span class="font-bold text-indigo-300">Significado: Astro Celestial</span>
                                        <span class="font-mono text-slate-400 font-bold">18 trazos</span>
                                    </div>
                                    <p class="text-[11px] text-slate-300 leading-tight">
                                        Compuesto por Sol (日) + plumas/alas (羽) + pájaro (隹). Representa los astros o cuerpos celestes que rigen cada día.
                                    </p>
                                </div>

                                <div class="flex items-center gap-2 pt-1 border-t border-slate-900">
                                    <button type="button" data-action="showKanaStrokeModal" data-args='["曜"]'
                                        class="flex-1 py-1.5 px-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 shadow-sm">
                                        <i class="fa-solid fa-paintbrush text-[11px] text-rose-400"></i>
                                        <span>Trazos (曜)</span>
                                    </button>
                                    <button type="button" data-action="practiceKanjiInCanvas" data-args='["曜"]'
                                        class="flex-1 py-1.5 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 shadow-sm">
                                        <i class="fa-solid fa-pen-nib text-[11px] text-amber-400"></i>
                                        <span>Lienzo</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (sub === 'sentences') {
                subContentHtml = `
                    <div class="space-y-5 animate-fade-in">
                        <div class="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 space-y-1.5">
                            <span class="text-xs font-bold text-sky-300 flex items-center gap-2 uppercase tracking-wide">
                                <i class="fa-solid fa-comments text-sky-400"></i> Expresiones, Verbos de Rutina y Gramática del Taller Oficial
                            </span>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                Usa <strong class="text-amber-300 font-jp">[Hora] + に + [Verbo]</strong> para indicar a qué hora haces una acción, y <strong class="text-sky-300 font-jp">[Inicio] + から + [Fin] + まで</strong> para expresar rangos ("desde... hasta...").
                            </p>
                        </div>

                        <!-- Los 6 Verbos de Rutina del Taller (pág. 11) -->
                        <div class="space-y-2.5">
                            <span class="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 px-1">
                                <i class="fa-solid fa-person-walking text-amber-400"></i> Los 6 Verbos Clave de Rutina Diaria (〜ます):
                            </span>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                ${TIME_ROUTINE_VERBS_DATA.map(v => `
                                    <div class="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 flex items-center justify-between gap-3 transition">
                                        <div class="space-y-0.5 min-w-0">
                                            <div class="flex items-center gap-1.5">
                                                <i class="fa-solid ${v.icon} text-amber-400 text-xs"></i>
                                                <span class="font-jp text-base font-black text-white">${v.hira}</span>
                                            </div>
                                            <div class="font-mono text-[11px] text-amber-300">${v.romaji}</div>
                                            <div class="text-xs text-slate-300 font-semibold">${v.es}</div>
                                            <div class="text-[11px] font-jp text-slate-400 truncate">Ej: ${v.ex}</div>
                                        </div>
                                        <button type="button" data-action="speakJapanese" data-args='["${v.hira}"]' class="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 flex items-center justify-center transition active:scale-90 shrink-0" title="Escuchar verbo">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="space-y-2.5">
                            <span class="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5 px-1">
                                <i class="fa-solid fa-quote-left text-sky-400"></i> Oraciones Modelo con Audio:
                            </span>
                            ${TIME_SENTENCES_DATA.map(item => `
                                <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-400/50 flex items-center justify-between gap-4 transition">
                                    <div class="space-y-1">
                                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 uppercase tracking-wide font-bold">${item.pattern}</span>
                                        <div class="font-jp text-lg font-bold text-white">${item.jp}</div>
                                        <div class="font-jp text-xs text-amber-300">${item.hira} <span class="text-slate-400 font-mono">(${item.romaji})</span></div>
                                        <div class="text-xs text-slate-300 font-medium">→ ${item.es}</div>
                                    </div>
                                    <button type="button" data-action="speakJapanese" data-args='["${item.hira}"]' class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 flex items-center justify-center transition active:scale-90 shrink-0" title="Escuchar">
                                        <i class="fa-solid fa-volume-high text-sm"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            container.innerHTML = `
                <div class="space-y-6">
                    
                    <!-- Reloj Interactivo en Vivo -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
                        <div class="text-center space-y-1">
                            <span class="text-xs uppercase font-bold text-slate-400 tracking-widest block">Reloj Analógico y Digital Interactivo:</span>
                            <div class="flex items-center justify-between gap-3 flex-wrap">
                                <h3 class="text-xl sm:text-2xl font-black text-white">Ajusta la Hora y Escucha su Lectura Nativa</h3>
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <button type="button" data-action="showKanaStrokeModal" data-args='["時"]' class="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1 shadow-sm" title="Ver trazos de 時">
                                        <i class="fa-solid fa-paintbrush text-rose-400"></i> 時
                                    </button>
                                    <button type="button" data-action="showKanaStrokeModal" data-args='["分"]' class="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1 shadow-sm" title="Ver trazos de 分">
                                        <i class="fa-solid fa-paintbrush text-rose-400"></i> 分
                                    </button>
                                    <button type="button" data-action="showKanaStrokeModal" data-args='["半"]' class="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1 shadow-sm" title="Ver trazos de 半">
                                        <i class="fa-solid fa-paintbrush text-amber-400"></i> 半
                                    </button>
                                    <button type="button" data-action="showKanaStrokeModal" data-args='["月"]' class="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-bold transition flex items-center gap-1 shadow-sm" title="Ver trazos de 月">
                                        <i class="fa-solid fa-paintbrush text-purple-400"></i> 月
                                    </button>
                                    <button type="button" data-action="showKanaStrokeModal" data-args='["日"]' class="px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/30 text-xs font-bold transition flex items-center gap-1 shadow-sm" title="Ver trazos de 日">
                                        <i class="fa-solid fa-paintbrush text-sky-400"></i> 日
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                            <!-- Reloj SVG -->
                            <div class="relative w-48 h-48 sm:w-56 sm:h-56">
                                <svg viewBox="0 0 200 200" class="w-full h-full drop-shadow-2xl">
                                    <!-- Esfera exterior -->
                                    <circle cx="100" cy="100" r="95" fill="#090d16" stroke="#38bdf8" stroke-width="4" stroke-opacity="0.5"/>
                                    <circle cx="100" cy="100" r="88" fill="#111a2e" stroke="#1e293b" stroke-width="2"/>

                                    <!-- Marcas de horas (12) -->
                                    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
                                        const angle = i * 30 * Math.PI / 180;
                                        const x1 = 100 + 76 * Math.sin(angle);
                                        const y1 = 100 - 76 * Math.cos(angle);
                                        const x2 = 100 + 84 * Math.sin(angle);
                                        const y2 = 100 - 84 * Math.cos(angle);
                                        const isMain = i % 3 === 0;
                                        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${isMain ? '#38bdf8' : '#64748b'}" stroke-width="${isMain ? '3' : '1.5'}"/>`;
                                    }).join('')}

                                    <!-- Números cardinales 12, 3, 6, 9 -->
                                    <text x="100" y="32" text-anchor="middle" font-family="monospace" font-weight="900" font-size="14" fill="#38bdf8">12</text>
                                    <text x="172" y="105" text-anchor="middle" font-family="monospace" font-weight="900" font-size="14" fill="#38bdf8">3</text>
                                    <text x="100" y="176" text-anchor="middle" font-family="monospace" font-weight="900" font-size="14" fill="#38bdf8">6</text>
                                    <text x="28" y="105" text-anchor="middle" font-family="monospace" font-weight="900" font-size="14" fill="#38bdf8">9</text>

                                    <!-- Manecilla de horas (horaria) -->
                                    <line id="svgClockHourHand" x1="100" y1="100" x2="100" y2="48" stroke="#f59e0b" stroke-width="5" stroke-linecap="round" transform="rotate(${hourAngle} 100 100)"/>

                                    <!-- Manecilla de minutos (minutero) -->
                                    <line id="svgClockMinuteHand" x1="100" y1="100" x2="100" y2="28" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" transform="rotate(${minAngle} 100 100)"/>

                                    <!-- Centro -->
                                    <circle cx="100" cy="100" r="5" fill="#f8fafc" stroke="#090d16" stroke-width="2"/>
                                </svg>
                            </div>

                            <!-- Controles de ajuste rápido -->
                            <div class="space-y-3.5 max-w-sm w-full">
                                <!-- Period Toggle (AM / PM) -->
                                <div class="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
                                    <button id="btnClockPeriodAM" type="button" data-action="setClockPeriod" data-args='["am"]' class="flex-1 py-2 rounded-xl text-xs font-bold transition ${p === 'am' ? 'bg-sky-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'}">
                                        午前 (AM)
                                    </button>
                                    <button id="btnClockPeriodPM" type="button" data-action="setClockPeriod" data-args='["pm"]' class="flex-1 py-2 rounded-xl text-xs font-bold transition ${p === 'pm' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'}">
                                        午後 (PM)
                                    </button>
                                </div>

                                <!-- Ajuste de horas -->
                                <div class="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">Hora:</span>
                                    <div class="flex items-center gap-2">
                                        <button type="button" data-action="adjustClockTime" data-args='[-1, 0]' class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center transition active:scale-90">-1h</button>
                                        <span id="clockHourDigits" class="w-12 text-center font-mono font-black text-lg text-amber-300">${h}</span>
                                        <button type="button" data-action="adjustClockTime" data-args='[1, 0]' class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center transition active:scale-90">+1h</button>
                                    </div>
                                </div>

                                <!-- Ajuste de minutos -->
                                <div class="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">Minutos:</span>
                                    <div class="flex items-center gap-1.5">
                                        <button type="button" data-action="adjustClockTime" data-args='[0, -5]' class="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition active:scale-90">-5m</button>
                                        <button type="button" data-action="adjustClockTime" data-args='[0, -1]' class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition active:scale-90">-1</button>
                                        <span id="clockMinuteDigits" class="w-10 text-center font-mono font-black text-lg text-sky-300">${String(m).padStart(2, '0')}</span>
                                        <button type="button" data-action="adjustClockTime" data-args='[0, 1]' class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition active:scale-90">+1</button>
                                        <button type="button" data-action="adjustClockTime" data-args='[0, 5]' class="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition active:scale-90">+5m</button>
                                    </div>
                                </div>

                                <!-- Presets Rápidos de Excepciones del Taller -->
                                <div class="pt-0.5 space-y-1.5">
                                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">Probar excepciones del taller:</span>
                                    <div class="flex flex-wrap gap-1.5">
                                        <button type="button" data-action="setClockPreset" data-args='[4, 0, "am"]' class="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-300 transition">4:00 AM (よじ)</button>
                                        <button type="button" data-action="setClockPreset" data-args='[7, 20, "am"]' class="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-sky-500/30 text-[11px] font-mono font-bold text-sky-300 transition">7:20 AM</button>
                                        <button type="button" data-action="setClockPreset" data-args='[9, 8, "am"]' class="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-300 transition">9:08 AM (くじ)</button>
                                        <button type="button" data-action="setClockPreset" data-args='[3, 30, "pm"]' class="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-300 transition">3:30 PM (半)</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Readout Dinámico con audio -->
                        <div id="clockLivePhraseContainer" class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                            ${buildClockPhraseHtml(phrase, isKanji)}
                        </div>
                    </div>

                    <!-- Pestañas de Tablas y Reglas de Estudio -->
                    <div class="space-y-3">
                        <div class="flex items-center gap-2 overflow-x-auto pb-1">
                            ${subTabsMeta.map(t => {
                                const isActive = t.id === sub;
                                return `
                                    <button type="button" data-action="setTimeGuideSubTab" data-args='["${t.id}"]'
                                        class="py-2 px-3.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${isActive ? 'stage-theme-pill font-black' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'}">
                                        <i class="fa-solid ${t.icon}"></i>
                                        <span>${t.label}</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>

                        ${subContentHtml}
                    </div>

                </div>
            `;
        }

        // ==========================================================
        // MODO 2: ARMAR EXPRESIÓN DE TIEMPO (LEGO CON DRAG & DROP)
        // ==========================================================
        let timeLegoDraggedIdx = null;

        function onTimeLegoDragStart(e, idx) {
            timeLegoDraggedIdx = idx;
            if (e.dataTransfer) {
                e.dataTransfer.setData('text/plain', String(idx));
                e.dataTransfer.effectAllowed = 'move';
            }
        }

        function onTimeLegoDragOver(e) {
            e.preventDefault();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = 'move';
            }
        }

        function onTimeLegoDrop(e, targetIdx) {
            e.preventDefault();
            if (timeLegoDraggedIdx === null || timeLegoDraggedIdx === targetIdx) return;
            const [chip] = state.timePlacedChips.splice(timeLegoDraggedIdx, 1);
            state.timePlacedChips.splice(targetIdx, 0, chip);
            timeLegoDraggedIdx = null;
            renderTimeBuilder();
        }

        function onTimeLegoDragEnd() {
            timeLegoDraggedIdx = null;
        }

        function moveTimeLegoChip(fromIdx, direction) {
            const toIdx = fromIdx + direction;
            if (toIdx < 0 || toIdx >= state.timePlacedChips.length) return;
            const [chip] = state.timePlacedChips.splice(fromIdx, 1);
            state.timePlacedChips.splice(toIdx, 0, chip);
            renderTimeBuilder();
        }

        function addTimeBuilderChip(chipId) {
            const idx = state.timeBankChips.findIndex(c => c.id === chipId);
            if (idx !== -1) {
                const [chip] = state.timeBankChips.splice(idx, 1);
                state.timePlacedChips.push(chip);
                renderTimeBuilder();
            }
        }

        function removeTimeBuilderChip(placedIdx) {
            if (placedIdx >= 0 && placedIdx < state.timePlacedChips.length) {
                const [chip] = state.timePlacedChips.splice(placedIdx, 1);
                state.timeBankChips.push(chip);
                renderTimeBuilder();
            }
        }

        function clearTimeBuilder() {
            while (state.timePlacedChips.length > 0) {
                const chip = state.timePlacedChips.pop();
                state.timeBankChips.push(chip);
            }
            renderTimeBuilder();
        }

        function generateTimeChallenge() {
            const roll = Math.random();
            const isKanji = state.timeConfig.scriptMode === 'kanji';

            if (roll < 0.45) {
                // Tipo 1: Hora con minutos (incluyendo mutaciones -pun del taller)
                const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                const minutes = [0, 1, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 45, 50];
                const h = hours[Math.floor(Math.random() * hours.length)];
                const m = minutes[Math.floor(Math.random() * minutes.length)];
                const p = Math.random() < 0.5 ? 'am' : 'pm';
                const phrase = formatTimePhrase(h, m, p);

                const correctBlocks = isKanji ? phrase.blocksKanji : phrase.blocksKana;
                const distractors = isKanji
                    ? ['午前', '午後', '四時', '七時', '九時', '半', '一分', '三分', '六分', '八分', '十分', '五分', '十五分', '二十分']
                    : ['ごぜん', 'ごご', 'よじ', 'しちじ', 'くじ', 'はん', 'いっぷん', 'さんぷん', 'ろっぷん', 'はっぷん', 'じゅっぷん', 'ごふん', 'しじ', 'きゅうじ'];

                return {
                    type: 'time',
                    promptTitle: `${p.toUpperCase()} ${h}:${String(m).padStart(2, '0')}`,
                    targetPhrase: phrase,
                    correctBlocks,
                    distractors,
                    targetAnswer: isKanji ? phrase.shortKanji : phrase.shortHira
                };
            } else if (roll < 0.75) {
                // Tipo 2: Mes y Día (ej. 14 de abril, 20 de julio)
                const month = TIME_MONTHS_DATA[Math.floor(Math.random() * TIME_MONTHS_DATA.length)];
                const day = TIME_DAYS_DATA[Math.floor(Math.random() * TIME_DAYS_DATA.length)];

                const targetAnswer = isKanji ? (month.kanji + day.kanji) : (month.hira + day.hira);
                const correctBlocks = isKanji ? [month.kanji, day.kanji] : [month.hira, day.hira];
                const distractors = isKanji
                    ? ['四月', '七月', '九月', '一日', '四日', '十四日', '二十日', '二十四日', '八日']
                    : ['しがつ', 'しちがつ', 'くがつ', 'ついたち', 'よっか', 'じゅうよっか', 'はつか', 'にじゅうよっか', 'ようか'];

                return {
                    type: 'date',
                    promptTitle: `${day.num} de ${month.nameEs} (Mes ${month.num}, Día ${day.num})`,
                    targetPhrase: {
                        kanji: month.kanji + day.kanji,
                        hiragana: month.hira + ' ' + day.hira,
                        romaji: month.romaji + ' ' + day.romaji
                    },
                    correctBlocks,
                    distractors,
                    targetAnswer
                };
            } else {
                // Tipo 3: Día de la semana y mes/día
                const weekday = TIME_WEEKDAYS_DATA[Math.floor(Math.random() * TIME_WEEKDAYS_DATA.length)];
                const day = [TIME_DAYS_DATA[0], TIME_DAYS_DATA[13], TIME_DAYS_DATA[19], TIME_DAYS_DATA[3]][Math.floor(Math.random() * 4)];

                const targetAnswer = isKanji ? (day.kanji + weekday.kanji) : (day.hira + weekday.hira);
                const correctBlocks = isKanji ? [day.kanji, weekday.kanji] : [day.hira, weekday.hira];
                const distractors = isKanji
                    ? ['月曜日', '火曜日', '水曜日', '金曜日', '一日', '四日', '十四日', '二十日']
                    : ['げつようび', 'かようび', 'すいようび', 'きんようび', 'ついたち', 'よっか', 'じゅうよっか', 'はつか'];

                return {
                    type: 'weekday_date',
                    promptTitle: `${weekday.day}, Día ${day.num}`,
                    targetPhrase: {
                        kanji: day.kanji + ' ' + weekday.kanji,
                        hiragana: day.hira + ' ' + weekday.hira,
                        romaji: day.romaji + ' ' + weekday.romaji
                    },
                    correctBlocks,
                    distractors,
                    targetAnswer
                };
            }
        }

        function nextTimeBuilderChallenge() {
            const ch = generateTimeChallenge();
            state.timeCurrentChallenge = ch;
            state.timePlacedChips = [];

            const pool = ch.correctBlocks.map((b, idx) => ({ id: 'c_' + idx + '_' + Math.random().toString(36).substring(2, 6), text: b }));
            const addedDistractors = new Set();
            for (const d of ch.distractors) {
                if (!ch.correctBlocks.includes(d) && !addedDistractors.has(d) && addedDistractors.size < 4) {
                    addedDistractors.add(d);
                    pool.push({ id: 'd_' + addedDistractors.size + '_' + Math.random().toString(36).substring(2, 6), text: d });
                }
            }

            // Shuffle pool
            for (let j = pool.length - 1; j > 0; j--) {
                const k = Math.floor(Math.random() * (j + 1));
                [pool[j], pool[k]] = [pool[k], pool[j]];
            }

            state.timeBankChips = pool;
            renderTimeBuilder();
        }

        function checkTimeBuilder() {
            const ch = state.timeCurrentChallenge;
            if (!ch || state.timePlacedChips.length === 0) return;

            const assembled = state.timePlacedChips.map(c => c.text).join('');
            const isCorrect = (assembled === ch.targetAnswer);

            if (isCorrect) {
                state.timeConfig.streak = (state.timeConfig.streak || 0) + 1;
                state.timeConfig.score = (state.timeConfig.score || 0) + 1;
                addXP(10);
                saveStateToStorage();
                updateTimeHeaderStats();
                speakJapanese(ch.targetPhrase.hiragana);
                renderTimeBuilder({ isCorrect: true });
            } else {
                state.timeConfig.streak = 0;
                saveStateToStorage();
                updateTimeHeaderStats();
                renderTimeBuilder({ isCorrect: false });
            }
        }

        function renderTimeBuilder(feedback) {
            const container = document.getElementById('timeWorkspaceContainer');
            if (!container) return;

            const ch = state.timeCurrentChallenge;
            if (!ch) return;

            const isKanji = state.timeConfig.scriptMode === 'kanji';

            const placedChipsHtml = state.timePlacedChips.length === 0
                ? `<div class="w-full text-center py-4 text-xs sm:text-sm text-slate-500 italic select-none">
                    <i class="fa-solid fa-hand-pointer mr-1"></i> Toca las fichas de abajo para construir la expresión temporal. Puedes arrastrarlas o moverlas con las flechas si te equivocas.
                   </div>`
                : state.timePlacedChips.map((chip, idx) => `
                    <div draggable="true"
                        data-dragstart="onTimeLegoDragStart"
                        data-dragover="onTimeLegoDragOver"
                        data-drop="onTimeLegoDrop"
                        data-dragend="onTimeLegoDragEnd" data-args='["$event", ${idx}]'
                        class="px-2.5 sm:px-3.5 py-2 rounded-2xl bg-sky-500 text-slate-950 font-jp font-black shadow-lg shadow-sky-500/20 flex items-center gap-1.5 cursor-grab active:cursor-grabbing hover:bg-sky-400 transition animate-card-pop select-none border border-sky-300/40">
                        <button type="button" data-action="moveTimeLegoChip" data-args='[${idx}, -1]' ${idx === 0 ? 'disabled class="opacity-20 pointer-events-none p-1"' : 'class="p-1 text-slate-900 hover:text-black transition"'} title="Mover izquierda">
                            <i class="fa-solid fa-arrow-left text-xs"></i>
                        </button>
                        <span class="text-base sm:text-lg font-bold px-1">${chip.text}</span>
                        <button type="button" data-action="moveTimeLegoChip" data-args='[${idx}, 1]' ${idx === state.timePlacedChips.length - 1 ? 'disabled class="opacity-20 pointer-events-none p-1"' : 'class="p-1 text-slate-900 hover:text-black transition"'} title="Mover derecha">
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </button>
                        <button type="button" data-action="removeTimeBuilderChip" data-args='[${idx}]' title="Regresar al banco sin borrar el resto"
                            class="w-6 h-6 rounded-lg bg-slate-950/20 hover:bg-rose-600 hover:text-white text-slate-950 flex items-center justify-center transition ml-1 text-xs">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                `).join('');

            const bankChipsHtml = state.timeBankChips.map((chip) => `
                <button type="button" data-action="addTimeBuilderChip" data-args='["${chip.id}"]'
                    class="px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700/80 hover:border-sky-400 text-slate-100 font-jp text-lg sm:text-xl font-bold shadow-md hover:bg-slate-800 hover:scale-105 active:scale-95 transition">
                    ${chip.text}
                </button>
            `).join('');

            let feedbackHtml = '';
            if (feedback) {
                if (feedback.isCorrect) {
                    feedbackHtml = `
                        <div class="p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-200 space-y-2 animate-card-pop">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i>
                                    <span class="font-bold text-base text-white">¡Correcto! Expresión temporal construida</span>
                                </div>
                                <button type="button" data-action="speakJapanese" data-args='["${ch.targetPhrase.hiragana}"]' class="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 font-bold text-xs flex items-center gap-1.5 transition">
                                    <i class="fa-solid fa-volume-high"></i> Escuchar
                                </button>
                            </div>
                            <div class="text-sm font-jp text-white font-bold tracking-wide">
                                ${ch.targetPhrase.kanji} <span class="text-xs text-amber-300 font-normal">(${ch.targetPhrase.hiragana})</span>
                            </div>
                            <div class="pt-2">
                                <button type="button" data-action="nextTimeBuilderChallenge" class="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
                                    <span>Siguiente Desafío</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    `;
                } else {
                    feedbackHtml = `
                        <div class="p-4 rounded-2xl bg-rose-500/15 border-2 border-rose-500/40 text-rose-200 space-y-2 animate-shake">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-circle-xmark text-rose-400 text-xl"></i>
                                <span class="font-bold text-base text-white">Aún no coincide</span>
                            </div>
                            <p class="text-xs text-rose-300">
                                Revisa el orden jerárquico: ${ch.type === 'time' ? '(AM/PM → Hora → Minuto)' : (ch.type === 'date' ? '(Mes → Día)' : '(Día del mes → Día de la semana)')}.
                            </p>
                            <div class="flex gap-2 pt-1">
                                <button type="button" data-action="clearTimeBuilder" class="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition">
                                    <i class="fa-solid fa-rotate-left mr-1"></i> Limpiar Todo
                                </button>
                                <button type="button" data-action="speakJapanese" data-args='["${ch.targetPhrase.hiragana}"]' class="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition">
                                    <i class="fa-solid fa-volume-high mr-1"></i> Pista de Audio
                                </button>
                            </div>
                        </div>
                    `;
                }
            }

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
                    
                    <!-- Script Mode Header -->
                    <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3 flex-wrap">
                        <div class="flex items-center gap-2 text-xs text-slate-300">
                            <span class="font-bold uppercase tracking-wider text-slate-400">Escritura de Fichas:</span>
                            <button type="button" data-action="toggleTimeScriptMode"
                                class="px-3 py-1 rounded-full text-xs font-bold border transition flex items-center gap-1.5 ${isKanji ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'}">
                                <i class="fa-solid fa-arrows-rotate text-[10px]"></i>
                                <span>${isKanji ? '漢 Kanji (四時, 十四日...)' : 'あ Kanas (よじ, じゅうよっか...)'}</span>
                            </button>
                        </div>
                        <span class="text-[11px] text-slate-400 flex items-center gap-1">
                            <i class="fa-solid fa-arrows-left-right text-sky-400"></i> Fichas reordenables y móviles
                        </span>
                    </div>

                    <!-- Prompt Target Banner -->
                    <div class="text-center space-y-2">
                        <span class="text-xs uppercase font-bold text-slate-400 tracking-widest block">
                            Construye en ${isKanji ? 'Kanji' : 'Hiragana'} la Expresión:
                        </span>
                        <div class="inline-flex items-center justify-center gap-3">
                            <h3 class="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight bg-slate-950 px-6 py-2 rounded-2xl border border-slate-800 shadow-inner">
                                ${ch.promptTitle}
                            </h3>
                            <button type="button" data-action="speakJapanese" data-args='["${ch.targetPhrase.hiragana}"]' title="Escuchar pista"
                                class="w-12 h-12 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-400 flex items-center justify-center transition active:scale-90 shadow-md">
                                <i class="fa-solid fa-volume-high text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Placed Chips Construction Area -->
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-xs text-slate-400 px-1">
                            <span class="font-bold flex items-center gap-1.5">
                                <i class="fa-solid fa-cubes-stacked text-sky-400"></i> Tu Construcción (arrastra o usa flechas para mover):
                            </span>
                            ${state.timePlacedChips.length > 0 ? `
                                <button type="button" data-action="clearTimeBuilder" class="text-rose-400 hover:text-rose-300 font-bold transition text-xs">
                                    <i class="fa-solid fa-trash-can mr-1"></i> Limpiar Todo
                                </button>
                            ` : ''}
                        </div>
                        <div id="timeLegoPlacedArea" class="min-h-[80px] p-3.5 rounded-2xl bg-slate-950 border-2 border-dashed ${state.timePlacedChips.length > 0 ? 'border-sky-500/60' : 'border-slate-800'} flex flex-wrap items-center gap-2.5 transition">
                            ${placedChipsHtml}
                        </div>
                    </div>

                    <!-- Action Controls -->
                    <div class="flex gap-3">
                        <button type="button" data-action="checkTimeBuilder" ${state.timePlacedChips.length === 0 ? 'disabled' : ''}
                            class="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-sky-500/20 active:scale-98 transition flex items-center justify-center gap-2">
                            <i class="fa-solid fa-check"></i>
                            <span>Comprobar Respuesta</span>
                        </button>
                    </div>

                    <!-- Feedback Display -->
                    ${feedbackHtml}

                    <!-- Bank of Chips Area -->
                    <div class="space-y-2 pt-2 border-t border-slate-800">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
                            Banco de Fichas (Selecciona cada parte):
                        </span>
                        <div id="timeLegoBankArea" class="flex flex-wrap justify-center gap-2.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                            ${bankChipsHtml.length > 0 ? bankChipsHtml : '<span class="text-xs text-slate-500">Todas las fichas han sido colocadas.</span>'}
                        </div>
                    </div>

                </div>
            `;
        }

        // ==========================================================
        // MODO 3: DICTADO AUDITIVO DE HORAS Y FECHAS
        // ==========================================================
        function nextTimeListeningChallenge() {
            const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const minutes = [0, 1, 3, 4, 5, 6, 8, 10, 13, 15, 17, 20, 30, 40, 45, 50];
            const h = hours[Math.floor(Math.random() * hours.length)];
            const m = minutes[Math.floor(Math.random() * minutes.length)];
            const p = Math.random() < 0.5 ? 'am' : 'pm';

            const correctPhrase = formatTimePhrase(h, m, p);

            // Generar 3 opciones distractoras
            const options = [{ text: `${p.toUpperCase()} ${h}:${String(m).padStart(2, '0')}`, phrase: correctPhrase, isCorrect: true }];
            const usedTimes = new Set([`${p}-${h}-${m}`]);

            while (options.length < 4) {
                const dh = hours[Math.floor(Math.random() * hours.length)];
                const dm = minutes[Math.floor(Math.random() * minutes.length)];
                const dp = Math.random() < 0.5 ? 'am' : 'pm';
                const key = `${dp}-${dh}-${dm}`;
                if (!usedTimes.has(key)) {
                    usedTimes.add(key);
                    const dPhrase = formatTimePhrase(dh, dm, dp);
                    options.push({ text: `${dp.toUpperCase()} ${dh}:${String(dm).padStart(2, '0')}`, phrase: dPhrase, isCorrect: false });
                }
            }

            // Shuffle
            for (let j = options.length - 1; j > 0; j--) {
                const k = Math.floor(Math.random() * (j + 1));
                [options[j], options[k]] = [options[k], options[j]];
            }

            state.timeListeningChallenge = {
                correctPhrase,
                options
            };

            renderTimeListening();
            setTimeout(() => {
                speakJapanese(correctPhrase.hiragana);
            }, 300);
        }

        function checkTimeListening(selectedIndex) {
            const ch = state.timeListeningChallenge;
            if (!ch) return;

            const selected = ch.options[selectedIndex];
            if (selected.isCorrect) {
                state.timeConfig.streak = (state.timeConfig.streak || 0) + 1;
                state.timeConfig.score = (state.timeConfig.score || 0) + 1;
                addXP(10);
                saveStateToStorage();
                updateTimeHeaderStats();
                renderTimeListening({ isCorrect: true, selectedIndex });
            } else {
                state.timeConfig.streak = 0;
                saveStateToStorage();
                updateTimeHeaderStats();
                renderTimeListening({ isCorrect: false, selectedIndex });
            }
        }

        function renderTimeListening(feedback) {
            const container = document.getElementById('timeWorkspaceContainer');
            if (!container) return;

            const ch = state.timeListeningChallenge;
            if (!ch) return;

            const optionsHtml = ch.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950 border-2 border-slate-800 hover:border-sky-400 text-slate-100 hover:bg-slate-800';
                if (feedback) {
                    if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-600/30 border-2 border-emerald-500 text-emerald-200 font-black shadow-lg shadow-emerald-500/20';
                    } else if (feedback.selectedIndex === idx) {
                        btnStyle = 'bg-rose-600/30 border-2 border-rose-500 text-rose-200 font-bold';
                    } else {
                        btnStyle = 'bg-slate-950/40 border-2 border-slate-900 text-slate-500 opacity-50';
                    }
                }

                return `
                    <button type="button" data-action="checkTimeListening" data-args='[${idx}]' ${feedback ? 'disabled' : ''}
                        class="p-4 sm:p-5 rounded-2xl text-left font-mono text-xl sm:text-2xl font-bold transition flex items-center justify-between gap-3 ${btnStyle} active:scale-98">
                        <span class="flex-1">${opt.text}</span>
                        <span class="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                            ${idx + 1}
                        </span>
                    </button>
                `;
            }).join('');

            let feedbackBannerHtml = '';
            if (feedback) {
                if (feedback.isCorrect) {
                    feedbackBannerHtml = `
                        <div class="p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-200 space-y-2 animate-card-pop">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i>
                                    <span class="font-bold text-base text-white">¡Oído de maestro! Respuesta correcta</span>
                                </div>
                                <button type="button" data-action="speakJapanese" data-args='["${ch.correctPhrase.hiragana}"]' class="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition flex items-center gap-1.5">
                                    <i class="fa-solid fa-volume-high"></i> Repetir
                                </button>
                            </div>
                            <div class="text-sm font-jp text-white">
                                ${ch.correctPhrase.kanji} → <span class="text-amber-300 font-bold">${ch.correctPhrase.hiragana}</span> (${ch.correctPhrase.romaji})
                            </div>
                            <div class="pt-2">
                                <button type="button" data-action="nextTimeListeningChallenge" class="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
                                    <span>Siguiente Audio</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    `;
                } else {
                    feedbackBannerHtml = `
                        <div class="p-4 rounded-2xl bg-rose-500/15 border-2 border-rose-500/40 text-rose-200 space-y-2 animate-shake">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-circle-xmark text-rose-400 text-xl"></i>
                                <span class="font-bold text-base text-white">Respuesta incorrecta</span>
                            </div>
                            <div class="text-xs text-rose-300">
                                La hora dictada era <strong class="text-white font-jp text-sm">${ch.correctPhrase.kanji}</strong> (${ch.correctPhrase.hiragana}).
                            </div>
                            <div class="flex gap-2 pt-1">
                                <button type="button" data-action="speakJapanese" data-args='["${ch.correctPhrase.hiragana}"]' class="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition">
                                    <i class="fa-solid fa-volume-high mr-1"></i> Repetir Audio
                                </button>
                                <button type="button" data-action="nextTimeListeningChallenge" class="py-2 px-4 rounded-xl bg-rose-600/40 hover:bg-rose-600/60 border border-rose-500/40 text-white text-xs font-bold transition">
                                    Continuar
                                </button>
                            </div>
                        </div>
                    `;
                }
            }

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
                    <div class="text-center space-y-3">
                        <span class="text-xs uppercase font-bold text-slate-400 tracking-widest block">Dictado de Hora Auditivo:</span>
                        <div class="inline-flex items-center justify-center">
                            <button type="button" data-action="speakJapanese" data-args='["${ch.correctPhrase.hiragana}"]'
                                class="py-4 px-8 rounded-3xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-sky-500/20 active:scale-95 transition flex items-center gap-3">
                                <i class="fa-solid fa-volume-high text-xl"></i>
                                <span>Toca para Escuchar de Nuevo</span>
                            </button>
                        </div>
                        <p class="text-xs text-slate-400">Escucha con atención y selecciona qué hora representa la expresión japonesa (teclas <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">1</kbd>–<kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">4</kbd>):</p>
                    </div>

                    <div id="timeListeningOptionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        ${optionsHtml}
                    </div>

                    ${feedbackBannerHtml}
                </div>
            `;
        }

        // ==========================================================
        // MODO 4: QUIZ RÁPIDO DE REGLAS Y EXCEPCIONES
        // ==========================================================
        const TIME_QUIZ_BANK = [
            {
                q: '¿Cómo se dice exactamente 4:00 (las 4 en punto) en japonés?',
                options: ['よじ (yoji)', 'しじ (shiji)', 'よんじ (yonji)', 'よんじかん (yonjikan)'],
                correct: 0,
                explanation: 'Las 4:00 es una excepción estricta: siempre se dice よじ (yoji). Decir shiji o yonji es un error grave.'
            },
            {
                q: '¿Cómo se dice 7:00 (las 7 en punto) de forma habitual?',
                options: ['しちじ (shichiji)', 'ななじ (nanaji)', 'しちじかん (shichijikan)', 'ななじかん (nanajikan)'],
                correct: 0,
                explanation: 'Para la hora 7:00, la forma estándar y preferida en Japón es しちじ (shichiji).'
            },
            {
                q: '¿Cómo se dice 9:00 (las 9 en punto)?',
                options: ['くじ (kuji)', 'きゅうじ (kyuuji)', 'くうじ (kuuji)', 'ここじ (kokoji)'],
                correct: 0,
                explanation: 'Las 9:00 es una excepción obligatoria: siempre se dice くじ (kuji). ¡Nunca kyuuji!'
            },
            {
                q: '¿Cómo se dice 1 minuto en japonés?',
                options: ['いっぷん (ippun)', 'いちふん (ichifun)', 'いちぷん (ichipun)', 'いふん (ifun)'],
                correct: 0,
                explanation: '1 minuto sufre sokuon y muta a -pun: いっぷん (ippun).'
            },
            {
                q: '¿Cómo se dice 6 minutos?',
                options: ['ろっぷん (roppun)', 'ろくふん (rokufun)', 'ろくぷん (rokupun)', 'ろふん (rofun)'],
                correct: 0,
                explanation: '6 minutos sufre sokuon y muta a -pun: ろっぷん (roppun).'
            },
            {
                q: '¿Cómo se dice 8 minutos?',
                options: ['はっぷん (happun)', 'はちふん (hachifun)', 'はちぷん (hachipun)', 'はふん (hafun)'],
                correct: 0,
                explanation: '8 minutos es はっぷん (happun), aunque en lenguaje coloquial a veces se escucha hachifun, happun es la forma estándar.'
            },
            {
                q: '¿Cómo se expresa "y media" para las horas (ej: 3:30)?',
                options: ['半 / はん (han)', '中 / なか (naka)', '間 / あいだ (aida)', '分 / ぷん (pun)'],
                correct: 0,
                explanation: 'Se usa 半 (はん - han), por ejemplo: 三時半 (さんじはん = 3:30).'
            },
            {
                q: '¿Qué significa 午前 (ごぜん - gozen) y dónde se coloca?',
                options: ['a.m. (mañana) y se coloca ANTES de la hora', 'p.m. (tarde) y se coloca DESPUÉS de la hora', 'Mediodía exacto', 'Madrugada'],
                correct: 0,
                explanation: '午前 (gozen) significa a.m. y siempre va antes de la hora (ej: 午前八時 = 8:00 a.m.).'
            },
            {
                q: '¿Cómo se dice Abril (mes 4)?',
                options: ['しがつ (shigatsu)', 'よんがつ (yongatsu)', 'よがつ (yogatsu)', 'しげつ (shigetsu)'],
                correct: 0,
                explanation: 'Abril es una excepción estricta: しがつ (shigatsu). ¡Nunca yongatsu!'
            },
            {
                q: '¿Cómo se dice Septiembre (mes 9)?',
                options: ['くがつ (kugatsu)', 'きゅうがつ (kyuugatsu)', 'ここのがつ (kokonogatsu)', 'きゅがつ (kyugatsu)'],
                correct: 0,
                explanation: 'Septiembre es una excepción estricta: くがつ (kugatsu). ¡Nunca kyuugatsu!'
            },
            {
                q: '¿Cómo se dice el día 1 del mes (primer día)?',
                options: ['ついたち (tsuitachi)', 'いちにち (ichinichi)', 'ひとは (hitoha)', 'ひとつひ (hitotsuhi)'],
                correct: 0,
                explanation: 'El primer día del mes se dice ついたち (tsuitachi). Ichinichi significa duración de 1 día, no la fecha.'
            },
            {
                q: '¿Cómo se dice el día 14 del mes?',
                options: ['じゅうよっか (juuyokka)', 'じゅうよんにち (juuyonnichi)', 'じゅうしにち (juushinichi)', 'とおよっか (tooyokka)'],
                correct: 0,
                explanation: 'El día 14 es irregular: じゅうよっか (juuyokka). Al igual que el día 4 (よっか) y el 24 (にじゅうよっか).'
            },
            {
                q: '¿Cómo se dice el día 20 del mes?',
                options: ['はつか (hatsuka)', 'にじゅうにち (nijuunichi)', 'にじゅうよっか (nijuuyokka)', 'ふつか (futsuka)'],
                correct: 0,
                explanation: 'El día 20 tiene una lectura tradicional única: はつか (hatsuka).'
            },
            {
                q: '¿Qué partícula indica la hora exacta en que ocurre una acción (ej: 7時に おきます)?',
                options: ['に (ni)', 'を (o)', 'で (de)', 'は (wa)'],
                correct: 0,
                explanation: 'Con horas específicas y verbos de acción (おきます, ねます, おわります...) se usa siempre la partícula に (ni).'
            },
            {
                q: '¿Qué par de partículas expresa un rango horario "desde ... hasta ..." (ej: 9時から 5時まで)?',
                options: ['から ... まで (kara ... made)', 'に ... へ (ni ... e)', 'と ... や (to ... ya)', 'で ... に (de ... ni)'],
                correct: 0,
                explanation: 'から (kara) marca el inicio ("desde") y まで (made) marca el final ("hasta").'
            },
            {
                q: '¿Qué significa la oración del taller "わたしは しちじに おきます"?',
                options: ['Me levanto a las 7:00', 'Me acuesto a las 7:00', 'Trabajo hasta las 7:00', 'Estudio a las 4:00'],
                correct: 0,
                explanation: 'しちじ (shichiji) = 7:00, に = a las, おきます (okimasu) = levantarse.'
            }
        ];

        function nextTimeQuizChallenge() {
            const q = TIME_QUIZ_BANK[Math.floor(Math.random() * TIME_QUIZ_BANK.length)];
            // Copiar opciones y shuffle
            const options = q.options.map((opt, idx) => ({ text: opt, isCorrect: idx === q.correct }));
            for (let j = options.length - 1; j > 0; j--) {
                const k = Math.floor(Math.random() * (j + 1));
                [options[j], options[k]] = [options[k], options[j]];
            }

            state.timeQuizChallenge = {
                q: q.q,
                explanation: q.explanation,
                options
            };

            renderTimeQuiz();
        }

        function checkTimeQuiz(selectedIndex) {
            const ch = state.timeQuizChallenge;
            if (!ch) return;

            const selected = ch.options[selectedIndex];
            if (selected.isCorrect) {
                state.timeConfig.streak = (state.timeConfig.streak || 0) + 1;
                state.timeConfig.score = (state.timeConfig.score || 0) + 1;
                addXP(10);
                saveStateToStorage();
                updateTimeHeaderStats();
                renderTimeQuiz({ isCorrect: true, selectedIndex });
            } else {
                state.timeConfig.streak = 0;
                saveStateToStorage();
                updateTimeHeaderStats();
                renderTimeQuiz({ isCorrect: false, selectedIndex });
            }
        }

        function renderTimeQuiz(feedback) {
            const container = document.getElementById('timeWorkspaceContainer');
            if (!container) return;

            const ch = state.timeQuizChallenge;
            if (!ch) return;

            const optionsHtml = ch.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950 border-2 border-slate-800 hover:border-sky-400 text-slate-100 hover:bg-slate-800';
                if (feedback) {
                    if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-600/30 border-2 border-emerald-500 text-emerald-200 font-black shadow-lg shadow-emerald-500/20';
                    } else if (feedback.selectedIndex === idx) {
                        btnStyle = 'bg-rose-600/30 border-2 border-rose-500 text-rose-200 font-bold';
                    } else {
                        btnStyle = 'bg-slate-950/40 border-2 border-slate-900 text-slate-500 opacity-50';
                    }
                }

                return `
                    <button type="button" data-action="checkTimeQuiz" data-args='[${idx}]' ${feedback ? 'disabled' : ''}
                        class="p-4 sm:p-5 rounded-2xl text-left font-jp text-base sm:text-lg font-bold transition flex items-center justify-between gap-3 ${btnStyle} active:scale-98">
                        <span class="flex-1">${opt.text}</span>
                        <span class="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                            ${idx + 1}
                        </span>
                    </button>
                `;
            }).join('');

            let feedbackBannerHtml = '';
            if (feedback) {
                if (feedback.isCorrect) {
                    feedbackBannerHtml = `
                        <div class="p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-200 space-y-2 animate-card-pop">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i>
                                <span class="font-bold text-base text-white">¡Excelente! Regla dominada</span>
                            </div>
                            <p class="text-xs text-slate-200">${ch.explanation}</p>
                            <div class="pt-2">
                                <button type="button" data-action="nextTimeQuizChallenge" class="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
                                    <span>Siguiente Pregunta</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    `;
                } else {
                    feedbackBannerHtml = `
                        <div class="p-4 rounded-2xl bg-rose-500/15 border-2 border-rose-500/40 text-rose-200 space-y-2 animate-shake">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-circle-xmark text-rose-400 text-xl"></i>
                                <span class="font-bold text-base text-white">Aún no</span>
                            </div>
                            <p class="text-xs text-rose-300">${ch.explanation}</p>
                            <div class="pt-2">
                                <button type="button" data-action="nextTimeQuizChallenge" class="py-2.5 px-5 rounded-xl bg-rose-600/40 hover:bg-rose-600/60 border border-rose-500/40 text-white text-xs font-bold transition">
                                    Continuar
                                </button>
                            </div>
                        </div>
                    `;
                }
            }

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
                    <div class="space-y-2">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                            <i class="fa-solid fa-bolt text-rose-400"></i> Desafío de Reglas Fonéticas del Taller
                        </span>
                        <h3 class="text-lg sm:text-xl font-black text-white leading-snug">
                            ${ch.q}
                        </h3>
                    </div>

                    <div id="timeQuizOptionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        ${optionsHtml}
                    </div>

                    ${feedbackBannerHtml}
                </div>
            `;
        }
