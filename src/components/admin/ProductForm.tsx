import { motion } from 'framer-motion'

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
  handleSubmit
}: Props) => {
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto mb-10 bg-white p-6 rounded-lg shadow border border-gray-200"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-printica-primary mb-4">
        {modoEdicion ? '✏️ Editar producto' : '➕ Nuevo producto'}
      </h2>

      {/* Nombre */}
      <input
        type="text"
        placeholder="Nombre del producto"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />

      {/* Descripción */}
      <textarea
        placeholder="Descripción"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
      />

      {/* Imagen */}
      <input
        type="text"
        placeholder="URL de la imagen"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        value={formData.imagen}
        onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
      />

      {formData.imagen && (
        <img
          src={formData.imagen}
          alt="Vista previa"
          className="w-full h-40 object-cover rounded-md border"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/300x200?text=Imagen+no+válida'
          }}
        />
      )}

      {/* Precio */}
      <input
        type="number"
        placeholder="Precio"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        value={formData.precio}
        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
      />

      {/* Categoría */}
      <input
        type="text"
        placeholder="Categoría"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        value={formData.categoria}
        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
      />

      {/* Destacado */}
      <label className="flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          checked={formData.destacado}
          onChange={(e) =>
            setFormData({ ...formData, destacado: e.target.checked })
          }
          className="w-4 h-4 accent-printica-primary"
        />
        Destacado
      </label>

      {/* Botones */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-printica-primary text-white rounded-md hover:bg-printica-secondary font-semibold transition-colors"
        >
          {modoEdicion ? 'Guardar cambios' : 'Agregar producto'}
        </button>

        {modoEdicion && (
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 font-semibold transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </motion.form>
  )
}

export default ProductForm
