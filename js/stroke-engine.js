// KotoDojo · Motor geométrico y diagnóstico de trazos
        // ==========================================================
        // GEOMETRIC STROKE ENGINE & ORTHOGONAL VALIDATION
        // ==========================================================
        const discretizedCache = new Map();

        function discretizeSvgPath(pathStr) {
            if (discretizedCache.has(pathStr)) {
                return discretizedCache.get(pathStr);
            }

            const scale = OUR_VIEWBOX / KANJIVG_VIEWBOX; // ~2.752

            const dummySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            dummySvg.setAttribute('viewBox', `0 0 ${KANJIVG_VIEWBOX} ${KANJIVG_VIEWBOX}`);
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', pathStr);
            dummySvg.appendChild(pathEl);
            document.body.appendChild(dummySvg);
            dummySvg.style.position = 'absolute';
            dummySvg.style.visibility = 'hidden';
            dummySvg.style.width = '0';
            dummySvg.style.height = '0';

            const totalLen = pathEl.getTotalLength() || 1;
            const numSamples = 30;
            const points = [];
            for (let i = 0; i <= numSamples; i++) {
                const p = pathEl.getPointAtLength((i / numSamples) * totalLen);
                points.push({ x: p.x * scale, y: p.y * scale });
            }
            document.body.removeChild(dummySvg);

            const start = points[0];
            const end = points[points.length - 1];

            const earlyPt = points[Math.min(6, points.length - 1)];
            const dx = earlyPt.x - start.x;
            const dy = earlyPt.y - start.y;
            const dist = Math.hypot(dx, dy) || 1;
            const guideArrow = {
                x1: start.x,
                y1: start.y,
                x2: start.x + (dx / dist) * 22,
                y2: start.y + (dy / dist) * 22
            };

            const result = {
                pathStr,
                points,
                start,
                end,
                length: totalLen * scale,
                guideArrow
            };

            discretizedCache.set(pathStr, result);
            return result;
        }

        function getKanaStrokeVectors(char) {
            if (!char) return [];

            // 1. Single character (Full 300x300 standard canvas)
            if (char.length === 1) {
                const rawPaths = KANA_STROKES_SVG[char] || ["M 100,100 L 200,200"];
                return rawPaths.map((d, i) => {
                    const vec = discretizeSvgPath(d);
                    return {
                        ...vec,
                        scaleFactor: 1.0,
                        tx: 0,
                        ty: 0,
                        svgTransform: `scale(${KANJIVG_SCALE})`,
                        strokeWidth: 8 / KANJIVG_SCALE,
                        ghostStrokeWidth: 6 / KANJIVG_SCALE,
                        charPart: 1,
                        charName: char,
                        strokeIndexInPart: i + 1,
                        partTotalStrokes: rawPaths.length
                    };
                });
            }

            // 2. Yōon compound (ej: "きょ", "きゃ", "しゃ", etc. -> Left Main Kana + Right Small Kana)
            if (char.length === 2) {
                const char1 = char[0];
                const char2 = char[1];
                const paths1 = KANA_STROKES_SVG[char1] || ["M 100,100 L 200,200"];
                const paths2 = KANA_STROKES_SVG[char2] || ["M 100,100 L 200,200"];

                // Base / Main Kana (Left side: 70% scale, con margen lateral óptimo para evitar colisiones)
                const SCALE1 = 0.70;
                const TX1 = -16;
                const TY1 = 44;

                const vectors1 = paths1.map((d, i) => {
                    const vec = discretizeSvgPath(d);
                    const scaledPoints = vec.points.map(p => ({
                        x: p.x * SCALE1 + TX1,
                        y: p.y * SCALE1 + TY1
                    }));
                    return {
                        pathStr: vec.pathStr,
                        points: scaledPoints,
                        start: { x: vec.start.x * SCALE1 + TX1, y: vec.start.y * SCALE1 + TY1 },
                        end: { x: vec.end.x * SCALE1 + TX1, y: vec.end.y * SCALE1 + TY1 },
                        length: vec.length * SCALE1,
                        guideArrow: {
                            x1: vec.guideArrow.x1 * SCALE1 + TX1,
                            y1: vec.guideArrow.y1 * SCALE1 + TY1,
                            x2: vec.guideArrow.x2 * SCALE1 + TX1,
                            y2: vec.guideArrow.y2 * SCALE1 + TY1
                        },
                        scaleFactor: SCALE1,
                        tx: TX1,
                        ty: TY1,
                        svgTransform: `translate(${TX1}, ${TY1}) scale(${SCALE1 * KANJIVG_SCALE})`,
                        strokeWidth: 8 / (SCALE1 * KANJIVG_SCALE),
                        ghostStrokeWidth: 6 / (SCALE1 * KANJIVG_SCALE),
                        charPart: 1,
                        charName: char1,
                        strokeIndexInPart: i + 1,
                        partTotalStrokes: paths1.length
                    };
                });

                // Small Modifier Kana (Right side: 50% scale, alineado al mismo nivel base que el kana principal)
                const SCALE2 = 0.50;
                const TX2 = 156;
                const KANA_BASE_Y = 93.5;
                const TY2 = Math.round(TY1 + KANA_BASE_Y * KANJIVG_SCALE * (SCALE1 - SCALE2));

                const vectors2 = paths2.map((d, i) => {
                    const vec = discretizeSvgPath(d);
                    const scaledPoints = vec.points.map(p => ({
                        x: p.x * SCALE2 + TX2,
                        y: p.y * SCALE2 + TY2
                    }));
                    return {
                        pathStr: vec.pathStr,
                        points: scaledPoints,
                        start: { x: vec.start.x * SCALE2 + TX2, y: vec.start.y * SCALE2 + TY2 },
                        end: { x: vec.end.x * SCALE2 + TX2, y: vec.end.y * SCALE2 + TY2 },
                        length: vec.length * SCALE2,
                        guideArrow: {
                            x1: vec.guideArrow.x1 * SCALE2 + TX2,
                            y1: vec.guideArrow.y1 * SCALE2 + TY2,
                            x2: vec.guideArrow.x2 * SCALE2 + TX2,
                            y2: vec.guideArrow.y2 * SCALE2 + TY2
                        },
                        scaleFactor: SCALE2,
                        tx: TX2,
                        ty: TY2,
                        svgTransform: `translate(${TX2}, ${TY2}) scale(${SCALE2 * KANJIVG_SCALE})`,
                        strokeWidth: 8 / (SCALE2 * KANJIVG_SCALE),
                        ghostStrokeWidth: 6 / (SCALE2 * KANJIVG_SCALE),
                        charPart: 2,
                        charName: char2,
                        strokeIndexInPart: i + 1,
                        partTotalStrokes: paths2.length
                    };
                });

                return [...vectors1, ...vectors2];
            }

            const rawPaths = ["M 100,100 L 200,200"];
            return rawPaths.map(d => ({
                ...discretizeSvgPath(d),
                scaleFactor: 1.0,
                tx: 0,
                ty: 0,
                svgTransform: `scale(${KANJIVG_SCALE})`,
                strokeWidth: 8 / KANJIVG_SCALE,
                ghostStrokeWidth: 6 / KANJIVG_SCALE,
                charPart: 1,
                charName: char
            }));
        }

        // Distance from point P to line segment VW squared
        function distToSegmentSquared(p, v, w) {
            const l2 = Math.pow(w.x - v.x, 2) + Math.pow(w.y - v.y, 2);
            if (l2 === 0) return Math.pow(p.x - v.x, 2) + Math.pow(p.y - v.y, 2);
            let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            return Math.pow(p.x - (v.x + t * (w.x - v.x)), 2) + Math.pow(p.y - (v.y + t * (w.y - v.y)), 2);
        }

        // Minimum distance from point P to polyline
        function pointToPolylineMinDist(p, polyline) {
            let minDistSq = Infinity;
            for (let i = 0; i < polyline.length - 1; i++) {
                const dSq = distToSegmentSquared(p, polyline[i], polyline[i + 1]);
                if (dSq < minDistSq) minDistSq = dSq;
            }
            return Math.sqrt(minDistSq);
        }

        // Mean orthogonal distance between user polyline and reference model
        function meanOrthogonalDeviation(userPoints, refPolyline) {
            if (!userPoints || userPoints.length === 0 || !refPolyline || refPolyline.length === 0) return Infinity;
            let sumDist = 0;
            for (let i = 0; i < userPoints.length; i++) {
                sumDist += pointToPolylineMinDist(userPoints[i], refPolyline);
            }
            return sumDist / userPoints.length;
        }

        // Smooth Bezier path for live drawing
        function pointsToSmoothSvgPath(points) {
            if (!points || points.length === 0) return "";
            if (points.length === 1) return `M ${points[0].x} ${points[0].y} L ${points[0].x + 0.1} ${points[0].y + 0.1}`;
            if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

            let d = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                d += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
            }
            d += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
            return d;
        }

        // ==========================================================
        // 1. DATASET DE NEMOTÉCNICAS OFICIALES EN ESPAÑOL (46 GOJŪON)
        // ==========================================================
        const KANA_FEEDBACK_GUIDES = {
            'あ': { mnemonic: "Como un atún atravesado por una espada.", commonMistake: "Tiene cruz vertical completa; no lo confundas con 'お'." },
            'い': { mnemonic: "Como dos patas o antenas de un insecto.", commonMistake: "El trazo izquierdo es más largo y lleva gancho; en 'り' el derecho es el largo." },
            'う': { mnemonic: "Como la curva de una uña.", commonMistake: "El punto superior va separado del arco inferior." },
            'え': { mnemonic: "Como una persona inclinada hacia adelante empujando un objeto pesado.", commonMistake: "El trazo inferior zigzaguea antes de la base ondulada." },
            'お': { mnemonic: "Como un orangután saltando con su pelaje o bufanda al viento.", commonMistake: "No olvides el punto superior derecho independiente." },
            'か': { mnemonic: "Como una carta doblada con su sello al lado.", commonMistake: "Lleva un punto/comilla arriba a la derecha; 'が' lleva dos marcas dakuten." },
            'き': { mnemonic: "Como la silueta de un kimono cerrado.", commonMistake: "Tiene 2 líneas horizontales; 'さ' solo tiene 1." },
            'く': { mnemonic: "Como el arco curvo de cupido.", commonMistake: "Trazo angular único continuo abierto hacia la derecha." },
            'け': { mnemonic: "Como leña ardiendo lista para quemar.", commonMistake: "El trazo izquierdo es vertical curvo con gancho; no cruzar con el derecho." },
            'こ': { mnemonic: "Como una boca abierta lista para comer.", commonMistake: "Dos trazos horizontales paralelos con ligera curvatura." },
            'さ': { mnemonic: "Como una persona lista para saltar.", commonMistake: "Solo tiene 1 línea horizontal arriba; 'き' tiene 2." },
            'し': { mnemonic: "Como la curva de una cola de sirena.", commonMistake: "Trazo descendente que curva hacia arriba como una 'J' suave." },
            'す': { mnemonic: "Como subir una montaña rusa con un rulo central.", commonMistake: "El lazo central debe quedar cerrado en el cruce vertical." },
            'せ': { mnemonic: "Como un señor sentado de perfil.", commonMistake: "El trazo vertical derecho es más corto que el izquierdo envolvente." },
            'そ': { mnemonic: "Como la marcha en zigzag de un soldado.", commonMistake: "Un solo trazo continuo en forma de 'Z' que remata en 'C'." },
            'た': { mnemonic: "Como un músico tocando el tambor con baquetas.", commonMistake: "La cruz izquierda va acompañada por dos trazos cortos a la derecha." },
            'ち': { mnemonic: "Como reírse a carcajadas de un chiste (parece un 5 invertido).", commonMistake: "Línea horizontal superior cruzada; 'ら' tiene el punto superior separado." },
            'つ': { mnemonic: "Como la cresta de un terrible tsunami que rompe.", commonMistake: "Un único trazo curvo amplio de izquierda a derecha." },
            'て': { mnemonic: "Como el asa y cuerpo de una tetera humeante.", commonMistake: "Horizontal superior recta conectada a un medio círculo abierto." },
            'と': { mnemonic: "Como el caparazón y cabeza de una tortuga marina.", commonMistake: "Línea corta inclinada que toca un arco abierto envolvente." },
            'な': { mnemonic: "Como una nana cuidando y meciendo al bebé.", commonMistake: "4 trazos: cruz izquierda, punto superior y lazo con cola." },
            'に': { mnemonic: "Como la estructura y ramitas de un nido.", commonMistake: "Vertical izquierda con dos horizontales paralelas a la derecha." },
            'ぬ': { mnemonic: "Como una cuerda atada en un nudo cerrado.", commonMistake: "Termina en un rulo/bucle cerrado; si queda liso parecerá 'め'." },
            'ね': { mnemonic: "Como el tridente de Neptuno, rey del mar, con cola marina.", commonMistake: "Termina en un rulo cerrado; 'れ' curva hacia afuera y 'わ' es un arco liso." },
            'の': { mnemonic: "Como una señal circular de no fumar.", commonMistake: "Un solo trazo espiral continuo que inicia en el centro." },
            'は': { mnemonic: "Como la reja de entrada a un hermoso jardín.", commonMistake: "La vertical no sobresale arriba; 'ほ' tiene sombrero horizontal superior." },
            'ひ': { mnemonic: "Como el perfil largo de la cara de una jirafa sonriente.", commonMistake: "Base redondeada ancha en forma de 'U' profunda." },
            'ふ': { mnemonic: "Como un abuelo fumando su pipa tradicional.", commonMistake: "4 trazos: punto superior, nariz central y dos comillas laterales." },
            'へ': { mnemonic: "Como la ceja fruncida de un jefe gruñón.", commonMistake: "Un solo trazo en pico; el lado derecho es más largo que el izquierdo." },
            'ほ': { mnemonic: "Como bailar la jota con sombrero y brazos extendidos.", commonMistake: "La línea superior horizontal cubre la vertical sin ser atravesada." },
            'ま': { mnemonic: "Como el mástil y las velas de un barco pesquero.", commonMistake: "2 líneas horizontales cruzadas por una vertical que termina en lazo." },
            'み': { mnemonic: "Como una abejita volando que busca rica miel.", commonMistake: "Trazo zigzagueante con bucle horizontal cruzado por una diagonal." },
            'む': { mnemonic: "Como el perfil estilizado del rostro de una mujer.", commonMistake: "Horizontal, vertical con lazo central, y punto superior derecho." },
            'め': { mnemonic: "Como una cuerda con medio nudo (sin cerrar el lazo).", commonMistake: "Cruce suave que termina abierto sin el bucle final de 'ぬ'." },
            'も': { mnemonic: "Como los tentáculos y cuernos de un monstruo marino.", commonMistake: "La vertical en gancho se dibuja primero, luego las dos horizontales." },
            'や': { mnemonic: "Como abrir un paraguas en un día de lluvia.", commonMistake: "Curva ancha con gancho, pequeña comilla superior y diagonal descendente." },
            'ゆ': { mnemonic: "Como el cuerpo y patas de una viuda negra.", commonMistake: "Vertical con lazo amplio cruzada por una línea descendente." },
            'よ': { mnemonic: "Como la cabina y plataforma de un camión de carga.", commonMistake: "Horizontal corta unida a una vertical que hace bucle a la izquierda." },
            'ら': { mnemonic: "Como el caparazón enrollado de un caracol.", commonMistake: "El punto superior está separado del arco inferior; en 'ち' es una línea unida." },
            'り': { mnemonic: "Como dos hojas verdes o dos zanahorias paralelas.", commonMistake: "El trazo derecho es notablemente más largo y curvado que el izquierdo." },
            'る': { mnemonic: "Como la cesta con un lazo cerrado de Caperucita Roja.", commonMistake: "Termina en un bucle cerrado en la base; 'ろ' queda completamente abierto." },
            'れ': { mnemonic: "Como el destello zigzagueante de un relámpago con cola hacia afuera.", commonMistake: "La cola final curva hacia la derecha/afuera; 'ね' cierra en bucle." },
            'ろ': { mnemonic: "Como el vuelo abierto y libre de un pájaro.", commonMistake: "Forma idéntica a 'る' pero termina abierto sin el lazo inferior." },
            'わ': { mnemonic: "Como el movimiento suave y curvado de una gota de agua.", commonMistake: "El arco interior es suave y redondo; no lleva el bucle de 'ね' ni la cola de 'れ'." },
            'を': { mnemonic: "Como lanzarse a la piscina gritando ¡Wooo!", commonMistake: "3 trazos: horizontal, diagonal cruzada con curva y medio círculo inferior." },
            'ん': { mnemonic: "Como saborear una rica malteada diciendo... ¡Mmm!", commonMistake: "Trazo único ascendente y descendente como una 'n' cursiva estilizada." }
        };

        function getKanaFeedbackGuide(char) {
            if (KANA_FEEDBACK_GUIDES[char]) return KANA_FEEDBACK_GUIDES[char];
            const dakutenMap = {
                'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ',
                'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ',
                'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と',
                'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
                'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ぺ': 'へ', 'ぽ': 'ほ'
            };
            if (dakutenMap[char]) {
                const base = dakutenMap[char];
                const baseGuide = KANA_FEEDBACK_GUIDES[base];
                return {
                    mnemonic: `Versión sonorizada de '${base}': ${baseGuide ? baseGuide.mnemonic : ''}`,
                    commonMistake: `Dibuja primero el carácter base '${base}' y luego añade las comillas (゛) o el círculo (゜) en la esquina superior derecha.`
                };
            }
            if (char && char.length > 1) {
                const firstChar = char[0];
                const baseGuide = KANA_FEEDBACK_GUIDES[firstChar];
                return {
                    mnemonic: `Combinación de '${firstChar}' grande + kana pequeño '${char.slice(1)}'. ${baseGuide ? baseGuide.mnemonic : ''}`,
                    commonMistake: `El primer kana se dibuja en el cuadro izquierdo a tamaño completo, y el segundo kana se dibuja más pequeño en el cuadro derecho.`
                };
            }
            return {
                mnemonic: "Presta atención al orden de trazos tradicional y la curvatura general del carácter.",
                commonMistake: "Verifica que el punto de inicio y el sentido sigan el patrón estándar del modelo guía."
            };
        }

        // ==========================================================
        // 2. MOTOR DE DIAGNÓSTICO GEOMÉTRICO DE TRAZOS
        // ==========================================================
        function diagnoseUserStroke(userPoints, refStroke, strictness = 'normal') {
            if (!userPoints || userPoints.length < 2 || !refStroke) {
                return { ok: false, reason: 'too_short', msg: '📏 Dibuja el trazo deslizando sobre el lienzo.' };
            }

            const refLen = refStroke.length || 1;
            let userLen = 0;
            for (let i = 1; i < userPoints.length; i++) {
                userLen += Math.hypot(userPoints[i].x - userPoints[i - 1].x, userPoints[i].y - userPoints[i - 1].y);
            }
            if (userLen < (strictness === 'easy' ? 8 : 12)) {
                return { ok: false, reason: 'too_short', msg: '📏 Trazo demasiado corto. Desliza con mayor firmeza.' };
            }

            const uDx = userPoints[userPoints.length - 1].x - userPoints[0].x;
            const uDy = userPoints[userPoints.length - 1].y - userPoints[0].y;
            const rDx = refStroke.end.x - refStroke.start.x;
            const rDy = refStroke.end.y - refStroke.start.y;
            const uMag = Math.hypot(uDx, uDy);
            const rMag = Math.hypot(rDx, rDy);

            // 1. Directional Cosine Similarity Filter (Inverted direction check)
            if (uMag >= 15 && rMag >= 15) {
                const dotProduct = (uDx * rDx + uDy * rDy) / (uMag * rMag);
                const minCosine = strictness === 'easy' ? -0.40 : (strictness === 'strict' ? 0.20 : -0.15);
                if (dotProduct < minCosine) {
                    return { ok: false, reason: 'inverted_direction', msg: '⚠️ ¡Dirección invertida! Sigue el sentido de la flecha roja.' };
                }
            }

            // 2. Start distance check (Calibrated for 300x300 canvas)
            const startDist = Math.hypot(userPoints[0].x - refStroke.start.x, userPoints[0].y - refStroke.start.y);
            const maxStart = strictness === 'easy' ? 80 : (strictness === 'strict' ? 26 : 45);
            if (startDist > maxStart) {
                return { ok: false, reason: 'wrong_start', msg: '📍 Inicia el trazo donde marca el punto o flecha roja.' };
            }

            // 3. Length ratio check
            const lenRatio = userLen / refLen;
            const minLen = strictness === 'easy' ? 0.28 : (strictness === 'strict' ? 0.65 : 0.40);
            const maxLen = strictness === 'easy' ? 2.80 : (strictness === 'strict' ? 1.45 : 2.00);

            if (lenRatio < minLen) {
                return { ok: false, reason: 'incomplete', msg: '📏 Trazo incompleto. Llévalo hasta el final del modelo.' };
            }
            if (lenRatio > maxLen) {
                return { ok: false, reason: 'overshot', msg: '📏 El trazo es excesivamente largo o distorsionado.' };
            }

            // 4. Mean Orthogonal Deviation Check (Point-to-polyline projection)
            const meanDev = meanOrthogonalDeviation(userPoints, refStroke.points);
            const maxDev = strictness === 'easy' ? 48 : (strictness === 'strict' ? 16 : 28);
            if (meanDev > maxDev) {
                return { ok: false, reason: 'shape_deviation', msg: 'Ajusta la curvatura e inclinación a la silueta guía.' };
            }

            return { ok: true, reason: 'success', msg: '¡Excelente!' };
        }

        function validateUserStroke(userPoints, refStroke, strictness = 'normal') {
            return diagnoseUserStroke(userPoints, refStroke, strictness).ok;
        }

        function setStrokeStrictness(level) {
            state.strokeStrictness = level;
            updateStrokeStrictnessUI();
            saveStateToStorage();
            const labelMap = { easy: '🟢 Flexible (Muy permisivo)', normal: '🟡 Normal (Equilibrado)', strict: '🔴 Riguroso (Caligráfico)' };
            showToast(`Exactitud de trazado: ${labelMap[level] || 'Normal'}`, 'info');
        }

        function updateStrokeStrictnessUI() {
            const level = state.strokeStrictness || 'normal';
            document.querySelectorAll('.strict-btn').forEach(btn => {
                const btnLevel = btn.getAttribute('data-level');
                if (btnLevel === level) {
                    btn.className = 'strict-btn px-2 py-1 rounded-lg bg-sakura-600 text-white transition font-bold shadow-sm';
                } else {
                    btn.className = 'strict-btn px-2 py-1 rounded-lg text-slate-400 hover:text-white transition';
                }
            });
        }
