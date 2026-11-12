# Activar el inicio de sesión con Google

KotoDojo puede guardar el progreso en la nube con **Firebase** (de Google), para que el XP,
la racha, el SRS y el Modo 9 Etapas te sigan a cualquier dispositivo. Es gratis para este uso.

Mientras `js/firebase-config.js` tenga `FIREBASE_CONFIG = null`, el botón no aparece y la app
funciona solo en local, como siempre.

## 1. Crear el proyecto

1. Entra en <https://console.firebase.google.com> con tu cuenta de Google.
2. **Crear un proyecto** → nombre, por ejemplo `kotodojo` → puedes desactivar Google Analytics → **Crear**.

## 2. Activar el inicio de sesión con Google

1. Menú izquierdo → **Compilación → Authentication** → **Comenzar**.
2. Pestaña **Método de inicio de sesión** → **Google** → **Habilitar**, elige el correo de asistencia → **Guardar**.
3. Pestaña **Configuración → Dominios autorizados** → **Agregar dominio** →
   `tmax310341-lgtm.github.io` (y `localhost` ya viene incluido para pruebas).

## 3. Crear la base de datos

1. Menú izquierdo → **Compilación → Firestore Database** → **Crear base de datos**.
2. Elige una ubicación cercana (por ejemplo `southamerica-east1` o `us-east1`) → **Modo de producción** → **Crear**.
3. Pestaña **Reglas** → borra lo que haya, pega el contenido de [`firestore.rules`](../firestore.rules) → **Publicar**.

## 4. Registrar la app web y copiar la configuración

1. ⚙️ **Configuración del proyecto** → **General** → en «Tus apps», pulsa el icono **`</>`** (Web).
2. Apodo: `KotoDojo web` → **Registrar app** (no hace falta Firebase Hosting).
3. Copia el objeto `firebaseConfig` que aparece y pégalo en [`js/firebase-config.js`](../js/firebase-config.js):

   ```js
   const FIREBASE_CONFIG = {
       apiKey: "...",
       authDomain: "...",
       projectId: "...",
       storageBucket: "...",
       messagingSenderId: "...",
       appId: "..."
   };
   ```

   Estos valores no son secretos: se pueden subir a GitHub. Lo que protege los datos son las reglas del paso 3.

4. Haz commit y push. Cuando GitHub Pages se actualice, aparecerá **«Iniciar sesión con Google»** en el menú ☰.

## Cómo funciona

- Al iniciar sesión, el progreso de la nube se **fusiona** con el del dispositivo (no se pisa):
  se queda el XP mayor, la racha más reciente, el repaso más reciente de cada kana y todos los
  niveles desbloqueados. Los ajustes (tema, voz…) son los del último dispositivo que guardó.
- Cada cambio se sube a los pocos segundos. Al volver a la app se descargan los cambios hechos en otro dispositivo.
- Sin conexión, todo sigue guardándose en el dispositivo y se sube cuando vuelve la conexión.
- Al cerrar sesión, el progreso se queda en el dispositivo.
- El inicio de sesión no funciona abriendo `index.html` con doble clic (`file://`): usa la web publicada.
- Los datos se guardan en `users/{uid}` con el campo `progressJson` (el mismo objeto que en `localStorage`),
  así que la app Android puede leer y escribir el mismo documento con el SDK de Firebase para Android.

## Prueba local

Desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Abre <http://localhost:8000> (localhost ya está autorizado en Firebase).
