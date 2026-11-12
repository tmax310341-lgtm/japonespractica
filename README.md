# KotoDojo (こと道場)

Práctica de japonés: kanas, números, horas y caligrafía. Es una web estática, sin servidor:
basta con abrir `index.html` o publicarla en GitHub Pages.

## Estructura

```
index.html            HTML de la app y orden de carga de los scripts
manifest.json         datos para instalar la app (PWA)
sw.js                 service worker: funciona sin conexión (lista APP_SHELL, comprobada con npm test)
icons/                iconos de la app instalada
css/
  app.css             punto de entrada: define el orden de la cascada (léelo primero)
  base.css            estilos propios (animaciones, componentes, variables de los 6 temas)
  theme-overrides.css ajustes de tema sobre Tailwind (sin !important, gracias a @layer)
  tailwind.css        Tailwind compilado (generado, no editar a mano)
  tailwind.input.css  entrada para compilar Tailwind
data/                 datos puros: kanas, trazos SVG, vocabulario, kanjis de números
js/
  utils.js            utilidades (shuffleArray: mezcla Fisher–Yates)
  actions.js          delegación de eventos: data-action, data-change, data-input…
  state.js            estado global y guardado en localStorage
  firebase-config.js  configuración de Firebase (null = sin inicio de sesión)
  cloud-sync.js       cuenta de Google y sincronización en la nube
  progress-merge.js   fusión del progreso de dos dispositivos (probada con npm test)
  main.js             inicialización y atajos de teclado
  …                   un archivo por módulo (estudio, trazado, juegos, etapas, números, hora, parcial)
```

Los scripts son clásicos (no módulos) y comparten el ámbito global, así que el orden
de los `<script>` en `index.html` importa: los datos van primero y `main.js` al final.
`js/numbers.js`, `js/time.js` y `js/parcial.js` no están en `index.html`: se cargan la primera
vez que se abre su pestaña (`TAB_MODULES` en `js/ui-themes.js`).

Cada pestaña tiene su dirección (`#etapas`, `#numeros`, `#horas`…; ver `TAB_SLUGS` en
`js/ui-themes.js`), así que el botón «atrás» vuelve a la pestaña anterior.

Si añades un archivo nuevo a `js/`, `data/`, `css/` o `icons/`, inclúyelo también en
`APP_SHELL` de `sw.js`; `npm test` avisa si falta alguno.

## Eventos en el HTML

En lugar de `onclick="miFuncion('a', 1)"` se usa:

```html
<button data-action="miFuncion" data-args='["a", 1]'>
```

`js/actions.js` explica los atributos admitidos y los valores especiales
(`"$this"`, `"$event"`, `"$value"`, `data-stop`). La función debe declararse
con `function miFuncion() {}` en el nivel superior de algún archivo de `js/`.

## Cuenta de Google y progreso en la nube

Opcional. Con Firebase configurado, el menú ☰ muestra «Iniciar sesión con Google» y el progreso
se sincroniza entre dispositivos (`js/cloud-sync.js`, fusión en `js/progress-merge.js`).
Para activarlo, sigue [docs/firebase-setup.md](docs/firebase-setup.md) y pega tu configuración
en `js/firebase-config.js`. Las pruebas de la fusión se ejecutan con `npm test`.

## Tailwind

Tailwind ya no se carga desde el CDN, sino que se compila. Después de añadir o cambiar
clases en `index.html`, `js/` o `data/`:

```bash
npm install          # solo la primera vez
npm run build:css    # regenera css/tailwind.css
```

Durante el desarrollo, `npm run watch:css` lo regenera automáticamente.
