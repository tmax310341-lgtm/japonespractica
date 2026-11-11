# KotoDojo (こと道場)

Práctica de japonés: kanas, números, horas y caligrafía. Es una web estática, sin servidor:
basta con abrir `index.html` o publicarla en GitHub Pages.

## Estructura

```
index.html            HTML de la app y orden de carga de los scripts
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
  main.js             inicialización y atajos de teclado
  …                   un archivo por módulo (estudio, trazado, juegos, etapas, números, hora, parcial)
```

Los scripts son clásicos (no módulos) y comparten el ámbito global, así que el orden
de los `<script>` en `index.html` importa: los datos van primero y `main.js` al final.

## Eventos en el HTML

En lugar de `onclick="miFuncion('a', 1)"` se usa:

```html
<button data-action="miFuncion" data-args='["a", 1]'>
```

`js/actions.js` explica los atributos admitidos y los valores especiales
(`"$this"`, `"$event"`, `"$value"`, `data-stop`). La función debe declararse
con `function miFuncion() {}` en el nivel superior de algún archivo de `js/`.

## Tailwind

Tailwind ya no se carga desde el CDN, sino que se compila. Después de añadir o cambiar
clases en `index.html`, `js/` o `data/`:

```bash
npm install          # solo la primera vez
npm run build:css    # regenera css/tailwind.css
```

Durante el desarrollo, `npm run watch:css` lo regenera automáticamente.
