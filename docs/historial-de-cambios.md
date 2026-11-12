# Historial de cambios de KotoDojo — 11 y 12 de noviembre de 2026

Resumen de todo lo que se hizo en esta sesión, en orden: por qué se hizo, qué cambió y qué hay que tener en cuenta a partir de ahora.

| PR | Fecha | Qué hizo |
|---|---|---|
| [#1](https://github.com/tmax310341-lgtm/japonespractica/pull/1) | 11 nov | Separar `index.html` en módulos, compilar Tailwind, quitar los `!important`, delegar eventos y corregir la mezcla aleatoria y los kanas débiles con katakana |
| [#2](https://github.com/tmax310341-lgtm/japonespractica/pull/2) | 12 nov | Iniciar sesión con Google y sincronizar el progreso en la nube |
| [#3](https://github.com/tmax310341-lgtm/japonespractica/pull/3) | 12 nov | App instalable sin conexión, carga más ligera, accesibilidad y navegación por URL |
| [#4](https://github.com/tmax310341-lgtm/japonespractica/pull/4) | 12 nov | Pruebas automáticas en GitHub y corrección de 6 errores |

En total: 63 archivos modificados, todos fusionados en `main` y publicados en
<https://tmax310341-lgtm.github.io/japonespractica/>.

---

## 1. Reorganización del código (PR #1)

**Antes:** toda la app estaba en un único `index.html` de 1,4 MB y unas 22.000 líneas, con 1,1 MB de JavaScript, 303 `!important` y 511 manejadores `onclick` escritos dentro del HTML.

### Archivo separado en módulos
`index.html` quedó en unos 280 KB. El resto se repartió así:

| Carpeta | Contenido |
|---|---|
| `css/` | `app.css` (punto de entrada), `base.css`, `theme-overrides.css` y `tailwind.css` |
| `data/` | Datos puros: kanas, trazos SVG, vocabulario, pasos de trazo y kanjis de números |
| `js/` | Un archivo por módulo: `stages.js`, `numbers.js`, `drawing.js`, `game-*.js`, `state.js`, `main.js`… |

Se usan scripts clásicos (no `type="module"`) en el mismo orden que el script original, para que todo funcione igual.

### Tailwind compilado
- Antes se cargaba desde `cdn.tailwindcss.com`, que genera el CSS en el navegador cada vez que se abre la app y no sirve para producción.
- Ahora `npm run build:css` genera `css/tailwind.css`, que se sube al repositorio.

### Sin `!important`
- Se eliminaron los 303 `!important` usando **capas CSS** (`@layer`):
  - Font Awesome, `base.css` y Tailwind van en la capa `app`, en el mismo orden de antes.
  - Los ajustes de los temas van fuera de esa capa, así que ganan sin necesidad de `!important`.
- El orden de la cascada está explicado en `css/app.css`.

### Eventos sin JavaScript en el HTML
- Los 511 `onclick`, `onchange`, `oninput` y de arrastrar y soltar pasaron a atributos `data-action` y `data-args`, gestionados desde `js/actions.js`.
- Ejemplo: `onclick="speakJapanese('あ')"` ahora es `data-action="speakJapanese" data-args='["あ"]'`.

### Mezcla aleatoria sin sesgo
- Las 16 mezclas `sort(() => Math.random() - 0.5)` favorecían ciertos órdenes.
- Ahora usan `shuffleArray()`, con el algoritmo Fisher–Yates, en `js/utils.js`.

### Error corregido
- **Kanas débiles con katakana:** en Progreso SRS, los botones de practicar kanas débiles fallaban (`Cannot read properties of undefined`) porque solo buscaban en hiragana.

### Cómo se verificó
- Se comparó la versión original con la nueva en el navegador, con el azar y la fecha fijados:
  - 55 propiedades de estilo de unos 4.000 elementos, en 15 pestañas × 6 temas, salieron idénticas;
  - 157 botones pulsados dieron el mismo resultado.

---

## 2. Inicio de sesión con Google (PR #2)

- **Botón en el menú ☰:** «Iniciar sesión con Google». Con la sesión iniciada se ven el nombre, la foto y el estado («☁️ Sincronizado a las…»).
- **Firebase:** proyecto `kotodojo-1eb1a`, con Authentication y Firestore. Cada usuario tiene un documento `users/{uid}` con su progreso.
- **Combinación sin pérdidas** entre dispositivos (`js/progress-merge.js`):
  - XP: se queda el mayor.
  - Racha: continúa si el otro dispositivo se usó el día anterior.
  - SRS: el repaso más reciente de cada kana.
  - Modo 9 Etapas: se acumulan los niveles desbloqueados y dominados.
  - Tema, voz y demás ajustes: los del último dispositivo que guardó.
- **Sincronización:** cada cambio se sube a los 3 segundos; al volver a la app se descargan los cambios hechos en otros dispositivos. Sin conexión, todo sigue guardándose en el dispositivo.
- **Seguridad:** las reglas de `firestore.rules` impiden que un usuario lea o escriba los datos de otro.
- **Guía de configuración:** `docs/firebase-setup.md`.

---

## 3. App instalable, ligera y accesible (PR #3)

### Funciona sin conexión (PWA)
- `manifest.json` e iconos con el «言» de la app: se puede **instalar** desde el navegador.
  - Android (Chrome): menú ⋮ → «Instalar app».
  - iPhone (Safari): Compartir → «Añadir a pantalla de inicio».
- `sw.js` (*service worker*): la app abre y funciona **sin internet**. Con conexión, siempre carga la última versión publicada.

### Carga inicial más ligera
- `numbers.js`, `time.js` y `parcial.js` se descargan solo la primera vez que abres su pestaña. Son unos 66 KB comprimidos menos al arrancar.
- El icono de Google pasó a ser un SVG. Así no se descarga una fuente de iconos de unos 110 KB para una sola letra.

### Accesibilidad
- Ya se puede **hacer zoom**. Los lienzos de dibujo siguen bloqueando el pellizco.
- 80 botones que solo tenían un icono ahora tienen una etiqueta para lectores de pantalla.
- Si el sistema tiene activado «Reducir movimiento», se quitan las animaciones decorativas. La animación del orden de trazos se mantiene.

### Navegación con la URL
- Cada pestaña tiene su dirección: `#aprender`, `#etapas`, `#numeros`, `#horas`, `#parcial`…
- El botón **«atrás»** vuelve a la pestaña anterior en lugar de cerrar la app.
- Al recargar sigues en la misma pestaña, y se pueden compartir enlaces directos.

### Error corregido
- **Tecla Enter en Números y Horas:** desde el PR #1 ya no pasaba al siguiente ejercicio.

---

## 4. Pruebas automáticas y errores corregidos (PR #4)

### Pruebas en cada PR
GitHub Actions (`.github/workflows/tests.yml`) ejecuta en cada PR:

- **`npm test`**, sin navegador:
  - 664 comprobaciones de datos: silabarios, vocabulario, Shiritori, y lecturas y kanji de números, horas y fechas;
  - qué respuestas en rōmaji se aceptan;
  - la combinación del progreso entre dispositivos;
  - la lista de archivos del modo sin conexión.
- **`npm run test:e2e`**, con Playwright en Chromium:
  - las 15 pestañas con clics en sus botones, en hiragana y en katakana;
  - los temas, el menú, el botón atrás y los enlaces directos;
  - el modo sin conexión;
  - la lógica de Quiz, Memoria, Etapas y Shiritori, repetida muchas veces para cubrir el azar.
- Que `css/tailwind.css` esté recompilado.

Para comprobar que las pruebas detectan fallos reales, se reintrodujeron a propósito errores ya corregidos: las pruebas fallaron.

### Errores corregidos

| Dónde | Problema | Solución |
|---|---|---|
| Quiz rápido y Memoria | Con katakana activo seguían mostrando hiragana | Usan el silabario activo |
| Etapas 5-8 y Armar Palabras | Daban por mala una respuesta correcta: `ji` para ぢ, `zu` para づ, `o` para を, `si`, `tu`, `jya`, `nn`… | Una sola función, `romajiMatches()`, acepta todas las variantes válidas |
| Etapas | Podían aparecer como opciones dos kanas que suenan igual (じ/ぢ, ず/づ, お/を): con audio no había forma de acertar | Se excluyen los homófonos |
| Shiritori | Tras palabras como でんしゃ o ちず no había forma de continuar | Reglas habituales (しゃ → や, ず → す); si no quedan palabras, la cadena se da por completada |
| Trazado | Con katakana mostraba el kana en lugar de su rōmaji | Busca en el silabario correcto |
| Vocabulario | 38 palabras repetidas, «いト» en lugar de «いと» y «のーと» | Datos corregidos |

### Revisado sin encontrar errores
- Las lecturas y los kanji de los números (300, 600, 800, 3000, 8000, 1000万…).
- Horas, minutos, meses y días, con todas sus excepciones (よじ, くじ, しがつ, ついたち, はつか…).
- La correspondencia entre hiragana y katakana, los trazos, los niveles de Etapas, Gemelos, la Sopa de Letras y los datos del parcial.

---

## Cómo trabajar con el proyecto a partir de ahora

### Dónde editar
- Edita `index.html`, `css/`, `js/` y `data/`.
- `juego japones.html`, la antigua copia de un solo archivo, **ya no se usa**.

### Comandos

```bash
npm install                       # solo la primera vez
npm run build:css                 # tras añadir o cambiar clases de Tailwind
npm test                          # pruebas de lógica y datos (rápidas)
npx playwright install chromium   # solo la primera vez, antes de test:e2e
npm run test:e2e                  # pruebas en el navegador
```

### Reglas que conviene recordar
1. **Clases de Tailwind nuevas:** ejecuta `npm run build:css` y sube `css/tailwind.css`. GitHub avisa si se te olvida.
2. **Archivo nuevo en `js/`, `data/`, `css/` o `icons/`:** añádelo a `APP_SHELL` en `sw.js` para que funcione sin conexión. `npm test` avisa si falta.
3. **Botones nuevos:** usa `data-action="miFuncion"` en lugar de `onclick`, y declara la función con `function miFuncion() {}`. Los detalles están en `js/actions.js`.
4. **Pestaña nueva:** añade su dirección en `TAB_SLUGS`, dentro de `js/ui-themes.js`.
5. **Firebase:** la configuración está en `js/firebase-config.js`. No es secreta; lo que protege los datos es `firestore.rules`.

### Pendiente (mejoras pequeñas)
- Cargar solo los grosores de la fuente Inter que se usan.
- Minificar el JavaScript, para reducirlo un 30–40 % más.
- Convertir en `<button>` los 11 `div` que actúan como botones, para que se puedan usar con teclado.
- Hacer que el XP ganado en dos dispositivos sin conexión se sume en lugar de quedarse con el mayor.
- Dividir `numbers.js` (215 KB) y `stages.js` (192 KB) cuando toque trabajar en ellos.
