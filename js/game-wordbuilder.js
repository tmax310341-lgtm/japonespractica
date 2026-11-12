// KotoDojo · Armar Palabras
        // ==========================================================
        // ARMAR PALABRAS (WORD BUILDER) - CON GRAN BIBLIOTECA (260+ PALABRAS)
        // ==========================================================
        function initWordBuilderGame() {
            if (!state.wordBuilderMode) state.wordBuilderMode = 'hira_to_roma';
            setWordBuilderMode(state.wordBuilderMode);
        }

        function setWordBuilderMode(mode) {
            state.wordBuilderMode = mode;
            const hiraBtn = document.getElementById('wbModeHiraToRomaBtn');
            const romaBtn = document.getElementById('wbModeRomaToHiraBtn');
            const kbArea = document.getElementById('wbKeyboardArea');
            const tilesArea = document.getElementById('wbTilesArea');

            if (mode === 'hira_to_roma') {
                if (hiraBtn) hiraBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-sakura-600 text-white shadow-sm flex items-center gap-1.5';
                if (romaBtn) romaBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition text-slate-400 hover:text-slate-200 flex items-center gap-1.5';
                if (kbArea) kbArea.classList.remove('hidden');
                if (tilesArea) tilesArea.classList.add('hidden');
            } else {
                if (romaBtn) romaBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-sakura-600 text-white shadow-sm flex items-center gap-1.5';
                if (hiraBtn) hiraBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition text-slate-400 hover:text-slate-200 flex items-center gap-1.5';
                if (kbArea) kbArea.classList.add('hidden');
                if (tilesArea) tilesArea.classList.remove('hidden');
            }
            nextWordBuilderChallenge();
        }

        function onWordBuilderInputChanged() {
            const input = document.getElementById('wbRomajiInput');
            const countEl = document.getElementById('wbInputCharCount');
            if (input && countEl) {
                const len = input.value.trim().length;
                countEl.textContent = `${len} ${len === 1 ? 'letra escrita' : 'letras escritas'}`;
            }
        }

        function clearWordBuilderInput() {
            const isHiraToRoma = state.wordBuilderMode === 'hira_to_roma';
            if (isHiraToRoma) {
                const input = document.getElementById('wbRomajiInput');
                if (input) {
                    input.value = '';
                    input.focus();
                    onWordBuilderInputChanged();
                }
            } else {
                state.selectedTiles = [];
                renderWordBuilderSlots();
            }
        }

        function nextWordBuilderChallenge() {
            const pool = WORDS_DATA;
            let chosen = pool[Math.floor(Math.random() * pool.length)];
            if (pool.length > 1 && state.currentWordObj && chosen.hiragana === state.currentWordObj.hiragana) {
                const candidates = pool.filter(w => w.hiragana !== state.currentWordObj.hiragana);
                chosen = candidates[Math.floor(Math.random() * candidates.length)] || chosen;
            }
            state.currentWordObj = chosen;
            state.selectedTiles = [];

            const isHiraToRoma = state.wordBuilderMode === 'hira_to_roma';

            const badge = document.getElementById('wbTargetHeaderBadge');
            const primary = document.getElementById('targetWordPrimary');
            const secondary = document.getElementById('targetWordSecondary');
            const kbArea = document.getElementById('wbKeyboardArea');
            const tilesArea = document.getElementById('wbTilesArea');

            if (isHiraToRoma) {
                if (badge) badge.textContent = 'Palabra en Hiragana (Escribe en Romaji con tu Teclado)';
                if (primary) {
                    primary.textContent = chosen.hiragana;
                    primary.className = 'text-5xl sm:text-6xl font-black text-white font-jp tracking-wider';
                }
                if (secondary) {
                    secondary.textContent = `Significado: ${chosen.spanish}`;
                }
                if (kbArea) kbArea.classList.remove('hidden');
                if (tilesArea) tilesArea.classList.add('hidden');

                const input = document.getElementById('wbRomajiInput');
                if (input) {
                    input.value = '';
                    input.classList.remove('border-matcha-500', 'border-rose-500');
                    setTimeout(() => input.focus(), 80);
                    onWordBuilderInputChanged();
                }
                const lengthHint = document.getElementById('wbLengthHint');
                if (lengthHint) {
                    lengthHint.textContent = `Longitud: ${chosen.romaji.length} letras (${chosen.hiraTiles.length} sílabas)`;
                }
            } else {
                if (badge) badge.textContent = 'Palabra en Español / Romaji (Arma con Fichas en Hiragana)';
                if (primary) {
                    primary.textContent = chosen.spanish;
                    primary.className = 'text-4xl sm:text-5xl font-black text-white tracking-wide';
                }
                if (secondary) {
                    secondary.textContent = `Lectura objetivo: ${chosen.romaji}`;
                }
                if (kbArea) kbArea.classList.add('hidden');
                if (tilesArea) tilesArea.classList.remove('hidden');

                renderWordBuilderSlots();
                renderWordBuilderOptions();
            }

            speakJapanese(chosen.hiragana);
        }

        function playWordBuilderAudio() {
            if (state.currentWordObj) {
                speakJapanese(state.currentWordObj.hiragana);
            }
        }

        function renderWordBuilderSlots() {
            const container = document.getElementById('wordBuilderSlots');
            if (!container || !state.currentWordObj) return;
            container.innerHTML = '';

            const targetTiles = state.currentWordObj.hiraTiles;

            targetTiles.forEach((_, idx) => {
                const slot = document.createElement('button');
                const selected = state.selectedTiles[idx];

                slot.className = `w-14 h-14 rounded-xl flex items-center justify-center font-bold font-jp text-2xl transition-all active:scale-95 ${
                    selected
                        ? 'bg-sakura-600 text-white shadow-lg border-2 border-sakura-400 cursor-pointer hover:bg-sakura-700'
                        : 'bg-slate-800/80 border-2 border-dashed border-slate-700 text-slate-500 cursor-default'
                }`;

                if (selected) {
                    slot.innerHTML = `<span>${selected}</span><span class="text-[10px] ml-1.5 text-rose-200">✕</span>`;
                    slot.title = 'Haz clic para quitar este carácter';
                    slot.onclick = () => removeWordBuilderTile(idx);
                } else {
                    slot.textContent = '·';
                }
                container.appendChild(slot);
            });
        }

        function removeWordBuilderTile(index) {
            state.selectedTiles.splice(index, 1);
            renderWordBuilderSlots();
        }

        function renderWordBuilderOptions() {
            const container = document.getElementById('wordBuilderOptions');
            if (!container || !state.currentWordObj) return;
            container.innerHTML = '';

            const correctTiles = [...state.currentWordObj.hiraTiles];

            const lookalikeMap = {
                'さ': 'き', 'き': 'さ', 'ぬ': 'め', 'め': 'ぬ', 'わ': 'れ', 'れ': 'ね',
                'ね': 'わ', 'は': 'ほ', 'ほ': 'は', 'あ': 'お', 'お': 'あ', 'る': 'ろ',
                'ろ': 'る', 'ち': 'ら', 'ら': 'ち', 'い': 'り', 'り': 'い', 'ま': 'も', 'も': 'ま'
            };
            const distractors = [];
            correctTiles.forEach(t => {
                if (lookalikeMap[t] && !correctTiles.includes(lookalikeMap[t])) {
                    distractors.push(lookalikeMap[t]);
                }
            });
            const fallback = ['か', 'し', 'の', 'た', 'り', 'つ', 'く', 'ま', 'ね', 'ほ', 'す', 'て', 'っ']
                .filter(t => !correctTiles.includes(t) && !distractors.includes(t));
            const finalDistractors = [...new Set([...distractors, ...fallback])].slice(0, Math.max(3, 7 - correctTiles.length));

            const pool = shuffleArray([...correctTiles, ...finalDistractors]);

            pool.forEach(tile => {
                const btn = document.createElement('button');
                btn.className = 'w-14 h-14 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-600 rounded-xl font-bold font-jp text-2xl text-amber-300 transition flex items-center justify-center shadow-md';
                btn.onclick = () => {
                    const targetLength = state.currentWordObj.hiraTiles.length;
                    if (state.selectedTiles.length < targetLength) {
                        state.selectedTiles.push(tile);
                        speakJapanese(tile);
                        renderWordBuilderSlots();

                        if (state.selectedTiles.length === targetLength) {
                            checkWordBuilderAnswer();
                        }
                    }
                };
                btn.textContent = tile;
                container.appendChild(btn);
            });
        }

        function clearWordBuilderSlots() {
            state.selectedTiles = [];
            renderWordBuilderSlots();
        }

        function checkWordBuilderAnswer() {
            if (!state.currentWordObj) return;
            const isHiraToRoma = state.wordBuilderMode === 'hira_to_roma';

            if (isHiraToRoma) {
                const input = document.getElementById('wbRomajiInput');
                if (!input) return;
                const userVal = input.value.trim().toLowerCase().replace(/\s+/g, '');
                if (!userVal) {
                    showToast('Escribe la lectura en Romaji con tu teclado', 'info');
                    input.focus();
                    return;
                }

                const targetRomaji = state.currentWordObj.romaji.toLowerCase();
                // Check exact match and standard phonetic variants
                const isMatch = [
                    targetRomaji,
                    targetRomaji.replace(/ou/g, 'o'),
                    targetRomaji.replace(/oo/g, 'o'),
                    state.currentWordObj.romaTiles.join('')
                ].some(variant => romajiMatches(userVal, variant));

                if (isMatch) {
                    addXP(25);
                    if (state.currentWordObj.hiraTiles && Array.isArray(state.currentWordObj.hiraTiles)) {
                        state.currentWordObj.hiraTiles.forEach(tile => recordKanaResult(tile, true));
                    }
                    showToast(`¡Correcto! ${state.currentWordObj.hiragana} = ${targetRomaji.toUpperCase()} (${state.currentWordObj.spanish}) (+25 XP)`, 'success');
                    input.classList.remove('border-slate-700', 'border-rose-500');
                    input.classList.add('border-matcha-500', 'bg-matcha-950/40');
                    playSoundTone(587.33, 'sine', 0.18);
                    setTimeout(() => playSoundTone(880, 'sine', 0.22), 120);
                    speakJapanese(state.currentWordObj.hiragana);
                    setTimeout(nextWordBuilderChallenge, 1500);
                } else {
                    if (state.currentWordObj.hiraTiles && Array.isArray(state.currentWordObj.hiraTiles)) {
                        state.currentWordObj.hiraTiles.forEach(tile => recordKanaResult(tile, false));
                    }
                    showToast(`"${userVal.toUpperCase()}" no es correcto. ¡Inténtalo de nuevo!`, 'error');
                    input.classList.remove('border-slate-700', 'border-matcha-500');
                    input.classList.add('border-rose-500');
                    playSoundTone(220, 'sawtooth', 0.25);
                    setTimeout(() => {
                        input.classList.remove('border-rose-500');
                        input.classList.add('border-slate-700');
                    }, 1000);
                    input.focus();
                }
            } else {
                const targetTiles = state.currentWordObj.hiraTiles;
                if (state.selectedTiles.length < targetTiles.length) {
                    showToast('Completa todos los espacios antes de verificar', 'info');
                    return;
                }

                const constructed = state.selectedTiles.join('');
                const target = targetTiles.join('');

                if (constructed === target) {
                    addXP(25);
                    if (state.currentWordObj.hiraTiles && Array.isArray(state.currentWordObj.hiraTiles)) {
                        state.currentWordObj.hiraTiles.forEach(tile => recordKanaResult(tile, true));
                    }
                    showToast(`¡Correcto! ${state.currentWordObj.hiragana} = ${state.currentWordObj.romaji.toUpperCase()} (+25 XP)`, 'success');
                    playSoundTone(587.33, 'sine', 0.18);
                    setTimeout(() => playSoundTone(880, 'sine', 0.22), 120);
                    speakJapanese(state.currentWordObj.hiragana);
                    setTimeout(nextWordBuilderChallenge, 1500);
                } else {
                    if (state.currentWordObj.hiraTiles && Array.isArray(state.currentWordObj.hiraTiles)) {
                        state.currentWordObj.hiraTiles.forEach(tile => recordKanaResult(tile, false));
                    }
                    showToast('Respuesta incorrecta. ¡Inténtalo de nuevo!', 'error');
                    playSoundTone(220, 'sawtooth', 0.25);
                }
            }
        }
