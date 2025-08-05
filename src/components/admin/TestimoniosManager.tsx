import { Testimonio } from '../../types'
import { motion } from 'framer-motion'

type Props = {
  testimonios: Testimonio[]
  testimonioForm: Testimonio
  setTestimonioForm: React.Dispatch<React.SetStateAction<Testimonio>>
  modoEdicion: boolean
  setModoEdicion: React.Dispatch<React.SetStateAction<boolean>>
  idEditando: string | null
  setIdEditando: React.Dispatch<React.SetStateAction<string | null>>
  guardarTestimonio: () => Promise<void>
  eliminarTestimonio: (id: string) => Promise<void>
}

const TestimoniosManager = ({
  testimonios,
  testimonioForm,
  setTestimonioForm,
  modoEdicion,
  setModoEdicion,
  setIdEditando,
  guardarTestimonio,
  eliminarTestimonio
}: Props) => {
  const handleEditar = (t: Testimonio) => {
    setTestimonioForm({ nombre: t.nombre, mensaje: t.mensaje, avatar: t.avatar })
    setIdEditando(t.id || null)
    setModoEdicion(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* 📝 Formulario */}
      <motion.section
        className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-printica-primary mb-4 text-center">
          💬 {modoEdicion ? 'Editar Testimonio' : 'Agregar Testimonio'}
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={testimonioForm.nombre}
            onChange={(e) => setTestimonioForm({ ...testimonioForm, nombre: e.target.value })}
            required
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
          />

          <textarea
            placeholder="Mensaje del cliente"
            value={testimonioForm.mensaje}
            onChange={(e) => setTestimonioForm({ ...testimonioForm, mensaje: e.target.value })}
            required
            className="w-full border p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
            rows={3}
          />

          <input
            type="url"
            placeholder="URL del avatar (opcional)"
            value={testimonioForm.avatar}
            onChange={(e) => setTestimonioForm({ ...testimonioForm, avatar: e.target.value })}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
          />

          {testimonioForm.avatar && (
            <div className="flex justify-center">
              <img
                src={testimonioForm.avatar}
                alt="Vista previa del avatar"
                className="w-24 h-24 rounded-full object-cover border shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/100?text=Sin+imagen'
                }}
              />
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={guardarTestimonio}
              className="flex-1 bg-printica-primary hover:bg-printica-secondary text-white py-2 rounded font-bold transition-transform hover:scale-105"
            >
              {modoEdicion ? '💾 Guardar cambios' : '➕ Agregar'}
            </button>
            {modoEdicion && (
              <button
                type="button"
                onClick={() => {
                  setModoEdicion(false)
                  setIdEditando(null)
                  setTestimonioForm({ nombre: '', mensaje: '', avatar: '' })
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded font-bold transition-transform hover:scale-105"
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </div>
      </motion.section>

      {/* 📋 Listado */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        {testimonios.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-5 rounded-lg shadow border border-gray-200 text-center relative hover:shadow-lg transition"
          >
            <img
              src={t.avatar || 'https://via.placeholder.com/100?text=Sin+imagen'}
              alt={t.nombre}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-3 border shadow"
            />
            <p className="text-sm italic text-gray-700 mb-2 line-clamp-3">“{t.mensaje}”</p>
            <h4 className="font-semibold text-printica-primary">{t.nombre}</h4>

            {/* Botones */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEditar(t)}
                className="text-printica-primary hover:text-printica-secondary text-lg"
                title="Editar"
              >
                ✏️
              </button>
              <button
                onClick={() => eliminarTestimonio(t.id!)}
                className="text-red-500 hover:text-red-700 text-lg"
                title="Eliminar"
              >
                ❌
              </button>
            </div>
          </motion.div>
        ))}
      </section>
    </>
  )
}

export default TestimoniosManager
