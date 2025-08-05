import { FC } from 'react'
import { motion } from 'framer-motion'

interface PanelHeaderProps {
  onLogout: () => void
}

const PanelHeader: FC<PanelHeaderProps> = ({ onLogout }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-200 pb-4 gap-4"
      role="banner"
      aria-label="Encabezado del panel de administración"
    >
      {/* Título */}
      <h2 className="text-2xl font-bold text-printica-primary text-center sm:text-left">
        Panel de Administración
      </h2>

      {/* Botón de logout */}
      <button
        onClick={onLogout}
        aria-label="Cerrar sesión"
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow transition-colors duration-300 w-full sm:w-auto"
      >
        Cerrar sesión
      </button>
    </motion.header>
  )
}

export default PanelHeader
