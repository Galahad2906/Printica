// src/components/CarritoModal.tsx

import { useState } from 'react'
import { FaWhatsapp, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useCarrito } from '../context/CarritoContext'
import { generarMensajeWhatsApp, generarLinkWhatsApp } from '../utils/whatsapp'
import { toast } from 'sonner'
import type { Producto } from '../types'

type ProductoCarrito = Producto & { cantidad: number }

type Props = {
  visible: boolean
  onClose: () => void
}

const CarritoModal = ({ visible, onClose }: Props) => {
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [confirmar, setConfirmar] = useState(false)
  const { carrito, agregar, quitar, limpiar, total } = useCarrito()

  const validarDatos = () => {
    if (!nombre.trim()) {
      toast.error('Ingresá tu nombre.')
      return false
    }
    if (!direccion.trim()) {
      toast.error('Ingresá tu dirección.')
      return false
    }
    if (carrito.length === 0) {
      toast.error('Tu carrito está vacío.')
      return false
    }
    return true
  }

  const handlePrevisualizar = () => {
    if (validarDatos()) setConfirmar(true)
  }

  const handleEnviar = () => {
    const mensaje = generarMensajeWhatsApp(nombre, carrito, total, direccion)
    const link = generarLinkWhatsApp('595986271647', mensaje)
    window.open(link, '_blank')
    toast.success('Pedido enviado a WhatsApp 📲')
    limpiar()
    onClose()
  }

  const toProductoBase = (item: ProductoCarrito): Producto => {
    const { cantidad, ...producto } = item
    return producto
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative border border-gray-200"
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Botón cerrar */}
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
              title="Cerrar"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={20} />
            </motion.button>

            {!confirmar ? (
              <>
                <h2 className="text-xl font-bold text-printica-primary mb-4">🛒 Tu carrito</h2>

                {carrito.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">No hay productos en el carrito.</p>
                ) : (
                  <>
                    <ul className="mb-4 max-h-64 overflow-y-auto">
                      {carrito.map((item: ProductoCarrito) => (
                        <motion.li
                          key={item.id}
                          className="border-b py-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-800">{item.nombre}</p>
                              <p className="text-sm text-gray-500">
                                {item.cantidad} x Gs. {item.precio.toLocaleString()}
                              </p>
                              <p className="text-sm font-semibold mt-1 text-gray-800">
                                Subtotal: Gs. {(item.precio * item.cantidad).toLocaleString()}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => quitar(item.id)}
                                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
                                >
                                  −
                                </motion.button>
                                <span className="text-sm font-medium">{item.cantidad}</span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => agregar({ ...toProductoBase(item), cantidad: 1 })}
                                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
                                >
                                  +
                                </motion.button>
                              </div>
                            </div>
                            <motion.button
                              onClick={() => quitar(item.id)}
                              className="text-red-500 hover:text-red-700 transition"
                              title="Eliminar"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaTimes />
                            </motion.button>
                          </div>
                        </motion.li>
                      ))}
                    </ul>

                    <p className="text-right font-bold text-printica-primary mb-4 text-lg">
                      Total: Gs. {total.toLocaleString()}
                    </p>

                    {/* Inputs */}
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-printica-accent1 mb-3"
                    />
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="Dirección de entrega"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-printica-accent1 mb-4"
                    />

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          limpiar()
                          toast.success('Carrito vaciado')
                        }}
                        className="w-1/2 bg-red-100 text-red-600 py-2 rounded hover:bg-red-200 transition font-semibold"
                      >
                        Vaciar
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevisualizar}
                        className="w-1/2 bg-printica-primary hover:bg-printica-secondary text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors"
                      >
                        Previsualizar pedido
                      </motion.button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Vista de confirmación */}
                <h2 className="text-xl font-bold text-printica-primary mb-4">✅ Confirmá tu pedido</h2>
                <p className="mb-3 text-gray-700"><strong>Nombre:</strong> {nombre}</p>
                <p className="mb-3 text-gray-700"><strong>Dirección:</strong> {direccion}</p>
                <p className="mb-4 text-gray-700 font-semibold">
                  Total a pagar: Gs. {total.toLocaleString()}
                </p>

                <ul className="mb-4 max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
                  {carrito.map((item) => (
                    <li key={item.id} className="text-sm">
                      {item.cantidad} x {item.nombre} – Gs. {(item.precio * item.cantidad).toLocaleString()}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConfirmar(false)}
                    className="w-1/2 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition font-semibold"
                  >
                    Atrás
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnviar}
                    className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaWhatsapp /> Confirmar y enviar
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CarritoModal
