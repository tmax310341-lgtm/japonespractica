// KotoDojo · Juego de memoria
        // ==========================================================
        // JUEGO DE MEMORIA ADAPTATIVO (CALCULO MATEMÁTICO ESCALABLE PARA HASTA 208 CARTAS)
        // ==========================================================
        function initMemoryGame() {
            if (!state.memorySelectedGroups || state.memorySelectedGroups.length === 0) {
                state.memorySelectedGroups = (state.practiceSelectedGroups && state.practiceSelectedGroups.length > 0) ? [...state.practiceSelectedGroups] : ['a', 'ka'];
            }
            if (!state.memoryPairCount) state.memoryPairCount = 'all';

            renderMemoryGroupChips();

            state.memoryMoves = 0;
            state.flippedCards = [];
            state.memoryLock = false;

            const movesEl = document.getElementById('memoryMoves');
            if (movesEl) movesEl.textContent = '0';

            const victoryBanner = document.getElementById('memoryVictoryBanner');
            if (victoryBanner) victoryBanner.classList.add('hidden');

            // 1. Obtener pool de kanas según los grupos seleccionados
            const filteredPool = HIRAGANA_DATA.filter(k => state.memorySelectedGroups.includes(k.group));
            const activeKanaPool = filteredPool.length > 0 ? filteredPool : HIRAGANA_DATA.filter(k => k.group === 'a');

            // 2. Determinar número de pares a jugar
            let numPairs = activeKanaPool.length;
            if (state.memoryPairCount !== 'all') {
                const requested = parseInt(state.memoryPairCount, 10) || activeKanaPool.length;
                numPairs = Math.min(requested, activeKanaPool.length);
            }
            numPairs = Math.max(2, numPairs);

            const poolBadge = document.getElementById('memoryPoolBadge');
            if (poolBadge) poolBadge.textContent = `${activeKanaPool.length} kanas seleccionados • ${numPairs} pares activos (${numPairs * 2} cartas)`;

            const poolBadgeSmall = document.getElementById('memoryPoolBadgeSmall');
            if (poolBadgeSmall) poolBadgeSmall.textContent = `${activeKanaPool.length} kanas`;

            // Sincronizar select
            const selectEl = document.getElementById('memoryPairCountSelect');
            if (selectEl) selectEl.value = state.memoryPairCount;

            // 3. Mezclar y tomar numPairs
            const shuffledKana = shuffleArray([...activeKanaPool]).slice(0, numPairs);

            // 4. Crear pares de cartas (Hiragana + Romaji)
            let cards = [];
            shuffledKana.forEach((item, idx) => {
                cards.push({ id: `h_${idx}_${item.hiragana}`, type: 'hiragana', content: item.hiragana, kanaObj: item, matchId: idx });
                cards.push({ id: `r_${idx}_${item.romaji}`, type: 'romaji', content: item.romaji, kanaObj: item, matchId: idx });
            });

            state.memoryCards = shuffleArray(cards).map(c => ({
                ...c,
                isFlipped: false,
                isMatched: false
            }));

            renderMemoryGrid();
        }

        function renderMemoryGrid() {
            const grid = document.getElementById('memoryGrid');
            if (!grid) return;
            grid.innerHTML = '';

            const totalCards = state.memoryCards.length;
            const numPairs = totalCards / 2;
            const matchedPairs = state.memoryCards.filter(c => c.isMatched).length / 2;

            const matchesEl = document.getElementById('memoryMatches');
            if (matchesEl) matchesEl.textContent = `${matchedPairs} / ${numPairs}`;

            // =========================================================================
            // CÁLCULO MATEMÁTICO RESPONSIVO DE COLUMNAS Y TAMAÑOS SEGÚN TOTAL DE CARTAS
            // =========================================================================
            let gridColsClass = 'grid-cols-2 sm:grid-cols-4';
            let cardHeightClass = 'h-24 sm:h-28';
            let charSizeClass = 'text-3xl sm:text-4xl';
            let romajiSizeClass = 'text-base sm:text-lg';
            let badgeTextClass = 'text-[9px]';
            let paddingClass = 'p-2';
            let gapClass = 'gap-2 sm:gap-2.5';

            if (totalCards <= 8) {
                // 4 Pares (8 cartas)
                gridColsClass = 'grid-cols-2 sm:grid-cols-4';
                cardHeightClass = 'h-28 sm:h-32';
                charSizeClass = 'text-4xl sm:text-5xl';
                romajiSizeClass = 'text-lg sm:text-xl';
                badgeTextClass = 'text-[10px]';
                paddingClass = 'p-3';
            } else if (totalCards <= 12) {
                // 5-6 Pares (10-12 cartas) - Ej. Fila A
                gridColsClass = 'grid-cols-3 sm:grid-cols-4 md:grid-cols-4';
                cardHeightClass = 'h-24 sm:h-28';
                charSizeClass = 'text-3xl sm:text-4xl';
                romajiSizeClass = 'text-base sm:text-lg';
                paddingClass = 'p-2';
            } else if (totalCards <= 20) {
                // 10 Pares (20 cartas) - Ej. A + Ka
                gridColsClass = 'grid-cols-4 sm:grid-cols-5 md:grid-cols-5';
                cardHeightClass = 'h-20 sm:h-24';
                charSizeClass = 'text-2xl sm:text-3xl';
                romajiSizeClass = 'text-sm sm:text-base';
                paddingClass = 'p-2';
            } else if (totalCards <= 36) {
                // 18 Pares (36 cartas)
                gridColsClass = 'grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6';
                cardHeightClass = 'h-16 sm:h-20';
                charSizeClass = 'text-xl sm:text-2xl';
                romajiSizeClass = 'text-xs sm:text-sm';
                paddingClass = 'p-1.5';
                gapClass = 'gap-1.5 sm:gap-2';
            } else if (totalCards <= 54) {
                // 25 Pares (50 cartas) - Ej. Dakuten
                gridColsClass = 'grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10';
                cardHeightClass = 'h-14 sm:h-18';
                charSizeClass = 'text-lg sm:text-xl';
                romajiSizeClass = 'text-[11px] sm:text-xs';
                badgeTextClass = 'text-[8px]';
                paddingClass = 'p-1';
                gapClass = 'gap-1 sm:gap-1.5';
            } else if (totalCards <= 100) {
                // 46 Pares (92 cartas) - Ej. Todos Básicos
                gridColsClass = 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12';
                cardHeightClass = 'h-11 sm:h-14';
                charSizeClass = 'text-base sm:text-lg';
                romajiSizeClass = 'text-[9px] sm:text-[10px]';
                badgeTextClass = 'hidden';
                paddingClass = 'p-0.5';
                gapClass = 'gap-1';
            } else {
                // > 100 cartas (hasta 104 pares = 208 cartas) - Ej. TODOS
                gridColsClass = 'grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16';
                cardHeightClass = 'h-9 sm:h-12';
                charSizeClass = 'text-sm sm:text-base';
                romajiSizeClass = 'text-[8px] sm:text-[9px]';
                badgeTextClass = 'hidden';
                paddingClass = 'p-0.5';
                gapClass = 'gap-0.5 sm:gap-1';
            }

            grid.className = `grid ${gridColsClass} ${gapClass} no-select w-full`;

            state.memoryCards.forEach((card, index) => {
                const cardEl = document.createElement('div');
                const isRevealed = card.isFlipped || card.isMatched;

                cardEl.className = `${cardHeightClass} ${paddingClass} rounded-xl sm:rounded-2xl flex flex-col items-center justify-center font-bold transition-all duration-200 cursor-pointer shadow-md no-select border ${
                    card.isMatched
                        ? 'bg-matcha-950/70 border-2 border-matcha-500 text-matcha-300 opacity-90 scale-[0.98]'
                        : (card.isFlipped
                            ? 'bg-slate-800 border-2 border-sakura-500 text-white scale-105 shadow-sakura-500/20 z-10'
                            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-slate-500 hover:border-slate-500 hover:scale-[1.02]')
                }`;

                if (isRevealed) {
                    if (card.type === 'hiragana') {
                        cardEl.innerHTML = `
                            <span class="font-jp font-black leading-none ${charSizeClass} ${card.isMatched ? 'text-matcha-300' : 'text-sakura-300'}">${card.content}</span>
                            <span class="${badgeTextClass} font-mono uppercase tracking-wider text-slate-400 mt-0.5">Hira</span>
                        `;
                    } else {
                        cardEl.innerHTML = `
                            <span class="font-mono font-black uppercase tracking-wider leading-none ${romajiSizeClass} ${card.isMatched ? 'text-matcha-300' : 'text-amber-300'}">${card.content}</span>
                            <span class="${badgeTextClass} font-mono uppercase tracking-wider text-slate-400 mt-0.5">Roma</span>
                        `;
                    }
                } else {
                    cardEl.innerHTML = `
                        <div class="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-slate-900/80 flex items-center justify-center border border-slate-700/60 shadow-inner">
                            <i class="fa-solid fa-gem text-slate-500 text-[10px] sm:text-xs"></i>
                        </div>
                    `;
                }

                cardEl.onclick = () => flipMemoryCard(index);
                grid.appendChild(cardEl);
            });
        }

        function flipMemoryCard(index) {
            if (state.memoryLock) return;
            const card = state.memoryCards[index];
            if (!card || card.isFlipped || card.isMatched || state.flippedCards.length >= 2) return;

            card.isFlipped = true;
            state.flippedCards.push({ ...card, index });

            // Audio de pronunciación al voltear
            if (card.kanaObj) speakJapanese(card.kanaObj.hiragana);
            else if (card.type === 'hiragana') speakJapanese(card.content);

            playSoundTone(523.25, 'sine', 0.1);
            renderMemoryGrid();

            if (state.flippedCards.length === 2) {
                state.memoryMoves++;
                const movesEl = document.getElementById('memoryMoves');
                if (movesEl) movesEl.textContent = state.memoryMoves;

                const [first, second] = state.flippedCards;
                if (first.matchId === second.matchId) {
                    // ¡Pareja Encontrada!
                    state.memoryCards[first.index].isMatched = true;
                    state.memoryCards[second.index].isMatched = true;
                    state.flippedCards = [];

                    recordKanaResult(first.kanaObj ? first.kanaObj.hiragana : first.content, true);

                    const xpBonus = 15;
                    addXP(xpBonus);
                    playSoundTone(587.33, 'sine', 0.15);
                    setTimeout(() => playSoundTone(880, 'sine', 0.22), 100);
                    showToast(`¡Pareja: "${first.kanaObj ? first.kanaObj.hiragana : ''}" = "${first.kanaObj ? first.kanaObj.romaji.toUpperCase() : ''}"! +${xpBonus} XP`, "success");

                    renderMemoryGrid();

                    // Verificar victoria
                    const allMatched = state.memoryCards.every(c => c.isMatched);
                    if (allMatched) {
                        setTimeout(() => {
                            const banner = document.getElementById('memoryVictoryBanner');
                            if (banner) banner.classList.remove('hidden');

                            const details = document.getElementById('memoryVictoryDetails');
                            if (details) {
                                details.innerHTML = `Has encontrado todas las <strong class="text-matcha-300">${state.memoryCards.length / 2} parejas</strong> en <strong class="text-amber-300">${state.memoryMoves} movimientos</strong>. ¡Ganaste <strong class="text-amber-300 font-bold">+50 XP extras</strong>!`;
                            }

                            addXP(50);
                            showToast("🎉 ¡Tablero de Memoria Completado! +50 XP Extra", "success");
                            playSoundTone(523.25, 'sine', 0.2);
                            setTimeout(() => playSoundTone(659.25, 'sine', 0.2), 150);
                            setTimeout(() => playSoundTone(783.99, 'sine', 0.2), 300);
                            setTimeout(() => playSoundTone(1046.50, 'sine', 0.4), 450);
                            if (typeof confetti === 'function') {
                                try { confetti({ particleCount: 60, spread: 75, origin: { y: 0.2 } }); } catch(e) {}
                            }
                        }, 400);
                    }
                } else {
                    // No coincide
                    state.memoryLock = true;
                    playSoundTone(220, 'sawtooth', 0.15);
                    setTimeout(() => {
                        state.memoryCards[first.index].isFlipped = false;
                        state.memoryCards[second.index].isFlipped = false;
                        state.flippedCards = [];
                        state.memoryLock = false;
                        renderMemoryGrid();
                    }, 850);
                }
            }
        }

        function renderMemoryGroupChips() {
            const container = document.getElementById('memoryGroupChipsContainer');
            if (!container) return;
            container.innerHTML = '';

            SOUND_GROUPS.forEach(group => {
                const isActive = state.memorySelectedGroups.includes(group.id);
                const chip = document.createElement('button');
                chip.className = `px-2 py-0.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 border whitespace-nowrap ${
                    isActive
                        ? 'bg-sakura-600 text-white border-sakura-400 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                }`;
                chip.innerHTML = `${isActive ? '<i class="fa-solid fa-check text-[9px]"></i> ' : ''}${group.name}`;
                chip.onclick = () => toggleMemoryGroup(group.id);
                container.appendChild(chip);
            });
        }

        function toggleMemoryGroup(groupId) {
            const idx = state.memorySelectedGroups.indexOf(groupId);
            if (idx > -1) {
                if (state.memorySelectedGroups.length > 1) {
                    state.memorySelectedGroups.splice(idx, 1);
                } else {
                    showToast("Debe haber al menos un grupo activo en Memoria", "info");
                    return;
                }
            } else {
                state.memorySelectedGroups.push(groupId);
            }
            saveStateToStorage();
            initMemoryGame();
        }

        function selectAllMemoryGroups(selectAll = true) {
            if (selectAll) {
                state.memorySelectedGroups = SOUND_GROUPS.map(g => g.id);
            } else {
                state.memorySelectedGroups = ['a'];
            }
            saveStateToStorage();
            initMemoryGame();
            showToast(selectAll ? "Todos los grupos activados" : "Selección reiniciada a Fila A", "info");
        }

        function setMemoryPreset(presetKey) {
            if (presetKey === 'a') {
                state.memorySelectedGroups = ['a'];
            } else if (presetKey === 'ka') {
                state.memorySelectedGroups = ['ka'];
            } else if (presetKey === 'a_ka') {
                state.memorySelectedGroups = ['a', 'ka'];
            } else if (presetKey === 'allBasic') {
                state.memorySelectedGroups = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'];
            } else if (presetKey === 'dakuten') {
                state.memorySelectedGroups = ['ga', 'za', 'da', 'ba', 'pa'];
            } else if (presetKey === 'youon') {
                state.memorySelectedGroups = ['kya', 'sha', 'cha', 'nya', 'hya', 'mya', 'rya', 'gya', 'ja', 'dya', 'bya', 'pya'];
            } else if (presetKey === 'all') {
                state.memorySelectedGroups = SOUND_GROUPS.map(g => g.id);
            }
            saveStateToStorage();
            initMemoryGame();
            showToast("Grupos de Memoria actualizados", "info");
        }

        function changeMemoryPairCount(val) {
            state.memoryPairCount = val;
            saveStateToStorage();
            initMemoryGame();
        }
