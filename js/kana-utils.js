// KotoDojo · Lógica de silabarios y modal de trazos
        // ==========================================
        // SYLLABARY LOGIC & DUAL-ALPHABET ADAPTERS
        // ==========================================
        function isKatakanaChar(char) {
            if (!char || typeof char !== 'string') return false;
            const code = char.charCodeAt(0);
            return code >= 0x30A0 && code <= 0x30FF;
        }

        // Busca el objeto de un kana (hiragana o katakana) por su carácter.
        // Las entradas de KATAKANA_DATA guardan el carácter katakana también en .hiragana.
        function findKanaByChar(char) {
            const dataset = isKatakanaChar(char) ? KATAKANA_DATA : HIRAGANA_DATA;
            return dataset.find(k => (k.char || k.katakana || k.hiragana) === char) || null;
        }

        // Kanas que se pronuncian igual: no deben aparecer juntos como opciones de una misma
        // pregunta (con el audio o el rōmaji no hay forma de distinguirlos).
        const KANA_HOMOPHONES = { 'ぢ': 'じ', 'づ': 'ず', 'を': 'お', 'ぢゃ': 'じゃ', 'ぢゅ': 'じゅ', 'ぢょ': 'じょ' };

        function kanaSoundKey(char) {
            const hira = [...String(char || '')].map(c => (c >= 'ァ' && c <= 'ヶ') ? String.fromCharCode(c.charCodeAt(0) - 0x60) : c).join('');
            return KANA_HOMOPHONES[hira] || hira;
        }

        function areKanaHomophones(a, b) {
            return kanaSoundKey(a) === kanaSoundKey(b);
        }

        function getActiveKanaDataset() {
            return state.currentSyllabary === 'katakana' ? KATAKANA_DATA : HIRAGANA_DATA;
        }

        function getActiveStagesCurriculum() {
            return state.currentSyllabary === 'katakana' ? KATAKANA_STAGES_CURRICULUM : STAGES_CURRICULUM;
        }

        function getActiveStagesAutoProgress() {
            if (state.currentSyllabary === 'katakana') {
                if (!state.stagesAutoProgress_katakana) {
                    state.stagesAutoProgress_katakana = { unlockedIndex: 0, masteredLevels: [], selectedLevelId: 'a', levelScores: {}, kanaMastery: {} };
                }
                return state.stagesAutoProgress_katakana;
            }
            if (!state.stagesAutoProgress) {
                state.stagesAutoProgress = { unlockedIndex: 0, masteredLevels: [], selectedLevelId: 'a', levelScores: {}, kanaMastery: {} };
            }
            return state.stagesAutoProgress;
        }

        function getActiveSRS() {
            return state.currentSyllabary === 'katakana' ? state.srs_katakana : state.srs;
        }

        function getActiveStagesConfig() {
            let cfg;
            if (state.currentSyllabary === 'katakana') {
                if (!state.stagesConfig_katakana) {
                    state.stagesConfig_katakana = {
                        selectedSoundGroups: ['a', 'ka'],
                        selectedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        timerSpeed: 'medium',
                        timerEnabled: true,
                        autoAudio: true,
                        lockMode: false
                    };
                }
                cfg = state.stagesConfig_katakana;
            } else {
                if (!state.stagesConfig) {
                    state.stagesConfig = {
                        selectedSoundGroups: ['a', 'ka'],
                        selectedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        timerSpeed: 'medium',
                        timerEnabled: true,
                        autoAudio: true,
                        lockMode: false
                    };
                }
                cfg = state.stagesConfig;
            }
            if (!cfg.timerSpeed) {
                cfg.timerSpeed = cfg.timerEnabled ? 'medium' : 'off';
            }
            return cfg;
        }

        function getActiveSoundGroups() {
            return state.currentSyllabary === 'katakana' ? KATAKANA_SOUND_GROUPS : SOUND_GROUPS;
        }

        function updateSyllabarySwitcherUI() {
            const isKata = state.currentSyllabary === 'katakana';

            // 1. Header Switcher
            const hHira = document.getElementById('globalSwitchHiraganaBtn');
            const hKata = document.getElementById('globalSwitchKatakanaBtn');
            if (hHira && hKata) {
                if (isKata) {
                    hKata.className = 'flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-black transition-all duration-200 bg-sakura-600 text-white shadow-sm';
                    hHira.className = 'flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 text-slate-400 hover:text-white';
                } else {
                    hHira.className = 'flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-black transition-all duration-200 bg-sakura-600 text-white shadow-sm';
                    hKata.className = 'flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 text-slate-400 hover:text-white';
                }
            }

            // 2. Study Tab Switcher & Dynamic Labels
            const sHira = document.getElementById('studySwitchHiraganaBtn');
            const sKata = document.getElementById('studySwitchKatakanaBtn');
            if (sHira && sKata) {
                if (isKata) {
                    sKata.className = 'px-3 py-1.5 rounded-lg transition font-bold shadow-md bg-sakura-600 text-white';
                    sHira.className = 'px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition font-bold';
                } else {
                    sHira.className = 'px-3 py-1.5 rounded-lg transition font-bold shadow-md bg-sakura-600 text-white';
                    sKata.className = 'px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition font-bold';
                }
            }
            const studySub = document.getElementById('studySyllabaryName');
            if (studySub) {
                studySub.textContent = isKata ? 'Katakana' : 'Hiragana';
            }
            const sokuonBtn = document.getElementById('btn-sokuon-tip');
            if (sokuonBtn) {
                sokuonBtn.innerHTML = isKata 
                    ? '<i class="fa-solid fa-sparkles text-amber-400"></i> Sokuon (ッ)' 
                    : '<i class="fa-solid fa-sparkles text-amber-400"></i> Sokuon (っ)';
            }

            // 3. Stages Tab Switcher & Heading
            const stHira = document.getElementById('stagesSwitchHiraganaBtn');
            const stKata = document.getElementById('stagesSwitchKatakanaBtn');
            const stHeading = document.getElementById('stagesAutoSyllabaryHeading');
            if (stHira && stKata) {
                if (isKata) {
                    stKata.className = 'stage-theme-primary-btn py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition';
                    stHira.className = 'py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition text-slate-400 hover:text-white hover:bg-slate-800/80';
                } else {
                    stHira.className = 'stage-theme-primary-btn py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition';
                    stKata.className = 'py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition text-slate-400 hover:text-white hover:bg-slate-800/80';
                }
            }
            if (stHeading) {
                stHeading.textContent = isKata ? 'Katakana' : 'Hiragana';
            }

            // 4. SRS Progress Tab Switcher
            const prHira = document.getElementById('progressSwitchHiraganaBtn');
            const prKata = document.getElementById('progressSwitchKatakanaBtn');
            if (prHira && prKata) {
                if (isKata) {
                    prKata.className = 'px-3 py-1.5 rounded-lg transition font-bold shadow-md bg-sakura-600 text-white';
                    prHira.className = 'px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition font-bold';
                } else {
                    prHira.className = 'px-3 py-1.5 rounded-lg transition font-bold shadow-md bg-sakura-600 text-white';
                    prKata.className = 'px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition font-bold';
                }
            }
        }

        function setGlobalSyllabary(syllabary) {
            if (typeof stopStudyRowAudio === 'function') {
                stopStudyRowAudio();
            }
            state.currentSyllabary = syllabary === 'katakana' ? 'katakana' : 'hiragana';
            saveStateToStorage();
            updateSyllabarySwitcherUI();
            updateHeaderBadges();

            // Re-render the active view if it is one of the syllabary tabs
            const studyTab = document.getElementById('tab-study');
            if (studyTab && !studyTab.classList.contains('hidden')) {
                renderStudyGrid();
            }
            const stagesTab = document.getElementById('tab-stages');
            if (stagesTab && !stagesTab.classList.contains('hidden')) {
                renderStagesAutoDashboard();
            }
            const progressTab = document.getElementById('tab-progress');
            if (progressTab && !progressTab.classList.contains('hidden')) {
                renderSRSDashboard();
            }

            // Incondicionalmente sincronizar grupos de sonidos de etapas, dibujo y su UI
            if (typeof renderStagesSoundGroupChips === 'function') {
                renderStagesSoundGroupChips();
            }
            if (typeof syncStagesConfigUI === 'function') {
                syncStagesConfigUI();
            }
            if (typeof refreshAllDrawingGroupUIs === 'function') {
                refreshAllDrawingGroupUIs();
            }

            const label = state.currentSyllabary === 'katakana' ? '⚡ Katakana (104 sonidos)' : '🌸 Hiragana (104 sonidos)';
            showToast(`Silabario activo: ${label}`, "info");
        }

        // ==========================================
        // FASE 1: TABLA DE ESTUDIO
        // ==========================================
        function filterCategory(cat) {
            if (typeof stopStudyRowAudio === 'function') {
                stopStudyRowAudio();
            }
            state.currentCategory = cat;
            document.querySelectorAll('.study-cat-btn').forEach(btn => {
                btn.className = 'study-cat-btn px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition';
            });
            const activeCatBtn = document.getElementById(`cat-${cat}`);
            if (activeCatBtn) {
                activeCatBtn.className = 'study-cat-btn px-3 py-1.5 rounded-lg bg-sakura-600 text-white transition font-bold shadow-md';
            }
            renderStudyGrid();
        }


        // ==========================================================
        // DRAGGABLE ANIMATED KANA STROKE MODAL (CONTINUOUS FRAME TRACER)
        // ==========================================================
        let currentModalKana = 'あ';
        let modalAnimFrameId = null;
        let modalStrokeAnimTimeout = null;
        let isModalAnimPlaying = true;
        let modalStrokeActiveIdx = 0;
        let isModalDragging = false;
        let modalDragStartX = 0, modalDragStartY = 0;
        let modalInitialLeft = 0, modalInitialTop = 0;
