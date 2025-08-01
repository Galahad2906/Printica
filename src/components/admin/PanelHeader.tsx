import { FC } from 'react'

interface PanelHeaderProps {
  onLogout: () => void
}

const PanelHeader: FC<PanelHeaderProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
      <h2 className="text-2xl font-bold text-printica-primary">Panel de Administración</h2>
      <button
        onClick={onLogout}
        className="bg-printica-primary hover:bg-printica-secondary text-white font-semibold px-4 py-2 rounded shadow transition-colors duration-300"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default PanelHeader
