// KotoDojo · Menú, temas y navegación entre pestañas
        // ==========================================================
        // MOBILE MENU & THEME TOGGLE (MODO CLARO / OSCURO)
        // ==========================================================
        function openMobileMenu() {
            const drawer = document.getElementById('mobileMenuDrawer');
            const backdrop = document.getElementById('mobileMenuBackdrop');
            if (!drawer || !backdrop) return;
            drawer.classList.remove('-translate-x-full');
            drawer.classList.add('translate-x-0');
            backdrop.classList.remove('opacity-0', 'pointer-events-none');
            backdrop.classList.add('opacity-100', 'pointer-events-auto');
        }

        function closeMobileMenu() {
            const drawer = document.getElementById('mobileMenuDrawer');
            const backdrop = document.getElementById('mobileMenuBackdrop');
            if (!drawer || !backdrop) return;
            drawer.classList.remove('translate-x-0');
            drawer.classList.add('-translate-x-full');
            backdrop.classList.add('opacity-0', 'pointer-events-none');
            backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        }

        function toggleMobileMenu(forceOpen = null) {
            const drawer = document.getElementById('mobileMenuDrawer');
            if (!drawer) return;
            const isCurrentlyOpen = drawer.classList.contains('translate-x-0');
            const shouldOpen = forceOpen !== null ? forceOpen : !isCurrentlyOpen;

            if (shouldOpen) {
                openMobileMenu();
            } else {
                closeMobileMenu();
            }
        }

        function switchTabAndCloseDrawer(tabId) {
            switchTab(tabId);
            closeMobileMenu();

            // Update header badge with current tab name
            const tabBadge = document.getElementById('headerCurrentTabBadge');
            const tabNames = {
                study: 'Aprender',
                stages: 'Modo Etapas',
                draw: 'Trazado Guiado',
                blinddraw: 'Trazado a Ciegas',
                dictation: 'Dictado Puro',
                lookalikes: 'Duelo de Gemelos',
                shiritori: 'Shiritori',
                wordbuilder: 'Armar Palabras',
                wordsearch: 'Sopa de Letras',
                memory: 'Memoria',
                quiz: 'Quiz Rápido',
                progress: 'Progreso SRS'
            };
            if (tabBadge && tabNames[tabId]) {
                tabBadge.textContent = tabNames[tabId];
            }
        }

        // ==========================================================
        // ATMÓSFERAS Y TEMAS (SISTEMA DE 4 PALETAS CENTRALIZADAS)
        // ==========================================================
        const THEME_OPTIONS_DATA = {
            'theme-dark': {
                key: 'theme-dark',
                name: '🌌 Midnight Tokyo',
                shortName: 'Midnight',
                desc: 'Neón Elegante',
                isDark: true,
                bg: '#090d16',
                card: '#111a2e',
                header: 'rgba(23, 35, 61, 0.9)',
                border: '#1e2f52',
                borderHover: '#38bdf8',
                accentPrimary: '#38bdf8',
                accentSecondary: '#a855f7',
                meta: '#090d16',
                icon: 'fa-moon'
            },
            'theme-matcha': {
                key: 'theme-matcha',
                name: '🍵 Jardín Zen',
                shortName: 'Matcha',
                desc: 'Bambú & Matcha',
                isDark: true,
                bg: '#0b120e',
                card: '#14211a',
                header: 'rgba(28, 46, 37, 0.9)',
                border: '#243d31',
                borderHover: '#84cc16',
                accentPrimary: '#84cc16',
                accentSecondary: '#f59e0b',
                meta: '#0b120e',
                icon: 'fa-leaf'
            },
            'theme-sumie': {
                key: 'theme-sumie',
                name: '🖌️ Tinta Sumi-e',
                shortName: 'Sumi-e',
                desc: 'Sello Hanko',
                isDark: true,
                bg: '#121214',
                card: '#1c1c22',
                header: 'rgba(39, 39, 48, 0.9)',
                border: '#353542',
                borderHover: '#e11d48',
                accentPrimary: '#e11d48',
                accentSecondary: '#eab308',
                meta: '#121214',
                icon: 'fa-paintbrush'
            },
            'theme-light': {
                key: 'theme-light',
                name: '🌸 Sakura Kioto',
                shortName: 'Sakura',
                desc: 'Washi y Cerezo',
                isDark: false,
                bg: '#fbf0f2',
                card: '#ffffff',
                header: 'rgba(253, 237, 240, 0.96)',
                border: '#f4c2cb',
                borderHover: '#f43f5e',
                accentPrimary: '#f43f5e',
                accentSecondary: '#fb923c',
                meta: '#fbf0f2',
                icon: 'fa-sun'
            },
            'theme-tatami': {
                key: 'theme-tatami',
                name: '🌾 Tatami & Té',
                shortName: 'Tatami',
                desc: 'Madera Hinoki & Matcha',
                isDark: false,
                bg: '#ece7db',
                card: '#ffffff',
                header: 'rgba(235, 229, 217, 0.96)',
                border: '#d3cbbe',
                borderHover: '#4d7c0f',
                accentPrimary: '#4d7c0f',
                accentSecondary: '#d97706',
                meta: '#ece7db',
                icon: 'fa-seedling'
            },
            'theme-kanagawa': {
                key: 'theme-kanagawa',
                name: '🌊 Kanagawa Índigo',
                shortName: 'Kanagawa',
                desc: 'Porcelana & Azul Aizome',
                isDark: false,
                bg: '#deebf7',
                card: '#ffffff',
                header: 'rgba(220, 235, 248, 0.96)',
                border: '#bcd4eb',
                borderHover: '#0284c7',
                accentPrimary: '#0369a1',
                accentSecondary: '#f59e0b',
                meta: '#deebf7',
                icon: 'fa-water'
            }
        };

        function normalizeThemeKey(themeKey) {
            if (!themeKey) return 'theme-dark';
            if (themeKey === 'dark' || themeKey === 'kyoto-dark' || themeKey === 'cyberpunk-dark') return 'theme-dark';
            if (themeKey === 'matcha' || themeKey === 'matcha-light') return 'theme-matcha';
            if (themeKey === 'light' || themeKey === 'sakura-light' || themeKey === 'kyoto-light') return 'theme-light';
            if (themeKey === 'sumie' || themeKey === 'sakura-dark') return 'theme-sumie';
            if (themeKey === 'tatami' || themeKey === 'theme-tatami') return 'theme-tatami';
            if (themeKey === 'kanagawa' || themeKey === 'theme-kanagawa') return 'theme-kanagawa';
            if (THEME_OPTIONS_DATA[themeKey]) return themeKey;
            if (themeKey.startsWith('theme-') && THEME_OPTIONS_DATA[themeKey]) return themeKey;
            return 'theme-dark';
        }

        function cycleTheme() {
            const themeOrder = ['theme-dark', 'theme-matcha', 'theme-sumie', 'theme-light', 'theme-tatami', 'theme-kanagawa'];
            const current = normalizeThemeKey(state.theme);
            const currentIndex = themeOrder.indexOf(current);
            const nextIndex = (currentIndex + 1) % themeOrder.length;
            const nextTheme = themeOrder[nextIndex >= 0 ? nextIndex : 0];
            setAppTheme(nextTheme);
        }

        function toggleTheme() {
            cycleTheme();
        }

        function toggleThemeDropdown(forceState) {
            const dd = document.getElementById('themeQuickDropdown');
            if (!dd) return;
            if (typeof forceState === 'boolean') {
                if (forceState) dd.classList.remove('hidden');
                else dd.classList.add('hidden');
            } else {
                dd.classList.toggle('hidden');
            }
        }

        document.addEventListener('click', (e) => {
            const container = document.getElementById('themeSelectorContainer');
            if (container && !container.contains(e.target)) {
                toggleThemeDropdown(false);
            }
        });

        function setAppTheme(themeKey) {
            const normKey = normalizeThemeKey(themeKey);
            state.theme = normKey;
            saveStateToStorage();
            applyTheme(normKey);
            updateThemeModalUI();

            const info = THEME_OPTIONS_DATA[normKey];
            if (info && typeof showToast === 'function') {
                showToast(`${info.name} (${info.desc}) activado`, 'info');
            }
        }

        function applyTheme(themeKey) {
            const normKey = normalizeThemeKey(themeKey);
            state.theme = normKey;

            const body = document.body;
            if (!body) return;

            const info = THEME_OPTIONS_DATA[normKey] || THEME_OPTIONS_DATA['theme-dark'];
            const isDark = info.isDark;

            // Remove all existing theme tags
            body.classList.remove(
                'theme-dark', 'theme-matcha', 'theme-sumie', 'theme-light', 'theme-tatami', 'theme-kanagawa',
                'theme-kyoto-dark', 'theme-sakura-dark', 'theme-cyberpunk-dark',
                'theme-kyoto-light', 'theme-sakura-light', 'theme-matcha-light',
                'is-light', 'is-dark'
            );

            body.classList.add(normKey);
            if (isDark) {
                body.classList.add('is-dark');
            } else {
                body.classList.add('is-light');
            }

            // Update Header Icon & color
            const toggleIcon = document.getElementById('themeToggleIcon');
            if (toggleIcon) {
                toggleIcon.className = `fa-solid ${info.icon || 'fa-palette'} text-sm transition-transform duration-200`;
                toggleIcon.style.color = info.accentPrimary;
            }

            // Update Drawer Label & Icon
            const drawerIcon = document.getElementById('drawerThemeIcon');
            const drawerLabel = document.getElementById('drawerThemeLabel');
            if (drawerIcon) {
                drawerIcon.className = `fa-solid ${info.icon || 'fa-palette'} text-xs`;
                drawerIcon.style.color = info.accentPrimary;
            }
            if (drawerLabel) {
                drawerLabel.textContent = info.name;
            }

            // Update Mobile Status Bar Theme
            const metaTheme = document.getElementById('metaThemeColor');
            if (metaTheme) {
                metaTheme.setAttribute('content', info.meta || (isDark ? '#090d16' : '#faf7f7'));
            }

            // Actualizar estado activo en los botones de tema del Drawer
            const drawerThemeKeys = ['theme-dark', 'theme-matcha', 'theme-sumie', 'theme-light', 'theme-tatami', 'theme-kanagawa'];
            drawerThemeKeys.forEach(k => {
                const btn = document.getElementById('drawer-theme-' + k);
                if (btn) {
                    if (k === normKey) {
                        btn.classList.add('ring-2', 'scale-105');
                        btn.style.boxShadow = '0 0 10px var(--accent-primary)';
                    } else {
                        btn.classList.remove('ring-2', 'scale-105');
                        btn.style.boxShadow = '';
                    }
                }
            });

            // Actualizar dashboard de etapas si está visible
            if (typeof renderStagesAutoDashboard === 'function') {
                try {
                    const autoView = document.getElementById('stages-auto-view');
                    if (autoView && !autoView.classList.contains('hidden')) {
                        renderStagesAutoDashboard();
                    }
                } catch(e) {}
            }

            // Actualizar modos y rangos de números y parcial
            try {
                if (typeof updateNumbersRangeButtonsUI === 'function') updateNumbersRangeButtonsUI();
                if (typeof setNumbersMode === 'function' && state.numbersConfig) setNumbersMode(state.numbersConfig.mode || 'lesson', true);
                if (typeof setParcialMode === 'function' && state.parcial) setParcialMode(state.parcial.mode || 'guide', true);
            } catch(e) {}
        }

        function openThemeModal() {
            if (typeof closeMobileMenu === 'function') closeMobileMenu();
            if (typeof toggleThemeDropdown === 'function') toggleThemeDropdown(false);
            const modal = document.getElementById('themeSelectorModal');
            const backdrop = document.getElementById('themeSelectorModalBackdrop');
            if (!modal || !backdrop) return;
            updateThemeModalUI();
            backdrop.classList.remove('opacity-0', 'pointer-events-none');
            backdrop.classList.add('opacity-100', 'pointer-events-auto');
            modal.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
            modal.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
            document.body.classList.add('overflow-hidden');
        }

        function closeThemeModal() {
            const modal = document.getElementById('themeSelectorModal');
            const backdrop = document.getElementById('themeSelectorModalBackdrop');
            if (modal) {
                modal.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
                modal.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            }
            if (backdrop) {
                backdrop.classList.remove('opacity-100', 'pointer-events-auto');
                backdrop.classList.add('opacity-0', 'pointer-events-none');
            }
            document.body.classList.remove('overflow-hidden');
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeThemeModal();
                if (typeof closeVoiceModal === 'function') closeVoiceModal();
                if (typeof closeSokuonModal === 'function') closeSokuonModal();
                if (typeof closeMobileMenu === 'function') closeMobileMenu();
                if (typeof toggleThemeDropdown === 'function') toggleThemeDropdown(false);
            }
        });

        function selectTheme(themeKey) {
            setAppTheme(themeKey);
            updateThemeModalUI();
        }

        function updateThemeModalUI() {
            const current = normalizeThemeKey(state.theme);

            Object.keys(THEME_OPTIONS_DATA).forEach(k => {
                const btn = document.getElementById('theme-opt-' + k);
                const check = document.getElementById('theme-check-' + k);
                if (btn) {
                    if (k === current) {
                        btn.classList.add('ring-2', 'scale-[1.02]');
                        btn.style.borderColor = 'var(--accent-primary)';
                        btn.classList.remove('opacity-75');
                        if (check) check.classList.remove('hidden');
                    } else {
                        btn.classList.remove('ring-2', 'scale-[1.02]');
                        btn.style.borderColor = '';
                        btn.classList.add('opacity-75');
                        if (check) check.classList.add('hidden');
                    }
                }
            });
        }

        function switchTab(tabId) {
            // Stop any background timers/games and cancel speech
            stopLookalikesGame();
            if (state.stageSession && state.stageSession.timerInterval) {
                clearInterval(state.stageSession.timerInterval);
                state.stageSession.timerInterval = null;
            }
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (typeof stopStudyRowAudio === 'function') {
                stopStudyRowAudio();
            }

            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.className = 'tab-btn w-full min-h-[48px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition active:scale-98';
            });

            const activeSection = document.getElementById(`tab-${tabId}`);
            if (activeSection) activeSection.classList.remove('hidden');

            const activeBtn = document.getElementById(`nav-${tabId}`);
            if (activeBtn) {
                activeBtn.className = 'tab-btn is-active stage-theme-primary-btn w-full min-h-[48px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-3 transition shadow-lg active:scale-98';
            }

            // Update header badge with current tab name
            const tabBadge = document.getElementById('headerCurrentTabBadge');
            const tabNames = {
                study: 'Aprender',
                stages: 'Modo Etapas',
                draw: 'Trazado Guiado',
                blinddraw: 'Trazado a Ciegas',
                dictation: 'Dictado Puro',
                lookalikes: 'Duelo de Gemelos',
                shiritori: 'Shiritori',
                wordbuilder: 'Armar Palabras',
                wordsearch: 'Sopa de Letras',
                memory: 'Memoria',
                quiz: 'Quiz Rápido',
                progress: 'Progreso SRS',
                numbers: 'Números',
                time: 'Horas y Tiempo',
                parcial: 'Palabras de Clase'
            };
            if (tabBadge && tabNames[tabId]) {
                tabBadge.textContent = tabNames[tabId];
            }

            if (tabId === 'study') {
                renderStudyGrid();
            } else if (tabId === 'stages') {
                initStagesTab();
            } else if (tabId === 'numbers') {
                initNumbersGame();
            } else if (tabId === 'time') {
                initTimeGame();
            } else if (tabId === 'parcial') {
                initParcialTab();
            } else if (tabId === 'draw') {
                initStrokeDrawingMode('draw');
            } else if (tabId === 'blinddraw') {
                initBlindDrawing();
            } else if (tabId === 'dictation') {
                initDictationDrawing();
            } else if (tabId === 'lookalikes') {
                initLookalikesGame();
            } else if (tabId === 'shiritori') {
                initShiritoriGame();
            } else if (tabId === 'wordbuilder') {
                initWordBuilderGame();
            } else if (tabId === 'wordsearch') {
                initWordSearchGame();
            } else if (tabId === 'memory') {
                initMemoryGame();
            } else if (tabId === 'quiz') {
                initQuizQuestion();
            } else if (tabId === 'progress') {
                renderSRSDashboard();
            }
        }

        // Acciones compuestas usadas desde el HTML (data-action)
        function selectThemeFromDropdown(themeKey) {
            selectTheme(themeKey);
            toggleThemeDropdown(false);
        }

        function selectThemeFromMenu(themeKey) {
            selectTheme(themeKey);
            closeMobileMenu();
        }

        function cycleThemeFromDropdown() {
            cycleTheme();
            toggleThemeDropdown(false);
        }

        function openThemeModalFromDropdown() {
            openThemeModal();
            toggleThemeDropdown(false);
        }
