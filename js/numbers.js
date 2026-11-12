// KotoDojo · Taller de números
        // ==========================================================
        // TALLER DE NÚMEROS EN JAPONÉS (0 - 999 & AVANZADO)
        // ==========================================================

                const DIGIT_KANJI = {
            0: '零', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五',
            6: '六', 7: '七', 8: '八', 9: '九', 10: '十'
        };

        function numberToKanji(n, isInsideMan = false) {
            if (typeof n !== 'number' || isNaN(n) || n < 0) return { kanji: '', blocks: [] };
            const originalN = Math.floor(n);
            if (originalN === 0) return { kanji: '零', blocks: ['零'] };

            let kanjiParts = [];
            let blocks = [];
            let rem = originalN;

            // 万 (10.000)
            if (rem >= 10000) {
                const manCount = Math.floor(rem / 10000);
                const sub = numberToKanji(manCount, true);
                kanjiParts.push(sub.kanji + '万');
                blocks.push(...sub.blocks, '万');
                rem %= 10000;
            }

            // 千 (1.000) — delante de 万 (ej: 10.000.000 = 一千万, 14.703.280 = 一千四百七十万...) se escribe 一千
            if (rem >= 1000) {
                const senCount = Math.floor(rem / 1000);
                if (senCount === 1 && !isInsideMan) {
                    kanjiParts.push('千');
                    blocks.push('千');
                } else {
                    kanjiParts.push(DIGIT_KANJI[senCount] + '千');
                    blocks.push(DIGIT_KANJI[senCount], '千');
                }
                rem %= 1000;
            }

            // 百 (100)
            if (rem >= 100) {
                const hyakuCount = Math.floor(rem / 100);
                if (hyakuCount === 1) {
                    kanjiParts.push('百');
                    blocks.push('百');
                } else {
                    kanjiParts.push(DIGIT_KANJI[hyakuCount] + '百');
                    blocks.push(DIGIT_KANJI[hyakuCount], '百');
                }
                rem %= 100;
            }

            // 十 (10)
            if (rem >= 10) {
                const juuCount = Math.floor(rem / 10);
                if (juuCount === 1) {
                    kanjiParts.push('十');
                    blocks.push('十');
                } else {
                    kanjiParts.push(DIGIT_KANJI[juuCount] + '十');
                    blocks.push(DIGIT_KANJI[juuCount], '十');
                }
                rem %= 10;
            }

            // Unidades 1..9
            if (rem > 0) {
                kanjiParts.push(DIGIT_KANJI[rem]);
                blocks.push(DIGIT_KANJI[rem]);
            }

            return {
                kanji: kanjiParts.join(''),
                blocks: blocks
            };
        }

