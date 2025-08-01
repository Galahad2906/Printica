// src/pages/Home.tsx

import Productos from '../components/Productos'
import Servicios from '../components/Servicios'
import Testimonios from '../components/Testimonios'
import SobreNosotros from '../components/SobreNosotros'
import Contacto from '../components/Contacto'
// 🔄 Futuro: Importar Banner dinámico si está implementado
// import Banner from '../components/Banner'

const Home = () => {
  return (
    <main role="main" aria-label="Página principal de Printica">
      {/* Banner dinámico (opcional) */}
      {/* <Banner /> */}

      {/* Catálogo de Productos */}
      <section id="productos" aria-label="Catálogo de productos">
        <Productos />
      </section>

      {/* Servicios */}
      <section id="servicios" aria-label="Servicios de Printica">
        <Servicios />
      </section>

      {/* Testimonios */}
      <section id="testimonios" aria-label="Opiniones de clientes">
        <Testimonios />
      </section>

      {/* Sobre Nosotros */}
      <section id="sobre-nosotros" aria-label="Información sobre Printica">
        <SobreNosotros />
      </section>

      {/* Contacto */}
      <section id="contacto" aria-label="Formulario de contacto">
        <Contacto />
      </section>
    </main>
  )
}

export default Home
