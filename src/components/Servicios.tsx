import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import * as FaIcons from 'react-icons/fa'
import { motion } from 'framer-motion'
import type { Servicio } from '../types/index';

const Servicios = () => {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'servicios'))
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Servicio[]
        setServicios(data)
      } catch (error) {
        console.error('Error al cargar servicios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServicios()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 bg-gray-50 text-center">
        <p className="text-gray-500">Cargando servicios...</p>
      </section>
    )
  }

  return (
    <section
      id="servicios"
      role="region"
      aria-labelledby="titulo-servicios"
      className="py-20 px-4 sm:px-6 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 id="titulo-servicios" className="text-3xl font-bold text-printica-primary">
          Nuestros servicios
        </h2>
        <p className="mt-2 text-printica-accent1">Lo que podemos hacer por vos</p>
      </div>

      {servicios.length === 0 ? (
        <p className="text-center text-gray-500">No hay servicios cargados.</p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-center max-w-6xl mx-auto">
          {servicios
            .sort((a, b) => (a.orden || 0) - (b.orden || 0)) // Ordenar por campo "orden" si existe
            .map((serv, i) => {
              const IconComponent = (FaIcons as any)[serv.icono] // Icono dinámico según Firestore
              return (
                <motion.li
                  key={serv.id}
                  className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md text-center border border-gray-100"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }}
                  aria-label={serv.titulo}
                >
                  <div className="mb-4 flex justify-center">
                    {IconComponent ? (
                      <IconComponent size={36} className="text-printica-primary" />
                    ) : (
                      <span className="text-gray-400 text-sm">Sin icono</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{serv.titulo}</h3>
                  <p className="text-gray-600">{serv.descripcion}</p>
                </motion.li>
              )
            })}
        </ul>
      )}
    </section>
  )
}

export default Servicios
