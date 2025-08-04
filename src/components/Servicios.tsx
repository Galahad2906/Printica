import React from 'react'
import { FaTags, FaQrcode, FaLightbulb } from 'react-icons/fa'
import { motion } from 'framer-motion'

type Servicio = {
  icono: React.ReactElement
  titulo: string
  descripcion: string
}

const servicios: Servicio[] = [
  {
    icono: <FaTags size={36} className="text-printica-primary" />,
    titulo: 'Diseño para productos',
    descripcion: 'Stickers, toppers, llaveros, empaques y recuerdos personalizados.',
  },
  {
    icono: <FaQrcode size={36} className="text-printica-primary" />,
    titulo: 'Afiches con QR',
    descripcion: 'Conectá tu marca o Instagram con diseños modernos y funcionales.',
  },
  {
    icono: <FaLightbulb size={36} className="text-printica-primary" />,
    titulo: 'Identidad visual',
    descripcion: 'Creamos tu logo, flyers y estilo para que tu marca se destaque.',
  },
]

const Servicios = () => {
  return (
    <section
      id="servicios"
      role="region"
      aria-labelledby="titulo-servicios"
      className="py-20 px-4 sm:px-6 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 id="titulo-servicios" className="text-3xl font-bold text-printica-primary">
          Nuestros servicios
        </h2>
        <p className="mt-2 text-printica-accent1">Lo que podemos hacer por vos</p>
      </div>

      <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-center max-w-6xl mx-auto">
        {servicios.map((serv, i) => (
          <motion.li
            key={i}
            className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md text-center border border-gray-100"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }}
            aria-label={serv.titulo}
          >
            <div className="mb-4 flex justify-center">{serv.icono}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{serv.titulo}</h3>
            <p className="text-gray-600">{serv.descripcion}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default Servicios
