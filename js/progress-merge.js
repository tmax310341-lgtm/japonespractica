// KotoDojo · Fusión del progreso de dos dispositivos (local y nube)
//
// mergeProgress(local, remote) combina dos objetos creados por buildSaveObject()
// sin perder avances de ninguno de los dos:
//   - XP: el mayor.
//   - Racha: la del día más reciente, continuando la del otro dispositivo si fue el día anterior.
//   - SRS (hiragana y katakana): por cada kana, el repaso más reciente; las entradas sin repasos
//     (creadas solo al mostrar el kana) nunca pisan a una con repasos.
//   - Modo 9 Etapas: niveles desbloqueados y dominados acumulados, mejores puntuaciones y maestría.
//   - Ajustes (tema, voz, grupos elegidos…): los del guardado más reciente (savedAt).
// Es una función pura: no toca `state` ni el DOM.

function mergeProgress(local, remote) {
    if (!remote) return local ? { ...local } : null;
    if (!local) return { ...remote };

    const remoteIsNewer = (remote.savedAt || 0) > (local.savedAt || 0);
    const newer = remoteIsNewer ? remote : local;
    const older = remoteIsNewer ? local : remote;

    const out = { ...older, ...newer };

    out.xp = Math.max(local.xp || 0, remote.xp || 0);
    Object.assign(out, mergeStreak(local, remote));

    out.srs = mergeSrsStore(local.srs, remote.srs);
    out.srs_katakana = mergeSrsStore(local.srs_katakana, remote.srs_katakana);

    out.stagesAutoProgress = mergeStagesProgress(older.stagesAutoProgress, newer.stagesAutoProgress);
    out.stagesAutoProgress_katakana = mergeStagesProgress(older.stagesAutoProgress_katakana, newer.stagesAutoProgress_katakana);

    out.savedAt = Math.max(local.savedAt || 0, remote.savedAt || 0);
    return out;
}

// Diferencia en días entre dos fechas 'YYYY-MM-DD' (b - a).
function daysBetween(a, b) {
    const da = Date.UTC(+a.slice(0, 4), +a.slice(5, 7) - 1, +a.slice(8, 10));
    const db = Date.UTC(+b.slice(0, 4), +b.slice(5, 7) - 1, +b.slice(8, 10));
    return Math.round((db - da) / 86400000);
}

function mergeStreak(a, b) {
    const da = a.lastActiveDate || '';
    const db = b.lastActiveDate || '';
    const sa = a.streak || 0;
    const sb = b.streak || 0;
    if (!da || !db) {
        const only = da ? a : b;
        return { lastActiveDate: only.lastActiveDate, streak: Math.max(sa, sb) };
    }
    if (da === db) return { lastActiveDate: da, streak: Math.max(sa, sb) };

    const [early, late] = da < db ? [a, b] : [b, a];
    const gap = daysBetween(early.lastActiveDate, late.lastActiveDate);
    // Si el otro dispositivo se usó el día anterior, la racha continúa desde él.
    const continued = gap === 1 ? (early.streak || 0) + 1 : 0;
    return { lastActiveDate: late.lastActiveDate, streak: Math.max(late.streak || 0, continued) };
}

function mergeSrsStore(a, b) {
    a = a || {};
    b = b || {};
    const out = {};
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
        out[key] = pickSrsEntry(a[key], b[key]);
    }
    return out;
}

function pickSrsEntry(x, y) {
    if (!x) return y;
    if (!y) return x;
    const rx = x.reviews || 0;
    const ry = y.reviews || 0;
    if (rx === 0 && ry > 0) return y;
    if (ry === 0 && rx > 0) return x;
    const tx = x.lastReviewed || 0;
    const ty = y.lastReviewed || 0;
    if (tx !== ty) return tx > ty ? x : y;
    return ry > rx ? y : x;
}

// `newer` aporta los valores de preferencia (como el nivel seleccionado).
function mergeStagesProgress(older, newer) {
    if (!older) return newer;
    if (!newer) return older;

    const mastered = [...(newer.masteredLevels || [])];
    for (const id of older.masteredLevels || []) {
        if (!mastered.includes(id)) mastered.push(id);
    }

    const levelScores = {};
    const scoresA = older.levelScores || {};
    const scoresB = newer.levelScores || {};
    for (const id of new Set([...Object.keys(scoresA), ...Object.keys(scoresB)])) {
        const x = scoresA[id];
        const y = scoresB[id];
        if (!x || !y) { levelScores[id] = x || y; continue; }
        levelScores[id] = {
            ...x,
            ...y,
            bestScore: Math.max(x.bestScore || 0, y.bestScore || 0),
            attempts: Math.max(x.attempts || 0, y.attempts || 0),
            lastCompleted: Math.max(x.lastCompleted || 0, y.lastCompleted || 0)
        };
    }

    const kanaMastery = {};
    const masteryA = older.kanaMastery || {};
    const masteryB = newer.kanaMastery || {};
    for (const k of new Set([...Object.keys(masteryA), ...Object.keys(masteryB)])) {
        const x = masteryA[k];
        const y = masteryB[k];
        if (!x || !y) { kanaMastery[k] = x || y; continue; }
        kanaMastery[k] = {
            ...x,
            ...y,
            mastery: Math.max(x.mastery || 0, y.mastery || 0),
            lastPracticed: Math.max(x.lastPracticed || 0, y.lastPracticed || 0)
        };
    }

    return {
        ...older,
        ...newer,
        unlockedIndex: Math.max(older.unlockedIndex || 0, newer.unlockedIndex || 0),
        masteredLevels: mastered,
        levelScores,
        kanaMastery
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mergeProgress, mergeStreak, mergeSrsStore, mergeStagesProgress };
}
