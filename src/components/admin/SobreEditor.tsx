import { SobreData } from 'types'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

type SobreEditorProps = {
  sobreData: SobreData
  setSobreData: React.Dispatch<React.SetStateAction<SobreData>>
  guardarSobre: () => Promise<void>
}

const SobreEditor = ({ sobreData, setSobreData, guardarSobre }: SobreEditorProps) => {
  const handleGuardar = async () => {
    if (!sobreData.texto.trim()) {
      toast.error('⚠️ El texto de la sección "Sobre Printica" no puede estar vacío.')
      return
    }
    if (!sobreData.imagen.trim()) {
      toast.error('⚠️ Debes proporcionar una imagen para la sección.')
      return
    }
    await guardarSobre()
    toast.success('✅ Sección "Sobre Printica" actualizada correctamente.')
  }

  return (
    <motion.section
      className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-bold text-printica-primary mb-5 text-center">
        📝 Editar sección "Sobre Printica"
      </h3>

      {/* Texto descriptivo */}
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Texto descriptivo
      </label>
      <textarea
        className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition resize-none"
        placeholder="Escribí una breve descripción sobre Printica..."
        value={sobreData.texto}
        onChange={(e) => setSobreData({ ...sobreData, texto: e.target.value })}
        rows={5}
      />

      {/* URL de imagen */}
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        URL de imagen
      </label>
      <input
        type="url"
        className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
        placeholder="Pegá aquí la URL de la imagen representativa"
        value={sobreData.imagen}
        onChange={(e) => setSobreData({ ...sobreData, imagen: e.target.value })}
      />

      {/* Vista previa de imagen */}
      {sobreData.imagen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4 rounded overflow-hidden border shadow"
        >
          <img
            src={sobreData.imagen}
            alt="Vista previa"
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/600x300?text=Imagen+no+disponible'
            }}
          />
        </motion.div>
      )}

      {/* Botón de guardar */}
      <button
        onClick={handleGuardar}
        className="bg-printica-primary text-white w-full py-3 rounded font-semibold hover:bg-printica-secondary transition-transform transform hover:scale-105"
      >
        Guardar sección
      </button>
    </motion.section>
  )
}

export default SobreEditor
