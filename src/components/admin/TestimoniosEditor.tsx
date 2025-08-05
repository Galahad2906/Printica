import { FC } from 'react'
import { motion } from 'framer-motion'

interface Testimonio {
  nombre: string
  mensaje: string
  avatar: string
}

interface TestimoniosEditorProps {
  form: Testimonio
  onChange: (nuevo: Testimonio) => void
  onSave: () => void
  editando: boolean
}

const TestimoniosEditor: FC<TestimoniosEditorProps> = ({ form, onChange, onSave, editando }) => {
  const isDisabled = !form.nombre.trim() || !form.mensaje.trim() || !form.avatar.trim()

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200"
    >
      <h3 className="text-xl font-bold text-printica-primary mb-4">
        💬 {editando ? 'Editar Testimonio' : 'Agregar Testimonio'}
      </h3>

      {/* Nombre */}
      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
        Nombre del cliente
      </label>
      <input
        id="nombre"
        type="text"
        placeholder="Ej: Juan Pérez"
        value={form.nombre}
        onChange={(e) => onChange({ ...form, nombre: e.target.value })}
        className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Mensaje */}
      <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
        Mensaje del testimonio
      </label>
      <textarea
        id="mensaje"
        placeholder="Ej: Excelente servicio y productos de calidad..."
        value={form.mensaje}
        onChange={(e) => onChange({ ...form, mensaje: e.target.value })}
        className="w-full border p-3 rounded mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        rows={3}
      />

      {/* Avatar */}
      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
        URL del avatar (opcional)
      </label>
      <input
        id="avatar"
        type="url"
        placeholder="https://ejemplo.com/avatar.jpg"
        value={form.avatar}
        onChange={(e) => onChange({ ...form, avatar: e.target.value })}
        className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Vista previa avatar */}
      {form.avatar && (
        <motion.img
          src={form.avatar}
          alt="Vista previa del avatar"
          className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border shadow"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/100?text=Sin+imagen'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Botón de acción */}
      <button
        onClick={onSave}
        disabled={isDisabled}
        className={`w-full py-2 rounded font-bold transition-colors duration-300 ${
          isDisabled
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-printica-primary hover:bg-printica-secondary text-white'
        }`}
      >
        {editando ? 'Guardar cambios' : 'Agregar testimonio'}
      </button>
    </motion.section>
  )
}

export default TestimoniosEditor
