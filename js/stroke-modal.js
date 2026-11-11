// KotoDojo · Modal arrastrable con el orden de trazos animado
        function practiceKanjiInCanvas(char) {
            const kObj = NUMBER_KANJI_DATA.find(k => k.kanji === char) || NUMBER_KANJI_DATA[1];
            state.customPracticePool = NUMBER_KANJI_DATA.map(k => ({
                hiragana: k.kanji,
                katakana: k.kanji,
                char: k.kanji,
                romaji: `${k.romaji} (${k.val})`,
                meaning: k.note
            }));
            state.customPracticeTitle = '🔢 Práctica de Trazos: Números y Tiempo en Kanji';
            state.selectedDrawingKana = state.customPracticePool.find(k => k.char === char) || state.customPracticePool[0];
            
            if (typeof closeKanaStrokeModal === 'function') closeKanaStrokeModal();
            if (typeof switchTab === 'function') switchTab('draw');
            if (typeof updateCustomPracticePoolBanner === 'function') updateCustomPracticePoolBanner();
            if (typeof loadCharacterForDrawing === 'function') loadCharacterForDrawing(char, 'draw');
            if (typeof renderDrawKanaList === 'function') renderDrawKanaList();
            if (typeof speakJapanese === 'function') speakJapanese(((kObj.kana || char).split('/')[0] || char).trim());
            if (typeof showToast === 'function') showToast(`Cargado kanji ${char} en el lienzo interactivo`, 'success');
        }

        function showKanaStrokeModal(hiraganaChar) {
            currentModalKana = hiraganaChar;
            const modal = document.getElementById('kanaStrokeModal');
            const backdrop = document.getElementById('kanaStrokeModalBackdrop');
            if (!modal) return;

            const activeDataset = getActiveKanaDataset();
            const numKanjiObj = (typeof NUMBER_KANJI_DATA !== 'undefined') ? NUMBER_KANJI_DATA.find(k => k.kanji === hiraganaChar) : null;
            const kanaObj = numKanjiObj ? { romaji: `${numKanjiObj.romaji} (${numKanjiObj.val})`, hiragana: numKanjiObj.kana, char: numKanjiObj.kanji } :
                            (activeDataset.find(k => (k.char || k.katakana || k.hiragana) === hiraganaChar) ||
                            HIRAGANA_DATA.find(k => k.hiragana === hiraganaChar) ||
                            KATAKANA_DATA.find(k => k.katakana === hiraganaChar) ||
                            { romaji: '', hiragana: hiraganaChar, char: hiraganaChar });
            const romajiEl = document.getElementById('modalKanaRomaji');
            const charEl = document.getElementById('modalKanaChar');
            if (romajiEl) romajiEl.textContent = (kanaObj.romaji || '').toUpperCase();
            if (charEl) charEl.textContent = hiraganaChar;

            // Reset position to center if first opened or not dragged
            if (!modal.dataset.hasBeenDragged) {
                modal.style.top = '50%';
                modal.style.left = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
            }

            modal.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
            modal.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
            if (backdrop) {
                backdrop.classList.remove('opacity-0', 'pointer-events-none');
                backdrop.classList.add('opacity-100', 'pointer-events-auto');
            }

            isModalAnimPlaying = true;
            updateModalPlayButtonUI();
            startKanaStrokeAnimation(hiraganaChar);
            initModalDraggable();
        }

        function closeKanaStrokeModal() {
            const modal = document.getElementById('kanaStrokeModal');
            const backdrop = document.getElementById('kanaStrokeModalBackdrop');
            if (modal) {
                modal.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
                modal.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            }
            if (backdrop) {
                backdrop.classList.remove('opacity-100', 'pointer-events-auto');
                backdrop.classList.add('opacity-0', 'pointer-events-none');
            }
            stopKanaStrokeAnimation();
        }

        function navKanaStrokeModal(delta) {
            if (typeof NUMBER_KANJI_DATA !== 'undefined' && NUMBER_KANJI_DATA.some(k => k.kanji === currentModalKana)) {
                const pool = NUMBER_KANJI_DATA;
                const curIdx = pool.findIndex(k => k.kanji === currentModalKana);
                const nextIdx = (curIdx + delta + pool.length) % pool.length;
                const nextChar = pool[nextIdx].kanji;
                currentModalKana = nextChar;
                if (typeof speakJapanese === 'function') speakJapanese(((pool[nextIdx].kana || nextChar).split('/')[0] || nextChar).trim());
                showKanaStrokeModal(nextChar);
                return;
            }
            const activeDataset = getActiveKanaDataset();
            const currentCatList = activeDataset.filter(k => k.category === state.currentCategory);
            const pool = currentCatList.length > 0 ? currentCatList : activeDataset;
            const curIdx = pool.findIndex(k => (k.char || k.katakana || k.hiragana) === currentModalKana);
            let nextIdx = (curIdx + delta + pool.length) % pool.length;
            const nextKana = pool[nextIdx];
            if (nextKana) {
                const nextChar = nextKana.char || nextKana.katakana || nextKana.hiragana;
                currentModalKana = nextChar;
                speakJapanese(nextChar);
                showKanaStrokeModal(nextChar);
            }
        }

        function playModalKanaAudio() {
            if (currentModalKana) {
                const numKanjiObj = (typeof NUMBER_KANJI_DATA !== 'undefined') ? NUMBER_KANJI_DATA.find(k => k.kanji === currentModalKana) : null;
                const spoken = numKanjiObj ? ((numKanjiObj.kana || currentModalKana).split('/')[0] || currentModalKana).trim() : currentModalKana;
                speakJapanese(spoken);
            }
        }

        function replayKanaStrokeAnimation() {
            isModalAnimPlaying = true;
            updateModalPlayButtonUI();
            startKanaStrokeAnimation(currentModalKana);
        }

        function toggleKanaStrokeAnimationPlay() {
            isModalAnimPlaying = !isModalAnimPlaying;
            updateModalPlayButtonUI();
            if (isModalAnimPlaying) {
                animateModalStrokeStep(currentModalKana, modalStrokeActiveIdx);
            } else {
                stopKanaStrokeAnimation();
            }
        }

        function updateModalPlayButtonUI() {
            const icon = document.getElementById('modalStrokePlayIcon');
            if (icon) {
                icon.className = isModalAnimPlaying ? 'fa-solid fa-pause text-base' : 'fa-solid fa-play text-base';
            }
        }

        function stopKanaStrokeAnimation() {
            if (modalAnimFrameId) {
                cancelAnimationFrame(modalAnimFrameId);
                modalAnimFrameId = null;
            }
            if (modalStrokeAnimTimeout) {
                clearTimeout(modalStrokeAnimTimeout);
                modalStrokeAnimTimeout = null;
            }
        }

        function startKanaStrokeAnimation(char) {
            stopKanaStrokeAnimation();
            modalStrokeActiveIdx = 0;

            const strokeVectors = getKanaStrokeVectors(char);
            const numStrokes = strokeVectors.length;

            // Render Ghost Silhouette Layer
            const ghostGroup = document.getElementById('modalStrokeGhost');
            if (ghostGroup) {
                ghostGroup.innerHTML = '';
                strokeVectors.forEach(v => {
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', v.pathStr);
                    path.setAttribute('transform', v.svgTransform || `scale(${KANJIVG_SCALE})`);
                    path.setAttribute('fill', 'none');
                    path.setAttribute('stroke', 'rgba(148, 163, 184, 0.22)');
                    path.setAttribute('stroke-width', String(v.ghostStrokeWidth || (6 / KANJIVG_SCALE)));
                    path.setAttribute('stroke-linecap', 'round');
                    path.setAttribute('stroke-linejoin', 'round');
                    ghostGroup.appendChild(path);
                });
            }

            // Clear past completed strokes & hide active tracer
            const completedGroup = document.getElementById('modalStrokeCompleted');
            if (completedGroup) completedGroup.innerHTML = '';

            const livePath = document.getElementById('modalStrokeActivePath');
            const liveCursor = document.getElementById('modalStrokeActiveCursor');
            if (livePath) livePath.style.display = 'none';
            if (liveCursor) liveCursor.style.display = 'none';

            const counterEl = document.getElementById('modalStrokeCounter');
            if (counterEl) counterEl.textContent = `Trazo 1/${numStrokes}`;

            animateModalStrokeStep(char, 0);
        }

        function animateModalStrokeStep(char, strokeIdx) {
            if (!isModalAnimPlaying) return;
            const strokeVectors = getKanaStrokeVectors(char);
            const numStrokes = strokeVectors.length;

            if (strokeIdx >= numStrokes) {
                // All strokes completed! Pause 1.5s to view complete character, then restart loop
                modalStrokeAnimTimeout = setTimeout(() => {
                    if (isModalAnimPlaying) {
                        startKanaStrokeAnimation(char);
                    }
                }, 1500);
                return;
            }

            modalStrokeActiveIdx = strokeIdx;
            const ref = strokeVectors[strokeIdx];
            const counterEl = document.getElementById('modalStrokeCounter');
            if (counterEl) counterEl.textContent = `Trazo ${strokeIdx + 1}/${numStrokes}`;

            const livePath = document.getElementById('modalStrokeActivePath');
            const liveCursor = document.getElementById('modalStrokeActiveCursor');
            if (!livePath || !liveCursor) return;

            livePath.setAttribute('d', ref.pathStr);
            livePath.setAttribute('transform', ref.svgTransform || `scale(${KANJIVG_SCALE})`);
            livePath.setAttribute('stroke', '#38bdf8');
            livePath.setAttribute('stroke-width', String(ref.strokeWidth || (8 / KANJIVG_SCALE)));
            livePath.style.display = 'block';

            liveCursor.setAttribute('fill', '#38bdf8');
            liveCursor.style.display = 'block';

            const scaleF = ref.scaleFactor || 1.0;
            const origLen = (ref.length / scaleF) / KANJIVG_SCALE;
            livePath.style.strokeDasharray = `${origLen} ${origLen}`;
            livePath.style.strokeDashoffset = `${origLen}`;

            const scaledLen = ref.length;
            const duration = Math.max(500, scaledLen * 2.2);
            let startTime = null;

            function drawFrame(now) {
                if (!isModalAnimPlaying) return;
                if (!startTime) startTime = now;
                const progress = Math.min(1.0, (now - startTime) / duration);

                // Progressive stroke unrolling in real time
                livePath.style.strokeDashoffset = `${origLen - (progress * origLen)}`;

                // Update glowing brush cursor along sampled points
                const ptIdx = Math.min(29, Math.floor(progress * 29));
                const pt = ref.points[ptIdx];
                if (pt) {
                    liveCursor.setAttribute('cx', pt.x);
                    liveCursor.setAttribute('cy', pt.y);
                }

                if (progress < 1.0) {
                    modalAnimFrameId = requestAnimationFrame(drawFrame);
                } else {
                    // Stroke completed! Add to completed strokes group so it stays visible
                    const completedGroup = document.getElementById('modalStrokeCompleted');
                    if (completedGroup) {
                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.setAttribute('d', ref.pathStr);
                        path.setAttribute('transform', ref.svgTransform || `scale(${KANJIVG_SCALE})`);
                        path.setAttribute('fill', 'none');
                        path.setAttribute('stroke', '#38bdf8');
                        path.setAttribute('stroke-width', String(ref.strokeWidth || (8 / KANJIVG_SCALE)));
                        path.setAttribute('stroke-linecap', 'round');
                        path.setAttribute('stroke-linejoin', 'round');
                        completedGroup.appendChild(path);
                    }

                    livePath.style.display = 'none';
                    liveCursor.style.display = 'none';

                    // Pause between strokes and proceed to next stroke
                    modalStrokeAnimTimeout = setTimeout(() => {
                        animateModalStrokeStep(char, strokeIdx + 1);
                    }, 300);
                }
            }

            modalAnimFrameId = requestAnimationFrame(drawFrame);
        }

        function initModalDraggable() {
            const modal = document.getElementById('kanaStrokeModal');
            const handle = document.getElementById('kanaStrokeModalHeader');
            if (!modal || !handle || handle.dataset.dragInit) return;
            handle.dataset.dragInit = 'true';

            handle.onpointerdown = (e) => {
                // Don't drag if clicking buttons
                if (e.target.closest('button')) return;

                isModalDragging = true;
                modal.dataset.hasBeenDragged = 'true';
                handle.setPointerCapture(e.pointerId);

                const rect = modal.getBoundingClientRect();
                modalDragStartX = e.clientX;
                modalDragStartY = e.clientY;
                modalInitialLeft = rect.left;
                modalInitialTop = rect.top;

                modal.style.transform = 'none';
                modal.style.left = `${rect.left}px`;
                modal.style.top = `${rect.top}px`;
            };

            handle.onpointermove = (e) => {
                if (!isModalDragging) return;
                const dx = e.clientX - modalDragStartX;
                const dy = e.clientY - modalDragStartY;

                let newLeft = modalInitialLeft + dx;
                let newTop = modalInitialTop + dy;

                const maxX = window.innerWidth - modal.offsetWidth - 10;
                const maxY = window.innerHeight - modal.offsetHeight - 10;

                newLeft = Math.max(10, Math.min(newLeft, maxX));
                newTop = Math.max(10, Math.min(newTop, maxY));

                modal.style.left = `${newLeft}px`;
                modal.style.top = `${newTop}px`;
            };

            handle.onpointerup = (e) => {
                if (isModalDragging) {
                    isModalDragging = false;
                    try { handle.releasePointerCapture(e.pointerId); } catch(err) {}
                }
            };

            handle.onpointercancel = () => {
                isModalDragging = false;
            };
        }
