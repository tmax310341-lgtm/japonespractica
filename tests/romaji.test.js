// Corrección de respuestas escritas en rōmaji (Etapas 5-8 y Armar Palabras).
const assert = require('assert');
const { romajiMatches } = require('../js/utils.js');

const ACCEPT = [
    ['ka', 'ka'], ['KA ', 'ka'],
    // Kunrei / Nihon-shiki
    ['si', 'shi'], ['ti', 'chi'], ['tu', 'tsu'], ['hu', 'fu'], ['zi', 'ji'],
    ['sya', 'sha'], ['tya', 'cha'], ['zya', 'ja'], ['syu', 'shu'], ['tyo', 'cho'],
    // ぢ, づ, を (guardados como dji, dzu, wo)
    ['ji', 'dji'], ['zu', 'dzu'], ['o', 'wo'], ['ja', 'dya'], ['ju', 'dyu'], ['jo', 'dyo'], ['di', 'dji'], ['du', 'dzu'],
    // Teclado japonés
    ['jya', 'ja'], ['cya', 'cha'], ['honn', 'hon'],
    // Palabras
    ["kon'nichiwa", 'konnichiwa'], ['shinbun', 'shimbun'], ['kyō', 'kyou'], ['ōkii', 'ookii'], ['tōkyō', 'toukyou'],
    ['maccha', 'matcha'], ['gak kou', 'gakkou']
];
const REJECT = [
    ['ka', 'ki'], ['shi', 'chi'], ['su', 'tsu'], ['ji', 'chi'], ['n', 'nu'], ['', 'a'], ['   ', 'a'],
    ['konichiwa', 'konnichiwa'], ['gakou', 'gakkou'], ['wa', 'o']
];

for (const [answer, target] of ACCEPT) {
    assert.ok(romajiMatches(answer, target), `debería aceptar «${answer}» para «${target}»`);
}
for (const [answer, target] of REJECT) {
    assert.ok(!romajiMatches(answer, target), `no debería aceptar «${answer}» para «${target}»`);
}
console.log(`ok - rōmaji: ${ACCEPT.length} variantes aceptadas y ${REJECT.length} respuestas incorrectas rechazadas`);
