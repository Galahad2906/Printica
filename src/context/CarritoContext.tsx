import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Producto, ProductoCarrito } from '../types'

type CarritoContextType = {
  carrito: ProductoCarrito[]
  agregar: (producto: Producto | ProductoCarrito) => void
  quitar: (id: string) => void                 // quita 1 unidad; si llega a 0, elimina
  limpiar: () => void
  total: number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)
const STORAGE_KEY = 'printica_carrito'

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([])

  // Cargar desde localStorage con saneamiento fuerte
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      const parsed = JSON.parse(raw) as unknown
      const arr = Array.isArray(parsed) ? parsed : []

      const normalizados: ProductoCarrito[] = arr
        .map((p: any) => {
          const id = typeof p?.id === 'string' ? p.id : ''
          if (!id) return null
          const cantidad = Number(p?.cantidad) > 0 ? Number(p.cantidad) : 1

          const item: ProductoCarrito = {
            id,
            nombre: typeof p?.nombre === 'string' ? p.nombre : undefined,
            descripcion: typeof p?.descripcion === 'string' ? p.descripcion : undefined,
            imagen: typeof p?.imagen === 'string' ? p.imagen : undefined,
            precio: typeof p?.precio === 'number' ? p.precio : undefined,
            categoria: typeof p?.categoria === 'string' ? p.categoria : undefined,
            destacado: typeof p?.destacado === 'boolean' ? p.destacado : undefined,
            stock: typeof p?.stock === 'number' ? p.stock : undefined,
            descuento: typeof p?.descuento === 'number' ? p.descuento : undefined,
            cantidad,
          }
          return item
        })
        .filter(Boolean) as ProductoCarrito[]

      setCarrito(normalizados)
    } catch (err) {
      console.error('Error al leer el carrito de localStorage:', err)
      setCarrito([])
    }
  }, [])

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito))
    } catch (err) {
      console.error('Error al guardar el carrito en localStorage:', err)
    }
  }, [carrito])

  const agregar = (producto: Producto | ProductoCarrito) => {
    if (!producto?.id) {
      console.error('Producto sin id no puede agregarse al carrito.')
      return
    }

    const cantidadInicial =
      'cantidad' in producto && typeof producto.cantidad === 'number'
        ? Math.max(1, producto.cantidad)
        : 1

    setCarrito((prev) => {
      const idx = prev.findIndex((p) => p.id === producto.id)

      if (idx >= 0) {
        const nuevo = [...prev]
        const actual = nuevo[idx]
        if (!actual) return prev // seguridad extra para TS

        const actualizado: ProductoCarrito = {
          ...actual,
          cantidad: (actual.cantidad || 0) + cantidadInicial,
        }
        nuevo[idx] = actualizado
        return nuevo
      }

      const nuevoItem: ProductoCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        precio: producto.precio,
        categoria: producto.categoria,
        destacado: producto.destacado,
        stock: producto.stock,
        descuento: producto.descuento,
        cantidad: cantidadInicial,
      }

      return [...prev, nuevoItem]
    })
  }

  // quita 1 unidad; si queda en 0, elimina el item
  const quitar = (id: string) => {
    setCarrito((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, cantidad: Math.max(0, (p.cantidad || 0) - 1) } : p))
        .filter((p) => (p.cantidad || 0) > 0)
    )
  }

  const limpiar = () => {
    setCarrito([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  const total = useMemo(
    () => carrito.reduce((acc, p) => acc + ((p.precio || 0) * (p.cantidad || 0)), 0),
    [carrito]
  )

  const value: CarritoContextType = { carrito, agregar, quitar, limpiar, total }
  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}

export const useCarrito = (): CarritoContextType => {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return ctx
}
