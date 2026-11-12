// KotoDojo · Utilidades generales

// Mezcla un array en el sitio (algoritmo Fisher–Yates) y lo devuelve.
// Todas las permutaciones son igual de probables, a diferencia de
// arr.sort(() => Math.random() - 0.5), que favorece ciertos órdenes.
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Normaliza una lectura en rōmaji para comparar respuestas sin penalizar variantes válidas:
//   - Kunrei / Nihon-shiki: si, ti, tu, hu, zi, sya, tya, zya…
//   - Escritura de teclado: nn para ん, jya, cha/tya…
//   - ぢ, づ y を: se aceptan ji, zu y o además de dji, dzu y wo
//   - Macrones (ō, ū…) y vocales largas oo/ou
//   - Espacios, guiones y apóstrofos (kon'nichiwa)
function normalizeRomaji(text) {
    let s = String(text || '').toLowerCase()
        .replace(/ā/g, 'aa').replace(/ī/g, 'ii').replace(/ū/g, 'uu').replace(/ē/g, 'ee').replace(/ō/g, 'ou')
        .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[\s'’\-.・]/g, '');
    const rules = [
        [/dji/g, 'ji'], [/dzu/g, 'zu'],
        [/(dy|jy|zy)(?=[auo])/g, 'j'], [/sy(?=[auo])/g, 'sh'], [/(ty|cy)(?=[auo])/g, 'ch'],
        [/si/g, 'shi'], [/ti/g, 'chi'], [/tu/g, 'tsu'], [/hu/g, 'fu'], [/zi/g, 'ji'], [/di/g, 'ji'], [/du/g, 'zu'],
        [/cch/g, 'tch'], [/wo/g, 'o'], [/oo/g, 'ou'],
        [/nn(?![aiueoy])/g, 'n'], [/m(?=[bpm])/g, 'n']
    ];
    rules.forEach(([re, rep]) => { s = s.replace(re, rep); });
    return s;
}

// true si la respuesta escrita corresponde a la lectura correcta
function romajiMatches(answer, target) {
    const a = normalizeRomaji(answer);
    return a !== '' && a === normalizeRomaji(target);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { shuffleArray, normalizeRomaji, romajiMatches };
}
