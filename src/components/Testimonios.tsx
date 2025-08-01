import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

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
          ...doc.data()
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
      <h2
        id="titulo-testimonios"
        className="text-3xl font-bold text-printica-primary mb-10"
      >
        Lo que dicen nuestros clientes
      </h2>

      <div className="max-w-6xl mx-auto" data-aos="fade-up">
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
              className="mb-6"
              aria-label={`Testimonio de ${testi.nombre}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto border border-gray-100 hover:shadow-lg transition">
                <img
                  src={testi.avatar}
                  alt={`Foto de ${testi.nombre}`}
                  loading="lazy"
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-printica-accent1 object-cover"
                />
                <p className="italic text-gray-700 mb-3 leading-relaxed">“{testi.mensaje}”</p>
                <p className="font-bold text-printica-deep">— {testi.nombre}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonios
