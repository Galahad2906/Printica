import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

const SobreNosotrosManager = () => {
  const [texto, setTexto] = useState('')
  const [imagen, setImagen] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const docRef = doc(db, 'config', 'sobre')
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          const data = snap.data()
          setTexto(data.texto || '')
          setImagen(data.imagen || '')
        }
      } catch (error) {
        console.error('Error al obtener datos de Sobre Nosotros:', error)
        toast.error('❌ Error al cargar la información')
      } finally {
        setCargando(false)
      }
    }

    obtenerDatos()
  }, [])

  const guardarDatos = async () => {
    if (!texto || !imagen) {
      toast.error('⚠️ Completá todos los campos')
      return
    }

    try {
      await setDoc(doc(db, 'config', 'sobre'), { texto, imagen })
      toast.success('✅ Información actualizada correctamente')
    } catch (error) {
      console.error('Error al guardar información:', error)
      toast.error('❌ Ocurrió un error al guardar')
    }
  }

  if (cargando) return <p className="text-center py-4 text-gray-600">Cargando sección...</p>

  return (
    <section className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200">
      <h3 className="text-xl font-bold text-printica-primary mb-4">📌 Sobre Printica</h3>

      {/* Texto descriptivo */}
      <textarea
        placeholder="Texto descriptivo"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="w-full border p-2 rounded mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        rows={4}
      />

      {/* URL de imagen */}
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Vista previa */}
      {imagen && (
        <img
          src={imagen}
          alt="Vista previa"
          className="w-full h-48 object-cover rounded shadow border mb-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/800x300?text=Imagen+no+disponible'
          }}
        />
      )}

      {/* Botón guardar */}
      <button
        onClick={guardarDatos}
        className="bg-printica-primary text-white w-full py-2 rounded font-bold hover:bg-printica-secondary transition-colors duration-300"
      >
        Guardar cambios
      </button>
    </section>
  )
}

export default SobreNosotrosManager
