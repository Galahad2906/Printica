import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { toast as sonnerToast } from 'sonner'
import { useCarrito } from '../context/CarritoContext'
import { motion } from 'framer-motion'
import type { Producto } from '../types'

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [soloDestacados, setSoloDestacados] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const { agregar } = useCarrito()

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'productos'))
        const datos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Producto[]
        setProductos(datos)
      } catch (error) {
        console.error('Error al cargar productos:', error)
        sonnerToast.error('No se pudieron cargar los productos')
      }
    }

    obtenerProductos()
  }, [])

  const productosFiltrados = productos
    .filter(p => (categoriaSeleccionada === 'Todas' ? true : p.categoria === categoriaSeleccionada))
    .filter(p => (soloDestacados ? p.destacado : true))

  const mostrarToast = (mensaje: string) => {
    setToast(mensaje)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <section
      id="productos"
      role="region"
      aria-label="Catálogo de productos"
      className="py-20 px-4 sm:px-6 bg-white text-printica-primary"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">Nuestros productos</h2>
        <p className="mt-2 text-gray-700">Diseños únicos hechos a medida</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <select
          value={categoriaSeleccionada}
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value)
            mostrarToast(`Filtro aplicado: ${e.target.value}`)
          }}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-printica-primary"
        >
          <option value="Todas">Todas las categorías</option>
          {Array.from(new Set(productos.map(p => p.categoria).filter(Boolean))).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={soloDestacados}
            onChange={(e) => {
              setSoloDestacados(e.target.checked)
              mostrarToast(
                e.target.checked
                  ? 'Mostrando solo destacados'
                  : 'Mostrando todos los productos'
              )
            }}
            className="w-4 h-4 accent-printica-primary"
          />
          Solo destacados
        </label>

        {(categoriaSeleccionada !== 'Todas' || soloDestacados) && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCategoriaSeleccionada('Todas')
              setSoloDestacados(false)
              mostrarToast('Filtros restablecidos')
            }}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition"
          >
            Limpiar filtros
          </motion.button>
        )}
      </div>

      {/* Productos */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-auto max-w-6xl">
        {productosFiltrados.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No hay productos que coincidan con los filtros seleccionados.
          </p>
        ) : (
          productosFiltrados.map((prod, i) => (
            <motion.div
              key={prod.id}
              className="w-full max-w-xs border rounded-lg p-4 shadow-sm bg-white"
              data-aos="fade-up"
              data-aos-delay={i * 100}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="w-full h-48 object-cover rounded"
                loading="lazy"
              />
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{prod.nombre}</h3>
              {prod.descripcion && (
                <p className="text-sm text-gray-600 mt-1">{prod.descripcion}</p>
              )}
              <p className="text-printica-primary font-bold mt-2">
                Gs. {prod.precio?.toLocaleString()}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  agregar({ ...prod, cantidad: 1 })
                  mostrarToast('Producto agregado al carrito')
                }}
                className="mt-3 w-full bg-printica-primary hover:bg-printica-secondary text-white py-2 px-4 rounded font-semibold transition-colors duration-300"
              >
                Agregar al carrito
              </motion.button>
            </motion.div>
          ))
        )}
      </div>

      {/* Toast simple */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-printica-primary text-white px-4 py-2 rounded shadow-lg z-50"
          role="alert"
        >
          {toast}
        </motion.div>
      )}
    </section>
  )
}

export default Productos
