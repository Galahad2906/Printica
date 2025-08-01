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
      <section className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200">
        <h3 className="text-xl font-bold text-printica-primary mb-4">💬 Gestionar Testimonios</h3>

        <input
          type="text"
          placeholder="Nombre"
          value={testimonioForm.nombre}
          onChange={(e) => setTestimonioForm({ ...testimonioForm, nombre: e.target.value })}
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        />

        <textarea
          placeholder="Mensaje"
          value={testimonioForm.mensaje}
          onChange={(e) => setTestimonioForm({ ...testimonioForm, mensaje: e.target.value })}
          className="w-full border p-2 rounded mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-printica-accent1"
          rows={3}
        />

        <input
          type="text"
          placeholder="URL del avatar"
          value={testimonioForm.avatar}
          onChange={(e) => setTestimonioForm({ ...testimonioForm, avatar: e.target.value })}
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        />

        {testimonioForm.avatar && (
          <img
            src={testimonioForm.avatar}
            alt="Avatar preview"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border shadow"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/100?text=Sin+imagen'
            }}
          />
        )}

        <button
          onClick={guardarTestimonio}
          className="bg-printica-primary hover:bg-printica-secondary text-white w-full py-2 rounded font-bold transition-colors"
        >
          {modoEdicion ? 'Guardar cambios' : 'Agregar testimonio'}
        </button>
      </section>

      {/* 📋 Listado */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        {testimonios.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-lg shadow border border-gray-200 text-center relative hover:shadow-lg transition-shadow"
          >
            <img
              src={t.avatar}
              alt={t.nombre}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-3 border"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://via.placeholder.com/100?text=Sin+imagen'
              }}
            />
            <p className="text-sm italic text-gray-700 mb-2">"{t.mensaje}"</p>
            <h4 className="font-bold text-printica-primary">{t.nombre}</h4>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEditar(t)}
                className="text-printica-primary hover:text-printica-secondary transition-colors"
                title="Editar"
              >
                ✏️
              </button>
              <button
                onClick={() => eliminarTestimonio(t.id!)}
                className="text-red-500 hover:text-red-700 transition-colors"
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
