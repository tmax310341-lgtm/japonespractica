// KotoDojo · 2.º parcial (Japonés 1, Lección 2): guía rápida y simulacro de opción múltiple
//
// Modos de la pestaña Parcial que gestiona este archivo:
//   p2guide   guía rápida de las págs. 56–57 (horas, verbos, partículas, frecuencia…)
//   p2sim     inicio del simulacro, sesión en curso y resultados
// Las preguntas están en data/parcial2.js; aquí se generan además preguntas de horas,
// días y verbos para que cada simulacro sea distinto.

let p2Session = null;      // sesión en curso (examen, práctica o repaso)
let p2TimerId = null;

const P2_LETTERS = ['A', 'B', 'C', 'D'];

// ---------- Progreso guardado (historial y errores) ----------
function p2Progress() {
    if (!state.parcial2 || typeof state.parcial2 !== 'object') state.parcial2 = { history: [], mistakes: [] };
    if (!Array.isArray(state.parcial2.history)) state.parcial2.history = [];
    if (!Array.isArray(state.parcial2.mistakes)) state.parcial2.mistakes = [];
    return state.parcial2;
}

function p2Escape(text) {
    return String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const p2Pick = list => list[Math.floor(Math.random() * list.length)];

function p2PickDistinct(list, count, exclude = []) {
    return shuffleArray(list.filter(x => !exclude.includes(x))).slice(0, count);
}

// Pregunta lista para mostrar: opciones mezcladas y respuesta correcta guardada como texto
function p2Prepare(raw, id) {
    return {
        id,
        b: raw.b,
        q: raw.q,
        s: raw.s || '',
        r: raw.r || null,
        correct: raw.o[0],
        options: shuffleArray([...raw.o]),
        e: raw.e,
        source: raw          // con la respuesta correcta en primer lugar, para guardarla en «errores»
    };
}

// ---------- Preguntas generadas ----------
function p2GenerateHour() {
    const hour = p2Pick(P2_HOURS);
    const half = Math.random() < 0.35;
    const read = h => h.hira + (half ? 'はん' : '');
    const label = `${hour.n}:${half ? '30' : '00'}`;
    const traps = (P2_HOUR_TRAPS[hour.n] || []).map(t => t + (half ? 'はん' : ''));
    const others = p2PickDistinct(P2_HOURS.filter(h => h.n !== hour.n).map(read), 3);
    const options = [read(hour), ...traps, ...others].filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
    if (Math.random() < 0.5) {
        return {
            id: `g-hora-${label}`,
            raw: {
                b: 'tiempo', q: `¿Cómo se dice «las ${label}»?`, o: options,
                e: hour.ex ? `Excepción: ${hour.n} en punto se dice ${hour.hira}.${half ? ' Y media = 〜はん.' : ''}` :
                    `${hour.n} en punto = ${hour.hira}${half ? '; y media se añade はん' : ''}.`
            }
        };
    }
    const wrongLabels = p2PickDistinct(P2_HOURS.filter(h => h.n !== hour.n).map(h => `${h.n}:${half ? '30' : '00'}`), 3);
    return {
        id: `g-lectura-hora-${label}`,
        raw: {
            b: 'tiempo', q: `¿Qué hora es 「${read(hour)}」?`, o: [label, ...wrongLabels],
            e: `${read(hour)} = ${label}.${hour.ex ? ` ${hour.hira} es una de las excepciones (よじ, しちじ, くじ).` : ''}`
        }
    };
}

function p2GenerateDay() {
    const day = p2Pick(P2_DAYS);
    const others = p2PickDistinct(P2_DAYS.filter(d => d !== day), 3);
    if (Math.random() < 0.5) {
        return { id: `g-dia-${day.hira}`, raw: { b: 'tiempo', q: `¿Qué día es 「${day.hira}」?`, o: [day.es, ...others.map(d => d.es)], e: `${day.hira} = ${day.es}.` } };
    }
    return { id: `g-dia-es-${day.es}`, raw: { b: 'tiempo', q: `¿Cómo se dice «${day.es}»?`, o: [day.hira, ...others.map(d => d.hira)], e: `${day.es} = ${day.hira}.` } };
}

function p2GenerateVerb() {
    const verb = p2Pick(P2_VERBS);
    const kind = Math.random();
    if (kind < 0.4) {
        return {
            id: `g-masu-${verb.dict}`,
            raw: {
                b: 'verbos', q: `Forma ます de 「${verb.dict}」 (${verb.es}):`, o: [verb.masu, ...P2_VERB_TRAPS[verb.dict]],
                e: verb.type === 'ru' ? `Verbo ru: se quita る y se añade ます → ${verb.masu}.` :
                    verb.type === 'u' ? `Verbo u: la última sílaba pasa a la fila i + ます → ${verb.masu}.${verb.trap ? ' ¡Ojo! かえる parece verbo ru, pero es u.' : ''}` :
                        `Irregular: ${verb.dict} → ${verb.masu}.`
            }
        };
    }
    if (kind < 0.7) {
        const neg = verb.masu.replace(/ます$/, 'ません');
        const traps = P2_VERB_TRAPS[verb.dict].map(t => t.replace(/ます$/, 'ません'));
        return {
            id: `g-masen-${verb.dict}`,
            raw: { b: 'verbos', q: `Forma negativa (〜ません) de 「${verb.dict}」:`, o: [neg, ...traps], e: `${verb.masu} → ${neg}: se cambia ます por ません.` }
        };
    }
    const names = Object.values(P2_TYPE_NAMES);
    return {
        id: `g-tipo-${verb.dict}`,
        raw: {
            b: 'verbos', q: `¿Qué tipo de verbo es 「${verb.dict}」 (${verb.es})?`,
            o: [P2_TYPE_NAMES[verb.type], ...names.filter(n => n !== P2_TYPE_NAMES[verb.type]), 'Adjetivo'],
            e: `${verb.dict} → ${verb.masu}: ${P2_TYPE_NAMES[verb.type].toLowerCase()}.${verb.trap ? ' Termina en -eru, pero es verbo u.' : ''}`
        }
    };
}

const P2_GENERATORS = { tiempo: [p2GenerateHour, p2GenerateDay], verbos: [p2GenerateVerb] };

// Candidatas de un bloque: las del banco más algunas generadas
function p2Candidates(block, generated = 6) {
    const list = P2_BANK.map((raw, i) => ({ id: `b${i}`, raw })).filter(x => x.raw.b === block);
    const gens = P2_GENERATORS[block] || [];
    for (let i = 0; i < generated && gens.length; i++) list.push(p2Pick(gens)());
    return list;
}

function p2TakeUnique(candidates, count, used) {
    const out = [];
    for (const c of shuffleArray(candidates)) {
        if (out.length >= count) break;
        if (used.has(c.id)) continue;
        used.add(c.id);
        out.push(p2Prepare(c.raw, c.id));
    }
    return out;
}

function p2BuildExam() {
    const used = new Set();
    const questions = [];
    P2_BLOCKS.forEach(block => questions.push(...p2TakeUnique(p2Candidates(block.id), block.examCount, used)));
    return questions;
}

function p2BuildPractice(blockId, count = 10) {
    return p2TakeUnique(p2Candidates(blockId, 12), count, new Set());
}

// ---------- Inicio de sesiones ----------
function p2StartExam() {
    p2StartSession('exam', p2BuildExam(), 'Simulacro de examen');
    p2Session.deadline = Date.now() + P2_EXAM.minutes * 60 * 1000;
    p2StartTimer();
    p2Render();
}

function p2StartPractice(blockId) {
    const block = P2_BLOCKS.find(b => b.id === blockId);
    p2StartSession('practice', p2BuildPractice(blockId), `Práctica: ${block ? block.name : blockId}`);
    p2Render();
}

function p2StartReview() {
    const mistakes = p2Progress().mistakes;
    if (!mistakes.length) {
        showToast('No tienes errores guardados. ¡Haz un simulacro primero!', 'info');
        return;
    }
    const questions = shuffleArray([...mistakes]).slice(0, 15).map(m => p2Prepare(m.raw, m.id));
    p2StartSession('review', questions, 'Repaso de mis errores');
    p2Render();
}

function p2StartSession(mode, questions, title) {
    p2StopTimer();
    p2Session = { mode, title, questions, index: 0, answers: questions.map(() => null), startedAt: Date.now(), finished: false };
}

function p2ExitSession() {
    if (p2Session && p2Session.mode === 'exam' && !p2Session.finished &&
        !confirm('¿Salir del simulacro? Se perderán las respuestas de este intento.')) return;
    p2StopTimer();
    p2Session = null;
    p2Render();
}

// ---------- Temporizador del examen ----------
function p2StartTimer() {
    p2StopTimer();
    p2TimerId = setInterval(() => {
        if (!p2Session || p2Session.finished) { p2StopTimer(); return; }
        const left = p2Session.deadline - Date.now();
        const el = document.getElementById('p2Timer');
        if (el) el.textContent = p2FormatTime(left);
        if (left <= 0) {
            showToast('⏰ Se acabó el tiempo. El simulacro se ha entregado.', 'info');
            p2FinishExam();
        }
    }, 1000);
}

function p2StopTimer() {
    if (p2TimerId) clearInterval(p2TimerId);
    p2TimerId = null;
}

function p2FormatTime(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

// ---------- Respuestas ----------
function p2Choose(optionIndex) {
    const s = p2Session;
    if (!s || s.finished) return;
    const q = s.questions[s.index];
    if (!q || optionIndex < 0 || optionIndex >= q.options.length) return;

    if (s.mode === 'exam') {
        s.answers[s.index] = q.options[optionIndex];
        p2Render();
        return;
    }
    if (s.answers[s.index] !== null) return;      // en práctica no se cambia la respuesta
    const chosen = q.options[optionIndex];
    s.answers[s.index] = chosen;
    const ok = chosen === q.correct;
    state.parcial.totalAnswered = (state.parcial.totalAnswered || 0) + 1;
    if (ok) {
        state.parcial.score = (state.parcial.score || 0) + 1;
        state.parcial.streak = (state.parcial.streak || 0) + 1;
        if (typeof addXP === 'function') addXP(5);
        if (typeof playSuccessChime === 'function') playSuccessChime();
        if (s.mode === 'review') p2ForgetMistake(q.id);
    } else {
        state.parcial.streak = 0;
        if (typeof playErrorBuzzer === 'function') playErrorBuzzer();
        p2RememberMistake(q);
    }
    if (typeof updateParcialHeaderStats === 'function') updateParcialHeaderStats();
    saveStateToStorage();
    p2Render();
}

function p2Go(delta) {
    const s = p2Session;
    if (!s || s.finished) return;
    const next = s.index + delta;
    if (next >= 0 && next < s.questions.length) {
        s.index = next;
        p2Render();
    } else if (next >= s.questions.length && s.mode !== 'exam') {
        p2FinishPractice();
    }
}

function p2GoTo(index) {
    if (!p2Session || p2Session.finished) return;
    p2Session.index = Math.max(0, Math.min(p2Session.questions.length - 1, index));
    p2Render();
}

function p2RememberMistake(q) {
    const prog = p2Progress();
    if (!prog.mistakes.some(m => m.id === q.id)) {
        prog.mistakes.unshift({ id: q.id, raw: q.source });
        prog.mistakes = prog.mistakes.slice(0, 60);
    }
}

function p2ForgetMistake(id) {
    const prog = p2Progress();
    prog.mistakes = prog.mistakes.filter(m => m.id !== id);
}

function p2ConfirmFinish() {
    const s = p2Session;
    if (!s) return;
    const blank = s.answers.filter(a => a === null).length;
    if (blank && !confirm(`Tienes ${blank} pregunta(s) sin responder. ¿Entregar el simulacro?`)) return;
    p2FinishExam();
}

function p2Grade(correct, total) {
    return total ? Math.round((correct / total) * 50) / 10 : 0;
}

function p2Summary() {
    const s = p2Session;
    const byBlock = {};
    let correct = 0;
    s.questions.forEach((q, i) => {
        const ok = s.answers[i] === q.correct;
        if (ok) correct++;
        byBlock[q.b] = byBlock[q.b] || { ok: 0, total: 0 };
        byBlock[q.b].total++;
        if (ok) byBlock[q.b].ok++;
    });
    return { correct, total: s.questions.length, grade: p2Grade(correct, s.questions.length), byBlock };
}

function p2FinishExam() {
    const s = p2Session;
    if (!s || s.finished) return;
    p2StopTimer();
    s.finished = true;
    s.finishedAt = Date.now();
    const sum = p2Summary();
    s.questions.forEach((q, i) => { if (s.answers[i] !== q.correct) p2RememberMistake(q); });

    const prog = p2Progress();
    prog.history.unshift({
        date: new Date(s.finishedAt).toISOString(),
        correct: sum.correct,
        total: sum.total,
        grade: sum.grade,
        seconds: Math.round((s.finishedAt - s.startedAt) / 1000),
        byBlock: sum.byBlock
    });
    prog.history = prog.history.slice(0, 20);

    state.parcial.totalAnswered = (state.parcial.totalAnswered || 0) + sum.total;
    state.parcial.score = (state.parcial.score || 0) + sum.correct;
    if (typeof addXP === 'function') addXP(sum.correct * 5);
    if (typeof updateParcialHeaderStats === 'function') updateParcialHeaderStats();
    saveStateToStorage();
    p2Render();
}

function p2FinishPractice() {
    const s = p2Session;
    if (!s) return;
    s.finished = true;
    s.finishedAt = Date.now();
    p2Render();
}

// ---------- Interfaz ----------
function p2Render() {
    const container = document.getElementById('parcialWorkspaceContainer');
    if (!container || !state.parcial || state.parcial.mode !== 'p2sim') return;
    if (!p2Session) container.innerHTML = p2HomeHtml();
    else if (p2Session.finished) container.innerHTML = p2ResultsHtml();
    else container.innerHTML = p2QuestionHtml();
}

const P2_CARD = 'bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5';
const P2_BTN = 'px-4 py-2.5 rounded-xl text-sm font-bold transition active:scale-98';

function p2HomeHtml() {
    const prog = p2Progress();
    const blocks = P2_BLOCKS.map(b => {
        const count = P2_BANK.filter(q => q.b === b.id).length + (P2_GENERATORS[b.id] ? 12 : 0);
        return `<button type="button" data-action="p2StartPractice" data-args='["${b.id}"]'
            class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/60 text-left transition active:scale-98">
            <span class="text-sm font-bold text-white flex items-center gap-2"><i class="fa-solid ${b.icon} stage-theme-accent-text"></i>${b.name}</span>
            <span class="text-[11px] text-slate-400">${count}+ preguntas</span>
        </button>`;
    }).join('');
    const history = prog.history.slice(0, 5).map(h => {
        const d = new Date(h.date);
        const pass = h.grade >= P2_EXAM.passGrade;
        return `<li class="flex items-center justify-between text-xs py-1.5 border-b border-slate-800 last:border-0">
            <span class="text-slate-400">${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span class="text-slate-300">${h.correct}/${h.total}</span>
            <span class="font-black ${pass ? 'text-emerald-400' : 'text-rose-400'}">${h.grade.toFixed(1)}</span>
        </li>`;
    }).join('');

    return `<div class="space-y-5">
        <div class="${P2_CARD} border-emerald-500/40">
            <h3 class="text-lg font-black text-white flex items-center gap-2"><i class="fa-solid fa-file-pen stage-theme-accent-text"></i> Simulacro de examen</h3>
            <p class="text-sm text-slate-300 mt-1">${P2_EXAM.questions} preguntas de opción múltiple de todos los temas · ${P2_EXAM.minutes} minutos ·
                nota sobre 5,0 (aprueba con ${P2_EXAM.passGrade.toFixed(1)}). Verás los resultados al entregar, como en el parcial virtual.</p>
            <button type="button" id="p2StartExamBtn" data-action="p2StartExam" class="${P2_BTN} mt-4 stage-theme-primary-btn shadow-md">
                <i class="fa-solid fa-play mr-1"></i> Empezar simulacro
            </button>
        </div>
        <div class="${P2_CARD}">
            <h3 class="text-base font-black text-white">Práctica por tema</h3>
            <p class="text-xs text-slate-400 mt-1 mb-3">10 preguntas del tema elegido, con la respuesta y la explicación al instante.</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">${blocks}</div>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
            <div class="${P2_CARD}">
                <h3 class="text-base font-black text-white">Repasar mis errores</h3>
                <p class="text-xs text-slate-400 mt-1">${prog.mistakes.length ? `Tienes ${prog.mistakes.length} pregunta(s) para repasar. Al acertarlas, salen de la lista.` : 'Aquí aparecerán las preguntas que falles.'}</p>
                <button type="button" data-action="p2StartReview" ${prog.mistakes.length ? '' : 'disabled'}
                    class="${P2_BTN} mt-3 bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 disabled:opacity-40">Repasar (${prog.mistakes.length})</button>
            </div>
            <div class="${P2_CARD}">
                <h3 class="text-base font-black text-white">Últimos simulacros</h3>
                ${history ? `<ul class="mt-2">${history}</ul>` : '<p class="text-xs text-slate-400 mt-1">Todavía no has hecho ningún simulacro.</p>'}
            </div>
        </div>
    </div>`;
}

function p2QuestionHtml() {
    const s = p2Session;
    const q = s.questions[s.index];
    const answer = s.answers[s.index];
    const isExam = s.mode === 'exam';
    const revealed = !isExam && answer !== null;
    const block = P2_BLOCKS.find(b => b.id === q.b);
    const reading = q.r ? P2_READINGS[q.r] : null;

    const options = q.options.map((opt, i) => {
        let style = 'bg-slate-950/60 border-slate-700 text-white hover:border-emerald-500/60';
        if (isExam && answer === opt) style = 'p2-selected bg-emerald-500/15 border-emerald-400 text-white';
        if (revealed) {
            if (opt === q.correct) style = 'bg-emerald-500/20 border-emerald-400 text-emerald-200';
            else if (opt === answer) style = 'bg-rose-500/20 border-rose-400 text-rose-200';
            else style = 'bg-slate-950/40 border-slate-800 text-slate-500';
        }
        return `<button type="button" data-action="p2Choose" data-args='[${i}]' id="p2-opt-${i}" ${revealed ? 'disabled' : ''}
            class="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition active:scale-98 ${style}">
            <span class="w-7 h-7 shrink-0 rounded-lg bg-slate-800 text-slate-300 text-xs font-black flex items-center justify-center">${P2_LETTERS[i]}</span>
            <span class="font-jp text-base sm:text-lg font-bold">${p2Escape(opt)}</span>
        </button>`;
    }).join('');

    const map = isExam ? `<div class="flex flex-wrap gap-1.5 mt-4" aria-label="Mapa de preguntas">${s.questions.map((_, i) =>
        `<button type="button" data-action="p2GoTo" data-args='[${i}]' aria-label="Pregunta ${i + 1}"
            class="w-8 h-8 rounded-lg text-xs font-bold border ${i === s.index ? 'border-emerald-400 text-white' : 'border-slate-700 text-slate-400'} ${s.answers[i] !== null ? 'bg-emerald-500/20' : 'bg-slate-950/60'}">${i + 1}</button>`).join('')}</div>` : '';

    const nav = isExam ? `
        <div class="flex flex-wrap items-center justify-between gap-2 mt-5">
            <button type="button" data-action="p2Go" data-args='[-1]' ${s.index === 0 ? 'disabled' : ''} class="${P2_BTN} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 disabled:opacity-40"><i class="fa-solid fa-arrow-left mr-1"></i> Anterior</button>
            <button type="button" id="p2FinishBtn" data-action="p2ConfirmFinish" class="${P2_BTN} bg-amber-500 text-slate-950 hover:bg-amber-400">Entregar</button>
            <button type="button" data-action="p2Go" data-args='[1]' ${s.index === s.questions.length - 1 ? 'disabled' : ''} class="${P2_BTN} stage-theme-primary-btn disabled:opacity-40">Siguiente <i class="fa-solid fa-arrow-right ml-1"></i></button>
        </div>` : (revealed ? `
        <div class="mt-4 p-4 rounded-xl border ${answer === q.correct ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-rose-500/40 bg-rose-500/10'}">
            <p class="font-black ${answer === q.correct ? 'text-emerald-300' : 'text-rose-300'}">${answer === q.correct ? '✓ ¡Correcto!' : `✗ La respuesta correcta es: <span class="font-jp">${p2Escape(q.correct)}</span>`}</p>
            <p class="text-sm text-slate-200 mt-1">${p2Escape(q.e)}</p>
        </div>
        <div class="flex justify-end mt-4">
            <button type="button" id="p2NextBtn" data-action="p2Go" data-args='[1]' class="${P2_BTN} stage-theme-primary-btn">${s.index === s.questions.length - 1 ? 'Ver resumen' : 'Siguiente'} <i class="fa-solid fa-arrow-right ml-1"></i></button>
        </div>` : '');

    return `<div class="${P2_CARD} space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
                <p class="text-[11px] uppercase tracking-wider font-bold text-slate-400">${p2Escape(s.title)}</p>
                <p class="text-sm font-bold text-white">Pregunta ${s.index + 1} de ${s.questions.length} · <span class="stage-theme-accent-text">${block ? block.name : ''}</span></p>
            </div>
            <div class="flex items-center gap-2">
                ${isExam ? `<span class="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 font-mono font-bold text-amber-300" aria-label="Tiempo restante"><i class="fa-solid fa-clock mr-1"></i><span id="p2Timer">${p2FormatTime(s.deadline - Date.now())}</span></span>` : ''}
                <button type="button" data-action="p2ExitSession" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800">Salir</button>
            </div>
        </div>
        ${reading ? `<div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <p class="text-xs font-bold text-slate-400 mb-1">Lectura: <span class="font-jp">${p2Escape(reading.title)}</span></p>
            <p class="font-jp text-base leading-loose text-white">${p2Escape(reading.text)}</p>
        </div>` : ''}
        <div>
            <p class="text-sm sm:text-base text-slate-200 font-semibold">${p2Escape(q.q)}</p>
            ${q.s ? `<p class="font-jp text-xl sm:text-2xl font-bold text-white mt-2 leading-relaxed">${p2Escape(q.s)}</p>` : ''}
        </div>
        <div class="grid gap-2.5">${options}</div>
        <p class="hidden sm:block text-[11px] text-slate-500">Teclado: 1–4 o A–D para responder${isExam ? ', ← → para moverte' : ', Enter para seguir'}.</p>
        ${nav}
        ${map}
    </div>`;
}

function p2ResultsHtml() {
    const s = p2Session;
    const sum = p2Summary();
    const isExam = s.mode === 'exam';
    const pass = sum.grade >= P2_EXAM.passGrade;
    const minutes = Math.round(((s.finishedAt || Date.now()) - s.startedAt) / 60000);
    const blocks = Object.entries(sum.byBlock).map(([id, r]) => {
        const b = P2_BLOCKS.find(x => x.id === id);
        const pct = Math.round((r.ok / r.total) * 100);
        return `<div>
            <div class="flex justify-between text-xs"><span class="text-slate-300">${b ? b.name : id}</span><span class="font-bold text-white">${r.ok}/${r.total}</span></div>
            <div class="h-2 rounded-full bg-slate-800 mt-1 overflow-hidden"><div class="h-full ${pct >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}" style="width:${pct}%"></div></div>
        </div>`;
    }).join('');
    const wrong = s.questions.map((q, i) => ({ q, a: s.answers[i] })).filter(x => x.a !== x.q.correct).map(({ q, a }) => `
        <li class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <p class="text-xs text-slate-400">${p2Escape(q.q)}</p>
            ${q.s ? `<p class="font-jp font-bold text-white">${p2Escape(q.s)}</p>` : ''}
            <p class="text-sm mt-1"><span class="text-rose-300">Tu respuesta: <span class="font-jp">${a === null ? '(sin responder)' : p2Escape(a)}</span></span> ·
                <span class="text-emerald-300">Correcta: <span class="font-jp">${p2Escape(q.correct)}</span></span></p>
            <p class="text-xs text-slate-300 mt-1">${p2Escape(q.e)}</p>
        </li>`).join('');

    return `<div class="space-y-5">
        <div class="${P2_CARD} text-center">
            <p class="text-xs uppercase tracking-wider font-bold text-slate-400">${p2Escape(s.title)}</p>
            <p id="p2Grade" class="text-5xl font-black mt-2 ${pass ? 'text-emerald-400' : 'text-rose-400'}">${sum.grade.toFixed(1)}</p>
            <p class="text-sm text-slate-300 mt-1">${sum.correct} de ${sum.total} correctas${isExam ? ` · ${minutes} min` : ''} ·
                <span class="font-bold ${pass ? 'text-emerald-300' : 'text-rose-300'}">${pass ? 'Aprobado' : 'Por debajo de ' + P2_EXAM.passGrade.toFixed(1)}</span></p>
            <div class="flex flex-wrap justify-center gap-2 mt-4">
                ${isExam ? `<button type="button" data-action="p2StartExam" class="${P2_BTN} stage-theme-primary-btn">Nuevo simulacro</button>` : ''}
                <button type="button" data-action="p2StartReview" class="${P2_BTN} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">Repasar mis errores</button>
                <button type="button" data-action="p2ExitSession" class="${P2_BTN} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">Volver</button>
            </div>
        </div>
        <div class="${P2_CARD} space-y-3"><h3 class="text-base font-black text-white">Aciertos por tema</h3>${blocks}</div>
        ${wrong ? `<div class="${P2_CARD}"><h3 class="text-base font-black text-white mb-3">Revisa estas preguntas</h3><ul class="space-y-2">${wrong}</ul></div>` :
            `<div class="${P2_CARD} text-center text-emerald-300 font-bold">¡Sin errores! 🎉</div>`}
    </div>`;
}

// ---------- Guía rápida (págs. 56–57) ----------
function renderParcial2Guide(container) {
    const hours = P2_HOURS.map(h => `<div class="p-2 rounded-lg text-center border ${h.ex ? 'border-amber-400/60 bg-amber-500/10' : 'border-slate-800 bg-slate-950/60'}">
        <div class="text-xs text-slate-400">${h.n}:00</div><div class="font-jp font-bold ${h.ex ? 'text-amber-300' : 'text-white'}">${h.hira}</div></div>`).join('');
    const days = P2_DAYS.map(d => `<div class="p-2 rounded-lg text-center border border-slate-800 bg-slate-950/60"><div class="text-xs text-slate-400">${d.es}</div><div class="font-jp font-bold text-white">${d.hira}</div></div>`).join('');
    const verbs = P2_VERBS.map(v => `<tr class="border-b border-slate-800">
        <td class="py-1.5 font-jp font-bold text-white">${v.dict}</td><td class="font-jp text-slate-200">${v.masu}</td>
        <td class="font-jp text-slate-300">${v.masu.replace(/ます$/, 'ません')}</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold ${v.type === 'ru' ? 'bg-sky-500/20 text-sky-300' : v.type === 'u' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}">${v.type === 'irr' ? 'irregular' : v.type}${v.trap ? ' ⚠️' : ''}</span></td>
        <td class="text-xs text-slate-400">${v.es} · ${v.p}</td></tr>`).join('');
    const particles = [
        ['は', 'Tema de la oración', 'わたしは がくせいです。'],
        ['を', 'Objeto directo', 'コーヒーを のみます。'],
        ['に', 'Hora exacta', 'しちじに おきます。'],
        ['に', 'Destino (いく・くる・かえる)', 'がっこうに いきます。'],
        ['で', 'Lugar donde ocurre la acción', 'としょかんで よみます。'],
        ['も', 'También (sustituye a は, が, を)', 'わたしも のみます。'],
        ['が', 'Lo que gusta (〜が すきです)', 'アニメが すきです。'],
        ['の', 'Posesión / 〜の あとで', 'クラスの あとで'],
        ['から・まで', 'Desde · hasta', 'くじから ごじまで'],
        ['×', 'Tiempos relativos: まいにち, きょう, あした, こんしゅう, らいしゅう…', 'あした いきます。']
    ].map(([p, use, ex]) => `<tr class="border-b border-slate-800"><td class="py-1.5 font-jp font-black stage-theme-accent-text">${p}</td><td class="text-sm text-slate-200">${use}</td><td class="font-jp text-white">${ex}</td></tr>`).join('');
    const vocab = P2_GUIDE_VOCAB.map(g => `<div class="${P2_CARD}"><h4 class="text-sm font-black text-white mb-2">${g.cat}</h4>
        <div class="grid grid-cols-2 gap-1.5">${g.items.map(([jp, es]) => `<div class="text-xs"><span class="font-jp font-bold text-white">${jp}</span> <span class="text-slate-400">${es}</span></div>`).join('')}</div></div>`).join('');

    container.innerHTML = `<div class="space-y-5">
        <div class="${P2_CARD}">
            <h3 class="text-base font-black text-white">Orden de la oración</h3>
            <p class="font-jp text-lg text-white mt-2 leading-relaxed">わたしは ＋ まいにち/しちじに ＋ がっこうで ＋ ごはんを ＋ <span class="stage-theme-accent-text">たべます</span>。</p>
            <p class="text-xs text-slate-400 mt-1">Tema は → tiempo → lugar で/に → objeto を → <b>verbo siempre al final</b>. Cada partícula va DETRÁS de su palabra.</p>
        </div>
        <div class="${P2_CARD}">
            <h3 class="text-base font-black text-white mb-2">Horas 〜じ <span class="text-xs text-amber-300 font-bold">(en amarillo, las excepciones)</span></h3>
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-1.5">${hours}</div>
            <p class="text-xs text-slate-400 mt-2">〜はん = y media (くじはん) · 〜ごろ = alrededor de (にじごろ) · ごぜん = a. m. · ごご = p. m., antes de la hora (ごご さんじ) · なんじ = ¿qué hora? · いつ = ¿cuándo?</p>
        </div>
        <div class="${P2_CARD}">
            <h3 class="text-base font-black text-white mb-2">Días 〜ようび</h3>
            <div class="grid grid-cols-4 sm:grid-cols-7 gap-1.5">${days}</div>
            <p class="text-xs text-slate-400 mt-2">こんしゅう = esta semana · らいしゅう = la próxima · しゅうまつ = fin de semana · なんようび = ¿qué día?</p>
        </div>
        <div class="${P2_CARD} overflow-x-auto">
            <h3 class="text-base font-black text-white mb-2">Partículas</h3>
            <table class="w-full text-left"><tbody>${particles}</tbody></table>
        </div>
        <div class="${P2_CARD} overflow-x-auto">
            <h3 class="text-base font-black text-white mb-2">Verbos de la lección</h3>
            <table class="w-full text-left text-sm"><thead><tr class="text-[11px] uppercase text-slate-400"><th>Diccionario</th><th>〜ます</th><th>〜ません</th><th>Tipo</th><th>Significado · partícula</th></tr></thead><tbody>${verbs}</tbody></table>
            <p class="text-xs text-slate-400 mt-2">ru: quita る + ます (たべる → たべます). u: última sílaba a la fila i + ます (のむ → のみます). ⚠️ かえる termina en -eru pero es u: かえります.</p>
        </div>
        <div class="${P2_CARD}">
            <h3 class="text-base font-black text-white mb-2">Frecuencia</h3>
            <p class="font-jp text-white">ぜんぜん → あまり → ときどき → よく → まいにち</p>
            <p class="text-xs text-slate-400 mt-1">0 % → 100 %. <b>ぜんぜん y あまり van con verbo negativo</b> (〜ません): あまり のみません.</p>
            <h3 class="text-base font-black text-white mt-4 mb-1">Conectores</h3>
            <p class="text-sm text-slate-200"><span class="font-jp font-bold">それから</span> y luego · <span class="font-jp font-bold">だから</span> por eso · <span class="font-jp font-bold">でも</span> pero</p>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">${vocab}</div>
        <div class="text-center"><button type="button" data-action="setParcialMode" data-args='["p2sim"]' class="${P2_BTN} stage-theme-primary-btn">Ir al simulacro <i class="fa-solid fa-arrow-right ml-1"></i></button></div>
    </div>`;
}

function renderParcial2Simulator() {
    p2Render();
}

// ---------- Teclado: 1–4 / A–D, Enter, flechas ----------
document.addEventListener('keydown', e => {
    const tab = document.getElementById('tab-parcial');
    if (!p2Session || p2Session.finished || !tab || tab.classList.contains('hidden')) return;
    if (!state.parcial || state.parcial.mode !== 'p2sim') return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;

    const key = e.key.toLowerCase();
    let handled = true;
    if (key >= '1' && key <= '4') p2Choose(Number(key) - 1);
    else if (['a', 'b', 'c', 'd'].includes(key)) p2Choose(key.charCodeAt(0) - 97);
    else if (key === 'arrowright' && p2Session.mode === 'exam') p2Go(1);
    else if (key === 'arrowleft' && p2Session.mode === 'exam') p2Go(-1);
    else if (key === 'enter' && p2Session.mode !== 'exam' && p2Session.answers[p2Session.index] !== null) p2Go(1);
    else handled = false;
    if (handled) {
        e.preventDefault();
        e.stopPropagation();
    }
});
