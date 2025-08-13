// src/services/banner.ts
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { BannerData, FirestoreBannerDoc } from '../types'

// -----------------------------
// Referencias
// -----------------------------
const BANNERS = collection(db, 'banners')
const BANNER_REF = doc(BANNERS, 'principal')          // ⭐ destino ideal (nuevo)
const CONFIG_REF = doc(db, 'config', 'banner')        // ✅ permitido por tus reglas
const LEGACY_REF = doc(db, 'banner', 'principal')     // 🕰️ legacy

// -----------------------------
// Defaults seguros
// -----------------------------
const DEFAULTS: BannerData = {
  activo: false,
  enlace: '',
  mensaje: '',
  imagenPC: '',
  imagenTablet: '',
  imagenMovil: '',
}

// -----------------------------
// Helpers
// -----------------------------
function toNewFormat(data: FirestoreBannerDoc | undefined): BannerData {
  if (!data) return DEFAULTS

  // nuevo formato
  if ('imagenPC' in data || 'imagenTablet' in data || 'imagenMovil' in data) {
    const d = data as any
    return {
      activo: Boolean(d.activo ?? DEFAULTS.activo),
      enlace: (d.enlace ?? DEFAULTS.enlace) as string,
      mensaje: (d.mensaje ?? DEFAULTS.mensaje) as string,
      imagenPC: (d.imagenPC ?? '') as string,
      imagenTablet: (d.imagenTablet ?? '') as string,
      imagenMovil: (d.imagenMovil ?? '') as string,
    }
  }

  // legacy: solo 'imagen'
  const l = data as any
  const unica: string = l.imagen ?? ''
  return {
    activo: Boolean(l.activo ?? DEFAULTS.activo),
    enlace: (l.enlace ?? DEFAULTS.enlace) as string,
    mensaje: (l.mensaje ?? DEFAULTS.mensaje) as string,
    imagenPC: unica,
    imagenTablet: unica,
    imagenMovil: unica,
  }
}

function withFallbacks(input: BannerData): BannerData {
  const pc = (input.imagenPC || '').trim()
  const tablet = (input.imagenTablet || '').trim() || pc
  const movil = (input.imagenMovil || '').trim() || tablet
  return {
    activo: !!input.activo,
    enlace: (input.enlace || '').trim(),
    mensaje: (input.mensaje || '').trim(),
    imagenPC: pc,
    imagenTablet: tablet,
    imagenMovil: movil,
  }
}

// -----------------------------
// Migración one-shot
// -----------------------------
export async function migrarBannerLegacy(): Promise<void> {
  // Si ya existe en nuevo formato, nada que hacer
  const bannerSnap = await getDoc(BANNER_REF)
  if (bannerSnap.exists()) {
    const d = bannerSnap.data() as any
    if (d?.imagenPC || d?.imagenTablet || d?.imagenMovil) return
  }

  // 1) intentar desde config/banner
  const configSnap = await getDoc(CONFIG_REF)
  if (configSnap.exists()) {
    const payload = withFallbacks(toNewFormat(configSnap.data() as FirestoreBannerDoc))
    await setDoc(BANNER_REF, payload, { merge: true }).catch(async () => {
      // si no hay permiso en /banners, al menos aseguramos /config
      await setDoc(CONFIG_REF, payload, { merge: true })
    })
    return
  }

  // 2) intentar desde banner/principal (muy viejo)
  const legacySnap = await getDoc(LEGACY_REF)
  if (legacySnap.exists()) {
    const payload = withFallbacks(toNewFormat(legacySnap.data() as FirestoreBannerDoc))
    await setDoc(BANNER_REF, payload, { merge: true }).catch(async () => {
      await setDoc(CONFIG_REF, payload, { merge: true })
    })
  }
}

// -----------------------------
// Lectura / Escritura
// -----------------------------
export async function cargarBanner(): Promise<BannerData> {
  // Intento 1: nuevo
  const snap1 = await getDoc(BANNER_REF)
  if (snap1.exists()) return withFallbacks(toNewFormat(snap1.data() as FirestoreBannerDoc))

  // Intento 2: config
  const snap2 = await getDoc(CONFIG_REF)
  if (snap2.exists()) return withFallbacks(toNewFormat(snap2.data() as FirestoreBannerDoc))

  // Intento 3: legacy
  const snap3 = await getDoc(LEGACY_REF)
  if (snap3.exists()) return withFallbacks(toNewFormat(snap3.data() as FirestoreBannerDoc))

  return DEFAULTS
}

export async function guardarBanner(data: BannerData): Promise<void> {
  const payload = withFallbacks(data)

  // 1) Intentar guardar en /banners/principal (destino ideal)
  try {
    await setDoc(BANNER_REF, payload, { merge: true })
    // además, opcional: mantener /config/banner sincronizado para compatibilidad
    try { await setDoc(CONFIG_REF, payload, { merge: true }) } catch {}
    return
  } catch {
    // 2) Si no hay permisos en /banners (según tus reglas actuales), guardar en /config/banner
    await setDoc(CONFIG_REF, payload, { merge: true })
  }
}
