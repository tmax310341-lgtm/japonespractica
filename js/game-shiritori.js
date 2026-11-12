// KotoDojo · Shiritori
        // ==========================================================
        // SHIRITORI (PALABRAS ENCADENADAS) - CON GRAN BIBLIOTECA (260+ PALABRAS)
        // ==========================================================
        // Sílabas con las que puede empezar la siguiente palabra (reglas habituales del shiritori):
        //   - un kana pequeño final cuenta como grande: でんしゃ → や
        //   - con dakuten/handakuten también vale la versión sin ellos: ちず → ず o す, きっぷ → ぷ o ふ
        const SHIRITORI_SMALL_KANA = { 'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お', 'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ', 'っ': 'つ' };

        function shiritoriAllowedStarts(lastChar) {
            const base = SHIRITORI_SMALL_KANA[lastChar] || lastChar;
            const plain = base.normalize('NFD').replace(/[\u3099\u309a]/g, '').normalize('NFC');
            return plain === base ? [base] : [base, plain];
        }

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
                const starts = shiritoriAllowedStarts(cur.last).join(' o ');
                curRomajiEl.innerHTML = `${cur.romaji} (${cur.spanish}) • Conectar con: <span class="font-bold text-sakura-400 font-jp text-2xl">${starts}</span>`;
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
            const allowed = shiritoriAllowedStarts(cur.last);
            const matchingValid = SHIRITORI_WORDS.filter(w => allowed.includes(w.first) && !usedSet.has(w.word) && !w.endsInN);
            const matchingTrapN = SHIRITORI_WORDS.filter(w => allowed.includes(w.first) && !usedSet.has(w.word) && w.endsInN);
            const distractors = SHIRITORI_WORDS.filter(w => !allowed.includes(w.first) && !usedSet.has(w.word));

            // Sin ninguna palabra posible, la cadena se da por completada (antes se ofrecían
            // palabras que no encajaban y no había forma de continuar)
            if (matchingValid.length === 0 && matchingTrapN.length === 0) {
                const grid = document.getElementById('shiritoriOptionsGrid');
                if (grid) {
                    grid.innerHTML = `<div class="col-span-full text-center p-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-bold">
                        🏆 No quedan palabras que empiecen por ${allowed.join(' o ')}. ¡Cadena completada con ${state.shiritoriChain.length} palabras!
                    </div>`;
                }
                addXP(50);
                showToast(`🏆 ¡Cadena completada con ${state.shiritoriChain.length} palabras! (+50 XP)`, "success");
                setTimeout(initShiritoriGame, 3000);
                return;
            }

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
            const allowed = shiritoriAllowedStarts(cur.last);
            if (!allowed.includes(selectedWord.first)) {
                playSoundTone(220, 'sawtooth', 0.25);
                showToast(`¡Incorrecto! "${selectedWord.word}" empieza con "${selectedWord.first}", pero debes continuar con "${allowed.join('" o "')}".`, "error");
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
