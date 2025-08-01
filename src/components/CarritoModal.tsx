import { useState } from 'react'
import { FaWhatsapp, FaTimes } from 'react-icons/fa'
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
  const { carrito, agregar, quitar, limpiar, total } = useCarrito()

  if (!visible) return null

  const handleEnviar = () => {
    if (!nombre.trim()) {
      toast.error('Ingresá tu nombre para enviar el pedido.')
      return
    }
    if (carrito.length === 0) {
      toast.error('Tu carrito está vacío.')
      return
    }

    const mensaje = generarMensajeWhatsApp(nombre, carrito, total)
    const link = generarLinkWhatsApp('595986271647', mensaje)
    window.open(link, '_blank')
    toast.success('Redirigiendo a WhatsApp 📲')
  }

  const toProductoBase = (item: ProductoCarrito): Producto => {
    const { cantidad, ...producto } = item
    return producto
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative border border-gray-200">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
          title="Cerrar"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold text-printica-primary mb-4">🛒 Tu carrito</h2>

        {carrito.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="mb-4 max-h-64 overflow-y-auto">
              {carrito.map((item: ProductoCarrito) => (
                <li key={item.id} className="border-b py-3">
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
                        <button
                          onClick={() => quitar(item.id)}
                          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium">{item.cantidad}</span>
                        <button
                          onClick={() => agregar({ ...toProductoBase(item), cantidad: 1 })}
                          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => quitar(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Eliminar"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-right font-bold text-printica-primary mb-4 text-lg">
              Total: Gs. {total.toLocaleString()}
            </p>

            <input
              type="text"
              placeholder="Tu nombre"
              autoFocus
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-printica-accent1 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  limpiar()
                  toast.success('Carrito vaciado')
                }}
                className="w-1/2 bg-red-100 text-red-600 py-2 rounded hover:bg-red-200 transition font-semibold"
              >
                Vaciar
              </button>
              <button
                onClick={handleEnviar}
                className="w-1/2 bg-printica-primary hover:bg-printica-secondary text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <FaWhatsapp />
                Enviar pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CarritoModal
