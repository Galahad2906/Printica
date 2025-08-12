// src/components/admin/BannerManager.tsx
import { FC } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import type { BannerData } from '../../types'

type BannerManagerProps = {
  bannerData: BannerData
  setBannerData: React.Dispatch<React.SetStateAction<BannerData>>
  guardarBanner: () => Promise<void>
}

const BannerManager: FC<BannerManagerProps> = ({ bannerData, setBannerData, guardarBanner }) => {
  const { imagenPC, imagenTablet, imagenMovil, enlace, activo } = bannerData

  const handleGuardar = async () => {
    if (!imagenPC) {
      toast.error('⚠️ Debes proporcionar al menos la imagen para PC')
      return
    }
    await guardarBanner()
    toast.success('✅ Banner actualizado correctamente')
  }

  const handleImageChange = (
    field: keyof Pick<BannerData, 'imagenPC' | 'imagenTablet' | 'imagenMovil'>,
    value: string
  ) => {
    setBannerData((prev) => ({ ...prev, [field]: value }))
  }

  const renderImageInput = (
    label: string,
    field: keyof Pick<BannerData, 'imagenPC' | 'imagenTablet' | 'imagenMovil'>,
    value: string,
    placeholderSize: string,
    recommended: string
  ) => (
    <div className="mb-6">
      <label className="block font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        placeholder={`URL de la imagen (${placeholderSize})`}
        value={value}
        onChange={(e) => handleImageChange(field, e.target.value)}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />
      <p className="text-xs text-gray-500 mt-1">
        📏 Tamaño recomendado: <span className="font-medium">{recommended}</span> — Formato JPG o PNG —{' '}
        <a
          href="https://www.iloveimg.com/es/redimensionar-imagen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-printica-primary underline hover:text-printica-secondary"
        >
          Redimensionar imagen
        </a>
      </p>
      {value && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-3"
        >
          <img
            src={value}
            alt={`Vista previa ${label}`}
            className="w-full h-auto object-cover rounded-md shadow border"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://via.placeholder.com/${placeholderSize}?text=Imagen+no+disponible`
            }}
          />
        </motion.div>
      )}
    </div>
  )

  return (
    <section className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200">
      <h3 className="text-xl font-bold text-printica-primary mb-4">📢 Banner superior</h3>

      {/* Campos de imagen */}
      {renderImageInput('Imagen para PC', 'imagenPC', imagenPC, '1600x400', '1600 x 400 px')}
      {renderImageInput('Imagen para Tablet', 'imagenTablet', imagenTablet, '1080x400', '1080 x 400 px')}
      {renderImageInput('Imagen para Móvil', 'imagenMovil', imagenMovil, '800x400', '800 x 400 px')}

      {/* Enlace opcional */}
      <input
        type="text"
        placeholder="(Opcional) Enlace al hacer clic"
        value={enlace ?? ''}
        onChange={(e) => setBannerData((prev) => ({ ...prev, enlace: e.target.value }))}
        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Checkbox */}
      <label className="flex items-center gap-2 mb-4 text-gray-700">
        <input
          type="checkbox"
          checked={!!activo}
          onChange={(e) => setBannerData((prev) => ({ ...prev, activo: e.target.checked }))}
          className="w-4 h-4 accent-printica-primary"
        />
        Mostrar banner en la web
      </label>

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
