// src/pages/Home.tsx

import Productos from '../components/Productos'
import Servicios from '../components/Servicios'
import SobreNosotros from '../components/SobreNosotros'
import Testimonios from '../components/Testimonios'
import Contacto from '../components/Contacto'

const Home = () => {
  return (
    <main role="main" aria-label="Página principal de Printica">
      {/* 🛍 Catálogo de Productos */}
      <section id="productos" aria-labelledby="titulo-productos">
        <Productos />
      </section>

      {/* 🎨 Servicios */}
      <section id="servicios" aria-labelledby="titulo-servicios">
        <Servicios />
      </section>

      {/* 🏢 Sobre Nosotros */}
      <section id="sobre" aria-labelledby="titulo-sobre">
        <SobreNosotros />
      </section>

      {/* 💬 Testimonios */}
      <section id="testimonios" aria-labelledby="titulo-testimonios">
        <Testimonios />
      </section>

      {/* 📩 Contacto */}
      <section id="contacto" aria-labelledby="titulo-contacto">
        <Contacto />
      </section>
    </main>
  )
}

export default Home
