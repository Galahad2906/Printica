// src/firebase.ts
import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// ⚠️ Las credenciales deben venir de .env.local (no commitear)
// Vite expone variables con import.meta.env
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Validación básica para no arrancar con env faltantes
for (const [k, v] of Object.entries(firebaseConfig)) {
  if (!v) {
    // Lanzamos un error descriptivo en dev; en prod caería en Sentry/console
    throw new Error(`[Firebase] Falta variable de entorno: ${k}`)
  }
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)       // manejar persistencia en AuthProvider
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
