// KotoDojo · Sopa de Letras
        // ==========================================================
        // SOPA DE LETRAS (WORD SEARCH) - CON GRAN BIBLIOTECA (260+ PALABRAS)
        // ==========================================================
        function changeWordSearchTheme(themeKey) {
            state.wsTheme = themeKey;
            document.querySelectorAll('.ws-theme-btn').forEach(btn => {
                btn.className = 'ws-theme-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition';
            });
            const activeBtn = document.getElementById(`ws-theme-${themeKey}`);
            if (activeBtn) {
                activeBtn.className = 'ws-theme-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sakura-600 text-white transition shadow-sm';
            }
            initWordSearchGame();
        }

        function changeWordSearchGridSize(newSize) {
            state.wsGridSize = parseInt(newSize, 10) || 10;
            initWordSearchGame();
        }

        function initWordSearchGame() {
            const size = state.wsGridSize;
            const theme = WORD_SEARCH_THEMES[state.wsTheme] || WORD_SEARCH_THEMES.nature;

            const badge = document.getElementById('wsThemeBadge');
            if (badge) badge.textContent = theme.name;

            const victory = document.getElementById('wsVictoryBanner');
            if (victory) victory.classList.add('hidden');

            const sel = document.getElementById('wsCurrentSelection');
            if (sel) sel.textContent = '-';

            clearClickStart();
            state.wsIsSelecting = false;
            state.wsStartCell = null;
            state.wsSelectedCells = [];

            const targetCount = size === 8 ? 5 : (size === 10 ? 6 : 8);
            const eligibleWords = theme.words.filter(w => Array.from(w.word).length <= size);
            const shuffled = shuffleArray([...eligibleWords]);

            const directions = [
                { dr: 0, dc: 1 },
                { dr: 1, dc: 0 },
                { dr: 1, dc: 1 },
                { dr: -1, dc: 1 }
            ];
            if (size >= 10) {
                directions.push({ dr: 0, dc: -1 });
                directions.push({ dr: -1, dc: 0 });
            }

            let grid = Array(size).fill(null).map(() => Array(size).fill(''));
            let placedWords = [];

            for (const wordObj of shuffled) {
                if (placedWords.length >= targetCount) break;
                const chars = Array.from(wordObj.word);
                const wordLen = chars.length;
                let placed = false;

                const shuffledDirs = shuffleArray([...directions]);
                const posList = [];
                for (let r = 0; r < size; r++) {
                    for (let c = 0; c < size; c++) {
                        posList.push({ r, c });
                    }
                }
                shuffleArray(posList);

                for (const pos of posList) {
                    if (placed) break;
                    for (const dir of shuffledDirs) {
                        const endR = pos.r + dir.dr * (wordLen - 1);
                        const endC = pos.c + dir.dc * (wordLen - 1);

                        if (endR >= 0 && endR < size && endC >= 0 && endC < size) {
                            let fits = true;
                            for (let i = 0; i < wordLen; i++) {
                                const checkR = pos.r + dir.dr * i;
                                const checkC = pos.c + dir.dc * i;
                                const currChar = grid[checkR][checkC];
                                if (currChar !== '' && currChar !== chars[i]) {
                                    fits = false;
                                    break;
                                }
                            }

                            if (fits) {
                                const pathPositions = [];
                                for (let i = 0; i < wordLen; i++) {
                                    const fillR = pos.r + dir.dr * i;
                                    const fillC = pos.c + dir.dc * i;
                                    grid[fillR][fillC] = chars[i];
                                    pathPositions.push({ r: fillR, c: fillC });
                                }
                                placedWords.push({
                                    ...wordObj,
                                    path: pathPositions,
                                    found: false,
                                    colorIdx: placedWords.length % 8
                                });
                                placed = true;
                                break;
                            }
                        }
                    }
                }
            }

            const fillerKanas = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ん'];
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    if (grid[r][c] === '') {
                        grid[r][c] = fillerKanas[Math.floor(Math.random() * fillerKanas.length)];
                    }
                }
            }

            state.wsGrid = grid;
            state.wsWords = placedWords;
            state.wsFoundWordsCount = 0;

            renderWordSearchGrid();
            renderWordSearchWordsList();
            updateWordSearchProgress();
        }

        function renderWordSearchGrid() {
            const gridEl = document.getElementById('wsGrid');
            if (!gridEl) return;
            const size = state.wsGridSize;
            gridEl.innerHTML = '';
            gridEl.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;

            const cellSizeClass = size === 8 ? 'w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl' :
                                  (size === 10 ? 'w-8 h-8 sm:w-10 sm:h-10 text-lg sm:text-xl' :
                                  'w-7 h-7 sm:w-8 sm:h-8 text-base sm:text-lg');

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const char = state.wsGrid[r][c];
                    const cell = document.createElement('div');
                    cell.id = `ws-cell-${r}-${c}`;
                    cell.className = `ws-cell ${cellSizeClass} flex items-center justify-center font-jp font-bold rounded-lg sm:rounded-xl border border-slate-800 bg-slate-900/90 text-slate-200 transition-all duration-150 cursor-pointer shadow-sm`;
                    cell.textContent = char;
                    cell.dataset.r = r;
                    cell.dataset.c = c;

                    cell.onpointerdown = (e) => handleWordSearchCellDown(e, r, c);
                    cell.onpointerenter = (e) => handleWordSearchCellEnter(e, r, c);

                    gridEl.appendChild(cell);
                }
            }

            gridEl.onpointerup = handleWordSearchGlobalUp;
            gridEl.onpointercancel = handleWordSearchGlobalUp;
            document.body.onpointerup = handleWordSearchGlobalUp;
        }

        function renderWordSearchWordsList() {
            const container = document.getElementById('wsWordsList');
            if (!container) return;
            container.innerHTML = '';

            state.wsWords.forEach(w => {
                const item = document.createElement('div');
                const isFound = w.found;
                item.className = `px-3 py-2 rounded-xl flex items-center justify-between text-xs font-semibold transition border ${
                    isFound
                        ? 'bg-matcha-600/20 border-matcha-500/50 text-matcha-300'
                        : 'bg-slate-900/80 border-slate-700/70 text-slate-300'
                }`;

                const romajiBadge = isFound
                    ? `<span class="line-through text-slate-400 font-bold">${w.romaji.toUpperCase()}</span>`
                    : `<span class="font-bold text-amber-300 font-mono tracking-wider">${w.romaji.toUpperCase()}</span>`;

                const symbolPart = isFound
                    ? `<span class="font-jp text-sm font-bold text-matcha-300 mr-2">${w.word}</span>`
                    : '';

                item.innerHTML = `
                    <div class="flex items-center gap-2">
                        ${isFound ? '<i class="fa-solid fa-check text-matcha-400"></i>' : '<i class="fa-regular fa-circle text-slate-500 text-[10px]"></i>'}
                        <div>
                            ${romajiBadge}
                            <span class="text-[11px] text-slate-400 ml-1.5">(${w.spanish})</span>
                        </div>
                    </div>
                    <div>${symbolPart}</div>
                `;

                container.appendChild(item);
            });
        }

        function updateWordSearchProgress() {
            const foundCount = state.wsWords.filter(w => w.found).length;
            const badge = document.getElementById('wsProgressBadge');
            if (badge) badge.textContent = `${foundCount} / ${state.wsWords.length}`;
        }

        let isClickStartActive = false;

        function clearClickStart() {
            if (state.wsStartCell) {
                const startEl = document.getElementById(`ws-cell-${state.wsStartCell.r}-${state.wsStartCell.c}`);
                if (startEl) startEl.classList.remove('ws-click-start');
            }
            isClickStartActive = false;
        }

        function handleWordSearchCellDown(e, r, c) {
            e.preventDefault();
            if (isClickStartActive) {
                if (state.wsStartCell.r === r && state.wsStartCell.c === c) {
                    clearClickStart();
                    state.wsSelectedCells = [];
                    applySelectionStyles();
                    return;
                }
                const cells = computeLineCells(state.wsStartCell, { r, c });
                if (cells && cells.length > 0) {
                    state.wsSelectedCells = cells;
                    applySelectionStyles();
                    validateWordSearchSelection();
                    return;
                } else {
                    clearClickStart();
                }
            }

            state.wsIsSelecting = true;
            state.wsStartCell = { r, c };
            state.wsSelectedCells = [{ r, c }];
            applySelectionStyles();

            const startEl = document.getElementById(`ws-cell-${r}-${c}`);
            if (startEl) startEl.classList.add('ws-click-start');
            isClickStartActive = true;
        }

        function handleWordSearchCellEnter(e, r, c) {
            if (!state.wsIsSelecting || !state.wsStartCell) return;
            const cells = computeLineCells(state.wsStartCell, { r, c });
            if (cells && cells.length > 0) {
                state.wsSelectedCells = cells;
                applySelectionStyles();
            }
        }

        function handleWordSearchGlobalUp() {
            if (!state.wsIsSelecting) return;
            state.wsIsSelecting = false;
            if (state.wsSelectedCells.length > 1) {
                validateWordSearchSelection();
            }
        }

        function computeLineCells(start, end) {
            const dr = end.r - start.r;
            const dc = end.c - start.c;
            const absDr = Math.abs(dr);
            const absDc = Math.abs(dc);

            if (absDr !== 0 && absDc !== 0 && absDr !== absDc) return null;

            const stepR = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
            const stepC = dc === 0 ? 0 : (dc > 0 ? 1 : -1);
            const steps = Math.max(absDr, absDc);

            const result = [];
            for (let i = 0; i <= steps; i++) {
                result.push({
                    r: start.r + stepR * i,
                    c: start.c + stepC * i
                });
            }
            return result;
        }

        function applySelectionStyles() {
            document.querySelectorAll('.ws-cell.ws-selecting').forEach(el => {
                el.classList.remove('ws-selecting');
            });

            let str = '';
            state.wsSelectedCells.forEach(pos => {
                const el = document.getElementById(`ws-cell-${pos.r}-${pos.c}`);
                if (el) {
                    el.classList.add('ws-selecting');
                    str += el.textContent;
                }
            });

            const selDisplay = document.getElementById('wsCurrentSelection');
            if (selDisplay) selDisplay.textContent = str || '-';
        }

        function validateWordSearchSelection() {
            const selectedStr = state.wsSelectedCells.map(pos => state.wsGrid[pos.r][pos.c]).join('');
            const reversedStr = Array.from(selectedStr).reverse().join('');

            const matchedWord = state.wsWords.find(w => !w.found && (w.word === selectedStr || w.word === reversedStr));

            if (matchedWord) {
                matchedWord.found = true;
                state.wsSelectedCells.forEach(pos => {
                    const el = document.getElementById(`ws-cell-${pos.r}-${pos.c}`);
                    if (el) {
                        el.classList.remove('ws-selecting', 'ws-hint');
                        el.classList.add(`ws-found-${matchedWord.colorIdx}`);
                    }
                });

                clearClickStart();
                state.wsSelectedCells = [];
                applySelectionStyles();

                speakJapanese(matchedWord.word);
                playSoundTone(587.33, 'triangle', 0.15);
                setTimeout(() => playSoundTone(880, 'triangle', 0.25), 100);

                addXP(20);
                showToast(`¡Encontraste "${matchedWord.word}" (${matchedWord.romaji})! +20 XP`, "success");

                renderWordSearchWordsList();
                updateWordSearchProgress();

                const allFound = state.wsWords.every(w => w.found);
                if (allFound) {
                    setTimeout(() => {
                        const banner = document.getElementById('wsVictoryBanner');
                        if (banner) banner.classList.remove('hidden');
                        showToast("¡Tablero Completado! +100 XP Extra", "success");
                        addXP(100);
                        playSoundTone(523.25, 'sine', 0.2);
                        setTimeout(() => playSoundTone(659.25, 'sine', 0.2), 150);
                        setTimeout(() => playSoundTone(783.99, 'sine', 0.2), 300);
                        setTimeout(() => playSoundTone(1046.50, 'sine', 0.4), 450);
                        if (typeof confetti === 'function') {
                            try { confetti({ particleCount: 50, spread: 70, origin: { y: 0.2 } }); } catch(e) {}
                        }
                    }, 500);
                }
            } else {
                if (state.wsSelectedCells.length > 1) {
                    playSoundTone(220, 'sawtooth', 0.15);
                }
                setTimeout(() => {
                    clearClickStart();
                    state.wsSelectedCells = [];
                    applySelectionStyles();
                }, 200);
            }
        }

        function giveWordSearchHint() {
            const unfound = state.wsWords.find(w => !w.found);
            if (!unfound) {
                showToast("¡Ya has encontrado todas las palabras!", "info");
                return;
            }

            const firstPos = unfound.path[0];
            const cellEl = document.getElementById(`ws-cell-${firstPos.r}-${firstPos.c}`);
            if (cellEl) {
                document.querySelectorAll('.ws-hint').forEach(el => el.classList.remove('ws-hint'));
                cellEl.classList.add('ws-hint');
                setTimeout(() => {
                    cellEl.classList.remove('ws-hint');
                }, 4000);
            }

            showToast(`Pista: Comienza con "${unfound.word[0]}" (${unfound.romaji}: "${unfound.spanish}")`, "info");
            speakJapanese(unfound.word);
            playSoundTone(784, 'sine', 0.2);
        }
