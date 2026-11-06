# Plan de Implementación: Refactorización Pedagógica del Modo 9 Etapas y Preparación para APK Móvil

Este plan actualiza y expande la arquitectura del **Modo 9 Etapas** en [`juego japones.html`](file:///c:/Users/tmax3/OneDrive/Documentos/japones/juego%20japones.html), incorporando la nueva secuencia cognitiva (adelanto del audio a la Etapa 3), distractores inteligentes basados en gemelos visuales (`LOOKALIKES_DATA`), dosificación estricta contra fatiga motriz, blindaje técnico para empaquetado en APK Android / WebView, y el sistema de maestría progresiva por frontera de aprendizaje.

---

## User Review Required

> [!IMPORTANT]
> **Nueva Secuencia Cognitiva Oficial (Escalera de Adquisición de Kanas):**
> 1. **Etapa 1: Opción Múltiple** (Hiragana $\rightarrow$ Romaji - Reconocimiento pasivo visual).
> 2. **Etapa 2: Opción Inversa** (Romaji $\rightarrow$ Hiragana - Asociación inversa de símbolo).
> 3. **Etapa 3: Escucha y Fonética** [Antes Etapa 7] (Audio $\rightarrow$ Identificar símbolo correcto. Conecta el fonema antes de exigir escritura).
> 4. **Etapa 4: Encontrar el Par** [Antes Etapa 3] (Memoria y discriminación rápida en micro-tableros).
> 5. **Etapa 5: Escribir Respuesta** [Antes Etapa 4] (Hiragana $\rightarrow$ Teclado Romaji. Inicio de producción activa).
> 6. **Etapa 6: Escribir el Texto Continuo** [Antes Etapa 5] (Lectura ágil y mecanografía fluida kana a kana).
> 7. **Etapa 7: Escribir Palabra** [Antes Etapa 6] (Vocabulario en contexto y combinaciones ricas de 3 a 5 kanas).
> 8. **Etapa 8: Orden de Trazos** (Trazado asistido en lienzo SVG vectorial).
> 9. **Etapa 9: Dibujo de Memoria a Ciegas** (Recuerdo motriz puro sin pistas visuales).

> [!NOTE]
> Se mantendrán alias retrocompatibles para todas las funciones anteriores para evitar romper cualquier llamada residual en otras partes del código o en Modo Manual.

---

## Open Questions

*No hay preguntas abiertas pendientes; las especificaciones pedagógicas y técnicas han sido definidas con total precisión.*

---

## Proposed Changes

### Componente 1: Interfaz HTML de Configuración (Checkboxes y Etiquetas)

#### [MODIFY] [juego japones.html](file:///c:/Users/tmax3/OneDrive/Documentos/japones/juego%20japones.html)
- En el contenedor `#stagesCheckboxGrid` (Líneas ~1685-1785), reorganizar las tarjetas de selección manual para reflejar el nuevo orden pedagógico:
  - **Etapa 3:** Color `rose-500`, Ícono `fa-volume-high`, Título **Escucha y Fonética**, Descripción: *"Escucha la pronunciación nativa y elige el símbolo correcto."*
  - **Etapa 4:** Color `matcha-500`, Ícono `fa-clone`, Título **Encontrar el Par**, Descripción: *"Empareja tarjetas superiores de Romaji con Hiragana."*
  - **Etapa 5:** Color `sky-500`, Ícono `fa-keyboard`, Título **Escribir Respuesta**, Descripción: *"Escribe la lectura Romaji con teclado físico o virtual."*
  - **Etapa 6:** Color `purple-500`, Ícono `fa-font`, Título **Escribir el Texto**, Descripción: *"Flujo continuo: escribe y avanza kana a kana automáticamente."*
  - **Etapa 7:** Color `indigo-500`, Ícono `fa-book`, Título **Escribir Palabra**, Descripción: *"Transcribe palabras y combinaciones de 3 a 5 kanas con significado."*
  - **Etapas 1, 2, 8 y 9:** Mantienen sus números y descripciones actuales.

---

### Componente 2: Metadatos y Despacho del Motor de Sesión

#### [MODIFY] [juego japones.html](file:///c:/Users/tmax3/OneDrive/Documentos/japones/juego%20japones.html)
- **Actualización de `STAGE_METADATA`:**
  ```javascript
  const STAGE_METADATA = [
      { num: 1, name: 'Opción Múltiple', desc: 'Identifica el Romaji correcto para el Hiragana.', icon: 'fa-square-check', color: 'sakura' },
      { num: 2, name: 'Opción Inversa', desc: 'Dado el Romaji, selecciona el Hiragana correspondiente.', icon: 'fa-arrows-rotate', color: 'amber' },
      { num: 3, name: 'Escucha y Fonética', desc: 'Escucha la pronunciación nativa y elige el símbolo correcto.', icon: 'fa-volume-high', color: 'rose' },
      { num: 4, name: 'Encontrar el Par', desc: 'Empareja tarjetas superiores de Romaji con Hiragana.', icon: 'fa-clone', color: 'matcha' },
      { num: 5, name: 'Escribir Respuesta', desc: 'Escribe la lectura Romaji con teclado físico o virtual.', icon: 'fa-keyboard', color: 'sky' },
      { num: 6, name: 'Escribir el Texto', desc: 'Flujo continuo: escribe y avanza automáticamente kana a kana.', icon: 'fa-font', color: 'purple' },
      { num: 7, name: 'Escribir Palabra', desc: 'Transcribe palabras completas y combinaciones de 3 a 5 kanas.', icon: 'fa-book', color: 'indigo' },
      { num: 8, name: 'Orden de Trazos', desc: 'Trazado asistido en lienzo SVG con validación vectorial.', icon: 'fa-pen-nib', color: 'emerald' },
      { num: 9, name: 'Dibujar de Memoria', desc: 'Dibuja el kana a ciegas recordando sus trazos de memoria.', icon: 'fa-eye-slash', color: 'amber' }
  ];
  ```

- **Actualización del Despachador en `renderCurrentStageExercise()`:**
  - `case 1:` $\rightarrow$ `renderStage1_MultipleChoice`
  - `case 2:` $\rightarrow$ `renderStage2_ReverseChoice`
  - `case 3:` $\rightarrow$ `renderStage3_Listening` (antes Etapa 7)
  - `case 4:` $\rightarrow$ `renderStage4_MatchingPairs` (antes Etapa 3)
  - `case 5:` $\rightarrow$ `renderStage5_TypeResponse` (antes Etapa 4)
  - `case 6:` $\rightarrow$ `renderStage6_StreamText` (antes Etapa 5)
  - `case 7:` $\rightarrow$ `renderStage7_TypeWord` (antes Etapa 6)
  - `case 8:` $\rightarrow$ `renderStage8_StrokeOrder`
  - `case 9:` $\rightarrow$ `renderStage9_BlindDraw`

- **Ajuste de Temporizadores Adaptativos:**
  - Etapa 4 (Parejas): 35s.
  - Etapa 6 (Texto continuo): 40s.
  - Etapa 7 (Palabras vocabulario): 20s.
  - Etapas 8 y 9 (Trazado y dibujo): 25s.
  - Etapas 1, 2, 3, 5 (Ejercicios individuales): 12s - 15s.

---

### Componente 3: Distractores Inteligentes con Gemelos Visuales (`LOOKALIKES_DATA`)

#### [MODIFY] [juego japones.html](file:///c:/Users/tmax3/OneDrive/Documentos/japones/juego%20japones.html)
- En `getStageDistractors(targetItem, count)`:
  - Extraer los gemelos visuales conocidos para `targetItem.hiragana` desde `LOOKALIKES_DATA` (ej. あ vs お, さ vs き, は vs ほ/ま, わ vs れ/ね, ろ vs る).
  - Si existen gemelos en `LOOKALIKES_DATA`:
    - **Obligar a que al menos 1 de las opciones distractoras sea uno de sus gemelos visuales**.
    - Buscar el objeto kana correspondiente en `HIRAGANA_DATA`.
    - Se añade prioritariamente al arreglo `chosen`.
  - Completar las opciones distractoras restantes (`count - chosen.length`) con:
    1. Kanas del pool activo de la sesión.
    2. Kanas vistos previamente en SRS.
    3. Respaldo general de `HIRAGANA_DATA`.
  - Esto garantiza que en las Etapas 1, 2 y 3 el alumno se enfrente a la discriminación fina de trazos críticos en lugar de opciones triviales.

---

### Componente 4: Control de Fatiga Cognitiva y Dosificación (3 a 4 min/sesión)

#### [MODIFY] [juego japones.html](file:///c:/Users/tmax3/OneDrive/Documentos/japones/juego%20japones.html)
- En `startStagesAutoSession(levelId)`:
  - **Kanas Principales (`coreKanas`):** Kanas de la fila activa (ej. Fila Ka: か, き, く, け, こ).
  - **Kanas de Refuerzo (`reinforcementKanas`):** 2 o 3 kanas de menor maestría de filas previas.
  - **Pool Completo (`fullPool`):** `[...coreKanas, ...reinforcementKanas]`.
- **Dosificación por Etapa:**
  - **Etapas 1, 2, 3 (Audio) y 5 (Teclado):** Operan sobre `fullPool`, evaluando kanas nuevos y de refuerzo en formato rápido.
  - **Etapa 4 (Parejas):** Micro-tablero de parejas usando `fullPool`.
  - **Etapa 6 (Texto continuo) y Etapa 7 (Palabras):** Reciben `fullPool` para generar secuencias y vocabulario compuesto con significado.
  - **Etapas 8 y 9 (Trazado y Dibujo manual SVG):**
    > [!TIP]
    > **Exclusión de refuerzo en dibujo:** Se inicializan **exclusivamente con `coreKanas`**. El estudiante traza únicamente los 3 a 5 kanas de la fila activa, manteniendo el tiempo total de sesión entre 3 y 4 minutos y evitando el agotamiento motriz de la mano en pantallas táctiles.

---

### Componente 5: Blindaje Técnico para APK Móvil / WebView

#### [MODIFY] [juego japones.html](file:///c:/Users/tmax3/OneDrive/Documentos/japones/juego%20japones.html)
1. **Lienzo SVG Táctil (Etapas 8 y 9):**
   - Añadir estilos `touch-action: none; overscroll-behavior: none;` a los contenedores externos y a las etiquetas `<svg id="stage8SvgSurface">` y `<svg id="stage9SvgSurface">`.
   - Previene que al deslizar el dedo hacia abajo para trazar un trazo vertical, WebView interprete el gesto como *pull-to-refresh* o scroll de la pantalla.
2. **Resiliencia de Audio en Etapa 3 (Escucha y Fonética):**
   - Si `speechSynthesis` no cuenta con la voz japonesa en el dispositivo Android o la llamada no dispara `onend`, la interfaz nunca se congela.
   - El botón de audio permanece interactivo (*"Toca para repetir"*), y las opciones de selección están inmediatamente activas con un timeout de seguridad en la reproducción.
3. **Teclado Virtual Móvil en Entradas de Texto (Etapas 5, 6, 7 y 8):**
   - Configurar todos los campos `<input>` de romaji con:
     `autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"`
   - Evita que Gboard o el teclado de Samsung intenten autocorregir o capitalizar entradas de romaji (ej. transformando "ka" en palabras en español).

---

### Componente 6: Separación Auto vs Manual y Avance de Frontera

#### [MODIFY] [juego japones.html](file:///c:/Users/tmax3/OneDrive/Documentos/japones/juego%20japones.html)
1. **Bloqueo en Modo Automático:**
   - En `renderStagesAutoDashboard()`: Las tarjetas de fila no son clicables libremente cuando `state.stagesLearningMode === 'auto'`.
   - Se reemplaza el cursor interactivo por `cursor-default`, se elimina el borde de hover editable y se incluye una insignia visual en la fila activa: `🎯 Fila Activa`.
   - Si el usuario hace clic sobre una fila distinta, una *guard clause* ignora la selección y muestra un toast informativo.
2. **Determinación de Fila Activa (`getAutoDeterminedActiveLevel`):**
   - La fila activa es **siempre la frontera de aprendizaje (`unlockedIndex`)**:
     `const activeLevel = STAGES_CURRICULUM[state.stagesAutoProgress.unlockedIndex] || STAGES_CURRICULUM[0];`
   - Superar la sesión con $\ge 75\%$ incrementa `unlockedIndex++` inmediatamente, permitiendo avanzar a la siguiente fila.
   - Los kanas que queden en 1/3 o 2/3 no bloquean el avance; se consolidan orgánicamente a través del pool de refuerzo en las filas posteriores.
   - Solo al completar el curso (`unlockedIndex >= STAGES_CURRICULUM.length`), el algoritmo busca filas pendientes de consolidación final al 100%.

---

### Componente 7: Sistema de Maestría Acumulativa (0 a 3) y Longitud Variable

#### [MODIFY] [juego japones.html](file:///c:/Users/tmax3/OneDrive/Documentos/japones/juego%20japones.html)
- **Persistencia en `state.stagesAutoProgress`:**
  - `kanaMastery: {}` (almacena `{ mastery: 0..3, lastPracticed: timestamp }`).
  - Serializado y recuperado automáticamente en `loadStateFromStorage()` y `saveStateToStorage()`.
- **Registro en `handleStageAnswer()`:**
  - Etapas con evaluación directa: **1, 2, 3 (Audio), 5 (Teclado), 8 (Trazos) y 9 (Dibujo)**, más aciertos en **4 (Parejas)**.
  - Almacena intentos y aciertos por kana individual durante la sesión.
- **Criterio de Ascenso en `finishStagesSession()`:**
  - Si un kana registra $\ge 2$ intentos y $\ge 80\%$ de precisión individual en la sesión:
    `mastery = Math.min(3, (kanaMastery[kana]?.mastery || 0) + 1)`
- **Fórmula de Porcentaje de Fila (Longitud Variable):**
  - Maneja correctamente filas de 3 kanas (Ya, Wa), 5 kanas (básicas, dakuten) y 9 kanas (yōon):
    $$\text{Porcentaje} = \text{Math.round}\left(\frac{\sum_{k \in \text{fila}} \text{mastery}(k)}{\text{totalKanas} \times 3} \times 100\right)$$
  - Insignias de fila: $0\%$ (Sin iniciar), $>0\%$ a $<66\%$ (Nivel 1/3), $\ge 66\%$ a $<100\%$ (Nivel 2/3), $100\%$ (Dominado 3/3).
  - Micro-indicadores individuales `0/3`, `1/3`, `2/3`, `3/3` para cada kana en la tarjeta.

---

## Verification Plan

### Automated Tests
- **Validación AST de Sintaxis:**
  ```powershell
  node -e "const fs = require('fs'); const code = fs.readFileSync('juego japones.html', 'utf8'); const script = code.match(/<script>([\s\S]*?)<\/script>/)[1]; require('vm').createScript(script); console.log('Syntax OK');"
  ```
- **Pruebas de Lógica en `scratch/test_pedagogical_stages.js`:**
  1. Verificar que `STAGE_METADATA` y los despachadores coinciden con la secuencia 1..9 (Audio en Etapa 3).
  2. Verificar que `getStageDistractors` incluye al menos un gemelo visual si el kana existe en `LOOKALIKES_DATA`.
  3. Verificar que `startStagesAutoSession` asigna `coreKanas` a Etapas 8 y 9, y `fullPool` a Etapas 1-5.
  4. Verificar que los inputs de texto contienen `autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"`.
  5. Verificar que los lienzos SVG de Etapa 8 y 9 contienen `touch-action: none; overscroll-behavior: none;`.
  6. Verificar que la frontera `unlockedIndex` avanza correctamente con $\ge 75\%$ sin estancarse.

### Manual Verification
- Cargar `juego japones.html` en el navegador.
- Probar la Fila A en Modo Automático:
  - Comprobar que las tarjetas no son seleccionables arbitrariamente.
  - Iniciar sesión: Etapa 1 (Opción múltiple con distractores que pueden incluir お), Etapa 2 (Opción inversa), Etapa 3 (Audio con opciones), Etapa 4 (Parejas), Etapa 5 (Teclado), Etapa 6 (Texto continuo), Etapa 7 (Palabras), Etapa 8 (Trazado solo Fila A), Etapa 9 (Dibujo ciego solo Fila A).
  - Finalizar sesión: comprobar ascenso de maestría individual a 1/3 y desbloqueo inmediato de la Fila Ka.
