// KotoDojo · Duelo de Gemelos
        // ==========================================================
        // DUELO DE GEMELOS (LOOK-ALIKES) [NUEVO]
        // ==========================================================
        function initLookalikesGame() {
            stopLookalikesGame();
            state.lookalikesScore = 0;
            state.lookalikesCombo = 0;
            document.getElementById('lookalikesScore').textContent = '0';
            document.getElementById('lookalikesCombo').textContent = '0';
            nextLookalikesChallenge();
        }

        function stopLookalikesGame() {
            if (state.lookalikesTimerId) {
                clearInterval(state.lookalikesTimerId);
                state.lookalikesTimerId = null;
            }
            if (state.lookalikesNextTimeout) {
                clearTimeout(state.lookalikesNextTimeout);
                state.lookalikesNextTimeout = null;
            }
            state.lookalikesIsPaused = false;
            updateLookalikesPauseUI(false);
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        }

        function pauseLookalikesGame() {
            if (state.lookalikesIsPaused) return;
            if (state.lookalikesTimerId) {
                clearInterval(state.lookalikesTimerId);
                state.lookalikesTimerId = null;
            }
            if (state.lookalikesNextTimeout) {
                clearTimeout(state.lookalikesNextTimeout);
                state.lookalikesNextTimeout = null;
            }
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            state.lookalikesIsPaused = true;
            updateLookalikesPauseUI(true);
            showToast("⏸️ Duelo de Gemelos en pausa", "info");
        }

        function resumeLookalikesGame() {
            if (!state.lookalikesIsPaused) return;
            state.lookalikesIsPaused = false;
            updateLookalikesPauseUI(false);
            showToast("▶️ Reanudando Duelo de Gemelos", "info");

            if (state.lookalikesTimeLeft <= 100) {
                nextLookalikesChallenge();
                return;
            }

            const timerBar = document.getElementById('lookalikesTimerBar');
            const step = 50;
            state.lookalikesTimerId = setInterval(() => {
                if (state.lookalikesIsPaused) return;
                state.lookalikesTimeLeft -= step;
                const pct = Math.max(0, (state.lookalikesTimeLeft / 2000) * 100);
                if (timerBar) timerBar.style.width = `${pct}%`;

                if (state.lookalikesTimeLeft <= 0) {
                    clearInterval(state.lookalikesTimerId);
                    state.lookalikesTimerId = null;
                    onLookalikesTimeout();
                }
            }, step);
        }

        function toggleLookalikesPause() {
            if (state.lookalikesIsPaused) {
                resumeLookalikesGame();
            } else {
                pauseLookalikesGame();
            }
        }

        function updateLookalikesPauseUI(isPaused) {
            const pauseBtn = document.getElementById('lookalikesPauseBtn');
            const pauseBanner = document.getElementById('lookalikesPauseBanner');
            const grid = document.getElementById('lookalikesOptionsGrid');

            if (pauseBtn) {
                pauseBtn.innerHTML = isPaused
                    ? '<i class="fa-solid fa-play text-emerald-400"></i> Reanudar'
                    : '<i class="fa-solid fa-pause text-amber-400"></i> Pausar';
                pauseBtn.className = isPaused
                    ? 'px-3.5 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-1.5 transition active:scale-95'
                    : 'px-3.5 py-1.5 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-1.5 transition active:scale-95';
            }
            if (pauseBanner) {
                pauseBanner.classList.toggle('hidden', !isPaused);
            }
            if (grid) {
                grid.style.pointerEvents = isPaused ? 'none' : 'auto';
                grid.style.opacity = isPaused ? '0.4' : '1';
            }
        }

        function nextLookalikesChallenge() {
            if (state.lookalikesTimerId) {
                clearInterval(state.lookalikesTimerId);
                state.lookalikesTimerId = null;
            }
            if (state.lookalikesNextTimeout) {
                clearTimeout(state.lookalikesNextTimeout);
                state.lookalikesNextTimeout = null;
            }
            state.lookalikesIsPaused = false;
            updateLookalikesPauseUI(false);

            const challenge = LOOKALIKES_DATA[Math.floor(Math.random() * LOOKALIKES_DATA.length)];
            state.lookalikesCurrent = challenge;

            document.getElementById('lookalikesTargetRomaji').textContent = challenge.romaji.toUpperCase();
            document.getElementById('lookalikesHint').textContent = challenge.explanation;

            const grid = document.getElementById('lookalikesOptionsGrid');
            grid.innerHTML = '';

            const shuffledOptions = shuffleArray([...challenge.options]);
            shuffledOptions.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'p-6 sm:p-8 bg-slate-900 hover:bg-slate-700 active:scale-95 border-2 border-slate-700 hover:border-sakura-500 rounded-3xl font-jp text-5xl sm:text-6xl font-bold text-white shadow-xl transition-all flex items-center justify-center animate-card-pop';
                btn.textContent = opt;
                btn.onclick = () => checkLookalikesAnswer(opt, btn);
                grid.appendChild(btn);
            });

            speakJapanese(challenge.target);

            // Timer Bar Animation (2.0 seconds)
            const timerBar = document.getElementById('lookalikesTimerBar');
            state.lookalikesTimeLeft = 2000;
            const step = 50;
            if (timerBar) timerBar.style.width = '100%';

            state.lookalikesTimerId = setInterval(() => {
                if (state.lookalikesIsPaused) return;
                state.lookalikesTimeLeft -= step;
                const pct = Math.max(0, (state.lookalikesTimeLeft / 2000) * 100);
                if (timerBar) timerBar.style.width = `${pct}%`;

                if (state.lookalikesTimeLeft <= 0) {
                    clearInterval(state.lookalikesTimerId);
                    state.lookalikesTimerId = null;
                    onLookalikesTimeout();
                }
            }, step);
        }

        function playLookalikesSound() {
            if (state.lookalikesCurrent) {
                speakJapanese(state.lookalikesCurrent.target);
            }
        }

        function checkLookalikesAnswer(selectedOpt, btnEl) {
            if (state.lookalikesTimerId) {
                clearInterval(state.lookalikesTimerId);
                state.lookalikesTimerId = null;
            }
            if (state.lookalikesNextTimeout) {
                clearTimeout(state.lookalikesNextTimeout);
                state.lookalikesNextTimeout = null;
            }

            const isCorrect = selectedOpt === state.lookalikesCurrent.target;
            if (isCorrect) {
                state.lookalikesScore++;
                state.lookalikesCombo++;
                const bonus = Math.min(30, 10 + state.lookalikesCombo * 2);
                addXP(bonus);
                recordKanaResult(state.lookalikesCurrent.target, true);

                btnEl.classList.remove('border-slate-700', 'hover:border-sakura-500');
                btnEl.classList.add('bg-matcha-600/30', 'border-matcha-400', 'text-matcha-300');
                playSoundTone(659.25, 'sine', 0.15);
                showToast(`¡Correcto! Racha x${state.lookalikesCombo} (+${bonus} XP)`, "success");
            } else {
                state.lookalikesCombo = 0;
                recordKanaResult(state.lookalikesCurrent.target, false);

                btnEl.classList.remove('border-slate-700');
                btnEl.classList.add('bg-rose-600/30', 'border-rose-500', 'text-rose-300');
                playSoundTone(220, 'sawtooth', 0.25);
                showToast(`Incorrecto. "${state.lookalikesCurrent.romaji.toUpperCase()}" es "${state.lookalikesCurrent.target}"`, "error");
            }

            document.getElementById('lookalikesScore').textContent = state.lookalikesScore;
            document.getElementById('lookalikesCombo').textContent = state.lookalikesCombo;

            state.lookalikesNextTimeout = setTimeout(nextLookalikesChallenge, 700);
        }

        function onLookalikesTimeout() {
            state.lookalikesCombo = 0;
            document.getElementById('lookalikesCombo').textContent = '0';
            playSoundTone(220, 'sawtooth', 0.25);
            showToast(`¡Tiempo agotado! Era "${state.lookalikesCurrent.target}"`, "error");
            state.lookalikesNextTimeout = setTimeout(nextLookalikesChallenge, 900);
        }

        function restartLookalikesGame() {
            stopLookalikesGame();
            initLookalikesGame();
        }
