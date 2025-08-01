import React from 'react'
import { FaTags, FaQrcode, FaLightbulb } from 'react-icons/fa'

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
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 id="titulo-servicios" className="text-3xl font-bold text-printica-primary">
          Nuestros servicios
        </h2>
        <p className="mt-2 text-printica-accent1">Lo que podemos hacer por vos</p>
      </div>

      <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-center max-w-6xl mx-auto">
        {servicios.map((serv, i) => (
          <li
            key={i}
            className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-gray-100"
            data-aos="zoom-in"
            data-aos-delay={i * 150}
            aria-label={serv.titulo}
          >
            <div className="mb-4 flex justify-center">{serv.icono}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{serv.titulo}</h3>
            <p className="text-gray-600">{serv.descripcion}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Servicios
