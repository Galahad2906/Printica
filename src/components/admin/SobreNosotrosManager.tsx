import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

const SobreNosotrosManager = () => {
  const [texto, setTexto] = useState('')
  const [imagen, setImagen] = useState('')
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)

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
    if (!texto.trim() || !imagen.trim()) {
      toast.error('⚠️ Completá todos los campos')
      return
    }

    setGuardando(true)
    try {
      await setDoc(doc(db, 'config', 'sobre'), { texto: texto.trim(), imagen: imagen.trim() })
      toast.success('✅ Información actualizada correctamente')
    } catch (error) {
      console.error('Error al guardar información:', error)
      toast.error('❌ Ocurrió un error al guardar')
    } finally {
      setGuardando(false)
    }
  }

  if (cargando) {
    return <p className="text-center py-6 text-gray-500 animate-pulse">Cargando sección...</p>
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border border-gray-200"
    >
      <h3 className="text-xl font-bold text-printica-primary mb-4">📌 Sobre Printica</h3>

      {/* Texto descriptivo */}
      <textarea
        placeholder="Texto descriptivo"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="w-full border p-3 rounded mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        rows={5}
      />

      {/* URL de imagen */}
      <input
        type="url"
        placeholder="URL de la imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-printica-accent1"
      />

      {/* Vista previa */}
      {imagen && (
        <motion.img
          src={imagen}
          alt="Vista previa"
          className="w-full h-48 object-cover rounded shadow border mb-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/800x300?text=Imagen+no+disponible'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Botón guardar */}
      <button
        onClick={guardarDatos}
        disabled={guardando}
        className={`w-full py-2 rounded font-bold transition-colors duration-300 ${
          guardando
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-printica-primary hover:bg-printica-secondary text-white'
        }`}
      >
        {guardando ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </motion.section>
  )
}

export default SobreNosotrosManager
