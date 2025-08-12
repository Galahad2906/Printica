// src/components/admin/ProductList.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Producto } from 'types' // con baseUrl "src"; si no, usa: ../../types

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
  handleEditar,
}: Props) => {
  const [busqueda, setBusqueda] = useState('')

  const q = busqueda.toLowerCase().trim()

  // 🔎 Filtrar productos por búsqueda (con defaults seguros)
  const productosFiltrados = productos.filter((p) => {
    const nombre = (p.nombre ?? '').toLowerCase()
    const categoria = (p.categoria ?? '').toLowerCase()
    return nombre.includes(q) || categoria.includes(q)
  })

  // 📄 Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina) || 1
  const indexUltimo = paginaActual * productosPorPagina
  const indexPrimero = indexUltimo - productosPorPagina
  const productosVisibles = productosFiltrados.slice(indexPrimero, indexUltimo)

  return (
    <section>
      {/* 🔍 Barra de búsqueda */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold text-printica-primary">
          Lista de productos ({productosFiltrados.length})
        </h3>
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value)
            setPaginaActual(1) // Reiniciar paginación al buscar
          }}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 w-full sm:w-64"
        />
      </div>

      {/* 📋 Listado de productos */}
      {productosVisibles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {productosVisibles.map((producto) => {
            const nombre = producto.nombre ?? 'Producto'
            const descripcion = producto.descripcion ?? ''
            const imagen = producto.imagen ?? ''
            const categoria = producto.categoria ?? 'Sin categoría'
            const precio = producto.precio ?? 0

            return (
              <motion.div
                key={producto.id}
                className="bg-white shadow-md rounded-xl p-4 relative border border-gray-200 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={imagen}
                  alt={nombre}
                  className="w-full h-40 object-cover rounded-lg mb-4 border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/300x200?text=Imagen+no+disponible'
                  }}
                />
                <h2 className="text-lg font-semibold text-printica-primary truncate">{nombre}</h2>
                {descripcion && <p className="text-sm text-gray-600 line-clamp-2">{descripcion}</p>}
                <p className="text-sm text-gray-800 mt-1 font-semibold">
                  💲 {precio.toLocaleString()} Gs.
                </p>
                <p className="text-xs text-gray-500">📦 {categoria}</p>

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
                    title="Eliminar producto"
                  >
                    ❌
                  </button>
                  <motion.button
                    onClick={() => handleEditar(producto)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-printica-primary hover:text-printica-secondary text-xl"
                    title="Editar producto"
                  >
                    ✏️
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No se encontraron productos.</p>
      )}

      {/* 📄 Paginación */}
      {totalPaginas > 1 && (
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
      )}
    </section>
  )
}

export default ProductList
