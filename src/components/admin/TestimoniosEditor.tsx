import { FC } from 'react'

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
  return (
    <section className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200">
      <h3 className="text-xl font-bold text-printica-primary mb-4">💬 Testimonios</h3>

      {/* Nombre */}
      <input
        type="text"
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => onChange({ ...form, nombre: e.target.value })}
        className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Mensaje */}
      <textarea
        placeholder="Mensaje"
        value={form.mensaje}
        onChange={(e) => onChange({ ...form, mensaje: e.target.value })}
        className="w-full border p-2 rounded mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        rows={3}
      />

      {/* Avatar */}
      <input
        type="text"
        placeholder="URL del avatar"
        value={form.avatar}
        onChange={(e) => onChange({ ...form, avatar: e.target.value })}
        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Vista previa avatar */}
      {form.avatar && (
        <img
          src={form.avatar}
          alt="Avatar preview"
          className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border shadow"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/100?text=Sin+imagen'
          }}
        />
      )}

      {/* Botón de acción */}
      <button
        onClick={onSave}
        className="bg-printica-primary hover:bg-printica-secondary text-white w-full py-2 rounded font-bold transition-colors duration-300"
      >
        {editando ? 'Guardar cambios' : 'Agregar testimonio'}
      </button>
    </section>
  )
}

export default TestimoniosEditor
