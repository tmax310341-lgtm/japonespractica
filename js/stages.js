// KotoDojo · Modo 9 Etapas
        // ==========================================================
        // MODO 9 ETAPAS: RUTA CURRICULAR AUTOMÁTICA (ESTILO KANA PRO)
        // ==========================================================
        const STAGES_CURRICULUM = [
            // --- CONJUNTO BÁSICO (10 NIVELES GOJŪON) ---
            { id: 'a', name: 'A', subtitle: 'a, i, u, e, o', soundGroups: ['a'], category: 'basic', icon: 'あ', kanas: ['あ', 'い', 'う', 'え', 'お'] },
            { id: 'ka', name: 'Ka', subtitle: 'ka, ki, ku, ke, ko', soundGroups: ['ka'], category: 'basic', icon: 'か', kanas: ['か', 'き', 'く', 'け', 'こ'] },
            { id: 'sa', name: 'Sa', subtitle: 'sa, shi, su, se, so', soundGroups: ['sa'], category: 'basic', icon: 'さ', kanas: ['さ', 'し', 'す', 'せ', 'そ'] },
            { id: 'ta', name: 'Ta', subtitle: 'ta, chi, tsu, te, to', soundGroups: ['ta'], category: 'basic', icon: 'た', kanas: ['た', 'ち', 'つ', 'て', 'と'] },
            { id: 'na', name: 'Na', subtitle: 'na, ni, nu, ne, no', soundGroups: ['na'], category: 'basic', icon: 'な', kanas: ['な', 'に', 'ぬ', 'ね', 'の'] },
            { id: 'ha', name: 'Ha', subtitle: 'ha, hi, fu, he, ho', soundGroups: ['ha'], category: 'basic', icon: 'は', kanas: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
            { id: 'ma', name: 'Ma', subtitle: 'ma, mi, mu, me, mo', soundGroups: ['ma'], category: 'basic', icon: 'ま', kanas: ['ま', 'み', 'む', 'め', 'も'] },
            { id: 'ya', name: 'Ya', subtitle: 'ya, yu, yo', soundGroups: ['ya'], category: 'basic', icon: 'や', kanas: ['や', 'ゆ', 'よ'] },
            { id: 'ra', name: 'Ra', subtitle: 'ra, ri, ru, re, ro', soundGroups: ['ra'], category: 'basic', icon: 'ら', kanas: ['ら', 'り', 'る', 'れ', 'ろ'] },
            { id: 'wa', name: 'Wa / N', subtitle: 'wa, wo, n', soundGroups: ['wa'], category: 'basic', icon: 'わ', kanas: ['わ', 'を', 'ん'] },

            // --- CONJUNTO EXTENDIDO (9 NIVELES: DAKUTEN, HANDAKUTEN Y YŌON) ---
            // Dakuten & Handakuten (5 Niveles)
            { id: 'ga', name: 'Ga', subtitle: 'ga, gi, gu, ge, go', soundGroups: ['ga'], category: 'extended', icon: 'が', kanas: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
            { id: 'za', name: 'Za', subtitle: 'za, ji, zu, ze, zo', soundGroups: ['za'], category: 'extended', icon: 'ざ', kanas: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
            { id: 'da', name: 'Da', subtitle: 'da, ji, zu, de, do', soundGroups: ['da'], category: 'extended', icon: 'だ', kanas: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
            { id: 'ba', name: 'Ba', subtitle: 'ba, bi, bu, be, bo', soundGroups: ['ba'], category: 'extended', icon: 'ば', kanas: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
            { id: 'pa', name: 'Pa', subtitle: 'pa, pi, pu, pe, po', soundGroups: ['pa'], category: 'extended', icon: 'ぱ', kanas: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },

            // Yōon / Dígrafos combinados (4 Niveles pedagógicos)
            { id: 'youon_1', name: 'Yōon K/S/T', subtitle: 'kya, sha, cha...', soundGroups: ['kya', 'sha', 'cha'], category: 'extended', icon: 'きゃ', kanas: ['きゃ', 'きゅ', 'きょ', 'しゃ', 'しゅ', 'しょ', 'ちゃ', 'ちゅ', 'ちょ'] },
            { id: 'youon_2', name: 'Yōon N/H/M', subtitle: 'nya, hya, mya...', soundGroups: ['nya', 'hya', 'mya'], category: 'extended', icon: 'にゃ', kanas: ['にゃ', 'にゅ', 'にょ', 'ひゃ', 'ひゅ', 'ひょ', 'みゃ', 'みゅ', 'みょ'] },
            { id: 'youon_3', name: 'Yōon R/G/J', subtitle: 'rya, gya, ja...', soundGroups: ['rya', 'gya', 'ja'], category: 'extended', icon: 'りゃ', kanas: ['りゃ', 'りゅ', 'りょ', 'ぎゃ', 'ぎゅ', 'ぎょ', 'じゃ', 'じゅ', 'じょ'] },
            { id: 'youon_4', name: 'Yōon D/B/P', subtitle: 'dya, bya, pya...', soundGroups: ['dya', 'bya', 'pya'], category: 'extended', icon: 'ぴゃ', kanas: ['ぢゃ', 'ぢゅ', 'ぢょ', 'びゃ', 'びゅ', 'びょ', 'ぴゃ', 'ぴゅ', 'ぴょ'] }
        ];

        // ==========================================================
        // MODO 9 ETAPAS: CURRÍCULO DE KATAKANA (19 NIVELES PEDAGÓGICOS)
        // ==========================================================
        const KATAKANA_STAGES_CURRICULUM = [
            // --- CONJUNTO BÁSICO (10 NIVELES GOJŪON) ---
            { id: 'a', name: 'A', subtitle: 'a, i, u, e, o', soundGroups: ['a'], category: 'basic', icon: 'ア', kanas: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
            { id: 'ka', name: 'Ka', subtitle: 'ka, ki, ku, ke, ko', soundGroups: ['ka'], category: 'basic', icon: 'カ', kanas: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
            { id: 'sa', name: 'Sa', subtitle: 'sa, shi, su, se, so', soundGroups: ['sa'], category: 'basic', icon: 'サ', kanas: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
            { id: 'ta', name: 'Ta', subtitle: 'ta, chi, tsu, te, to', soundGroups: ['ta'], category: 'basic', icon: 'タ', kanas: ['タ', 'チ', 'ツ', 'テ', 'ト'] },
            { id: 'na', name: 'Na', subtitle: 'na, ni, nu, ne, no', soundGroups: ['na'], category: 'basic', icon: 'ナ', kanas: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
            { id: 'ha', name: 'Ha', subtitle: 'ha, hi, fu, he, ho', soundGroups: ['ha'], category: 'basic', icon: 'ハ', kanas: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'] },
            { id: 'ma', name: 'Ma', subtitle: 'ma, mi, mu, me, mo', soundGroups: ['ma'], category: 'basic', icon: 'マ', kanas: ['マ', 'ミ', 'ム', 'メ', 'モ'] },
            { id: 'ya', name: 'Ya', subtitle: 'ya, yu, yo', soundGroups: ['ya'], category: 'basic', icon: 'ヤ', kanas: ['ヤ', 'ユ', 'ヨ'] },
            { id: 'ra', name: 'Ra', subtitle: 'ra, ri, ru, re, ro', soundGroups: ['ra'], category: 'basic', icon: 'ラ', kanas: ['ラ', 'リ', 'ル', 'レ', 'ロ'] },
            { id: 'wa', name: 'Wa / N', subtitle: 'wa, wo, n', soundGroups: ['wa'], category: 'basic', icon: 'ワ', kanas: ['ワ', 'ヲ', 'ン'] },

            // --- CONJUNTO EXTENDIDO (9 NIVELES: DAKUTEN, HANDAKUTEN Y YŌON) ---
            { id: 'ga', name: 'Ga', subtitle: 'ga, gi, gu, ge, go', soundGroups: ['ga'], category: 'extended', icon: 'ガ', kanas: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'] },
            { id: 'za', name: 'Za', subtitle: 'za, ji, zu, ze, zo', soundGroups: ['za'], category: 'extended', icon: 'ザ', kanas: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'] },
            { id: 'da', name: 'Da', subtitle: 'da, ji, zu, de, do', soundGroups: ['da'], category: 'extended', icon: 'ダ', kanas: ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'] },
            { id: 'ba', name: 'Ba', subtitle: 'ba, bi, bu, be, bo', soundGroups: ['ba'], category: 'extended', icon: 'バ', kanas: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'] },
            { id: 'pa', name: 'Pa', subtitle: 'pa, pi, pu, pe, po', soundGroups: ['pa'], category: 'extended', icon: 'パ', kanas: ['パ', 'ピ', 'プ', 'ペ', 'ポ'] },

            // Yōon / Dígrafos combinados (4 Niveles pedagógicos)
            { id: 'youon_1', name: 'Yōon K/S/T', subtitle: 'kya, sha, cha...', soundGroups: ['kya', 'sha', 'cha'], category: 'extended', icon: 'キャ', kanas: ['キャ', 'キュ', 'キョ', 'シャ', 'シュ', 'ショ', 'チャ', 'チュ', 'チョ'] },
            { id: 'youon_2', name: 'Yōon N/H/M', subtitle: 'nya, hya, mya...', soundGroups: ['nya', 'hya', 'mya'], category: 'extended', icon: 'ニャ', kanas: ['ニャ', 'ニュ', 'ニョ', 'ヒャ', 'ヒュ', 'ヒョ', 'ミャ', 'ミュ', 'ミョ'] },
            { id: 'youon_3', name: 'Yōon R/G/J', subtitle: 'rya, gya, ja...', soundGroups: ['rya', 'gya', 'ja'], category: 'extended', icon: 'リャ', kanas: ['リャ', 'リュ', 'リョ', 'ギャ', 'ギュ', 'ギョ', 'ジャ', 'ジュ', 'ジョ'] },
            { id: 'youon_4', name: 'Yōon D/B/P', subtitle: 'dya, bya, pya...', soundGroups: ['dya', 'bya', 'pya'], category: 'extended', icon: 'ピャ', kanas: ['ヂャ', 'ヂュ', 'ヂョ', 'ビャ', 'ビュ', 'ビョ', 'ピャ', 'ピュ', 'ピョ'] }
        ];


        function setStagesLearningMode(mode) {
            state.stagesLearningMode = mode === 'manual' ? 'manual' : 'auto';
            saveStateToStorage();

            const autoBtn = document.getElementById('stagesModeAutoBtn');
            const manualBtn = document.getElementById('stagesModeManualBtn');
            const descEl = document.getElementById('stagesModeDescription');
            const autoView = document.getElementById('stages-auto-view');
            const manualView = document.getElementById('stages-manual-view');

            if (state.stagesLearningMode === 'auto') {
                if (autoBtn) {
                    autoBtn.className = "stage-theme-primary-btn py-2 px-4 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition";
                }
                if (manualBtn) {
                    manualBtn.className = "py-2 px-4 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition text-slate-400 hover:text-white hover:bg-slate-800/80";
                }
                if (descEl) {
                    descEl.innerHTML = '<i class="fa-solid fa-graduation-cap stage-theme-accent-text"></i><span>Aprende fila por fila con refuerzo acumulativo y desbloqueo progresivo.</span>';
                }
                if (autoView) autoView.classList.remove('hidden');
                if (manualView) manualView.classList.add('hidden');
                renderStagesAutoDashboard();
            } else {
                if (autoBtn) {
                    autoBtn.className = "py-2 px-4 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition text-slate-400 hover:text-white hover:bg-slate-800/80";
                }
                if (manualBtn) {
                    manualBtn.className = "stage-theme-primary-btn py-2 px-4 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition";
                }
                if (descEl) {
                    descEl.innerHTML = '<i class="fa-solid fa-sliders stage-theme-accent-text"></i><span>Control total: elige libremente qué grupos de sonidos y etapas practicar.</span>';
                }
                if (autoView) autoView.classList.add('hidden');
                if (manualView) manualView.classList.remove('hidden');
                if (typeof renderStagesSoundGroupChips === 'function') {
                    renderStagesSoundGroupChips();
                }
                if (typeof syncStagesConfigUI === 'function') {
                    syncStagesConfigUI();
                }
            }
        }

        function getAutoDeterminedActiveLevel() {
            const prog = getActiveStagesAutoProgress();
            const curriculum = getActiveStagesCurriculum();
            const totalLevels = curriculum.length;
            const unlockedIdx = typeof prog.unlockedIndex === 'number' ? prog.unlockedIndex : 0;

            // 1. La fila activa es siempre la frontera de aprendizaje actual
            if (unlockedIdx < totalLevels) {
                const frontierLevel = curriculum[unlockedIdx] || curriculum[0];
                prog.selectedLevelId = frontierLevel.id;
                return frontierLevel;
            }

            // 2. Fase de Consolidación Final: si ya completó el curso, buscar la primera fila no dominada al 100% (3/3)
            for (const lvl of curriculum) {
                const isAll3 = lvl.kanas.every(k => (prog.kanaMastery?.[k]?.mastery || 0) >= 3);
                if (!isAll3) {
                    prog.selectedLevelId = lvl.id;
                    return lvl;
                }
            }

            const lastLevel = curriculum[totalLevels - 1];
            prog.selectedLevelId = lastLevel.id;
            return lastLevel;
        }

        function renderStagesAutoDashboard() {
            const prog = getActiveStagesAutoProgress();
            const curriculum = getActiveStagesCurriculum();
            if (typeof prog.unlockedIndex !== 'number' || prog.unlockedIndex < 0) prog.unlockedIndex = 0;
            if (!Array.isArray(prog.masteredLevels)) prog.masteredLevels = [];
            if (!prog.levelScores) prog.levelScores = {};
            if (!prog.kanaMastery) prog.kanaMastery = {};

            const totalLevels = curriculum.length;
            const activeLevelObj = getAutoDeterminedActiveLevel();

            // Actualizar etiqueta del silabario
            updateSyllabarySwitcherUI();

            // Calcular porcentaje global de maestría del curso completo
            let totalAllPoints = 0;
            let maxAllPoints = 0;
            curriculum.forEach(l => {
                l.kanas.forEach(k => {
                    maxAllPoints += 3;
                    totalAllPoints += (prog.kanaMastery?.[k]?.mastery || 0);
                });
            });
            const masteryPercent = maxAllPoints > 0 ? Math.round((totalAllPoints / maxAllPoints) * 100) : 0;

            // Update header indicators
            const percentEl = document.getElementById('stagesAutoMasteryPercent');
            if (percentEl) percentEl.textContent = `${masteryPercent}%`;

            const barEl = document.getElementById('stagesAutoProgressBar');
            if (barEl) barEl.style.width = `${masteryPercent}%`;

            const pillEl = document.getElementById('stagesAutoLevelPill');
            if (pillEl) {
                const currentRank = Math.min(prog.unlockedIndex + 1, totalLevels);
                pillEl.textContent = `Nivel ${currentRank} de ${totalLevels}: Fila ${activeLevelObj.name}`;
            }

            const basicGrid = document.getElementById('stagesAutoBasicGrid');
            const extGrid = document.getElementById('stagesAutoExtendedGrid');
            if (basicGrid) basicGrid.innerHTML = '';
            if (extGrid) extGrid.innerHTML = '';

            const isAutoMode = state.stagesLearningMode === 'auto';

            curriculum.forEach((lvl, idx) => {
                const isMastered = prog.masteredLevels.includes(lvl.id);
                const isUnlocked = idx <= prog.unlockedIndex || isMastered;
                const isSelected = lvl.id === prog.selectedLevelId;
                const scoreData = prog.levelScores[lvl.id];

                // Cálculo exacto de maestría de fila con longitud variable (3, 5 o 9 kanas)
                const totalKanasInRow = lvl.kanas.length;
                let earnedPointsInRow = 0;
                lvl.kanas.forEach(kChar => {
                    earnedPointsInRow += (prog.kanaMastery?.[kChar]?.mastery || 0);
                });
                const maxRowPoints = totalKanasInRow * 3;
                const rowMasteryPercent = Math.round((earnedPointsInRow / maxRowPoints) * 100);

                const card = document.createElement('div');
                card.id = `stageLevelCard_${lvl.id}`;

                let cardClasses = "relative p-4 rounded-2xl transition flex items-center justify-between gap-3 select-none ";
                let badgeHtml = "";

                if (isSelected && isAutoMode) {
                    cardClasses += "stage-active-level-card cursor-default ";
                    badgeHtml = `<span class="stage-active-level-badge px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 shrink-0 shadow-sm">
                        <span class="stage-active-pulse w-2 h-2 rounded-full animate-pulse"></span> 🎯 Fila Activa
                    </span>`;
                } else if (rowMasteryPercent === 100) {
                    cardClasses += isAutoMode ? "bg-slate-900/90 border border-emerald-500/40 cursor-default " : "bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50 cursor-pointer ";
                    badgeHtml = `<span class="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1.5 shrink-0">
                        <i class="fa-solid fa-circle-check text-emerald-400 text-xs"></i> Dominado 3/3
                    </span>`;
                } else if (rowMasteryPercent >= 66) {
                    cardClasses += isAutoMode ? "bg-slate-900/80 border border-amber-500/30 cursor-default " : "bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 cursor-pointer ";
                    badgeHtml = `<span class="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1.5 shrink-0">
                        <i class="fa-solid fa-layer-group text-amber-400 text-xs"></i> Nivel 2/3 (${rowMasteryPercent}%)
                    </span>`;
                } else if (rowMasteryPercent > 0) {
                    cardClasses += isAutoMode ? "bg-slate-900/80 border border-teal-500/30 cursor-default " : "bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 cursor-pointer ";
                    badgeHtml = `<span class="px-2.5 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-500/40 text-[11px] font-bold flex items-center gap-1.5 shrink-0">
                        <i class="fa-solid fa-sparkles text-teal-400 text-xs"></i> Nivel 1/3 (${rowMasteryPercent}%)
                    </span>`;
                } else if (isUnlocked) {
                    cardClasses += isAutoMode ? "bg-slate-900/70 border border-slate-800 cursor-default " : "bg-slate-900/70 border border-slate-800 hover:border-slate-700 cursor-pointer ";
                    badgeHtml = `<span class="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700 text-[11px] font-semibold flex items-center gap-1 shrink-0">
                        <i class="fa-regular fa-circle text-[10px] text-slate-500"></i> Sin iniciar
                    </span>`;
                } else {
                    cardClasses += "bg-slate-950/60 border border-slate-800/80 opacity-60 cursor-not-allowed ";
                    badgeHtml = `<span class="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-500 border border-slate-800 text-[11px] font-semibold flex items-center gap-1 shrink-0">
                        <i class="fa-solid fa-lock text-[10px]"></i> Bloqueado
                    </span>`;
                }

                if (!isAutoMode && isSelected && isUnlocked) {
                    cardClasses += "stage-active-level-card ";
                }

                card.className = cardClasses;

                // Micro-indicadores individuales por cada kana
                const kanaPillsHtml = lvl.kanas.map(kChar => {
                    const m = prog.kanaMastery?.[kChar]?.mastery || 0;
                    let colorClass = "bg-slate-800/90 text-slate-400 border-slate-700";
                    if (m === 3) colorClass = "bg-emerald-950/80 text-emerald-300 border-emerald-500/40";
                    else if (m === 2) colorClass = "bg-amber-950/80 text-amber-300 border-amber-500/40";
                    else if (m === 1) colorClass = "bg-teal-950/80 text-teal-300 border-teal-500/40";
                    return `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[11px] font-jp font-bold ${colorClass}">
                        <span>${kChar}</span><span class="text-[9px] font-mono opacity-80">${m}/3</span>
                    </span>`;
                }).join(' ');

                const isDigraph = lvl.icon && lvl.icon.length > 1;
                const iconBoxWidthClass = isDigraph ? 'min-w-[46px] px-1' : 'w-10';
                const iconSizeClass = isDigraph ? 'text-[15px] tracking-tight whitespace-nowrap leading-none' : 'text-xl leading-none';

                card.innerHTML = `
                    <div class="min-w-0 flex items-center gap-3">
                        <div class="stage-icon-box ${iconBoxWidthClass} h-10 rounded-xl ${isUnlocked ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-600'} flex items-center justify-center font-jp ${iconSizeClass} font-black shrink-0 border border-slate-700/50 ${isDigraph ? 'is-digraph' : ''}">
                            ${lvl.icon}
                        </div>
                        <div class="min-w-0">
                            <div class="flex items-center gap-2">
                                <h5 class="text-base font-black ${isUnlocked ? 'text-white' : 'text-slate-500'} truncate">Fila ${lvl.name}</h5>
                                ${scoreData && scoreData.bestScore ? `<span class="text-[10px] font-mono font-bold stage-theme-accent-text">(${scoreData.bestScore}%)</span>` : ''}
                            </div>
                            <p class="text-xs font-mono text-slate-400 truncate">${lvl.subtitle}</p>
                            <div class="flex flex-wrap items-center gap-1 mt-1.5">${kanaPillsHtml}</div>
                        </div>
                    </div>
                    ${badgeHtml}
                `;

                card.onclick = () => {
                    if (isAutoMode) {
                        if (lvl.id !== prog.selectedLevelId) {
                            showToast("En la Ruta Automática, avanzas fila por fila con refuerzo guiado.", "info");
                        }
                        return;
                    }
                    if (!isUnlocked) {
                        showToast(`Supera los niveles previos con ≥75% para desbloquear la Fila ${lvl.name}`, "info");
                    } else {
                        selectStagesAutoLevel(lvl.id);
                    }
                };

                if (lvl.category === 'basic' && basicGrid) {
                    basicGrid.appendChild(card);
                } else if (extGrid) {
                    extGrid.appendChild(card);
                }
            });

            // Update bottom active bar
            const selectedLvl = curriculum.find(l => l.id === prog.selectedLevelId) || activeLevelObj;
            const iconEl = document.getElementById('stagesAutoActiveLevelIcon');
            if (iconEl) {
                iconEl.textContent = selectedLvl.icon;
                if (selectedLvl.icon && selectedLvl.icon.length > 1) {
                    iconEl.classList.remove('text-2xl', 'w-12');
                    iconEl.classList.add('text-lg', 'tracking-tight', 'whitespace-nowrap', 'min-w-[3.25rem]', 'px-1.5');
                } else {
                    iconEl.classList.remove('text-lg', 'tracking-tight', 'whitespace-nowrap', 'min-w-[3.25rem]', 'px-1.5');
                    iconEl.classList.add('text-2xl', 'w-12');
                }
            }

            const titleEl = document.getElementById('stagesAutoActiveLevelTitle');
            if (titleEl) titleEl.textContent = `Fila ${selectedLvl.name}: ${selectedLvl.kanas.join(', ')}`;

            const subEl = document.getElementById('stagesAutoActiveLevelSub');
            if (subEl) {
                const scoreData = prog.levelScores[selectedLvl.id];
                const totalK = selectedLvl.kanas.length;
                let pts = 0;
                selectedLvl.kanas.forEach(k => { pts += (prog.kanaMastery?.[k]?.mastery || 0); });
                const pct = Math.round((pts / (totalK * 3)) * 100);

                if (pct === 100) {
                    subEl.textContent = `Nivel Dominado al 100% (3/3) • Clic para repasar con refuerzo espaciado`;
                } else {
                    subEl.textContent = `Maestría actual: ${pct}% • Sesión de 9 etapas (Requiere ≥75% para avanzar)`;
                }
            }
        }

        function selectStagesAutoLevel(levelId) {
            const prog = getActiveStagesAutoProgress();
            prog.selectedLevelId = levelId;
            saveStateToStorage();
            renderStagesAutoDashboard();
        }

        function startStagesAutoSession(levelId) {
            const prog = getActiveStagesAutoProgress();
            const curriculum = getActiveStagesCurriculum();
            const activeDataset = getActiveKanaDataset();

            if (levelId) {
                prog.selectedLevelId = levelId;
            } else {
                getAutoDeterminedActiveLevel();
            }
            const targetId = prog.selectedLevelId || curriculum[prog.unlockedIndex || 0]?.id || 'a';
            const lvl = curriculum.find(l => l.id === targetId);
            if (!lvl) return;

            const lvlIdx = curriculum.findIndex(l => l.id === lvl.id);
            const isUnlocked = lvlIdx <= (prog.unlockedIndex || 0) || (prog.masteredLevels || []).includes(lvl.id);
            if (!isUnlocked) {
                showToast(`Nivel bloqueado. Completa los niveles anteriores para desbloquearlo.`, "warning");
                return;
            }

            // 1. Kanas Núcleo de la Fila Activa (coreKanas)
            let coreKanas = [];
            lvl.soundGroups.forEach(gid => {
                const kanasInGroup = activeDataset.filter(k => k.group === gid);
                kanasInGroup.forEach(kObj => {
                    const char = kObj.char || kObj.katakana || kObj.hiragana;
                    if (!coreKanas.some(p => (p.char || p.katakana || p.hiragana) === char)) {
                        coreKanas.push(kObj);
                    }
                });
            });
            if (coreKanas.length === 0) {
                coreKanas = activeDataset.filter(k => lvl.kanas.includes(k.char || k.katakana || k.hiragana));
            }

            // 2. Kanas de Refuerzo Espaciado de Filas Previas (priorizando menor maestría y menor práctica reciente)
            let reinforcementCandidates = [];
            for (let i = 0; i < lvlIdx; i++) {
                const prevLvl = curriculum[i];
                if (prevLvl) {
                    prevLvl.kanas.forEach(h => {
                        const kObj = activeDataset.find(k => (k.char || k.katakana || k.hiragana) === h);
                        if (kObj && !coreKanas.some(c => (c.char || c.katakana || c.hiragana) === h) && !reinforcementCandidates.some(r => (r.char || r.katakana || r.hiragana) === h)) {
                            reinforcementCandidates.push(kObj);
                        }
                    });
                }
            }

            reinforcementCandidates.sort((a, b) => {
                const charA = a.char || a.katakana || a.hiragana;
                const charB = b.char || b.katakana || b.hiragana;
                const mastA = prog.kanaMastery?.[charA]?.mastery || 0;
                const mastB = prog.kanaMastery?.[charB]?.mastery || 0;
                if (mastA !== mastB) return mastA - mastB;
                const lastA = prog.kanaMastery?.[charA]?.lastPracticed || 0;
                const lastB = prog.kanaMastery?.[charB]?.lastPracticed || 0;
                return lastA - lastB;
            });

            // Extraer 2 o 3 kanas de refuerzo para etapas rápidas
            const sampledReview = reinforcementCandidates.slice(0, Math.min(3, reinforcementCandidates.length));
            const fullPool = [...coreKanas, ...sampledReview];

            // Kanas totales desbloqueados hasta el momento (para vocabulario real enriquecido en Etapa 7)
            const allUnlockedKanas = [...coreKanas, ...reinforcementCandidates];

            // Configurar las 9 etapas didácticas
            state.stagesConfig.selectedStages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            state.stagesConfig.selectedSoundGroups = [...lvl.soundGroups];

            // Palabras generadas a partir de todos los kanas desbloqueados, priorizando la fila activa
            const stage7WordsPool = generateStage6Words(allUnlockedKanas, coreKanas, true, lvlIdx);

            // Sesión activa con control de fatiga (Etapas 8 y 9 solo coreKanas)
            state.stageSession = {
                active: true,
                isAuto: true,
                autoLevelId: lvl.id,
                selectedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                currentStageIndex: 0,
                currentItemIndex: 0,
                activeStageNum: null,
                coreKanas: [...coreKanas],
                allUnlockedKanas: allUnlockedKanas,
                pool: shuffleArray([...fullPool]),
                stage7WordsPool: stage7WordsPool,
                stage6WordsPool: stage7WordsPool,
                stage5WordsPool: stage7WordsPool,
                stage7UsedWords: new Set(),
                stage6UsedWords: new Set(),
                currentStage7Word: null,
                currentStage6Word: null,
                currentStage5Word: null,
                stageQueue: [],
                stageStatuses: {},
                stageErrorsCount: {},
                hasSkippedInStage: {},
                introducedInStage: { 1: new Set(), 2: new Set() },
                stage4Chunks: [],
                stage3Chunks: [],
                stage8Queue: initDrawQueue(coreKanas), // FATIGA CONTROL: Solo kanas de la fila activa
                stage9Queue: initDrawQueue(coreKanas), // FATIGA CONTROL: Solo kanas de la fila activa
                drawStats: {},
                recentDrawHistory: [],
                streamIndex: 0,
                matchedPairs: [],
                selectedPairCard: null,
                isStageLocked: false,
                stageLoopRounds: 1,
                firstAttemptEvaluated: {},
                pendingMistakes: new Set(),
                reinsertCount: {},
                timerSeconds: 15,
                timerInterval: null,
                sessionKanaStats: {}, // [hiragana]: { attempts: 0, correct: 0 }
                stats: {
                    totalCorrect: 0,
                    totalErrors: 0,
                    xpEarned: 0,
                    stageResults: {}
                }
            };

            document.getElementById('stages-setup-view')?.classList.add('hidden');
            document.getElementById('stages-results-view')?.classList.add('hidden');
            document.getElementById('stages-active-view')?.classList.remove('hidden');

            renderCurrentStageExercise();
        }

        function resetStagesAutoProgressConfirm() {
            const isKata = state.currentSyllabary === 'katakana';
            const syllName = isKata ? 'Katakana' : 'Hiragana';
            if (confirm(`¿Estás seguro de que deseas reiniciar tu progreso en la ruta automática de ${syllName}?\nSe reiniciarán los niveles desbloqueados y las calificaciones acumuladas.`)) {
                if (isKata) {
                    state.stagesAutoProgress_katakana = {
                        unlockedIndex: 0,
                        masteredLevels: [],
                        selectedLevelId: 'a',
                        levelScores: {},
                        kanaMastery: {}
                    };
                } else {
                    state.stagesAutoProgress = {
                        unlockedIndex: 0,
                        masteredLevels: [],
                        selectedLevelId: 'a',
                        levelScores: {},
                        kanaMastery: {}
                    };
                }
                saveStateToStorage();
                renderStagesAutoDashboard();
                showToast(`Progreso de la ruta de ${syllName} reiniciado al Nivel 1`, "info");
            }
        }

        // ==========================================================
        // MODO 9 ETAPAS: SISTEMA DE PROGRESIÓN GUIADA
        // ==========================================================
        const STAGE_METADATA = [
            { num: 1, name: 'Opción Múltiple', desc: 'Identifica el Romaji correcto para el Hiragana.', icon: 'fa-square-check', color: 'sakura' },
            { num: 2, name: 'Opción Inversa', desc: 'Dado el Romaji, selecciona el Hiragana correspondiente.', icon: 'fa-arrows-rotate', color: 'amber' },
            { num: 3, name: 'Escucha y Fonética', desc: 'Escucha la pronunciación nativa y elige el símbolo correcto.', icon: 'fa-volume-high', color: 'rose' },
            { num: 4, name: 'Encontrar el Par', desc: 'Empareja tarjetas superiores de Romaji con Hiragana.', icon: 'fa-clone', color: 'matcha' },
            { num: 5, name: 'Escribir Respuesta', desc: 'Escribe la lectura Romaji con teclado físico o virtual.', icon: 'fa-keyboard', color: 'sky' },
            { num: 6, name: 'Escribir el Texto', desc: 'Flujo continuo: escribe y avanza automáticamente kana a kana.', icon: 'fa-font', color: 'purple' },
            { num: 7, name: 'Escribir Palabra', desc: 'Transcribe palabras completas y combinaciones de 3 a 5 kanas.', icon: 'fa-book', color: 'indigo' },
            { num: 8, name: 'Orden de Trazos', desc: 'Trazado asistido en lienzo SVG con validación vectorial.', icon: 'fa-pen-nib', color: 'emerald' },
            { num: 9, name: 'Dibujar de Memoria', desc: 'Dibuja el kana a ciegas recordando sus trazos de memoria.', icon: 'fa-eye-slash', color: 'amber' }
        ];

        function initStagesTab() {
            renderStagesSoundGroupChips();
            syncStagesConfigUI();
            setStagesLearningMode(state.stagesLearningMode || 'auto');
            returnToStagesSetup();
        }

        function syncStagesConfigUI() {
            const config = getActiveStagesConfig();
            // Checkboxes for stages 1 to 9
            const checkboxes = document.querySelectorAll('#stagesCheckboxGrid input[type="checkbox"]');
            checkboxes.forEach(cb => {
                const stageNum = parseInt(cb.value);
                cb.checked = (config.selectedStages || []).includes(stageNum);
            });

            // Auxiliary toggles
            updateStagesTimerSpeedUI();

            const autoAudioToggle = document.getElementById('stagesAutoAudioToggle');
            if (autoAudioToggle) autoAudioToggle.checked = !!config.autoAudio;

            const lockModeToggle = document.getElementById('stagesLockModeToggle');
            if (lockModeToggle) lockModeToggle.checked = !!config.lockMode;
        }

        function renderStagesSoundGroupChips() {
            const container = document.getElementById('stagesSoundGroupChips');
            if (!container) return;
            container.innerHTML = '';

            const groups = getActiveSoundGroups();
            const config = getActiveStagesConfig();
            const selected = config.selectedSoundGroups || ['a', 'ka'];

            groups.forEach(g => {
                const isSelected = selected.includes(g.id);
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = `px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                    isSelected
                        ? 'bg-sakura-600 text-white border border-sakura-500 shadow-sakura-600/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 hover:bg-slate-700'
                }`;
                chip.innerHTML = `${isSelected ? '<i class="fa-solid fa-check text-[10px]"></i>' : ''}<span>${g.name || g.romaLabel || g.id.toUpperCase()}</span>`;
                chip.onclick = () => toggleStagesSoundGroup(g.id);
                container.appendChild(chip);
            });
        }

        function toggleStagesSoundGroup(groupId) {
            const config = getActiveStagesConfig();
            if (!config.selectedSoundGroups) config.selectedSoundGroups = ['a', 'ka'];
            const idx = config.selectedSoundGroups.indexOf(groupId);
            if (idx >= 0) {
                if (config.selectedSoundGroups.length > 1) {
                    config.selectedSoundGroups.splice(idx, 1);
                } else {
                    showToast("Debe haber al menos un grupo de sonidos activo", "info");
                }
            } else {
                config.selectedSoundGroups.push(groupId);
            }
            saveStateToStorage();
            renderStagesSoundGroupChips();
        }

        function setStagesSoundPreset(preset) {
            const config = getActiveStagesConfig();
            const groups = getActiveSoundGroups();
            if (preset === 'a') {
                config.selectedSoundGroups = ['a'];
            } else if (preset === 'a_ka') {
                config.selectedSoundGroups = ['a', 'ka'];
            } else if (preset === 'gojuon') {
                config.selectedSoundGroups = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'];
            } else if (preset === 'all') {
                config.selectedSoundGroups = groups.map(g => g.id);
            }
            saveStateToStorage();
            renderStagesSoundGroupChips();
        }

        function setStagesListPreset(preset) {
            const config = getActiveStagesConfig();
            if (preset === 'all') {
                config.selectedStages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            } else if (preset === 'recognition') {
                config.selectedStages = [1, 2, 3, 4];
            } else if (preset === 'writing') {
                config.selectedStages = [5, 6, 7, 8, 9];
            } else if (preset === 'none') {
                config.selectedStages = [];
            }
            saveStateToStorage();
            syncStagesConfigUI();
        }

        function onStageCheckboxChange() {
            const checkboxes = document.querySelectorAll('#stagesCheckboxGrid input[type="checkbox"]');
            const selected = [];
            checkboxes.forEach(cb => {
                if (cb.checked) selected.push(parseInt(cb.value));
            });
            const config = getActiveStagesConfig();
            config.selectedStages = selected.sort((a, b) => a - b);
            saveStateToStorage();
        }

        function exitStagesSession() {
            if (state.stageSession) {
                if (state.stageSession.timerInterval) {
                    clearInterval(state.stageSession.timerInterval);
                    state.stageSession.timerInterval = null;
                }
                state.stageSession.active = false;
            }
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            document.getElementById('stages-active-view')?.classList.add('hidden');
            document.getElementById('stages-results-view')?.classList.add('hidden');
            document.getElementById('stages-setup-view')?.classList.remove('hidden');
        }

        function returnToStagesSetup() {
            exitStagesSession();
            if (state.stagesLearningMode === 'auto') {
                renderStagesAutoDashboard();
            }
        }

        let currentSokuonModalSyllabary = 'hiragana';

        const SOKUON_DATA = {
            hiragana: {
                char: 'っ',
                normalChar: 'つ',
                syllabaryName: 'Hiragana',
                badgeText: '🌸 Hiragana (っ)',
                title: 'Chiisai Tsu (っ) / Consonante Doble',
                subtitle: 'Geminación en palabras japonesas nativas',
                explanation: 'El <strong class="text-amber-300 font-bold font-jp">っ</strong> (tsu pequeño de Hiragana) <strong class="text-rose-400">no se pronuncia</strong> como "tsu". Funciona como un <strong>golpe de voz / pausa breve</strong> (1 tiempo de silencio) que <strong class="text-sky-300">duplica la consonante</strong> del kana siguiente en Romaji.',
                sizeComparison: {
                    normal: 'つ',
                    small: 'っ',
                    normalEx: 'まつ (matsu / esperar)',
                    smallEx: 'まった (matta / esperó)'
                },
                examples: [
                    { word: 'きって', romajiPrefix: 'Ki', doubleConsonant: 'tt', romajiSuffix: 'e', meaning: 'Sello postal' },
                    { word: 'がっこう', romajiPrefix: 'Ga', doubleConsonant: 'kk', romajiSuffix: 'ou', meaning: 'Escuela' },
                    { word: 'ざっし', romajiPrefix: 'Za', doubleConsonant: 'ss', romajiSuffix: 'hi', meaning: 'Revista' },
                    { word: 'きっぷ', romajiPrefix: 'Ki', doubleConsonant: 'pp', romajiSuffix: 'u', meaning: 'Boleto / Billete' }
                ]
            },
            katakana: {
                char: 'ッ',
                normalChar: 'ツ',
                syllabaryName: 'Katakana',
                badgeText: '⚡ Katakana (ッ)',
                title: 'Chiisai Tsu (ッ) / Consonante Doble',
                subtitle: 'Consonantes dobles en préstamos extranjeros (Gairaigo)',
                explanation: 'El <strong class="text-amber-300 font-bold font-jp">ッ</strong> (tsu pequeño de Katakana) <strong class="text-rose-400">no se pronuncia</strong> como "tsu". Funciona como un <strong>golpe de voz / pausa breve</strong> que <strong class="text-sky-300">duplica la consonante</strong> siguiente. Es <strong>súper frecuente</strong> en palabras extranjeras para adaptar sonidos secos como "bed", "cup" o "ticket".',
                sizeComparison: {
                    normal: 'ツ',
                    small: 'ッ',
                    normalEx: 'マツ (matsu / pino)',
                    smallEx: 'マッチ (macchi / cerilla)'
                },
                examples: [
                    { word: 'ベッド', romajiPrefix: 'Be', doubleConsonant: 'dd', romajiSuffix: 'o', meaning: 'Cama (Bed)' },
                    { word: 'カップ', romajiPrefix: 'Ka', doubleConsonant: 'pp', romajiSuffix: 'u', meaning: 'Taza (Cup)' },
                    { word: 'サッカー', romajiPrefix: 'Sa', doubleConsonant: 'kk', romajiSuffix: 'aa', meaning: 'Fútbol (Soccer)' },
                    { word: 'チケット', romajiPrefix: 'Chi', doubleConsonant: 'ke', doubleConsonant2: 'tt', romajiSuffix: 'o', meaning: 'Boleto (Ticket)' }
                ]
            }
        };

        function setSokuonModalSyllabary(syllabary) {
            currentSokuonModalSyllabary = syllabary === 'katakana' ? 'katakana' : 'hiragana';
            renderSokuonModalContent();
        }

        function renderSokuonModalContent() {
            const data = SOKUON_DATA[currentSokuonModalSyllabary] || SOKUON_DATA.hiragana;
            const isKata = currentSokuonModalSyllabary === 'katakana';

            // Switcher tabs UI
            const tabHira = document.getElementById('sokuonTabHiragana');
            const tabKata = document.getElementById('sokuonTabKatakana');
            if (tabHira && tabKata) {
                if (isKata) {
                    tabHira.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 text-slate-400 hover:text-white';
                    tabKata.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-amber-500 text-slate-950 shadow-sm';
                } else {
                    tabHira.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-amber-500 text-slate-950 shadow-sm';
                    tabKata.className = 'flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 text-slate-400 hover:text-white';
                }
            }

            // Big character badge
            const badge = document.getElementById('sokuonCharBadge');
            if (badge) badge.textContent = data.char;

            // Title and Subtitle
            const titleEl = document.getElementById('sokuonTitle');
            if (titleEl) titleEl.textContent = data.title;
            const subTitleEl = document.getElementById('sokuonSubtitle');
            if (subTitleEl) subTitleEl.textContent = data.subtitle;

            // Explanation Text
            const expEl = document.getElementById('sokuonExplanationText');
            if (expEl) expEl.innerHTML = data.explanation;

            // Size comparison box
            const compEl = document.getElementById('sokuonComparisonBox');
            if (compEl) {
                compEl.innerHTML = `
                    <div class="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-1.5 mb-1.5">
                        <span class="font-bold text-amber-300">Comparativa de tamaño:</span>
                        <span>Normal vs Pequeño</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-center text-xs">
                        <div class="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                            <div class="font-jp text-lg font-black text-slate-300">${data.sizeComparison.normal} <span class="text-[10px] font-sans font-normal text-slate-400">(Normal)</span></div>
                            <div class="text-[10px] text-slate-400 font-mono mt-0.5">${data.sizeComparison.normalEx}</div>
                        </div>
                        <div class="bg-slate-900/90 p-2 rounded-xl border border-amber-500/40">
                            <div class="font-jp text-lg font-black text-amber-300">${data.sizeComparison.small} <span class="text-[10px] font-sans font-bold text-amber-400">(Sokuon)</span></div>
                            <div class="text-[10px] text-amber-300 font-mono mt-0.5">${data.sizeComparison.smallEx}</div>
                        </div>
                    </div>
                `;
            }

            // Examples Grid
            const gridEl = document.getElementById('sokuonExamplesGrid');
            if (gridEl) {
                gridEl.innerHTML = data.examples.map(ex => `
                    <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col gap-1 cursor-pointer hover:border-amber-500/50 hover:bg-slate-850 transition active:scale-98 shadow-sm group" data-action="speakJapanese" data-args='["${ex.word}"]' title="Toca para escuchar pronunciación">
                        <div class="flex items-center justify-between">
                            <span class="font-jp text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">${ex.word}</span>
                            <i class="fa-solid fa-volume-high text-xs text-sky-400 group-hover:scale-110 transition-transform"></i>
                        </div>
                        <div class="text-xs font-mono font-bold text-amber-400 uppercase">
                            ${ex.romajiPrefix}<span class="text-rose-400 font-black underline">${ex.doubleConsonant}</span>${ex.doubleConsonant2 ? `<span class="text-rose-400 font-black underline">${ex.doubleConsonant2}</span>` : ''}${ex.romajiSuffix}
                        </div>
                        <div class="text-[11px] text-slate-400">${ex.meaning}</div>
                    </div>
                `).join('');
            }
        }

        function showSokuonModal(contextWordObj = null) {
            // Determine initial syllabary based on contextWordObj or active app syllabary
            if (contextWordObj && ((contextWordObj.katakana && contextWordObj.katakana.includes('ッ')) || (typeof contextWordObj.word === 'string' && contextWordObj.word.includes('ッ')))) {
                currentSokuonModalSyllabary = 'katakana';
            } else if (contextWordObj && ((contextWordObj.hiragana && contextWordObj.hiragana.includes('っ')) || (typeof contextWordObj.word === 'string' && contextWordObj.word.includes('っ')))) {
                currentSokuonModalSyllabary = 'hiragana';
            } else {
                currentSokuonModalSyllabary = (state && state.currentSyllabary === 'katakana') ? 'katakana' : 'hiragana';
            }

            renderSokuonModalContent();

            const modal = document.getElementById('sokuonExplanationModal');
            if (!modal) return;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');

            const cb = document.getElementById('sokuonDoNotShowAgainCb');
            if (cb) cb.checked = !!state.sokuonTipDisabled;
        }

        function closeSokuonModal() {
            const modal = document.getElementById('sokuonExplanationModal');
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
            document.body.classList.remove('overflow-hidden');

            const cb = document.getElementById('sokuonDoNotShowAgainCb');
            if (cb) {
                state.sokuonTipDisabled = cb.checked;
                saveStateToStorage();
            }
        }

        function generateStage6Words(activeKanaObjects, coreKanaObjects = null, isAuto = false, levelIndex = -1) {
            const isKata = state.currentSyllabary === 'katakana';
            const activeChars = new Set(activeKanaObjects.map(k => k.char || k.katakana || k.hiragana));
            if (isKata) {
                activeChars.add('ー');
                activeChars.add('ッ');
            } else {
                activeChars.add('っ');
            }

            const targetVocab = isKata ? KATAKANA_VOCABULARY : EXPANDED_VOCABULARY;

            // 1. Filtro riguroso: palabras reales existentes formadas 100% por los kanas disponibles
            const matchingRealWords = targetVocab.filter(w => {
                const wordStr = isKata ? (w.katakana || w.hiragana) : w.hiragana;
                const chars = wordStr.split('');
                return chars.every(ch => activeChars.has(ch));
            });

            // Si se definieron coreKanaObjects (fila activa), separar prioritariamente las palabras
            // que contienen al menos un kana de la fila activa vs las palabras de repaso de filas previas
            let targetRowWords = [];
            let reviewWords = [];
            if (coreKanaObjects && coreKanaObjects.length > 0) {
                const coreChars = new Set(coreKanaObjects.map(k => k.hiragana));
                matchingRealWords.forEach(w => {
                    const chars = w.hiragana.split('');
                    if (chars.some(ch => coreChars.has(ch))) {
                        targetRowWords.push(w);
                    } else {
                        reviewWords.push(w);
                    }
                });
            } else {
                targetRowWords = matchingRealWords;
            }

            // Ordenar: primero las palabras de la fila activa mezcladas al azar, seguidas de las palabras de repaso
            const sortedRealWords = [
                ...shuffleArray(targetRowWords),
                ...shuffleArray(reviewWords)
            ];

            // Evitar cualquier duplicado en la lista
            const seen = new Set();
            let resultWords = [];
            sortedRealWords.forEach(w => {
                if (!seen.has(w.hiragana)) {
                    seen.add(w.hiragana);
                    const wordStr = isKata ? (w.katakana || w.hiragana) : w.hiragana;
                    resultWords.push({
                        hiragana: wordStr,
                        katakana: wordStr,
                        char: wordStr,
                        romaji: w.romaji,
                        spanish: w.spanish,
                        isCombo: false,
                        hasSokuon: wordStr.includes('っ') || wordStr.includes('ッ') || wordStr.includes('ー')
                    });
                }
            });

            // REGLAS PEDAGÓGICAS PARA COMBINACIONES SILÁBICAS:
            // 1) En Modo Automático:
            //    - Una vez que se rompe la barrera limitante (Fila Sa y Fila Ta en adelante, levelIndex >= 2):
            //      ¡SOLO PALABRAS REALES! Cero combinaciones silábicas (hay de 67 a 101+ palabras auténticas).
            //    - En Fila A (lvl 0): Solo hay vocales y casi todas las palabras son de 1-2 letras.
            //      Se usan las palabras reales primero y se complementan con combinaciones de vocales.
            //    - En Fila Ka (lvl 1): Hay palabras reales, pero si se desean más opciones se complementa.
            // 2) En Modo Manual:
            //    - Depende estrictamente de qué eligió el usuario. Si eligió pocas filas (o combinaciones sin vocales,
            //      ej: solo la fila Ta sin vocales) donde hay menos de 15 palabras reales posibles,
            //      SÍ se generan combinaciones silábicas con sus kanas elegidos para que pueda practicar.
            //    - Si el usuario eligió filas que permiten suficientes palabras reales (>= 15), se usan solo reales.
            const isBarrierBrokenInAuto = isAuto && levelIndex >= 2;
            const hasSufficientRealWords = resultWords.length >= 15;

            if (isBarrierBrokenInAuto || hasSufficientRealWords) {
                return resultWords;
            }

            // Fallback: Generar combinaciones silábicas cuando las opciones de palabras reales son insuficientes
            const targetTotal = 20;
            for (let iter = 0; iter < 100 && resultWords.length < targetTotal; iter++) {
                let len = 3;
                const roll = iter % 10;
                if (roll < 4) len = 3;
                else if (roll < 8) len = 4;
                else len = 5;

                if (activeKanaObjects.length < 3 && len > 4) len = 3;

                let hira = '', roma = '';
                const useSokuon = (iter % 5 === 0 && activeKanaObjects.length >= 2);
                if (useSokuon) {
                    const k1 = activeKanaObjects[Math.floor(Math.random() * activeKanaObjects.length)];
                    const k2 = activeKanaObjects[Math.floor(Math.random() * activeKanaObjects.length)];
                    const nextConsonant = k2.romaji ? k2.romaji.slice(0, 1) : '';
                    hira = k1.hiragana + 'っ' + k2.hiragana;
                    roma = (k1.romaji || '') + nextConsonant + (k2.romaji || '');
                    while (hira.length < len) {
                        const randomK = activeKanaObjects[Math.floor(Math.random() * activeKanaObjects.length)];
                        hira += randomK.hiragana;
                        roma += (randomK.romaji || '');
                    }
                } else {
                    for (let i = 0; i < len; i++) {
                        const randomK = activeKanaObjects[Math.floor(Math.random() * activeKanaObjects.length)];
                        hira += randomK.hiragana;
                        roma += (randomK.romaji || '');
                    }
                }

                if (!seen.has(hira)) {
                    seen.add(hira);
                    const existing = EXPANDED_VOCABULARY.find(w => w.hiragana === hira);
                    resultWords.push({
                        hiragana: hira,
                        romaji: roma,
                        spanish: existing ? existing.spanish : (useSokuon ? 'Doble consonante 🔤' : 'Combinación silábica 🔤'),
                        isCombo: !existing,
                        hasSokuon: hira.includes('っ')
                    });
                }
            }

            return resultWords;
        }

        function getStage6NextWord() {
            if (!state.stageSession.stage6WordsPool || state.stageSession.stage6WordsPool.length === 0) {
                const isAuto = !!state.stageSession.isAuto;
                const lvlIdx = isAuto ? STAGES_CURRICULUM.findIndex(l => l.id === state.stageSession.autoLevelId) : -1;
                const vocabPool = (state.stageSession.allUnlockedKanas && state.stageSession.allUnlockedKanas.length > 0)
                    ? state.stageSession.allUnlockedKanas
                    : state.stageSession.pool;
                state.stageSession.stage6WordsPool = generateStage6Words(vocabPool, state.stageSession.coreKanas, isAuto, lvlIdx);
            }

            if (!state.stageSession.stage6UsedWords) {
                state.stageSession.stage6UsedWords = new Set();
            }

            // Encontrar una palabra no usada aún en la sesión
            let availableWord = state.stageSession.stage6WordsPool.find(w => !state.stageSession.stage6UsedWords.has(w.hiragana));

            if (!availableWord) {
                const isAuto = !!state.stageSession.isAuto;
                const lvlIdx = isAuto ? STAGES_CURRICULUM.findIndex(l => l.id === state.stageSession.autoLevelId) : -1;
                const vocabPool = (state.stageSession.allUnlockedKanas && state.stageSession.allUnlockedKanas.length > 0)
                    ? state.stageSession.allUnlockedKanas
                    : state.stageSession.pool;
                const moreWords = generateStage6Words(vocabPool, state.stageSession.coreKanas, isAuto, lvlIdx);
                moreWords.forEach(w => {
                    if (!state.stageSession.stage6WordsPool.some(p => p.hiragana === w.hiragana)) {
                        state.stageSession.stage6WordsPool.push(w);
                    }
                });
                availableWord = state.stageSession.stage6WordsPool.find(w => !state.stageSession.stage6UsedWords.has(w.hiragana));
            }

            if (!availableWord) {
                availableWord = state.stageSession.stage6WordsPool[0] || WORDS_DATA[0];
            }

            state.stageSession.stage6UsedWords.add(availableWord.hiragana);
            return availableWord;
        }

        // Alias retrocompatibles
        const generateStage5Words = generateStage6Words;
        const getStage5NextWord = getStage6NextWord;

        // ==========================================================
        // SISTEMA ADAPTATIVO DE COLA DE TRAZADO (ETAPAS 8 Y 9)
        // Cooldown matemático, paso de todos los kanas y refuerzo por errores
        // ==========================================================
        function getDrawCooldown(poolLength) {
            if (poolLength <= 1) return 0;
            if (poolLength <= 3) return 1;
            if (poolLength <= 7) return poolLength - 2;
            return Math.min(6, Math.floor(poolLength * 0.6) + 1);
        }

        function initDrawQueue(pool) {
            return shuffleArray([...pool]);
        }

        function startStagesSession() {
            onStageCheckboxChange();
            const config = getActiveStagesConfig();
            if (config.selectedStages.length === 0) {
                showToast("Por favor selecciona al menos una etapa didáctica", "error");
                return;
            }

            // Collect active sound groups kanas
            const activeDataset = getActiveKanaDataset();
            let kanaPool = [];
            (config.selectedSoundGroups || ['a', 'ka']).forEach(gid => {
                const kanasInGroup = activeDataset.filter(k => k.group === gid);
                kanasInGroup.forEach(kObj => {
                    if (!kanaPool.some(p => p.hiragana === kObj.hiragana)) {
                        kanaPool.push(kObj);
                    }
                });
            });

            if (kanaPool.length === 0) {
                kanaPool = activeDataset.slice(0, 5);
            }

            // Generate stage 5 words strictly respecting selected sound groups with guaranteed NO duplicates!
            const stage5WordsPool = generateStage5Words(kanaPool);

            // Read auxiliary toggles
            const timerSpeed = config.timerSpeed || 'medium';
            const timerEnabled = (timerSpeed !== 'off');
            const autoAudio = document.getElementById('stagesAutoAudioToggle')?.checked ?? true;
            const lockMode = document.getElementById('stagesLockModeToggle')?.checked || false;

            config.timerSpeed = timerSpeed;
            config.timerEnabled = timerEnabled;
            config.autoAudio = autoAudio;
            config.lockMode = lockMode;
            state.stagesConfig.timerSpeed = timerSpeed;
            state.stagesConfig.timerEnabled = timerEnabled;
            state.stagesConfig.autoAudio = autoAudio;
            state.stagesConfig.lockMode = lockMode;
            saveStateToStorage();

            state.stageSession = {
                active: true,
                isAuto: false,
                allUnlockedKanas: null,
                coreKanas: null,
                selectedStages: [...config.selectedStages],
                currentStageIndex: 0,
                currentItemIndex: 0,
                activeStageNum: null,
                pool: shuffleArray([...kanaPool]),
                stage7WordsPool: stage5WordsPool,
                stage6WordsPool: stage5WordsPool,
                stage5WordsPool: stage5WordsPool,
                stage7UsedWords: new Set(),
                stage6UsedWords: new Set(),
                stage5UsedWords: new Set(),
                currentStage7Word: null,
                currentStage6Word: null,
                currentStage5Word: null,
                stageQueue: [],
                stageStatuses: {}, // [stageNum]: 'perfect' | 'with_errors' | 'skipped'
                stageErrorsCount: {}, // [stageNum]: error count in this stage
                hasSkippedInStage: {}, // [stageNum]: boolean
                introducedInStage: { 1: new Set(), 2: new Set() },
                stage3Chunks: [],
                // Stage 8 & 9 Adaptive Queues
                stage8Queue: initDrawQueue(kanaPool),
                stage9Queue: initDrawQueue(kanaPool),
                drawStats: {}, // [hiragana]: { timesDrawn: 0, errorCount: 0, consecutiveClean: 0 }
                recentDrawHistory: [], // FIFO buffer of recent kana hiragana
                streamIndex: 0,
                matchedPairs: [],
                selectedPairCard: null,
                isStageLocked: lockMode,
                stageLoopRounds: 1,
                firstAttemptEvaluated: {},
                pendingMistakes: new Set(),
                reinsertCount: {},
                timerSeconds: 15,
                timerInterval: null,
                stats: {
                    totalCorrect: 0,
                    totalErrors: 0,
                    xpEarned: 0,
                    stageResults: {}
                }
            };

            document.getElementById('stages-setup-view')?.classList.add('hidden');
            document.getElementById('stages-results-view')?.classList.add('hidden');
            document.getElementById('stages-active-view')?.classList.remove('hidden');

            renderCurrentStageExercise();
        }

        function getCurrentStageNumber() {
            return state.stageSession.selectedStages[state.stageSession.currentStageIndex];
        }

        // ==========================================================
        // GENERADOR INTELIGENTE DE DISTRACTORES (CONTEXTUAL + GEMELOS)
        // ==========================================================
        function getStageDistractors(targetItem, count) {
            const pool = state.stageSession?.pool || [];
            const targetHira = targetItem.hiragana;
            
            // 1. Kanas similares de "Duelo de Gemelos" (LOOKALIKES_DATA)
            const lookalikeCandidates = [];
            if (typeof LOOKALIKES_DATA !== 'undefined') {
                LOOKALIKES_DATA.forEach(entry => {
                    const inOptions = entry.options && entry.options.includes(targetHira);
                    const isTarget = entry.target === targetHira;
                    if (inOptions || isTarget) {
                        const candidates = entry.options ? entry.options.filter(h => !areKanaHomophones(h, targetHira)) : [];
                        candidates.forEach(candHira => {
                            if (!lookalikeCandidates.includes(candHira)) {
                                lookalikeCandidates.push(candHira);
                            }
                        });
                    }
                });
            }

            const chosen = [];
            
            // PEDAGOGY RULE: Forzar que AL MENOS 1 distractor sea un gemelo visual si existe en LOOKALIKES_DATA
            const activeDataset = getActiveKanaDataset();
            const activeSrs = getActiveSRS();
            if (lookalikeCandidates.length > 0 && count > 0) {
                // Priorizar gemelos que estén en el pool de la sesión o vistos en SRS
                const priorityLookalikes = lookalikeCandidates.filter(h => 
                    pool.some(p => p.hiragana === h) || (activeSrs?.[h]?.reviews > 0)
                );
                const pickList = priorityLookalikes.length > 0 ? priorityLookalikes : lookalikeCandidates;
                const pickedHira = pickList[Math.floor(Math.random() * pickList.length)];
                const pickedObj = activeDataset.find(k => k.hiragana === pickedHira) || HIRAGANA_DATA.find(k => k.hiragana === pickedHira);
                if (pickedObj) {
                    chosen.push(pickedObj);
                }
            }

            // 2. Completar con kanas del pool de la sesión
            // Ni el propio kana ni uno que suene igual (じ/ぢ, ず/づ, お/を)
            const isUsable = k => !areKanaHomophones(k.hiragana, targetHira) &&
                !chosen.some(c => areKanaHomophones(c.hiragana, k.hiragana));
            const poolDistractors = pool.filter(isUsable);
            const shuffledPool = shuffleArray([...poolDistractors]);
            for (const p of shuffledPool) {
                if (chosen.length < count && isUsable(p)) {
                    chosen.push(p);
                }
            }

            // 3. Respaldo general: si aún faltan distractores (ej. pool muy pequeño)
            if (chosen.length < count) {
                const remainingExternal = activeDataset.filter(isUsable);
                const seenExternal = remainingExternal.filter(k => activeSrs?.[k.hiragana]?.reviews > 0);
                const unseenExternal = remainingExternal.filter(k => !activeSrs?.[k.hiragana] || activeSrs[k.hiragana].reviews === 0);
                const fallbackList = [...shuffleArray(seenExternal), ...shuffleArray(unseenExternal)];
                
                for (const fb of fallbackList) {
                    if (chosen.length < count && isUsable(fb)) {
                        chosen.push(fb);
                    }
                }
            }

            return chosen;
        }

        // ==========================================================
        // DOSIFICACIÓN PARA ETAPA 4: MICRO-TABLEROS DE 5 PAREJAS
        // ==========================================================
        function getStage4Chunks(pool, numGroups) {
            const useMicroBoards = numGroups >= 4 || (numGroups >= 3 && pool.length > 10);
            if (!useMicroBoards) {
                return [pool];
            }

            const chunks = [];
            for (let i = 0; i < pool.length; i += 5) {
                chunks.push(pool.slice(i, i + 5));
            }
            return chunks.length > 0 ? chunks : [pool];
        }
        const getStage3Chunks = getStage4Chunks;

        // ==========================================================
        // TEMPORIZADOR ADAPTATIVO CALIBRADO (3 VELOCIDADES Y APAGADO)
        // ==========================================================
        const STAGE_TIMER_PRESETS = {
            slow: {
                1: 20, // Opción Múltiple
                2: 20, // Opción Inversa
                3: 25, // Escucha Fonética
                4: 50, // Parejas (Micro-tablero)
                5: 25, // Teclado Kana
                6: 50, // Texto Continuo (20 kanas)
                7: 35, // Vocabulario (Palabras)
                8: 45, // Trazos con Guía
                9: 50  // Trazos a Ciegas
            },
            medium: {
                1: 10,
                2: 10,
                3: 12,
                4: 30,
                5: 12,
                6: 30,
                7: 20,
                8: 25,
                9: 30
            },
            fast: {
                1: 5,
                2: 5,
                3: 6,
                4: 15,
                5: 6,
                6: 18,
                7: 10,
                8: 12,
                9: 15
            }
        };

        function getStageTimerSpeed() {
            const config = getActiveStagesConfig();
            if (config.timerSpeed) return config.timerSpeed;
            return config.timerEnabled ? 'medium' : 'off';
        }

        function setStagesTimerSpeed(speed) {
            const config = getActiveStagesConfig();
            config.timerSpeed = speed;
            config.timerEnabled = (speed !== 'off');
            if (state.currentSyllabary === 'katakana') {
                if (!state.stagesConfig_katakana) state.stagesConfig_katakana = {};
                state.stagesConfig_katakana.timerSpeed = speed;
                state.stagesConfig_katakana.timerEnabled = (speed !== 'off');
            } else {
                if (!state.stagesConfig) state.stagesConfig = {};
                state.stagesConfig.timerSpeed = speed;
                state.stagesConfig.timerEnabled = (speed !== 'off');
            }
            saveStateToStorage();
            updateStagesTimerSpeedUI();
        }

        function updateStagesTimerSpeedUI() {
            const speed = getStageTimerSpeed();
            const btns = document.querySelectorAll('#stagesTimerSpeedSelector .stages-speed-btn');
            btns.forEach(btn => {
                const s = btn.dataset.speed;
                if (s === speed) {
                    btn.className = 'stages-speed-btn px-2.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black shadow transition';
                } else {
                    btn.className = 'stages-speed-btn px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition';
                }
            });

            const hiddenCheckbox = document.getElementById('stagesTimerToggle');
            if (hiddenCheckbox) hiddenCheckbox.checked = (speed !== 'off');
        }

        function setupStageExerciseTimer() {
            if (state.stageSession.timerInterval) {
                clearInterval(state.stageSession.timerInterval);
                state.stageSession.timerInterval = null;
            }

            const stageNum = getCurrentStageNumber();
            const speed = getStageTimerSpeed();
            const timerBadge = document.getElementById('stageTimerBadge');
            const timerSecs = document.getElementById('stageTimerSeconds');
            const speedIcon = document.getElementById('stageTimerSpeedIcon');

            if (speed === 'off' || !state.stageSession.active) {
                if (timerBadge) {
                    timerBadge.classList.add('hidden');
                    timerBadge.classList.remove('flex');
                }
                return;
            }

            const duration = STAGE_TIMER_PRESETS[speed]?.[stageNum] || 15;
            state.stageSession.timerSeconds = duration;

            if (timerBadge) {
                timerBadge.classList.remove('hidden');
                timerBadge.classList.add('flex');
                timerBadge.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono transition-all duration-300';
            }

            const iconMap = { slow: '🐢', medium: '⚡', fast: '🔥' };
            if (speedIcon) speedIcon.textContent = iconMap[speed] || '⚡';
            if (timerSecs) timerSecs.textContent = `${duration}s`;

            state.stageSession.timerInterval = setInterval(() => {
                state.stageSession.timerSeconds--;
                if (timerSecs) timerSecs.textContent = `${state.stageSession.timerSeconds}s`;

                // Transición cromática de advertencia
                const pct = state.stageSession.timerSeconds / duration;
                if (timerBadge) {
                    if (pct > 0.45) {
                        timerBadge.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono transition-all duration-300';
                    } else if (pct > 0.20) {
                        timerBadge.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono transition-all duration-300';
                    } else {
                        timerBadge.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/25 border border-rose-500/50 text-rose-300 text-xs font-bold font-mono animate-pulse transition-all duration-300';
                    }
                }

                if (state.stageSession.timerSeconds <= 0) {
                    clearInterval(state.stageSession.timerInterval);
                    state.stageSession.timerInterval = null;
                    playSoundTone(220, 'sawtooth', 0.25);
                    showToast('⏱️ ¡Tiempo agotado!', 'error');

                    const itemIdx = state.stageSession.currentItemIndex;
                    const curItem = state.stageSession.stageQueue?.[itemIdx];
                    const kanaChar = curItem?.hiragana || curItem?.katakana || curItem?.character;

                    handleStageAnswer(false, '¡Tiempo agotado!', kanaChar);

                    const optBtns = document.querySelectorAll('.stage-opt-btn');
                    if (optBtns.length > 0) {
                        optBtns.forEach(b => b.disabled = true);
                        if (stageNum === 1 && curItem) {
                            optBtns.forEach(b => {
                                if (b.textContent.trim().toLowerCase() === curItem.romaji.toLowerCase()) {
                                    b.className = 'stage-opt-btn py-4 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-mono text-xl font-bold uppercase flex items-center justify-center gap-1.5';
                                }
                            });
                        } else if ((stageNum === 2 || stageNum === 3) && curItem) {
                            optBtns.forEach(b => {
                                if (b.textContent.trim() === (curItem.hiragana || curItem.katakana)) {
                                    b.className = 'stage-opt-btn py-3.5 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-jp text-4xl font-bold flex items-center justify-center gap-2';
                                }
                            });
                        }
                    }

                    setTimeout(() => nextStageExercise(), 950);
                }
            }, 1000);
        }

        function toggleStageTimerInSession() {
            const currentSpeed = getStageTimerSpeed();
            const order = ['off', 'slow', 'medium', 'fast'];
            const nextIdx = (order.indexOf(currentSpeed) + 1) % order.length;
            const nextSpeed = order[nextIdx];

            setStagesTimerSpeed(nextSpeed);

            const speedLabels = {
                off: '⏹️ Apagado (Sin prisa)',
                slow: '🐢 Lento (Relajado)',
                medium: '⚡ Medio (Equilibrado)',
                fast: '🔥 Rápido (Desafío veloz)'
            };
            showToast(`⏱️ Temporizador: ${speedLabels[nextSpeed]}`, 'info');

            setupStageExerciseTimer();
            updateStageActiveControlButtons();
        }

        function updateStageActiveControlButtons() {
            const speed = getStageTimerSpeed();
            const timerLabel = document.getElementById('stageTimerToggleLabel');
            if (timerLabel) {
                const map = {
                    off: 'Temporizador: Off',
                    slow: 'Temporizador: 🐢 Lento',
                    medium: 'Temporizador: ⚡ Medio',
                    fast: 'Temporizador: 🔥 Rápido'
                };
                timerLabel.textContent = map[speed] || 'Temporizador';
            }

            const timerBtn = document.getElementById('stageTimerToggleBtn');
            if (timerBtn) {
                if (speed !== 'off') {
                    timerBtn.className = 'py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-sm';
                } else {
                    timerBtn.className = 'py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 font-bold flex items-center justify-center gap-2 transition active:scale-95';
                }
            }
        }

        // ==========================================================
        // CONTROL DE BUCLE DE DOMINIO INFINITO (BLOQUEO DE ETAPA)
        // ==========================================================
        function updateStageLockBtnUI() {
            const isLocked = !!state.stageSession?.isStageLocked;
            const lockBtn = document.getElementById('stageLockBtn');
            const lockIcon = document.getElementById('stageLockIcon');
            const lockLabel = document.getElementById('stageLockLabel');

            if (lockBtn) {
                if (isLocked) {
                    lockBtn.className = 'py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 border border-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition active:scale-95';
                } else {
                    lockBtn.className = 'py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 font-bold flex items-center justify-center gap-2 transition active:scale-95';
                }
            }
            if (lockIcon) {
                lockIcon.className = isLocked ? 'fa-solid fa-lock text-slate-950' : 'fa-solid fa-lock text-slate-400';
            }
            if (lockLabel) {
                lockLabel.textContent = isLocked ? 'Etapa fijada (Bucle)' : 'Bloquear etapa';
            }
        }

        function toggleCurrentStageLock() {
            state.stageSession.isStageLocked = !state.stageSession.isStageLocked;
            updateStageLockBtnUI();
            showToast(state.stageSession.isStageLocked 
                ? "🔒 Etapa bloqueada en Bucle de Dominio (se repetirá con nuevos ejercicios hasta desbloquear)" 
                : "🔓 Etapa desbloqueada (avanzará a la siguiente etapa al terminar)", "info");
        }

        function repeatCurrentStageLoop() {
            const stageNum = getCurrentStageNumber();
            state.stageSession.stageLoopRounds = (state.stageSession.stageLoopRounds || 1) + 1;

            playSoundTone(587.33, 'sine', 0.15);
            setTimeout(() => playSoundTone(880, 'sine', 0.22), 120);

            showToast(`🔁 Bucle de Dominio: Etapa ${stageNum} (Ronda ${state.stageSession.stageLoopRounds})`, "info");

            state.stageSession.currentItemIndex = 0;
            state.stageSession.firstAttemptEvaluated = {};
            state.stageSession.pendingMistakes = new Set();
            if (!state.stageSession.stageErrorsCount) state.stageSession.stageErrorsCount = {};
            state.stageSession.stageErrorsCount[stageNum] = 0;

            const pool = state.stageSession.pool;
            if (stageNum === 4) {
                const numGroups = state.stagesConfig.selectedSoundGroups?.length || 1;
                state.stageSession.stage4Chunks = getStage4Chunks(pool, numGroups);
                state.stageSession.stage3Chunks = state.stageSession.stage4Chunks;
            } else if (stageNum === 6) {
                state.stageSession.stageQueue = [...pool];
            } else if (stageNum === 7) {
                state.stageSession.currentStage7Word = null;
                state.stageSession.currentStage6Word = null;
                state.stageSession.stage7UsedWords.clear();
                state.stageSession.stageQueue = shuffleArray([...(state.stageSession.stage7WordsPool || [])]).slice(0, 10);
            } else if (stageNum === 8 || stageNum === 9) {
                const drawPool = (state.stageSession.coreKanas && state.stageSession.coreKanas.length > 0) 
                    ? state.stageSession.coreKanas 
                    : pool;
                state.stageSession.stageQueue = initDrawQueue(drawPool);
            } else {
                state.stageSession.stageQueue = shuffleArray([...pool]);
            }

            renderCurrentStageExercise();
        }

        // ==========================================================
        // REINSERCIÓN OBLIGATORIA CON ESPACIADO INTELIGENTE
        // ==========================================================
        function reinsertFailedStageItem(item) {
            if (!state.stageSession || !state.stageSession.stageQueue) return;
            const queue = state.stageSession.stageQueue;
            const curIdx = state.stageSession.currentItemIndex;
            const stageNum = getCurrentStageNumber();
            const pool = (stageNum === 7 && state.stageSession.stage7WordsPool) 
                ? state.stageSession.stage7WordsPool 
                : state.stageSession.pool;

            const targetKey = item.hiragana || item.romaji || item.katakana || item.word;
            const remainingAhead = queue.length - (curIdx + 1);

            if (!state.stageSession.reinsertCount) state.stageSession.reinsertCount = {};
            state.stageSession.reinsertCount[targetKey] = (state.stageSession.reinsertCount[targetKey] || 0) + 1;

            const reinsertedItem = { ...item, _isReinserted: true, _reinsertCount: state.stageSession.reinsertCount[targetKey] };

            if (remainingAhead >= 2) {
                // Hay al menos 2 preguntas por delante. Intercalar 2 o 3 preguntas antes del reintento
                const offset = remainingAhead >= 3 ? (Math.random() < 0.5 ? 2 : 3) : 2;
                const targetIdx = Math.min(queue.length, curIdx + 1 + offset);
                queue.splice(targetIdx, 0, reinsertedItem);
            } else if (remainingAhead === 1) {
                // Solo queda 1 pregunta por delante. Añadir 1 item intermedio del pool y luego el fallido
                const fillerCandidates = pool.filter(k => (k.hiragana || k.romaji) !== targetKey);
                const filler = fillerCandidates.length > 0 
                    ? fillerCandidates[Math.floor(Math.random() * fillerCandidates.length)]
                    : pool[0];
                if (filler) queue.push({ ...filler, _isFiller: true });
                queue.push(reinsertedItem);
            } else {
                // Era la última pregunta. Inyectar 2 preguntas intermedias de repaso antes del reintento
                const fillerCandidates = pool.filter(k => (k.hiragana || k.romaji) !== targetKey);
                const shuffledFillers = shuffleArray([...fillerCandidates]).slice(0, 2);
                if (shuffledFillers.length === 0 && pool.length > 0) shuffledFillers.push(pool[0]);
                shuffledFillers.forEach(f => queue.push({ ...f, _isFiller: true }));
                queue.push(reinsertedItem);
            }

            const subEl = document.getElementById('stageSubIndicator');
            if (subEl) {
                subEl.textContent = `Ejercicio ${curIdx + 1} de ${queue.length} (refuerzo añadido)`;
            }
        }

        function renderCurrentStageExercise() {
            if (state.stageSession.timerInterval) {
                clearInterval(state.stageSession.timerInterval);
                state.stageSession.timerInterval = null;
            }

            const stageNum = getCurrentStageNumber();
            const meta = STAGE_METADATA.find(m => m.num === stageNum);
            const pool = state.stageSession.pool;

            // Inicializar la cola de la etapa si cambiamos de etapa o no existe
            if (state.stageSession.activeStageNum !== stageNum || !state.stageSession.stageQueue || state.stageSession.stageQueue.length === 0) {
                state.stageSession.activeStageNum = stageNum;
                state.stageSession.currentItemIndex = 0;
                if (!state.stageSession.stageErrorsCount) state.stageSession.stageErrorsCount = {};
                if (!state.stageSession.hasSkippedInStage) state.stageSession.hasSkippedInStage = {};

                if (stageNum === 4) {
                    const numGroups = state.stagesConfig.selectedSoundGroups?.length || 1;
                    state.stageSession.stage4Chunks = getStage4Chunks(pool, numGroups);
                    state.stageSession.stage3Chunks = state.stageSession.stage4Chunks;
                } else if (stageNum === 6) {
                    state.stageSession.stageQueue = [...pool];
                } else if (stageNum === 7) {
                    const isAuto = !!state.stageSession.isAuto;
                    const lvlIdx = isAuto ? STAGES_CURRICULUM.findIndex(l => l.id === state.stageSession.autoLevelId) : -1;
                    const vocabPool = (state.stageSession.allUnlockedKanas && state.stageSession.allUnlockedKanas.length > 0)
                        ? state.stageSession.allUnlockedKanas
                        : pool;
                    state.stageSession.stage7WordsPool = generateStage6Words(vocabPool, state.stageSession.coreKanas, isAuto, lvlIdx);
                    state.stageSession.stage6WordsPool = state.stageSession.stage7WordsPool;
                    state.stageSession.stageQueue = state.stageSession.stage7WordsPool.slice(0, 10);
                } else if (stageNum === 8 || stageNum === 9) {
                    const drawPool = (state.stageSession.coreKanas && state.stageSession.coreKanas.length > 0) 
                        ? state.stageSession.coreKanas 
                        : pool;
                    state.stageSession.stageQueue = initDrawQueue(drawPool);
                } else {
                    state.stageSession.stageQueue = shuffleArray([...pool]);
                }
            }

            const itemIdx = state.stageSession.currentItemIndex;

            let curItem;
            let totalItemsInStage = 5;

            if (stageNum === 4) {
                const chunks = state.stageSession.stage4Chunks || state.stageSession.stage3Chunks || [pool];
                totalItemsInStage = chunks.length;
                const chunkIdx = itemIdx % chunks.length;
                curItem = chunks[chunkIdx];
            } else if (stageNum === 6) {
                totalItemsInStage = 1;
                curItem = pool;
            } else {
                totalItemsInStage = state.stageSession.stageQueue.length;
                curItem = state.stageSession.stageQueue[itemIdx % state.stageSession.stageQueue.length];
            }

            // Update Quick Selector Pills
            updateStageQuickSelectorPills();

            // Update Header
            const roundNum = state.stageSession.stageLoopRounds || 1;
            const isLocked = state.stageSession.isStageLocked;
            const badgeEl = document.getElementById('stageBadgeIndicator');
            if (badgeEl) {
                badgeEl.textContent = `Etapa ${state.stageSession.currentStageIndex + 1}/${state.stageSession.selectedStages.length}${roundNum > 1 ? ` (Ronda ${roundNum})` : ''}`;
            }

            const titleEl = document.getElementById('stageTitleIndicator');
            if (titleEl) titleEl.textContent = meta ? meta.name : `Etapa ${stageNum}`;

            const subEl = document.getElementById('stageSubIndicator');
            const roundPrefix = (isLocked || roundNum > 1) ? `Ronda ${roundNum} • ` : '';
            if (subEl) {
                const reinsertBadge = curItem?._isReinserted 
                    ? ` <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"><i class="fa-solid fa-rotate-right"></i> Refuerzo</span>` 
                    : (curItem?._isFiller ? ` <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700/60 text-slate-300 border border-slate-600/50">Repaso</span>` : '');
                if (stageNum === 4) {
                    const chunksCount = state.stageSession.stage4Chunks ? state.stageSession.stage4Chunks.length : 1;
                    subEl.innerHTML = (chunksCount > 1 
                        ? `${roundPrefix}Micro-tablero ${itemIdx + 1} de ${totalItemsInStage} (${curItem.length} parejas)`
                        : `${roundPrefix}Tablero de Parejas (${curItem.length} parejas)`) + reinsertBadge;
                } else if (stageNum === 6) {
                    subEl.innerHTML = `${roundPrefix}Flujo Continuo (Mecanografía Rápida)` + reinsertBadge;
                } else if (stageNum === 7) {
                    subEl.innerHTML = `${roundPrefix}Ejercicio ${itemIdx + 1} de ${totalItemsInStage} (Palabras de Vocabulario)` + reinsertBadge;
                } else {
                    subEl.innerHTML = `${roundPrefix}Ejercicio ${itemIdx + 1} de ${totalItemsInStage}` + reinsertBadge;
                }
            }

            const overallProgress = Math.round(((state.stageSession.currentStageIndex + (itemIdx / totalItemsInStage)) / state.stageSession.selectedStages.length) * 100);
            const pBar = document.getElementById('stageSessionProgressBar');
            if (pBar) pBar.style.width = `${Math.min(100, Math.max(5, overallProgress))}%`;

            // Setup buttons and calibrated timer
            updateStageLockBtnUI();
            updateStageActiveControlButtons();
            setupStageExerciseTimer();

            const workspace = document.getElementById('stageWorkspaceContainer');
            if (!workspace) return;
            workspace.innerHTML = '';

            // Ensure stage 7 gets fresh unique word
            if (stageNum === 7 && !state.stageSession.currentStage7Word && !state.stageSession.currentStage6Word) {
                state.stageSession.currentStage7Word = getStage6NextWord();
                state.stageSession.currentStage6Word = state.stageSession.currentStage7Word;
            }

            // Render stage content con la secuencia cognitiva
            switch (stageNum) {
                case 1:
                    renderStage1_MultipleChoice(workspace, curItem);
                    break;
                case 2:
                    renderStage2_ReverseChoice(workspace, curItem);
                    break;
                case 3:
                    renderStage3_Listening(workspace, curItem);
                    break;
                case 4:
                    renderStage4_MatchingPairs(workspace, curItem, itemIdx, totalItemsInStage);
                    break;
                case 5:
                    renderStage5_TypeResponse(workspace, curItem);
                    break;
                case 6:
                    renderStage6_StreamText(workspace, pool);
                    break;
                case 7:
                    renderStage7_TypeWord(workspace);
                    break;
                case 8:
                    renderStage8_StrokeOrder(workspace, curItem);
                    break;
                case 9:
                    renderStage9_BlindDraw(workspace, curItem);
                    break;
                default:
                    renderStage1_MultipleChoice(workspace, curItem);
            }
        }

        function playStageCurrentAudio() {
            const stageNum = getCurrentStageNumber();
            let item;
            if (stageNum === 8 && state.stageSession.stage8Queue) {
                item = state.stageSession.stage8Queue[state.stageSession.currentItemIndex % state.stageSession.stage8Queue.length];
            } else if (stageNum === 9 && state.stageSession.stage9Queue) {
                item = state.stageSession.stage9Queue[state.stageSession.currentItemIndex % state.stageSession.stage9Queue.length];
            } else if (state.stageSession.stageQueue && state.stageSession.stageQueue.length > 0) {
                item = state.stageSession.stageQueue[state.stageSession.currentItemIndex % state.stageSession.stageQueue.length];
            } else {
                item = state.stageSession.pool[state.stageSession.currentItemIndex % state.stageSession.pool.length];
            }
            if (item) speakJapanese(item.hiragana);
        }

        function prevStageExercise() {
            state.stageSession.currentStage5Word = null;
            state.stageSession.currentStage6Word = null;
            state.stageSession.currentStage7Word = null;
            if (state.stageSession.currentItemIndex > 0) {
                state.stageSession.currentItemIndex--;
            } else if (state.stageSession.currentStageIndex > 0) {
                state.stageSession.currentStageIndex--;
                state.stageSession.currentItemIndex = 0;
                state.stageSession.activeStageNum = null;
            }
            renderCurrentStageExercise();
        }

        function nextStageExercise(skip = false) {
            state.stageSession.currentStage5Word = null;
            state.stageSession.currentStage6Word = null;
            state.stageSession.currentStage7Word = null;
            const stageNum = getCurrentStageNumber();
            if (skip) {
                if (!state.stageSession.hasSkippedInStage) state.stageSession.hasSkippedInStage = {};
                state.stageSession.hasSkippedInStage[stageNum] = true;
            }

            let totalItemsInStage = 5;
            if (stageNum === 4) {
                totalItemsInStage = state.stageSession.stage4Chunks ? state.stageSession.stage4Chunks.length : (state.stageSession.stage3Chunks ? state.stageSession.stage3Chunks.length : 1);
            } else if (stageNum === 6) {
                totalItemsInStage = 1;
            } else if (state.stageSession.stageQueue) {
                totalItemsInStage = state.stageSession.stageQueue.length;
            } else {
                totalItemsInStage = state.stageSession.pool.length;
            }

            if (state.stageSession.currentItemIndex + 1 < totalItemsInStage) {
                state.stageSession.currentItemIndex++;
                renderCurrentStageExercise();
            } else {
                // Verificar si aún quedan errores pendientes por corregir (Reinserción obligatoria)
                const hasPendingMistakes = state.stageSession.pendingMistakes && state.stageSession.pendingMistakes.size > 0;
                if (hasPendingMistakes && !skip && [1, 2, 3, 5, 7, 8, 9].includes(stageNum)) {
                    // Reencolar los errores pendientes si alguno no fue resuelto
                    const curQueue = state.stageSession.stageQueue;
                    state.stageSession.pendingMistakes.forEach(errChar => {
                        const original = state.stageSession.pool.find(k => (k.hiragana || k.romaji) === errChar) 
                            || (state.stageSession.stage7WordsPool && state.stageSession.stage7WordsPool.find(w => w.hiragana === errChar));
                        if (original) curQueue.push({ ...original, _isReinserted: true });
                    });
                    totalItemsInStage = curQueue.length;
                    state.stageSession.currentItemIndex++;
                    renderCurrentStageExercise();
                    return;
                }

                // Etapa finalizada: Registrar estado pedagógico por colores
                if (!state.stageSession.stageStatuses) state.stageSession.stageStatuses = {};
                const errors = state.stageSession.stageErrorsCount?.[stageNum] || 0;
                const hasSkipped = !!state.stageSession.hasSkippedInStage?.[stageNum];

                if (hasSkipped) {
                    state.stageSession.stageStatuses[stageNum] = 'skipped'; // Rojo: Omitida
                } else if (errors === 0) {
                    state.stageSession.stageStatuses[stageNum] = 'perfect'; // Verde: Sin errores
                } else {
                    state.stageSession.stageStatuses[stageNum] = 'with_errors'; // Amarillo: Con errores corregidos
                }
                updateStageQuickSelectorPills();

                // Stage Mastered Toast
                if (!hasSkipped) {
                    if (errors === 0) {
                        showToast(`🏆 ¡Etapa ${stageNum} Superada de forma impecable!`, "success");
                        addXP(50);
                    } else {
                        showToast(`✨ Etapa ${stageNum} completada tras reforzar los fallos.`, "info");
                        addXP(30);
                    }
                }

                // Si la etapa está bloqueada en Bucle de Dominio, repetir indefinidamente
                if (state.stageSession.isStageLocked && !skip) {
                    repeatCurrentStageLoop();
                    return;
                }

                // Avanzar fluidamente a la siguiente etapa seleccionada o finalizar
                state.stageSession.currentStageIndex++;
                state.stageSession.currentItemIndex = 0;
                state.stageSession.activeStageNum = null;
                if (state.stageSession.currentStageIndex < state.stageSession.selectedStages.length) {
                    renderCurrentStageExercise();
                } else {
                    finishStagesSession();
                }
            }
        }

        function handleStageAnswer(isCorrect, customMsg = null, kanaChar = null, isPresentation = false) {
            if (state.stageSession.timerInterval) {
                clearInterval(state.stageSession.timerInterval);
                state.stageSession.timerInterval = null;
            }

            const curStageNum = getCurrentStageNumber();
            if (!state.stageSession.stats.stageResults[curStageNum]) {
                state.stageSession.stats.stageResults[curStageNum] = { correct: 0, errors: 0 };
            }
            if (!state.stageSession.stageErrorsCount) state.stageSession.stageErrorsCount = {};
            if (!state.stageSession.pendingMistakes) state.stageSession.pendingMistakes = new Set();
            if (!state.stageSession.firstAttemptEvaluated) state.stageSession.firstAttemptEvaluated = {};

            if (isPresentation) {
                // Modo presentación guiado: Excluido de estadísticas y XP.
                const curItem = state.stageSession.stageQueue?.[state.stageSession.currentItemIndex];
                if (curItem) {
                    reinsertFailedStageItem(curItem);
                }
                return;
            }

            // Fallback para kanaChar si no vino explícito (ej: tiempo agotado)
            if (!kanaChar) {
                const curItem = state.stageSession.stageQueue?.[state.stageSession.currentItemIndex];
                if (curItem) {
                    kanaChar = curItem.hiragana || curItem.katakana || curItem.character;
                }
            }

            // Registro individual de rendimiento por kana para cálculo de maestría acumulativa
            if (kanaChar) {
                if (!state.stageSession.sessionKanaStats) state.stageSession.sessionKanaStats = {};
                if (!state.stageSession.sessionKanaStats[kanaChar]) {
                    state.stageSession.sessionKanaStats[kanaChar] = { attempts: 0, correct: 0 };
                }
                // Etapas con evaluación directa: 1, 2, 3 (Audio), 5 (Teclado), 7 (Palabras), 8 y 9 (Trazos/Dibujo)
                if ([1, 2, 3, 5, 7, 8, 9].includes(curStageNum)) {
                    state.stageSession.sessionKanaStats[kanaChar].attempts++;
                    if (isCorrect) state.stageSession.sessionKanaStats[kanaChar].correct++;
                } else if (curStageNum === 4) {
                    // Etapa 4 (Parejas): solo registrar aciertos
                    if (isCorrect) {
                        state.stageSession.sessionKanaStats[kanaChar].attempts++;
                        state.stageSession.sessionKanaStats[kanaChar].correct++;
                    }
                }
            }

            const isFirstAttempt = kanaChar ? !state.stageSession.firstAttemptEvaluated[kanaChar] : true;

            if (isCorrect) {
                state.stageSession.stats.totalCorrect++;
                state.stageSession.stats.stageResults[curStageNum].correct++;
                triggerHaptic('success');
                playSoundTone(659.25, 'sine', 0.15);

                if (isFirstAttempt) {
                    // Primer intento en esta ronda: evaluación y promoción SRS genuina
                    if (kanaChar) {
                        state.stageSession.firstAttemptEvaluated[kanaChar] = true;
                        recordKanaResult(kanaChar, true);
                    }
                    state.stageSession.stats.xpEarned += 10;
                    addXP(10);
                } else {
                    // Reintento de un error previo (refuerzo superado):
                    // No inflar SRS en la misma ronda, pero liberar el fallo y otorgar XP de recuperación
                    if (kanaChar) {
                        state.stageSession.pendingMistakes.delete(kanaChar);
                    }
                    state.stageSession.stats.xpEarned += 5;
                    addXP(5);
                    showToast(customMsg || `💪 ¡Refuerzo completado! Has corregido el kana.`, "success");
                }
            } else {
                state.stageSession.stats.totalErrors++;
                state.stageSession.stats.stageResults[curStageNum].errors++;
                state.stageSession.stageErrorsCount[curStageNum] = (state.stageSession.stageErrorsCount[curStageNum] || 0) + 1;
                triggerHaptic('error');
                playSoundTone(220, 'sawtooth', 0.25);

                if (kanaChar) {
                    state.stageSession.pendingMistakes.add(kanaChar);
                }

                if (isFirstAttempt) {
                    // Primer intento fallido: democión a Caja 1 en el sistema SRS
                    if (kanaChar) {
                        state.stageSession.firstAttemptEvaluated[kanaChar] = true;
                        recordKanaResult(kanaChar, false);
                    }
                }

                // Reinserción obligatoria con espaciado inteligente (Etapas 1, 2, 3, 5, 7, 8, 9)
                if ([1, 2, 3, 5, 7, 8, 9].includes(curStageNum)) {
                    const curItem = state.stageSession.stageQueue?.[state.stageSession.currentItemIndex];
                    if (curItem) {
                        reinsertFailedStageItem(curItem);
                    }
                }
            }
        }

        function jumpToStage(targetIndex) {
            if (targetIndex >= 0 && targetIndex < state.stageSession.selectedStages.length) {
                if (state.stageSession.timerInterval) {
                    clearInterval(state.stageSession.timerInterval);
                    state.stageSession.timerInterval = null;
                }
                const curStageNum = getCurrentStageNumber();
                if (targetIndex !== state.stageSession.currentStageIndex) {
                    if (!state.stageSession.stageStatuses[curStageNum]) {
                        state.stageSession.stageStatuses[curStageNum] = 'skipped';
                    }
                }
                state.stageSession.currentStage5Word = null;
                state.stageSession.currentStageIndex = targetIndex;
                state.stageSession.currentItemIndex = 0;
                state.stageSession.activeStageNum = null;
                renderCurrentStageExercise();
                const stNum = state.stageSession.selectedStages[targetIndex];
                const meta = STAGE_METADATA.find(m => m.num === stNum);
                showToast(`Etapa ${stNum}: ${meta ? meta.name : ''}`, "info");
            }
        }

        function jumpToPrevStage() {
            if (state.stageSession.currentStageIndex > 0) {
                jumpToStage(state.stageSession.currentStageIndex - 1);
            } else {
                showToast("Estás en la primera etapa seleccionada", "info");
            }
        }

        function jumpToNextStage() {
            const curStageNum = getCurrentStageNumber();
            if (!state.stageSession.stageStatuses[curStageNum]) {
                state.stageSession.stageStatuses[curStageNum] = 'skipped';
            }
            if (state.stageSession.currentStageIndex + 1 < state.stageSession.selectedStages.length) {
                jumpToStage(state.stageSession.currentStageIndex + 1);
            } else {
                finishStagesSession();
            }
        }

        function toggleStageAudioInSession() {
            state.stagesConfig.autoAudio = !state.stagesConfig.autoAudio;
            saveStateToStorage();
            showToast(state.stagesConfig.autoAudio ? "🔊 Auto-audio activado" : "🔇 Auto-audio desactivado", "info");
            const icon = document.getElementById('stageAudioToggleIcon');
            if (icon) icon.className = state.stagesConfig.autoAudio ? 'fa-solid fa-volume-high text-sky-400' : 'fa-solid fa-volume-xmark text-slate-500';
        }

        function updateStageQuickSelectorPills() {
            const container = document.getElementById('stageQuickSelectorPills');
            if (!container || !state.stageSession || !state.stageSession.selectedStages) return;

            container.innerHTML = state.stageSession.selectedStages.map((stNum, idx) => {
                const isCur = idx === state.stageSession.currentStageIndex;
                const status = state.stageSession.stageStatuses ? state.stageSession.stageStatuses[stNum] : undefined;

                let colorClasses = '';
                let iconHtml = '';

                if (status === 'perfect') {
                    // Verde: Etapa completada sin errores
                    colorClasses = isCur 
                        ? 'bg-emerald-600 border-2 border-white text-white shadow-lg shadow-emerald-500/40 font-black' 
                        : 'bg-emerald-600/80 border border-emerald-400 text-white shadow-sm opacity-85 hover:opacity-100';
                    iconHtml = '<i class="fa-solid fa-check text-[10px] mr-1 text-emerald-200"></i>';
                } else if (status === 'with_errors') {
                    // Amarillo: Etapa completada con errores
                    colorClasses = isCur 
                        ? 'bg-amber-500 border-2 border-white text-slate-950 shadow-lg shadow-amber-500/40 font-black' 
                        : 'bg-amber-500/80 border border-amber-300 text-slate-950 font-bold shadow-sm opacity-85 hover:opacity-100';
                    iconHtml = '<i class="fa-solid fa-triangle-exclamation text-[10px] mr-1 text-slate-950"></i>';
                } else if (status === 'skipped') {
                    // Rojo: Etapa saltada u omitida
                    colorClasses = isCur 
                        ? 'bg-rose-600 border-2 border-white text-white shadow-lg shadow-rose-500/40 font-black' 
                        : 'bg-rose-600/80 border border-rose-400 text-white shadow-sm opacity-85 hover:opacity-100';
                    iconHtml = '<i class="fa-solid fa-forward text-[10px] mr-1 text-rose-200"></i>';
                } else {
                    // Pendiente / en curso inicial
                    colorClasses = isCur 
                        ? 'bg-slate-700 border-2 border-white text-white shadow-lg shadow-white/30 font-black' 
                        : 'bg-slate-800/90 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 opacity-80 hover:opacity-100';
                    iconHtml = '';
                }

                const activeClasses = isCur 
                    ? 'z-10 ring-1 ring-white/40' 
                    : '';

                return `
                    <button type="button" data-action="jumpToStage" data-args='[${idx}]' class="px-3 py-1.5 rounded-xl text-xs transition flex items-center justify-center whitespace-nowrap shrink-0 ${colorClasses} ${activeClasses}" title="Etapa ${stNum}">
                        ${iconHtml}E${stNum}
                    </button>
                `;
            }).join('');
        }

        // ==========================================================
        // SUB-RENDERERS PARA LAS 9 ETAPAS
        // ==========================================================

        // --- ETAPA 1: Opción Múltiple (Hiragana -> Romaji) ---
        function renderStage1_MultipleChoice(container, item) {
            if (state.stagesConfig.autoAudio) speakJapanese(item.hiragana);

            const isNewKana = (!state.srs?.[item.hiragana] || state.srs[item.hiragana].reviews === 0);
            if (!state.stageSession.introducedInStage) state.stageSession.introducedInStage = { 1: new Set(), 2: new Set() };
            if (!state.stageSession.introducedInStage[1]) state.stageSession.introducedInStage[1] = new Set();
            
            const isPresentation = isNewKana && !state.stageSession.introducedInStage[1].has(item.hiragana);
            if (isPresentation) {
                state.stageSession.introducedInStage[1].add(item.hiragana);
            }

            const distractors = getStageDistractors(item, 3);
            const options = shuffleArray([item, ...distractors]);

            const presentationBadge = isPresentation ? `
                <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold animate-pulse shadow-md shadow-emerald-500/10">
                    <i class="fa-solid fa-sparkles text-emerald-400"></i>
                    <span>¡Carácter nuevo! Modo Presentación (Toca la opción verde)</span>
                </div>
            ` : '';

            container.innerHTML = `
                <div class="flex flex-col items-center gap-5 w-full max-w-md animate-card-pop">
                    ${presentationBadge}
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Selecciona el Romaji correcto:</div>

                    <div class="w-40 h-40 rounded-3xl bg-slate-950/80 border-2 border-sakura-500/50 flex items-center justify-center font-jp text-7xl font-black text-white shadow-2xl shadow-sakura-500/10 cursor-pointer hover:border-sakura-400 transition active:scale-95" data-action="speakJapanese" data-args='["${item.hiragana}"]'>
                        ${item.hiragana}
                    </div>

                    <div class="grid grid-cols-2 gap-3 w-full">
                        ${options.map((opt, optIdx) => {
                            const isCorrectOpt = opt.hiragana === item.hiragana;
                            const isTargetGlow = (isPresentation && isCorrectOpt);
                            const btnClasses = isTargetGlow
                                ? 'stage-opt-btn presentation-target-glow relative group py-4 rounded-2xl font-mono text-xl font-bold uppercase transition active:scale-95 flex items-center justify-center gap-2'
                                : 'stage-opt-btn relative group py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-slate-500 text-white font-mono text-xl font-bold uppercase transition active:scale-95 shadow-md flex items-center justify-center gap-1.5';
                            
                            const extraIcon = isTargetGlow ? '<i class="fa-solid fa-circle-check text-emerald-400 text-base animate-pulse"></i> ' : '';

                            return `
                                <button type="button" data-action="checkStage1Option" data-args='["$this", "${opt.romaji}", "${item.romaji}", "${item.hiragana}", ${isPresentation}]' class="${btnClasses}">
                                    <span class="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-400 font-mono text-[11px] font-bold absolute top-2 right-2 group-hover:border-slate-500 group-hover:text-amber-300 pointer-events-none transition">${optIdx + 1}</span>
                                    ${extraIcon}<span class="${isTargetGlow ? 'presentation-target-text font-black' : ''}">${opt.romaji}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        function checkStage1Option(btn, chosenRomaji, correctRomaji, hiragana, isPresentation = false) {
            const allBtns = document.querySelectorAll('.stage-opt-btn');
            allBtns.forEach(b => b.disabled = true);

            const isOk = chosenRomaji.toLowerCase() === correctRomaji.toLowerCase();

            if (isPresentation) {
                btn.className = 'stage-opt-btn py-4 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-mono text-xl font-bold uppercase shadow-lg shadow-matcha-500/30 flex items-center justify-center gap-1.5';
                showToast(`💡 Presentación: "${hiragana}" = "${correctRomaji.toUpperCase()}". ¡Aparecerá luego para evaluación!`, "info");
                playSoundTone(587.33, 'sine', 0.15);
                handleStageAnswer(true, null, hiragana, true);
                setTimeout(() => nextStageExercise(), 600);
                return;
            }

            handleStageAnswer(isOk, null, hiragana, false);

            if (isOk) {
                btn.className = 'stage-opt-btn py-4 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-mono text-xl font-bold uppercase shadow-lg shadow-matcha-500/30 flex items-center justify-center gap-1.5';
                setTimeout(() => nextStageExercise(), 450);
            } else {
                btn.className = 'stage-opt-btn py-4 rounded-2xl bg-rose-600 border-2 border-rose-400 text-white font-mono text-xl font-bold uppercase flex items-center justify-center gap-1.5';
                allBtns.forEach(b => {
                    if (b.textContent.trim().toLowerCase() === correctRomaji.toLowerCase()) {
                        b.className = 'stage-opt-btn py-4 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-mono text-xl font-bold uppercase flex items-center justify-center gap-1.5';
                    }
                });
                setTimeout(() => nextStageExercise(), 950);
            }
        }

        // --- ETAPA 2: Opción Inversa (Romaji -> Hiragana) ---
        function renderStage2_ReverseChoice(container, item) {
            if (state.stagesConfig.autoAudio) speakJapanese(item.hiragana);

            const isNewKana = (!state.srs?.[item.hiragana] || state.srs[item.hiragana].reviews === 0);
            if (!state.stageSession.introducedInStage) state.stageSession.introducedInStage = { 1: new Set(), 2: new Set() };
            if (!state.stageSession.introducedInStage[2]) state.stageSession.introducedInStage[2] = new Set();
            
            const isPresentation = isNewKana && !state.stageSession.introducedInStage[2].has(item.hiragana);
            if (isPresentation) {
                state.stageSession.introducedInStage[2].add(item.hiragana);
            }

            const distractors = getStageDistractors(item, 3);
            const options = shuffleArray([item, ...distractors]);

            const presentationBadge = isPresentation ? `
                <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold animate-pulse shadow-md shadow-emerald-500/10">
                    <i class="fa-solid fa-sparkles text-emerald-400"></i>
                    <span>¡Carácter nuevo! Modo Presentación (Toca la opción verde)</span>
                </div>
            ` : '';

            container.innerHTML = `
                <div class="flex flex-col items-center gap-5 w-full max-w-md animate-card-pop">
                    ${presentationBadge}
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Selecciona el Hiragana para el sonido:</div>

                    <div class="w-40 h-40 rounded-3xl bg-slate-950/80 border-2 border-amber-500/50 flex flex-col items-center justify-center font-mono text-5xl font-black text-amber-300 shadow-2xl shadow-amber-500/10 cursor-pointer hover:border-amber-400 transition uppercase active:scale-95" data-action="speakJapanese" data-args='["${item.hiragana}"]'>
                        <span>${item.romaji}</span>
                        <span class="text-[10px] text-slate-400 font-sans mt-1">🔊 Toca para escuchar</span>
                    </div>

                    <div class="grid grid-cols-2 gap-3 w-full">
                        ${options.map((opt, optIdx) => {
                            const isCorrectOpt = opt.hiragana === item.hiragana;
                            const isTargetGlow = (isPresentation && isCorrectOpt);
                            const btnClasses = isTargetGlow
                                ? 'stage-opt-btn presentation-target-glow relative group py-3.5 rounded-2xl font-jp text-4xl font-bold transition active:scale-95 flex items-center justify-center gap-2'
                                : 'stage-opt-btn relative group py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-slate-500 text-white font-jp text-4xl font-bold transition active:scale-95 shadow-md flex items-center justify-center gap-2';

                            const extraIcon = isTargetGlow ? '<i class="fa-solid fa-circle-check text-emerald-400 text-xl animate-pulse"></i> ' : '';

                            return `
                                <button type="button" data-action="checkStage2Option" data-args='["$this", "${opt.hiragana}", "${item.hiragana}", ${isPresentation}]' class="${btnClasses}">
                                    <span class="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-400 font-mono text-[11px] font-bold absolute top-2 right-2 group-hover:border-slate-500 group-hover:text-amber-300 pointer-events-none transition">${optIdx + 1}</span>
                                    ${extraIcon}<span class="${isTargetGlow ? 'presentation-target-text font-black' : ''}">${opt.hiragana}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        function checkStage2Option(btn, chosenHira, correctHira, isPresentation = false) {
            const allBtns = document.querySelectorAll('.stage-opt-btn');
            allBtns.forEach(b => b.disabled = true);

            const isOk = chosenHira === correctHira;

            if (isPresentation) {
                btn.className = 'stage-opt-btn py-3.5 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-jp text-4xl font-bold shadow-lg shadow-matcha-500/30 flex items-center justify-center gap-2';
                showToast(`💡 Presentación: "${correctHira}". ¡Aparecerá luego para evaluación!`, "info");
                playSoundTone(587.33, 'sine', 0.15);
                handleStageAnswer(true, null, correctHira, true);
                setTimeout(() => nextStageExercise(), 600);
                return;
            }

            handleStageAnswer(isOk, null, correctHira, false);

            if (isOk) {
                btn.className = 'stage-opt-btn py-3.5 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-jp text-4xl font-bold shadow-lg shadow-matcha-500/30 flex items-center justify-center gap-2';
                setTimeout(() => nextStageExercise(), 450);
            } else {
                btn.className = 'stage-opt-btn py-3.5 rounded-2xl bg-rose-600 border-2 border-rose-400 text-white font-jp text-4xl font-bold flex items-center justify-center gap-2';
                allBtns.forEach(b => {
                    if (b.textContent.trim() === correctHira) {
                        b.className = 'stage-opt-btn py-3.5 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-jp text-4xl font-bold flex items-center justify-center gap-2';
                    }
                });
                setTimeout(() => nextStageExercise(), 950);
            }
        }

        // --- ETAPA 3: Escucha y Fonética (Audio -> Reconocimiento de Hiragana) ---
        function renderStage3_Listening(container, item) {
            speakJapanese(item.hiragana);

            const distractors = getStageDistractors(item, 3);
            const options = shuffleArray([item, ...distractors]);

            container.innerHTML = `
                <div class="flex flex-col items-center gap-6 w-full max-w-md animate-card-pop">
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Escucha el sonido y elige el Hiragana:</div>

                    <button type="button" data-action="speakJapanese" data-args='["${item.hiragana}"]' class="w-36 h-36 rounded-3xl bg-slate-950 border-2 border-rose-500/60 hover:border-rose-400 flex flex-col items-center justify-center gap-2 text-rose-400 shadow-2xl shadow-rose-500/20 transition active:scale-95 group">
                        <i class="fa-solid fa-volume-high text-5xl group-hover:scale-110 transition"></i>
                        <span class="text-[11px] font-bold uppercase tracking-wider text-rose-300">Toca para repetir</span>
                    </button>

                    <div class="grid grid-cols-2 gap-3 w-full mt-2">
                        ${options.map((opt, optIdx) => `
                            <button type="button" data-action="checkStage3Option" data-args='["$this", "${opt.hiragana}", "${item.hiragana}"]' class="stage-opt-btn relative group py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-slate-500 text-white font-jp text-4xl font-bold transition active:scale-95 shadow-md flex items-center justify-center">
                                <span class="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-400 font-mono text-[11px] font-bold absolute top-2 right-2 group-hover:border-slate-500 group-hover:text-amber-300 pointer-events-none transition">${optIdx + 1}</span>
                                ${opt.hiragana}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        function checkStage3Option(btn, chosenHira, correctHira) {
            const allBtns = document.querySelectorAll('.stage-opt-btn');
            allBtns.forEach(b => b.disabled = true);

            const isOk = chosenHira === correctHira;
            handleStageAnswer(isOk, null, correctHira);

            if (isOk) {
                btn.className = 'stage-opt-btn py-3.5 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-jp text-4xl font-bold shadow-lg shadow-matcha-500/30';
                setTimeout(() => nextStageExercise(), 450);
            } else {
                btn.className = 'stage-opt-btn py-3.5 rounded-2xl bg-rose-600 border-2 border-rose-400 text-white font-jp text-4xl font-bold';
                allBtns.forEach(b => {
                    if (b.textContent.trim() === correctHira) {
                        b.className = 'stage-opt-btn py-3.5 rounded-2xl bg-matcha-600 border-2 border-matcha-400 text-white font-jp text-4xl font-bold';
                    }
                });
                setTimeout(() => nextStageExercise(), 950);
            }
        }

        // Aliases retrocompatibles para Etapa 3/7
        const renderStage7_Listening = renderStage3_Listening;
        const checkStage7Option = checkStage3Option;

        // --- ETAPA 4: Encontrar el Par (Micro-tableros de hasta 5 parejas o 100% si <3 grupos) ---
        function renderStage4_MatchingPairs(container, items, subRoundIndex = 0, totalSubRounds = 1) {
            state.stageSession.matchedPairs = [];
            state.stageSession.selectedPairCard = null;

            const romaCards = shuffleArray(items.map(k => ({ type: 'romaji', id: k.hiragana, label: k.romaji.toUpperCase() })));
            const hiraCards = shuffleArray(items.map(k => ({ type: 'hiragana', id: k.hiragana, label: k.hiragana })));

            const gridClass = items.length <= 5 
                ? 'grid grid-cols-5 gap-2 sm:gap-2.5' 
                : (items.length <= 8 ? 'grid grid-cols-4 gap-2' : 'grid grid-cols-5 gap-1.5 sm:gap-2');

            const subRoundBadge = totalSubRounds > 1 ? `
                <div class="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold shadow-sm">
                    Micro-tablero ${subRoundIndex + 1} de ${totalSubRounds} (${items.length} parejas)
                </div>
            ` : '';

            container.innerHTML = `
                <div class="flex flex-col items-center gap-4 w-full max-w-lg animate-card-pop">
                    ${subRoundBadge}
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                        Empareja cada tarjeta en Romaji con su Hiragana abajo:
                    </div>

                    <!-- Fila Superior: Romaji -->
                    <div class="w-full bg-slate-950/60 p-3.5 sm:p-4 rounded-2xl border border-slate-800 space-y-2">
                        <div class="text-[11px] font-bold text-amber-400 uppercase">Tarjetas Romaji:</div>
                        <div class="${gridClass}" id="stagePairsRomaRow">
                            ${romaCards.map(c => `
                                <button data-type="${c.type}" data-id="${c.id}" data-action="onStagePairCardClick" data-args='["$this"]' class="pair-card py-2.5 sm:py-3.5 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 text-amber-300 font-mono font-black text-base sm:text-lg transition active:scale-95 shadow-md text-center">
                                    ${c.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Fila Inferior: Hiragana -->
                    <div class="w-full bg-slate-950/60 p-3.5 sm:p-4 rounded-2xl border border-slate-800 space-y-2">
                        <div class="text-[11px] font-bold text-sakura-400 uppercase">Tarjetas Hiragana:</div>
                        <div class="${gridClass}" id="stagePairsHiraRow">
                            ${hiraCards.map(c => `
                                <button data-type="${c.type}" data-id="${c.id}" data-action="onStagePairCardClick" data-args='["$this"]' class="pair-card py-2 sm:py-2.5 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 text-white font-jp font-bold text-2xl sm:text-3xl transition active:scale-95 shadow-md text-center">
                                    ${c.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        function onStagePairCardClick(btn) {
            if (btn.disabled || btn.classList.contains('pair-matched') || btn.classList.contains('is-matched')) return;

            const sel = state.stageSession.selectedPairCard;
            if (!sel) {
                state.stageSession.selectedPairCard = btn;
                btn.classList.add('is-selected', 'border-amber-400', 'bg-amber-500/20', 'scale-105');
                if (btn.dataset.type === 'hiragana') speakJapanese(btn.textContent.trim());
            } else {
                if (sel === btn) {
                    btn.classList.remove('is-selected', 'border-amber-400', 'bg-amber-500/20', 'scale-105');
                    state.stageSession.selectedPairCard = null;
                    return;
                }

                if (sel.dataset.type === btn.dataset.type) {
                    sel.classList.remove('is-selected', 'border-amber-400', 'bg-amber-500/20', 'scale-105');
                    state.stageSession.selectedPairCard = btn;
                    btn.classList.add('is-selected', 'border-amber-400', 'bg-amber-500/20', 'scale-105');
                    if (btn.dataset.type === 'hiragana') speakJapanese(btn.textContent.trim());
                    return;
                }

                const cardA = sel;
                const cardB = btn;
                const isMatch = cardA.dataset.id === cardB.dataset.id;

                if (isMatch) {
                    cardA.classList.remove('is-selected', 'border-amber-400', 'bg-amber-500/20', 'scale-105');
                    cardB.classList.remove('is-selected', 'border-amber-400', 'bg-amber-500/20', 'scale-105');
                    cardA.classList.add('pair-matched', 'is-matched', 'border-matcha-500', 'bg-matcha-600/30', 'text-matcha-300', 'opacity-80');
                    cardB.classList.add('pair-matched', 'is-matched', 'border-matcha-500', 'bg-matcha-600/30', 'text-matcha-300', 'opacity-80');
                    cardA.disabled = true;
                    cardB.disabled = true;
                    state.stageSession.matchedPairs.push(cardA.dataset.id);
                    state.stageSession.selectedPairCard = null;

                    handleStageAnswer(true, null, cardA.dataset.id);

                    const totalPairs = document.querySelectorAll('#stagePairsRomaRow .pair-card').length;
                    if (state.stageSession.matchedPairs.length >= totalPairs) {
                        playSoundTone(587.33, 'sine', 0.15);
                        setTimeout(() => playSoundTone(880, 'sine', 0.22), 100);
                        const chunksCount = (state.stageSession.stage4Chunks || state.stageSession.stage3Chunks || []).length || 1;
                        if (chunksCount > 1) {
                            showToast(`✨ ¡Micro-tablero completado! Cargando siguiente tanda...`, "success");
                        } else {
                            showToast("✨ ¡Tablero completado!", "success");
                        }
                        setTimeout(() => nextStageExercise(), 600);
                    }
                } else {
                    cardA.classList.add('is-error', 'border-rose-500', 'bg-rose-500/20');
                    cardB.classList.add('is-error', 'border-rose-500', 'bg-rose-500/20');
                    handleStageAnswer(false, null, cardA.dataset.id);

                    setTimeout(() => {
                        cardA.classList.remove('is-selected', 'is-error', 'border-amber-400', 'bg-amber-500/20', 'scale-105', 'border-rose-500', 'bg-rose-500/20');
                        cardB.classList.remove('is-selected', 'is-error', 'border-amber-400', 'bg-amber-500/20', 'scale-105', 'border-rose-500', 'bg-rose-500/20');
                        state.stageSession.selectedPairCard = null;
                    }, 400);
                }
            }
        }

        // Aliases retrocompatibles para Etapa 4/3
        const renderStage3_MatchingPairs = renderStage4_MatchingPairs;

        // --- ETAPA 5: Escribir Respuesta (Hiragana -> Teclado Romaji) ---
        function renderStage5_TypeResponse(container, item) {
            if (state.stagesConfig.autoAudio) speakJapanese(item.hiragana);

            container.innerHTML = `
                <div class="flex flex-col items-center gap-5 w-full max-w-md animate-card-pop">
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Escribe la lectura en Romaji:</div>
                    <div class="w-36 h-36 rounded-3xl bg-slate-950/80 border-2 border-sky-500/50 flex items-center justify-center font-jp text-7xl font-black text-white shadow-2xl shadow-sky-500/10 cursor-pointer hover:border-sky-400 transition" data-action="speakJapanese" data-args='["${item.hiragana}"]'>
                        ${item.hiragana}
                    </div>

                    <div class="w-full space-y-3">
                        <div class="relative">
                            <input type="text" id="stage5Input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Escribe en romaji..." class="w-full py-4 px-6 rounded-2xl bg-slate-950 border-2 border-slate-700 focus:border-sky-400 focus:outline-none text-center font-mono text-2xl font-bold text-white uppercase tracking-wider shadow-inner transition placeholder:text-slate-600 placeholder:text-base placeholder:normal-case placeholder:tracking-normal">
                        </div>
                        <button type="button" data-action="checkStage5Response" data-args='["${item.romaji}", "${item.hiragana}"]' class="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm shadow-lg shadow-sky-600/30 transition active:scale-95 flex items-center justify-center gap-2">
                            <i class="fa-solid fa-check"></i> Comprobar
                        </button>
                    </div>
                </div>
            `;

            const inp = document.getElementById('stage5Input');
            if (inp) {
                setTimeout(() => inp.focus(), 150);
                inp.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') checkStage5Response(item.romaji, item.hiragana);
                });
            }
        }

        function checkStage5Response(correctRomaji, hiragana) {
            const inp = document.getElementById('stage5Input');
            if (!inp) return;
            const userVal = inp.value.trim().toLowerCase();
            if (!userVal) return;

            inp.disabled = true;

            const isOk = romajiMatches(userVal, correctRomaji);
            handleStageAnswer(isOk, null, hiragana);

            if (isOk) {
                inp.className = 'w-full py-4 px-6 rounded-2xl bg-matcha-950/80 border-2 border-matcha-400 text-center font-mono text-2xl font-bold text-matcha-300 uppercase tracking-wider shadow-lg shadow-matcha-500/20';
                setTimeout(() => nextStageExercise(), 450);
            } else {
                inp.className = 'w-full py-4 px-6 rounded-2xl bg-rose-950/80 border-2 border-rose-400 text-center font-mono text-2xl font-bold text-rose-300 uppercase tracking-wider';
                inp.value = `${userVal} ➔ ${correctRomaji.toUpperCase()}`;
                setTimeout(() => nextStageExercise(), 1100);
            }
        }

        // Aliases retrocompatibles para Etapa 5/4
        const renderStage4_TypeResponse = renderStage5_TypeResponse;
        const checkStage4Response = checkStage5Response;

        // --- ETAPA 6: Escribir el Texto Continuo (Caja Unificada de 20 Kanas Multilínea - Flujo Continuo) ---
        function generateStage6Stream(pool, count = 20) {
            if (!pool || pool.length === 0) return getActiveKanaDataset().slice(0, 5);
            const stream = [];
            for (let i = 0; i < count; i++) {
                let candidate;
                if (pool.length === 1) {
                    candidate = pool[0];
                } else {
                    let attempts = 0;
                    do {
                        candidate = pool[Math.floor(Math.random() * pool.length)];
                        attempts++;
                    } while (stream.length > 0 && candidate.hiragana === stream[stream.length - 1].hiragana && pool.length > 1 && attempts < 10);
                }
                stream.push(candidate);
            }
            return stream;
        }

        function renderStage6_StreamText(container, pool) {
            state.stageSession.streamIndex = 0;
            // Generar 20 kanas de los grupos de sonido activos
            const streamPool = generateStage6Stream(pool, 20);
            state.stageSession.streamPool = streamPool;

            container.innerHTML = `
                <div class="flex flex-col items-center gap-6 w-full max-w-lg animate-card-pop">
                    <!-- Caja de texto unificada multilínea de 20 kanas -->
                    <div class="w-full bg-slate-950/90 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col items-center gap-6 shadow-2xl">
                        <div class="flex items-center justify-between w-full text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                            <span>Escribe el Romaji de cada kana:</span>
                            <span id="stage6StreamCounter" class="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 text-[11px] font-mono">1 / 20</span>
                        </div>

                        <!-- Bloque fluido de todos los 20 kanas -->
                        <div class="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-3 sm:gap-y-4 max-w-sm sm:max-w-md leading-relaxed select-none py-2" id="stage6KanasGrid">
                            ${streamPool.map((k, idx) => `
                                <span id="stage6Kana_${idx}" class="font-jp text-3xl sm:text-4xl font-bold transition-all duration-200 ${
                                    idx === 0
                                        ? 'border-2 border-sky-400 bg-sky-500/25 text-white px-2.5 py-0.5 rounded-xl shadow-lg shadow-sky-500/40 ring-2 ring-sky-400/40 scale-110 font-black'
                                        : 'text-slate-300 opacity-80 px-2 py-0.5'
                                }">${k.hiragana}</span>
                            `).join('')}
                        </div>

                        <!-- Línea de entrada mecanográfica -->
                        <div class="w-48 sm:w-64 border-b-2 border-slate-700 focus-within:border-sky-400 transition-colors pb-1 flex justify-center">
                            <input type="text" id="stage6StreamInput" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="|" class="w-full bg-transparent text-center font-mono text-2xl font-black text-white focus:outline-none tracking-widest placeholder:text-sky-400 placeholder:animate-pulse">
                        </div>
                    </div>
                </div>
            `;

            const inp = document.getElementById('stage6StreamInput');
            if (inp) {
                setTimeout(() => inp.focus(), 150);
                inp.addEventListener('input', () => onStage6StreamInput(streamPool));
            }
        }

        function onStage6StreamInput(streamPool) {
            const inp = document.getElementById('stage6StreamInput');
            if (!inp) return;
            const curIdx = state.stageSession.streamIndex;
            const curKana = streamPool[curIdx];
            if (!curKana) return;

            const userVal = inp.value.trim().toLowerCase();
            if (romajiMatches(userVal, curKana.romaji)) {
                playSoundTone(700, 'sine', 0.1);
                handleStageAnswer(true, null, curKana.hiragana);

                const currentSpan = document.getElementById(`stage6Kana_${curIdx}`);
                if (currentSpan) {
                    currentSpan.className = 'font-jp text-3xl sm:text-4xl font-bold text-matcha-400 px-2 py-0.5 transition-all';
                }

                inp.value = '';
                state.stageSession.streamIndex++;

                const counter = document.getElementById('stage6StreamCounter');
                if (counter) {
                    counter.textContent = `${Math.min(state.stageSession.streamIndex + 1, streamPool.length)} / ${streamPool.length}`;
                }

                if (state.stageSession.streamIndex >= streamPool.length) {
                    inp.disabled = true;
                    setTimeout(() => nextStageExercise(), 500);
                } else {
                    const nextSpan = document.getElementById(`stage6Kana_${state.stageSession.streamIndex}`);
                    if (nextSpan) {
                        nextSpan.className = 'font-jp text-3xl sm:text-4xl font-black text-sky-300 border-2 border-sky-400 bg-sky-500/25 px-2.5 py-0.5 rounded-xl shadow-lg shadow-sky-500/40 ring-2 ring-sky-400/40 scale-110 transition-all';
                    }
                }
            }
        }

        // Aliases retrocompatibles para Etapa 6/5
        const generateStage5Stream = generateStage6Stream;
        const renderStage5_StreamText = renderStage6_StreamText;
        const onStage5StreamInput = onStage6StreamInput;

        // --- ETAPA 7: Escribir Palabra (Vocabulario en Contexto y Combinaciones de 3 a 5 Kanas) ---
        function renderStage7_TypeWord(container) {
            if (!state.stageSession.currentStage7Word && !state.stageSession.currentStage6Word) {
                state.stageSession.currentStage7Word = getStage6NextWord();
                state.stageSession.currentStage6Word = state.stageSession.currentStage7Word;
            }
            const wordObj = state.stageSession.currentStage7Word || state.stageSession.currentStage6Word;

            const isKataWord = !!(wordObj.katakana && !wordObj.hiragana) || (state && state.currentSyllabary === 'katakana');
            const wordDisplay = isKataWord ? (wordObj.katakana || wordObj.hiragana) : (wordObj.hiragana || wordObj.katakana);
            if (state.stagesConfig.autoAudio) speakJapanese(wordDisplay);

            const hasSokuon = (wordObj.hiragana && wordObj.hiragana.includes('っ')) || (wordObj.katakana && wordObj.katakana.includes('ッ')) || (typeof wordObj.word === 'string' && (wordObj.word.includes('っ') || wordObj.word.includes('ッ')));
            const sokuonChar = (wordDisplay && wordDisplay.includes('ッ')) ? 'ッ' : 'っ';

            // Trigger Sokuon modal automatically if not disabled by user
            if (hasSokuon && !state.sokuonTipDisabled) {
                setTimeout(() => showSokuonModal(wordObj), 250);
            }

            container.innerHTML = `
                <div class="flex flex-col items-center gap-5 w-full max-w-md animate-card-pop">
                    <div class="flex items-center justify-between w-full text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                        <span>Escribe la palabra en Romaji:</span>
                        ${hasSokuon ? `
                            <button type="button" data-action="showSokuonModal" class="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-[11px] font-extrabold flex items-center gap-1 hover:bg-amber-500/30 transition active:scale-95 shadow-sm" title="Ver explicación del Chiisai Tsu">
                                <i class="fa-solid fa-lightbulb text-amber-400"></i> ¿Qué es ${sokuonChar}?
                            </button>
                        ` : ''}
                    </div>

                    <div class="w-full bg-slate-950/80 p-6 rounded-3xl border-2 border-indigo-500/50 flex flex-col items-center justify-center gap-2 shadow-2xl cursor-pointer hover:border-indigo-400 transition active:scale-98 relative" data-action="speakJapanese" data-args='["${wordDisplay}"]'>
                        ${hasSokuon ? `<span class="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500/25 text-amber-300 text-[10px] font-extrabold border border-amber-500/40 shadow-sm">促音 ${sokuonChar} (Doble)</span>` : ''}
                        <div class="font-jp text-5xl sm:text-6xl font-black text-white">${wordDisplay}</div>
                        <div class="text-xs font-bold text-indigo-300 uppercase tracking-wider text-center">${wordObj.spanish}</div>
                    </div>

                    <div class="w-full space-y-3">
                        <input type="text" id="stage7Input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Escribe en romaji..." class="w-full py-4 px-6 rounded-2xl bg-slate-950 border-2 border-slate-700 focus:border-indigo-400 focus:outline-none text-center font-mono text-xl font-bold text-white tracking-wider shadow-inner transition placeholder:text-slate-500 placeholder:font-normal placeholder:tracking-normal placeholder:normal-case">
                        <button type="button" data-action="checkStage7Response" data-args='["${wordObj.romaji}", "${wordObj.hiragana}"]' class="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition active:scale-95 flex items-center justify-center gap-2">
                            <i class="fa-solid fa-check"></i> Comprobar Palabra
                        </button>
                    </div>
                </div>
            `;

            const inp = document.getElementById('stage7Input');
            if (inp) {
                setTimeout(() => inp.focus(), 150);
                inp.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') checkStage7Response(wordObj.romaji, wordObj.hiragana);
                });
            }
        }

        function checkStage7Response(correctRomaji, hiragana) {
            const inp = document.getElementById('stage7Input');
            if (!inp) return;
            const userVal = inp.value.trim().toLowerCase();
            if (!userVal) return;

            inp.disabled = true;

            const isOk = romajiMatches(userVal, correctRomaji);
            handleStageAnswer(isOk, null, hiragana[0]);

            if (isOk) {
                inp.className = 'w-full py-4 px-6 rounded-2xl bg-matcha-950/80 border-2 border-matcha-400 text-center font-mono text-xl font-bold text-matcha-300 uppercase tracking-wider shadow-lg shadow-matcha-500/20';
                setTimeout(() => nextStageExercise(), 500);
            } else {
                inp.className = 'w-full py-4 px-6 rounded-2xl bg-rose-950/80 border-2 border-rose-400 text-center font-mono text-xl font-bold text-rose-300 uppercase tracking-wider';
                inp.value = `${userVal} ➔ ${correctRomaji.toUpperCase()}`;
                setTimeout(() => nextStageExercise(), 1100);
            }
        }

        // Aliases retrocompatibles para Etapa 7/6/5
        const renderStage6_TypeWord = renderStage7_TypeWord;
        const checkStage6Response = checkStage7Response;
        const renderStage5_TypeWord = renderStage7_TypeWord;
        const checkStage5_TypeWord = checkStage7Response;

        // --- ETAPA 8: Recuerdo Activo, Trazado Guiado y Reconocimiento en Romaji ---
        function renderStage8_StrokeOrder(container, item) {
            state.stageDrawingKana = item;

            // PEDAGOGY RULE: DO NOT play auto-audio initially to force active memory recall
            // (Audio only plays if user manually taps the speaker button)

            // Record recent draw history for cooldown
            if (!state.stageSession.recentDrawHistory) state.stageSession.recentDrawHistory = [];
            state.stageSession.recentDrawHistory.push(item.hiragana);
            const cooldown = getDrawCooldown(state.stageSession.pool.length);
            if (state.stageSession.recentDrawHistory.length > cooldown + 1) {
                state.stageSession.recentDrawHistory.shift();
            }

            const strokeVectors = getKanaStrokeVectors(item.hiragana);
            state.stage8ActiveStrokeIdx = 0;
            state.stage8AcceptedStrokes = [];
            state.stage8StrokeStates = Array(strokeVectors.length).fill('pending');
            state.stage8DrawingCompleted = false;
            state.stage8RomajiTypedCorrectly = false;
            state.stage8HadErrors = false;
            state.stage8IsPeeking = false;

            container.innerHTML = `
                <div class="flex flex-col items-center gap-3.5 w-full max-w-md animate-card-pop select-none">
                    <!-- Top Title Bar (No explicit kana or romaji text shown!) -->
                    <div class="flex items-center justify-between w-full px-2">
                        <span class="text-xs sm:text-sm font-bold text-slate-300 flex items-center gap-2">
                            <i class="fa-solid fa-pen-nib text-sakura-400"></i> Dibujar y escribir la respuesta
                        </span>
                        <div class="flex items-center gap-2">
                            <button type="button" data-action="toggleStage8StrokePeek" data-args='["${item.hiragana}"]' id="stage8PeekBtn" class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold transition border border-slate-700 shadow-sm flex items-center gap-1 active:scale-95" title="Alternar silueta / pista">
                                <i class="fa-solid fa-eye text-amber-400 text-sm"></i>
                                <span class="hidden sm:inline text-[11px]">Pista</span>
                            </button>
                            <button type="button" data-action="speakJapanese" data-args='["${item.hiragana}"]' class="p-1.5 sm:px-2.5 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-xl text-xs font-bold transition border border-slate-700 shadow-sm flex items-center gap-1 active:scale-95" title="Escuchar fonema nativo">
                                <i class="fa-solid fa-volume-high text-sm"></i>
                                <span class="hidden sm:inline text-[11px]">Audio</span>
                            </button>
                        </div>
                    </div>

                    <!-- Stroke Progress Pills -->
                    <div class="w-full flex gap-1.5 px-2" id="stage8StrokePills">
                        ${strokeVectors.map((_, i) => `<div class="h-2 flex-1 rounded-full bg-slate-800 border border-slate-700 ${i === 0 ? 'bg-slate-400 animate-pulse' : ''}"></div>`).join('')}
                    </div>

                    <!-- SVG Canvas Frame (Standard 300x300 ViewBox) -->
                    <div class="relative w-full max-w-[270px] sm:max-w-[290px] aspect-square transition-all duration-300 touch-none overscroll-none" style="touch-action: none; overscroll-behavior: none;">
                        <svg id="stage8SvgSurface" viewBox="0 0 300 300" style="touch-action: none; overscroll-behavior: none;" class="w-full h-full bg-slate-950 rounded-3xl border-2 border-slate-700 shadow-2xl stroke-surface cursor-crosshair touch-none overscroll-none select-none">
                            <!-- Dotted Cross Guide Lines -->
                            <g id="stage8GridGuides">
                                <line x1="20" y1="150" x2="280" y2="150" stroke="rgba(100,116,139,0.35)" stroke-width="1.5" stroke-dasharray="3 3"></line>
                                <line x1="150" y1="20" x2="150" y2="280" stroke="rgba(100,116,139,0.35)" stroke-width="1.5" stroke-dasharray="3 3"></line>
                            </g>
                            <!-- Silhouette Ghost Layer -->
                            <g id="stage8GhostGroup"></g>
                            <!-- Accepted Strokes Layer -->
                            <g id="stage8AcceptedGroup"></g>
                            <!-- Guidance Arrow & Pulsing Start Dot -->
                            <g id="stage8StartIndicatorGroup">
                                <circle id="stage8StartPulsingRing" cx="0" cy="0" r="14" fill="none" stroke="#f43f5e" stroke-width="2" class="animate-ping opacity-75"></circle>
                                <circle id="stage8StartCircle" cx="0" cy="0" r="7" fill="#f43f5e"></circle>
                                <line id="stage8StartArrow" x1="0" y1="0" x2="0" y2="0" stroke="#f43f5e" stroke-width="3.5" stroke-linecap="round" marker-end="url(#stage8ArrowHead)"></line>
                            </g>
                            <!-- Live user drawing path -->
                            <path id="stage8LivePath" d="" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path>
                            <defs>
                                <marker id="stage8ArrowHead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                                    <polygon points="0 0, 6 3, 0 6" fill="#f43f5e"></polygon>
                                </marker>
                            </defs>
                        </svg>
                    </div>

                    <!-- Romaji Input Under Canvas (Active Recall & Recognition) -->
                    <div class="w-full max-w-[270px] sm:max-w-[290px] space-y-1 mt-1">
                        <div class="w-full border-b-2 border-slate-700 focus-within:border-sakura-400 transition-colors pb-1 flex justify-center">
                            <input type="text" id="stage8RomajiInput" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Escribe en romaji..." class="w-full bg-transparent text-center font-mono text-xl sm:text-2xl font-black text-white focus:outline-none tracking-widest placeholder:text-slate-500 placeholder:text-sm placeholder:tracking-normal placeholder:font-normal uppercase">
                        </div>
                    </div>

                    <div id="stage8StatusMsg" class="text-xs font-semibold text-slate-300 text-center min-h-[20px]">
                        Traza el kana y escribe su lectura en Romaji
                    </div>
                </div>
            `;

            updateStage8Layers(item.hiragana);
            initStage8CanvasEvents(item);

            const romajiInp = document.getElementById('stage8RomajiInput');
            if (romajiInp) {
                setTimeout(() => romajiInp.focus(), 150);
                romajiInp.addEventListener('input', () => checkStage8RomajiInput(item));
                romajiInp.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') checkStage8RomajiInput(item, true);
                });
            }
        }

        function toggleStage8StrokePeek(char) {
            state.stage8IsPeeking = !state.stage8IsPeeking;
            updateStage8Layers(char);
            showToast(state.stage8IsPeeking ? "👁️ Pistas visuales activadas" : "Ocultando pistas", "info");
        }

        function resetStage8Drawing(char) {
            const strokeVectors = getKanaStrokeVectors(char);
            state.stage8ActiveStrokeIdx = 0;
            state.stage8AcceptedStrokes = [];
            state.stage8StrokeStates = Array(strokeVectors.length).fill('pending');
            state.stage8DrawingCompleted = false;
            updateStage8Layers(char);
        }

        function updateStage8Layers(char) {
            const strokeVectors = getKanaStrokeVectors(char);
            const numStrokes = strokeVectors.length;
            const curIdx = state.stage8ActiveStrokeIdx;

            // 1. Pills
            const pillsContainer = document.getElementById('stage8StrokePills');
            if (pillsContainer) {
                pillsContainer.innerHTML = '';
                for (let i = 0; i < numStrokes; i++) {
                    const pill = document.createElement('div');
                    const st = state.stage8StrokeStates[i];
                    const isCurrent = i === curIdx;
                    pill.className = `h-2 flex-1 rounded-full transition-all duration-300 ${
                        st === 'ok'
                            ? 'bg-matcha-500 shadow-sm shadow-matcha-500/40'
                            : (isCurrent ? 'bg-slate-400 animate-pulse' : 'bg-slate-800 border border-slate-700/80')
                    }`;
                    pillsContainer.appendChild(pill);
                }
            }

            // 2. Ghost Layer (Shown only when peeking or on normal guided mode)
            const ghostGroup = document.getElementById('stage8GhostGroup');
            if (ghostGroup) {
                ghostGroup.innerHTML = '';
                strokeVectors.forEach((v, idx) => {
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', v.pathStr);
                    path.setAttribute('transform', v.svgTransform || `scale(${KANJIVG_SCALE})`);
                    path.setAttribute('fill', 'none');
                    path.setAttribute('stroke', 'rgba(148, 163, 184, 0.22)');
                    path.setAttribute('stroke-width', String(v.ghostStrokeWidth || (6 / KANJIVG_SCALE)));
                    path.setAttribute('stroke-linecap', 'round');
                    path.setAttribute('stroke-linejoin', 'round');
                    ghostGroup.appendChild(path);
                });
            }

            // 3. Accepted Strokes
            const accGroup = document.getElementById('stage8AcceptedGroup');
            if (accGroup) {
                accGroup.innerHTML = '';
                state.stage8AcceptedStrokes.forEach(v => {
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', v.pathStr);
                    path.setAttribute('transform', v.svgTransform || `scale(${KANJIVG_SCALE})`);
                    path.setAttribute('fill', 'none');
                    path.setAttribute('stroke', '#10b981');
                    path.setAttribute('stroke-width', String(v.strokeWidth || (8 / KANJIVG_SCALE)));
                    path.setAttribute('stroke-linecap', 'round');
                    path.setAttribute('stroke-linejoin', 'round');
                    accGroup.appendChild(path);
                });
            }

            // 4. Guidance Arrow
            const arrowGroup = document.getElementById('stage8StartIndicatorGroup');
            const arrowEl = document.getElementById('stage8StartArrow');
            const ringEl = document.getElementById('stage8StartPulsingRing');
            const circleEl = document.getElementById('stage8StartCircle');

            if (curIdx < numStrokes) {
                const curVec = strokeVectors[curIdx];
                const a = curVec.guideArrow;
                if (arrowEl) {
                    arrowEl.setAttribute('x1', a.x1);
                    arrowEl.setAttribute('y1', a.y1);
                    arrowEl.setAttribute('x2', a.x2);
                    arrowEl.setAttribute('y2', a.y2);
                }
                if (ringEl) { ringEl.setAttribute('cx', a.x1); ringEl.setAttribute('cy', a.y1); }
                if (circleEl) { circleEl.setAttribute('cx', a.x1); circleEl.setAttribute('cy', a.y1); }
                if (arrowGroup) arrowGroup.style.display = 'block';

                const msg = document.getElementById('stage8StatusMsg');
                if (msg) {
                    msg.textContent = `Dibuja el trazo ${curIdx + 1} de ${numStrokes} siguiendo la flecha roja`;
                }
            } else {
                if (arrowGroup) arrowGroup.style.display = 'none';
            }
        }

        function checkStage8RomajiInput(item, triggerErrorOnMismatch = false) {
            const inp = document.getElementById('stage8RomajiInput');
            if (!inp) return;
            const userVal = inp.value.trim().toLowerCase();
            if (!userVal) return;

            const isMatch = romajiMatches(userVal, item.romaji);

            if (isMatch) {
                state.stage8RomajiTypedCorrectly = true;
                inp.parentElement.classList.remove('border-slate-700', 'border-rose-500');
                inp.parentElement.classList.add('border-matcha-500');
                inp.classList.add('text-matcha-300');
                checkStage8BothRequirements(item);
            } else if (triggerErrorOnMismatch) {
                inp.parentElement.classList.add('border-rose-500');
                playSoundTone(220, 'sawtooth', 0.2);
                showToast(`"${userVal.toUpperCase()}" no es correcto. ¡Sigue intentando!`, "error");
                state.stage8HadErrors = true;
                if (!state.stageSession.stageWeakKanas) state.stageSession.stageWeakKanas = new Set();
                state.stageSession.stageWeakKanas.add(item.hiragana);
            }
        }

        function checkStage8BothRequirements(item) {
            if (state.stage8DrawingCompleted && state.stage8RomajiTypedCorrectly) {
                // Both Drawing & Romaji Recognition Completed!
                speakJapanese(item.hiragana);
                playSoundTone(587.33, 'sine', 0.15);
                setTimeout(() => playSoundTone(880, 'sine', 0.22), 100);

                const isClean = !state.stage8HadErrors;
                handleStageAnswer(isClean, isClean ? `¡Excelente! Trazado y Romaji correctos (+30 XP)` : `¡Completado!`, item.hiragana);

                const statusEl = document.getElementById('stage8StatusMsg');
                if (statusEl) statusEl.innerHTML = `<span class="text-matcha-400 font-bold">✓ ¡Perfecto! ${item.hiragana} = ${item.romaji.toUpperCase()}</span>`;

                setTimeout(() => nextStageExercise(), 750);
            }
        }

        function initStage8CanvasEvents(item) {
            const svgEl = document.getElementById('stage8SvgSurface');
            if (!svgEl) return;

            let isPointerDown = false;
            let userPoints = [];

            svgEl.onpointerdown = (e) => {
                isPointerDown = true;
                userPoints = [];
                try { svgEl.setPointerCapture(e.pointerId); } catch(err) {}
                const pt = getSvgPoint(e, svgEl);
                if (pt) {
                    userPoints.push(pt);
                    const pathEl = document.getElementById('stage8LivePath');
                    if (pathEl) pathEl.setAttribute('d', `M ${pt.x} ${pt.y}`);
                }
            };

            svgEl.onpointermove = (e) => {
                if (!isPointerDown) return;
                const pt = getSvgPoint(e, svgEl);
                if (!pt) return;
                const prev = userPoints[userPoints.length - 1];
                if (prev && Math.hypot(pt.x - prev.x, pt.y - prev.y) < 2) return;
                userPoints.push(pt);
                const pathEl = document.getElementById('stage8LivePath');
                if (pathEl) pathEl.setAttribute('d', pointsToSmoothSvgPath(userPoints));
            };

            svgEl.onpointerup = (e) => {
                if (!isPointerDown) return;
                isPointerDown = false;
                try { svgEl.releasePointerCapture(e.pointerId); } catch(err) {}

                const pathEl = document.getElementById('stage8LivePath');
                if (pathEl) pathEl.setAttribute('d', '');

                const strokeVectors = getKanaStrokeVectors(item.hiragana);
                const curIdx = state.stage8ActiveStrokeIdx;
                if (curIdx >= strokeVectors.length) return;

                const ref = strokeVectors[curIdx];
                const diag = diagnoseUserStroke(userPoints, ref, 'normal');

                if (diag.ok) {
                    state.stage8AcceptedStrokes.push(ref);
                    state.stage8StrokeStates[curIdx] = 'ok';
                    state.stage8ActiveStrokeIdx++;

                    triggerHaptic('success');
                    playSoundTone(523.25, 'sine', 0.12);
                    svgEl.classList.add('surface-ok');
                    setTimeout(() => svgEl.classList.remove('surface-ok'), 200);

                    updateStage8Layers(item.hiragana);

                    if (state.stage8ActiveStrokeIdx >= strokeVectors.length) {
                        // Drawing completed!
                        state.stage8DrawingCompleted = true;
                        svgEl.classList.remove('border-slate-700');
                        svgEl.classList.add('border-matcha-500', 'shadow-matcha-500/30');

                        const romInp = document.getElementById('stage8RomajiInput');
                        if (romInp && !state.stage8RomajiTypedCorrectly) {
                            romInp.focus();
                            const statusEl = document.getElementById('stage8StatusMsg');
                            if (statusEl) statusEl.innerHTML = '<span class="text-sky-300 font-bold">¡Trazos completados! Ahora escribe la lectura en Romaji abajo</span>';
                        }

                        checkStage8BothRequirements(item);
                    }
                } else {
                    state.stage8HadErrors = true;
                    if (!state.stageSession.drawStats) state.stageSession.drawStats = {};
                    if (!state.stageSession.drawStats[item.hiragana]) {
                        state.stageSession.drawStats[item.hiragana] = { timesDrawn: 0, errorCount: 0, consecutiveClean: 0 };
                    }
                    state.stageSession.drawStats[item.hiragana].errorCount++;

                    triggerHaptic('error');
                    playSoundTone(220, 'sawtooth', 0.2);
                    svgEl.classList.add('surface-bad');
                    setTimeout(() => svgEl.classList.remove('surface-bad'), 250);

                    const msg = document.getElementById('stage8StatusMsg');
                    if (msg) {
                        msg.innerHTML = `<span class="text-rose-400 font-bold">${diag.msg}</span>`;
                        setTimeout(() => updateStage8Layers(item.hiragana), 1800);
                    }
                }
                userPoints = [];
            };

            svgEl.onpointercancel = () => {
                isPointerDown = false;
                userPoints = [];
                const pathEl = document.getElementById('stage8LivePath');
                if (pathEl) pathEl.setAttribute('d', '');
            };
        }


        // --- ETAPA 9: Dibujar de Memoria / A Ciegas (Exact Match with Blind Drawing) ---
        function renderStage9_BlindDraw(container, item) {
            state.stageBlindKana = item;
            if (state.stagesConfig.autoAudio) speakJapanese(item.hiragana);

            // Record recent draw history
            if (!state.stageSession.recentDrawHistory) state.stageSession.recentDrawHistory = [];
            state.stageSession.recentDrawHistory.push(item.hiragana);
            const cooldown = getDrawCooldown(state.stageSession.pool.length);
            if (state.stageSession.recentDrawHistory.length > cooldown + 1) {
                state.stageSession.recentDrawHistory.shift();
            }

            const strokeVectors = getKanaStrokeVectors(item.hiragana);
            state.stage9ActiveStrokeIdx = 0;
            state.stage9AcceptedStrokes = [];
            state.stage9StrokeStates = Array(strokeVectors.length).fill('pending');
            state.stage9HadErrors = false;

            container.innerHTML = `
                <div class="flex flex-col items-center gap-4 w-full max-w-md animate-card-pop select-none">
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                        Dibuja de memoria el sonido objetivo:
                    </div>

                    <div class="flex items-center justify-between w-full px-2">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-slate-400">Sonido:</span>
                            <span class="font-mono text-2xl font-black text-amber-300 uppercase">${item.romaji}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button type="button" data-action="peekStage9Hint" data-args='["${item.hiragana}"]' class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold transition flex items-center gap-1 border border-slate-700">
                                <i class="fa-solid fa-eye"></i> Pista
                            </button>
                            <button type="button" data-action="resetStage9Drawing" data-args='["${item.hiragana}"]' class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1 border border-slate-700">
                                <i class="fa-solid fa-rotate-left text-[10px]"></i> Limpiar
                            </button>
                            <button type="button" data-action="speakJapanese" data-args='["${item.hiragana}"]' class="p-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-xs font-bold transition border border-slate-700" aria-label="Escuchar pronunciación" title="Escuchar pronunciación">
                                <i class="fa-solid fa-volume-high"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Stroke Progress Pills -->
                    <div class="w-full flex gap-1.5 px-2" id="stage9StrokePills">
                        ${strokeVectors.map((_, i) => `<div class="h-2 flex-1 rounded-full bg-slate-800 border border-slate-700 ${i === 0 ? 'bg-slate-400 animate-pulse' : ''}"></div>`).join('')}
                    </div>

                    <!-- Blind Canvas Frame (Standard 300x300 ViewBox) -->
                    <div class="relative w-full max-w-[280px] sm:max-w-[300px] aspect-square transition-all duration-300 touch-none overscroll-none" style="touch-action: none; overscroll-behavior: none;">
                        <svg id="stage9SvgSurface" viewBox="0 0 300 300" style="touch-action: none; overscroll-behavior: none;" class="w-full h-full bg-slate-950 rounded-3xl border-2 border-amber-500/60 shadow-2xl stroke-surface cursor-crosshair touch-none overscroll-none select-none">
                            <!-- Dotted Cross Guide Lines -->
                            <g id="stage9GridGuides">
                                <line x1="20" y1="150" x2="280" y2="150" stroke="rgba(100,116,139,0.35)" stroke-width="1.5" stroke-dasharray="3 3"></line>
                                <line x1="150" y1="20" x2="150" y2="280" stroke="rgba(100,116,139,0.35)" stroke-width="1.5" stroke-dasharray="3 3"></line>
                            </g>
                            <!-- Peek Layer for temporary hint -->
                            <g id="stage9PeekGroup"></g>
                            <!-- Accepted Strokes Layer -->
                            <g id="stage9AcceptedGroup"></g>
                            <!-- Live user drawing path -->
                            <path id="stage9LivePath" d="" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>

                    <div id="stage9StatusMsg" class="text-xs font-bold text-slate-300 text-center min-h-[20px]">
                        Dibuja el trazo 1 de memoria
                    </div>
                </div>
            `;

            initStage9CanvasEvents(item);
        }

        function peekStage9Hint(char) {
            const peekGroup = document.getElementById('stage9PeekGroup');
            if (!peekGroup) return;
            const strokeVectors = getKanaStrokeVectors(char);
            peekGroup.innerHTML = '';
            strokeVectors.forEach(v => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', v.pathStr);
                path.setAttribute('transform', v.svgTransform || `scale(${KANJIVG_SCALE})`);
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', '#f59e0b');
                path.setAttribute('stroke-width', String(v.ghostStrokeWidth || (6 / KANJIVG_SCALE)));
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                path.setAttribute('opacity', '0.45');
                peekGroup.appendChild(path);
            });
            setTimeout(() => {
                if (peekGroup) peekGroup.innerHTML = '';
            }, 1200);
        }

        function resetStage9Drawing(char) {
            const strokeVectors = getKanaStrokeVectors(char);
            state.stage9ActiveStrokeIdx = 0;
            state.stage9AcceptedStrokes = [];
            state.stage9StrokeStates = Array(strokeVectors.length).fill('pending');
            updateStage9Layers(char);
        }

        function updateStage9Layers(char) {
            const strokeVectors = getKanaStrokeVectors(char);
            const numStrokes = strokeVectors.length;
            const curIdx = state.stage9ActiveStrokeIdx;

            // 1. Pills
            const pillsContainer = document.getElementById('stage9StrokePills');
            if (pillsContainer) {
                pillsContainer.innerHTML = '';
                for (let i = 0; i < numStrokes; i++) {
                    const pill = document.createElement('div');
                    const st = state.stage9StrokeStates[i];
                    const isCurrent = i === curIdx;
                    pill.className = `h-2 flex-1 rounded-full transition-all duration-300 ${
                        st === 'ok'
                            ? 'bg-matcha-500 shadow-sm shadow-matcha-500/40'
                            : (isCurrent ? 'bg-slate-400 animate-pulse' : 'bg-slate-800 border border-slate-700/80')
                    }`;
                    pillsContainer.appendChild(pill);
                }
            }

            // 2. Accepted Strokes
            const accGroup = document.getElementById('stage9AcceptedGroup');
            if (accGroup) {
                accGroup.innerHTML = '';
                state.stage9AcceptedStrokes.forEach(v => {
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', v.pathStr);
                    path.setAttribute('transform', v.svgTransform || `scale(${KANJIVG_SCALE})`);
                    path.setAttribute('fill', 'none');
                    path.setAttribute('stroke', '#f59e0b');
                    path.setAttribute('stroke-width', String(v.strokeWidth || (8 / KANJIVG_SCALE)));
                    path.setAttribute('stroke-linecap', 'round');
                    path.setAttribute('stroke-linejoin', 'round');
                    accGroup.appendChild(path);
                });
            }

            const msg = document.getElementById('stage9StatusMsg');
            if (msg && curIdx < numStrokes) {
                msg.textContent = `Dibuja el trazo ${curIdx + 1} de memoria`;
            }
        }

        function initStage9CanvasEvents(item) {
            const svgEl = document.getElementById('stage9SvgSurface');
            if (!svgEl) return;

            let isPointerDown = false;
            let userPoints = [];

            svgEl.onpointerdown = (e) => {
                isPointerDown = true;
                userPoints = [];
                try { svgEl.setPointerCapture(e.pointerId); } catch(err) {}
                const pt = getSvgPoint(e, svgEl);
                if (pt) {
                    userPoints.push(pt);
                    const pathEl = document.getElementById('stage9LivePath');
                    if (pathEl) pathEl.setAttribute('d', `M ${pt.x} ${pt.y}`);
                }
            };

            svgEl.onpointermove = (e) => {
                if (!isPointerDown) return;
                const pt = getSvgPoint(e, svgEl);
                if (!pt) return;
                const prev = userPoints[userPoints.length - 1];
                if (prev && Math.hypot(pt.x - prev.x, pt.y - prev.y) < 2) return;
                userPoints.push(pt);
                const pathEl = document.getElementById('stage9LivePath');
                if (pathEl) pathEl.setAttribute('d', pointsToSmoothSvgPath(userPoints));
            };

            svgEl.onpointerup = (e) => {
                if (!isPointerDown) return;
                isPointerDown = false;
                try { svgEl.releasePointerCapture(e.pointerId); } catch(err) {}

                const pathEl = document.getElementById('stage9LivePath');
                if (pathEl) pathEl.setAttribute('d', '');

                const strokeVectors = getKanaStrokeVectors(item.hiragana);
                const curIdx = state.stage9ActiveStrokeIdx;
                if (curIdx >= strokeVectors.length) return;

                const ref = strokeVectors[curIdx];
                const diag = diagnoseUserStroke(userPoints, ref, 'easy');

                if (diag.ok) {
                    state.stage9AcceptedStrokes.push(ref);
                    state.stage9StrokeStates[curIdx] = 'ok';
                    state.stage9ActiveStrokeIdx++;

                    triggerHaptic('success');
                    playSoundTone(659.25, 'sine', 0.12);
                    svgEl.classList.add('surface-ok');
                    setTimeout(() => svgEl.classList.remove('surface-ok'), 200);

                    updateStage9Layers(item.hiragana);

                    if (state.stage9ActiveStrokeIdx >= strokeVectors.length) {
                        handleStageAnswer(!state.stage9HadErrors, null, item.hiragana);
                        setTimeout(() => nextStageExercise(), 500);
                    }
                } else {
                    state.stage9HadErrors = true;
                    triggerHaptic('error');
                    playSoundTone(220, 'sawtooth', 0.2);
                    svgEl.classList.add('surface-bad');
                    setTimeout(() => svgEl.classList.remove('surface-bad'), 250);

                    const msg = document.getElementById('stage9StatusMsg');
                    if (msg) {
                        msg.innerHTML = `<span class="text-rose-400 font-bold">${diag.msg}</span>`;
                        setTimeout(() => updateStage9Layers(item.hiragana), 1800);
                    }
                }
                userPoints = [];
            };

            svgEl.onpointercancel = () => {
                isPointerDown = false;
                userPoints = [];
                const pathEl = document.getElementById('stage9LivePath');
                if (pathEl) pathEl.setAttribute('d', '');
            };
        }

        function finishStagesSession() {
            if (state.stageSession.timerInterval) {
                clearInterval(state.stageSession.timerInterval);
                state.stageSession.timerInterval = null;
            }

            // Marcar cualquier etapa no completada como omitida
            if (!state.stageSession.stageStatuses) state.stageSession.stageStatuses = {};
            state.stageSession.selectedStages.forEach(sNum => {
                if (!state.stageSession.stageStatuses[sNum]) {
                    state.stageSession.stageStatuses[sNum] = 'skipped';
                }
            });

            document.getElementById('stages-setup-view')?.classList.add('hidden');
            document.getElementById('stages-active-view')?.classList.add('hidden');
            document.getElementById('stages-results-view')?.classList.remove('hidden');

            const totalStages = state.stageSession.selectedStages.length;
            const perfectCount = state.stageSession.selectedStages.filter(s => state.stageSession.stageStatuses[s] === 'perfect').length;
            const withErrorsCount = state.stageSession.selectedStages.filter(s => state.stageSession.stageStatuses[s] === 'with_errors').length;
            const completedStages = perfectCount + withErrorsCount;

            const stats = state.stageSession.stats;
            const totalAttempts = stats.totalCorrect + stats.totalErrors;
            const rawAccuracy = totalAttempts > 0 ? (stats.totalCorrect / totalAttempts) : 0;
            
            // Rendimiento real ponderado descontando etapas saltadas:
            // Si el usuario salta etapas, no puede marcar 100%!
            const completionRate = totalStages > 0 ? (completedStages / totalStages) : 0;
            const realPerformance = Math.round(rawAccuracy * completionRate * 100);

            const accEl = document.getElementById('stagesResultAccuracy');
            if (accEl) {
                accEl.textContent = `${realPerformance}%`;
                if (realPerformance >= 80) {
                    accEl.className = 'text-xl font-black text-matcha-400 mt-1';
                } else if (realPerformance >= 50) {
                    accEl.className = 'text-xl font-black text-amber-400 mt-1';
                } else {
                    accEl.className = 'text-xl font-black text-rose-400 mt-1';
                }
            }

            const compSubEl = document.getElementById('stagesResultCompletionSub');
            if (compSubEl) {
                compSubEl.textContent = `${completedStages}/${totalStages} etapas (${Math.round(completionRate * 100)}%)`;
            }

            const corEl = document.getElementById('stagesResultCorrect');
            if (corEl) corEl.textContent = stats.totalCorrect;

            const errEl = document.getElementById('stagesResultErrors');
            if (errEl) errEl.textContent = stats.totalErrors;

            const xpEl = document.getElementById('stagesResultXP');
            if (xpEl) xpEl.textContent = `+${stats.xpEarned} XP`;

            // Render Completed Stages Pills con su rendimiento real
            const pillsCont = document.getElementById('stagesCompletedPills');
            if (pillsCont) {
                pillsCont.innerHTML = state.stageSession.selectedStages.map(sNum => {
                    const meta = STAGE_METADATA.find(m => m.num === sNum);
                    const name = meta ? meta.name : `Etapa ${sNum}`;
                    const st = state.stageSession.stageStatuses[sNum];
                    
                    if (st === 'perfect') {
                        return `
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                                <i class="fa-solid fa-circle-check text-emerald-400"></i> Etapa ${sNum}: ${name} (Sin fallos)
                            </span>
                        `;
                    } else if (st === 'with_errors') {
                        return `
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-bold">
                                <i class="fa-solid fa-triangle-exclamation text-amber-400"></i> Etapa ${sNum}: ${name} (Con fallos)
                            </span>
                        `;
                    } else {
                        return `
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold">
                                <i class="fa-solid fa-forward text-rose-400"></i> Etapa ${sNum}: ${name} (Omitida)
                            </span>
                        `;
                    }
                }).join('');
            }

            // Auto mode handling: Progresión y desbloqueo de niveles con maestría acumulativa
            const autoFeedbackEl = document.getElementById('stagesResultsAutoFeedback');
            const actionButtonsEl = document.getElementById('stagesResultsActionButtons');

            if (state.stageSession.isAuto && state.stageSession.autoLevelId) {
                const autoLevelId = state.stageSession.autoLevelId;
                const curriculum = getActiveStagesCurriculum();
                const prog = getActiveStagesAutoProgress();
                const curLvlIdx = curriculum.findIndex(l => l.id === autoLevelId);
                const curLvlObj = curriculum[curLvlIdx] || { name: autoLevelId, kanas: [] };

                if (!prog.levelScores) prog.levelScores = {};
                if (!Array.isArray(prog.masteredLevels)) prog.masteredLevels = [];
                if (!prog.kanaMastery) prog.kanaMastery = {};

                // 1. Evaluación kana a kana para maestría acumulativa (0 a 3)
                const sessionKanaStats = state.stageSession.sessionKanaStats || {};
                const upgradedKanas = [];

                for (const [kanaChar, kStats] of Object.entries(sessionKanaStats)) {
                    if (kStats.attempts >= 2) {
                        const kanaAccuracy = kStats.correct / kStats.attempts;
                        if (kanaAccuracy >= 0.80) {
                            const currentMastery = prog.kanaMastery[kanaChar]?.mastery || 0;
                            const newMastery = Math.min(3, currentMastery + 1);
                            prog.kanaMastery[kanaChar] = {
                                mastery: newMastery,
                                lastPracticed: Date.now()
                            };
                            if (newMastery > currentMastery) {
                                upgradedKanas.push({ kana: kanaChar, from: currentMastery, to: newMastery });
                            }
                        } else {
                            if (prog.kanaMastery[kanaChar]) {
                                prog.kanaMastery[kanaChar].lastPracticed = Date.now();
                            } else {
                                prog.kanaMastery[kanaChar] = {
                                    mastery: 0,
                                    lastPracticed: Date.now()
                                };
                            }
                        }
                    }
                }

                // 2. Verificar si filas completas alcanzaron 3/3 en todos sus kanas
                curriculum.forEach(lvl => {
                    const isLevelFullyMastered = lvl.kanas.length > 0 && lvl.kanas.every(k => (prog.kanaMastery[k]?.mastery || 0) >= 3);
                    if (isLevelFullyMastered && !prog.masteredLevels.includes(lvl.id)) {
                        prog.masteredLevels.push(lvl.id);
                    }
                });

                const prevBest = prog.levelScores[autoLevelId]?.bestScore || 0;
                prog.levelScores[autoLevelId] = {
                    bestScore: Math.max(prevBest, realPerformance),
                    attempts: (prog.levelScores[autoLevelId]?.attempts || 0) + 1,
                    lastCompleted: Date.now()
                };

                const isMastered = realPerformance >= 75;
                let unlockedNext = false;
                let nextLvlObj = null;

                if (isMastered) {
                    if (curLvlIdx === prog.unlockedIndex && prog.unlockedIndex < curriculum.length - 1) {
                        prog.unlockedIndex++;
                        unlockedNext = true;
                        nextLvlObj = curriculum[prog.unlockedIndex];
                    }
                }

                // Determinar automáticamente el siguiente nivel activo
                const nextActiveLvlObj = getAutoDeterminedActiveLevel() || curLvlObj;
                const nextActiveLevelId = prog.selectedLevelId;

                saveStateToStorage();
                renderStagesAutoDashboard();

                if (autoFeedbackEl) {
                    autoFeedbackEl.classList.remove('hidden');
                    const upgradedPillsHtml = upgradedKanas.length > 0 ? `
                        <div class="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/40 flex flex-wrap items-center gap-2 mt-2">
                            <span class="text-xs font-bold text-emerald-300">📈 Subida de Nivel de Kanas:</span>
                            ${upgradedKanas.map(u => `
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-white font-jp text-sm font-bold border border-emerald-400/40 shadow-sm">
                                    ${u.kana} <span class="text-emerald-400 font-mono text-xs">${u.to}/3</span>
                                </span>
                            `).join('')}
                        </div>
                    ` : '';

                    if (isMastered) {
                        autoFeedbackEl.innerHTML = `
                            <div class="bg-gradient-to-r from-emerald-950/80 to-teal-950/60 border border-emerald-500/50 p-4 sm:p-5 rounded-2xl text-left space-y-2.5 shadow-xl shadow-emerald-500/10">
                                <div class="flex items-center gap-3">
                                    <span class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-xl font-bold shrink-0">
                                        <i class="fa-solid fa-trophy"></i>
                                    </span>
                                    <div>
                                        <h4 class="text-base font-black text-white">¡Fila ${curLvlObj.name} Superada con Éxito! (${realPerformance}%)</h4>
                                        <p class="text-xs text-emerald-300">¡Excelente! Has alcanzado el objetivo mínimo de 75%.</p>
                                    </div>
                                </div>
                                ${unlockedNext ? `
                                    <div class="bg-slate-950/70 p-3.5 rounded-xl border border-emerald-500/40 flex items-center justify-between gap-3">
                                        <div class="flex items-center gap-2.5 text-xs text-slate-200">
                                            <i class="fa-solid fa-lock-open text-amber-400 text-sm"></i>
                                            <span>¡Nuevo nivel desbloqueado: <strong class="text-white font-bold">Fila ${nextLvlObj.name} (${nextLvlObj.kanas.join(', ')})</strong>!</span>
                                        </div>
                                    </div>
                                ` : ''}
                                ${upgradedPillsHtml}
                            </div>
                        `;
                    } else {
                        autoFeedbackEl.innerHTML = `
                            <div class="bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/40 p-4 sm:p-5 rounded-2xl text-left space-y-2 shadow-xl shadow-amber-500/10">
                                <div class="flex items-center gap-3">
                                    <span class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center text-xl font-bold shrink-0">
                                        <i class="fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <div>
                                        <h4 class="text-base font-black text-white">Buen intento: ${realPerformance}% en Fila ${curLvlObj.name}</h4>
                                        <p class="text-xs text-amber-300">Se requiere un rendimiento real de al menos 75% para certificar este grupo y desbloquear el siguiente.</p>
                                    </div>
                                </div>
                                ${upgradedPillsHtml}
                            </div>
                        `;
                    }
                }

                if (actionButtonsEl) {
                    if (isMastered) {
                        actionButtonsEl.innerHTML = `
                            <button type="button" data-action="startStagesAutoSession" data-args='["${nextActiveLevelId}"]' class="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-rose-500/25 transition flex items-center justify-center gap-2">
                                <span>Siguiente Nivel: Fila ${nextActiveLvlObj.name}</span>
                                <i class="fa-solid fa-chevron-right text-xs"></i>
                            </button>
                            <button type="button" data-action="startStagesAutoSession" data-args='["${autoLevelId}"]' class="flex-1 py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition">
                                <i class="fa-solid fa-rotate-right mr-2"></i> Repetir Nivel Actual
                            </button>
                            <button type="button" data-action="returnToStagesSetup" class="flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-sm transition">
                                <i class="fa-solid fa-route mr-2"></i> Volver a la Ruta
                            </button>
                        `;
                    } else {
                        actionButtonsEl.innerHTML = `
                            <button type="button" data-action="startStagesAutoSession" data-args='["${autoLevelId}"]' class="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-sm shadow-lg transition">
                                <i class="fa-solid fa-rotate-right mr-2"></i> Reintentar Nivel Actual
                            </button>
                            <button type="button" data-action="returnToStagesSetup" class="flex-1 py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition">
                                <i class="fa-solid fa-route mr-2"></i> Volver a la Ruta
                            </button>
                        `;
                    }
                }
            } else {
                if (autoFeedbackEl) {
                    autoFeedbackEl.classList.add('hidden');
                    autoFeedbackEl.innerHTML = '';
                }
                if (actionButtonsEl) {
                    actionButtonsEl.innerHTML = `
                        <button type="button" data-action="startStagesSession" class="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-sakura-600 to-amber-500 hover:from-sakura-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg transition">
                            <i class="fa-solid fa-rotate-right mr-2"></i> Repetir Misma Sesión
                        </button>
                        <button type="button" data-action="returnToStagesSetup" class="flex-1 py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition">
                            <i class="fa-solid fa-sliders mr-2"></i> Configurar Otras Etapas
                        </button>
                    `;
                }
            }

            if (realPerformance >= 70 && typeof confetti === 'function') {
                try {
                    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
                } catch(e) {}
            }
        }
