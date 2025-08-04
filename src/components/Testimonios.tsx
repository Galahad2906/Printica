import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { motion } from 'framer-motion'

type Testimonio = {
  id: string
  nombre: string
  mensaje: string
  avatar: string
}

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'testimonios'))
        const datos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Testimonio[]
        setTestimonios(datos)
      } catch (error) {
        console.error('Error al cargar testimonios:', error)
      }
    }

    fetchTestimonios()
  }, [])

  return (
    <section
      className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8 text-center"
      id="testimonios"
      role="region"
      aria-labelledby="titulo-testimonios"
    >
      <motion.h2
        id="titulo-testimonios"
        className="text-3xl font-bold text-printica-primary mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Lo que dicen nuestros clientes
      </motion.h2>

      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={testimonios.length > 1}
        >
          {testimonios.map((testi, index) => (
            <SwiperSlide
              key={testi.id}
              aria-label={`Testimonio de ${testi.nombre}`}
            >
              <motion.div
                className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto border border-gray-100"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
              >
                <img
                  src={testi.avatar}
                  alt={`Foto de ${testi.nombre}`}
                  loading="lazy"
                  decoding="async"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-printica-accent1 object-cover"
                />
                <p className="italic text-gray-700 mb-3 leading-relaxed">“{testi.mensaje}”</p>
                <p className="font-bold text-printica-deep">— {testi.nombre}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}

export default Testimonios
