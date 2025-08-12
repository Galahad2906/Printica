// src/App.tsx
import { useEffect, useState } from 'react'
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
import ProtectedRoute from './components/ProtectedRoute'
import Loader from './components/Loader'
import CarritoFlotante from './components/CarritoFlotante'
import Home from './pages/Home'

type BannerData = {
  activo?: boolean
  mensaje?: string
  enlace?: string
  imagen?: string
  imagen640?: string
  imagen1024?: string
  imagen1600?: string
}

function App() {
  const [cargando, setCargando] = useState(true)
  const [banner, setBanner] = useState<BannerData | null>(null)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const snap = await getDocs(collection(db, 'banner'))
        if (!snap.empty) {
          const data = snap.docs[0].data() as BannerData
          setBanner({
            activo: data.activo ?? false,
            mensaje: data.mensaje ?? '',
            enlace: data.enlace ?? '',
            imagen: data.imagen ?? '',
            imagen640: data.imagen640 ?? '',
            imagen1024: data.imagen1024 ?? '',
            imagen1600: data.imagen1600 ?? '',
          })
        } else {
          setBanner(null)
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

  // ✅ Todo definido: evitamos "Object is possibly 'undefined'"
  const b = {
    activo: banner?.activo ?? false,
    mensaje: banner?.mensaje ?? '',
    enlace: banner?.enlace ?? '',
    imagen: banner?.imagen ?? '',
    imagen640: banner?.imagen640 ?? '',
    imagen1024: banner?.imagen1024 ?? '',
    imagen1600: banner?.imagen1600 ?? '',
  }
  const tieneResponsive = !!b.imagen640 || !!b.imagen1024 || !!b.imagen1600

  return (
    <div className="overflow-x-hidden font-sans bg-white text-gray-900">
      {/* Banner superior con imagen */}
      {b.activo && (
        <div className="w-full">
          {b.enlace ? (
            <a href={b.enlace} target="_blank" rel="noopener noreferrer">
              {tieneResponsive ? (
                <picture>
                  {b.imagen640 && <source media="(max-width: 640px)" srcSet={b.imagen640} />}
                  {b.imagen1024 && <source media="(max-width: 1024px)" srcSet={b.imagen1024} />}
                  <img
                    src={b.imagen1600 || b.imagen || ''}
                    alt="Imagen promocional de Printica"
                    className="w-full h-auto max-h-64 sm:max-h-80 object-cover shadow hover:opacity-90 transition-opacity rounded-none sm:rounded-md"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              ) : (
                b.imagen && (
                  <img
                    src={b.imagen}
                    alt="Imagen promocional de Printica"
                    className="w-full h-auto max-h-64 sm:max-h-80 object-cover shadow hover:opacity-90 transition-opacity rounded-none sm:rounded-md"
                    loading="eager"
                    decoding="async"
                  />
                )
              )}
            </a>
          ) : tieneResponsive ? (
            <picture>
              {b.imagen640 && <source media="(max-width: 640px)" srcSet={b.imagen640} />}
              {b.imagen1024 && <source media="(max-width: 1024px)" srcSet={b.imagen1024} />}
              <img
                src={b.imagen1600 || b.imagen || ''}
                alt="Imagen promocional de Printica"
                className="w-full h-auto max-h-64 sm:max-h-80 object-cover shadow rounded-none sm:rounded-md"
                loading="eager"
                decoding="async"
              />
            </picture>
          ) : (
            b.imagen && (
              <img
                src={b.imagen}
                alt="Imagen promocional de Printica"
                className="w-full h-auto max-h-64 sm:max-h-80 object-cover shadow rounded-none sm:rounded-md"
                loading="eager"
                decoding="async"
              />
            )
          )}
        </div>
      )}

      {/* Mensaje textual del banner */}
      {b.activo && b.mensaje && (
        <div className="bg-printica-accent2 text-printica-deep text-center py-2 font-medium shadow">
          {b.mensaje}
        </div>
      )}

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>

      <CarritoFlotante />
      <Footer />
    </div>
  )
}

export default App
