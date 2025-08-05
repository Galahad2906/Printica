import { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonio {
  id: string
  nombre: string
  mensaje: string
  avatar: string
}

interface TestimoniosListProps {
  testimonios: Testimonio[]
  onEditar: (testimonio: Testimonio) => void
  onEliminar: (id: string) => void
}

const TestimoniosList: FC<TestimoniosListProps> = ({ testimonios, onEditar, onEliminar }) => {
  return (
    <section className="max-w-5xl mx-auto mb-10">
      {testimonios.length === 0 ? (
        <p className="text-center text-gray-500 py-6 text-sm">
          No hay testimonios cargados aún. 📭
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {testimonios.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center relative hover:shadow-lg transition-shadow duration-300"
              >
                {/* Avatar */}
                <img
                  src={t.avatar}
                  alt={`Avatar de ${t.nombre}`}
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-3 border shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://via.placeholder.com/100?text=Sin+imagen'
                  }}
                />

                {/* Mensaje */}
                <p className="text-sm italic text-gray-700 mb-2">“{t.mensaje}”</p>

                {/* Nombre */}
                <h4 className="font-bold text-printica-primary">{t.nombre}</h4>

                {/* Botones de acción */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => onEditar(t)}
                    className="text-printica-primary hover:text-printica-secondary transition-colors"
                    title="Editar testimonio"
                    aria-label={`Editar testimonio de ${t.nombre}`}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onEliminar(t.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Eliminar testimonio"
                    aria-label={`Eliminar testimonio de ${t.nombre}`}
                  >
                    ❌
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}

export default TestimoniosList
