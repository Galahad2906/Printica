import { motion } from 'framer-motion'
import { useState } from 'react'

type Props = {
  formData: {
    nombre: string
    descripcion: string
    imagen: string
    precio: string
    categoria: string
    destacado: boolean
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  modoEdicion: boolean
  resetForm: () => void
  handleSubmit: (e: React.FormEvent) => void
}

const ProductForm = ({
  formData,
  setFormData,
  modoEdicion,
  resetForm,
  handleSubmit,
}: Props) => {
  const [imagenValida, setImagenValida] = useState(true)

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto mb-10 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-printica-primary mb-4 text-center">
        {modoEdicion ? '✏️ Editar producto' : '➕ Agregar nuevo producto'}
      </h2>

      {/* Nombre */}
      <input
        type="text"
        placeholder="Nombre del producto"
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />

      {/* Descripción */}
      <textarea
        placeholder="Descripción del producto"
        required
        rows={3}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition resize-none"
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
      />

      {/* Imagen */}
      <div>
        <input
          type="text"
          placeholder="URL de la imagen"
          required
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            imagenValida ? 'focus:ring-printica-accent1' : 'border-red-500'
          }`}
          value={formData.imagen}
          onChange={(e) => {
            setFormData({ ...formData, imagen: e.target.value })
            setImagenValida(true)
          }}
        />
        {formData.imagen && (
          <div className="mt-3 rounded-lg overflow-hidden border border-gray-300">
            <img
              src={formData.imagen}
              alt="Vista previa"
              className="w-full h-48 object-cover"
              onError={() => setImagenValida(false)}
            />
            {!imagenValida && (
              <p className="text-sm text-red-600 text-center py-2">
                ⚠️ La URL ingresada no es válida.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Precio */}
      <input
        type="number"
        placeholder="Precio en Gs."
        required
        min="0"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
        value={formData.precio}
        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
      />

      {/* Categoría */}
      <input
        type="text"
        placeholder="Categoría del producto"
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
        value={formData.categoria}
        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
      />

      {/* Destacado */}
      <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.destacado}
          onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
          className="w-4 h-4 accent-printica-primary"
        />
        <span className="select-none">¿Marcar como destacado?</span>
      </label>

      {/* Botones */}
      <div className="flex gap-4 justify-center">
        <button
          type="submit"
          className="px-5 py-2 bg-printica-primary text-white rounded-md hover:bg-printica-secondary font-semibold transition-transform transform hover:scale-105"
        >
          {modoEdicion ? '💾 Guardar cambios' : '➕ Agregar producto'}
        </button>

        {modoEdicion && (
          <button
            type="button"
            onClick={resetForm}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 font-semibold transition-transform hover:scale-105"
          >
            ❌ Cancelar
          </button>
        )}
      </div>
    </motion.form>
  )
}

export default ProductForm
