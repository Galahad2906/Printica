// src/components/CarritoFlotante.tsx

import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { FaShoppingCart } from 'react-icons/fa'
import CarritoModal from './CarritoModal'
import { motion, AnimatePresence } from 'framer-motion'

const CarritoFlotante = () => {
  const { carrito } = useCarrito()
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <>
      {/* Botón flotante de carrito */}
      <motion.div
        className="fixed bottom-20 right-4 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="bg-printica-primary text-white p-3 rounded-full shadow-lg hover:bg-printica-secondary transition-colors duration-300"
            title="Ver carrito"
            onClick={() => setIsOpen(true)}
          >
            <FaShoppingCart size={20} />
          </motion.button>

          {/* Contador animado */}
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal del carrito */}
      <CarritoModal visible={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default CarritoFlotante
