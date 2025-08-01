// src/components/CarritoFlotante.tsx

import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { FaShoppingCart } from 'react-icons/fa'
import CarritoModal from './CarritoModal'

const CarritoFlotante = () => {
  const { carrito } = useCarrito()
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <>
      {/* Botón flotante de carrito */}
      <div className="fixed bottom-20 right-4 z-50">
        <div className="relative">
          <button
            className="bg-printica-primary text-white p-3 rounded-full shadow-lg hover:bg-printica-secondary transition-colors duration-300"
            title="Ver carrito"
            onClick={() => setIsOpen(true)}
          >
            <FaShoppingCart size={20} />
          </button>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {/* Modal del carrito */}
      <CarritoModal visible={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default CarritoFlotante
