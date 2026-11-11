// KotoDojo · Voz (TTS) y efectos de sonido
        // ==========================================
        // AUDIO ENGINE (TTS & SYNTHESIZER CON SELECTOR DE VOZ)
        // ==========================================
        let cachedJapaneseVoice = null;
        let voicesInitialized = false;

        const VOICE_PRESET_CONFIG = {
            female: { label: 'Femenino / Claro', pitch: 1.12, rate: 0.90, icon: '👩' },
            male: { label: 'Masculino / Grave', pitch: 0.80, rate: 0.86, icon: '👨' },
            sensei: { label: 'Sensei / Profundo', pitch: 0.65, rate: 0.82, icon: '🥋' },
            anime: { label: 'Juvenil / Dinámico', pitch: 1.28, rate: 0.96, icon: '🌸' }
        };

        function getAvailableJapaneseVoices() {
            if (!('speechSynthesis' in window)) return [];
            const voices = window.speechSynthesis.getVoices() || [];
            return voices.filter(v => {
                const lang = (v.lang || '').toLowerCase();
                const name = (v.name || '').toLowerCase();
                return lang.startsWith('ja') || lang.includes('jp') || name.includes('japan') || name.includes('日本語');
            });
        }

        function detectVoiceGender(voice) {
            if (!voice) return 'auto';
            const name = (voice.name || '').toLowerCase();
            if (name.includes('keita') || name.includes('ichiro') || name.includes('otoya') || 
                name.includes('takumi') || name.includes('kenji') || name.includes('naoki') || 
                name.includes('daichi') || name.includes('hattori') || name.includes('male') || name.includes('guy')) {
                return 'male';
            }
            if (name.includes('nanami') || name.includes('haruka') || name.includes('ayumi') || 
                name.includes('kyoko') || name.includes('aoi') || name.includes('shiori') || 
                name.includes('female') || name.includes('girl') || name.includes('woman')) {
                return 'female';
            }
            return 'auto';
        }

        function initJapaneseVoices() {
            if (!('speechSynthesis' in window)) return;
            const voices = window.speechSynthesis.getVoices();
            if (!voices || voices.length === 0) return;

            const jaVoices = getAvailableJapaneseVoices();
            if (!state.voiceConfig) {
                state.voiceConfig = { voiceUri: '', preset: 'male', pitch: 0.80, rate: 0.88 };
            }
            const config = state.voiceConfig;

            // 1. Si el usuario guardó una voz específica por URI o nombre, buscarla
            if (config.voiceUri) {
                cachedJapaneseVoice = jaVoices.find(v => (v.voiceURI === config.voiceUri || v.name === config.voiceUri)) || null;
            }

            // 2. Si no hay voz configurada o no se encontró, buscar según el preset (ej: male -> buscar voz masculina real)
            if (!cachedJapaneseVoice && jaVoices.length > 0) {
                if (config.preset === 'male' || config.preset === 'sensei') {
                    cachedJapaneseVoice = jaVoices.find(v => detectVoiceGender(v) === 'male') || null;
                } else if (config.preset === 'female' || config.preset === 'anime') {
                    cachedJapaneseVoice = jaVoices.find(v => detectVoiceGender(v) === 'female') || null;
                }
            }

            // 3. Fallback inteligente a la mejor voz disponible
            if (!cachedJapaneseVoice && jaVoices.length > 0) {
                cachedJapaneseVoice = jaVoices.find(v => v.name.includes('Keita') || v.name.includes('Nanami') || v.name.includes('Google 日本語')) || jaVoices[0];
            }

            // 4. Si aún no hay voz japonesa, buscar cualquier voz con etiqueta ja
            if (!cachedJapaneseVoice && voices.length > 0) {
                cachedJapaneseVoice = voices.find(v => (v.lang || '').toLowerCase().includes('ja')) || null;
            }

            voicesInitialized = true;
            updateVoiceModalUI();
        }

        function setVoicePreset(presetKey) {
            if (!state.voiceConfig) state.voiceConfig = {};
            state.voiceConfig.preset = presetKey;
            const pInfo = VOICE_PRESET_CONFIG[presetKey] || VOICE_PRESET_CONFIG.male;
            state.voiceConfig.pitch = pInfo.pitch;
            if (!state.voiceConfig.rate) state.voiceConfig.rate = pInfo.rate;

            const jaVoices = getAvailableJapaneseVoices();
            if (presetKey === 'male' || presetKey === 'sensei') {
                const maleVoice = jaVoices.find(v => detectVoiceGender(v) === 'male');
                if (maleVoice) {
                    cachedJapaneseVoice = maleVoice;
                    state.voiceConfig.voiceUri = maleVoice.voiceURI || maleVoice.name;
                }
            } else if (presetKey === 'female' || presetKey === 'anime') {
                const femaleVoice = jaVoices.find(v => detectVoiceGender(v) === 'female');
                if (femaleVoice) {
                    cachedJapaneseVoice = femaleVoice;
                    state.voiceConfig.voiceUri = femaleVoice.voiceURI || femaleVoice.name;
                }
            }

            saveStateToStorage();
            updateVoiceModalUI();
            testCurrentVoiceSample();
        }

        function setVoiceSpeed(speed) {
            if (!state.voiceConfig) state.voiceConfig = {};
            state.voiceConfig.rate = speed;
            saveStateToStorage();
            updateVoiceModalUI();
            testCurrentVoiceSample();
        }

        function onVoiceDropdownChange(voiceUri) {
            if (!state.voiceConfig) state.voiceConfig = {};
            state.voiceConfig.voiceUri = voiceUri;
            const jaVoices = getAvailableJapaneseVoices();
            const selected = jaVoices.find(v => (v.voiceURI === voiceUri || v.name === voiceUri));
            if (selected) {
                cachedJapaneseVoice = selected;
                const gender = detectVoiceGender(selected);
                if (gender === 'male' && state.voiceConfig.preset === 'female') {
                    state.voiceConfig.preset = 'male';
                    state.voiceConfig.pitch = VOICE_PRESET_CONFIG.male.pitch;
                } else if (gender === 'female' && state.voiceConfig.preset === 'male') {
                    state.voiceConfig.preset = 'female';
                    state.voiceConfig.pitch = VOICE_PRESET_CONFIG.female.pitch;
                }
            }
            saveStateToStorage();
            updateVoiceModalUI();
            testCurrentVoiceSample();
        }

        function testCurrentVoiceSample() {
            speakJapanese('こんにちは、はじめまして。');
        }

        function resetVoiceSettingsToDefault() {
            state.voiceConfig = {
                voiceUri: '',
                preset: 'male',
                pitch: 0.80,
                rate: 0.88
            };
            const jaVoices = getAvailableJapaneseVoices();
            cachedJapaneseVoice = jaVoices.find(v => detectVoiceGender(v) === 'male') || jaVoices[0] || null;
            saveStateToStorage();
            updateVoiceModalUI();
            showToast("Voz restablecida al modo predeterminado", "info");
            testCurrentVoiceSample();
        }

        function updateVoiceModalUI() {
            const dropdown = document.getElementById('voiceSelectDropdown');
            const countBadge = document.getElementById('voiceCountBadge');
            const hint = document.getElementById('voiceDetectedHint');
            const config = state.voiceConfig || { preset: 'male', pitch: 0.80, rate: 0.88 };

            const jaVoices = getAvailableJapaneseVoices();
            if (countBadge) {
                countBadge.textContent = `${jaVoices.length} ${jaVoices.length === 1 ? 'voz' : 'voces'}`;
            }

            if (dropdown) {
                if (jaVoices.length === 0) {
                    dropdown.innerHTML = '<option value="">(No se detectaron voces japonesas instaladas)</option>';
                } else {
                    dropdown.innerHTML = jaVoices.map(v => {
                        const gender = detectVoiceGender(v);
                        const genderBadge = gender === 'male' ? '👨 Hombre' : (gender === 'female' ? '👩 Mujer' : '🌐 Sistema');
                        const isSelected = cachedJapaneseVoice && (cachedJapaneseVoice.voiceURI === v.voiceURI || cachedJapaneseVoice.name === v.name);
                        return `<option value="${v.voiceURI || v.name}" ${isSelected ? 'selected' : ''}>${v.name} (${genderBadge})</option>`;
                    }).join('');
                }
            }

            if (hint) {
                if (jaVoices.length === 0) {
                    hint.textContent = 'Tu navegador no reporta voces japonesas nativas instaladas. El modulador ajustará el tono del sintetizador fallback.';
                } else if (jaVoices.length === 1) {
                    hint.textContent = '1 voz japonesa detectada. El modulador de abajo altera el tono acústico para transformarla en hombre, mujer o sensei.';
                } else {
                    hint.textContent = `${jaVoices.length} voces japonesas disponibles en tu sistema. Puedes elegir una voz física o modular su tono.`;
                }
            }

            // Resaltar preset activo (female, male, sensei, anime)
            ['female', 'male', 'sensei', 'anime'].forEach(p => {
                const btn = document.getElementById('voice-preset-' + p);
                if (btn) {
                    if (config.preset === p) {
                        btn.classList.add('ring-2', 'ring-sky-500', 'border-sky-500', 'bg-sky-500/15');
                        btn.classList.remove('border-slate-700', 'bg-slate-800/80');
                    } else {
                        btn.classList.remove('ring-2', 'ring-sky-500', 'border-sky-500', 'bg-sky-500/15');
                        btn.classList.add('border-slate-700', 'bg-slate-800/80');
                    }
                }
            });

            // Resaltar velocidad activa
            const curRate = config.rate || 0.88;
            const speedPills = [
                { id: 'voice-speed-slow', val: 0.75 },
                { id: 'voice-speed-normal', val: 0.88 },
                { id: 'voice-speed-fast', val: 1.08 }
            ];
            speedPills.forEach(sp => {
                const el = document.getElementById(sp.id);
                if (el) {
                    if (Math.abs(curRate - sp.val) < 0.08) {
                        el.classList.add('ring-2', 'ring-emerald-500', 'border-emerald-500', 'bg-emerald-500/20', 'text-emerald-300');
                        el.classList.remove('border-slate-700', 'bg-slate-800', 'text-slate-200');
                    } else {
                        el.classList.remove('ring-2', 'ring-emerald-500', 'border-emerald-500', 'bg-emerald-500/20', 'text-emerald-300');
                        el.classList.add('border-slate-700', 'bg-slate-800', 'text-slate-200');
                    }
                }
            });

            const speedLabel = document.getElementById('voiceSpeedValLabel');
            if (speedLabel) {
                speedLabel.textContent = `${curRate.toFixed(2)}x (${curRate < 0.8 ? 'Pausada' : (curRate > 1.0 ? 'Nativa' : 'Pedagógica')})`;
            }

            // Actualizar badge en drawer
            const drawerBadge = document.getElementById('drawerVoicePresetBadge');
            if (drawerBadge) {
                const pInfo = VOICE_PRESET_CONFIG[config.preset] || VOICE_PRESET_CONFIG.male;
                drawerBadge.textContent = `${pInfo.icon} ${config.preset === 'male' ? 'Hombre' : (config.preset === 'female' ? 'Mujer' : (config.preset === 'sensei' ? 'Sensei' : 'Anime'))}`;
            }
        }

        function openVoiceModal() {
            if (typeof closeMobileMenu === 'function') closeMobileMenu();
            if (typeof closeThemeModal === 'function') closeThemeModal();
            const modal = document.getElementById('voiceSettingsModal');
            const backdrop = document.getElementById('voiceSettingsModalBackdrop');
            if (!modal || !backdrop) return;
            initJapaneseVoices();
            updateVoiceModalUI();
            backdrop.classList.remove('opacity-0', 'pointer-events-none');
            backdrop.classList.add('opacity-100', 'pointer-events-auto');
            modal.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
            modal.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
            document.body.classList.add('overflow-hidden');
        }

        function closeVoiceModal() {
            const modal = document.getElementById('voiceSettingsModal');
            const backdrop = document.getElementById('voiceSettingsModalBackdrop');
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

        try {
            if ('speechSynthesis' in window && window.speechSynthesis) {
                try {
                    window.speechSynthesis.onvoiceschanged = () => {
                        initJapaneseVoices();
                    };
                } catch (e) {}
                initJapaneseVoices();
            }
        } catch (err) {
            console.warn("[SpeechSynthesis] Restricted in WebView:", err);
        }

        function triggerHaptic(type = 'success') {
            if (window.AndroidBridge) {
                if (type === 'success' && typeof window.AndroidBridge.vibrate === 'function') {
                    window.AndroidBridge.vibrate(35);
                    return;
                }
                if (type === 'error' && typeof window.AndroidBridge.vibratePattern === 'function') {
                    window.AndroidBridge.vibratePattern("60,40,60");
                    return;
                }
            }
            if ('vibrate' in navigator) {
                try {
                    if (type === 'success') navigator.vibrate(35);
                    else navigator.vibrate([60, 40, 60]);
                } catch(e) {}
            }
        }

        let activeSpeechUtterance = null; // Guardar referencia para evitar que Chromium recolecte el utterance antes de terminar onend

        function speakJapanese(text, onEnd) {
            if (!state.audioEnabled) {
                if (typeof onEnd === 'function') onEnd();
                return;
            }
            if (window.AndroidBridge && typeof window.AndroidBridge.speakJapanese === 'function') {
                window.AndroidBridge.speakJapanese(text);
                if (typeof onEnd === 'function') {
                    setTimeout(onEnd, 850);
                }
                return;
            }
            if (!voicesInitialized || !cachedJapaneseVoice) {
                initJapaneseVoices();
            }

            if ('speechSynthesis' in window) {
                try {
                    window.speechSynthesis.cancel();
                    const utter = new SpeechSynthesisUtterance(text);
                    activeSpeechUtterance = utter;
                    utter.lang = 'ja-JP';

                    const vConf = state.voiceConfig || { preset: 'male', pitch: 0.80, rate: 0.88 };
                    utter.pitch = typeof vConf.pitch === 'number' ? vConf.pitch : 0.80;
                    utter.rate = typeof vConf.rate === 'number' ? vConf.rate : 0.88;

                    if (cachedJapaneseVoice) {
                        utter.voice = cachedJapaneseVoice;
                    }

                    let finished = false;
                    let safetyTimer = null;
                    const finish = () => {
                        if (finished) return;
                        finished = true;
                        if (safetyTimer) clearTimeout(safetyTimer);
                        activeSpeechUtterance = null;
                        if (typeof onEnd === 'function') onEnd();
                    };

                    utter.onend = finish;
                    utter.onerror = () => {
                        playSoundTone(523.25, 'sine', 0.12);
                        finish();
                    };

                    // Temporizador de seguridad por si el motor de voz del navegador no dispara onend
                    safetyTimer = setTimeout(() => {
                        finish();
                    }, 1800);

                    window.speechSynthesis.speak(utter);
                    return;
                } catch(e) {
                    playSoundTone(523.25, 'sine', 0.12);
                    if (typeof onEnd === 'function') onEnd();
                }
            } else {
                playSoundTone(523.25, 'sine', 0.12);
                if (typeof onEnd === 'function') onEnd();
            }
        }

        // ==========================================================
        // SHARED AUDIOCONTEXT & MOBILE TOUCH AUDIO UNLOCK ENGINE
        // ==========================================================
        let sharedAudioCtx = null;
        function getAudioContext() {
            if (!sharedAudioCtx) {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (AudioCtxClass) {
                    sharedAudioCtx = new AudioCtxClass();
                }
            }
            if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
                sharedAudioCtx.resume().catch(() => {});
            }
            return sharedAudioCtx;
        }

        let isAudioUnlockedOnMobile = false;
        function unlockAudioOnMobile() {
            if (isAudioUnlockedOnMobile) return;
            const ctx = getAudioContext();
            if (ctx) {
                if (ctx.state === 'suspended') {
                    ctx.resume().then(() => {
                        isAudioUnlockedOnMobile = true;
                    }).catch(() => {});
                } else {
                    isAudioUnlockedOnMobile = true;
                }
            }
            // Prime speech synthesis if paused
            if ('speechSynthesis' in window && window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
        }
        window.addEventListener('touchstart', unlockAudioOnMobile, { passive: true, once: true });
        window.addEventListener('pointerdown', unlockAudioOnMobile, { passive: true, once: true });

        function playSoundTone(freq, type = 'sine', duration = 0.15) {
            if (!state.audioEnabled) return;
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type;
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + duration);
            } catch (e) {}
        }

        function toggleAudio() {
            state.audioEnabled = !state.audioEnabled;
            const icon = document.getElementById('audioToggleIcon');
            const oldIcon = document.getElementById('audioIcon');
            if (icon) {
                icon.className = state.audioEnabled ? 'fa-solid fa-volume-high text-sm text-sky-400' : 'fa-solid fa-volume-xmark text-sm text-rose-400';
            }
            if (oldIcon) {
                oldIcon.className = state.audioEnabled ? 'fa-solid fa-volume-high text-sm' : 'fa-solid fa-volume-xmark text-rose-400 text-sm';
            }
            showToast(state.audioEnabled ? "🔊 Audio activado" : "🔇 Audio silenciado", "info");
        }

        function toggleGlobalAudio() {
            toggleAudio();
        }

        function showToast(message, type = "info") {
            const container = document.getElementById('toastContainer');
            if (!container) return;
            const toast = document.createElement('div');

            const bgClass = type === 'success' ? 'bg-matcha-950/90 text-matcha-200 border-matcha-500/60 shadow-matcha-500/20' :
                            type === 'error' ? 'bg-rose-950/90 text-rose-200 border-rose-500/60 shadow-rose-500/20' :
                            'bg-slate-900/95 text-slate-200 border-slate-700 shadow-slate-950/50';

            const icon = type === 'success' ? 'fa-circle-check text-matcha-400' :
                         type === 'error' ? 'fa-circle-xmark text-rose-400' : 'fa-circle-info text-sky-400';

            toast.className = `flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-lg text-xs font-semibold backdrop-blur-md transition-all duration-300 transform -translate-y-2 opacity-0 pointer-events-none ${bgClass}`;
            toast.innerHTML = `<i class="fa-solid ${icon} text-xs"></i><span>${message}</span>`;

            container.appendChild(toast);
            requestAnimationFrame(() => {
                toast.classList.remove('-translate-y-2', 'opacity-0');
            });

            setTimeout(() => {
                toast.classList.add('opacity-0', '-translate-y-2');
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        }

        function addXP(points) {
            const prevLevel = Math.floor(state.xp / 100) + 1;
            state.xp += points;
            const newLevel = Math.floor(state.xp / 100) + 1;

            if (newLevel > prevLevel) {
                playSoundTone(783.99, 'sine', 0.25);
                setTimeout(() => playSoundTone(1046.50, 'sine', 0.35), 180);
                if (typeof confetti === 'function') {
                    try { confetti({ particleCount: 35, spread: 60, origin: { y: 0.1 } }); } catch(e) {}
                }
                triggerHaptic('success');
            }

            updateHeaderBadges();
            saveStateToStorage();
        }
