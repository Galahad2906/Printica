// src/types/index.ts

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
