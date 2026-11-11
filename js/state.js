// KotoDojo · Estado global y persistencia en localStorage
        // ==========================================
        // STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
        // ==========================================
        const STORAGE_KEY = 'kotodojo_storage_v1';

        // Fecha local (YYYY-MM-DD) para que el día de la racha cambie a medianoche local, no en UTC
        function getLocalDateString(date = new Date()) {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        }

        const state = {
            // Silabario Activo Global ('hiragana' | 'katakana')
            currentSyllabary: 'hiragana',

            // SRS Leitner Map Independiente para Katakana:
            srs_katakana: {},

            // Modo 9 Etapas: Progresión Automática Independiente para Katakana:
            stagesAutoProgress_katakana: {
                unlockedIndex: 0,
                masteredLevels: [],
                selectedLevelId: 'a',
                levelScores: {},
                kanaMastery: {}
            },

            // Práctica manual independiente de Katakana:
            practiceSelectedGroups_katakana: ['a', 'ka'],
            stagesConfig_katakana: {
                selectedSoundGroups: ['a', 'ka'],
                selectedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            },

            xp: 0,
            streak: 1,
            lastActiveDate: getLocalDateString(),
            audioEnabled: true,
            voiceConfig: {
                voiceUri: '',
                preset: 'male',
                pitch: 0.80,
                rate: 0.88
            },
            theme: 'theme-dark',
            strokeStrictness: 'normal',
            sokuonTipDisabled: false, // 'easy' | 'normal' | 'strict'
            currentCategory: 'gojuon',
            wordBuilderMode: 'hira_to_roma', // 'hira_to_roma' | 'roma_to_hira'

            // SRS Leitner Map: [hiragana]: { box: 1|2|3, consecutive: number, reviews: number, lastReviewed: number }
            srs: {},
            srsMatrixFilter: 'all', // 'all' | '1' | '2' | '3'

            // Isolated Custom Practice Pools (for Mochila de Puntos Débiles and Sesión Diaria)
            customPracticePool: null, // Kana[] or null
            customPracticeTitle: null,
            quizCustomPool: null, // Kana[] or null
            quizCustomTitle: null,

            // Shared Practice Sound Groups (for Guided, Blind & Dictation drawing)
            practiceSelectedGroups: ['a', 'ka'], // Default: A + Ka (10)
            autoAdvanceDrawing: true,
            autoAdvanceTimeoutId: null,

            // Guided Drawing State
            selectedDrawingKana: HIRAGANA_DATA[0],
            drawActiveStrokeIdx: 0,
            drawAcceptedStrokes: [],
            drawStrokeStates: [],
            drawIsPeeking: false,

            // Blind Drawing State
            selectedBlindKana: HIRAGANA_DATA[5], // 'か'
            blindActiveStrokeIdx: 0,
            blindAcceptedStrokes: [],
            blindStrokeStates: [],
            blindIsPeeking: false,

            // Dictation Mode State
            selectedDictationKana: HIRAGANA_DATA[0],
            dictationActiveStrokeIdx: 0,
            dictationAcceptedStrokes: [],
            dictationStrokeStates: [],
            dictationIsPeeking: false,

            // Look-alikes State
            lookalikesCurrent: null,
            lookalikesScore: 0,
            lookalikesCombo: 0,
            lookalikesTimerId: null,
            lookalikesNextTimeout: null,
            lookalikesIsPaused: false,
            lookalikesTimeLeft: 2000,

            // Shiritori State
            shiritoriChain: [],
            shiritoriCurrentWord: null,

            // Word Builder State
            currentWordObj: null,
            selectedTiles: [],

            // Sopa de Letras State
            wsGridSize: 10,
            wsTheme: 'nature',
            wsGrid: [],
            wsWords: [],
            wsIsSelecting: false,
            wsStartCell: null,
            wsSelectedCells: [],
            wsFoundWordsCount: 0,

            // Memory State (Adaptive)
            memorySelectedGroups: ['a', 'ka'],
            memoryPairCount: '8',
            memoryCards: [],
            flippedCards: [],
            memoryMoves: 0,
            memoryLock: false,

            // Quiz State
            quizScore: 0,
            currentQuizQuestion: null,

            // Stages Mode (9-Phase Progressive Progression) State
            stagesLearningMode: 'auto', // 'auto' | 'manual'
            stagesAutoProgress: {
                unlockedIndex: 0, // 0 = Fila A unlocked
                masteredLevels: [], // IDs of completed levels ['a', ...]
                selectedLevelId: 'a', // currently selected level ID
                levelScores: {}, // { [levelId]: { bestScore: 90, attempts: 1, lastCompleted: timestamp } }
                kanaMastery: {} // { [hiragana]: { mastery: 0..3, lastPracticed: timestamp } }
            },
            stagesConfig: {
                selectedSoundGroups: ['a', 'ka'], // Default: A + Ka (10)
                selectedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                timerSpeed: 'medium', // 'off' | 'slow' | 'medium' | 'fast'
                timerEnabled: true,
                autoAudio: true,
                lockMode: false
            },
            stageSession: {
                active: false,
                currentStageIndex: 0,
                currentItemIndex: 0,
                pool: [],
                wordsPool: [],
                streamIndex: 0,
                matchedPairs: [],
                selectedPairCard: null,
                isStageLocked: false,
                timerSeconds: 15,
                timerInterval: null,
                stats: {
                    totalCorrect: 0,
                    totalErrors: 0,
                    xpEarned: 0,
                    stageResults: {}
                }
            },

            // Numbers Mode (0 - 99.999.999 & 3-Pillar Architecture) State
            numbersConfig: {
                pillar: 'guide', // 'guide' | 'practice' | 'translator'
                guideSubTab: 'lesson', // 'lesson' | 'basics' | 'mutations' | 'man' | 'kanji'
                range: '10000-plus', // 'partial', '0-10', '11-99', '100-999', '1000-9999', '10000-plus'
                mode: 'builder', // 'builder' | 'dictation' | 'quiz'
                lessonStep: 1, // 1 to 7
                scriptMode: 'kana', // 'kana' | 'kanji'
                yenMode: false, // true to append 円 (えん) in Live Translator
                streak: 0,
                score: 0
            },
            numbersCurrentChallenge: null,
            numbersPlacedChips: [],
            numbersBankChips: [],
            numbersDictationInput: '',

            // Time & Date Mode (Horas, Fechas y Tiempo) State
            timeConfig: {
                mode: 'guide', // 'guide', 'builder', 'listening', 'quiz'
                guideSubTab: 'hours', // 'hours', 'minutes', 'days', 'months', 'weekdays', 'sentences'
                scriptMode: 'kanji', // 'kanji' | 'kana'
                streak: 0,
                score: 0
            },
            timeCurrentChallenge: null,
            timePlacedChips: [],
            timeBankChips: [],
            timeListeningChallenge: null,
            timeQuizChallenge: null,
            timeClockState: {
                hour: 3,
                minute: 30,
                period: 'pm'
            }
        };

        function loadStateFromStorage() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('hiragana_master_storage_v2');
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (typeof parsed.xp === 'number') state.xp = parsed.xp;
                    if (parsed.theme) { state.theme = normalizeThemeKey(parsed.theme); applyTheme(state.theme); } else { applyTheme('theme-dark'); }
                    if (typeof parsed.audioEnabled === 'boolean') state.audioEnabled = parsed.audioEnabled;
                    if (parsed.voiceConfig && typeof parsed.voiceConfig === 'object') {
                        state.voiceConfig = {
                            voiceUri: parsed.voiceConfig.voiceUri || '',
                            preset: parsed.voiceConfig.preset || 'male',
                            pitch: typeof parsed.voiceConfig.pitch === 'number' ? parsed.voiceConfig.pitch : 0.80,
                            rate: typeof parsed.voiceConfig.rate === 'number' ? parsed.voiceConfig.rate : 0.88
                        };
                    }
                    if (typeof parsed.strokeStrictness === 'string') state.strokeStrictness = parsed.strokeStrictness;
                    if (Array.isArray(parsed.practiceSelectedGroups) && parsed.practiceSelectedGroups.length > 0) {
                        state.practiceSelectedGroups = parsed.practiceSelectedGroups;
                    }
                    if (typeof parsed.sokuonTipDisabled === 'boolean') state.sokuonTipDisabled = parsed.sokuonTipDisabled;
                    if (typeof parsed.autoAdvanceDrawing === 'boolean') {
                        state.autoAdvanceDrawing = parsed.autoAdvanceDrawing;
                    }
                    if (parsed.stagesLearningMode) {
                        state.stagesLearningMode = parsed.stagesLearningMode;
                    }
                    if (parsed.stagesAutoProgress && typeof parsed.stagesAutoProgress === 'object') {
                        state.stagesAutoProgress = {
                            unlockedIndex: typeof parsed.stagesAutoProgress.unlockedIndex === 'number' ? parsed.stagesAutoProgress.unlockedIndex : 0,
                            masteredLevels: Array.isArray(parsed.stagesAutoProgress.masteredLevels) ? parsed.stagesAutoProgress.masteredLevels : [],
                            selectedLevelId: parsed.stagesAutoProgress.selectedLevelId || 'a',
                            levelScores: parsed.stagesAutoProgress.levelScores || {},
                            kanaMastery: parsed.stagesAutoProgress.kanaMastery || {}
                        };
                    }
                    if (parsed.stagesConfig && typeof parsed.stagesConfig === 'object') {
                        state.stagesConfig = { ...state.stagesConfig, ...parsed.stagesConfig };
                    }
                    if (Array.isArray(parsed.memorySelectedGroups) && parsed.memorySelectedGroups.length > 0) {
                        state.memorySelectedGroups = parsed.memorySelectedGroups;
                    }
                    if (parsed.memoryPairCount) {
                        state.memoryPairCount = parsed.memoryPairCount;
                    }
                    if (parsed.currentSyllabary === 'katakana' || parsed.currentSyllabary === 'hiragana') {
                        state.currentSyllabary = parsed.currentSyllabary;
                    }
                    if (parsed.stagesAutoProgress_katakana && typeof parsed.stagesAutoProgress_katakana === 'object') {
                        state.stagesAutoProgress_katakana = {
                            unlockedIndex: typeof parsed.stagesAutoProgress_katakana.unlockedIndex === 'number' ? parsed.stagesAutoProgress_katakana.unlockedIndex : 0,
                            masteredLevels: Array.isArray(parsed.stagesAutoProgress_katakana.masteredLevels) ? parsed.stagesAutoProgress_katakana.masteredLevels : [],
                            selectedLevelId: parsed.stagesAutoProgress_katakana.selectedLevelId || 'a',
                            levelScores: parsed.stagesAutoProgress_katakana.levelScores || {},
                            kanaMastery: parsed.stagesAutoProgress_katakana.kanaMastery || {}
                        };
                    }
                    if (parsed.srs_katakana && typeof parsed.srs_katakana === 'object') {
                        state.srs_katakana = parsed.srs_katakana;
                        Object.values(state.srs_katakana).forEach(s => {
                            if (s && typeof s.errors !== 'number') {
                                s.errors = (s.box === 3) ? 0 : (s.box === 2 ? 1 : 0);
                            }
                        });
                    }
                    if (Array.isArray(parsed.practiceSelectedGroups_katakana) && parsed.practiceSelectedGroups_katakana.length > 0) {
                        state.practiceSelectedGroups_katakana = parsed.practiceSelectedGroups_katakana;
                    }
                    if (parsed.stagesConfig_katakana && typeof parsed.stagesConfig_katakana === 'object') {
                        state.stagesConfig_katakana = { ...state.stagesConfig_katakana, ...parsed.stagesConfig_katakana };
                    }
                    if (parsed.srs && typeof parsed.srs === 'object') {
                        state.srs = parsed.srs;
                        // Corrección/migración de datos: asegurar que exista el contador explícito de errores
                        Object.values(state.srs).forEach(s => {
                            if (s && typeof s.errors !== 'number') {
                                if (s.box === 3) {
                                    s.errors = 0;
                                } else if (s.box === 2) {
                                    s.errors = 1;
                                } else {
                                    s.errors = (s.reviews > 0) ? Math.max(1, Math.min(2, s.reviews - (s.consecutive || 0))) : 0;
                                }
                            }
                        });
                    }
                    if (parsed.timeConfig && typeof parsed.timeConfig === 'object') {
                        state.timeConfig = {
                            mode: parsed.timeConfig.mode || 'guide',
                            guideSubTab: parsed.timeConfig.guideSubTab || 'hours',
                            scriptMode: parsed.timeConfig.scriptMode || 'kanji',
                            streak: parsed.timeConfig.streak || 0,
                            score: parsed.timeConfig.score || 0
                        };
                    }
                    if (parsed.numbersConfig && typeof parsed.numbersConfig === 'object') {
                        const rawMode = parsed.numbersConfig.mode;
                        const validPracticeModes = ['builder', 'dictation', 'quiz'];
                        const migratedPillar = parsed.numbersConfig.pillar ||
                            ((rawMode === 'guide' || rawMode === 'lesson') ? 'guide' : (validPracticeModes.includes(rawMode) ? 'practice' : 'guide'));
                        const migratedSubTab = parsed.numbersConfig.guideSubTab ||
                            (rawMode === 'guide' ? 'mutations' : 'lesson');
                        state.numbersConfig = {
                            pillar: ['guide', 'practice', 'translator'].includes(migratedPillar) ? migratedPillar : 'guide',
                            guideSubTab: ['lesson', 'basics', 'mutations', 'man', 'kanji'].includes(migratedSubTab) ? migratedSubTab : 'lesson',
                            range: parsed.numbersConfig.range || '10000-plus',
                            mode: validPracticeModes.includes(rawMode) ? rawMode : 'builder',
                            lessonStep: parsed.numbersConfig.lessonStep || 1,
                            scriptMode: parsed.numbersConfig.scriptMode === 'kanji' ? 'kanji' : 'kana',
                            yenMode: Boolean(parsed.numbersConfig.yenMode),
                            streak: parsed.numbersConfig.streak || 0,
                            score: parsed.numbersConfig.score || 0
                        };
                    }

                    // Check streak date
                    const today = getLocalDateString();
                    if (parsed.lastActiveDate) {
                        const lastDate = new Date(parsed.lastActiveDate);
                        const nowDate = new Date(today);
                        const diffDays = Math.round((nowDate - lastDate) / (1000 * 60 * 60 * 24));
                        if (diffDays === 1) {
                            // Consecutive day
                            state.streak = (parsed.streak || 0) + 1;
                        } else if (diffDays > 1) {
                            // Broken streak
                            state.streak = 1;
                        } else {
                            // Same day (or legacy UTC date one day ahead): keep the saved streak
                            state.streak = parsed.streak || 1;
                        }
                    } else if (typeof parsed.streak === 'number') {
                        state.streak = parsed.streak;
                    }
                    state.lastActiveDate = today;
                }
            } catch (e) {
                console.warn("Could not load from localStorage:", e);
            }
            updateHeaderBadges();
        }

        function saveStateToStorage() {
            try {
                const toSave = {
                    xp: state.xp,
                    streak: state.streak,
                    lastActiveDate: state.lastActiveDate,
                    strokeStrictness: state.strokeStrictness,
                    practiceSelectedGroups: state.practiceSelectedGroups,
                    autoAdvanceDrawing: state.autoAdvanceDrawing,
                    sokuonTipDisabled: state.sokuonTipDisabled,
                    stagesLearningMode: state.stagesLearningMode,
                    stagesAutoProgress: state.stagesAutoProgress,
                    stagesConfig: state.stagesConfig,
                    theme: state.theme,
                    audioEnabled: state.audioEnabled,
                    voiceConfig: state.voiceConfig,
                    memorySelectedGroups: state.memorySelectedGroups,
                    memoryPairCount: state.memoryPairCount,
                    srs: state.srs,
                    numbersConfig: state.numbersConfig,
                    timeConfig: state.timeConfig,
                    currentSyllabary: state.currentSyllabary,
                    srs_katakana: state.srs_katakana,
                    stagesAutoProgress_katakana: state.stagesAutoProgress_katakana,
                    practiceSelectedGroups_katakana: state.practiceSelectedGroups_katakana,
                    stagesConfig_katakana: state.stagesConfig_katakana
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
            } catch (e) {
                console.warn("Could not save to localStorage:", e);
            }
            updateHeaderBadges();
        }

        function updateHeaderBadges() {
            const level = Math.floor(state.xp / 100) + 1;
            const currentLevelXP = state.xp % 100;
            const percent = Math.min(100, Math.max(0, currentLevelXP));

            const xpEl = document.getElementById('xpCounter');
            if (xpEl) xpEl.textContent = `${state.xp} XP`;

            const levelBadge = document.getElementById('userLevelBadge');
            if (levelBadge) levelBadge.textContent = `Nv. ${level}`;

            const xpBar = document.getElementById('headerXpProgressBar');
            if (xpBar) xpBar.style.width = `${percent}%`;

            const xpRatio = document.getElementById('headerXpRatio');
            if (xpRatio) xpRatio.textContent = `${currentLevelXP}/100 XP (${percent}%)`;

            const streakEl = document.getElementById('streakCounter');
            if (streakEl) streakEl.textContent = `${state.streak} ${state.streak === 1 ? 'día' : 'días'}`;

            // Calculate SRS counts for active syllabary
            const activeList = getActiveKanaDataset();
            const activeStore = getActiveSRS();
            let b1 = 0, b2 = 0, b3 = 0;
            activeList.forEach(k => {
                const char = k.char || k.hiragana || k.katakana;
                const s = activeStore[char];
                if (!s || s.box === 1) b1++;
                else if (s.box === 2) b2++;
                else if (s.box === 3) b3++;
            });
            const srsHeader = document.getElementById('srsMasteryHeader');
            if (srsHeader) {
                const syllName = state.currentSyllabary === 'katakana' ? 'Katakanas' : 'Hiraganas';
                srsHeader.textContent = `${b3}/104 ${syllName} Dominados`;
            }

            const b1El = document.getElementById('srsBox1Count');
            if (b1El) b1El.textContent = b1;
            const b2El = document.getElementById('srsBox2Count');
            if (b2El) b2El.textContent = b2;
            const b3El = document.getElementById('srsBox3Count');
            if (b3El) b3El.textContent = b3;

            updateSyllabarySwitcherUI();
        }

        function resetSRSProgressWithConfirm() {
            const isKata = state.currentSyllabary === 'katakana';
            const syllName = isKata ? 'Katakana' : 'Hiragana';
            if (confirm(`¿Estás seguro de que deseas reiniciar todos tus datos de memoria SRS de ${syllName}?`)) {
                if (isKata) {
                    state.srs_katakana = {};
                } else {
                    state.srs = {};
                }
                saveStateToStorage();
                showToast(`Datos SRS de ${syllName} reiniciados con éxito`, "info");
                renderSRSDashboard();
            }
        }

        function getKanaSRS(char, syllabary = null) {
            const targetSyllabary = syllabary || (isKatakanaChar(char) ? 'katakana' : (state.currentSyllabary || 'hiragana'));
            const store = targetSyllabary === 'katakana' ? state.srs_katakana : state.srs;
            if (!store[char]) {
                store[char] = { box: 1, consecutive: 0, reviews: 0, errors: 0, lastReviewed: Date.now() };
            }
            if (typeof store[char].errors !== 'number') {
                store[char].errors = 0;
            }
            return store[char];
        }

        function recordKanaResult(char, isCorrect, syllabary = null) {
            const targetSyllabary = syllabary || (isKatakanaChar(char) ? 'katakana' : (state.currentSyllabary || 'hiragana'));
            const s = getKanaSRS(char, targetSyllabary);
            s.reviews++;
            s.lastReviewed = Date.now();

            if (isCorrect) {
                s.consecutive++;
                if (s.consecutive >= 4) {
                    s.box = 3;
                } else if (s.consecutive >= 2) {
                    s.box = 2;
                }
            } else {
                s.errors = (s.errors || 0) + 1;
                s.consecutive = 0;
                s.box = 1;
            }
            saveStateToStorage();
        }

        function getSRSWeightedKana(pool) {
            if (!pool || pool.length === 0) return HIRAGANA_DATA[0];
            // Weighted selection: Box 1 weight = 60, Box 2 weight = 30, Box 3 weight = 10
            const weightedList = [];
            pool.forEach(item => {
                const s = getKanaSRS(item.hiragana);
                const w = s.box === 1 ? 6 : (s.box === 2 ? 3 : 1);
                for (let i = 0; i < w; i++) {
                    weightedList.push(item);
                }
            });
            return weightedList[Math.floor(Math.random() * weightedList.length)];
        }
