import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { motion } from 'framer-motion'

const SobreNosotros = () => {
  const [info, setInfo] = useState<{ texto: string; imagen: string } | null>(null)

  useEffect(() => {
    const fetchSobre = async () => {
      try {
        const ref = doc(db, 'config', 'sobre')
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setInfo(snap.data() as { texto: string; imagen: string })
        }
      } catch (error) {
        console.error('Error al cargar sección Sobre Nosotros:', error)
      }
    }

    fetchSobre()
  }, [])

  return (
    <section
      id="sobre"
      role="region"
      aria-labelledby="titulo-sobre"
      className="py-20 px-4 sm:px-6 bg-white text-printica-primary"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {info?.imagen && (
          <motion.img
            src={info.imagen}
            alt="Sobre Printica"
            className="w-full rounded-lg shadow-lg border border-gray-100"
            width={600}
            height={400}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        )}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="titulo-sobre"
            className="text-3xl font-bold mb-4 text-printica-primary"
          >
            Sobre Printica
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {info?.texto}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SobreNosotros
