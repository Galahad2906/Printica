// Tipo base para productos
export type Producto = {
  id: string
  nombre: string
  descripcion: string
  imagen: string
  precio: number
  categoria: string
  destacado: boolean
}

// Tipo extendido para productos en el carrito (agrega cantidad)
export type ProductoCarrito = Producto & {
  cantidad: number
}

// Tipo para testimonios
export type Testimonio = {
  id: string
  nombre: string
  mensaje: string
  avatar: string
}

// Tipo para datos del banner dinámico
export type BannerData = {
  imagen: string
  enlace?: string
  activo: boolean
}

// Tipo para sección "Sobre Printica"
export type SobreData = {
  texto: string
  imagen: string
}

// ✅ Tipo para servicios dinámicos
export type Servicio = {
  id: string
  titulo: string
  descripcion: string
  icono: string      // Nombre del ícono (ej: FaTags)
  iconoURL?: string  // URL opcional de ícono personalizado subido a Firebase
  orden?: number     // Opcional: para ordenar manualmente
}
