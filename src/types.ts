// 🛍️ Producto base (compatible con exactOptionalPropertyTypes)
export type Producto = {
  id: string
  nombre?: string | undefined
  descripcion?: string | undefined
  imagen?: string | undefined
  precio?: number | undefined
  categoria?: string | undefined
  destacado?: boolean | undefined
  stock?: number | undefined       // 🔄 Opcional: stock disponible
  descuento?: number | undefined   // 🔄 Opcional: porcentaje de descuento
}

// 🛒 Producto en el carrito (hereda de Producto)
export type ProductoCarrito = Producto & {
  cantidad: number
}

// 🗣️ Testimonios de clientes
export type Testimonio = {
  id?: string | undefined
  nombre: string
  mensaje: string
  avatar: string // URL del avatar o imagen
}

// 🎨 Datos del banner dinámico (NUEVO: 3 imágenes por dispositivo)
export type BannerData = {
  activo: boolean
  enlace?: string | undefined
  mensaje?: string | undefined
  imagenPC: string
  imagenTablet: string
  imagenMovil: string
}

// 🕰️ Compatibilidad con documentos antiguos en Firestore (1 sola imagen)
export type LegacyBannerData = {
  imagen?: string | undefined
  enlace?: string | undefined
  mensaje?: string | undefined
  activo?: boolean | undefined
}

// 📦 Documento que podrías encontrar en Firestore (nuevo o legacy)
export type FirestoreBannerDoc = BannerData | LegacyBannerData

// 👥 Información de "Sobre Nosotros"
export type SobreData = {
  texto: string
  imagen: string
}

// 🧾 Formulario de producto (UI) — precio puede ser number o '' mientras se edita
export type ProductoFormData = {
  nombre: string
  descripcion: string
  imagen: string
  precio: number | ''
  categoria: string
  destacado: boolean
}
