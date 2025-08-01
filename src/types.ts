// src/types/index.ts

// 🛍️ Producto base
export type Producto = {
  id: string
  nombre: string
  descripcion: string
  imagen: string
  precio: number
  categoria: string
  destacado: boolean
  stock?: number        // 🔄 Opcional: stock disponible
  descuento?: number    // 🔄 Opcional: porcentaje de descuento
}

// 🛒 Producto en el carrito (hereda de Producto)
export type ProductoCarrito = Producto & {
  cantidad: number
}

// 🗣️ Testimonios de clientes
export type Testimonio = {
  id?: string
  nombre: string
  mensaje: string
  avatar: string // URL del avatar o imagen
}

// 🎨 Datos del banner dinámico
export type BannerData = {
  imagen: string
  enlace?: string
  mensaje?: string // 🔄 Texto opcional junto al banner
  activo: boolean
}

// 👥 Información de "Sobre Nosotros"
export type SobreData = {
  texto: string
  imagen: string
}
