// KotoDojo · Trazado guiado, a ciegas y dictado
        // ==========================================================
        // FASE 2, 3 & 4: DRAWING CONTROLLER (GUIDED, BLIND, DICTATION)
        // ==========================================================
        let isStrokePointerDown = false;
        let currentStrokeUserPoints = [];
        let activeSurfaceMode = 'draw'; // 'draw' | 'blind' | 'dictation'
        let peekAnimFrameId = null;
        let currentDrawCategory = 'gojuon';

        function filterDrawCategory(cat) {
            currentDrawCategory = cat;
            document.querySelectorAll('.drawcat-btn').forEach(btn => {
                btn.className = 'drawcat-btn flex-1 py-1 rounded-lg text-slate-400 hover:text-white transition';
            });
            const activeBtn = document.getElementById(`drawcat-${cat}`);
            if (activeBtn) {
                activeBtn.className = 'drawcat-btn flex-1 py-1 rounded-lg bg-sakura-600 text-white font-bold transition';
            }
            renderDrawKanaList();
        }

        function initStrokeDrawingMode(mode = 'draw') {
            activeSurfaceMode = mode;
            let svgId = 'drawSvgSurface';
            if (mode === 'blind') svgId = 'blindSvgSurface';
            else if (mode === 'dictation') svgId = 'dictationSvgSurface';

            const svgEl = document.getElementById(svgId);
            if (!svgEl) return;

            svgEl.onpointerdown = (e) => handleStrokePointerDown(e, mode);
            svgEl.onpointermove = (e) => handleStrokePointerMove(e, mode);
            svgEl.onpointerup = (e) => handleStrokePointerUp(e, mode);
            svgEl.onpointercancel = (e) => handleStrokePointerCancel(e, mode);

            if (mode === 'draw') {
                updateCustomPracticePoolBanner();
                renderPracticeGroupChips('drawGroupChipsContainer', 'draw');
                renderDrawKanaList();
                updateAutoAdvanceUI();
                const activePool = getActivePracticePool();
                if (!activePool.some(k => k.hiragana === state.selectedDrawingKana.hiragana)) {
                    nextDrawChallenge();
                } else {
                    loadCharacterForDrawing(state.selectedDrawingKana.hiragana, 'draw');
                }
            } else if (mode === 'blind') {
                renderPracticeGroupChips('blindGroupChipsContainer', 'blind');
                renderBlindSoundTiles();
                updateAutoAdvanceUI();
                const activePool = getActivePracticePool();
                if (!activePool.some(k => k.hiragana === state.selectedBlindKana.hiragana)) {
                    nextBlindChallenge();
                } else {
                    updateBlindTargetDisplay();
                    loadCharacterForDrawing(state.selectedBlindKana.hiragana, 'blind');
                }
            } else if (mode === 'dictation') {
                renderPracticeGroupChips('dictationGroupChipsContainer', 'dictation');
                updateAutoAdvanceUI();
                const activePool = getActivePracticePool();
                if (!activePool.some(k => k.hiragana === state.selectedDictationKana.hiragana)) {
                    nextDictationChallenge();
                } else {
                    loadCharacterForDrawing(state.selectedDictationKana.hiragana, 'dictation');
                }
            }
        }

        function renderDrawKanaList() {
            const container = document.getElementById('drawKanaList');
            if (!container) return;
            container.innerHTML = '';

            const activePool = getActivePracticePool();
            const countBadge = document.getElementById('drawPoolCountBadge');
            if (countBadge) countBadge.textContent = `${activePool.length} activos`;

            const selected = state.selectedDrawingKana;
            activePool.forEach(item => {
                const isCurrent = !!selected && selected.hiragana === item.hiragana;
                const btn = document.createElement('button');
                btn.className = `p-2 rounded-xl border text-center font-jp font-bold transition ${
                    item.hiragana.length > 1 ? 'text-sm' : 'text-lg'
                } ${
                    isCurrent
                        ? 'bg-sakura-600 text-white border-sakura-400 shadow-md scale-105'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`;
                btn.onclick = () => {
                    if (state.autoAdvanceTimeoutId) {
                        clearTimeout(state.autoAdvanceTimeoutId);
                        state.autoAdvanceTimeoutId = null;
                    }
                    state.selectedDrawingKana = item;
                    loadCharacterForDrawing(item.hiragana, 'draw');
                    renderDrawKanaList();
                    speakJapanese(item.hiragana);
                };
                btn.textContent = item.hiragana;
                container.appendChild(btn);
            });
        }

        function loadCharacterForDrawing(char, mode = 'draw') {
            const strokeVectors = getKanaStrokeVectors(char);
            const numStrokes = strokeVectors.length;

            let containerId = 'drawSvgContainer', svgId = 'drawSvgSurface', guidesId = 'drawGridGuides';
            if (mode === 'blind') {
                containerId = 'blindSvgContainer'; svgId = 'blindSvgSurface'; guidesId = 'blindGridGuides';
            } else if (mode === 'dictation') {
                containerId = 'dictationSvgContainer'; svgId = 'dictationSvgSurface'; guidesId = 'dictationGridGuides';
            }

            const container = document.getElementById(containerId);
            const svgEl = document.getElementById(svgId);
            const guidesEl = document.getElementById(guidesId);

            if (container && svgEl) {
                // ALWAYS Single Standard Square Box (300x300) for both single and compound kanas
                container.className = 'relative w-full max-w-[290px] sm:max-w-[320px] aspect-square transition-all duration-300';
                svgEl.setAttribute('viewBox', '0 0 300 300');
                if (guidesEl) {
                    guidesEl.innerHTML = `
                        <line x1="20" y1="150" x2="280" y2="150" stroke="rgba(100,116,139,0.35)" stroke-width="1.5" stroke-dasharray="3 3"></line>
                        <line x1="150" y1="20" x2="150" y2="280" stroke="rgba(100,116,139,0.35)" stroke-width="1.5" stroke-dasharray="3 3"></line>
                    `;
                }
            }

            if (mode === 'draw') {
                state.drawActiveStrokeIdx = 0;
                state.drawAcceptedStrokes = [];
                state.drawStrokeStates = Array(numStrokes).fill('pending');
                state.drawIsPeeking = false;

                const item = findKanaByChar(char) || { romaji: char };
                const elSym = document.getElementById('drawHeaderSymbol');
                if (elSym) elSym.textContent = char;
                const elRom = document.getElementById('drawHeaderRomaji');
                if (elRom) elRom.textContent = item.romaji.toUpperCase();

                renderStrokeOrderStepsList(char, numStrokes);
                renderStrokePills('draw', numStrokes, 0);
                renderGhostOutlines('draw', strokeVectors);
                renderAcceptedStrokes('draw');
                updateGuidanceArrow('draw', strokeVectors[0]);
                updateStrokeStatusMessage('draw', 0, numStrokes, strokeVectors);
            } else if (mode === 'blind') {
                state.blindActiveStrokeIdx = 0;
                state.blindAcceptedStrokes = [];
                state.blindStrokeStates = Array(numStrokes).fill('pending');
                state.blindIsPeeking = false;

                document.getElementById('blindAnswerCard').classList.add('hidden');
                renderStrokePills('blind', numStrokes, 0);
                renderAcceptedStrokes('blind');
                updateStrokeStatusMessage('blind', 0, numStrokes, strokeVectors);
            } else if (mode === 'dictation') {
                state.dictationActiveStrokeIdx = 0;
                state.dictationAcceptedStrokes = [];
                state.dictationStrokeStates = Array(numStrokes).fill('pending');
                state.dictationIsPeeking = false;

                document.getElementById('dictationAnswerCard').classList.add('hidden');
                renderStrokePills('dictation', numStrokes, 0);
                renderAcceptedStrokes('dictation');
                updateStrokeStatusMessage('dictation', 0, numStrokes, strokeVectors);
            }
        }

        function renderStrokeOrderStepsList(char, numStrokes) {
            const isCompound = char && char.length > 1;
            let steps = [];
            if (isCompound) {
                const char1 = char[0];
                const char2 = char[1];
                const paths1 = KANA_STROKES_SVG[char1] || [];
                const paths2 = KANA_STROKES_SVG[char2] || [];
                paths1.forEach((_, i) => steps.push(`Principal (${char1}): Trazo ${i+1}`));
                paths2.forEach((_, i) => steps.push(`Pequeño (${char2}): Trazo ${paths1.length + i + 1}`));
            } else {
                const info = STROKE_DATA[char];
                steps = info ? info.steps : Array.from({length: numStrokes}, (_, i) => `Trazo ${i+1}`);
            }

            document.getElementById('strokeCountBadge').textContent = `${numStrokes} ${numStrokes === 1 ? 'trazo' : 'trazos'}`;
            const stepsContainer = document.getElementById('strokeOrderSteps');
            if (stepsContainer) {
                stepsContainer.innerHTML = '';
                steps.forEach(step => {
                    const stepEl = document.createElement('div');
                    stepEl.className = 'flex items-start gap-1.5 text-slate-300';
                    stepEl.innerHTML = `<span class="text-amber-400 font-bold">•</span> <span>${step}</span>`;
                    stepsContainer.appendChild(stepEl);
                });
            }
        }

        function renderStrokePills(mode, total, currentIdx) {
            let pillsId = 'drawStrokePills';
            if (mode === 'blind') pillsId = 'blindStrokePills';
            else if (mode === 'dictation') pillsId = 'dictationStrokePills';

            const container = document.getElementById(pillsId);
            if (!container) return;
            container.innerHTML = '';

            let states = state.drawStrokeStates;
            if (mode === 'blind') states = state.blindStrokeStates;
            else if (mode === 'dictation') states = state.dictationStrokeStates;

            for (let i = 0; i < total; i++) {
                const pill = document.createElement('div');
                const st = states[i];
                const isCurrent = i === currentIdx;

                pill.className = `h-2.5 flex-1 rounded-full transition-all duration-300 ${
                    st === 'ok'
                        ? 'bg-matcha-500 shadow-sm shadow-matcha-500/40'
                        : (st === 'peeked' ? 'bg-amber-400 shadow-sm shadow-amber-400/40' : (isCurrent ? 'bg-slate-400 animate-pulse' : 'bg-slate-800 border border-slate-700/80'))
                }`;
                container.appendChild(pill);
            }
        }

        const KANJIVG_SCALE = OUR_VIEWBOX / KANJIVG_VIEWBOX; // ~2.752

        function renderGhostOutlines(mode, strokeVectors) {
            const ghostGroup = document.getElementById(mode === 'draw' ? 'drawGhostGroup' : null);
            if (!ghostGroup) return;
            ghostGroup.innerHTML = '';

            strokeVectors.forEach((v) => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', v.pathStr);
                path.setAttribute('transform', v.svgTransform || `scale(${KANJIVG_SCALE})`);
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', 'rgba(148, 163, 184, 0.25)');
                path.setAttribute('stroke-width', String(v.ghostStrokeWidth || (6 / KANJIVG_SCALE)));
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                ghostGroup.appendChild(path);
            });
        }

        function renderAcceptedStrokes(mode) {
            let groupId = 'drawAcceptedGroup';
            if (mode === 'blind') groupId = 'blindAcceptedGroup';
            else if (mode === 'dictation') groupId = 'dictationAcceptedGroup';

            const group = document.getElementById(groupId);
            if (!group) return;
            group.innerHTML = '';

            let accepted = state.drawAcceptedStrokes;
            if (mode === 'blind') accepted = state.blindAcceptedStrokes;
            else if (mode === 'dictation') accepted = state.dictationAcceptedStrokes;

            accepted.forEach(item => {
                const pathStr = typeof item === 'string' ? item : item.pathStr;
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathStr);
                path.setAttribute('transform', item.svgTransform || `scale(${KANJIVG_SCALE})`);
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', '#0ea5e9');
                path.setAttribute('stroke-width', String(item.strokeWidth || (8 / KANJIVG_SCALE)));
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                group.appendChild(path);
            });
        }

        function updateGuidanceArrow(mode, strokeVector) {
            const groupEl = document.getElementById(mode === 'draw' ? 'drawStartIndicatorGroup' : null);
            const arrowEl = document.getElementById(mode === 'draw' ? 'drawStartArrow' : null);
            const ringEl = document.getElementById(mode === 'draw' ? 'drawStartPulsingRing' : null);
            const circleEl = document.getElementById(mode === 'draw' ? 'drawStartCircle' : null);

            if (!groupEl && !arrowEl) return;

            if (!strokeVector) {
                if (groupEl) groupEl.style.display = 'none';
                else if (arrowEl) arrowEl.style.display = 'none';
                return;
            }
            const a = strokeVector.guideArrow;
            if (arrowEl) {
                arrowEl.setAttribute('x1', a.x1);
                arrowEl.setAttribute('y1', a.y1);
                arrowEl.setAttribute('x2', a.x2);
                arrowEl.setAttribute('y2', a.y2);
            }
            if (ringEl) {
                ringEl.setAttribute('cx', a.x1);
                ringEl.setAttribute('cy', a.y1);
            }
            if (circleEl) {
                circleEl.setAttribute('cx', a.x1);
                circleEl.setAttribute('cy', a.y1);
            }
            if (groupEl) groupEl.style.display = 'block';
            else if (arrowEl) arrowEl.style.display = 'block';
        }

        function updateStrokeStatusMessage(mode, activeIdx, total, strokeVectors = null) {
            let msgId = 'drawStatusMsg';
            if (mode === 'blind') msgId = 'blindStatusMsg';
            else if (mode === 'dictation') msgId = 'dictationStatusMsg';

            const msgEl = document.getElementById(msgId);
            if (!msgEl) return;

            if (activeIdx >= total) {
                msgEl.innerHTML = `<span class="text-matcha-400 font-bold">🎉 ¡Carácter completado con éxito!</span>`;
                return;
            }

            const curVec = strokeVectors && strokeVectors[activeIdx] ? strokeVectors[activeIdx] : null;
            const numSymbol = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'][activeIdx] || (activeIdx + 1);

            let partHint = '';
            if (curVec && curVec.charPart === 1 && total > 3) {
                partHint = ` en <strong class="text-amber-400 font-bold">${curVec.charName} (principal)</strong>`;
            } else if (curVec && curVec.charPart === 2) {
                partHint = ` en <strong class="text-sakura-400 font-bold">${curVec.charName} (pequeño)</strong>`;
            }

            if (mode === 'draw') {
                msgEl.innerHTML = `Dibuja el trazo <strong class="text-amber-300">${numSymbol}</strong>${partHint} siguiendo la flecha roja`;
            } else {
                msgEl.innerHTML = `Dibuja el trazo <strong class="text-sky-300">${numSymbol}</strong>${partHint} de memoria`;
            }
        }

        function getSvgPoint(e, svgEl) {
            const rect = svgEl.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return null;
            const viewBoxWidth = (svgEl.viewBox && svgEl.viewBox.baseVal && svgEl.viewBox.baseVal.width) || 300;
            const viewBoxHeight = (svgEl.viewBox && svgEl.viewBox.baseVal && svgEl.viewBox.baseVal.height) || 300;
            const x = ((e.clientX - rect.left) / rect.width) * viewBoxWidth;
            const y = ((e.clientY - rect.top) / rect.height) * viewBoxHeight;
            return {
                x: Math.max(0, Math.min(viewBoxWidth, x)),
                y: Math.max(0, Math.min(viewBoxHeight, y))
            };
        }

        function handleStrokePointerDown(e, mode) {
            let svgId = 'drawSvgSurface', pathId = 'drawLivePath';
            if (mode === 'blind') { svgId = 'blindSvgSurface'; pathId = 'blindLivePath'; }
            else if (mode === 'dictation') { svgId = 'dictationSvgSurface'; pathId = 'dictationLivePath'; }

            const svgEl = document.getElementById(svgId);
            const pt = getSvgPoint(e, svgEl);
            if (!pt) return;

            let char = state.selectedDrawingKana.hiragana;
            let activeIdx = state.drawActiveStrokeIdx;
            if (mode === 'blind') { char = state.selectedBlindKana.hiragana; activeIdx = state.blindActiveStrokeIdx; }
            else if (mode === 'dictation') { char = state.selectedDictationKana.hiragana; activeIdx = state.dictationActiveStrokeIdx; }

            const strokeVectors = getKanaStrokeVectors(char);
            if (activeIdx >= strokeVectors.length) {
                // If user taps the canvas after finishing character, restart cleanly!
                resetStrokeDrawing(mode);
                activeIdx = 0;
            }

            isStrokePointerDown = true;
            currentStrokeUserPoints = [pt];
            try { svgEl.setPointerCapture(e.pointerId); } catch(err) {}

            const pathEl = document.getElementById(pathId);
            if (pathEl) pathEl.setAttribute('d', pointsToSmoothSvgPath(currentStrokeUserPoints));
        }

        function handleStrokePointerMove(e, mode) {
            if (!isStrokePointerDown) return;
            let svgId = 'drawSvgSurface', pathId = 'drawLivePath';
            if (mode === 'blind') { svgId = 'blindSvgSurface'; pathId = 'blindLivePath'; }
            else if (mode === 'dictation') { svgId = 'dictationSvgSurface'; pathId = 'dictationLivePath'; }

            const svgEl = document.getElementById(svgId);
            const pt = getSvgPoint(e, svgEl);
            if (!pt) return;

            const prev = currentStrokeUserPoints[currentStrokeUserPoints.length - 1];
            if (prev && Math.hypot(pt.x - prev.x, pt.y - prev.y) < 2) return;

            currentStrokeUserPoints.push(pt);
            const pathEl = document.getElementById(pathId);
            if (pathEl) pathEl.setAttribute('d', pointsToSmoothSvgPath(currentStrokeUserPoints));
        }

        function handleStrokePointerUp(e, mode) {
            if (!isStrokePointerDown) return;
            isStrokePointerDown = false;

            let svgId = 'drawSvgSurface', pathId = 'drawLivePath';
            if (mode === 'blind') { svgId = 'blindSvgSurface'; pathId = 'blindLivePath'; }
            else if (mode === 'dictation') { svgId = 'dictationSvgSurface'; pathId = 'dictationLivePath'; }

            const svgEl = document.getElementById(svgId);
            try { svgEl.releasePointerCapture(e.pointerId); } catch(err) {}

            const pathEl = document.getElementById(pathId);
            if (pathEl) pathEl.setAttribute('d', '');

            let char = state.selectedDrawingKana.hiragana;
            let activeIdx = state.drawActiveStrokeIdx;
            if (mode === 'blind') { char = state.selectedBlindKana.hiragana; activeIdx = state.blindActiveStrokeIdx; }
            else if (mode === 'dictation') { char = state.selectedDictationKana.hiragana; activeIdx = state.dictationActiveStrokeIdx; }

            const strokeVectors = getKanaStrokeVectors(char);
            if (activeIdx >= strokeVectors.length) {
                // If user taps the canvas after finishing character, restart cleanly!
                resetStrokeDrawing(mode);
                activeIdx = 0;
            }

            const refStroke = strokeVectors[activeIdx];
            const diag = diagnoseUserStroke(currentStrokeUserPoints, refStroke, state.strokeStrictness);

            if (diag.ok) {
                // Correct Stroke
                state.consecutiveStrokeFails = 0;
                triggerHaptic('success');
                playSoundTone(659.25, 'sine', 0.15);
                svgEl.classList.add('surface-ok');
                setTimeout(() => svgEl.classList.remove('surface-ok'), 200);

                if (mode === 'draw') {
                    state.drawAcceptedStrokes.push(refStroke);
                    if (state.drawStrokeStates[activeIdx] !== 'peeked') state.drawStrokeStates[activeIdx] = 'ok';
                    state.drawActiveStrokeIdx++;
                    renderAcceptedStrokes('draw');
                    renderStrokePills('draw', strokeVectors.length, state.drawActiveStrokeIdx);
                    updateGuidanceArrow('draw', strokeVectors[state.drawActiveStrokeIdx]);
                    updateStrokeStatusMessage('draw', state.drawActiveStrokeIdx, strokeVectors.length, strokeVectors);

                    if (state.drawActiveStrokeIdx >= strokeVectors.length) {
                        onCharacterDrawingComplete('draw', char);
                    }
                } else if (mode === 'blind') {
                    state.blindAcceptedStrokes.push(refStroke);
                    if (state.blindStrokeStates[activeIdx] !== 'peeked') state.blindStrokeStates[activeIdx] = 'ok';
                    state.blindActiveStrokeIdx++;
                    renderAcceptedStrokes('blind');
                    renderStrokePills('blind', strokeVectors.length, state.blindActiveStrokeIdx);
                    updateStrokeStatusMessage('blind', state.blindActiveStrokeIdx, strokeVectors.length, strokeVectors);

                    if (state.blindActiveStrokeIdx >= strokeVectors.length) {
                        onCharacterDrawingComplete('blind', char);
                    }
                } else if (mode === 'dictation') {
                    state.dictationAcceptedStrokes.push(refStroke);
                    if (state.dictationStrokeStates[activeIdx] !== 'peeked') state.dictationStrokeStates[activeIdx] = 'ok';
                    state.dictationActiveStrokeIdx++;
                    renderAcceptedStrokes('dictation');
                    renderStrokePills('dictation', strokeVectors.length, state.dictationActiveStrokeIdx);
                    updateStrokeStatusMessage('dictation', state.dictationActiveStrokeIdx, strokeVectors.length, strokeVectors);

                    if (state.dictationActiveStrokeIdx >= strokeVectors.length) {
                        onCharacterDrawingComplete('dictation', char);
                    }
                }
            } else {
                // Wrong stroke - Tiered feedback
                state.consecutiveStrokeFails = (state.consecutiveStrokeFails || 0) + 1;
                triggerHaptic('error');
                playSoundTone(220, 'sawtooth', 0.25);
                svgEl.classList.add('surface-bad');
                setTimeout(() => svgEl.classList.remove('surface-bad'), 250);

                if (state.srs && state.srs[char]) {
                    state.srs[char].reviews = (state.srs[char].reviews || 0) + 1;
                    state.srs[char].errors = (state.srs[char].errors || 0) + 1;
                    state.srs[char].consecutive = 0;
                    state.srs[char].box = 1;
                    state.srs[char].lastReviewed = Date.now();
                    saveStateToStorage();
                }

                let msgId = 'drawStatusMsg';
                if (mode === 'blind') msgId = 'blindStatusMsg';
                else if (mode === 'dictation') msgId = 'dictationStatusMsg';

                const msgEl = document.getElementById(msgId);
                if (msgEl) {
                    msgEl.innerHTML = `<span class="text-rose-400 font-bold">${diag.msg}</span>`;
                    setTimeout(() => {
                        const curIdx = mode === 'draw' ? state.drawActiveStrokeIdx : (mode === 'blind' ? state.blindActiveStrokeIdx : state.dictationActiveStrokeIdx);
                        updateStrokeStatusMessage(mode, curIdx, strokeVectors.length, strokeVectors);
                    }, 2200);
                }
                showToast(diag.msg, 'error');

                // Tier 2: 2nd fail -> Auto peek stroke
                if (state.consecutiveStrokeFails === 2) {
                    setTimeout(() => peekActiveStroke(mode), 250);
                }
                // Tier 3: 3rd fail or more -> Open feedback & coaching modal
                else if (state.consecutiveStrokeFails >= 3) {
                    setTimeout(() => openFeedbackModal(char, activeIdx, diag.reason), 300);
                }
            }

            currentStrokeUserPoints = [];
        }

        function handleStrokePointerCancel(e, mode) {
            isStrokePointerDown = false;
            currentStrokeUserPoints = [];
            let pathId = 'drawLivePath';
            if (mode === 'blind') pathId = 'blindLivePath';
            else if (mode === 'dictation') pathId = 'dictationLivePath';
            const pathEl = document.getElementById(pathId);
            if (pathEl) pathEl.setAttribute('d', '');
        }

        function resetStrokeDrawing(mode = 'draw') {
            let char = state.selectedDrawingKana.hiragana;
            if (mode === 'blind') char = state.selectedBlindKana.hiragana;
            else if (mode === 'dictation') char = state.selectedDictationKana.hiragana;
            loadCharacterForDrawing(char, mode);
        }

        // ==========================================================
        // 3. CONTROL DEL MODAL DE NEMOTECNIA Y COACHING (#feedbackModal)
        // ==========================================================
        let activeFeedbackModalMode = 'draw';

        function openFeedbackModal(char, strokeIdx, lastReason) {
            activeFeedbackModalMode = state.currentTab || 'draw';
            if (activeFeedbackModalMode !== 'draw' && activeFeedbackModalMode !== 'blind' && activeFeedbackModalMode !== 'dictation') {
                activeFeedbackModalMode = 'draw';
            }
            const guide = getKanaFeedbackGuide(char);
            const item = findKanaByChar(char) || { romaji: char };

            const displayEl = document.getElementById('modalKanaDisplay');
            const titleEl = document.getElementById('modalKanaTitle');
            const mnemonicEl = document.getElementById('modalMnemonicText');
            const mistakeEl = document.getElementById('modalCommonMistake');
            const modalEl = document.getElementById('feedbackModal');

            if (displayEl) displayEl.textContent = char;
            if (titleEl) titleEl.textContent = `Carácter: ${item.romaji ? item.romaji.toUpperCase() : ''} (${char})`;
            if (mnemonicEl) mnemonicEl.textContent = guide.mnemonic;
            if (mistakeEl) mistakeEl.textContent = guide.commonMistake;

            if (modalEl) modalEl.classList.remove('hidden');
            speakJapanese(char);
        }

        function closeFeedbackModal() {
            const modalEl = document.getElementById('feedbackModal');
            if (modalEl) modalEl.classList.add('hidden');
            state.consecutiveStrokeFails = 0;
        }

        function playCurrentModalSound() {
            const displayEl = document.getElementById('modalKanaDisplay');
            const char = displayEl ? displayEl.textContent : '';
            if (char) speakJapanese(char);
        }

        function retryCurrentKanaWithHint() {
            closeFeedbackModal();
            const mode = activeFeedbackModalMode || 'draw';
            resetStrokeDrawing(mode);
            setTimeout(() => peekActiveStroke(mode), 150);
        }

        function onCharacterDrawingComplete(mode, char) {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }

            const earnedXP = mode === 'draw' ? 15 : (mode === 'blind' ? 25 : 30);
            addXP(earnedXP);
            speakJapanese(char);
            playSoundTone(523.25, 'sine', 0.15);
            setTimeout(() => playSoundTone(784, 'sine', 0.25), 120);

            // Record to SRS
            recordKanaResult(char, true);

            showToast(`¡Excelente! Has completado "${char}" con trazos perfectos (+${earnedXP} XP)`, 'success');

            if (mode === 'blind') {
                const card = document.getElementById('blindAnswerCard');
                if (card) {
                    document.getElementById('blindAnswerSymbol').textContent = char;
                    const strokeInfo = STROKE_DATA[char];
                    const countStr = strokeInfo ? `${strokeInfo.count} trazo(s)` : 'Trazos estándar';
                    document.getElementById('blindAnswerStrokeInfo').textContent = `Sonido "${state.selectedBlindKana.romaji.toUpperCase()}" • ${countStr}`;
                    card.classList.remove('hidden');
                }
            } else if (mode === 'dictation') {
                const card = document.getElementById('dictationAnswerCard');
                if (card) {
                    document.getElementById('dictationAnswerSymbol').textContent = char;
                    document.getElementById('dictationAnswerRomaji').textContent = `Romaji: ${state.selectedDictationKana.romaji.toUpperCase()}`;
                    card.classList.remove('hidden');
                }
            }

            // Automatic next random character if enabled
            if (state.autoAdvanceDrawing) {
                state.autoAdvanceTimeoutId = setTimeout(() => {
                    if (mode === 'draw') nextDrawChallenge();
                    else if (mode === 'blind') nextBlindChallenge();
                    else if (mode === 'dictation') nextDictationChallenge();
                }, 1100);
            }
        }

        function peekActiveStroke(mode = 'draw') {
            if (peekAnimFrameId) cancelAnimationFrame(peekAnimFrameId);

            let char = state.selectedDrawingKana.hiragana;
            let activeIdx = state.drawActiveStrokeIdx;
            if (mode === 'blind') { char = state.selectedBlindKana.hiragana; activeIdx = state.blindActiveStrokeIdx; }
            else if (mode === 'dictation') { char = state.selectedDictationKana.hiragana; activeIdx = state.dictationActiveStrokeIdx; }

            const strokeVectors = getKanaStrokeVectors(char);
            if (activeIdx >= strokeVectors.length) {
                resetStrokeDrawing(mode);
                activeIdx = 0;
            }

            const refStroke = strokeVectors[activeIdx];
            if (mode === 'draw') {
                state.drawStrokeStates[activeIdx] = 'peeked';
                renderStrokePills('draw', strokeVectors.length, activeIdx);
            } else if (mode === 'blind') {
                state.blindStrokeStates[activeIdx] = 'peeked';
                renderStrokePills('blind', strokeVectors.length, activeIdx);
            } else if (mode === 'dictation') {
                state.dictationStrokeStates[activeIdx] = 'peeked';
                renderStrokePills('dictation', strokeVectors.length, activeIdx);
            }

            let pathId = 'drawPeekPath', cursorId = 'drawPeekCursor';
            if (mode === 'blind') { pathId = 'blindPeekPath'; cursorId = 'blindPeekCursor'; }
            else if (mode === 'dictation') { pathId = 'dictationPeekPath'; cursorId = 'dictationPeekCursor'; }

            const pathEl = document.getElementById(pathId);
            const cursorEl = document.getElementById(cursorId);

            pathEl.setAttribute('d', refStroke.pathStr);
            pathEl.setAttribute('transform', refStroke.svgTransform || `scale(${KANJIVG_SCALE})`);
            pathEl.setAttribute('stroke-width', String(refStroke.ghostStrokeWidth || (6 / KANJIVG_SCALE)));
            pathEl.style.display = 'block';
            cursorEl.style.display = 'block';

            const scaleF = refStroke.scaleFactor || 1.0;
            const origLen = (refStroke.length / scaleF) / KANJIVG_SCALE;
            pathEl.style.strokeDasharray = `${origLen} ${origLen}`;
            pathEl.style.strokeDashoffset = `${origLen}`;

            const scaledLen = refStroke.length;
            let startTime = null;
            const duration = Math.max(550, scaledLen * 2.2);

            function animatePeek(time) {
                if (!startTime) startTime = time;
                const progress = Math.min(1.0, (time - startTime) / duration);

                pathEl.style.strokeDashoffset = `${origLen - (progress * origLen)}`;

                const pt = refStroke.points[Math.min(29, Math.floor(progress * 29))];
                if (pt) {
                    cursorEl.setAttribute('cx', pt.x);
                    cursorEl.setAttribute('cy', pt.y);
                }

                if (progress < 1.0) {
                    peekAnimFrameId = requestAnimationFrame(animatePeek);
                } else {
                    setTimeout(() => {
                        pathEl.style.display = 'none';
                        cursorEl.style.display = 'none';
                    }, 600);
                }
            }

            peekAnimFrameId = requestAnimationFrame(animatePeek);
        }

        function playCurrentKanaSound() {
            speakJapanese(state.selectedDrawingKana.hiragana);
        }

        // ==========================================================
        // SHARED SOUND GROUPS, PRESETS & AUTO-ADVANCE FOR DRAWING
        // ==========================================================
        function getActivePracticePool() {
            if (state.customPracticePool && state.customPracticePool.length > 0) {
                return state.customPracticePool;
            }
            const activeData = getActiveKanaDataset();
            const isKata = state.currentSyllabary === 'katakana';
            const selectedGroups = isKata
                ? (state.practiceSelectedGroups_katakana || ['a', 'ka'])
                : (state.practiceSelectedGroups || ['a', 'ka']);
            if (!selectedGroups || selectedGroups.length === 0) {
                return activeData.filter(k => k.group === 'a');
            }
            return activeData.filter(k => selectedGroups.includes(k.group));
        }

        function updateCustomPracticePoolBanner() {
            const banner = document.getElementById('drawCustomPoolBanner');
            const text = document.getElementById('drawCustomPoolText');
            if (!banner) return;
            if (state.customPracticePool && state.customPracticePool.length > 0) {
                banner.classList.remove('hidden');
                if (text) text.textContent = state.customPracticeTitle || 'Mochila de Puntos Débiles Activa';
            } else {
                banner.classList.add('hidden');
            }
        }

        function clearCustomPracticePool(mode = 'draw') {
            state.customPracticePool = null;
            state.customPracticeTitle = null;
            updateCustomPracticePoolBanner();
            refreshAllDrawingGroupUIs();
            if (mode === 'draw') nextDrawChallenge();
            else if (mode === 'blind') nextBlindChallenge();
            else if (mode === 'dictation') nextDictationChallenge();
            showToast("Volviste a la selección estándar de grupos", "info");
        }

        function renderPracticeGroupChips(containerId, mode) {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';

            const groups = getActiveSoundGroups();
            const isKata = state.currentSyllabary === 'katakana';
            const selectedGroups = isKata
                ? (state.practiceSelectedGroups_katakana || ['a', 'ka'])
                : (state.practiceSelectedGroups || ['a', 'ka']);

            groups.forEach(group => {
                const isActive = selectedGroups.includes(group.id);
                const chip = document.createElement('button');
                chip.className = `px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 border whitespace-nowrap ${
                    isActive
                        ? 'bg-sakura-600 text-white border-sakura-400 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                }`;
                const label = (mode === 'blind' || mode === 'dictation') ? (group.romaLabel || group.id.toUpperCase()) : group.name;
                chip.innerHTML = `${isActive ? '<i class="fa-solid fa-check text-[10px]"></i> ' : ''}${label}`;
                chip.onclick = () => togglePracticeGroup(group.id, mode);
                container.appendChild(chip);
            });
        }

        function togglePracticeGroup(groupId, mode) {
            // Clearing custom pool if active to return to group browsing
            state.customPracticePool = null;
            state.customPracticeTitle = null;
            updateCustomPracticePoolBanner();

            const isKata = state.currentSyllabary === 'katakana';
            const list = isKata
                ? (state.practiceSelectedGroups_katakana = state.practiceSelectedGroups_katakana || ['a', 'ka'])
                : (state.practiceSelectedGroups = state.practiceSelectedGroups || ['a', 'ka']);

            const idx = list.indexOf(groupId);
            if (idx > -1) {
                if (list.length > 1) {
                    list.splice(idx, 1);
                } else {
                    showToast("Debe haber al menos un grupo de sonidos activo", "info");
                    return;
                }
            } else {
                list.push(groupId);
            }

            saveStateToStorage();
            refreshAllDrawingGroupUIs();

            if (mode === 'draw') nextDrawChallenge();
            else if (mode === 'blind') nextBlindChallenge();
            else if (mode === 'dictation') nextDictationChallenge();
        }

        function setPracticePreset(presetKey, mode) {
            // Clearing custom pool if active to return to group browsing
            state.customPracticePool = null;
            state.customPracticeTitle = null;
            updateCustomPracticePoolBanner();

            const groups = getActiveSoundGroups();
            let newGroups = [];
            if (presetKey === 'a') {
                newGroups = ['a'];
            } else if (presetKey === 'ka') {
                newGroups = ['ka'];
            } else if (presetKey === 'a_ka') {
                newGroups = ['a', 'ka'];
            } else if (presetKey === 'allBasic') {
                newGroups = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'];
            } else if (presetKey === 'dakuten') {
                newGroups = ['ga', 'za', 'da', 'ba', 'pa'];
            } else if (presetKey === 'youon') {
                newGroups = ['kya', 'sha', 'cha', 'nya', 'hya', 'mya', 'rya', 'gya', 'ja', 'dya', 'bya', 'pya'];
            } else if (presetKey === 'all') {
                newGroups = groups.map(g => g.id);
            } else if (presetKey === 'kanjiNumbers') {
                state.customPracticePool = NUMBER_KANJI_DATA.map(k => ({
                    hiragana: k.kanji,
                    katakana: k.kanji,
                    char: k.kanji,
                    romaji: `${k.romaji} (${k.val})`,
                    meaning: k.note
                }));
                state.customPracticeTitle = '🔢 Práctica de Trazos: Números y Tiempo en Kanji';
                updateCustomPracticePoolBanner();
                refreshAllDrawingGroupUIs();
                if (mode === 'draw') nextDrawChallenge();
                else if (mode === 'blind') nextBlindChallenge();
                else if (mode === 'dictation') nextDictationChallenge();
                showToast("Activada práctica de Números y Tiempo en Kanji", "success");
                return;
            }

            if (state.currentSyllabary === 'katakana') {
                state.practiceSelectedGroups_katakana = newGroups;
            } else {
                state.practiceSelectedGroups = newGroups;
            }

            saveStateToStorage();
            refreshAllDrawingGroupUIs();

            if (mode === 'draw') nextDrawChallenge();
            else if (mode === 'blind') nextBlindChallenge();
            else if (mode === 'dictation') nextDictationChallenge();

            showToast("Grupo de sonidos actualizado", "info");
        }

        function toggleAutoAdvanceDrawing() {
            state.autoAdvanceDrawing = !state.autoAdvanceDrawing;
            saveStateToStorage();
            updateAutoAdvanceUI();
            showToast(state.autoAdvanceDrawing ? "⚡ Auto-avanzar activado" : "Auto-avanzar desactivado", "info");
        }

        function updateAutoAdvanceUI() {
            ['draw', 'blind', 'dictation'].forEach(m => {
                const btn = document.getElementById(`${m}AutoAdvanceBtn`);
                if (btn) {
                    btn.innerHTML = state.autoAdvanceDrawing
                        ? '<i class="fa-solid fa-bolt text-emerald-400"></i> <span>Auto-Avanzar: ON</span>'
                        : '<i class="fa-solid fa-pause text-slate-400"></i> <span>Auto-Avanzar: OFF</span>';
                    btn.className = state.autoAdvanceDrawing
                        ? 'px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm'
                        : 'px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-400 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95';
                }
            });
        }

        function refreshAllDrawingGroupUIs() {
            renderPracticeGroupChips('drawGroupChipsContainer', 'draw');
            renderDrawKanaList();
            renderPracticeGroupChips('blindGroupChipsContainer', 'blind');
            renderBlindSoundTiles();
            renderPracticeGroupChips('dictationGroupChipsContainer', 'dictation');
            updateAutoAdvanceUI();
        }


        function getKanaIndexInActivePool(char) {
            const pool = getActivePracticePool();
            return pool.findIndex(k => k.hiragana === char);
        }

        function nextDrawKana() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const pool = getActivePracticePool();
            if (pool.length === 0) return;
            let idx = getKanaIndexInActivePool(state.selectedDrawingKana.hiragana);
            idx = (idx + 1) % pool.length;
            state.selectedDrawingKana = pool[idx];
            loadCharacterForDrawing(pool[idx].hiragana, 'draw');
            renderDrawKanaList();
            speakJapanese(pool[idx].hiragana);
        }

        function prevDrawKana() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const pool = getActivePracticePool();
            if (pool.length === 0) return;
            let idx = getKanaIndexInActivePool(state.selectedDrawingKana.hiragana);
            idx = (idx - 1 + pool.length) % pool.length;
            state.selectedDrawingKana = pool[idx];
            loadCharacterForDrawing(pool[idx].hiragana, 'draw');
            renderDrawKanaList();
            speakJapanese(pool[idx].hiragana);
        }

        function nextBlindKana() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const pool = getActivePracticePool();
            if (pool.length === 0) return;
            let idx = getKanaIndexInActivePool(state.selectedBlindKana.hiragana);
            idx = (idx + 1) % pool.length;
            selectSpecificBlindSound(pool[idx]);
        }

        function prevBlindKana() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const pool = getActivePracticePool();
            if (pool.length === 0) return;
            let idx = getKanaIndexInActivePool(state.selectedBlindKana.hiragana);
            idx = (idx - 1 + pool.length) % pool.length;
            selectSpecificBlindSound(pool[idx]);
        }
        function nextDrawChallenge() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const pool = getActivePracticePool();
            let candidates = pool;
            if (pool.length > 1 && state.selectedDrawingKana) {
                candidates = pool.filter(k => k.hiragana !== state.selectedDrawingKana.hiragana);
            }
            const chosen = getSRSWeightedKana(candidates.length > 0 ? candidates : pool);
            state.selectedDrawingKana = chosen;
            loadCharacterForDrawing(chosen.hiragana, 'draw');
            renderDrawKanaList();
            speakJapanese(chosen.hiragana);
        }

        function nextBlindChallenge() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const pool = getActivePracticePool();
            let candidates = pool;
            if (pool.length > 1 && state.selectedBlindKana) {
                candidates = pool.filter(k => k.hiragana !== state.selectedBlindKana.hiragana);
            }
            const chosen = getSRSWeightedKana(candidates.length > 0 ? candidates : pool);
            state.selectedBlindKana = chosen;
            updateBlindTargetDisplay();
            renderBlindSoundTiles();
            loadCharacterForDrawing(chosen.hiragana, 'blind');
            speakJapanese(chosen.hiragana);
        }

        function nextDictationChallenge() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const pool = getActivePracticePool();
            let candidates = pool;
            if (pool.length > 1 && state.selectedDictationKana) {
                candidates = pool.filter(k => k.hiragana !== state.selectedDictationKana.hiragana);
            }
            const chosen = getSRSWeightedKana(candidates.length > 0 ? candidates : pool);
            state.selectedDictationKana = chosen;
            loadCharacterForDrawing(chosen.hiragana, 'dictation');
            renderPracticeGroupChips('dictationGroupChipsContainer', 'dictation');
            playDictationAudio();
        }

        // ==========================================================
        // TRAZADO A CIEGAS (SELECCIÓN Y FILTROS)
        // ==========================================================
        function initBlindDrawing() {
            renderPracticeGroupChips('blindGroupChipsContainer', 'blind');
            renderBlindSoundTiles();
            updateAutoAdvanceUI();

            const activePool = getActivePracticePool();
            if (!activePool.some(k => k.hiragana === state.selectedBlindKana.hiragana)) {
                nextBlindChallenge();
            } else {
                updateBlindTargetDisplay();
                loadCharacterForDrawing(state.selectedBlindKana.hiragana, 'blind');
            }

            initStrokeDrawingMode('blind');
        }

        function renderBlindSoundTiles() {
            const container = document.getElementById('blindSoundTilesContainer');
            if (!container) return;
            container.innerHTML = '';

            const activePool = getActivePracticePool();
            const countText = document.getElementById('blindPoolCountText');
            if (countText) countText.textContent = `${activePool.length} sonidos activos`;

            activePool.forEach(item => {
                const isCurrent = state.selectedBlindKana.hiragana === item.hiragana;
                const tile = document.createElement('button');
                tile.className = `px-3 py-1.5 rounded-lg text-xs font-bold transition font-mono uppercase border ${
                    isCurrent
                        ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md font-black scale-105'
                        : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`;
                tile.textContent = item.romaji;
                tile.onclick = () => selectSpecificBlindSound(item);
                container.appendChild(tile);
            });
        }

        function selectSpecificBlindSound(item) {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            state.selectedBlindKana = item;
            updateBlindTargetDisplay();
            renderBlindSoundTiles();
            loadCharacterForDrawing(item.hiragana, 'blind');
            speakJapanese(item.hiragana);
        }

        function updateBlindTargetDisplay() {
            const item = state.selectedBlindKana;
            document.getElementById('blindTargetRomaji').textContent = item.romaji.toUpperCase();
            const groupObj = SOUND_GROUPS.find(g => g.id === item.group);
            const romaLabel = groupObj ? (groupObj.romaLabel || groupObj.id.toUpperCase()) : (item.romaji ? item.romaji.toUpperCase() : '');
            document.getElementById('blindCategoryBadge').textContent = `Fila: ${romaLabel}`;
        }

        function playBlindKanaSound() {
            speakJapanese(state.selectedBlindKana.hiragana);
        }

        function revealBlindAnswerManually() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const char = state.selectedBlindKana.hiragana;
            const strokeVectors = getKanaStrokeVectors(char);
            state.blindAcceptedStrokes = strokeVectors.map(v => ({ pathStr: v.pathStr, offsetX: v.offsetX || 0 }));
            state.blindActiveStrokeIdx = strokeVectors.length;
            renderAcceptedStrokes('blind');
            renderStrokePills('blind', strokeVectors.length, strokeVectors.length);
            updateStrokeStatusMessage('blind', strokeVectors.length, strokeVectors.length, strokeVectors);

            const card = document.getElementById('blindAnswerCard');
            document.getElementById('blindAnswerSymbol').textContent = char;
            const strokeInfo = STROKE_DATA[char];
            const countStr = strokeInfo ? `${strokeInfo.count} trazo(s)` : `${strokeVectors.length} trazos`;
            document.getElementById('blindAnswerStrokeInfo').textContent = `Sonido "${state.selectedBlindKana.romaji.toUpperCase()}" • ${countStr}`;
            card.classList.remove('hidden');

            recordKanaResult(char, false);
            speakJapanese(char);
        }

        // ==========================================================
        // DICTADO PURO (AUDIO -> TRAZO) [NUEVO]
        // ==========================================================
        function initDictationDrawing() {
            renderPracticeGroupChips('dictationGroupChipsContainer', 'dictation');
            updateAutoAdvanceUI();
            const activePool = getActivePracticePool();
            if (!activePool.some(k => k.hiragana === state.selectedDictationKana.hiragana)) {
                nextDictationChallenge();
            } else {
                loadCharacterForDrawing(state.selectedDictationKana.hiragana, 'dictation');
                playDictationAudio();
            }
            initStrokeDrawingMode('dictation');
        }

        function playDictationAudio() {
            speakJapanese(state.selectedDictationKana.hiragana);
        }

        function revealDictationSolution() {
            if (state.autoAdvanceTimeoutId) {
                clearTimeout(state.autoAdvanceTimeoutId);
                state.autoAdvanceTimeoutId = null;
            }
            const char = state.selectedDictationKana.hiragana;
            const strokeVectors = getKanaStrokeVectors(char);
            state.dictationAcceptedStrokes = strokeVectors.map(v => ({ pathStr: v.pathStr, offsetX: v.offsetX || 0 }));
            state.dictationActiveStrokeIdx = strokeVectors.length;
            renderAcceptedStrokes('dictation');
            renderStrokePills('dictation', strokeVectors.length, strokeVectors.length);
            updateStrokeStatusMessage('dictation', strokeVectors.length, strokeVectors.length, strokeVectors);

            const card = document.getElementById('dictationAnswerCard');
            document.getElementById('dictationAnswerSymbol').textContent = char;
            document.getElementById('dictationAnswerRomaji').textContent = `Romaji: ${state.selectedDictationKana.romaji.toUpperCase()}`;
            card.classList.remove('hidden');

            recordKanaResult(char, false);
            speakJapanese(char);
        }
