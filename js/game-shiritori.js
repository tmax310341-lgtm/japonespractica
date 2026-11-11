// KotoDojo · Shiritori
        // ==========================================================
        // SHIRITORI (PALABRAS ENCADENADAS) - CON GRAN BIBLIOTECA (260+ PALABRAS)
        // ==========================================================
        function initShiritoriGame() {
            // Start with a safe starter word from EXPANDED_VOCABULARY (e.g. すし)
            const starter = SHIRITORI_WORDS.find(w => w.word === 'すし') || SHIRITORI_WORDS[0];
            state.shiritoriChain = [starter];
            state.shiritoriCurrentWord = starter;
            renderShiritoriState();
        }

        function renderShiritoriState() {
            const cur = state.shiritoriCurrentWord;
            const chainCountEl = document.getElementById('shiritoriChainCount');
            if (chainCountEl) chainCountEl.textContent = state.shiritoriChain.length;

            const curWordEl = document.getElementById('shiritoriCurrentWord');
            if (curWordEl) curWordEl.textContent = cur.word;

            const curRomajiEl = document.getElementById('shiritoriCurrentRomaji');
            if (curRomajiEl) {
                curRomajiEl.innerHTML = `${cur.romaji} (${cur.spanish}) • Conectar con: <span class="font-bold text-sakura-400 font-jp text-2xl">${cur.last}</span>`;
            }

            // Render chain badges
            const chainFlow = document.getElementById('shiritoriChainFlow');
            if (chainFlow) {
                chainFlow.innerHTML = '';
                state.shiritoriChain.forEach((item, idx) => {
                    const chip = document.createElement('div');
                    chip.className = 'flex items-center gap-1 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold font-jp shadow-sm';
                    chip.innerHTML = `<span class="text-white">${item.word}</span> <span class="text-[10px] text-amber-400 font-sans">(${item.romaji})</span>`;
                    chainFlow.appendChild(chip);

                    if (idx < state.shiritoriChain.length - 1) {
                        const arrow = document.createElement('i');
                        arrow.className = 'fa-solid fa-arrow-right text-[10px] text-slate-500';
                        chainFlow.appendChild(arrow);
                    }
                });
                // Auto-scroll to end
                chainFlow.scrollLeft = chainFlow.scrollWidth;
            }

            // Generate 4 candidate words from 260+ library
            const usedSet = new Set(state.shiritoriChain.map(c => c.word));
            const matchingValid = SHIRITORI_WORDS.filter(w => w.first === cur.last && !usedSet.has(w.word) && !w.endsInN);
            const matchingTrapN = SHIRITORI_WORDS.filter(w => w.first === cur.last && !usedSet.has(w.word) && w.endsInN);
            const distractors = SHIRITORI_WORDS.filter(w => w.first !== cur.last && !usedSet.has(w.word));

            const options = [];
            // Pick up to 2 valid continuations
            const shuffledValid = shuffleArray([...matchingValid]);
            if (shuffledValid.length > 0) options.push(shuffledValid[0]);
            if (shuffledValid.length > 1) options.push(shuffledValid[1]);

            // Sometimes add an exciting trap ending in 'ん'
            const shuffledTrap = shuffleArray([...matchingTrapN]);
            if (shuffledTrap.length > 0 && Math.random() > 0.35) {
                options.push(shuffledTrap[0]);
            }

            // Fill up to 4 with distractors
            const shuffledDist = shuffleArray([...distractors]);
            for (const d of shuffledDist) {
                if (options.length >= 4) break;
                if (!options.some(o => o.word === d.word)) options.push(d);
            }

            // If still no valid options (rare branch with no available words in dictionary)
            if (matchingValid.length === 0 && matchingTrapN.length === 0) {
                // Pick a new bridge word
                const fallback = SHIRITORI_WORDS.filter(w => !usedSet.has(w.word)).slice(0, 4);
                fallback.forEach(f => {
                    if (options.length < 4 && !options.some(o => o.word === f.word)) options.push(f);
                });
            }

            shuffleArray(options);

            const grid = document.getElementById('shiritoriOptionsGrid');
            if (grid) {
                grid.innerHTML = '';
                options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'p-4 bg-slate-900 hover:bg-slate-700 active:scale-95 border border-slate-700 hover:border-emerald-500 rounded-2xl text-left transition-all flex items-center justify-between shadow-md';
                    btn.onclick = () => chooseShiritoriWord(opt);
                    btn.innerHTML = `
                        <div>
                            <div class="font-jp text-2xl font-bold text-white">${opt.word}</div>
                            <div class="text-xs text-slate-400 font-semibold">${opt.romaji} (${opt.spanish})</div>
                        </div>
                        <div class="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-400 font-mono font-bold">
                            Inicia: ${opt.first}
                        </div>
                    `;
                    grid.appendChild(btn);
                });
            }

            speakJapanese(cur.word);
        }

        function chooseShiritoriWord(selectedWord) {
            const cur = state.shiritoriCurrentWord;

            // 1. Check if word starts with correct kana
            if (selectedWord.first !== cur.last) {
                playSoundTone(220, 'sawtooth', 0.25);
                showToast(`¡Incorrecto! "${selectedWord.word}" empieza con "${selectedWord.first}", pero debes continuar con "${cur.last}".`, "error");
                return;
            }

            // 2. Check if word ends with 'ん' (N) - Immediate loss rule!
            if (selectedWord.endsInN || selectedWord.last === 'ん') {
                playSoundTone(150, 'sawtooth', 0.5);
                showToast(`💀 ¡Fin del Juego! "${selectedWord.word}" termina en "ん" (N). Ninguna palabra japonesa empieza con "ん". Cadena final: ${state.shiritoriChain.length} palabras.`, "error");
                setTimeout(initShiritoriGame, 2500);
                return;
            }

            // 3. Valid continuation
            state.shiritoriChain.push(selectedWord);
            state.shiritoriCurrentWord = selectedWord;
            addXP(25);
            playSoundTone(587.33, 'sine', 0.15);
            setTimeout(() => playSoundTone(880, 'sine', 0.2), 100);
            showToast(`¡Excelente! Cadena: ${state.shiritoriChain.length} (+25 XP)`, "success");

            renderShiritoriState();
        }
