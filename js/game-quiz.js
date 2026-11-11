// KotoDojo · Quiz rápido
        // ==========================================================
        // QUIZ RÁPIDO
        // ==========================================================
        function initQuizQuestion() {
            let pool = HIRAGANA_DATA;
            if (state.quizCustomPool && state.quizCustomPool.length > 0) {
                pool = state.quizCustomPool;
            }

            const banner = document.getElementById('quizCustomPoolBanner');
            const text = document.getElementById('quizCustomPoolText');
            if (banner) {
                if (state.quizCustomPool && state.quizCustomPool.length > 0) {
                    banner.classList.remove('hidden');
                    if (text) text.textContent = state.quizCustomTitle || 'Modo Puntos Débiles Activo';
                } else {
                    banner.classList.add('hidden');
                }
            }

            const target = getSRSWeightedKana(pool);
            state.currentQuizQuestion = target;

            document.getElementById('quizSymbolDisplay').textContent = target.hiragana;

            const options = [target.romaji];
            while (options.length < 4) {
                const randomOption = HIRAGANA_DATA[Math.floor(Math.random() * HIRAGANA_DATA.length)].romaji;
                if (!options.includes(randomOption)) options.push(randomOption);
            }
            shuffleArray(options);

            const grid = document.getElementById('quizOptionsGrid');
            grid.innerHTML = '';
            options.forEach((opt, optIdx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'stage-opt-btn relative group py-4 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-xl text-lg font-bold text-amber-300 transition uppercase shadow-md active:scale-95 flex items-center justify-center';
                btn.onclick = () => answerQuiz(opt);
                btn.innerHTML = `
                    <span class="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-950/90 border border-slate-700/80 text-slate-400 font-mono text-[11px] font-bold absolute top-2 right-2 group-hover:border-slate-500 group-hover:text-amber-300 pointer-events-none transition">${optIdx + 1}</span>
                    <span>${opt}</span>
                `;
                grid.appendChild(btn);
            });
        }

        function clearQuizCustomPool() {
            state.quizCustomPool = null;
            state.quizCustomTitle = null;
            const banner = document.getElementById('quizCustomPoolBanner');
            if (banner) banner.classList.add('hidden');
            initQuizQuestion();
            showToast("Quiz restablecido a todos los kanas", "info");
        }

        function answerQuiz(selectedRomaji) {
            if (selectedRomaji === state.currentQuizQuestion.romaji) {
                state.quizScore++;
                document.getElementById('quizScoreText').textContent = `Puntaje: ${state.quizScore}`;
                addXP(10);
                recordKanaResult(state.currentQuizQuestion.hiragana, true);
                showToast("¡Correcto! +10 XP", "success");
                playSoundTone(523.25, 'sine', 0.2);
                setTimeout(initQuizQuestion, 700);
            } else {
                recordKanaResult(state.currentQuizQuestion.hiragana, false);
                showToast(`Incorrecto. "${state.currentQuizQuestion.hiragana}" es "${state.currentQuizQuestion.romaji}"`, "error");
                playSoundTone(220, 'sawtooth', 0.2);
            }
        }