const DIGIT_HIRAGANA = {
            0: { hira: 'ぜろ', romaji: 'zero', alt: 'れい' },
            1: { hira: 'いち', romaji: 'ichi' },
            2: { hira: 'に', romaji: 'ni' },
            3: { hira: 'さん', romaji: 'san' },
            4: { hira: 'よん', romaji: 'yon', alt: 'し' },
            5: { hira: 'ご', romaji: 'go' },
            6: { hira: 'ろく', romaji: 'roku' },
            7: { hira: 'なな', romaji: 'nana', alt: 'しち' },
            8: { hira: 'はち', romaji: 'hachi' },
            9: { hira: 'きゅう', romaji: 'kyuu', alt: 'く' },
            10: { hira: 'じゅう', romaji: 'juu' }
        };

        const HUNDREDS_DATA = {
            1: { hira: 'ひゃく', romaji: 'hyaku', blocks: ['ひゃく'] },
            2: { hira: 'にひゃく', romaji: 'nihyaku', blocks: ['に', 'ひゃく'] },
            3: { hira: 'さんびゃく', romaji: 'sanbyaku', blocks: ['さん', 'びゃく'], mutation: 'びゃく (Mutación sonora / Dakuon: h → b)' },
            4: { hira: 'よんひゃく', romaji: 'yonhyaku', blocks: ['よん', 'ひゃく'] },
            5: { hira: 'ごひゃく', romaji: 'gohyaku', blocks: ['ご', 'ひゃく'] },
            6: { hira: 'ろっぴゃく', romaji: 'roppyaku', blocks: ['ろっ', 'ぴゃく'], mutation: 'ろっ + ぴゃく (Sokuon + Handakuon: ku → pequeño tsu + p)' },
            7: { hira: 'ななひゃく', romaji: 'nanahyaku', blocks: ['なな', 'ひゃく'] },
            8: { hira: 'はっぴゃく', romaji: 'happyaku', blocks: ['はっ', 'ぴゃく'], mutation: 'はっ + ぴゃく (Sokuon + Handakuon: chi → pequeño tsu + p)' },
            9: { hira: 'きゅうひゃく', romaji: 'kyuuhyaku', blocks: ['きゅう', 'ひゃく'] }
        };

        const THOUSANDS_DATA = {
            1: { hira: 'せん', romaji: 'sen', blocks: ['せん'] },
            2: { hira: 'にせん', romaji: 'nisen', blocks: ['に', 'せん'] },
            3: { hira: 'さんぜん', romaji: 'sanzen', blocks: ['さん', 'ぜん'], mutation: 'ぜん (Mutación sonora / Dakuon: s → z)' },
            4: { hira: 'よんせん', romaji: 'yonsen', blocks: ['よん', 'せん'] },
            5: { hira: 'ごせん', romaji: 'gosen', blocks: ['ご', 'せん'] },
            6: { hira: 'ろくせん', romaji: 'rokusen', blocks: ['ろく', 'せん'] },
            7: { hira: 'ななせん', romaji: 'nanasen', blocks: ['なな', 'せん'] },
            8: { hira: 'はっせん', romaji: 'hassen', blocks: ['はっ', 'せん'], mutation: 'はっ + せん (Sokuon: chi → pequeño tsu)' },
            9: { hira: 'きゅうせん', romaji: 'kyuusen', blocks: ['きゅう', 'せん'] }
        };

        // Formats a number with 4-digit grouping used in Japanese (myriads: 万)
        function formatJapaneseBlocksOf4(n) {
            const s = String(Math.floor(n));
            if (s.length <= 4) return s;
            const rem = s.length % 4;
            const first = rem === 0 ? '' : s.slice(0, rem);
            const rest = s.slice(rem);
            const parts = rest.match(/.{4}/g) || [];
            if (first) parts.unshift(first);
            return parts.join(',');
        }

        function numberToJapanese(n, isInsideMan = false) {
            if (typeof n !== 'number' || isNaN(n) || n < 0 || n > 99999999) {
                return { hiragana: '', romaji: '', blocks: [], hasMutation: false, mutationInfo: null, breakdown: [], blocksOf4: '' };
            }

            const originalN = Math.floor(n);
            n = originalN;

            if (n === 0) {
                return {
                    hiragana: 'ぜろ',
                    romaji: 'zero',
                    kanji: '零',
                    kanjiBlocks: ['零'],
                    blocks: ['ぜろ'],
                    hasMutation: false,
                    mutationInfo: null,
                    breakdown: [{ val: 0, text: '0 = ぜろ (zero / れい rei) [Kanji: 零]' }],
                    blocksOf4: '0'
                };
            }

            if (n <= 10 && !isInsideMan) {
                const item = DIGIT_HIRAGANA[n];
                const kanjiChar = DIGIT_KANJI[n] || '';
                let note = n + ' = ' + item.hira + ' (' + item.romaji + ')';
                if (item.alt) note += ' [Lectura alternativa: ' + item.alt + ']';
                note += ' [Kanji: ' + kanjiChar + ']';
                return {
                    hiragana: item.hira,
                    romaji: item.romaji,
                    kanji: kanjiChar,
                    kanjiBlocks: [kanjiChar],
                    blocks: [item.hira],
                    hasMutation: false,
                    mutationInfo: null,
                    breakdown: [{ val: n, text: note }],
                    blocksOf4: String(n)
                };
            }

            let hiraParts = [];
            let romajiParts = [];
            let blocks = [];
            let mutations = [];
            let breakdown = [];

            // 10,000s (万 - Man: Bloques de 4 ceros / Myriads)
            if (n >= 10000) {
                const manCount = Math.floor(n / 10000);
                const rem = n % 10000;
                
                const manSub = numberToJapanese(manCount, true);
                if (manSub.hasMutation && manSub.mutationInfo) {
                    mutations.push(manSub.mutationInfo);
                }
                
                hiraParts.push(manSub.hiragana + 'まん');
                romajiParts.push(manSub.romaji + 'man');
                blocks.push(...manSub.blocks, 'まん');
                
                const b4 = formatJapaneseBlocksOf4(manCount * 10000);
                breakdown.push({ 
                    val: manCount * 10000, 
                    text: `${(manCount * 10000).toLocaleString()} (bloque 4: ${b4}) = ${manSub.hiragana}まん (${manSub.romaji}man)` 
                });
                n = rem;
            }

            // 1,000s (Sen) — delante de 万 (ej: 10.000.000 = いっせんまん, 14.703.280 = いっせんよんひゃくななじゅうまん...) 1000 se lee いっせん
            if (n >= 1000) {
                const senCount = Math.floor(n / 1000);
                const rem = n % 1000;
                if (senCount === 1 && isInsideMan) {
                    hiraParts.push('いっせん');
                    romajiParts.push('issen');
                    blocks.push('いっ', 'せん');
                    mutations.push('1000万: いっせんまん → いっ + せん (Sokuon obligatorio delante de 万)');
                    breakdown.push({ val: 1000, text: '1000 (en bloque 万) = いっせん (issen)' });
                } else {
                    const sData = THOUSANDS_DATA[senCount];
                    hiraParts.push(sData.hira);
                    romajiParts.push(sData.romaji);
                    blocks.push(...sData.blocks);
                    if (sData.mutation) {
                        const scaleLabel = isInsideMan ? (senCount * 1000) + '万' : String(senCount * 1000);
                        mutations.push(scaleLabel + ': ' + sData.hira + (isInsideMan ? 'まん' : '') + ' → ' + sData.mutation);
                    }
                    breakdown.push({ val: senCount * 1000, text: (senCount * 1000) + ' = ' + sData.hira + ' (' + sData.romaji + ')' });
                }
                n = rem;
            }

            // 100s (Hyaku)
            if (n >= 100) {
                const hyakuCount = Math.floor(n / 100);
                const rem = n % 100;
                const hData = HUNDREDS_DATA[hyakuCount];
                hiraParts.push(hData.hira);
                romajiParts.push(hData.romaji);
                blocks.push(...hData.blocks);
                if (hData.mutation) {
                    const scaleLabel = isInsideMan ? (hyakuCount * 100) + '万' : String(hyakuCount * 100);
                    mutations.push(scaleLabel + ': ' + hData.hira + (isInsideMan ? 'まん' : '') + ' → ' + hData.mutation);
                }
                breakdown.push({ val: hyakuCount * 100, text: (hyakuCount * 100) + ' = ' + hData.hira + ' (' + hData.romaji + ')' });
                n = rem;
            }

            // 10s (Juu)
            if (n >= 10) {
                const juuCount = Math.floor(n / 10);
                const rem = n % 10;
                if (juuCount === 1) {
                    hiraParts.push('じゅう');
                    romajiParts.push('juu');
                    blocks.push('じゅう');
                    breakdown.push({ val: 10, text: '10 = じゅう (juu)' });
                } else {
                    const d = DIGIT_HIRAGANA[juuCount];
                    hiraParts.push(d.hira + 'じゅう');
                    romajiParts.push(d.romaji + 'juu');
                    blocks.push(d.hira, 'じゅう');
                    breakdown.push({ val: juuCount * 10, text: (juuCount * 10) + ' = ' + d.hira + 'じゅう (' + d.romaji + 'juu)' });
                }
                n = rem;
            }

            // 1s (Units)
            if (n > 0) {
                const d = DIGIT_HIRAGANA[n];
                hiraParts.push(d.hira);
                romajiParts.push(d.romaji);
                blocks.push(d.hira);
                breakdown.push({ val: n, text: n + ' = ' + d.hira + ' (' + d.romaji + ')' });
            }

            const kanjiObj = numberToKanji(originalN);
            return {
                hiragana: hiraParts.join(''),
                romaji: romajiParts.join(' '),
                kanji: kanjiObj.kanji,
                kanjiBlocks: kanjiObj.blocks,
                blocks: blocks,
                hasMutation: mutations.length > 0,
                mutationInfo: mutations.join(' | ') || null,
                breakdown: breakdown,
                blocksOf4: formatJapaneseBlocksOf4(originalN)
            };
        }

        function getRandomNumberForRange(range) {
            if (range === '0-10') {
                return Math.floor(Math.random() * 11);
            }
            if (range === '11-99') {
                return Math.floor(Math.random() * 89) + 11;
            }
            if (range === '100-999') {
                // Focus heavily on mutation traps: 300, 600, 800
                if (Math.random() < 0.45) {
                    const mutationHundreds = [300, 600, 800];
                    const base = mutationHundreds[Math.floor(Math.random() * mutationHundreds.length)];
                    return base + Math.floor(Math.random() * 100);
                }
                return Math.floor(Math.random() * 900) + 100;
            }
            if (range === '1000-9999' || range === '1000-plus') {
                const roll = Math.random();
                if (roll < 0.4) {
                    const mutationThousands = [3000, 8000];
                    const base = mutationThousands[Math.floor(Math.random() * 2)];
                    return base + Math.floor(Math.random() * 1000);
                }
                return Math.floor(Math.random() * 9000) + 1000;
            }
            if (range === '10000-plus') {
                const roll = Math.random();
                if (roll < 0.35) {
                    // 35%: 5 DÍGITOS REALES Y VARIADOS (10.000 a 99.999) -> Ej: 24.685, 73.514, 15.420, 42.678
                    if (Math.random() < 0.70) {
                        return Math.floor(Math.random() * 90000) + 10000;
                    } else {
                        // Con combinaciones de centenas variadas (ej. 24.300, 85.020)
                        const man = Math.floor(Math.random() * 9) + 1;
                        const sub = Math.floor(Math.random() * 900) + 100;
                        return man * 10000 + sub;
                    }
                } else if (roll < 0.70) {
                    // 35%: 6 DÍGITOS COMPLETOS Y VARIADOS (100.000 a 999.999) -> Ej: 983.463, 348.720, 176.589, 512.604
                    if (Math.random() < 0.75) {
                        return Math.floor(Math.random() * 900000) + 100000;
                    } else {
                        // Combinaciones con centenas y decenas variadas (ej. 348.520)
                        const manPart = Math.floor(Math.random() * 90) + 10;
                        const remPart = Math.floor(Math.random() * 9000) + 100;
                        return manPart * 10000 + remPart;
                    }
                } else if (roll < 0.88) {
                    // 18%: 7 DÍGITOS COMPLETOS Y VARIADOS (1.000.000 a 9.999.999) -> Ej: 1.765.890, 4.320.150, 9.834.630
                    return Math.floor(Math.random() * 9000000) + 1000000;
                } else if (roll < 0.94) {
                    // 6%: 8 DÍGITOS DEL TALLER (10.000.000 a 99.999.999) -> Ej: 14.703.280, 25.400.000
                    return (Math.floor(Math.random() * 9000) + 1000) * 10000 + Math.floor(Math.random() * 10000);
                } else {
                    // 6%: Hitos redondos ocasionales (ej. 50.000, 100.000, 1.000.000, 10.000.000)
                    const milestones = [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000];
                    return milestones[Math.floor(Math.random() * milestones.length)];
                }
            }
            // Default 'partial' ("🔥 Mix Todos": 0 hasta millones):
            const mixBuckets = ['0-10', '11-99', '100-999', '1000-9999', '10000-plus'];
            const pickedBucket = mixBuckets[Math.floor(Math.random() * mixBuckets.length)];
            return getRandomNumberForRange(pickedBucket);
        }

        function generateLegoBank(correctBlocks, targetNum, isKanji = false) {
            const pool = correctBlocks.map((b, idx) => ({ id: 'c_' + idx + '_' + Math.random().toString(36).substring(2, 6), text: b, isDistractor: false }));
            const candidateDistractors = isKanji
                ? ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '円']
                : ['ひゃく', 'びゃく', 'ぴゃく', 'じゅう', 'ろく', 'ろっ', 'はち', 'はっ', 'よん', 'し', 'なな', 'しち', 'きゅう', 'く', 'さん', 'ぜん', 'せん', 'まん', 'いち'];
            
            let count = 0;
            for (const d of candidateDistractors) {
                if (!correctBlocks.includes(d) && Math.random() < 0.55 && count < 4) {
                    pool.push({ id: 'd_' + count + '_' + Math.random().toString(36).substring(2, 6), text: d, isDistractor: true });
                    count++;
                }
            }

            if (count < 3) {
                for (const d of candidateDistractors) {
                    if (!pool.some(p => p.text === d)) {
                        pool.push({ id: 'd_' + count + '_' + Math.random().toString(36).substring(2, 6), text: d, isDistractor: true });
                        count++;
                        if (count >= 3) break;
                    }
                }
            }

            // Shuffle pool
            for (let j = pool.length - 1; j > 0; j--) {
                const k = Math.floor(Math.random() * (j + 1));
                [pool[j], pool[k]] = [pool[k], pool[j]];
            }

            return pool;
        }

        // ==========================================================
        // CONTROLADOR PRINCIPAL DEL TALLER DE NÚMEROS (3 PILARES)
        // 1. Guía y Teoría (Modular: 1-7, 0-99, Mutaciones, 万, Kanji)
        // 2. Gimnasio de Práctica (Armar Fichas, Dictado, Quiz + Rangos)
        // 3. Traductor en Vivo (Traducción en tiempo real 0 a Millones)
        // ==========================================================

        function initNumbersGame() {
            if (!state.numbersConfig) {
                state.numbersConfig = {
                    pillar: 'guide',
                    guideSubTab: 'lesson',
                    mode: 'builder',
                    range: '10000-plus',
                    lessonStep: 1,
                    scriptMode: 'kana',
                    yenMode: false,
                    streak: 0,
                    score: 0
                };
            }
            if (!state.numbersConfig.pillar) {
                if (state.numbersConfig.mode === 'guide' || state.numbersConfig.mode === 'lesson') {
                    state.numbersConfig.pillar = 'guide';
                    state.numbersConfig.guideSubTab = (state.numbersConfig.mode === 'guide') ? 'mutations' : 'lesson';
                } else {
                    state.numbersConfig.pillar = 'practice';
                }
            }
            if (!['lesson', 'basics', 'mutations', 'man', 'kanji'].includes(state.numbersConfig.guideSubTab)) {
                state.numbersConfig.guideSubTab = 'lesson';
            }
            if (!['builder', 'dictation', 'quiz'].includes(state.numbersConfig.mode)) {
                state.numbersConfig.mode = 'builder';
            }
            if (!state.numbersConfig.range) state.numbersConfig.range = '10000-plus';

            updateNumbersHeaderStats();
            setNumbersPillar(state.numbersConfig.pillar || 'guide', true);
        }

        function updateNumbersHeaderStats() {
            const streakEl = document.getElementById('numbersStreakDisplay');
            const scoreEl = document.getElementById('numbersScoreDisplay');
            const rangeBadgeEl = document.getElementById('numbersRangeBadge');

            if (streakEl) streakEl.innerHTML = '<i class="fa-solid fa-fire text-amber-400 text-sm"></i> ' + (state.numbersConfig?.streak || 0);
            if (scoreEl) scoreEl.textContent = state.numbersConfig?.score || 0;

            const rangeNames = {
                'partial': 'Mix (Todos)',
                '0-10': '0 - 10 (Dígitos)',
                '11-99': '11 - 99 (Decenas)',
                '100-999': '100 - 999 (Centenas)',
                '1000-9999': '1.000 - 9.999 (Miles)',
                '1000-plus': '1.000 - 9.999 (Miles)',
                '10000-plus': '≥ 10.000 (万 y Millones)'
            };
            if (rangeBadgeEl) {
                rangeBadgeEl.textContent = rangeNames[state.numbersConfig?.range] || '≥ 10.000';
            }
        }

        function setNumbersPillar(pillar, skipSave) {
            if (!state.numbersConfig) state.numbersConfig = {};
            state.numbersConfig.pillar = pillar;
            if (!skipSave) saveStateToStorage();

            const pillarTabs = document.querySelectorAll('.numbers-pillar-tab');
            pillarTabs.forEach(tab => {
                const tabPillar = tab.id.replace('btn-num-pillar-', '');
                if (tabPillar === pillar) {
                    tab.className = 'numbers-pillar-tab flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 stage-theme-primary-btn shadow-md';
                } else {
                    tab.className = 'numbers-pillar-tab flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800';
                }
            });

            if (pillar === 'guide') {
                renderNumbersGuidePillar();
            } else if (pillar === 'practice') {
                renderNumbersPracticePillar();
            } else if (pillar === 'translator') {
                renderNumbersTranslatorPillar();
            }
        }

        // Compatibilidad con botones y accesos previos
        function setNumbersMode(mode, skipSave) {
            if (!state.numbersConfig) state.numbersConfig = {};
            if (mode === 'guide' || mode === 'lesson') {
                state.numbersConfig.pillar = 'guide';
                state.numbersConfig.guideSubTab = (mode === 'guide') ? 'mutations' : 'lesson';
                setNumbersPillar('guide', skipSave);
            } else {
                state.numbersConfig.pillar = 'practice';
                state.numbersConfig.mode = mode;
                setNumbersPillar('practice', skipSave);
            }
        }

        function setNumbersRange(range) {
            if (!state.numbersConfig) state.numbersConfig = {};
            state.numbersConfig.range = range;
            saveStateToStorage();
            updateNumbersHeaderStats();
            updateNumbersPracticeRangeButtonsUI();

            // Si estamos en el gimnasio de práctica, refrescar el reto con el nuevo rango
            if (state.numbersConfig.pillar === 'practice') {
                const curDyn = state.numbersConfig.mode || 'builder';
                if (curDyn === 'builder') nextNumbersLegoChallenge();
                else if (curDyn === 'dictation') nextNumbersDictationChallenge();
                else if (curDyn === 'quiz') nextNumbersQuizChallenge();
            }
        }

        // ==========================================================
        // PILAR 1: GUÍA Y TEORÍA MODULAR
        // ==========================================================
        function renderNumbersGuidePillar() {
            const container = document.getElementById('numbersWorkspaceContainer');
            if (!container) return;

            const curSubTab = (state.numbersConfig && state.numbersConfig.guideSubTab) || 'lesson';

            const subTabsMeta = [
                { id: 'lesson', label: 'Lección 1-7', icon: 'fa-graduation-cap' },
                { id: 'basics', label: 'Dígitos y Decenas (0-99)', icon: 'fa-list-ol' },
                { id: 'mutations', label: 'Mutaciones Clave', icon: 'fa-star' },
                { id: 'man', label: 'Sistema del 万 (10k+)', icon: 'fa-layer-group' },
                { id: 'kanji', label: 'Caligrafía Kanji', icon: 'fa-paintbrush' }
            ];

            container.innerHTML = `
                <div class="space-y-6">
                    <!-- Sub-tabs Navigation Bar -->
                    <div class="flex items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-x-auto" id="numbersGuideSubTabsBar">
                        ${subTabsMeta.map(st => {
                            const isActive = st.id === curSubTab;
                            return `
                                <button type="button" data-action="setNumbersGuideSubTab" data-args='["${st.id}"]' id="btn-guide-subtab-${st.id}"
                                    class="guide-sub-tab flex-1 min-w-[125px] py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${isActive ? 'stage-theme-primary-btn shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}">
                                    <i class="fa-solid ${st.icon} ${isActive ? '' : 'text-amber-400'}"></i>
                                    <span>${st.label}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>

                    <!-- Guide Sub-Content Area -->
                    <div id="numbersGuideSubContent" class="animate-fade-in"></div>
                </div>
            `;

            renderNumbersGuideSubContent(curSubTab);
        }

        function setNumbersGuideSubTab(subTab) {
            if (!state.numbersConfig) state.numbersConfig = {};
            state.numbersConfig.guideSubTab = subTab;
            saveStateToStorage();

            const subTabs = document.querySelectorAll('.guide-sub-tab');
            subTabs.forEach(tab => {
                const tid = tab.id.replace('btn-guide-subtab-', '');
                if (tid === subTab) {
                    tab.className = 'guide-sub-tab flex-1 min-w-[125px] py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 stage-theme-primary-btn shadow-md';
                } else {
                    tab.className = 'guide-sub-tab flex-1 min-w-[125px] py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800';
                }
            });

            renderNumbersGuideSubContent(subTab);
        }

        // ==========================================================
        // PILAR 2: GIMNASIO DE PRÁCTICA (ENTRENAMIENTO ACTIVO)
        // ==========================================================
        function renderNumbersPracticePillar() {
            const container = document.getElementById('numbersWorkspaceContainer');
            if (!container) return;

            if (!state.numbersConfig) state.numbersConfig = {};
            if (!['builder', 'dictation', 'quiz'].includes(state.numbersConfig.mode)) {
                state.numbersConfig.mode = 'builder';
            }
            const curDyn = state.numbersConfig.mode;
            const curRange = state.numbersConfig.range || '10000-plus';

            const dynMeta = [
                { id: 'builder', label: 'Armar con Fichas', icon: 'fa-puzzle-piece', color: 'text-amber-400' },
                { id: 'dictation', label: 'Dictado Auditivo', icon: 'fa-headphones', color: 'text-sky-400' },
                { id: 'quiz', label: 'Quiz Rápido', icon: 'fa-bolt', color: 'text-rose-400' }
            ];

            const rangeMeta = [
                { id: '0-10', title: '0 - 10', desc: 'Dígitos' },
                { id: '11-99', title: '11 - 99', desc: 'Decenas' },
                { id: '100-999', title: '100 - 999', desc: 'Centenas' },
                { id: '1000-9999', title: '1k - 9.9k', desc: 'Miles' },
                { id: '10000-plus', title: '≥ 10.000', desc: '万 y Millones' },
                { id: 'partial', title: '🔥 Mix', desc: 'Todos' }
            ];

            container.innerHTML = `
                <div class="space-y-6">
                    <!-- Gym Controls: Dinámica + Rango Contextual -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
                        <!-- Dinámica Selector -->
                        <div class="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
                            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <i class="fa-solid fa-gamepad stage-theme-accent-text"></i> Dinámica de Juego:
                            </span>
                            <div class="flex items-center gap-2 flex-wrap" id="practiceDynButtonsGroup">
                                ${dynMeta.map(d => {
                                    const isActive = d.id === curDyn;
                                    return `
                                        <button type="button" data-action="setNumbersPracticeDynamic" data-args='["${d.id}"]' id="btn-practice-dyn-${d.id}"
                                            class="practice-dyn-tab py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${isActive ? 'stage-theme-primary-btn shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-850'}">
                                            <i class="fa-solid ${d.icon} ${isActive ? '' : d.color}"></i>
                                            <span>${d.label}</span>
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Rango Selector Contextual -->
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
                                <span class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                    <i class="fa-solid fa-filter stage-theme-accent-text"></i> Rango de Estudio:
                                </span>
                                <span class="text-[11px] stage-theme-accent-text font-medium">✨ Entrena a tu ritmo por magnitud</span>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" id="numbersPracticeRangeButtonsGroup">
                                ${rangeMeta.map(r => {
                                    const isActive = r.id === curRange;
                                    return `
                                        <button type="button" data-action="setNumbersRange" data-args='["${r.id}"]' id="btn-practice-range-${r.id}"
                                            class="practice-range-btn py-2 px-2.5 rounded-xl text-xs font-semibold transition flex flex-col items-center justify-center gap-0.5 border ${isActive ? 'stage-theme-pill shadow-md scale-[1.02] font-bold' : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'}">
                                            <span class="font-bold text-xs sm:text-sm">${r.title}</span>
                                            <span class="text-[10px] opacity-80">${r.desc}</span>
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Practice Exercise Container -->
                    <div id="numbersPracticeExerciseArea" class="animate-fade-in"></div>
                </div>
            `;

            // Launch active dynamic challenge
            if (curDyn === 'builder') {
                nextNumbersLegoChallenge();
            } else if (curDyn === 'dictation') {
                nextNumbersDictationChallenge();
            } else if (curDyn === 'quiz') {
                nextNumbersQuizChallenge();
            }
        }

        function setNumbersPracticeDynamic(dyn) {
            if (!state.numbersConfig) state.numbersConfig = {};
            state.numbersConfig.mode = dyn;
            saveStateToStorage();

            const dynTabs = document.querySelectorAll('.practice-dyn-tab');
            dynTabs.forEach(tab => {
                const tid = tab.id.replace('btn-practice-dyn-', '');
                if (tid === dyn) {
                    tab.className = 'practice-dyn-tab py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 stage-theme-primary-btn shadow-md';
                } else {
                    tab.className = 'practice-dyn-tab py-2 px-3.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-850';
                }
            });

            if (dyn === 'builder') {
                nextNumbersLegoChallenge();
            } else if (dyn === 'dictation') {
                nextNumbersDictationChallenge();
            } else if (dyn === 'quiz') {
                nextNumbersQuizChallenge();
            }
        }

        function updateNumbersPracticeRangeButtonsUI() {
            const rangeBtns = document.querySelectorAll('.practice-range-btn');
            const curRange = state.numbersConfig?.range || '10000-plus';

            rangeBtns.forEach(btn => {
                const rangeId = btn.id.replace('btn-practice-range-', '');
                if (rangeId === curRange) {
                    btn.className = 'practice-range-btn py-2 px-2.5 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 border stage-theme-pill shadow-md scale-[1.02]';
                } else {
                    btn.className = 'practice-range-btn py-2 px-2.5 rounded-xl text-xs font-semibold transition flex flex-col items-center justify-center gap-0.5 border bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700';
                }
            });
        }

        // ==========================================================
        // PILAR 3: TRADUCTOR Y DESCOMPOSITOR EN VIVO (0 A MILLONES + PRECIOS 円)
        // ==========================================================
        function toggleTranslatorYenMode() {
            if (!state.numbersConfig) state.numbersConfig = {};
            state.numbersConfig.yenMode = !state.numbersConfig.yenMode;
            saveStateToStorage();
            const yenBtn = document.getElementById('btnTranslatorYenMode');
            if (yenBtn) {
                const isYen = Boolean(state.numbersConfig.yenMode);
                yenBtn.className = `py-3.5 px-4 rounded-2xl border-2 font-bold text-xs sm:text-sm transition flex items-center gap-2 active:scale-95 ${isYen ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`;
                yenBtn.innerHTML = `<i class="fa-solid fa-yen-sign ${isYen ? 'text-amber-400' : ''}"></i><span>${isYen ? 'Precio 円 Activo' : 'Modo Precio (円)'}</span>`;
            }
            const input = document.getElementById('customNumberInput');
            translateCustomNumberInput(input ? input.value : 1765890);
        }

        function renderNumbersTranslatorPillar() {
            const container = document.getElementById('numbersWorkspaceContainer');
            if (!container) return;

            const initialVal = 1765890;
            const isYen = Boolean(state.numbersConfig && state.numbersConfig.yenMode);

            container.innerHTML = `
                <div class="space-y-6">
                    <div class="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border border-indigo-500/30 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-1.5 border border-indigo-500/30">
                                    <i class="fa-solid fa-wand-magic-sparkles text-indigo-400"></i> Descomposición y Audio en Tiempo Real
                                </span>
                                <h3 class="text-xl sm:text-2xl font-black text-white">
                                    Traductor Numérico Japonés (0 a 99.999.999)
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-300 mt-1">
                                    Escribe cualquier cifra o precio para descomponerla en bloques de <strong class="stage-theme-accent-text">万 (man)</strong>, escuchar su pronunciación nativa y detectar mutaciones fonéticas.
                                </p>
                            </div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="text-xs text-slate-400">Ejemplos del Taller:</span>
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <button type="button" data-action="setCustomNumberInput" data-args='[348]' class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono font-bold transition">348</button>
                                    <button type="button" data-action="setCustomNumberInput" data-args='[2500]' class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-mono font-bold transition">2.500</button>
                                    <button type="button" data-action="setCustomNumberInput" data-args='[25800]' class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-mono font-bold transition">25.800</button>
                                    <button type="button" data-action="setCustomNumberInput" data-args='[1820000]' class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-mono font-bold transition" title="Ejemplo Taller: くるま 1.820.000円">1.820.000</button>
                                    <button type="button" data-action="setCustomNumberInput" data-args='[14703280]' class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-mono font-bold transition" title="Ejercicio 1 #18 del Taller">14.703.280</button>
                                </div>
                            </div>
                        </div>

                        <!-- Input Box Prominente + Toggle Precios 円 -->
                        <div class="flex items-center gap-3 flex-wrap">
                            <div class="relative flex-1 min-w-[200px]">
                                <input type="number" id="customNumberInput" min="0" max="99999999" value="${initialVal}"
                                    data-input="translateCustomNumberInput" data-args='["$value"]'
                                    class="w-full py-3.5 px-5 rounded-2xl bg-slate-950 border-2 border-indigo-500/50 text-white font-mono text-2xl font-black focus:outline-none focus:border-indigo-400 transition" />
                            </div>
                            <button type="button" id="btnTranslatorYenMode" data-action="toggleTranslatorYenMode"
                                class="py-3.5 px-4 rounded-2xl border-2 font-bold text-xs sm:text-sm transition flex items-center gap-2 active:scale-95 ${isYen ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}">
                                <i class="fa-solid fa-yen-sign ${isYen ? 'text-amber-400' : ''}"></i>
                                <span>${isYen ? 'Precio 円 Activo' : 'Modo Precio (円)'}</span>
                            </button>
                            <button type="button" data-action="translateCustomNumberFromInput"
                                class="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/30 active:scale-95">
                                <i class="fa-solid fa-language mr-1.5"></i> Traducir
                            </button>
                        </div>

                        <!-- Live Output Card -->
                        <div id="customNumberOutputCard" class="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4">
                            <!-- Populated on load -->
                        </div>
                    </div>
                </div>
            `;

            translateCustomNumberInput(initialVal);
        }

        function setCustomNumberInput(num) {
            const input = document.getElementById('customNumberInput');
            if (input) {
                input.value = num;
                translateCustomNumberInput(num);
            }
        }

        function translateCustomNumberInput(val) {
            const outputCard = document.getElementById('customNumberOutputCard');
            if (!outputCard) return;

            const n = parseInt(val, 10);
            if (isNaN(n) || n < 0 || n > 99999999) {
                outputCard.innerHTML = `<span class="text-xs text-slate-500">Ingresa un número válido entre 0 y 99.999.999</span>`;
                return;
            }

            const data = numberToJapanese(n);
            const b4Formatted = formatJapaneseBlocksOf4(n);
            const isYen = Boolean(state.numbersConfig && state.numbersConfig.yenMode);
            const displayKanji = (data.kanji || '') + (isYen ? '円' : '');
            const displayHira = data.hiragana + (isYen ? 'えん' : '');
            const displayRomaji = data.romaji + (isYen ? ' en' : '');
            const spokenPhrase = isYen ? `${data.hiragana}えんです` : data.hiragana;

            outputCard.innerHTML = `
                <div class="flex items-center justify-between gap-3 flex-wrap border-b border-slate-900 pb-4">
                    <div>
                        <div class="text-xs font-bold text-amber-400 font-jp mb-0.5">
                            Kanji: <span class="text-lg font-black text-white">${displayKanji}</span>
                            ${isYen ? `<span class="ml-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-mono">¥${n.toLocaleString()}</span>` : ''}
                        </div>
                        <div class="text-2xl sm:text-3xl font-jp font-black text-white tracking-wide">
                            ${displayHira}${isYen ? '<span class="text-base sm:text-xl text-amber-300 font-bold ml-1">です。</span>' : ''}
                        </div>
                        <div class="text-xs sm:text-sm font-mono text-indigo-300 mt-0.5">
                            ${displayRomaji}${isYen ? ' desu.' : ''}
                        </div>
                    </div>
                    <button type="button" data-action="speakJapanese" data-args='["${spokenPhrase}"]' class="px-4 py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow">
                        <i class="fa-solid fa-volume-high text-sm"></i>
                        <span>${isYen ? 'Escuchar Precio' : 'Pronunciar'}</span>
                    </button>
                </div>
                ${data.mutationInfo ? `
                    <div class="text-xs text-amber-300 font-semibold bg-amber-500/10 p-3 rounded-xl border border-amber-500/30 flex items-start gap-2">
                        <i class="fa-solid fa-triangle-exclamation text-amber-400 mt-0.5 shrink-0"></i>
                        <span>${data.mutationInfo}</span>
                    </div>
                ` : ''}
                <div class="space-y-3 pt-1">
                    <div class="flex flex-wrap items-center gap-2 text-xs">
                        <span class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                            Occidental: <strong class="text-white">${n.toLocaleString()}${isYen ? ' 円' : ''}</strong>
                        </span>
                        <span class="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                            Bloques de 4 (万): <strong class="text-white">${b4Formatted}</strong>
                        </span>
                    </div>
                    <div>
                        <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">Descomposición Posicional:</span>
                        <div class="flex flex-wrap gap-2">
                            ${data.breakdown.map(b => `
                                <span class="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-jp border border-slate-800 shadow-sm">
                                    ${b.text}
                                </span>
                            `).join('')}
                            ${isYen ? `<span class="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 text-xs font-jp border border-amber-500/30 font-bold">円 = えん (en / yenes)</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        // ==========================================================
        // MODO APRENDIZAJE: LECCIÓN INTERACTIVA PASO A PASO (1 AL 7)
        // ==========================================================
        function setNumbersLessonStep(step) {
            state.numbersLessonStep = Math.max(1, Math.min(7, step));
            if (!state.numbersConfig) state.numbersConfig = {};
            state.numbersConfig.lessonStep = state.numbersLessonStep;
            saveStateToStorage();
            renderNumbersLesson();
            const container = document.getElementById('numbersGuideSubContent') || document.getElementById('numbersWorkspaceContainer');
            if (container) {
                container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        function renderNumbersLesson() {
            const container = document.getElementById('numbersGuideSubContent') || document.getElementById('numbersWorkspaceContainer');
            if (!container) return;

            const curStep = (state.numbersConfig && state.numbersConfig.lessonStep) || state.numbersLessonStep || 1;

            // Stepper Navigation Header
            const stepsMeta = [
                { num: 1, label: "1 al 10", icon: "fa-list-ol" },
                { num: 2, label: "Decenas 11-99", icon: "fa-calculator" },
                { num: 3, label: "Centenas 100", icon: "fa-circle-dot" },
                { num: 4, label: "Mutaciones 100", icon: "fa-star" },
                { num: 5, label: "Miles 1.000 (千)", icon: "fa-gem" },
                { num: 6, label: "Armado 3-4 Dígitos", icon: "fa-cubes" },
                { num: 7, label: "≥ 10k: 万 y Millones", icon: "fa-layer-group" }
            ];

            const stepperHtml = `
                <div class="flex items-center justify-between gap-1 sm:gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto">
                    ${stepsMeta.map(s => {
                        const isActive = s.num === curStep;
                        const isDone = s.num < curStep;
                        let pillClass = 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200';
                        if (isActive) {
                            pillClass = 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-500/20 scale-102';
                        } else if (isDone) {
                            pillClass = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
                        }
                        return `
                            <button type="button" data-action="setNumbersLessonStep" data-args='[${s.num}]'
                                class="flex-1 min-w-[90px] sm:min-w-[115px] py-2 px-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 ${pillClass}">
                                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-slate-950 text-amber-300' : isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}">
                                    ${isDone ? '<i class="fa-solid fa-check text-[9px]"></i>' : s.num}
                                </span>
                                <span class="truncate">${s.label}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
            `;

            let stepBodyHtml = '';

            if (curStep === 1) {
                // PASO 1: DEL 1 AL 10 Y FILOSOFÍA
                stepBodyHtml = `
                    <div class="space-y-5 animate-fade-in">
                        <div class="space-y-1">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                                <i class="fa-solid fa-graduation-cap text-amber-400"></i> Lección 1 de 7: La Base de Todo (1 al 10 y Kanji)
                            </span>
                            <h3 class="text-xl sm:text-2xl font-black text-white">Los Números del 1 al 10 y su Filosofía</h3>
                            <p class="text-xs sm:text-sm text-slate-300">
                                A diferencia del español (que tiene formas caprichosas como <em>once, doce, quince</em>), <strong>el japonés es un sistema puramente matemático y combinatorio</strong>. ¡Dominando del 1 al 10 ya tienes el bloque fundamental para armar cualquier número!
                            </p>
                        </div>

                        <!-- Grid 1 al 10 con audio y trazos Kanji -->
                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(digit => {
                                const d = DIGIT_HIRAGANA[digit];
                                const k = DIGIT_KANJI[digit] || '';
                                return `
                                    <div class="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 flex flex-col justify-between gap-2 shadow-sm transition group">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-2">
                                                <span class="font-mono text-2xl font-black text-amber-300">${digit}</span>
                                                <span class="font-jp text-xl font-black text-white">${k}</span>
                                            </div>
                                            <div class="flex items-center gap-1">
                                                <button aria-label="Ver animación de trazo de ${k}" type="button" data-action="showKanaStrokeModal" data-args='["${k}"]' class="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 flex items-center justify-center transition active:scale-90" title="Ver animación de trazo de ${k}">
                                                    <i class="fa-solid fa-paintbrush text-[11px]"></i>
                                                </button>
                                                <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["${d.hira}"]' class="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-jp text-lg font-bold text-white">${d.hira}</div>
                                            <div class="font-mono text-xs text-slate-400">${d.romaji}${d.alt ? ` <span class="text-amber-400">/ ${d.alt}</span>` : ''}</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- Advertencias de Clase -->
                        <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                            <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                                <i class="fa-solid fa-triangle-exclamation text-amber-400"></i> ¡Atención en Clase: Lecturas Especiales!
                            </span>
                            <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                                <li><strong>4 (よん / し):</strong> Para contar y armar números, <strong>SIEMPRE se usa よん (yon)</strong>. La lectura <em>shi</em> se evita porque suena a muerte (死) y se reserva para meses (abril: しがつ).</li>
                                <li><strong>7 (なな / しち):</strong> Para armar números, <strong>se usa casi siempre なな (nana)</strong>. <em>Shichi</em> se usa para horas (7:00: しちじ) o julio (しちがつ).</li>
                                <li><strong>9 (きゅう / く):</strong> Para componer números se usa <strong>きゅう (kyuu)</strong>. <em>Ku</em> se reserva para septiembre (くがつ) o 9:00 (くじ).</li>
                                <li><strong>0:</strong> Se dice <strong>ぜろ (zero)</strong> o <strong>れい (rei)</strong>.</li>
                            </ul>
                        </div>
                    </div>
                `;
            } else if (curStep === 2) {
                // PASO 2: DECENAS Y ORDEN
                stepBodyHtml = `
                    <div class="space-y-5 animate-fade-in">
                        <div class="space-y-1">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                                <i class="fa-solid fa-calculator text-amber-400"></i> Lección 2 de 7: La Lógica de las Decenas (11 al 99)
                            </span>
                            <h3 class="text-xl sm:text-2xl font-black text-white">¿Cómo se Arman los Números del 11 al 99?</h3>
                            <p class="text-xs sm:text-sm text-slate-300">
                                Para armar cualquier número de dos dígitos, solo combinas los dígitos del 1 al 10 con la palabra clave <strong class="text-amber-300 font-jp">じゅう (juu = 10)</strong>. Sigue estas tres reglas sencillas:
                            </p>
                        </div>

                        <!-- Regla 1: 11 al 19 -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide block">
                                1. Del 11 al 19: Lógica Aditiva (10 + Dígito)
                            </span>
                            <div class="inline-block p-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-white font-bold">
                                Fórmula: <span class="text-amber-400 font-jp">じゅう</span> + [Dígito 1-9]
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div><strong>11:</strong> <span class="font-jp text-amber-300 font-bold">十一</span> <span class="text-slate-300">(じゅういち)</span></div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["じゅういち"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div><strong>14:</strong> <span class="font-jp text-amber-300 font-bold">十四</span> <span class="text-slate-300">(じゅうよん)</span></div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["じゅうよん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div><strong>17:</strong> <span class="font-jp text-amber-300 font-bold">十七</span> <span class="text-slate-300">(じゅうなな)</span></div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["じゅうなな"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div><strong>19:</strong> <span class="font-jp text-amber-300 font-bold">十九</span> <span class="text-slate-300">(じゅうきゅう)</span></div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["じゅうきゅう"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
                        </div>

                        <!-- Regla 2: Decenas Enteras 20 al 90 -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide block">
                                2. Decenas Enteras (20, 30... 90): Lógica Multiplicativa (Dígito × 10)
                            </span>
                            <div class="inline-block p-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-white font-bold">
                                Fórmula: [Multiplicador 2-9] + <span class="text-amber-400 font-jp">じゅう</span>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>20:</strong> にじゅう <span class="text-[10px] text-slate-500">(2 dieces)</span></span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["にじゅう"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>30:</strong> さんじゅう</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["さんじゅう"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>40:</strong> よんじゅう</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["よんじゅう"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>70:</strong> ななじゅう</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ななじゅう"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
                        </div>

                        <!-- Regla 3: Números Compuestos -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide block">
                                3. Números Compuestos (ej: 47, 83, 99)
                            </span>
                            <p class="text-xs text-slate-300">
                                Simplemente unes la decena y la unidad en orden de izquierda a derecha:
                            </p>
                            <div class="space-y-2 text-xs">
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>47:</strong> 40 (よんじゅう) + 7 (なな) = <strong class="text-white font-jp">よんじゅうなな</strong></span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["よんじゅうなな"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>83:</strong> 80 (はちじゅう) + 3 (さん) = <strong class="text-white font-jp">はちじゅうさん</strong></span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["はちじゅうさん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (curStep === 3) {
                // PASO 3: LLEGADA AL 100
                stepBodyHtml = `
                    <div class="space-y-5 animate-fade-in">
                        <div class="space-y-1">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                                <i class="fa-solid fa-circle-dot text-amber-400"></i> Lección 3 de 7: El 100 y las Centenas Regulares (百 / ひゃく)
                            </span>
                            <div class="flex items-center justify-between gap-3 flex-wrap">
                                <h3 class="text-xl sm:text-2xl font-black text-white">El 100 y las Centenas Regulares</h3>
                                <button type="button" data-action="showKanaStrokeModal" data-args='["百"]' class="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                                    <i class="fa-solid fa-paintbrush text-rose-400"></i> Ver Trazos de 百
                                </button>
                            </div>
                            <p class="text-xs sm:text-sm text-slate-300">
                                Para llegar a las centenas aparece la palabra <strong class="text-amber-300 font-jp">ひゃく (hyaku = 100)</strong>. Sigue la misma lógica que las decenas, pero con una <em>regla de oro inquebrantable</em>:
                            </p>
                        </div>

                        <!-- Regla de oro de 100 -->
                        <div class="p-5 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 space-y-2">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-crown text-amber-400 text-lg"></i>
                                <span class="font-black text-base text-white">Regla de Oro #1: 100 es simplemente ひゃく (hyaku)</span>
                            </div>
                            <p class="text-xs text-amber-200">
                                <strong>¡NUNCA digas <em>ichihyaku</em>!</strong> Así como el 10 es simplemente <code>じゅう</code> (y no <em>ichijuu</em>), el 100 se dice directamente <strong>ひゃく</strong>. El prefijo <em>ichi</em> NO se agrega.
                            </p>
                            <div class="pt-1">
                                <button type="button" data-action="speakJapanese" data-args='["ひゃく"]' class="py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-black text-xs transition active:scale-95 flex items-center gap-2">
                                    <i class="fa-solid fa-volume-high"></i> Escuchar "ひゃく" (100)
                                </button>
                            </div>
                        </div>

                        <!-- Centenas Regulares -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide block">
                                Las Centenas Regulares: [Dígito 1-9] + ひゃく
                            </span>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="font-mono text-base font-black text-amber-400">100</span>
                                        <span class="font-jp text-lg font-black text-amber-300">百</span>
                                        <span class="font-jp text-white font-bold">ひゃく</span>
                                        <span class="text-slate-400">(hyaku)</span>
                                    </div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ひゃく"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="font-mono text-base font-black text-amber-400">200</span>
                                        <span class="font-jp text-lg font-black text-amber-300">二百</span>
                                        <span class="font-jp text-white font-bold">にひゃく</span>
                                        <span class="text-slate-400">(nihyaku)</span>
                                    </div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["にひゃく"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="font-mono text-base font-black text-amber-400">400</span>
                                        <span class="font-jp text-lg font-black text-amber-300">四百</span>
                                        <span class="font-jp text-white font-bold">よんひゃく</span>
                                        <span class="text-slate-400">(yonhyaku)</span>
                                    </div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["よんひゃく"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="font-mono text-base font-black text-amber-400">500</span>
                                        <span class="font-jp text-lg font-black text-amber-300">五百</span>
                                        <span class="font-jp text-white font-bold">ごひゃく</span>
                                        <span class="text-slate-400">(gohyaku)</span>
                                    </div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ごひゃく"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="font-mono text-base font-black text-amber-400">700</span>
                                        <span class="font-jp text-lg font-black text-amber-300">七百</span>
                                        <span class="font-jp text-white font-bold">ななひゃく</span>
                                        <span class="text-slate-400">(nanahyaku)</span>
                                    </div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ななひゃく"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="font-mono text-base font-black text-amber-400">900</span>
                                        <span class="font-jp text-lg font-black text-amber-300">九百</span>
                                        <span class="font-jp text-white font-bold">きゅうひゃく</span>
                                        <span class="text-slate-400">(kyuuhyaku)</span>
                                    </div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["きゅうひゃく"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
                        </div>

                        <!-- Teaser del Paso 4 -->
                        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
                            <i class="fa-solid fa-magnifying-glass text-amber-400 text-lg shrink-0"></i>
                            <span>¿Notaste que faltan <strong>300, 600 y 800</strong>? ¡Pasa a la siguiente lección para ver las 3 mutaciones fonéticas más importantes!</span>
                        </div>
                    </div>
                `;
            } else if (curStep === 4) {
                // PASO 4: LAS 3 MUTACIONES
                stepBodyHtml = `
                    <div class="space-y-5 animate-fade-in">
                        <div class="space-y-1">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                                <i class="fa-solid fa-star text-rose-400"></i> Lección 4 de 7: Las 3 Mutaciones Fonéticas Obligatorias (300, 600, 800)
                            </span>
                            <h3 class="text-xl sm:text-2xl font-black text-white">Las 3 Mutaciones Fonéticas Obligatorias (300, 600, 800)</h3>
                            <p class="text-xs sm:text-sm text-slate-300">
                                En japonés, pronunciar <em>san-hyaku</em> o <em>roku-hyaku</em> resulta incómodo para la garganta. Por asimilación fonética natural, estas 3 centenas mutan y son <strong>las excepciones fonéticas fundamentales</strong>:
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Mutación 300 -->
                            <div class="p-5 rounded-2xl bg-slate-950 border-2 border-amber-500/40 space-y-3 shadow-lg">
                                <div class="flex items-center justify-between">
                                    <span class="text-3xl font-black font-mono text-amber-300">300</span>
                                    <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["さんびゃく"]' class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                                        <i class="fa-solid fa-volume-high text-sm"></i>
                                    </button>
                                </div>
                                <div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-2xl font-jp font-black text-amber-400">三百</span>
                                        <div class="text-xl font-jp font-bold text-white">
                                            さん<span class="text-amber-400 underline decoration-amber-500 decoration-2">びゃく</span>
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">sanbyaku</div>
                                </div>
                                <div class="text-xs text-amber-200/90 space-y-1">
                                    <p>• <strong>Regla:</strong> La 'n' de <em>san</em> convierte la 'h' en 'b' (<strong>Dakuon ゛</strong>).</p>
                                    <p class="text-rose-400">❌ Error común: Decir <em>sanhyaku</em>.</p>
                                    <p class="text-emerald-300 font-bold">✔️ Correcto: さんびゃく.</p>
                                </div>
                            </div>

                            <!-- Mutación 600 -->
                            <div class="p-5 rounded-2xl bg-slate-950 border-2 border-amber-500/40 space-y-3 shadow-lg">
                                <div class="flex items-center justify-between">
                                    <span class="text-3xl font-black font-mono text-amber-300">600</span>
                                    <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["ろっぴゃく"]' class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                                        <i class="fa-solid fa-volume-high text-sm"></i>
                                    </button>
                                </div>
                                <div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-2xl font-jp font-black text-amber-400">六百</span>
                                        <div class="text-xl font-jp font-bold text-white">
                                            <span class="text-amber-400 underline decoration-amber-500 decoration-2">ろっ</span><span class="text-amber-400 underline decoration-amber-500 decoration-2">ぴゃく</span>
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">roppyaku</div>
                                </div>
                                <div class="text-xs text-amber-200/90 space-y-1">
                                    <p>• <strong>Regla:</strong> <em>Roku</em> se trunca en tsu pequeño (<strong class="text-white">ろっ</strong>) y hyaku muta a 'p' (<strong class="text-white">ぴゃく</strong>).</p>
                                    <p class="text-rose-400">❌ Error común: Decir <em>rokuhyaku</em>.</p>
                                    <p class="text-emerald-300 font-bold">✔️ Correcto: ろっぴゃく.</p>
                                </div>
                            </div>

                            <!-- Mutación 800 -->
                            <div class="p-5 rounded-2xl bg-slate-950 border-2 border-amber-500/40 space-y-3 shadow-lg">
                                <div class="flex items-center justify-between">
                                    <span class="text-3xl font-black font-mono text-amber-300">800</span>
                                    <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["はっぴゃく"]' class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition active:scale-90" title="Escuchar">
                                        <i class="fa-solid fa-volume-high text-sm"></i>
                                    </button>
                                </div>
                                <div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-2xl font-jp font-black text-amber-400">八百</span>
                                        <div class="text-xl font-jp font-bold text-white">
                                            <span class="text-amber-400 underline decoration-amber-500 decoration-2">はっ</span><span class="text-amber-400 underline decoration-amber-500 decoration-2">ぴゃく</span>
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">happyaku</div>
                                </div>
                                <div class="text-xs text-amber-200/90 space-y-1">
                                    <p>• <strong>Regla:</strong> <em>Hachi</em> se trunca en tsu pequeño (<strong class="text-white">はっ</strong>) y hyaku muta a 'p' (<strong class="text-white">ぴゃく</strong>).</p>
                                    <p class="text-rose-400">❌ Error común: Decir <em>hachihyaku</em>.</p>
                                    <p class="text-emerald-300 font-bold">✔️ Correcto: はっぴゃく.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Resumen Mnemotécnico -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
                            <i class="fa-solid fa-lightbulb text-amber-400 text-xl shrink-0"></i>
                            <div>
                                <span class="font-bold text-white block">Regla Mnemotécnica Rápida:</span>
                                <span>Solo recuerda: <strong>El 3 lleva B (さんびゃく)</strong>, mientras que <strong>el 6 y el 8 llevan P y tsu pequeño (ろっぴゃく, はっぴゃく)</strong>. ¡Todas las demás centenas son <em>hyaku</em> normal!</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (curStep === 5) {
                // PASO 5: LOS MILES (千 - sen: 1.000 a 9.999) Y SUS 2 MUTACIONES
                stepBodyHtml = `
                    <div class="space-y-5 animate-fade-in">
                        <div class="space-y-1">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                                <i class="fa-solid fa-gem text-amber-400"></i> Lección 5 de 7: Los Miles (千 - sen) y sus 2 Mutaciones (3.000 y 8.000)
                            </span>
                            <div class="flex items-center justify-between gap-3 flex-wrap">
                                <h3 class="text-xl sm:text-2xl font-black text-white">Los Miles: 千 (せん - sen) y sus 2 Mutaciones</h3>
                                <div class="flex items-center gap-2">
                                    <button type="button" data-action="showKanaStrokeModal" data-args='["千"]' class="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                                        <i class="fa-solid fa-paintbrush text-rose-400"></i> Trazos de 千
                                    </button>
                                    <button type="button" data-action="showKanaStrokeModal" data-args='["円"]' class="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                                        <i class="fa-solid fa-paintbrush text-amber-400"></i> Trazos de 円
                                    </button>
                                </div>
                            </div>
                            <p class="text-xs sm:text-sm text-slate-300">
                                Para expresar millares en japonés se usa el sufijo <strong class="text-amber-300 font-jp">千 (せん - sen = 1.000)</strong>. Al igual que el 100 (ひゃく), el 1.000 tiene una regla de oro primordial:
                            </p>
                        </div>

                        <!-- Regla de oro de 1.000 -->
                        <div class="p-5 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 space-y-2">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-crown text-amber-400 text-lg"></i>
                                <span class="font-black text-base text-white">Regla de Oro: 1.000 es simplemente せん (sen) / 千</span>
                            </div>
                            <p class="text-xs text-amber-200">
                                <strong>¡NUNCA digas <em>ichisen</em>!</strong> Así como 10 es <code>じゅう</code> y 100 es <code>ひゃく</code>, 1.000 se dice directamente <strong>せん (sen)</strong> sin agregar <em>ichi</em>.
                            </p>
                            <div class="pt-1">
                                <button type="button" data-action="speakJapanese" data-args='["せん"]' class="py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-black text-xs transition active:scale-95 flex items-center gap-2">
                                    <i class="fa-solid fa-volume-high"></i> Escuchar "せん"
                                </button>
                            </div>
                        </div>

                        <!-- Las 2 Mutaciones Clave de Miles -->
                        <div class="space-y-2">
                            <span class="text-xs font-bold text-rose-300 uppercase tracking-wide flex items-center gap-1.5">
                                <i class="fa-solid fa-triangle-exclamation text-rose-400"></i> Las 2 Mutaciones Fonéticas de Miles: 3.000 y 8.000
                            </span>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <!-- 3.000 -->
                                <div class="p-4 rounded-2xl bg-slate-950 border-2 border-amber-500/40 space-y-2.5 shadow-md">
                                    <div class="flex items-center justify-between">
                                        <span class="text-2xl font-black font-mono text-amber-300">3.000</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["さんぜん"]' class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition active:scale-90">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <div class="text-xl font-jp font-black text-white">三千 → さん<span class="text-amber-400 underline decoration-amber-500 decoration-2">ぜん</span></div>
                                        <div class="text-xs font-mono text-slate-400">sanzen (Rendaku sonorización)</div>
                                    </div>
                                    <p class="text-[11px] text-amber-200/90 leading-tight">
                                        La 's' muta a 'z': <em>sen</em> → <strong>ぜん (zen)</strong>. ¡Nunca digas sansen!
                                    </p>
                                </div>

                                <!-- 8.000 -->
                                <div class="p-4 rounded-2xl bg-slate-950 border-2 border-amber-500/40 space-y-2.5 shadow-md">
                                    <div class="flex items-center justify-between">
                                        <span class="text-2xl font-black font-mono text-amber-300">8.000</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["はっせん"]' class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition active:scale-90">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <div class="text-xl font-jp font-black text-white">八千 → <span class="text-amber-400 underline decoration-amber-500 decoration-2">はっ</span>せん</div>
                                        <div class="text-xs font-mono text-slate-400">hassen (Sokuon asimilación)</div>
                                    </div>
                                    <p class="text-[11px] text-amber-200/90 leading-tight">
                                        <em>Hachi</em> se contrae en tsu pequeño: <strong>はっ (ha-) + せん (sen)</strong>. ¡Nunca digas hachisen!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Tabla completa 1.000 a 9.000 -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <span class="text-xs font-bold text-slate-300 uppercase tracking-wide block">
                                Miles del 1.000 al 9.000 (Kanji y Pronunciación):
                            </span>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>1.000 千:</strong> せん</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["せん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>2.000 二千:</strong> にせん</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["にせん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-between text-amber-300">
                                    <span><strong>3.000 三千:</strong> さんぜん ⭐</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["さんぜん"]' class="text-amber-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>4.000 四千:</strong> よんせん</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["よんせん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>5.000 五千:</strong> ごせん</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ごせん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>6.000 六千:</strong> ろくせん</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ろくせん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>7.000 七千:</strong> ななせん</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ななせん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-between text-amber-300">
                                    <span><strong>8.000 八千:</strong> はっせん ⭐</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["はっせん"]' class="text-amber-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <span><strong>9.000 九千:</strong> きゅうせん</span>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["きゅうせん"]' class="text-slate-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
                        </div>

                        <!-- Ejemplos del Taller PDF y Precios (円) -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-2">
                                <i class="fa-solid fa-yen-sign text-amber-400"></i> Precios en Yenes (円 / えん) y Preguntar "¿Cuánto cuesta?"
                            </span>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-white">2.500 円 (二千五百円)</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["にせんごひゃくえん"]' class="text-amber-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                    </div>
                                    <div class="font-jp text-slate-300">にせんごひゃくえんです。</div>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-white">8.600 円 (八千六百円)</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["はっせんろっぴゃくえん"]' class="text-amber-400 hover:text-white"><i class="fa-solid fa-volume-high"></i></button>
                                    </div>
                                    <div class="font-jp text-slate-300">はっせんろっぴゃくえんです。(¡Doble mutación!)</div>
                                </div>
                            </div>
                            <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between gap-2">
                                <div>
                                    <span class="font-bold text-white">Diálogo de compra:</span> 「これは いくらですか。」 → 「2,500円です。」
                                </div>
                                <button type="button" data-action="speakJapanese" data-args='["これはいくらですか。にせんごひゃくえんです。"]' class="py-1 px-3 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] shrink-0">
                                    <i class="fa-solid fa-volume-high"></i> Diálogo
                                </button>
                            </div>
                        </div>

                        <!-- Botón siguiente paso -->
                        <div class="pt-2 text-center">
                            <button type="button" data-action="setNumbersLessonStep" data-args='[6]'
                                class="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition active:scale-95 inline-flex items-center gap-2">
                                <span>Paso 6: Ensamblado Jerárquico de 3 y 4 Dígitos</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else if (curStep === 6) {
                // PASO 6: EL ENSAMBLADO MAESTRO (100 A 9.999)
                stepBodyHtml = `
                    <div class="space-y-5 animate-fade-in">
                        <div class="space-y-1">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                                <i class="fa-solid fa-cubes text-emerald-400"></i> Lección 6 de 7: Ensamblado Jerárquico de 3 y 4 Dígitos (100 a 9.999)
                            </span>
                            <h3 class="text-xl sm:text-2xl font-black text-white">El Ensamblado Maestro: De 100 a 9.999</h3>
                            <p class="text-xs sm:text-sm text-slate-300">
                                Para armar cualquier número de hasta 4 dígitos antes del 万, el orden jerárquico es estricto de izquierda a derecha:
                                <strong class="text-amber-300 font-mono">[Miles] + [Centenas] + [Decenas] + [Unidades]</strong>.
                            </p>
                        </div>

                        <!-- Caso A: Completo sin ceros -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-bold text-amber-300 uppercase tracking-wide">
                                    Caso A: Número Completo sin Ceros (ej: 348 y 615)
                                </span>
                            </div>
                            <div class="space-y-2 text-xs">
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-base font-bold text-white">348</span>
                                        <button type="button" data-action="speakJapanese" data-args='["さんびゃくよんじゅうはち"]' class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                                            <i class="fa-solid fa-volume-high"></i> Escuchar
                                        </button>
                                    </div>
                                    <div class="flex flex-wrap gap-1.5 font-jp font-bold">
                                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">300: さんびゃく (¡mutación!)</span>
                                        <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-200">40: よんじゅう</span>
                                        <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-200">8: はち</span>
                                    </div>
                                    <div class="text-slate-300 pt-0.5 font-jp">→ <strong>さんびゃくよんじゅうはち</strong> <em>(sanbyaku yonjuu hachi)</em></div>
                                </div>

                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-base font-bold text-white">615</span>
                                        <button type="button" data-action="speakJapanese" data-args='["ろっぴゃくじゅうご"]' class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                                            <i class="fa-solid fa-volume-high"></i> Escuchar
                                        </button>
                                    </div>
                                    <div class="flex flex-wrap gap-1.5 font-jp font-bold">
                                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">600: ろっぴゃく (¡mutación!)</span>
                                        <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-200">10: じゅう (sin ichi)</span>
                                        <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-200">5: ご</span>
                                    </div>
                                    <div class="text-slate-300 pt-0.5 font-jp">→ <strong>ろっぴゃくじゅうご</strong> <em>(roppyaku juu go)</em></div>
                                </div>
                            </div>
                        </div>

                        <!-- Caso B: Cero Intermedio -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide block">
                                Caso B: ¡Cuidado con el Cero Intermedio! en la Decena (ej: 308)
                            </span>
                            <p class="text-xs text-slate-300">
                                En español decimos "trescientos <em>ocho</em>". En japonés <strong>la posición del cero simplemente SE OMITE</strong>. ¡No se dice "cero" ni "diez"!
                            </p>
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                                <div class="flex items-center justify-between">
                                    <span class="font-mono text-base font-bold text-white">308</span>
                                    <button type="button" data-action="speakJapanese" data-args='["さんびゃくはち"]' class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                                        <i class="fa-solid fa-volume-high"></i> Escuchar
                                    </button>
                                </div>
                                <div class="flex flex-wrap gap-1.5 font-jp font-bold">
                                    <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">300: さんびゃく</span>
                                    <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">0 decenas: (SE OMITE)</span>
                                    <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-200">8: はち</span>
                                </div>
                                <div class="text-slate-300 pt-0.5 font-jp">→ <strong>さんびゃくはち</strong> <em>(sanbyaku hachi)</em></div>
                            </div>
                        </div>

                        <!-- Caso C: Cero al Final -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide block">
                                Caso C: Cero al Final en la Unidad (ej: 850)
                            </span>
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                                <div class="flex items-center justify-between">
                                    <span class="font-mono text-base font-bold text-white">850</span>
                                    <button type="button" data-action="speakJapanese" data-args='["はっぴゃくごじゅう"]' class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                                        <i class="fa-solid fa-volume-high"></i> Escuchar
                                    </button>
                                </div>
                                <div class="flex flex-wrap gap-1.5 font-jp font-bold">
                                    <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">800: はっぴゃく</span>
                                    <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-200">50: ごじゅう</span>
                                    <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">0 unidades: (SE OMITE)</span>
                                </div>
                                <div class="text-slate-300 pt-0.5 font-jp">→ <strong>はっぴゃくごじゅう</strong> <em>(happyaku gojuu)</em></div>
                            </div>
                        </div>

                        <!-- Caso D: 4 Dígitos con Miles y Mutaciones Combinadas (ej: 3.650 y 8.308) -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide block">
                                Caso D: 4 Dígitos con Miles y Mutaciones Dobles (ej: 3.650 y 8.308)
                            </span>
                            <p class="text-xs text-slate-300">
                                Para números de 4 dígitos, sumas los miles (千) respetando las mutaciones de 3.000 (さんぜん) y 8.000 (はっせん):
                            </p>
                            <div class="space-y-2 text-xs">
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-base font-bold text-white">3.650 (三千六百五十)</span>
                                        <button type="button" data-action="speakJapanese" data-args='["さんぜんろっぴゃくごじゅう"]' class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                                            <i class="fa-solid fa-volume-high"></i> Escuchar
                                        </button>
                                    </div>
                                    <div class="flex flex-wrap gap-1.5 font-jp font-bold">
                                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">3.000: さんぜん (mutación!)</span>
                                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">600: ろっぴゃく (mutación!)</span>
                                        <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-200">50: ごじゅう</span>
                                    </div>
                                    <div class="text-slate-300 pt-0.5 font-jp">→ <strong>さんぜん ろっぴゃく ごじゅう</strong> <em>(sanzen roppyaku gojuu)</em></div>
                                </div>

                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-base font-bold text-white">8.308 (八千三百八)</span>
                                        <button type="button" data-action="speakJapanese" data-args='["はっせんさんびゃくはち"]' class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                                            <i class="fa-solid fa-volume-high"></i> Escuchar
                                        </button>
                                    </div>
                                    <div class="flex flex-wrap gap-1.5 font-jp font-bold">
                                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">8.000: はっせん (mutación!)</span>
                                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">300: さんびゃく (mutación!)</span>
                                        <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-200">8: はち</span>
                                    </div>
                                    <div class="text-slate-300 pt-0.5 font-jp">→ <strong>はっせん さんびゃく はち</strong> <em>(hassen sanbyaku hachi)</em></div>
                                </div>
                            </div>
                        </div>

                        <!-- Tarjeta de Transición fluida al Paso 7: El Salto al 万 (man) -->
                        <div class="numbers-step-transition-card p-5 sm:p-6 rounded-2xl border-2 space-y-3 text-center">
                            <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 text-2xl mb-1 shadow-md">
                                <i class="fa-solid fa-layer-group"></i>
                            </div>
                            <h4 class="text-lg sm:text-xl font-black text-white">¿Y qué pasa después del 9.999? ¡El Salto al 万 (man)!</h4>
                            <p class="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                                En español agrupamos los números grandes de 3 en 3 ceros (miles, millones). Pero en Japón, la unidad elemental de grandes cifras cambia a <strong class="text-amber-300">bloques de 4 ceros</strong>: el <strong>万 (10.000)</strong>.
                            </p>
                            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
                                <button type="button" data-action="setNumbersLessonStep" data-args='[7]'
                                    class="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition active:scale-95 inline-flex items-center gap-2">
                                    <span>Avanzar al Paso 7: El Sistema del 万 (man) y Millones</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                                <button type="button" data-action="setNumbersMode" data-args='["builder"]'
                                    class="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition active:scale-95 inline-flex items-center gap-2">
                                    <i class="fa-solid fa-puzzle-piece"></i>
                                    <span>Probar en Constructor Lego</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (curStep === 7) {
                // PASO 7: LA REGLA BÁSICA DEL 万 (man) Y MILLONES
                stepBodyHtml = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="space-y-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                                <i class="fa-solid fa-layer-group text-indigo-400"></i> Lección 7 de 7: Grandes Cifras y el Sistema del 万 (man: 10.000 a Millones)
                            </span>
                            <div class="flex items-center justify-between gap-3 flex-wrap">
                                <h3 class="text-xl sm:text-2xl font-black text-white">La Regla Básica del 万 (man): 10.000 a Millones</h3>
                                <button type="button" data-action="showKanaStrokeModal" data-args='["万"]' class="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                                    <i class="fa-solid fa-paintbrush text-rose-400"></i> Ver Trazos de 万
                                </button>
                            </div>
                            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                A diferencia de 100 (<strong>百 / hyaku</strong>) o 1.000 (<strong>千 / sen</strong>), donde no necesitas decir "uno" por delante, para 10.000 <strong class="text-amber-300">siempre es obligatorio</strong> incluir el 1 (<strong>一 / ichi</strong>):
                            </p>
                        </div>

                        <!-- Regla de oro de 一万 (ichiman) -->
                        <div class="p-5 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 space-y-3 shadow-lg">
                            <div class="flex items-center justify-between gap-3 flex-wrap">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-jp text-2xl font-black">
                                        万
                                    </div>
                                    <div>
                                        <div class="font-jp text-xl sm:text-2xl font-black text-white">
                                            一万 (<span class="text-amber-300">いちまん</span> / <em>ichiman</em>) = 10.000
                                        </div>
                                        <div class="text-xs text-rose-300 font-semibold mt-0.5">
                                            ⚠️ Decir solo "man" es incorrecto.
                                        </div>
                                    </div>
                                </div>
                                <button type="button" data-action="speakJapanese" data-args='["いちまん"]' class="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 active:scale-95 shadow-md">
                                    <i class="fa-solid fa-volume-high"></i> Escuchar "いちまん"
                                </button>
                            </div>
                        </div>

                        <!-- A partir de ahí... -->
                        <div class="space-y-3">
                            <p class="text-xs sm:text-sm text-slate-300">
                                A partir de ahí, cuentas cuántos <strong>"paquetes de 10.000"</strong> tienes agrupando mentalmente en <strong>bloques de 4 ceros (myriads)</strong>:
                            </p>

                            <!-- Tabla Estilo Oficial de la Clase -->
                            <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                                <table class="w-full text-left border-collapse text-xs sm:text-sm">
                                    <thead>
                                        <tr class="border-b border-slate-800 text-slate-400 font-bold bg-slate-900/80">
                                            <th class="py-3 px-3 sm:px-4">Número</th>
                                            <th class="py-3 px-3 sm:px-4">En bloques de 4</th>
                                            <th class="py-3 px-3 sm:px-4">Kanji</th>
                                            <th class="py-3 px-3 sm:px-4">Lectura (Hiragana / Rōmaji)</th>
                                            <th class="py-3 px-3 sm:px-4">Equivalente mental</th>
                                            <th class="py-3 px-2 sm:px-3 text-center">Audio</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-800/60 font-mono">
                                        <tr class="hover:bg-slate-900/50 transition">
                                            <td class="py-3 px-3 sm:px-4 font-black text-white">10.000</td>
                                            <td class="py-3 px-3 sm:px-4 text-amber-300 font-bold">1,0000</td>
                                            <td class="py-3 px-3 sm:px-4 font-jp text-lg font-bold text-white">一万</td>
                                            <td class="py-3 px-3 sm:px-4 text-slate-200">
                                                <span class="font-jp text-base font-bold text-amber-300">いちまん</span>
                                                <span class="text-xs text-slate-400 ml-1.5">(ichiman)</span>
                                            </td>
                                            <td class="py-3 px-3 sm:px-4 text-sky-300 font-semibold font-sans">1 man</td>
                                            <td class="py-3 px-2 sm:px-3 text-center font-sans">
                                                <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["いちまん"]' class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90" title="Escuchar">
                                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="hover:bg-slate-900/50 transition">
                                            <td class="py-3 px-3 sm:px-4 font-black text-white">20.000</td>
                                            <td class="py-3 px-3 sm:px-4 text-amber-300 font-bold">2,0000</td>
                                            <td class="py-3 px-3 sm:px-4 font-jp text-lg font-bold text-white">二万</td>
                                            <td class="py-3 px-3 sm:px-4 text-slate-200">
                                                <span class="font-jp text-base font-bold text-amber-300">にまん</span>
                                                <span class="text-xs text-slate-400 ml-1.5">(niman)</span>
                                            </td>
                                            <td class="py-3 px-3 sm:px-4 text-sky-300 font-semibold font-sans">2 man</td>
                                            <td class="py-3 px-2 sm:px-3 text-center font-sans">
                                                <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["にまん"]' class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90" title="Escuchar">
                                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="hover:bg-slate-900/50 transition">
                                            <td class="py-3 px-3 sm:px-4 font-black text-white">50.000</td>
                                            <td class="py-3 px-3 sm:px-4 text-amber-300 font-bold">5,0000</td>
                                            <td class="py-3 px-3 sm:px-4 font-jp text-lg font-bold text-white">五万</td>
                                            <td class="py-3 px-3 sm:px-4 text-slate-200">
                                                <span class="font-jp text-base font-bold text-amber-300">ごまん</span>
                                                <span class="text-xs text-slate-400 ml-1.5">(goman)</span>
                                            </td>
                                            <td class="py-3 px-3 sm:px-4 text-sky-300 font-semibold font-sans">5 man</td>
                                            <td class="py-3 px-2 sm:px-3 text-center font-sans">
                                                <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["ごまん"]' class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90" title="Escuchar">
                                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="hover:bg-slate-900/50 transition">
                                            <td class="py-3 px-3 sm:px-4 font-black text-white">100.000</td>
                                            <td class="py-3 px-3 sm:px-4 text-amber-300 font-bold">10,0000</td>
                                            <td class="py-3 px-3 sm:px-4 font-jp text-lg font-bold text-white">十万</td>
                                            <td class="py-3 px-3 sm:px-4 text-slate-200">
                                                <span class="font-jp text-base font-bold text-amber-300">じゅうまん</span>
                                                <span class="text-xs text-slate-400 ml-1.5">(jūman)</span>
                                            </td>
                                            <td class="py-3 px-3 sm:px-4 text-sky-300 font-semibold font-sans">10 man</td>
                                            <td class="py-3 px-2 sm:px-3 text-center font-sans">
                                                <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["じゅうまん"]' class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90" title="Escuchar">
                                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="hover:bg-slate-900/50 transition">
                                            <td class="py-3 px-3 sm:px-4 font-black text-white">1.000.000</td>
                                            <td class="py-3 px-3 sm:px-4 text-amber-300 font-bold">100,0000</td>
                                            <td class="py-3 px-3 sm:px-4 font-jp text-lg font-bold text-white">百万</td>
                                            <td class="py-3 px-3 sm:px-4 text-slate-200">
                                                <span class="font-jp text-base font-bold text-amber-300">ひゃくまん</span>
                                                <span class="text-xs text-slate-400 ml-1.5">(hyakuman)</span>
                                            </td>
                                            <td class="py-3 px-3 sm:px-4 text-sky-300 font-semibold font-sans">100 man</td>
                                            <td class="py-3 px-2 sm:px-3 text-center font-sans">
                                                <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["ひゃくまん"]' class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90" title="Escuchar">
                                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="hover:bg-slate-900/50 transition">
                                            <td class="py-3 px-3 sm:px-4 font-black text-white">10.000.000</td>
                                            <td class="py-3 px-3 sm:px-4 text-amber-300 font-bold">1000,0000</td>
                                            <td class="py-3 px-3 sm:px-4 font-jp text-lg font-bold text-white">一千万</td>
                                            <td class="py-3 px-3 sm:px-4 text-slate-200">
                                                <span class="font-jp text-base font-bold text-amber-300">いっせんまん</span>
                                                <span class="text-xs text-slate-400 ml-1.5">(issenman)</span>
                                            </td>
                                            <td class="py-3 px-3 sm:px-4 text-sky-300 font-semibold font-sans">1000 man</td>
                                            <td class="py-3 px-2 sm:px-3 text-center font-sans">
                                                <button aria-label="Escuchar" type="button" data-action="speakJapanese" data-args='["いっせんまん"]' class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90" title="Escuchar">
                                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Explicación de cómo armar números combinados con 万 -->
                        <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                            <span class="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                                <i class="fa-solid fa-calculator text-amber-400"></i> ¿Cómo descomponer números grandes paso a paso?
                            </span>
                            <p class="text-xs text-slate-300">
                                Para decir cualquier número superior a 10.000, <strong>corta los últimos 4 dígitos</strong>. Lo que queda a la izquierda es la cantidad de <code>万 (man)</code>, y lo de la derecha es el resto tradicional:
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                                <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-base font-bold text-white">25.400</span>
                                        <button type="button" data-action="speakJapanese" data-args='["にまんごせんよんひゃく"]' class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                                            <i class="fa-solid fa-volume-high"></i> Escuchar
                                        </button>
                                    </div>
                                    <div class="text-slate-400 font-mono">Bloques de 4: <strong class="text-amber-300">2,5400</strong></div>
                                    <div class="text-slate-300 space-y-0.5">
                                        <div>• 2 paquetes de diez mil: <strong class="text-white font-jp">にまん</strong> (2 man)</div>
                                        <div>• 5 mil: <strong class="text-white font-jp">ごせん</strong> (5 sen)</div>
                                        <div>• 400: <strong class="text-white font-jp">よんひゃく</strong> (4 hyaku)</div>
                                    </div>
                                    <div class="text-emerald-300 font-jp font-bold pt-1 border-t border-slate-800">
                                        → にまん ごせん よんひゃく
                                    </div>
                                </div>

                                <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="font-mono text-base font-bold text-white">135.000</span>
                                        <button type="button" data-action="speakJapanese" data-args='["じゅうさんまんごせん"]' class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                                            <i class="fa-solid fa-volume-high"></i> Escuchar
                                        </button>
                                    </div>
                                    <div class="text-slate-400 font-mono">Bloques de 4: <strong class="text-amber-300">13,5000</strong></div>
                                    <div class="text-slate-300 space-y-0.5">
                                        <div>• 13 paquetes de diez mil: <strong class="text-white font-jp">じゅうさんまん</strong> (13 man)</div>
                                        <div>• 5 mil: <strong class="text-white font-jp">ごせん</strong> (5 sen)</div>
                                    </div>
                                    <div class="text-emerald-300 font-jp font-bold pt-1 border-t border-slate-800">
                                        → じゅうさんまん ごせん
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Banner Final de Celebración y Práctica (Theme-Aware & Alto Contraste) -->
                        <div class="numbers-achievement-banner p-6 sm:p-7 rounded-3xl text-center space-y-3.5">
                            <div class="text-4xl">🎓 🌟</div>
                            <h4 class="banner-title text-xl sm:text-2xl font-black">¡Has completado el Sistema Numérico Japonés Completo!</h4>
                            <p class="banner-desc text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                                Desde los dígitos 0 al 10, decenas, centenas (con sus 3 mutaciones fonéticas), miles (con sus 2 mutaciones) y la regla de los grandes números con el <strong>万 (man)</strong>. ¡Ahora pon a prueba tu oído y agilidad mental!
                            </p>
                            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
                                <button type="button" data-action="startAdvancedNumbersMode" data-args='["builder"]'
                                    class="py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition active:scale-95 inline-flex items-center gap-2">
                                    <i class="fa-solid fa-puzzle-piece"></i>
                                    <span>Practicar Lego con ≥ 10.000</span>
                                </button>
                                <button type="button" data-action="startAdvancedNumbersMode" data-args='["dictation"]'
                                    class="banner-secondary-btn py-3 px-5 rounded-2xl font-black text-xs sm:text-sm border transition active:scale-95 inline-flex items-center gap-2">
                                    <i class="fa-solid fa-headphones"></i>
                                    <span>Dictado Auditivo de Grandes Números</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }

            // Footer navigation buttons (7 pasos interactivos)
            const navFooterHtml = `
                <div class="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
                    <button type="button" data-action="setNumbersLessonStep" data-args='[${curStep - 1}]' ${curStep === 1 ? 'disabled' : ''}
                        class="py-2.5 px-4 sm:px-5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 font-bold text-xs sm:text-sm transition flex items-center gap-2 active:scale-95">
                        <i class="fa-solid fa-arrow-left"></i>
                        <span>Anterior</span>
                    </button>
                    <span class="text-xs text-slate-400 font-medium">
                        Paso <strong class="text-white">${curStep}</strong> de 7
                    </span>
                    ${curStep < 7 ? `
                        <button type="button" data-action="setNumbersLessonStep" data-args='[${curStep + 1}]'
                            class="py-2.5 px-4 sm:px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-95">
                            <span>Siguiente (Paso ${curStep + 1})</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    ` : `
                        <button type="button" data-action="setNumbersMode" data-args='["builder"]'
                            class="py-2.5 px-4 sm:px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-95">
                            <span>Practicar en Lego</span>
                            <i class="fa-solid fa-puzzle-piece"></i>
                        </button>
                    `}
                </div>
            `;

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
                    ${stepperHtml}
                    ${stepBodyHtml}
                    ${navFooterHtml}
                </div>
            `;
        }

        function generateNumbersChallenge() {
            const num = getRandomNumberForRange(state.numbersConfig.range || 'partial');
            const data = numberToJapanese(num);
            state.numbersCurrentChallenge = {
                number: num,
                ...data
            };
            return state.numbersCurrentChallenge;
        }

        // ==========================================================
        // DINÁMICA 1: CONSTRUCTOR LEGO DE NÚMEROS (DRAG & DROP, REORDENABLE, KANJI & KANA)
        // ==========================================================
        let numbersLegoDraggedIdx = null;

        function onNumberLegoDragStart(e, idx) {
            numbersLegoDraggedIdx = idx;
            if (e.dataTransfer) {
                e.dataTransfer.setData('text/plain', String(idx));
                e.dataTransfer.effectAllowed = 'move';
            }
        }

        function onNumberLegoDragOver(e) {
            e.preventDefault();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = 'move';
            }
        }

        function onNumberLegoDrop(e, targetIdx) {
            e.preventDefault();
            if (numbersLegoDraggedIdx === null || numbersLegoDraggedIdx === targetIdx) return;
            const [chip] = state.numbersPlacedChips.splice(numbersLegoDraggedIdx, 1);
            state.numbersPlacedChips.splice(targetIdx, 0, chip);
            numbersLegoDraggedIdx = null;
            renderNumbersLego();
        }

        function onNumberLegoDragEnd() {
            numbersLegoDraggedIdx = null;
        }

        function moveNumberLegoChip(fromIdx, direction) {
            const toIdx = fromIdx + direction;
            if (toIdx < 0 || toIdx >= state.numbersPlacedChips.length) return;
            const [chip] = state.numbersPlacedChips.splice(fromIdx, 1);
            state.numbersPlacedChips.splice(toIdx, 0, chip);
            renderNumbersLego();
        }

        function toggleNumberLegoScriptMode() {
            if (!state.numbersConfig) state.numbersConfig = {};
            const cur = state.numbersConfig.scriptMode || 'kana';
            state.numbersConfig.scriptMode = (cur === 'kana') ? 'kanji' : 'kana';
            saveStateToStorage();
            nextNumbersLegoChallenge();
        }

        function nextNumbersLegoChallenge() {
            const ch = generateNumbersChallenge();
            state.numbersCurrentChallenge = ch;
            state.numbersPlacedChips = [];
            const isKanji = (state.numbersConfig && state.numbersConfig.scriptMode === 'kanji');
            const targetBlocks = isKanji ? (ch.kanjiBlocks || [ch.kanji]) : ch.blocks;
            state.numbersBankChips = generateLegoBank(targetBlocks, ch.number, isKanji);
            renderNumbersLego();
        }

        function renderNumbersLego(feedback) {
            const container = document.getElementById('numbersPracticeExerciseArea') || document.getElementById('numbersWorkspaceContainer');
            if (!container) return;

            const ch = state.numbersCurrentChallenge;
            if (!ch) return;

            const isKanji = (state.numbersConfig && state.numbersConfig.scriptMode === 'kanji');

            let mutationAlertHtml = '';
            if (ch.hasMutation && !isKanji) {
                mutationAlertHtml = `
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] font-bold mt-2">
                        <i class="fa-solid fa-triangle-exclamation text-rose-400"></i>
                        <span>¡Atención: Contiene mutación fonética especial en Kanas!</span>
                    </div>
                `;
            }

            const placedChipsHtml = state.numbersPlacedChips.length === 0
                ? `<div class="w-full text-center py-4 text-xs sm:text-sm text-slate-500 italic select-none">
                    <i class="fa-solid fa-hand-pointer mr-1"></i> Toca las fichas de abajo para construir el número. Puedes arrastrarlas o moverlas con las flechas ⬅️ ➡️ si te equivocas.
                   </div>`
                : state.numbersPlacedChips.map((chip, idx) => `
                    <div draggable="true"
                        data-dragstart="onNumberLegoDragStart"
                        data-dragover="onNumberLegoDragOver"
                        data-drop="onNumberLegoDrop"
                        data-dragend="onNumberLegoDragEnd" data-args='["$event", ${idx}]'
                        class="px-2.5 sm:px-3.5 py-2 rounded-2xl bg-amber-500 text-slate-950 font-jp font-black shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-grab active:cursor-grabbing hover:bg-amber-400 transition animate-card-pop select-none group border border-amber-300/40">
                        <button aria-label="Mover hacia la izquierda" type="button" data-action="moveNumberLegoChip" data-args='[${idx}, -1]' ${idx === 0 ? 'disabled class="opacity-20 pointer-events-none p-1"' : 'class="p-1 text-slate-900 hover:text-black transition"'} title="Mover hacia la izquierda">
                            <i class="fa-solid fa-arrow-left text-xs"></i>
                        </button>
                        <span class="text-lg sm:text-xl font-bold px-1">${chip.text}</span>
                        <button aria-label="Mover hacia la derecha" type="button" data-action="moveNumberLegoChip" data-args='[${idx}, 1]' ${idx === state.numbersPlacedChips.length - 1 ? 'disabled class="opacity-20 pointer-events-none p-1"' : 'class="p-1 text-slate-900 hover:text-black transition"'} title="Mover hacia la derecha">
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </button>
                        <button aria-label="Regresar al banco sin borrar el resto" type="button" data-action="removeNumberLegoChip" data-args='[${idx}]' title="Regresar al banco sin borrar el resto"
                            class="w-6 h-6 rounded-lg bg-slate-950/20 hover:bg-rose-600 hover:text-white text-slate-950 flex items-center justify-center transition ml-1 text-xs">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                `).join('');

            const bankChipsHtml = state.numbersBankChips.map((chip) => `
                <button type="button" data-action="addNumberLegoChip" data-args='["${chip.id}"]'
                    class="px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700/80 hover:border-amber-400 text-slate-100 font-jp text-lg sm:text-xl font-bold shadow-md hover:bg-slate-800 hover:scale-105 active:scale-95 transition">
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
                                    <span class="font-bold text-base text-white">¡Excelente! Número armado correctamente</span>
                                </div>
                                <button type="button" data-action="speakJapanese" data-args='["${ch.hiragana}"]' class="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 font-bold text-xs flex items-center gap-1.5 transition">
                                    <i class="fa-solid fa-volume-high"></i> Escuchar
                                </button>
                            </div>
                            <div class="text-sm font-jp text-white font-bold tracking-wide flex items-center gap-3">
                                <span class="text-amber-300 font-mono text-base font-black">[${ch.kanji}]</span>
                                <span>${ch.hiragana}</span>
                                <span class="text-xs font-mono text-emerald-300 font-normal">(${ch.romaji})</span>
                            </div>
                            ${ch.mutationInfo ? `<div class="text-xs text-amber-300 font-semibold bg-amber-500/10 p-2 rounded-lg border border-amber-500/30"><i class="fa-solid fa-star text-amber-400 mr-1"></i> ${ch.mutationInfo}</div>` : ''}
                            <div class="pt-2">
                                <button type="button" data-action="nextNumbersLegoChallenge" class="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
                                    <span>Siguiente Número</span>
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
                                <span class="font-bold text-base text-white">Aún no coincide el orden o las fichas</span>
                            </div>
                            <p class="text-xs text-rose-300">
                                Puedes reordenar las fichas arrastrándolas o con las flechas ⬅️ ➡️ sin tener que borrar todo.
                            </p>
                            <div class="flex gap-2 pt-1">
                                <button type="button" data-action="clearNumberLego" class="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition">
                                    <i class="fa-solid fa-rotate-left mr-1"></i> Limpiar Todo
                                </button>
                                <button type="button" data-action="speakJapanese" data-args='["${ch.hiragana}"]' class="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition">
                                    <i class="fa-solid fa-volume-high mr-1"></i> Pista de Audio
                                </button>
                            </div>
                        </div>
                    `;
                }
            }

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
                    
                    <!-- Script Mode Toggle & Help Header -->
                    <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3 flex-wrap">
                        <div class="flex items-center gap-2 text-xs text-slate-300">
                            <span class="font-bold uppercase tracking-wider text-slate-400">Modo de Fichas:</span>
                            <button type="button" data-action="toggleNumberLegoScriptMode"
                                class="px-3 py-1 rounded-full text-xs font-bold border transition flex items-center gap-1.5 ${isKanji ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-sky-500/20 text-sky-300 border-sky-500/40'}">
                                <i class="fa-solid fa-arrows-rotate text-[10px]"></i>
                                <span>${isKanji ? '漢 Kanji (一, 二, 三...)' : 'あ Hiragana (いち, に...)'}</span>
                            </button>
                        </div>
                        <span class="text-[11px] text-slate-400 flex items-center gap-1">
                            <i class="fa-solid fa-arrows-left-right text-amber-400"></i> Fichas reordenables y móviles
                        </span>
                    </div>

                    <!-- Top Challenge Banner -->
                    <div class="text-center space-y-2">
                        <span class="text-xs uppercase font-bold text-slate-400 tracking-widest block">
                            Construye en ${isKanji ? 'Kanji (漢字)' : 'Hiragana (ひらがな)'} el Número:
                        </span>
                        <div class="inline-flex items-center justify-center gap-3">
                            <h3 class="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight bg-slate-950 px-6 py-2 rounded-2xl border border-slate-800 shadow-inner">
                                ${ch.number}
                            </h3>
                            <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["${ch.hiragana}"]' title="Escuchar pronunciación"
                                class="w-12 h-12 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 flex items-center justify-center transition active:scale-90 shadow-md">
                                <i class="fa-solid fa-volume-high text-lg"></i>
                            </button>
                        </div>
                        ${mutationAlertHtml}
                    </div>

                    <!-- Placed Chips Construction Area -->
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-xs text-slate-400 px-1">
                            <span class="font-bold flex items-center gap-1.5">
                                <i class="fa-solid fa-cubes-stacked text-amber-400"></i> Tu Construcción (arrastra o usa flechas para mover):
                            </span>
                            ${state.numbersPlacedChips.length > 0 ? `
                                <button type="button" data-action="clearNumberLego" class="text-rose-400 hover:text-rose-300 font-bold transition text-xs">
                                    <i class="fa-solid fa-trash-can mr-1"></i> Limpiar Todo
                                </button>
                            ` : ''}
                        </div>
                        <div id="legoPlacedChipsArea" class="min-h-[80px] p-3.5 rounded-2xl bg-slate-950 border-2 border-dashed ${state.numbersPlacedChips.length > 0 ? 'border-amber-500/60' : 'border-slate-800'} flex flex-wrap items-center gap-2.5 transition">
                            ${placedChipsHtml}
                        </div>
                    </div>

                    <!-- Action Controls -->
                    <div class="flex gap-3">
                        <button type="button" data-action="checkNumberLego" ${state.numbersPlacedChips.length === 0 ? 'disabled' : ''}
                            class="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/20 active:scale-98 transition flex items-center justify-center gap-2">
                            <i class="fa-solid fa-check"></i>
                            <span>Comprobar Respuesta</span>
                        </button>
                    </div>

                    <!-- Feedback Display -->
                    ${feedbackHtml}

                    <!-- Bank of Chips Area -->
                    <div class="space-y-2 pt-2 border-t border-slate-800">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
                            Banco de Fichas (Selecciona cada ficha):
                        </span>
                        <div id="legoBankChipsArea" class="flex flex-wrap justify-center gap-2.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                            ${bankChipsHtml.length > 0 ? bankChipsHtml : '<span class="text-xs text-slate-500">Todas las fichas han sido colocadas.</span>'}
                        </div>
                    </div>

                </div>
            `;
        }

        function addNumberLegoChip(chipId) {
            const idx = state.numbersBankChips.findIndex(c => c.id === chipId);
            if (idx !== -1) {
                const [chip] = state.numbersBankChips.splice(idx, 1);
                state.numbersPlacedChips.push(chip);
                renderNumbersLego();
            }
        }

        function removeNumberLegoChip(placedIdx) {
            if (placedIdx >= 0 && placedIdx < state.numbersPlacedChips.length) {
                const [chip] = state.numbersPlacedChips.splice(placedIdx, 1);
                state.numbersBankChips.push(chip);
                renderNumbersLego();
            }
        }

        function clearNumberLego() {
            while (state.numbersPlacedChips.length > 0) {
                const chip = state.numbersPlacedChips.pop();
                state.numbersBankChips.push(chip);
            }
            renderNumbersLego();
        }

        function checkNumberLego() {
            const ch = state.numbersCurrentChallenge;
            if (!ch || state.numbersPlacedChips.length === 0) return;

            const isKanji = (state.numbersConfig && state.numbersConfig.scriptMode === 'kanji');
            const assembled = state.numbersPlacedChips.map(c => c.text).join('');
            const targetKanji = ch.kanji || (typeof numberToKanji === 'function' ? numberToKanji(ch.number).kanji : '');
            const targetAnswer = isKanji ? targetKanji : ch.hiragana;
            const isCorrect = (assembled === targetAnswer);

            if (isCorrect) {
                state.numbersConfig.streak = (state.numbersConfig.streak || 0) + 1;
                state.numbersConfig.score = (state.numbersConfig.score || 0) + 1;
                addXP(10);
                saveStateToStorage();
                updateNumbersHeaderStats();
                speakJapanese(ch.hiragana);
                renderNumbersLego({ isCorrect: true });
            } else {
                state.numbersConfig.streak = 0;
                saveStateToStorage();
                updateNumbersHeaderStats();
                renderNumbersLego({ isCorrect: false });
            }
        }

        // ==========================================================
        // DINÁMICA 2: DICTADO AUDITIVO (CON TECLADO EN PANTALLA & PC)
        // ==========================================================
        let numbersDictationLocked = false;

        function nextNumbersDictationChallenge() {
            const ch = generateNumbersChallenge();
            state.numbersDictationInput = '';
            numbersDictationLocked = false;
            renderNumbersDictation();
            setTimeout(() => {
                playNumbersDictationAudio();
            }, 300);
        }

        function playNumbersDictationAudio() {
            const ch = state.numbersCurrentChallenge;
            if (ch && ch.hiragana) {
                speakJapanese(ch.hiragana);
            }
        }

        function renderNumbersDictation(feedback) {
            const container = document.getElementById('numbersPracticeExerciseArea') || document.getElementById('numbersWorkspaceContainer');
            if (!container) return;

            const ch = state.numbersCurrentChallenge;
            if (!ch) return;

            const displayValue = state.numbersDictationInput.length > 0
                ? state.numbersDictationInput
                : '<span class="text-slate-600 font-normal tracking-normal text-3xl">_ _ _</span>';

            let feedbackHtml = '';
            if (feedback) {
                if (feedback.isCorrect) {
                    feedbackHtml = `
                        <div class="p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-200 space-y-2 animate-card-pop">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i>
                                    <span class="font-bold text-base text-white">¡Oído de Samurai! Número Correcto</span>
                                </div>
                                <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">+10 XP</span>
                            </div>
                            <div class="text-sm font-jp text-white font-bold">
                                ${ch.number} = ${ch.hiragana} <span class="text-xs font-mono text-emerald-300 font-normal">(${ch.romaji})</span>
                            </div>
                            ${ch.mutationInfo ? `<div class="text-xs text-amber-300 font-semibold bg-amber-500/10 p-2 rounded-lg border border-amber-500/30"><i class="fa-solid fa-star text-amber-400 mr-1"></i> ${ch.mutationInfo}</div>` : ''}
                            <div class="pt-2">
                                <button type="button" data-action="nextNumbersDictationChallenge" class="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
                                    <span>Siguiente Audio</span>
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
                                <span class="font-bold text-base text-white">No era ese número</span>
                            </div>
                            <p class="text-xs text-rose-300">
                                El número dictado era <strong class="text-white font-mono text-sm">${ch.number}</strong> (${ch.hiragana} - ${ch.romaji}).
                            </p>
                            <div class="flex gap-2 pt-1">
                                <button type="button" data-action="playNumbersDictationAudio" class="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition">
                                    <i class="fa-solid fa-volume-high mr-1"></i> Repetir Audio
                                </button>
                                <button type="button" data-action="nextNumbersDictationChallenge" class="py-2 px-4 rounded-xl bg-rose-600/40 hover:bg-rose-600/60 border border-rose-500/40 text-white text-xs font-bold transition">
                                    Continuar
                                </button>
                            </div>
                        </div>
                    `;
                }
            }

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 max-w-xl mx-auto">
                    
                    <!-- Audio Centerpiece -->
                    <div class="text-center space-y-3">
                        <span class="text-xs uppercase font-bold text-slate-400 tracking-widest block">Dictado en Japonés:</span>
                        <button type="button" data-action="playNumbersDictationAudio"
                            class="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white flex flex-col items-center justify-center gap-1 shadow-xl shadow-sky-500/30 hover:scale-105 active:scale-95 transition mx-auto group">
                            <i class="fa-solid fa-volume-high text-3xl group-hover:animate-pulse"></i>
                            <span class="text-[10px] font-bold uppercase tracking-wider">Escuchar</span>
                        </button>
                        <p class="text-xs text-slate-400">
                            Toca el botón para repetir el audio tantas veces como necesites.
                        </p>
                    </div>

                    <!-- Digits Display Box -->
                    <div class="space-y-1">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">Tu Respuesta Numérica:</span>
                        <div id="numbersDictationDisplay"
                            class="h-16 px-3 rounded-2xl bg-slate-950 border-2 border-slate-700 flex items-center justify-center font-mono ${state.numbersDictationInput.length >= 7 ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} font-black text-amber-300 tracking-wider shadow-inner">
                            ${displayValue}
                        </div>
                    </div>

                    <!-- Feedback Display -->
                    ${feedbackHtml}

                    <!-- 3x4 On-Screen Keypad (Optimized for Mobile Touch & PC) -->
                    <div class="space-y-2">
                        <div class="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-xs mx-auto">
                            <button type="button" data-action="pressNumbersKeypad" data-args='["1"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">1</button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["2"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">2</button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["3"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">3</button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["4"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">4</button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["5"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">5</button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["6"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">6</button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["7"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">7</button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["8"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">8</button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["9"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">9</button>
                            <button aria-label="Borrar" type="button" data-action="pressNumbersKeypad" data-args='["backspace"]' class="h-12 sm:h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 font-bold text-sm shadow-md active:scale-95 transition flex items-center justify-center">
                                <i class="fa-solid fa-delete-left text-lg"></i>
                            </button>
                            <button type="button" data-action="pressNumbersKeypad" data-args='["0"]' class="h-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-white font-mono text-2xl font-black shadow-md hover:bg-slate-800 active:scale-95 transition">0</button>
                            <button aria-label="Comprobar" type="button" data-action="checkNumbersDictation" class="h-12 sm:h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 font-bold text-sm shadow-md active:scale-95 transition flex items-center justify-center">
                                <i class="fa-solid fa-check text-lg"></i>
                            </button>
                        </div>
                        <p class="text-[11px] text-slate-500 text-center pt-1">
                            <span class="hidden sm:inline">En PC puedes usar el teclado numérico directamente (Enter para enviar).</span>
                        </p>
                    </div>

                </div>
            `;
        }

        function pressNumbersKeypad(key) {
            if (numbersDictationLocked) return;
            if (key === 'backspace') {
                state.numbersDictationInput = state.numbersDictationInput.slice(0, -1);
            } else if (key === 'clear') {
                state.numbersDictationInput = '';
            } else if (key >= '0' && key <= '9') {
                if (state.numbersDictationInput.length < 8) {
                    state.numbersDictationInput += key;
                }
            }
            renderNumbersDictation();
        }

        function checkNumbersDictation() {
            const ch = state.numbersCurrentChallenge;
            if (!ch || state.numbersDictationInput.length === 0 || numbersDictationLocked) return;

            numbersDictationLocked = true;
            const enteredNum = parseInt(state.numbersDictationInput, 10);
            const isCorrect = enteredNum === ch.number;

            if (isCorrect) {
                state.numbersConfig.streak = (state.numbersConfig.streak || 0) + 1;
                state.numbersConfig.score = (state.numbersConfig.score || 0) + 1;
                addXP(10);
                saveStateToStorage();
                updateNumbersHeaderStats();
                renderNumbersDictation({ isCorrect: true });
            } else {
                state.numbersConfig.streak = 0;
                saveStateToStorage();
                updateNumbersHeaderStats();
                renderNumbersDictation({ isCorrect: false });
            }
        }

        // ==========================================================
        // DINÁMICA 3: QUIZ RÁPIDO (CON ATAJOS 1..4 DE TECLADO EN PC)
        // ==========================================================
        let currentNumbersQuiz = null;

        function generateQuizQuestion(targetNum, range) {
            const targetData = numberToJapanese(targetNum);
            const qType = Math.random() < 0.5 ? 'number_to_hira' : 'hira_to_number';
            const options = [{
                text: qType === 'number_to_hira' ? targetData.hiragana : String(targetNum),
                isCorrect: true,
                data: targetData
            }];

            const used = new Set([qType === 'number_to_hira' ? targetData.hiragana : String(targetNum)]);
            let attempts = 0;
            while (options.length < 4 && attempts < 50) {
                attempts++;
                let dNum = getRandomNumberForRange(range);
                
                // Specific distractor traps for exam mutations
                if (targetNum === 300 && !used.has('さんひゃく') && qType === 'number_to_hira') {
                    used.add('さんひゃく');
                    options.push({ text: 'さんひゃく', isCorrect: false, distractorNote: 'Trampa: 300 muta a さんびゃく' });
                    continue;
                }
                if (targetNum === 600 && !used.has('ろくひゃく') && qType === 'number_to_hira') {
                    used.add('ろくひゃく');
                    options.push({ text: 'ろくひゃく', isCorrect: false, distractorNote: 'Trampa: 600 muta a ろっぴゃく' });
                    continue;
                }
                if (targetNum === 800 && !used.has('はちひゃく') && qType === 'number_to_hira') {
                    used.add('はちひゃく');
                    options.push({ text: 'はちひゃく', isCorrect: false, distractorNote: 'Trampa: 800 muta a はっぴゃく' });
                    continue;
                }

                if (dNum === targetNum) continue;
                const dData = numberToJapanese(dNum);
                const optText = qType === 'number_to_hira' ? dData.hiragana : String(dNum);
                if (used.has(optText)) continue;

                used.add(optText);
                options.push({ text: optText, isCorrect: false, data: dData });
            }

            // Shuffle options
            for (let j = options.length - 1; j > 0; j--) {
                const k = Math.floor(Math.random() * (j + 1));
                [options[j], options[k]] = [options[k], options[j]];
            }

            return {
                qType,
                targetNum,
                targetData,
                prompt: qType === 'number_to_hira' ? String(targetNum) : targetData.hiragana,
                instruction: qType === 'number_to_hira' ? '¿Cuál es la lectura correcta en Hiragana?' : '¿Qué número corresponde a esta lectura?',
                options
            };
        }

        function nextNumbersQuizChallenge() {
            const num = getRandomNumberForRange(state.numbersConfig.range || 'partial');
            currentNumbersQuiz = generateQuizQuestion(num, state.numbersConfig.range || 'partial');
            renderNumbersQuiz();
        }

        function renderNumbersQuiz(feedback) {
            const container = document.getElementById('numbersPracticeExerciseArea') || document.getElementById('numbersWorkspaceContainer');
            if (!container) return;

            const q = currentNumbersQuiz;
            if (!q) return;

            const optionsHtml = q.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950 border-2 border-slate-800 hover:border-amber-400 text-slate-100 hover:bg-slate-800';
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
                    <button type="button" data-action="checkNumbersQuiz" data-args='[${idx}]' ${feedback ? 'disabled' : ''}
                        class="p-4 sm:p-5 rounded-2xl text-left font-jp text-lg sm:text-xl font-bold transition flex items-center justify-between gap-3 ${btnStyle} active:scale-98">
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
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i>
                                    <span class="font-bold text-base text-white">¡Correcto!</span>
                                </div>
                                <button type="button" data-action="speakJapanese" data-args='["${q.targetData.hiragana}"]' class="px-3 py-1 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition flex items-center gap-1.5">
                                    <i class="fa-solid fa-volume-high"></i> Escuchar
                                </button>
                            </div>
                            <div class="text-sm font-jp text-white">
                                ${q.targetNum} = ${q.targetData.hiragana} (${q.targetData.romaji})
                            </div>
                            ${q.targetData.mutationInfo ? `<div class="text-xs text-amber-300 font-semibold bg-amber-500/10 p-2 rounded-lg border border-amber-500/30"><i class="fa-solid fa-star text-amber-400 mr-1"></i> ${q.targetData.mutationInfo}</div>` : ''}
                            <div class="pt-2">
                                <button type="button" data-action="nextNumbersQuizChallenge" class="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
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
                                <span class="font-bold text-base text-white">Respuesta incorrecta</span>
                            </div>
                            <p class="text-xs text-rose-300">
                                La respuesta correcta era <strong class="text-white font-jp text-sm">${q.qType === 'number_to_hira' ? q.targetData.hiragana : q.targetNum}</strong> (${q.targetData.romaji}).
                            </p>
                            <div class="flex gap-2 pt-1">
                                <button type="button" data-action="speakJapanese" data-args='["${q.targetData.hiragana}"]' class="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition">
                                    <i class="fa-solid fa-volume-high mr-1"></i> Escuchar Pronunciación
                                </button>
                                <button type="button" data-action="nextNumbersQuizChallenge" class="py-2 px-4 rounded-xl bg-rose-600/40 hover:bg-rose-600/60 border border-rose-500/40 text-white text-xs font-bold transition">
                                    Continuar
                                </button>
                            </div>
                        </div>
                    `;
                }
            }

            container.innerHTML = `
                <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 max-w-xl mx-auto">
                    
                    <!-- Question Header -->
                    <div class="text-center space-y-2">
                        <span class="text-xs uppercase font-bold text-slate-400 tracking-widest block">${q.instruction}</span>
                        <div class="inline-flex items-center justify-center gap-3">
                            <h3 class="text-4xl sm:text-5xl font-black text-white ${q.qType === 'number_to_hira' ? 'font-mono' : 'font-jp'} tracking-tight bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800 shadow-inner">
                                ${q.prompt}
                            </h3>
                            <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["${q.targetData.hiragana}"]' title="Escuchar pronunciación"
                                class="w-12 h-12 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 flex items-center justify-center transition active:scale-90 shadow-md">
                                <i class="fa-solid fa-volume-high text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <!-- 4 Options Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="numbersQuizGrid">
                        ${optionsHtml}
                    </div>

                    <!-- Keyboard Tip -->
                    <p class="text-[11px] text-slate-500 text-center">
                        <span class="hidden sm:inline">Atajo en PC: Presiona las teclas <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">1</kbd> a <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">4</kbd> para responder al instante.</span>
                    </p>

                    <!-- Feedback Display -->
                    ${feedbackBannerHtml}

                </div>
            `;
        }

        function checkNumbersQuiz(selectedIndex) {
            const q = currentNumbersQuiz;
            if (!q || selectedIndex < 0 || selectedIndex >= q.options.length) return;

            const selectedOpt = q.options[selectedIndex];
            const isCorrect = selectedOpt.isCorrect;

            if (isCorrect) {
                state.numbersConfig.streak = (state.numbersConfig.streak || 0) + 1;
                state.numbersConfig.score = (state.numbersConfig.score || 0) + 1;
                addXP(10);
                saveStateToStorage();
                updateNumbersHeaderStats();
                speakJapanese(q.targetData.hiragana);
                renderNumbersQuiz({ isCorrect: true, selectedIndex });
            } else {
                state.numbersConfig.streak = 0;
                saveStateToStorage();
                updateNumbersHeaderStats();
                renderNumbersQuiz({ isCorrect: false, selectedIndex });
            }
        }

        // ==========================================================
        // SUB-MÓDULOS DE GUÍA Y TEORÍA (MODULAR Y SIN SCROLL INFINITO)
        // ==========================================================

        function renderNumbersGuideSubContent(subTab) {
            const container = document.getElementById('numbersGuideSubContent');
            if (!container) return;

            if (subTab === 'lesson') {
                renderNumbersLesson();
            } else if (subTab === 'basics') {
                renderNumbersGuideBasics(container);
            } else if (subTab === 'mutations') {
                renderNumbersGuideMutations(container);
            } else if (subTab === 'man') {
                renderNumbersGuideMan(container);
            } else if (subTab === 'kanji') {
                renderNumbersGuideKanji(container);
            }
        }

        // Sub-ficha 1: Dígitos Base (0-10) y Decenas (11-99)
        function renderNumbersGuideBasics(container) {
            container.innerHTML = `
                <div class="space-y-6 animate-fade-in">
                    <!-- Ficha: Dígitos Base 0 a 10 y Lecturas Clave -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-1">
                                    <i class="fa-solid fa-list-ol text-amber-400"></i> Fundamentos
                                </span>
                                <h3 class="text-xl sm:text-2xl font-black text-white">
                                    Dígitos Base (0 - 10) y Lecturas Clave
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-300 mt-0.5">
                                    Aprende la pronunciación estándar y las lecturas alternativas críticas que cambian según el contexto (horas, meses, conteo).
                                </p>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2">
                            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(digit => {
                                const d = DIGIT_HIRAGANA[digit];
                                return `
                                    <div class="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition shadow-sm">
                                        <div>
                                            <div class="flex items-center gap-2">
                                                <span class="font-mono text-xl font-black text-amber-300">${digit}</span>
                                                <span class="font-jp text-lg font-bold text-white">${d.hira}</span>
                                            </div>
                                            <div class="text-[11px] font-mono text-slate-400">${d.romaji}${d.alt ? ` <span class="text-amber-400/90 font-bold">/ ${d.alt}</span>` : ''}</div>
                                        </div>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["${d.hira}"]' class="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition active:scale-95 shadow">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <div class="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                            <span class="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
                                <i class="fa-solid fa-triangle-exclamation text-amber-400"></i> Lecturas alternativas fundamentales para recordar:
                            </span>
                            <p>• <strong>4:</strong> Habitualmente <strong class="text-white">よん (yon)</strong> al componer números (ej. 40 = よんじゅう). <strong class="text-slate-400">し (shi)</strong> se reserva para meses (abril / しがつ) o posiciones fijas.</p>
                            <p>• <strong>7:</strong> Habitualmente <strong class="text-white">なな (nana)</strong> para componer números (ej. 70 = ななじゅう). <strong class="text-slate-400">しち (shichi)</strong> se usa para julio (しちがつ) o la hora 7:00 (しちじ).</p>
                            <p>• <strong>9:</strong> Habitualmente <strong class="text-white">きゅう (kyuu)</strong> para componer números (ej. 90 = きゅうじゅう). <strong class="text-slate-400">く (ku)</strong> se usa para septiembre (くがつ) o 9:00 (くじ).</p>
                        </div>
                    </div>

                    <!-- Ficha: Regla Combinatoria de Decenas (11 - 99) -->
                    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-1">
                                    <i class="fa-solid fa-calculator text-amber-400"></i> Estructura Aditiva
                                </span>
                                <h3 class="text-xl sm:text-2xl font-black text-white">
                                    Fórmula de Decenas (11 - 99)
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-300 mt-0.5">
                                    El japonés es 100% regular y matemático: combina el multiplicador + じゅう (10) + unidad.
                                </p>
                            </div>
                        </div>

                        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                            <div class="flex items-center justify-center gap-2 text-sm sm:text-base font-bold text-white font-mono flex-wrap text-center py-1">
                                <span class="px-3.5 py-1.5 rounded-xl bg-slate-800 text-amber-300 border border-slate-700">[Dígito 1-9]</span>
                                <span class="text-slate-400 text-lg">+</span>
                                <span class="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-jp font-bold">じゅう (juu)</span>
                                <span class="text-slate-400 text-lg">+</span>
                                <span class="px-3.5 py-1.5 rounded-xl bg-slate-800 text-amber-300 border border-slate-700">[Dígito 1-9]</span>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                                    <div><span class="font-mono text-amber-400 font-bold text-sm">14:</span> <span class="font-jp text-white font-bold ml-1">じゅうよん</span></div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["じゅうよん"]' class="text-slate-400 hover:text-amber-300"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                                    <div><span class="font-mono text-amber-400 font-bold text-sm">20:</span> <span class="font-jp text-white font-bold ml-1">にじゅう</span></div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["にじゅう"]' class="text-slate-400 hover:text-amber-300"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                                    <div><span class="font-mono text-amber-400 font-bold text-sm">47:</span> <span class="font-jp text-white font-bold ml-1">よんじゅうなな</span></div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["よんじゅうなな"]' class="text-slate-400 hover:text-amber-300"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                                    <div><span class="font-mono text-amber-400 font-bold text-sm">99:</span> <span class="font-jp text-white font-bold ml-1">きゅうじゅうきゅう</span></div>
                                    <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["きゅうじゅうきゅう"]' class="text-slate-400 hover:text-amber-300"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Sub-ficha 2: Las 5 Mutaciones Fonéticas Clave (Centenas y Miles)
        function renderNumbersGuideMutations(container) {
            container.innerHTML = `
                <div class="space-y-6 animate-fade-in">
                    <!-- Ficha: Mutaciones Fonéticas Clave (300, 600, 800, 3000, 8000) -->
                    <div class="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
                        <div>
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-1">
                                <i class="fa-solid fa-star text-amber-400"></i> Reglas Fonéticas Sagradas
                            </span>
                            <h3 class="text-xl sm:text-2xl font-black text-white">
                                Las 5 Mutaciones Fonéticas Oficiales (Centenas y Miles)
                            </h3>
                            <p class="text-xs sm:text-sm text-slate-300 mt-1">
                                La regla estándar es <span class="font-mono text-amber-300 font-bold">[Dígito] + ひゃく (100)</span> y <span class="font-mono text-amber-300 font-bold">[Dígito] + せん (1.000)</span>. Sin embargo, en exactamente <strong>5 casos</strong> el sonido se transforma por asimilación articulatoria:
                            </p>
                        </div>

                        <!-- 3 Mutaciones de Centenas -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                                <i class="fa-solid fa-circle-dot text-amber-400 text-[10px]"></i> Las 3 Mutaciones de Centenas (百 - hyaku)
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <!-- 300 -->
                                <div class="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2 hover:border-amber-400 transition shadow-sm">
                                    <div class="flex items-center justify-between">
                                        <span class="text-2xl font-black font-mono text-amber-300">300</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["さんびゃく"]' class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-lg font-jp font-black text-amber-400">三百</span>
                                        <div class="text-base font-jp font-bold text-white">
                                            さん<span class="text-amber-400 underline decoration-amber-500 decoration-2">びゃく</span>
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">sanbyaku</div>
                                    <p class="text-[11px] text-amber-200/90 leading-tight">
                                        <strong>Mutación Sonora (Dakuon):</strong> 'h' cambia a 'b'. <em>¡Nunca digas sanhyaku!</em>
                                    </p>
                                </div>

                                <!-- 600 -->
                                <div class="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2 hover:border-amber-400 transition shadow-sm">
                                    <div class="flex items-center justify-between">
                                        <span class="text-2xl font-black font-mono text-amber-300">600</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ろっぴゃく"]' class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-lg font-jp font-black text-amber-400">六百</span>
                                        <div class="text-base font-jp font-bold text-white">
                                            <span class="text-amber-400 underline decoration-amber-500 decoration-2">ろっ</span><span class="text-amber-400 underline decoration-amber-500 decoration-2">ぴゃく</span>
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">roppyaku</div>
                                    <p class="text-[11px] text-amber-200/90 leading-tight">
                                        <strong>Doble Mutación:</strong> roku se convierte en <strong class="text-white">ろっ</strong> y hyaku muta a <strong class="text-white">ぴゃく</strong> (Handakuon).
                                    </p>
                                </div>

                                <!-- 800 -->
                                <div class="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2 hover:border-amber-400 transition shadow-sm">
                                    <div class="flex items-center justify-between">
                                        <span class="text-2xl font-black font-mono text-amber-300">800</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["はっぴゃく"]' class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center transition">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-lg font-jp font-black text-amber-400">八百</span>
                                        <div class="text-base font-jp font-bold text-white">
                                            <span class="text-amber-400 underline decoration-amber-500 decoration-2">はっ</span><span class="text-amber-400 underline decoration-amber-500 decoration-2">ぴゃく</span>
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">happyaku</div>
                                    <p class="text-[11px] text-amber-200/90 leading-tight">
                                        <strong>Doble Mutación:</strong> hachi se convierte en <strong class="text-white">はっ</strong> y hyaku muta a <strong class="text-white">ぴゃく</strong> (Handakuon).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- 2 Mutaciones de Miles -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                                <i class="fa-solid fa-gem text-sky-400 text-[10px]"></i> Las 2 Mutaciones de Miles (千 - sen)
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <!-- 3.000 -->
                                <div class="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-2 hover:border-sky-400 transition shadow-sm">
                                    <div class="flex items-center justify-between">
                                        <span class="text-2xl font-black font-mono text-sky-300">3.000</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["さんぜん"]' class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 flex items-center justify-center transition">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-lg font-jp font-black text-sky-400">三千</span>
                                        <div class="text-base font-jp font-bold text-white">
                                            さん<span class="text-sky-400 underline decoration-sky-500 decoration-2">ぜん</span>
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">sanzen</div>
                                    <p class="text-[11px] text-sky-200/90 leading-tight">
                                        <strong>Mutación Sonora (Dakuon):</strong> 's' cambia a 'z'. <em>¡Nunca digas sansen!</em>
                                    </p>
                                </div>

                                <!-- 8.000 -->
                                <div class="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-2 hover:border-sky-400 transition shadow-sm">
                                    <div class="flex items-center justify-between">
                                        <span class="text-2xl font-black font-mono text-sky-300">8.000</span>
                                        <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["はっせん"]' class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 flex items-center justify-center transition">
                                            <i class="fa-solid fa-volume-high text-xs"></i>
                                        </button>
                                    </div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-lg font-jp font-black text-sky-400">八千</span>
                                        <div class="text-base font-jp font-bold text-white">
                                            <span class="text-sky-400 underline decoration-sky-500 decoration-2">はっ</span>せん
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">hassen</div>
                                    <p class="text-[11px] text-sky-200/90 leading-tight">
                                        <strong>Asimilación y Parada (Sokuon):</strong> hachi se asimila a <strong class="text-white">はっ</strong> + sen. <em>¡Nunca digas hachisen!</em>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Reglas de Oro -->
                        <div class="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                            <div class="flex items-center gap-2 text-amber-300 font-bold">
                                <i class="fa-solid fa-circle-check text-sm"></i>
                                <span>Regla de Oro para 100 y 1.000:</span>
                            </div>
                            <p>• <strong>100:</strong> Es simplemente <strong class="text-white font-jp">ひゃく</strong> (hyaku). ¡Nunca se dice <em>ichihyaku</em>! Igual que 10 es solo <strong class="text-white font-jp">じゅう</strong> (juu).</p>
                            <p>• <strong>1.000:</strong> Es simplemente <strong class="text-white font-jp">せん</strong> (sen). ¡Nunca se dice <em>ichisen</em>!</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Sub-ficha 3: El Sistema del 万 (10.000 a Millones)
        function renderNumbersGuideMan(container) {
            container.innerHTML = `
                <div class="space-y-6 animate-fade-in">
                    <div class="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-1 border border-indigo-500/30">
                                    <i class="fa-solid fa-layer-group text-indigo-400"></i> Bloques de 4 Dígitos (Myriads)
                                </span>
                                <h3 class="text-xl sm:text-2xl font-black text-white">
                                    La Regla Básica del 万 (man): 10.000 a Millones
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-300 mt-0.5">
                                    A diferencia de 100 (<strong>百 / hyaku</strong>) o 1.000 (<strong>千 / sen</strong>), donde no necesitas decir "uno" por delante, para 10.000 <strong class="text-amber-300">siempre es obligatorio</strong> incluir el 1 (<strong>一 / ichi</strong>):
                                </p>
                            </div>
                        </div>

                        <!-- Card de 一万 -->
                        <div class="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 flex items-center justify-between flex-wrap gap-3">
                            <div>
                                <div class="font-jp text-xl sm:text-2xl font-black text-white">
                                    一万 (<span class="text-amber-300">いちまん</span> / <em>ichiman</em>) = 10.000
                                </div>
                                <p class="text-xs text-rose-300 font-semibold mt-0.5">
                                    ⚠️ Decir solo "man" es incorrecto.
                                </p>
                            </div>
                            <button type="button" data-action="speakJapanese" data-args='["いちまん"]' class="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 active:scale-95 shadow">
                                <i class="fa-solid fa-volume-high"></i> Escuchar "いちまん"
                            </button>
                        </div>

                        <p class="text-xs text-slate-300">
                            A partir de ahí, cuentas cuántos <strong>"paquetes de 10.000"</strong> tienes agrupando mentalmente en <strong>bloques de 4 ceros</strong>:
                        </p>

                        <!-- Tabla completa de 万 -->
                        <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                            <table class="w-full text-left border-collapse text-xs sm:text-sm">
                                <thead>
                                    <tr class="border-b border-slate-800 text-slate-400 font-bold bg-slate-900/80">
                                        <th class="py-2.5 px-3 sm:px-4">Número</th>
                                        <th class="py-2.5 px-3 sm:px-4">En bloques de 4</th>
                                        <th class="py-2.5 px-3 sm:px-4">Kanji</th>
                                        <th class="py-2.5 px-3 sm:px-4">Lectura (Hiragana / Rōmaji)</th>
                                        <th class="py-2.5 px-3 sm:px-4">Equivalente mental</th>
                                        <th class="py-2.5 px-2 text-center">Audio</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-800/60 font-mono">
                                    <tr class="hover:bg-slate-900/50 transition">
                                        <td class="py-2.5 px-3 sm:px-4 font-black text-white">10.000</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-amber-300 font-bold">1,0000</td>
                                        <td class="py-2.5 px-3 sm:px-4 font-jp font-bold text-white">一万</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-slate-200">
                                            <span class="font-jp font-bold text-amber-300">いちまん</span>
                                            <span class="text-xs text-slate-400 ml-1">(ichiman)</span>
                                        </td>
                                        <td class="py-2.5 px-3 sm:px-4 text-sky-300 font-semibold font-sans">1 man</td>
                                        <td class="py-2.5 px-2 text-center font-sans">
                                            <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["いちまん"]' class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-slate-900/50 transition">
                                        <td class="py-2.5 px-3 sm:px-4 font-black text-white">20.000</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-amber-300 font-bold">2,0000</td>
                                        <td class="py-2.5 px-3 sm:px-4 font-jp font-bold text-white">二万</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-slate-200">
                                            <span class="font-jp font-bold text-amber-300">にまん</span>
                                            <span class="text-xs text-slate-400 ml-1">(niman)</span>
                                        </td>
                                        <td class="py-2.5 px-3 sm:px-4 text-sky-300 font-semibold font-sans">2 man</td>
                                        <td class="py-2.5 px-2 text-center font-sans">
                                            <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["にまん"]' class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-slate-900/50 transition">
                                        <td class="py-2.5 px-3 sm:px-4 font-black text-white">50.000</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-amber-300 font-bold">5,0000</td>
                                        <td class="py-2.5 px-3 sm:px-4 font-jp font-bold text-white">五万</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-slate-200">
                                            <span class="font-jp font-bold text-amber-300">ごまん</span>
                                            <span class="text-xs text-slate-400 ml-1">(goman)</span>
                                        </td>
                                        <td class="py-2.5 px-3 sm:px-4 text-sky-300 font-semibold font-sans">5 man</td>
                                        <td class="py-2.5 px-2 text-center font-sans">
                                            <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ごまん"]' class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-slate-900/50 transition">
                                        <td class="py-2.5 px-3 sm:px-4 font-black text-white">100.000</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-amber-300 font-bold">10,0000</td>
                                        <td class="py-2.5 px-3 sm:px-4 font-jp font-bold text-white">十万</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-slate-200">
                                            <span class="font-jp font-bold text-amber-300">じゅうまん</span>
                                            <span class="text-xs text-slate-400 ml-1">(jūman)</span>
                                        </td>
                                        <td class="py-2.5 px-3 sm:px-4 text-sky-300 font-semibold font-sans">10 man</td>
                                        <td class="py-2.5 px-2 text-center font-sans">
                                            <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["じゅうまん"]' class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-slate-900/50 transition">
                                        <td class="py-2.5 px-3 sm:px-4 font-black text-white">1.000.000</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-amber-300 font-bold">100,0000</td>
                                        <td class="py-2.5 px-3 sm:px-4 font-jp font-bold text-white">百万</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-slate-200">
                                            <span class="font-jp font-bold text-amber-300">ひゃくまん</span>
                                            <span class="text-xs text-slate-400 ml-1">(hyakuman)</span>
                                        </td>
                                        <td class="py-2.5 px-3 sm:px-4 text-sky-300 font-semibold font-sans">100 man</td>
                                        <td class="py-2.5 px-2 text-center font-sans">
                                            <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["ひゃくまん"]' class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-slate-900/50 transition">
                                        <td class="py-2.5 px-3 sm:px-4 font-black text-white">10.000.000</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-amber-300 font-bold">1000,0000</td>
                                        <td class="py-2.5 px-3 sm:px-4 font-jp font-bold text-white">一千万</td>
                                        <td class="py-2.5 px-3 sm:px-4 text-slate-200">
                                            <span class="font-jp font-bold text-amber-300">いっせんまん</span>
                                            <span class="text-xs text-slate-400 ml-1">(issenman)</span>
                                        </td>
                                        <td class="py-2.5 px-3 sm:px-4 text-sky-300 font-semibold font-sans">1000 man</td>
                                        <td class="py-2.5 px-2 text-center font-sans">
                                            <button aria-label="Escuchar pronunciación" type="button" data-action="speakJapanese" data-args='["いっせんまん"]' class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 inline-flex items-center justify-center transition active:scale-90"><i class="fa-solid fa-volume-high text-xs"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }

        // Sub-ficha 4: Caligrafía Oficial en Kanji (KanjiVG)
        function renderNumbersGuideKanji(container) {
            const numKanjis = NUMBER_KANJI_DATA.slice(0, 15);
            const timeKanjis = NUMBER_KANJI_DATA.slice(15);
            const renderCard = (k) => `
                <div class="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-rose-500/50 flex flex-col items-center text-center transition group shadow-sm">
                    <div class="font-jp text-3xl font-black text-white group-hover:text-rose-400 transition mt-1">${k.kanji}</div>
                    <div class="text-xs font-bold text-amber-400 mt-1">${k.romaji}</div>
                    <div class="text-[10px] text-slate-400 font-jp">${k.kana}</div>
                    <div class="inline-block mt-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                        ${k.strokes} ${k.strokes === 1 ? 'trazo' : 'trazos'}
                    </div>
                    <div class="flex items-center gap-1.5 mt-2.5 w-full">
                        <button type="button" data-action="showKanaStrokeModal" data-args='["${k.kanji}"]' class="flex-1 py-1 px-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-bold transition flex items-center justify-center gap-1" title="Ver animación de trazo">
                            <i class="fa-solid fa-eye text-[10px]"></i> Ver
                        </button>
                        <button type="button" data-action="practiceKanjiInCanvas" data-args='["${k.kanji}"]' class="flex-1 py-1 px-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold transition flex items-center justify-center gap-1" title="Dibujar en el lienzo">
                            <i class="fa-solid fa-pen text-[10px]"></i> Lienzo
                        </button>
                    </div>
                </div>
            `;

            container.innerHTML = `
                <div class="space-y-6 animate-fade-in">
                    <div class="bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border-2 border-rose-500/40 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-1">
                                    <i class="fa-solid fa-paintbrush text-rose-400"></i> Caligrafía Oficial KanjiVG
                                </span>
                                <h3 class="text-xl sm:text-2xl font-black text-white">
                                    Guía de Trazos: Números, Moneda y Tiempo (漢字)
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-300 mt-0.5">
                                    Haz clic en <strong>Ver</strong> para observar la animación trazo por trazo o en <strong>Lienzo</strong> para dibujarlo con retroalimentación caligráfica.
                                </p>
                            </div>
                            <button type="button" data-action="practiceKanjiInCanvas" data-args='["一"]' class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-xs shadow-lg hover:from-rose-500 hover:to-amber-400 transition flex items-center gap-2">
                                <i class="fa-solid fa-pen-nib"></i> Entrenar en Lienzo de Dibujo
                            </button>
                        </div>

                        <!-- Sección 1: Números y Moneda (0 a 万 + 円) -->
                        <div class="space-y-2.5">
                            <span class="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                                <i class="fa-solid fa-hashtag text-amber-400"></i> Números y Moneda (零 a 万 + 円)
                            </span>
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3">
                                ${numKanjis.map(renderCard).join('')}
                            </div>
                        </div>

                        <!-- Sección 2: Tiempo y Calendario (時, 分, 半, 曜日...) -->
                        <div class="space-y-2.5 pt-3 border-t border-slate-800">
                            <span class="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                                <i class="fa-solid fa-clock text-sky-400"></i> Tiempo, Horas y Días de la Semana (時・分・曜日)
                            </span>
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                ${timeKanjis.map(renderCard).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Compatibilidad: llamada directa a renderNumbersGuide
        function renderNumbersGuide() {
            setNumbersPillar('guide');
        }

        // Acciones compuestas usadas desde el HTML (data-action)
        function translateCustomNumberFromInput() {
            translateCustomNumberInput(document.getElementById('customNumberInput').value);
        }

        function startAdvancedNumbersMode(mode) {
            setNumbersRange('10000-plus');
            setNumbersMode(mode);
        }
