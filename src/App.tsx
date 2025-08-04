import { useEffect, useState, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { toast } from 'react-hot-toast'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/admin/Login'
import AdminPanel from './components/admin/AdminPanel'
import RutaPrivada from './components/ProtectedRoute'
import Loader from './components/Loader'
import CarritoFlotante from './components/CarritoFlotante'
import Home from './pages/Home'

// ✅ Lazy load de secciones secundarias
const Servicios = lazy(() => import('./components/Servicios'))
const SobreNosotros = lazy(() => import('./components/SobreNosotros'))
const Testimonios = lazy(() => import('./components/Testimonios'))

function App() {
  const [cargando, setCargando] = useState(true)
  const [banner, setBanner] = useState<{ mensaje?: string; activo: boolean } | null>(null)
  const [bannerImagen, setBannerImagen] = useState('')
  const [bannerEnlace, setBannerEnlace] = useState('')

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  // 🔄 Cargar banner dinámico desde Firebase
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const bannerSnap = await getDocs(collection(db, 'banner'))
        if (!bannerSnap.empty) {
          const data = bannerSnap.docs[0].data()
          setBannerImagen(data.imagen || '')
          setBannerEnlace(data.enlace || '')
          setBanner({ activo: data.activo, mensaje: data.mensaje })
        }
      } catch (error) {
        toast.error('Ocurrió un error al cargar el banner')
        console.error(error)
      } finally {
        setCargando(false)
      }
    }
    fetchBanner()
  }, [])

  if (cargando) return <Loader />

  return (
    <div className="overflow-x-hidden font-sans bg-white text-gray-900">
      {/* Banner superior con imagen */}
      {banner?.activo && bannerImagen && (
        <div className="w-full">
          {bannerEnlace ? (
            <a href={bannerEnlace} target="_blank" rel="noopener noreferrer">
              <img
                src={bannerImagen}
                alt="Imagen promocional de Printica"
                className="w-full h-auto max-h-64 sm:max-h-80 object-cover shadow hover:opacity-90 transition-opacity rounded-none sm:rounded-md"
                loading="eager"
                decoding="async"
              />
            </a>
          ) : (
            <img
              src={bannerImagen}
              alt="Imagen promocional de Printica"
              className="w-full h-auto max-h-64 sm:max-h-80 object-cover shadow rounded-none sm:rounded-md"
              loading="eager"
              decoding="async"
            />
          )}
        </div>
      )}

      {/* Mensaje textual del banner */}
      {banner?.activo && banner.mensaje && (
        <div className="bg-printica-accent2 text-printica-deep text-center py-2 font-medium shadow">
          {banner.mensaje}
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Rutas principales */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Suspense fallback={<Loader />}>
                <Servicios />
                <SobreNosotros />
                <Testimonios />
              </Suspense>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RutaPrivada>
              <AdminPanel />
            </RutaPrivada>
          }
        />
      </Routes>

      {/* Carrito flotante */}
      <CarritoFlotante />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
