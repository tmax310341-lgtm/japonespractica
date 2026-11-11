// KotoDojo · Inicialización de la app y atajos de teclado
        // ==========================================================
        // INICIALIZACIÓN (BANNER DE NAVEGADOR INTERNO, initApp Y CICLO DE VIDA)
        // ==========================================================
        function checkInAppBrowserBanner() {
            const ua = navigator.userAgent || navigator.vendor || window.opera || '';
            const isInApp = /WhatsApp|FBAN|FBAV|Instagram|Line/i.test(ua);
            if (!isInApp) return;

            if (document.getElementById('inAppBrowserBanner')) return;

            const banner = document.createElement('div');
            banner.id = 'inAppBrowserBanner';
            banner.className = 'bg-amber-500/20 border-b border-amber-500/40 text-amber-200 px-4 py-2.5 text-xs flex items-center justify-between no-select relative z-50';
            banner.innerHTML = `
                <div class="flex items-center gap-2">
                    <span class="text-amber-400 font-bold">💡 Visor de WhatsApp:</span>
                    <span>Para activar pronunciación nativa y pantalla completa, toca compartir <strong>(...)</strong> y elige <strong>"Abrir en Chrome"</strong> o Safari.</span>
                </div>
                <button type="button" data-action="removeParentElement" data-args='["$this"]' class="text-amber-300 hover:text-white px-2 py-0.5 rounded font-bold ml-2">✕</button>
            `;
            const header = document.querySelector('header');
            if (header && header.parentElement) {
                header.parentElement.insertBefore(banner, header);
            }
        }

        function initApp() {
            if (window.__appLoaded) return;
            window.__appLoaded = true;

            try { checkInAppBrowserBanner(); } catch (err) {}
            try { loadStateFromStorage(); } catch (err) { console.warn("[Init] loadState error:", err); }
            try { applyTheme(state.theme || 'theme-dark'); } catch (err) { console.warn("[Init] applyTheme error:", err); }
            try { updateStrokeStrictnessUI(); } catch (err) { console.warn("[Init] strictness error:", err); }
            try { renderStudyGrid(); } catch (err) { console.warn("[Init] renderStudyGrid error:", err); }
            try { updateSyllabarySwitcherUI(); } catch (err) { console.warn("[Init] switcher error:", err); }
            try { updateHeaderBadges(); } catch (err) { console.warn("[Init] badges error:", err); }
        }

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initApp();
        } else {
            document.addEventListener('DOMContentLoaded', initApp);
        }
        window.addEventListener('load', initApp);
        window.addEventListener('pageshow', function (event) {
            initApp();
            if (event.persisted) {
                try { renderStudyGrid(); } catch (e) {}
            }
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                }
                const lookalikesTab = document.getElementById('tab-lookalikes');
                if (lookalikesTab && !lookalikesTab.classList.contains('hidden') && !state.lookalikesIsPaused) {
                    pauseLookalikesGame();
                }
            }
        });

        window.addEventListener('blur', () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            const lookalikesTab = document.getElementById('tab-lookalikes');
            if (lookalikesTab && !lookalikesTab.classList.contains('hidden') && !state.lookalikesIsPaused) {
                pauseLookalikesGame();
            }
        });

        // ==========================================================
        // KEYBOARD SHORTCUTS (1..4 FOR MULTIPLE CHOICE OPTIONS ON PC)
        // ==========================================================
        window.addEventListener('keydown', (e) => {
            // Guard: If typing into an input, textarea or editable element, do not intercept
            if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) {
                return;
            }

            // Priority 0.5: Parcial Tab Active (Q1, Q2, Q3, Flashcards)
            const parcialTab = document.getElementById('tab-parcial');
            if (parcialTab && !parcialTab.classList.contains('hidden')) {
                if (state.parcial && state.parcial.mode === 'sim') {
                    if (e.key >= '1' && e.key <= '4') {
                        const optIndex = parseInt(e.key, 10) - 1;
                        if (state.parcial.simSubMode === 'q1') {
                            const btn = document.getElementById('btn-q1-opt-' + optIndex);
                            if (btn && !btn.disabled) {
                                e.preventDefault();
                                e.stopPropagation();
                                selectParcialQ1Option(optIndex);
                                return;
                            }
                        } else if (state.parcial.simSubMode === 'q3') {
                            const btn = document.getElementById('btn-q3-opt-' + optIndex);
                            if (btn && !btn.disabled) {
                                e.preventDefault();
                                e.stopPropagation();
                                selectParcialQ3Option(optIndex);
                                return;
                            }
                        }
                    } else if (e.key === 'Enter') {
                        if (state.parcial.simSubMode === 'q1' && state.parcial.q1Answered) {
                            e.preventDefault();
                            e.stopPropagation();
                            nextParcialQ1();
                            return;
                        } else if (state.parcial.simSubMode === 'q2') {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!state.parcial.q2Checked) {
                                if (state.parcial.q2SelectedChips && state.parcial.q2SelectedChips.length > 0) {
                                    checkParcialQ2();
                                }
                            } else {
                                nextParcialQ2();
                            }
                            return;
                        } else if (state.parcial.simSubMode === 'q3' && state.parcial.q3Answered) {
                            e.preventDefault();
                            e.stopPropagation();
                            nextParcialQ3();
                            return;
                        }
                    } else if (e.key === 'Backspace' && state.parcial.simSubMode === 'q2' && !state.parcial.q2Checked) {
                        if (state.parcial.q2SelectedChips && state.parcial.q2SelectedChips.length > 0) {
                            e.preventDefault();
                            e.stopPropagation();
                            removeParcialQ2Chip(state.parcial.q2SelectedChips.length - 1);
                            return;
                        }
                    }
                } else if (state.parcial && state.parcial.mode === 'flashcards') {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        flipParcialFlashcard();
                        return;
                    } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                        e.preventDefault();
                        e.stopPropagation();
                        navParcialFlashcard(1);
                        return;
                    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                        e.preventDefault();
                        e.stopPropagation();
                        navParcialFlashcard(-1);
                        return;
                    } else if (e.key === 'a' || e.key === 'A') {
                        e.preventDefault();
                        e.stopPropagation();
                        const filter = state.parcial.flashcardFilter || 'all';
                        let list = EXAM_PARCIAL_DATA.VOCABULARY;
                        if (filter !== 'all') list = list.filter(v => v.cat === filter);
                        if (list.length === 0) list = EXAM_PARCIAL_DATA.VOCABULARY;
                        const card = list[state.parcial.flashcardIndex % list.length];
                        if (card) speakJapanese(card.kana);
                        return;
                    }
                }
            }

            // Priority 0A: Numbers Tab Active (3-pillar layout: Guide/Lesson, Practice/Builder-Dictation-Quiz, Translator)
            const numbersTab = document.getElementById('tab-numbers');
            if (numbersTab && !numbersTab.classList.contains('hidden') && state.numbersConfig) {
                const activePillar = state.numbersConfig.pillar || 'guide';
                const activeGuideSub = state.numbersConfig.guideSubTab || 'lesson';
                const activePracticeMode = state.numbersConfig.mode || 'builder';

                if (activePillar === 'guide' && activeGuideSub === 'lesson') {
                    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                        e.preventDefault();
                        e.stopPropagation();
                        setNumbersLessonStep(Math.min(7, (state.numbersConfig.lessonStep || state.numbersLessonStep || 1) + 1));
                        return;
                    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                        e.preventDefault();
                        e.stopPropagation();
                        setNumbersLessonStep(Math.max(1, (state.numbersConfig.lessonStep || state.numbersLessonStep || 1) - 1));
                        return;
                    } else if (e.key >= '1' && e.key <= '7') {
                        e.preventDefault();
                        e.stopPropagation();
                        setNumbersLessonStep(parseInt(e.key, 10));
                        return;
                    }
                } else if (activePillar === 'practice' && activePracticeMode === 'dictation') {
                    if (e.key >= '0' && e.key <= '9') {
                        e.preventDefault();
                        e.stopPropagation();
                        pressNumbersKeypad(e.key);
                        return;
                    } else if (e.key === 'Backspace') {
                        e.preventDefault();
                        e.stopPropagation();
                        pressNumbersKeypad('backspace');
                        return;
                    } else if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        const nextBtn = numbersTab.querySelector('button[onclick="nextNumbersDictationChallenge()"]');
                        if (nextBtn) {
                            nextBtn.click();
                        } else {
                            checkNumbersDictation();
                        }
                        return;
                    }
                } else if (activePillar === 'practice' && activePracticeMode === 'builder') {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        const nextBtn = numbersTab.querySelector('button[onclick="nextNumbersLegoChallenge()"]');
                        if (nextBtn) {
                            nextBtn.click();
                        } else {
                            checkNumberLego();
                        }
                        return;
                    } else if (e.key === 'Backspace') {
                        const nextBtn = numbersTab.querySelector('button[onclick="nextNumbersLegoChallenge()"]');
                        if (!nextBtn && state.numbersPlacedChips && state.numbersPlacedChips.length > 0) {
                            e.preventDefault();
                            e.stopPropagation();
                            removeNumberLegoChip(state.numbersPlacedChips.length - 1);
                            return;
                        }
                    }
                }
            }

            // Priority 0B: Time & Hours Tab Active (Builder, Listening, Quiz)
            const timeTab = document.getElementById('tab-time');
            if (timeTab && !timeTab.classList.contains('hidden') && state.timeConfig) {
                const timeMode = state.timeConfig.mode || 'guide';
                if (timeMode === 'builder') {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        const nextBtn = timeTab.querySelector('button[onclick="nextTimeBuilderChallenge()"]');
                        if (nextBtn) {
                            nextBtn.click();
                        } else if (state.timePlacedChips && state.timePlacedChips.length > 0) {
                            checkTimeBuilder();
                        }
                        return;
                    } else if (e.key === 'Backspace') {
                        const nextBtn = timeTab.querySelector('button[onclick="nextTimeBuilderChallenge()"]');
                        if (!nextBtn && state.timePlacedChips && state.timePlacedChips.length > 0) {
                            e.preventDefault();
                            e.stopPropagation();
                            removeTimeBuilderChip(state.timePlacedChips.length - 1);
                            return;
                        }
                    }
                }
            }

            // Map numeric keys (standard row and numpad) to 0-based option index
            let optIndex = -1;
            if (e.key === '1' || e.code === 'Digit1' || e.code === 'Numpad1') optIndex = 0;
            else if (e.key === '2' || e.code === 'Digit2' || e.code === 'Numpad2') optIndex = 1;
            else if (e.key === '3' || e.code === 'Digit3' || e.code === 'Numpad3') optIndex = 2;
            else if (e.key === '4' || e.code === 'Digit4' || e.code === 'Numpad4') optIndex = 3;

            if (optIndex === -1) {
                // Enter shortcut to advance Quiz / Listening next buttons
                if (e.key === 'Enter') {
                    if (numbersTab && !numbersTab.classList.contains('hidden') && state.numbersConfig && state.numbersConfig.pillar === 'practice' && state.numbersConfig.mode === 'quiz') {
                        const nextBtn = numbersTab.querySelector('button[onclick="nextNumbersQuizChallenge()"]');
                        if (nextBtn) {
                            e.preventDefault();
                            e.stopPropagation();
                            nextBtn.click();
                            return;
                        }
                    }
                    if (timeTab && !timeTab.classList.contains('hidden') && state.timeConfig) {
                        const nextTimeBtn = timeTab.querySelector('button[onclick="nextTimeListeningChallenge()"], button[onclick="nextTimeQuizChallenge()"]');
                        if (nextTimeBtn) {
                            e.preventDefault();
                            e.stopPropagation();
                            nextTimeBtn.click();
                            return;
                        }
                    }
                }
                return;
            }

            // Numbers Tab Quiz Mode Option Selection (1..4)
            if (numbersTab && !numbersTab.classList.contains('hidden') && state.numbersConfig && state.numbersConfig.pillar === 'practice' && state.numbersConfig.mode === 'quiz') {
                const numQuizGrid = document.getElementById('numbersQuizGrid');
                if (numQuizGrid) {
                    const quizBtns = numQuizGrid.querySelectorAll('button:not([disabled])');
                    if (quizBtns && quizBtns[optIndex]) {
                        e.preventDefault();
                        e.stopPropagation();
                        quizBtns[optIndex].click();
                        return;
                    }
                }
            }

            // Time Tab Listening / Quiz Mode Option Selection (1..4)
            if (timeTab && !timeTab.classList.contains('hidden') && state.timeConfig) {
                const timeGridId = state.timeConfig.mode === 'listening'
                    ? 'timeListeningOptionsGrid'
                    : (state.timeConfig.mode === 'quiz' ? 'timeQuizOptionsGrid' : null);
                if (timeGridId) {
                    const timeGrid = document.getElementById(timeGridId);
                    if (timeGrid) {
                        const timeBtns = timeGrid.querySelectorAll('button:not([disabled])');
                        if (timeBtns && timeBtns[optIndex]) {
                            e.preventDefault();
                            e.stopPropagation();
                            timeBtns[optIndex].click();
                            return;
                        }
                    }
                }
            }

            // Priority 1: 9 Stages Exercise Workspace active
            const workspace = document.getElementById('stageWorkspaceContainer');
            if (workspace) {
                const optionBtns = workspace.querySelectorAll('.stage-opt-btn:not([disabled])');
                if (optionBtns && optionBtns.length > 0 && optionBtns[optIndex]) {
                    e.preventDefault();
                    e.stopPropagation();
                    optionBtns[optIndex].click();
                    return;
                }
            }

            // Priority 2: Quiz Tab active
            const quizTab = document.getElementById('tab-quiz');
            if (quizTab && !quizTab.classList.contains('hidden')) {
                const quizGrid = document.getElementById('quizOptionsGrid');
                if (quizGrid) {
                    const quizBtns = quizGrid.querySelectorAll('button:not([disabled])');
                    if (quizBtns && quizBtns[optIndex]) {
                        e.preventDefault();
                        e.stopPropagation();
                        quizBtns[optIndex].click();
                        return;
                    }
                }
            }

            // Priority 3: Lookalikes Duel Tab active
            const lookalikesTab = document.getElementById('tab-lookalikes');
            if (lookalikesTab && !lookalikesTab.classList.contains('hidden')) {
                const lookalikesGrid = document.getElementById('lookalikesOptionsGrid');
                if (lookalikesGrid) {
                    const lookalikesBtns = lookalikesGrid.querySelectorAll('button:not([disabled])');
                    if (lookalikesBtns && lookalikesBtns[optIndex]) {
                        e.preventDefault();
                        e.stopPropagation();
                        lookalikesBtns[optIndex].click();
                        return;
                    }
                }
            }
        });
