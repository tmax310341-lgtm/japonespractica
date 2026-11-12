// KotoDojo · Cuenta de Google y sincronización del progreso en la nube (Firebase)
//
// Funcionamiento:
//   - Sin sesión, la app funciona igual que siempre (solo localStorage).
//   - Al iniciar sesión se descarga el progreso de la nube, se fusiona con el local
//     (js/progress-merge.js) y el resultado se guarda en ambos sitios.
//   - Cada guardado local (saveStateToStorage → onProgressSaved) programa una subida
//     a los pocos segundos; al ocultar la pestaña se sube enseguida.
//   - Al volver a la pestaña se descarga de nuevo por si hubo cambios en otro dispositivo.
//
// Datos en Firestore: users/{uid} = { progressJson, savedAt, updatedAt, schema }
// (progressJson es el objeto de buildSaveObject() en texto JSON).

const CLOUD_SDK_VERSION = '10.12.2';
const CLOUD_PUSH_DELAY_MS = 3000;
const CLOUD_PULL_MIN_INTERVAL_MS = 30000;

const cloud = {
    enabled: false,
    ready: false,
    auth: null,
    db: null,
    user: null,
    pulledOnce: false,
    pushTimer: null,
    pushing: false,
    pendingPush: false,
    lastPullAt: 0,
    lastSyncedJson: null
};

// JSON con las claves ordenadas y sin savedAt, para comparar progresos sin falsos cambios
function progressFingerprint(obj) {
    if (!obj) return null;
    const sortKeys = v => {
        if (Array.isArray(v)) return v.map(sortKeys);
        if (v && typeof v === 'object') {
            const o = {};
            Object.keys(v).sort().forEach(k => { if (k !== 'savedAt') o[k] = sortKeys(v[k]); });
            return o;
        }
        return v;
    };
    return JSON.stringify(sortKeys(obj));
}

function cloudIsConfigured() {
    return typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey;
}

function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = () => reject(new Error('No se pudo cargar ' + src));
        document.head.appendChild(s);
    });
}

async function initCloudSync() {
    if (cloud.enabled || !cloudIsConfigured()) return;
    cloud.enabled = true;
    renderCloudAccount();

    if (location.protocol === 'file:') {
        setCloudStatus('Para iniciar sesión abre la app desde la web publicada.');
        return;
    }

    try {
        const base = `https://www.gstatic.com/firebasejs/${CLOUD_SDK_VERSION}/`;
        await loadScriptOnce(base + 'firebase-app-compat.js');
        await Promise.all([
            loadScriptOnce(base + 'firebase-auth-compat.js'),
            loadScriptOnce(base + 'firebase-firestore-compat.js')
        ]);
        firebase.initializeApp(FIREBASE_CONFIG);
        cloud.auth = firebase.auth();
        cloud.db = firebase.firestore();
        cloud.ready = true;

        cloud.auth.getRedirectResult().catch(err => reportCloudError('Inicio de sesión', err));
        cloud.auth.onAuthStateChanged(onCloudUserChanged);
    } catch (err) {
        console.warn('[Nube] No se pudo iniciar Firebase:', err);
        setCloudStatus('Sin conexión con la nube. Tu progreso sigue guardado en este dispositivo.');
    }
    renderCloudAccount();
}

function onCloudUserChanged(user) {
    cloud.user = user || null;
    cloud.pulledOnce = false;
    cloud.lastSyncedJson = null;
    clearTimeout(cloud.pushTimer);
    renderCloudAccount();
    if (user) pullAndMergeCloudProgress(true);
}

// ---------- Acciones del menú (data-action) ----------

