// KotoDojo · Progreso SRS (Leitner)
        // ==========================================================
        // PROGRESO SRS (LEITNER 3 CAJAS & MOCHILA DE PUNTOS DÉBILES)
        // ==========================================================
        function formatRelativeTime(timestamp) {
            if (!timestamp) return 'Sin repasar';
            const now = Date.now();
            const diffSec = Math.floor((now - timestamp) / 1000);
            if (diffSec < 60) return 'Hace un momento';
            const diffMin = Math.floor(diffSec / 60);
            if (diffMin < 60) return `Hace ${diffMin}m`;
            const diffHours = Math.floor(diffMin / 60);
            if (diffHours < 24) return `Hace ${diffHours}h`;
            const diffDays = Math.floor(diffHours / 24);
            if (diffDays === 1) return 'Ayer';
            if (diffDays < 30) return `Hace ${diffDays}d`;
            return new Date(timestamp).toLocaleDateString();
        }

        function getWeakestKanas(limit = 5) {
            const activeStore = getActiveSRS();
            const activeDataset = getActiveKanaDataset();
            if (!activeStore) return [];
            return Object.entries(activeStore)
                .map(([kanaChar, data]) => {
                    const reviews = data.reviews || 0;
                    const consecutive = data.consecutive || 0;
                    const fails = (typeof data.errors === 'number')
                        ? data.errors
                        : (data.box === 1 ? Math.min(2, Math.max(1, reviews - consecutive)) : (data.box === 2 ? 1 : 0));
                    const failRate = reviews > 0 ? (fails / reviews) : 0;
                    const kanaObj = activeDataset.find(k => (k.char || k.katakana || k.hiragana) === kanaChar);
                    return {
                        hiragana: kanaChar,
                        char: kanaChar,
                        romaji: kanaObj ? kanaObj.romaji : kanaChar,
                        group: kanaObj ? kanaObj.group : 'a',
                        reviews,
                        consecutive,
                        fails,
                        box: data.box || 1,
                        failRate,
                        failPercent: Math.round(failRate * 100),
                        lastReviewed: data.lastReviewed || null
                    };
                })
                .filter(item => item.reviews >= 1 && (item.fails > 0 || item.box < 3))
                .sort((a, b) => b.failRate - a.failRate || b.fails - a.fails || a.consecutive - b.consecutive)
                .slice(0, limit);
        }

        function practiceSingleWeakKana(hiragana, mode = 'draw') {
            const kanaObj = HIRAGANA_DATA.find(k => k.hiragana === hiragana);
            if (!kanaObj) return;

            if (mode === 'quiz') {
                state.quizCustomPool = [kanaObj];
                state.quizCustomTitle = `🎯 Foco en "${kanaObj.hiragana}" (${kanaObj.romaji})`;
                switchTab('quiz');
                initQuizQuestion();
                showToast(`🎯 Quiz enfocado en "${kanaObj.hiragana}"`, "info");
            } else {
                state.selectedDrawingKana = kanaObj;
                state.customPracticePool = [kanaObj];
                state.customPracticeTitle = `🎯 Foco en "${kanaObj.hiragana}" (${kanaObj.romaji})`;
                switchTab('draw');
                loadCharacterForDrawing(kanaObj.hiragana, 'draw');
                updateCustomPracticePoolBanner();
                renderDrawKanaList();
                showToast(`🎯 Practicando "${kanaObj.hiragana}" (${kanaObj.romaji})`, "info");
            }
        }

        function startWeakKanasPractice() {
            const weakList = getWeakestKanas(5);
            if (weakList.length === 0) {
                showToast("¡Excelente! No tienes kanas con dificultades registradas aún.", "success");
                return;
            }
            const targetKanas = weakList.map(w => HIRAGANA_DATA.find(k => k.hiragana === w.hiragana)).filter(Boolean);
            state.customPracticePool = targetKanas;
            state.customPracticeTitle = `🎯 ${targetKanas.length} Kanas Difíciles`;
            switchTab('draw');
            state.selectedDrawingKana = targetKanas[0];
            loadCharacterForDrawing(targetKanas[0].hiragana, 'draw');
            updateCustomPracticePoolBanner();
            renderDrawKanaList();
            showToast(`🎯 Practicando exclusivamente tus ${targetKanas.length} kanas más difíciles`, "info");
        }

        function startWeakKanasQuiz() {
            const weakList = getWeakestKanas(5);
            if (weakList.length === 0) {
                showToast("¡Excelente! No tienes kanas difíciles registrados aún.", "success");
                return;
            }
            const targetKanas = weakList.map(w => HIRAGANA_DATA.find(k => k.hiragana === w.hiragana)).filter(Boolean);
            state.quizCustomPool = targetKanas;
            state.quizCustomTitle = `🎯 Quiz de Kanas Difíciles (${targetKanas.length} kanas)`;
            switchTab('quiz');
            initQuizQuestion();
            showToast(`⚡ Quiz con tus ${targetKanas.length} kanas más difíciles iniciado`, "info");
        }

        function startDailyReviewSession() {
            // Weighted 10-kana selection: 60% Box 1, 30% Box 2, 10% Box 3
            const activeDataset = getActiveKanaDataset();
            const box1 = [], box2 = [], box3 = [];
            activeDataset.forEach(item => {
                const s = getKanaSRS(item.char || item.katakana || item.hiragana);
                if (s.box === 1) box1.push(item);
                else if (s.box === 2) box2.push(item);
                else box3.push(item);
            });

            shuffleArray(box1);
            shuffleArray(box2);
            shuffleArray(box3);

            const sessionPool = [];
            sessionPool.push(...box1.slice(0, 6));
            sessionPool.push(...box2.slice(0, 3));
            sessionPool.push(...box3.slice(0, 1));

            // Fill up to 10 if needed
            if (sessionPool.length < 10) {
                const remaining = shuffleArray(activeDataset.filter(k => !sessionPool.some(p => (p.char || p.katakana || p.hiragana) === (k.char || k.katakana || k.hiragana))));
                sessionPool.push(...remaining.slice(0, 10 - sessionPool.length));
            }

            state.customPracticePool = sessionPool;
            state.customPracticeTitle = `📅 Sesión Diaria (10 Kanas)`;
            switchTab('draw');
            state.selectedDrawingKana = sessionPool[0];
            loadCharacterForDrawing(sessionPool[0].hiragana, 'draw');
            updateCustomPracticePoolBanner();
            renderDrawKanaList();
            showToast(`📅 Sesión Diaria de Repaso (10 kanas) iniciada`, "success");
        }

        let currentSRSMatrixFilter = 'all';

        function setSRSMatrixFilter(filter) {
            currentSRSMatrixFilter = filter;
            renderSRSDashboard();
        }

        function renderSRSDashboard() {
            updateHeaderBadges();

            // 1. Render Mochila de Puntos Débiles
            const weakListEl = document.getElementById('srsWeakList');
            if (weakListEl) {
                weakListEl.innerHTML = '';
                const weakest = getWeakestKanas(5);
                if (weakest.length === 0) {
                    weakListEl.className = 'p-6 bg-slate-900/60 rounded-xl border border-slate-700 text-center col-span-full';
                    weakListEl.innerHTML = `
                        <i class="fa-solid fa-circle-check text-matcha-400 text-3xl mb-2"></i>
                        <p class="text-sm font-bold text-white">¡Sin puntos débiles críticos!</p>
                        <p class="text-xs text-slate-400 mt-1">Practica trazados o haz quizzes para que el sistema aprenda tus necesidades de repaso.</p>
                    `;
                } else {
                    weakListEl.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3';
                    weakest.forEach(w => {
                        const card = document.createElement('div');
                        card.className = 'bg-slate-900/90 border border-rose-500/50 hover:border-sakura-400 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition hover:scale-105 shadow-md group cursor-pointer';
                        card.innerHTML = `
                            <div class="w-full flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                                <span class="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300">Caja ${w.box}</span>
                                <span class="px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-400 font-mono">${w.failPercent}% err</span>
                            </div>
                            <div class="font-jp text-4xl font-black text-white my-1">${w.hiragana}</div>
                            <div class="font-mono text-xs font-bold text-amber-300 uppercase">${w.romaji}</div>
                            <div class="text-[10px] text-slate-400 mt-1 space-y-0.5">
                                <div>${w.reviews} intentos • ${w.fails} ${w.fails === 1 ? 'fallo' : 'fallos'} • ${w.consecutive} seguidos</div>
                                <div class="text-[9px] text-slate-500"><i class="fa-regular fa-clock mr-1"></i>${formatRelativeTime(w.lastReviewed)}</div>
                            </div>
                            <div class="grid grid-cols-2 gap-1.5 w-full mt-3">
                                <button type="button" data-action="practiceSingleWeakKana" data-args='["${w.hiragana}", "draw"]' data-stop class="py-1.5 bg-rose-900/40 hover:bg-sakura-600 border border-rose-700/50 hover:border-sakura-500 text-rose-200 hover:text-white rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-sm">
                                    <i class="fa-solid fa-pen-nib text-[9px]"></i> Trazar
                                </button>
                                <button type="button" data-action="practiceSingleWeakKana" data-args='["${w.hiragana}", "quiz"]' data-stop class="py-1.5 bg-indigo-900/40 hover:bg-indigo-600 border border-indigo-700/50 hover:border-indigo-500 text-indigo-200 hover:text-white rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-sm">
                                    <i class="fa-solid fa-circle-question text-[9px]"></i> Quiz
                                </button>
                            </div>
                        `;
                        card.onclick = () => practiceSingleWeakKana(w.hiragana, 'draw');
                        weakListEl.appendChild(card);
                    });
                }
            }

            // 2. Count for Filters & Update Filter UI
            const activeDataset = getActiveKanaDataset();
            let countAll = activeDataset.length;
            let count1 = 0, count2 = 0, count3 = 0;
            activeDataset.forEach(item => {
                const s = getKanaSRS(item.char || item.katakana || item.hiragana);
                if (s.box === 3) count3++;
                else if (s.box === 2) count2++;
                else count1++;
            });

            const countAllEl = document.getElementById('srsFilterCount-all');
            if (countAllEl) countAllEl.textContent = countAll;
            const count1El = document.getElementById('srsFilterCount-1');
            if (count1El) count1El.textContent = count1;
            const count2El = document.getElementById('srsFilterCount-2');
            if (count2El) count2El.textContent = count2;
            const count3El = document.getElementById('srsFilterCount-3');
            if (count3El) count3El.textContent = count3;

            const filterBtns = [
                { id: 'srsFilterBtn-all', key: 'all', activeClass: 'bg-slate-700 text-white shadow-sm border border-slate-600', inactiveClass: 'text-slate-400 hover:bg-slate-800 border border-slate-700' },
                { id: 'srsFilterBtn-1', key: '1', activeClass: 'bg-rose-950/80 text-rose-300 shadow-sm border border-rose-500/60', inactiveClass: 'text-rose-400 hover:bg-slate-800 border border-rose-500/30' },
                { id: 'srsFilterBtn-2', key: '2', activeClass: 'bg-amber-950/80 text-amber-300 shadow-sm border border-amber-500/60', inactiveClass: 'text-amber-400 hover:bg-slate-800 border border-amber-500/30' },
                { id: 'srsFilterBtn-3', key: '3', activeClass: 'bg-matcha-950/80 text-matcha-300 shadow-sm border border-matcha-500/60', inactiveClass: 'text-matcha-400 hover:bg-slate-800 border border-matcha-500/30' }
            ];
            filterBtns.forEach(fb => {
                const btn = document.getElementById(fb.id);
                if (btn) {
                    btn.className = `px-2.5 py-1 rounded-lg font-bold transition ${currentSRSMatrixFilter === fb.key ? fb.activeClass : fb.inactiveClass}`;
                }
            });

            // 3. Render Matrix Grid with active filter
            const matrixGrid = document.getElementById('srsFullMatrixGrid');
            if (!matrixGrid) return;
            matrixGrid.innerHTML = '';

            const filteredKanas = activeDataset.filter(item => {
                if (currentSRSMatrixFilter === 'all') return true;
                const s = getKanaSRS(item.char || item.katakana || item.hiragana);
                return String(s.box) === String(currentSRSMatrixFilter);
            });

            if (filteredKanas.length === 0) {
                matrixGrid.className = 'p-8 bg-slate-900/60 rounded-xl border border-slate-700 text-center col-span-full';
                matrixGrid.innerHTML = `
                    <i class="fa-solid fa-inbox text-slate-500 text-3xl mb-2"></i>
                    <p class="text-sm font-bold text-slate-300">No hay caracteres en Caja ${currentSRSMatrixFilter}</p>
                    <p class="text-xs text-slate-400 mt-1">Practica trazados o completa quizzes para mover caracteres a esta caja.</p>
                `;
                return;
            }

            matrixGrid.className = 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5';

            filteredKanas.forEach(item => {
                const s = getKanaSRS(item.char || item.katakana || item.hiragana);
                const tile = document.createElement('div');

                const borderClass = s.box === 3 ? 'border-matcha-500 bg-matcha-500/10 text-matcha-300' :
                                   (s.box === 2 ? 'border-amber-500 bg-amber-500/10 text-amber-300' :
                                   'border-rose-500/40 bg-rose-500/5 text-rose-300');

                tile.className = `p-2 rounded-xl border text-center font-jp font-bold transition shadow-sm flex flex-col items-center justify-center cursor-pointer hover:scale-105 ${borderClass}`;
                tile.onclick = () => {
                    speakJapanese(item.hiragana);
                    showToast(`"${item.hiragana}" (${item.romaji}): Caja ${s.box} • ${s.consecutive} aciertos seguidos • ${formatRelativeTime(s.lastReviewed)}`, "info");
                };

                tile.innerHTML = `
                    <div class="text-xl sm:text-2xl font-bold">${item.hiragana}</div>
                    <div class="text-[10px] uppercase font-mono font-bold tracking-wider opacity-80">${item.romaji}</div>
                    <div class="text-[9px] font-black mt-0.5 px-1 rounded bg-slate-900/80">Caja ${s.box}</div>
                `;

                matrixGrid.appendChild(tile);
            });
        }
