import { SobreData } from 'types'

type SobreEditorProps = {
  sobreData: SobreData
  setSobreData: React.Dispatch<React.SetStateAction<SobreData>>
  guardarSobre: () => Promise<void>
}

const SobreEditor = ({ sobreData, setSobreData, guardarSobre }: SobreEditorProps) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200">
      <h3 className="text-xl font-bold text-printica-primary mb-4">📝 Editar sección "Sobre Printica"</h3>

      {/* Texto descriptivo */}
      <textarea
        className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        placeholder="Texto descriptivo"
        value={sobreData.texto}
        onChange={(e) => setSobreData({ ...sobreData, texto: e.target.value })}
        rows={5}
      />

      {/* URL de imagen */}
      <input
        type="text"
        className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        placeholder="URL de imagen"
        value={sobreData.imagen}
        onChange={(e) => setSobreData({ ...sobreData, imagen: e.target.value })}
      />

      {/* Vista previa de imagen */}
      {sobreData.imagen && (
        <img
          src={sobreData.imagen}
          alt="Vista previa"
          className="w-full h-40 object-cover rounded-md border mb-3"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/400x200?text=No+disponible'
          }}
        />
      )}

      {/* Botón de guardar */}
      <button
        onClick={guardarSobre}
        className="bg-printica-primary text-white px-4 py-2 rounded hover:bg-printica-secondary font-bold w-full transition-colors duration-300"
      >
        Guardar sección
      </button>
    </section>
  )
}

export default SobreEditor
