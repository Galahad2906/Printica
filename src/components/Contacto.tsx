import { useState } from 'react'

const Contacto = () => {
  const [nombre, setNombre] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [producto, setProducto] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !ciudad || !producto || !mensaje) {
      alert('Por favor, completá todos los campos.')
      return
    }

    const texto = `👋 Hola, soy *${nombre}* de *${ciudad}*. Estoy interesado/a en: *${producto}*.\n\n📩 Mi consulta:\n${mensaje}`
    const url = `https://wa.me/595986271647?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  return (
    <section
      id="contacto"
      role="region"
      aria-labelledby="titulo-contacto"
      className="bg-white text-printica-primary py-20 px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2
          id="titulo-contacto"
          className="text-3xl font-bold text-printica-primary"
        >
          ¿Querés contactarnos?
        </h2>
        <p className="mt-2 text-gray-700">
          Completá el formulario y te respondemos por WhatsApp.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        role="form"
        aria-labelledby="titulo-contacto"
        className="max-w-2xl mx-auto space-y-6 text-left"
      >
        {/* Nombre */}
        <input
          id="nombre"
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full px-4 py-3 border border-printica-primary rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
        />

        {/* Ciudad */}
        <input
          id="ciudad"
          type="text"
          placeholder="Tu ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
          className="w-full px-4 py-3 border border-printica-primary rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
        />

        {/* Producto */}
        <input
          id="producto"
          type="text"
          placeholder="Producto de interés"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          required
          className="w-full px-4 py-3 border border-printica-primary rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
        />

        {/* Mensaje */}
        <textarea
          id="mensaje"
          placeholder="Tu mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-3 border border-printica-primary rounded-md focus:outline-none focus:ring-2 focus:ring-printica-accent1 transition"
        />

        {/* Botón */}
        <div className="text-center">
          <button
            type="submit"
            className="btn-printica hover:scale-105 transition-transform px-8 py-3 rounded-full"
          >
            Enviar por WhatsApp
          </button>
        </div>
      </form>
    </section>
  )
}

export default Contacto
