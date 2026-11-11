// KotoDojo · Fase 1: tabla de estudio
        // ==========================================================
        // FASE 1: MATRIZ DE ESTUDIO (GOJŪON-ZU POR FILAS Y COLUMNAS)
        // ==========================================================
        const GOJUON_MATRIX_ROWS = [
            { id: 'a', name: 'Fila A', sub: 'Vocales', chars: ['あ', 'い', 'う', 'え', 'お'] },
            { id: 'ka', name: 'Fila Ka', sub: 'K', chars: ['か', 'き', 'く', 'け', 'こ'] },
            { id: 'sa', name: 'Fila Sa', sub: 'S', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
            { id: 'ta', name: 'Fila Ta', sub: 'T', chars: ['た', 'ち', 'つ', 'て', 'と'] },
            { id: 'na', name: 'Fila Na', sub: 'N', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
            { id: 'ha', name: 'Fila Ha', sub: 'H', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
            { id: 'ma', name: 'Fila Ma', sub: 'M', chars: ['ま', 'み', 'む', 'め', 'も'] },
            { id: 'ya', name: 'Fila Ya', sub: 'Y', chars: ['や', null, 'ゆ', null, 'よ'] },
            { id: 'ra', name: 'Fila Ra', sub: 'R', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
            { id: 'wa', name: 'Fila Wa', sub: 'W', chars: ['わ', null, null, null, 'を'] },
            { id: 'n', name: 'Fila N', sub: 'Nasal', chars: ['ん', null, null, null, null] }
        ];

        const DAKUTEN_MATRIX_ROWS = [
            { id: 'ga', name: 'Fila Ga', sub: 'G', chars: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
            { id: 'za', name: 'Fila Za', sub: 'Z', chars: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
            { id: 'da', name: 'Fila Da', sub: 'D', chars: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
            { id: 'ba', name: 'Fila Ba', sub: 'B', chars: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
            { id: 'pa', name: 'Fila Pa', sub: 'P', chars: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] }
        ];

        const YOUON_MATRIX_ROWS = [
            { id: 'kya', name: 'Fila Kya', sub: 'K+Y', chars: ['きゃ', 'きゅ', 'きょ'] },
            { id: 'sha', name: 'Fila Sha', sub: 'S+Y', chars: ['しゃ', 'しゅ', 'しょ'] },
            { id: 'cha', name: 'Fila Cha', sub: 'T+Y', chars: ['ちゃ', 'ちゅ', 'ちょ'] },
            { id: 'nya', name: 'Fila Nya', sub: 'N+Y', chars: ['にゃ', 'にゅ', 'にょ'] },
            { id: 'hya', name: 'Fila Hya', sub: 'H+Y', chars: ['ひゃ', 'ひゅ', 'ひょ'] },
            { id: 'mya', name: 'Fila Mya', sub: 'M+Y', chars: ['みゃ', 'みゅ', 'みょ'] },
            { id: 'rya', name: 'Fila Rya', sub: 'R+Y', chars: ['りゃ', 'りゅ', 'りょ'] },
            { id: 'gya', name: 'Fila Gya', sub: 'G+Y', chars: ['ぎゃ', 'ぎゅ', 'ぎょ'] },
            { id: 'ja', name: 'Fila Ja', sub: 'J+Y', chars: ['じゃ', 'じゅ', 'じょ'] },
            { id: 'dya', name: 'Fila Dya', sub: 'D+Y', chars: ['ぢゃ', 'ぢゅ', 'ぢょ'] },
            { id: 'bya', name: 'Fila Bya', sub: 'B+Y', chars: ['びゃ', 'びゅ', 'びょ'] },
            { id: 'pya', name: 'Fila Pya', sub: 'P+Y', chars: ['ぴゃ', 'ぴゅ', 'ぴょ'] }
        ];

        // ==========================================================
        // FASE 1: MATRICES DE ESTUDIO DE KATAKANA POR FILAS Y COLUMNAS
        // ==========================================================
        const KATAKANA_GOJUON_ROWS = [
            { id: 'a', name: 'Fila A', sub: 'Vocales', chars: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
            { id: 'ka', name: 'Fila Ka', sub: 'K', chars: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
            { id: 'sa', name: 'Fila Sa', sub: 'S', chars: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
            { id: 'ta', name: 'Fila Ta', sub: 'T', chars: ['タ', 'チ', 'ツ', 'テ', 'ト'] },
            { id: 'na', name: 'Fila Na', sub: 'N', chars: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
            { id: 'ha', name: 'Fila Ha', sub: 'H', chars: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'] },
            { id: 'ma', name: 'Fila Ma', sub: 'M', chars: ['マ', 'ミ', 'ム', 'メ', 'モ'] },
            { id: 'ya', name: 'Fila Ya', sub: 'Y', chars: ['ヤ', null, 'ユ', null, 'ヨ'] },
            { id: 'ra', name: 'Fila Ra', sub: 'R', chars: ['ラ', 'リ', 'ル', 'レ', 'ロ'] },
            { id: 'wa', name: 'Fila Wa', sub: 'W', chars: ['ワ', null, null, null, 'ヲ'] },
            { id: 'n', name: 'Fila N', sub: 'Nasal', chars: ['ン', null, null, null, null] }
        ];

        const KATAKANA_DAKUTEN_ROWS = [
            { id: 'ga', name: 'Fila Ga', sub: 'G', chars: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'] },
            { id: 'za', name: 'Fila Za', sub: 'Z', chars: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'] },
            { id: 'da', name: 'Fila Da', sub: 'D', chars: ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'] },
            { id: 'ba', name: 'Fila Ba', sub: 'B', chars: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'] },
            { id: 'pa', name: 'Fila Pa', sub: 'P', chars: ['パ', 'ピ', 'プ', 'ペ', 'ポ'] }
        ];

        const KATAKANA_YOUON_ROWS = [
            { id: 'kya', name: 'Fila Kya', sub: 'K+Y', chars: ['キャ', 'キュ', 'キョ'] },
            { id: 'sha', name: 'Fila Sha', sub: 'S+Y', chars: ['シャ', 'シュ', 'ショ'] },
            { id: 'cha', name: 'Fila Cha', sub: 'T+Y', chars: ['チャ', 'チュ', 'チョ'] },
            { id: 'nya', name: 'Fila Nya', sub: 'N+Y', chars: ['ニャ', 'ニュ', 'ニョ'] },
            { id: 'hya', name: 'Fila Hya', sub: 'H+Y', chars: ['ヒャ', 'ヒュ', 'ヒョ'] },
            { id: 'mya', name: 'Fila Mya', sub: 'M+Y', chars: ['ミャ', 'ミュ', 'ミョ'] },
            { id: 'rya', name: 'Fila Rya', sub: 'R+Y', chars: ['リャ', 'リュ', 'リョ'] },
            { id: 'gya', name: 'Fila Gya', sub: 'G+Y', chars: ['ギャ', 'ギュ', 'ギョ'] },
            { id: 'ja', name: 'Fila Ja', sub: 'J+Y', chars: ['ジャ', 'ジュ', 'ジョ'] },
            { id: 'dya', name: 'Fila Dya', sub: 'D+Y', chars: ['ヂャ', 'ヂュ', 'ヂョ'] },
            { id: 'bya', name: 'Fila Bya', sub: 'B+Y', chars: ['ビャ', 'ビュ', 'ビョ'] },
            { id: 'pya', name: 'Fila Pya', sub: 'P+Y', chars: ['ピャ', 'ピュ', 'ピョ'] }
        ];


        let studyRowAudioTimeout = null;
        let studyRowPlaySessionId = 0;
        let activeStudyRowPlayingId = null;
        let activeHighlightedKana = null;

        function stopStudyRowAudio() {
            studyRowPlaySessionId++;
            if (studyRowAudioTimeout) {
                clearTimeout(studyRowAudioTimeout);
                studyRowAudioTimeout = null;
            }
            if ('speechSynthesis' in window) {
                try { window.speechSynthesis.cancel(); } catch (e) {}
            }
            if (activeHighlightedKana) {
                const cardEl = document.getElementById(`study-card-${activeHighlightedKana}`);
                if (cardEl) {
                    cardEl.classList.remove('ring-2', 'ring-sakura-400', 'bg-sakura-500/20', 'scale-105');
                }
                activeHighlightedKana = null;
            }
            if (activeStudyRowPlayingId) {
                updateStudyRowHeaderUI(activeStudyRowPlayingId, false);
                activeStudyRowPlayingId = null;
            }
        }

        function updateStudyRowHeaderUI(rowId, isPlaying) {
            const header = document.getElementById(`study-row-header-${rowId}`);
            const badge = document.getElementById(`study-row-badge-${rowId}`);
            const icon = document.getElementById(`study-row-icon-${rowId}`);
            const text = document.getElementById(`study-row-text-${rowId}`);
            if (!badge || !icon || !text) return;

            if (isPlaying) {
                if (header) {
                    header.classList.add('border-amber-500', 'ring-2', 'ring-amber-500/30');
                    header.classList.remove('border-slate-800');
                }
                badge.className = 'mt-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 transition-all text-[10px] font-bold shadow-sm';
                icon.className = 'fa-solid fa-square text-[9px] text-amber-300';
                text.textContent = 'Parar';
                if (header) header.title = 'Hacer clic para detener reproducción';
            } else {
                if (header) {
                    header.classList.remove('border-amber-500', 'ring-2', 'ring-amber-500/30');
                    header.classList.add('border-slate-800');
                }
                badge.className = 'mt-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-300 transition-all text-[10px] font-bold';
                icon.className = 'fa-solid fa-volume-high text-[9px]';
                text.textContent = 'Oír';
                if (header) header.title = 'Escuchar fila completa';
            }
        }

        function playStudyRowAudio(rowId) {
            // Si la misma fila ya está sonando, el clic sirve para pausar/detener
            if (activeStudyRowPlayingId === rowId) {
                stopStudyRowAudio();
                return;
            }

            // Detener cualquier reproducción previa
            stopStudyRowAudio();

            let rowObj = null;
            const isKata = state.currentSyllabary === 'katakana';
            if (state.currentCategory === 'gojuon') {
                rowObj = (isKata ? KATAKANA_GOJUON_ROWS : GOJUON_MATRIX_ROWS).find(r => r.id === rowId);
            } else if (state.currentCategory === 'dakuten') {
                rowObj = (isKata ? KATAKANA_DAKUTEN_ROWS : DAKUTEN_MATRIX_ROWS).find(r => r.id === rowId);
            } else if (state.currentCategory === 'youon') {
                rowObj = (isKata ? KATAKANA_YOUON_ROWS : YOUON_MATRIX_ROWS).find(r => r.id === rowId);
            }
            if (!rowObj) return;

            const validChars = rowObj.chars.filter(Boolean);
            if (validChars.length === 0) return;

            const thisSessionId = ++studyRowPlaySessionId;
            activeStudyRowPlayingId = rowId;
            updateStudyRowHeaderUI(rowId, true);

            let idx = 0;
            function playNext() {
                if (thisSessionId !== studyRowPlaySessionId) return;

                // Limpiar highlight del kana previo
                if (activeHighlightedKana) {
                    const prevCard = document.getElementById(`study-card-${activeHighlightedKana}`);
                    if (prevCard) {
                        prevCard.classList.remove('ring-2', 'ring-sakura-400', 'bg-sakura-500/20', 'scale-105');
                    }
                    activeHighlightedKana = null;
                }

                if (idx >= validChars.length) {
                    // Fin de la secuencia de esta fila
                    if (activeStudyRowPlayingId === rowId) {
                        updateStudyRowHeaderUI(rowId, false);
                        activeStudyRowPlayingId = null;
                    }
                    return;
                }

                const ch = validChars[idx];
                activeHighlightedKana = ch;

                // Feedback visual: iluminar tarjeta actual mientras se reproduce
                const cardEl = document.getElementById(`study-card-${ch}`);
                if (cardEl) {
                    cardEl.classList.add('ring-2', 'ring-sakura-400', 'bg-sakura-500/20', 'scale-105');
                }

                // Esperar a que el audio termine al 100% de manera real
                speakJapanese(ch, () => {
                    if (thisSessionId !== studyRowPlaySessionId) return;

                    // Pausa natural y pedagógica (420ms) entre kanas para dar tiempo al usuario de procesar
                    studyRowAudioTimeout = setTimeout(() => {
                        if (thisSessionId !== studyRowPlaySessionId) return;
                        idx++;
                        playNext();
                    }, 420);
                });
            }

            playNext();
        }

        function createStudyKanaCard(item) {
            const char = item.char || item.katakana || item.hiragana;
            const s = getKanaSRS(char);
            const boxBadgeColor = s.box === 3 ? 'bg-matcha-500/20 text-matcha-400 border-matcha-500/40' :
                                  (s.box === 2 ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                                  'bg-rose-500/10 text-rose-400 border-rose-500/30');

            const card = document.createElement('div');
            card.id = `study-card-${char}`;
            card.className = 'study-card bg-slate-800/90 border border-slate-700/80 hover:border-sakura-500 rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 hover:scale-105 hover:shadow-lg hover:shadow-sakura-500/15 group no-select relative min-h-[92px] sm:min-h-[105px] active:scale-95';
            card.onclick = () => {
                stopStudyRowAudio();
                speakJapanese(char);
                showKanaStrokeModal(char);
            };

            card.innerHTML = `
                <div class="absolute top-1.5 right-2 text-[9px] font-black px-1.5 py-0.5 rounded-md border ${boxBadgeColor}" title="Caja Leitner SRS: Nivel ${s.box}">C${s.box}</div>
                <div class="font-jp text-3xl sm:text-4xl font-bold text-white group-hover:text-sakura-300 transition-colors mt-1">${char}</div>
                <div class="text-xs font-bold text-amber-400 tracking-wider uppercase mt-1">${item.romaji}</div>
                <div class="text-[10px] text-slate-500 mt-0.5"><i class="fa-solid fa-volume-high text-slate-600 group-hover:text-sakura-400 transition-colors"></i></div>
            `;
            return card;
        }

        function createStudyEmptySlotCard() {
            const slot = document.createElement('div');
            slot.className = 'bg-slate-900/25 border border-dashed border-slate-800/60 rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center text-slate-600/40 select-none min-h-[92px] sm:min-h-[105px] transition-colors';
            slot.innerHTML = `
                <span class="text-base sm:text-lg font-mono text-slate-700/60 leading-none">—</span>
                <span class="text-[9px] text-slate-600/40 uppercase tracking-widest mt-1 font-semibold">Vacío</span>
            `;
            return slot;
        }

        function createStudyRowHeaderCard(row) {
            const header = document.createElement('div');
            header.id = `study-row-header-${row.id}`;
            header.className = 'bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center text-center transition group relative cursor-pointer select-none active:scale-95 shadow-sm';
            header.onclick = () => playStudyRowAudio(row.id);
            header.title = `Escuchar fila completa: ${row.name} (${row.sub})`;

            header.innerHTML = `
                <div class="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    ${row.name}
                </div>
                <div class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                    ${row.sub}
                </div>
                <div id="study-row-badge-${row.id}" class="mt-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-300 transition-all text-[10px] font-bold">
                    <i id="study-row-icon-${row.id}" class="fa-solid fa-volume-high text-[9px]"></i>
                    <span id="study-row-text-${row.id}" class="text-[9px]">Oír</span>
                </div>
            `;
            return header;
        }

        function renderStudyGrid() {
            const grid = document.getElementById('studyGrid');
            if (!grid) return;
            grid.innerHTML = '';

            const isKata = state.currentSyllabary === 'katakana';
            let rows = isKata ? KATAKANA_GOJUON_ROWS : GOJUON_MATRIX_ROWS;
            let isYouon = false;

            if (state.currentCategory === 'dakuten') {
                rows = isKata ? KATAKANA_DAKUTEN_ROWS : DAKUTEN_MATRIX_ROWS;
            } else if (state.currentCategory === 'youon') {
                rows = isKata ? KATAKANA_YOUON_ROWS : YOUON_MATRIX_ROWS;
                isYouon = true;
            }

            const gridColClass = isYouon 
                ? 'grid grid-cols-[85px_repeat(3,1fr)] sm:grid-cols-[105px_repeat(3,1fr)] gap-2 sm:gap-3 items-stretch'
                : 'grid grid-cols-[85px_repeat(5,1fr)] sm:grid-cols-[105px_repeat(5,1fr)] gap-2 sm:gap-3 items-stretch';

            // 1. Cabecera de Columnas (Vocales / Sonidos)
            const headerRow = document.createElement('div');
            headerRow.className = `${gridColClass} sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md py-2 px-1 border-b border-slate-800 rounded-2xl shadow-sm`;

            // Columna 0: Fila
            const fHeader = document.createElement('div');
            fHeader.className = 'text-center font-extrabold text-[11px] sm:text-xs text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5';
            fHeader.innerHTML = `<i class="fa-solid fa-layer-group text-sakura-400"></i><span>Fila</span>`;
            headerRow.appendChild(fHeader);

            if (isYouon) {
                const youonHeaders = isKata ? [
                    { title: '-YA', jp: 'ャ (ya)' },
                    { title: '-YU', jp: 'ュ (yu)' },
                    { title: '-YO', jp: 'ョ (yo)' }
                ] : [
                    { title: '-YA', jp: 'ゃ (ya)' },
                    { title: '-YU', jp: 'ゅ (yu)' },
                    { title: '-YO', jp: 'ょ (yo)' }
                ];
                youonHeaders.forEach(h => {
                    const vCol = document.createElement('div');
                    vCol.className = 'text-center py-2 px-1 rounded-xl bg-slate-800/90 border border-slate-700/80 text-amber-400 font-black text-sm sm:text-base tracking-wider shadow-sm flex flex-col items-center';
                    vCol.innerHTML = `<span>${h.title}</span><span class="text-[10px] text-slate-400 font-normal font-jp">${h.jp}</span>`;
                    headerRow.appendChild(vCol);
                });
            } else {
                const vowelHeaders = isKata ? [
                    { title: 'A', jp: 'ア段' },
                    { title: 'I', jp: 'イ段' },
                    { title: 'U', jp: 'ウ段' },
                    { title: 'E', jp: 'エ段' },
                    { title: 'O', jp: 'オ段' }
                ] : [
                    { title: 'A', jp: 'あ段' },
                    { title: 'I', jp: 'い段' },
                    { title: 'U', jp: 'う段' },
                    { title: 'E', jp: 'え段' },
                    { title: 'O', jp: 'お段' }
                ];
                vowelHeaders.forEach(h => {
                    const vCol = document.createElement('div');
                    vCol.className = 'text-center py-2 px-1 rounded-xl bg-slate-800/90 border border-slate-700/80 text-amber-400 font-black text-sm sm:text-base tracking-wider shadow-sm flex flex-col items-center';
                    vCol.innerHTML = `<span>${h.title}</span><span class="text-[10px] text-slate-400 font-normal font-jp">${h.jp}</span>`;
                    headerRow.appendChild(vCol);
                });
            }
            grid.appendChild(headerRow);

            // 2. Filas de Sonidos
            const activeDataset = getActiveKanaDataset();
            rows.forEach(row => {
                const rowDiv = document.createElement('div');
                rowDiv.className = `${gridColClass}`;

                // Header de la fila
                rowDiv.appendChild(createStudyRowHeaderCard(row));

                // Celdas de caracteres
                row.chars.forEach(char => {
                    if (char) {
                        const item = activeDataset.find(k => (k.char || k.katakana || k.hiragana) === char) ||
                                     HIRAGANA_DATA.find(k => k.hiragana === char) ||
                                     KATAKANA_DATA.find(k => k.katakana === char);
                        if (item) {
                            rowDiv.appendChild(createStudyKanaCard(item));
                        } else {
                            rowDiv.appendChild(createStudyEmptySlotCard());
                        }
                    } else {
                        rowDiv.appendChild(createStudyEmptySlotCard());
                    }
                });

                grid.appendChild(rowDiv);
            });
        }
