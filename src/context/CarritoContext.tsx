// src/context/CarritoContext.tsx

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { ProductoCarrito } from '../types/index'

type CarritoContextType = {
  carrito: ProductoCarrito[]
  agregar: (producto: ProductoCarrito) => void
  quitar: (id: string) => void
  limpiar: () => void
  total: number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
    // 🔄 Recuperar carrito desde localStorage al inicio
    const carritoGuardado = localStorage.getItem('printica_carrito')
    return carritoGuardado ? JSON.parse(carritoGuardado) : []
  })

  // 📝 Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('printica_carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregar = (producto: ProductoCarrito) => {
    setCarrito(prev => {
      const existente = prev.find(p => p.id === producto.id)
      if (existente) {
        return prev.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + (producto.cantidad || 1) }
            : p
        )
      }
      return [...prev, { ...producto, cantidad: producto.cantidad || 1 }]
    })
  }

  const quitar = (id: string) => {
    setCarrito(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter(p => p.cantidad > 0)
    )
  }

  const limpiar = () => {
    setCarrito([])
  }

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ carrito, agregar, quitar, limpiar, total }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => {
  const context = useContext(CarritoContext)
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return context
}
