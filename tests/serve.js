// Servidor estático mínimo para las pruebas (sin dependencias): node tests/serve.js [puerto]
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const port = Number(process.argv[2] || process.env.PORT || 4173);
const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
};

http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel.endsWith('/')) rel += 'index.html';
    const file = path.normalize(path.join(root, rel));
    if (!file.startsWith(root) || file.includes(`${path.sep}node_modules${path.sep}`)) {
        res.writeHead(403).end();
        return;
    }
    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404).end('No encontrado');
            return;
        }
        res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        res.end(data);
    });
}).listen(port, '127.0.0.1', () => console.log(`KotoDojo en http://127.0.0.1:${port}/`));
