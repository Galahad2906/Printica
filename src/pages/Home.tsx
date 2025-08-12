// src/pages/Home.tsx
import { useEffect, useState } from 'react'
import PublicBanner from '../components/PublicBanner'
import { cargarBanner } from '../services/banner'
import Productos from '../components/Productos'
import Servicios from '../components/Servicios'
import SobreNosotros from '../components/SobreNosotros'
import Testimonios from '../components/Testimonios'
import Contacto from '../components/Contacto'
import type { BannerData } from '../types'

const Home = () => {
  const [banner, setBanner] = useState<BannerData | null>(null)
  const [loadingBanner, setLoadingBanner] = useState(true)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await cargarBanner()
        setBanner(data)
      } finally {
        setLoadingBanner(false)
      }
    }
    fetchBanner()
  }, [])

  return (
    <main role="main" aria-label="Página principal de Printica">
      {/* 🖼 Banner principal */}
      <PublicBanner
        imagenPC={banner?.imagenPC ?? ''}
        imagenTablet={banner?.imagenTablet ?? ''}
        imagenMovil={banner?.imagenMovil ?? ''}
        enlace={banner?.enlace ?? ''}
        activo={banner?.activo ?? false}
        loading={loadingBanner}
      />

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
