// Comprueba que sw.js precarga todos los archivos de la app (para que funcione sin conexión).
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const shellBlock = sw.match(/const APP_SHELL = \[([\s\S]*?)\];/);
assert.ok(shellBlock, 'No se encontró APP_SHELL en sw.js');
const shell = new Set([...shellBlock[1].matchAll(/'([^']+)'/g)].map(m => m[1]));

const expected = new Set(['index.html', 'manifest.json']);
for (const dir of ['js', 'data', 'css', 'icons']) {
    for (const f of fs.readdirSync(path.join(root, dir))) {
        if (f === 'tailwind.input.css') continue;
        expected.add(`${dir}/${f}`);
    }
}

const missing = [...expected].filter(f => !shell.has(f));
const extra = [...shell].filter(f => f !== './' && !fs.existsSync(path.join(root, f)));
assert.deepStrictEqual(missing, [], 'Faltan en APP_SHELL de sw.js: ' + missing.join(', '));
assert.deepStrictEqual(extra, [], 'APP_SHELL de sw.js nombra archivos que no existen: ' + extra.join(', '));
console.log(`ok - sw.js precarga los ${expected.size} archivos de la app`);
