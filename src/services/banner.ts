// src/services/banner.ts
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { BannerData, FirestoreBannerDoc } from '../types'

// -----------------------------
// Referencias
// -----------------------------
const BANNERS = collection(db, 'banners')
const BANNER_REF = doc(BANNERS, 'principal')           // ✅ destino final
const CONFIG_REF = doc(db, 'config', 'banner')         // 🕘 doc intermedio
const LEGACY_REF = doc(db, 'banner', 'principal')      // 🕰️ doc legacy

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
      enlace: d.enlace ?? DEFAULTS.enlace,
      mensaje: d.mensaje ?? DEFAULTS.mensaje,
      imagenPC: d.imagenPC ?? '',
      imagenTablet: d.imagenTablet ?? '',
      imagenMovil: d.imagenMovil ?? '',
    }
  }

  // legacy: solo 'imagen'
  const l = data as any
  const unica: string = l.imagen ?? ''
  return {
    activo: Boolean(l.activo ?? DEFAULTS.activo),
    enlace: l.enlace ?? DEFAULTS.enlace,
    mensaje: l.mensaje ?? DEFAULTS.mensaje,
    imagenPC: unica,
    imagenTablet: unica,
    imagenMovil: unica,
  }
}

// -----------------------------
// Migración one-shot
// -----------------------------
export async function migrarBannerLegacy(): Promise<void> {
  // si ya existe banners/principal en nuevo formato, nada que hacer
  const bannerSnap = await getDoc(BANNER_REF)
  if (bannerSnap.exists()) {
    const d = bannerSnap.data() as any
    if (d?.imagenPC || d?.imagenTablet || d?.imagenMovil) return
  }

  // 1) intentar desde config/banner
  const configSnap = await getDoc(CONFIG_REF)
  if (configSnap.exists()) {
    const payload = toNewFormat(configSnap.data() as FirestoreBannerDoc)
    await setDoc(BANNER_REF, payload, { merge: true })
    return
  }

  // 2) intentar desde banner/principal (muy viejo)
  const legacySnap = await getDoc(LEGACY_REF)
  if (legacySnap.exists()) {
    const payload = toNewFormat(legacySnap.data() as FirestoreBannerDoc)
    await setDoc(BANNER_REF, payload, { merge: true })
  }
}

// -----------------------------
// Lectura / Escritura
// -----------------------------
export async function cargarBanner(): Promise<BannerData> {
  const snap = await getDoc(BANNER_REF)
  if (!snap.exists()) return DEFAULTS
  return toNewFormat(snap.data() as FirestoreBannerDoc)
}

export async function guardarBanner(data: BannerData): Promise<void> {
  const payload: BannerData = {
    activo: !!data.activo,
    enlace: data.enlace?.trim() ?? '',
    mensaje: data.mensaje?.trim() ?? '',
    imagenPC: data.imagenPC.trim(),
    imagenTablet: data.imagenTablet.trim(),
    imagenMovil: data.imagenMovil.trim(),
  }
  await setDoc(BANNER_REF, payload, { merge: true })
}
