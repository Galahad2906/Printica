// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth'
import { getStorage } from 'firebase/storage'

/**
 * 🔐 Configuración de Firebase para Printica
 * Si creas un nuevo proyecto de Firebase para Printica,
 * reemplaza estas credenciales con las del nuevo panel de Firebase.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyAjQb4BLoEDm1kMbTev0Ar3jxZwOBIWGQQ',
  authDomain: 'bambulab-b076d.firebaseapp.com', // 🔄 Cambiar si usas nuevo dominio de Auth
  projectId: 'bambulab-b076d', // 🔄 Cambiar al nuevo projectId de Printica
  storageBucket: 'bambulab-b076d.appspot.com',
  messagingSenderId: '846411272044',
  appId: '1:846411272044:web:37420103ce62a87fad6d49',
}

// 🔥 Inicializar Firebase
const app = initializeApp(firebaseConfig)

// 📦 Exportar servicios
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app) // Para subir imágenes de productos/banners

// 💾 Persistencia local de sesión (mantiene login del admin)
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log('✅ Persistencia de sesión activada'))
  .catch((error) =>
    console.error('❌ Error al establecer la persistencia:', error)
  )
