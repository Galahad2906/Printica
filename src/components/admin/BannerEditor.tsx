import { FC } from 'react'

interface BannerEditorProps {
  imagen: string
  activo: boolean
  onChange: (data: { imagen: string; activo: boolean }) => void
  onSave: () => void
}

const BannerEditor: FC<BannerEditorProps> = ({ imagen, activo, onChange, onSave }) => {
  return (
    <div className="mb-10 border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold text-printica-primary mb-2">📸 Banner superior</h3>

      {/* Campo URL de imagen */}
      <input
        type="text"
        placeholder="URL de la imagen del banner"
        className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        value={imagen}
        onChange={(e) => onChange({ imagen: e.target.value, activo })}
      />

      {/* Vista previa */}
      {imagen && (
        <img
          src={imagen}
          alt="Vista previa del banner"
          className="w-full max-h-60 object-cover rounded border mb-3"
        />
      )}

      {/* Checkbox de activación */}
      <label className="flex items-center gap-2 mt-2 text-gray-700">
        <input
          type="checkbox"
          checked={activo}
          onChange={(e) => onChange({ imagen, activo: e.target.checked })}
          className="w-4 h-4 accent-printica-primary"
        />
        Mostrar banner en la web
      </label>

      {/* Botón guardar */}
      <button
        onClick={onSave}
        className="mt-4 px-4 py-2 bg-printica-primary text-white rounded-md hover:bg-printica-secondary font-semibold transition-colors duration-300"
      >
        Guardar cambios
      </button>
    </div>
  )
}

export default BannerEditor
