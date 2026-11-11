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
