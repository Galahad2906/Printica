import { FaCartPlus } from 'react-icons/fa'
import { useCarrito } from '../context/CarritoContext'
import type { Producto } from '../types'
import { toast } from 'sonner'

type Props = {
  producto: Producto
}

const ProductCard = ({ producto }: Props) => {
  const { agregar } = useCarrito()

  const handleAgregar = () => {
    agregar({ ...producto, cantidad: 1 })
    toast.success(`✅ ${producto.nombre} agregado al carrito`)
  }

  return (
    <div className="relative w-full max-w-xs rounded-lg shadow-md overflow-hidden bg-white group transition-transform hover:scale-[1.02] border border-gray-100">
      {/* Imagen */}
      <div className="overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-800">{producto.nombre}</h3>

        {producto.precio && (
          <p className="text-sm text-gray-600 mt-1">
            {producto.precio.toLocaleString()} Gs
          </p>
        )}

        {producto.categoria && (
          <p className="text-xs text-gray-400">{producto.categoria}</p>
        )}

        {producto.destacado && (
          <span className="inline-block mt-2 text-xs text-yellow-700 bg-yellow-200 px-2 py-1 rounded-full w-fit">
            ⭐ Destacado
          </span>
        )}

        {/* Botón */}
        <button
          onClick={handleAgregar}
          className="mt-auto bg-printica-primary hover:bg-printica-secondary text-white px-4 py-2 rounded mt-4 flex items-center justify-center gap-2 font-semibold transition-colors duration-300"
        >
          <FaCartPlus />
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard
