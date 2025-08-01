import { Producto } from '../../types'
import { motion } from 'framer-motion'

type Props = {
  productos: Producto[]
  paginaActual: number
  setPaginaActual: React.Dispatch<React.SetStateAction<number>>
  productosPorPagina: number
  handleEliminar: (id: string) => void
  handleEditar: (producto: Producto) => void
}

const ProductList = ({
  productos,
  paginaActual,
  setPaginaActual,
  productosPorPagina,
  handleEliminar,
  handleEditar
}: Props) => {
  const totalPaginas = Math.ceil(productos.length / productosPorPagina)
  const indexUltimo = paginaActual * productosPorPagina
  const indexPrimero = indexUltimo - productosPorPagina
  const productosVisibles = productos.slice(indexPrimero, indexUltimo)

  return (
    <>
      {/* 📋 Listado de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {productosVisibles.map((producto) => (
          <motion.div
            key={producto.id}
            className="bg-white shadow-md rounded-xl p-4 relative border border-gray-200 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-40 object-cover rounded-lg mb-4 border"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/300x200?text=Imagen+no+disponible'
              }}
            />
            <h2 className="text-lg font-semibold text-printica-primary">{producto.nombre}</h2>
            <p className="text-sm text-gray-600">{producto.descripcion}</p>
            <p className="text-sm text-gray-800 mt-1 font-semibold">💲 {producto.precio}</p>
            <p className="text-sm text-gray-500">📦 {producto.categoria}</p>

            {producto.destacado && (
              <span className="inline-block mt-2 text-xs text-white bg-printica-primary px-2 py-1 rounded-full shadow">
                ⭐ Destacado
              </span>
            )}

            {/* Botones editar/eliminar */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEliminar(producto.id)}
                className="text-red-500 hover:text-red-700 text-xl"
                title="Eliminar"
              >
                ❌
              </button>
              <motion.button
                onClick={() => handleEditar(producto)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-printica-primary hover:text-printica-secondary text-xl"
                title="Editar"
              >
                ✏️
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 📄 Paginación */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap items-center">
        {paginaActual > 1 && (
          <button
            onClick={() => setPaginaActual(paginaActual - 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Anterior
          </button>
        )}
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
          <button
            key={pagina}
            onClick={() => setPaginaActual(pagina)}
            className={`px-3 py-1 rounded transition-colors ${
              pagina === paginaActual
                ? 'bg-printica-primary text-white font-bold'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {pagina}
          </button>
        ))}
        {paginaActual < totalPaginas && (
          <button
            onClick={() => setPaginaActual(paginaActual + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Siguiente →
          </button>
        )}
      </div>
    </>
  )
}

export default ProductList
