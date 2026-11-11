// KotoDojo · Delegación de eventos (sustituye a los onclick="..." en línea)
//
// En lugar de escribir JavaScript dentro del HTML:
//     <button onclick="speakJapanese('あ')">
// el HTML declara qué función llamar y con qué argumentos:
//     <button data-action="speakJapanese" data-args='["あ"]'>
//
// Atributos admitidos (uno por tipo de evento):
//     data-action     clic
//     data-change     change   (select, checkbox…)
//     data-input      input    (campos de texto)
//     data-enter      tecla Enter dentro del elemento
//     data-dragstart, data-dragover, data-drop, data-dragend   arrastrar y soltar
//
// data-args es un array JSON. Valores especiales:
//     "$this"   el propio elemento
//     "$event"  el evento
//     "$value"  el valor del elemento (this.value)
// data-stop detiene la propagación antes de ejecutar la acción
// (equivale a poner event.stopPropagation() al principio del onclick).
//
// La función se busca por nombre en window, así que debe declararse con
// `function nombre() {}` en el nivel superior de algún archivo de js/.
(function () {
    const EVENT_ATTR = {
        click: 'action',
        change: 'change',
        input: 'input',
        keydown: 'enter',
        dragstart: 'dragstart',
        dragover: 'dragover',
        drop: 'drop',
        dragend: 'dragend'
    };

    function resolveArgs(el, event) {
        const raw = el.getAttribute('data-args');
        if (!raw) return [];
        let args;
        try {
            args = JSON.parse(raw);
        } catch (err) {
            console.error('data-args no es JSON válido:', raw, el);
            return [];
        }
        return args.map(a => (a === '$this' ? el : a === '$event' ? event : a === '$value' ? el.value : a));
    }

    function handleEvent(event) {
        if (event.type === 'keydown' && event.key !== 'Enter') return;
        const attr = EVENT_ATTR[event.type];
        // composedPath() conserva la ruta original aunque la acción vuelva a pintar el DOM,
        // igual que ocurría con los onclick en línea al propagarse el evento.
        for (const el of event.composedPath()) {
            if (el === document || el === window) break;
            if (!el.dataset || !el.dataset[attr]) continue;

            const name = el.dataset[attr];
            const fn = window[name];
            if (typeof fn !== 'function') {
                console.error(`Acción desconocida: ${name}`, el);
                continue;
            }
            if (el.hasAttribute('data-stop')) event.stopImmediatePropagation();
            fn(...resolveArgs(el, event));
            if (event.cancelBubble) break;
        }
    }

    Object.keys(EVENT_ATTR).forEach(type => document.addEventListener(type, handleEvent));
})();

// Acciones genéricas sin otro sitio mejor
function removeParentElement(el) {
    if (el && el.parentElement) el.parentElement.remove();
}
