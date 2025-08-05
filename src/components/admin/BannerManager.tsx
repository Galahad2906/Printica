import { BannerData } from '../../types'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FC } from 'react'

type BannerManagerProps = {
  bannerData: BannerData & { enlace?: string }
  setBannerData: React.Dispatch<React.SetStateAction<BannerData & { enlace?: string }>>
  guardarBanner: () => Promise<void>
}

const BannerManager: FC<BannerManagerProps> = ({ bannerData, setBannerData, guardarBanner }) => {
  const { imagen, enlace, activo } = bannerData

  const handleGuardar = async () => {
    if (!imagen) {
      toast.error('⚠️ Debes proporcionar una URL de imagen')
      return
    }
    await guardarBanner()
    toast.success('✅ Banner actualizado correctamente')
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200">
      <h3 className="text-xl font-bold text-printica-primary mb-4">📢 Banner superior</h3>

      {/* URL de imagen */}
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imagen}
        onChange={(e) => setBannerData({ ...bannerData, imagen: e.target.value })}
        className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Enlace opcional */}
      <input
        type="text"
        placeholder="(Opcional) Enlace al hacer clic"
        value={enlace || ''}
        onChange={(e) => setBannerData({ ...bannerData, enlace: e.target.value })}
        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Checkbox */}
      <label className="flex items-center gap-2 mb-4 text-gray-700">
        <input
          type="checkbox"
          checked={activo}
          onChange={(e) => setBannerData({ ...bannerData, activo: e.target.checked })}
          className="w-4 h-4 accent-printica-primary"
        />
        Mostrar banner en la web
      </label>

      {/* Vista previa */}
      {imagen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <img
            src={imagen}
            alt="Vista previa del banner"
            className="w-full h-auto max-h-64 sm:max-h-80 object-cover rounded-md shadow border"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/800x300?text=Imagen+no+disponible'
            }}
          />
        </motion.div>
      )}

      {/* Botón guardar */}
      <button
        onClick={handleGuardar}
        className="bg-printica-primary text-white w-full py-2 rounded font-bold hover:bg-printica-secondary transition-colors duration-300"
      >
        Guardar banner
      </button>
    </section>
  )
}

export default BannerManager