function cloudSignIn() {
    if (!cloud.ready) {
        showToast('El inicio de sesión aún no está disponible. Revisa tu conexión.', 'error');
        return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    cloud.auth.signInWithPopup(provider).catch(err => {
        if (err && (err.code === 'auth/popup-blocked' || err.code === 'auth/operation-not-supported-in-this-environment')) {
            return cloud.auth.signInWithRedirect(provider);
        }
        if (err && (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request')) return;
        reportCloudError('Inicio de sesión', err);
    });
}

async function cloudSignOut() {
    if (!cloud.ready || !cloud.user) return;
    await flushCloudPush();
    await cloud.auth.signOut();
    showToast('Sesión cerrada. Tu progreso sigue guardado en este dispositivo.', 'info');
}

// ---------- Sincronización ----------

function cloudDocRef() {
    return cloud.db.collection('users').doc(cloud.user.uid);
}

async function pullAndMergeCloudProgress(isSignIn = false) {
    if (!cloud.user) return;
    cloud.lastPullAt = Date.now();
    setCloudStatus('Sincronizando…');
    try {
        const snap = await cloudDocRef().get();
        const data = snap.exists ? snap.data() : null;
        const remote = data && data.progressJson ? JSON.parse(data.progressJson) : null;

        const local = buildSaveObject();
        local.savedAt = getLocalSavedAt();
        const merged = mergeProgress(local, remote);

        const localJson = progressFingerprint(local);
        const mergedJson = progressFingerprint(merged);
        if (mergedJson !== localJson) {
            applySavedProgress(merged);
            refreshUIAfterCloudMerge();
            if (isSignIn && remote) showToast('☁️ Progreso recuperado de tu cuenta', 'success');
        }

        cloud.pulledOnce = true;
        const remoteJson = progressFingerprint(remote);
        if (mergedJson !== remoteJson) {
            // Guardar en local (también actualiza savedAt) y subir lo fusionado
            saveStateToStorage();
            await flushCloudPush();
        } else {
            cloud.lastSyncedJson = mergedJson;
            setCloudStatus(syncedLabel());
        }
    } catch (err) {
        reportCloudError('Sincronización', err);
    }
}

// Llamada por saveStateToStorage() en cada guardado local
function onProgressSaved() {
    if (!cloud.user || !cloud.pulledOnce) return;
    clearTimeout(cloud.pushTimer);
    setCloudStatus('Cambios pendientes…');
    cloud.pushTimer = setTimeout(pushCloudProgress, CLOUD_PUSH_DELAY_MS);
}

function flushCloudPush() {
    clearTimeout(cloud.pushTimer);
    return pushCloudProgress();
}

async function pushCloudProgress() {
    if (!cloud.user || !cloud.pulledOnce) return;
    if (cloud.pushing) { cloud.pendingPush = true; return; }

    const progress = buildSaveObject();
    progress.savedAt = getLocalSavedAt() || Date.now();
    const comparable = progressFingerprint(progress);
    if (comparable === cloud.lastSyncedJson) { setCloudStatus(syncedLabel()); return; }

    cloud.pushing = true;
    setCloudStatus('Guardando en la nube…');
    try {
        await cloudDocRef().set({
            progressJson: JSON.stringify(progress),
            savedAt: progress.savedAt,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            schema: 1
        });
        cloud.lastSyncedJson = comparable;
        setCloudStatus(syncedLabel());
    } catch (err) {
        reportCloudError('Guardado en la nube', err);
    } finally {
        cloud.pushing = false;
        if (cloud.pendingPush) { cloud.pendingPush = false; pushCloudProgress(); }
    }
}

function refreshUIAfterCloudMerge() {
    try { applyTheme(state.theme || 'theme-dark'); } catch (e) {}
    try { updateStrokeStrictnessUI(); } catch (e) {}
    try { updateHeaderBadges(); } catch (e) {}
    const visible = document.querySelector('section.tab-content:not(.hidden)');
    if (visible) {
        try { switchTab(visible.id.replace('tab-', '')); } catch (e) {}
    }
}

document.addEventListener('visibilitychange', () => {
    if (!cloud.user) return;
    if (document.hidden) {
        flushCloudPush();
    } else if (Date.now() - cloud.lastPullAt > CLOUD_PULL_MIN_INTERVAL_MS) {
        pullAndMergeCloudProgress();
    }
});
window.addEventListener('pagehide', () => { if (cloud.user) flushCloudPush(); });

// ---------- Interfaz ----------

function syncedLabel() {
    const t = new Date();
    return `☁️ Sincronizado a las ${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`;
}

function setCloudStatus(text) {
    const el = document.getElementById('cloudSyncStatus');
    if (el) el.textContent = text;
    const outEl = document.getElementById('cloudSignedOutStatus');
    if (outEl) {
        outEl.textContent = cloud.user ? '' : text;
        outEl.classList.toggle('hidden', !!cloud.user || !text);
    }
}

function renderCloudAccount() {
    const card = document.getElementById('cloudAccountCard');
    if (!card) return;
    card.classList.toggle('hidden', !cloud.enabled);

    const signedIn = !!cloud.user;
    document.getElementById('cloudSignedOut').classList.toggle('hidden', signedIn);
    document.getElementById('cloudSignedIn').classList.toggle('hidden', !signedIn);

    const btn = document.getElementById('cloudSignInBtn');
    if (btn) btn.disabled = !cloud.ready;

    if (signedIn) {
        document.getElementById('cloudUserName').textContent = cloud.user.displayName || cloud.user.email || 'Tu cuenta';
        const photo = document.getElementById('cloudUserPhoto');
        if (cloud.user.photoURL) {
            photo.src = cloud.user.photoURL;
            photo.classList.remove('hidden');
        } else {
            photo.classList.add('hidden');
        }
    }
}

function reportCloudError(what, err) {
    console.warn(`[Nube] ${what}:`, err);
    const code = (err && err.code) || '';
    let msg = 'Sin conexión: tus cambios se guardan en este dispositivo y se subirán más tarde.';
    if (code === 'auth/unauthorized-domain') msg = 'Este dominio no está autorizado en Firebase (Authentication → Settings → Authorized domains).';
    else if (code === 'permission-denied' || code === 'firestore/permission-denied') msg = 'Firestore rechazó el acceso: revisa las reglas (firestore.rules).';
    else if (code.startsWith('auth/')) msg = `No se pudo iniciar sesión (${code}).`;
    setCloudStatus(msg);
    if (code.startsWith('auth/') || code.includes('permission-denied')) showToast(msg, 'error');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCloudSync);
} else {
    initCloudSync();
}
