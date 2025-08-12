// src/components/admin/AdminPanel.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { toast } from 'sonner'

import { Producto, Testimonio, BannerData, SobreData, ProductoFormData } from 'types'
import BannerManager from './BannerManager'
import SobreEditor from './SobreEditor'
import TestimoniosManager from './TestimoniosManager'
import ServiciosManager from './ServiciosManager'
import ProductForm from './ProductForm'
import ProductList from './ProductList'

// Servicios banner
import {
  cargarBanner,
  guardarBanner as guardarBannerSrv,
  migrarBannerLegacy,
} from '../../services/banner'

type Tab = 'productos' | 'testimonios' | 'banner' | 'sobre' | 'servicios'

const TABS: { key: Tab; label: string }[] = [
  { key: 'productos', label: '🧾 Productos' },
  { key: 'testimonios', label: '💬 Testimonios' },
  { key: 'banner', label: '📸 Banner' },
  { key: 'sobre', label: '📝 Sobre Printica' },
  { key: 'servicios', label: '🛠 Servicios' },
]

const AdminPanel = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('productos')

  // 🛍 Productos (form con precio: number | '')
  const [formData, setFormData] = useState<ProductoFormData>({
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: '', // mientras se edita
    categoria: '',
    destacado: false,
  })
  const [productos, setProductos] = useState<Producto[]>([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [productoEditandoId, setProductoEditandoId] = useState<string | null>(null)
  const [paginaActual, setPaginaActual] = useState(1)
  const productosPorPagina = 6

  // 💬 Testimonios
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [testimonioForm, setTestimonioForm] = useState<Testimonio>({
    id: '',
    nombre: '',
    mensaje: '',
    avatar: '',
  })
  const [modoEdicionTestimonio, setModoEdicionTestimonio] = useState(false)
  const [idEditandoTestimonio, setIdEditandoTestimonio] = useState<string | null>(null)

  // 🖼️ Banner (nuevo shape)
  const [bannerData, setBannerData] = useState<BannerData>({
    activo: false,
    enlace: '',
    mensaje: '',
    imagenPC: '',
    imagenTablet: '',
    imagenMovil: '',
  })

  // 🧾 Sobre nosotros
  const [sobreData, setSobreData] = useState<SobreData>({ texto: '', imagen: '' })

  // Toast de marca
  const toastPrintica = (mensaje: string, tipo: 'success' | 'error' = 'success') =>
    toast[mensaje ? tipo : 'success'](mensaje || 'Operación realizada', {
      duration: 3000,
      className: 'font-bold',
    })

  // ====================
  // 🔄 CARGA INICIAL
  // ====================
  useEffect(() => {
    void (async () => {
      try {
        await migrarBannerLegacy()
      } catch (e) {
        console.error('Migración banner:', e)
      }

      try {
        const [banner] = await Promise.all([
          cargarBanner(),
          fetchProductos(),
          fetchTestimonios(),
          obtenerSobre(),
        ])
        setBannerData(banner)
      } catch (e) {
        console.error('Carga inicial:', e)
      }
    })()
  }, [])

  // ====================
  // 📦 CRUD PRODUCTOS
  // ====================
  const fetchProductos = async (): Promise<void> => {
    try {
      const snapshot = await getDocs(collection(db, 'productos'))
      const datos = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Producto, 'id'>),
      }))
      setProductos(datos)
    } catch (e) {
      console.error(e)
      toastPrintica('Error al cargar productos', 'error')
    }
  }

  const handleEditar = (p: Producto): void => {
    setFormData({
      nombre: p.nombre ?? '',
      descripcion: p.descripcion ?? '',
      imagen: p.imagen ?? '',
      precio: typeof p.precio === 'number' ? p.precio : '', // normaliza
      categoria: p.categoria ?? '',
      destacado: Boolean(p.destacado),
    })
    setProductoEditandoId(p.id)
    setModoEdicion(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = (): void => {
    setFormData({
      nombre: '',
      descripcion: '',
      imagen: '',
      precio: '',
      categoria: '',
      destacado: false,
    })
    setModoEdicion(false)
    setProductoEditandoId(null)
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const { nombre, descripcion, imagen, precio, categoria, destacado } = formData

    if (!nombre || !descripcion || !imagen || categoria === '' || precio === '') {
      toastPrintica('⚠️ Completá todos los campos obligatorios.', 'error')
      return
    }

    const precioNumber = Number(precio)
    if (!Number.isFinite(precioNumber) || precioNumber < 0) {
      toastPrintica('El precio debe ser un número válido mayor o igual a 0.', 'error')
      return
    }

    try {
      const data = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        imagen: imagen.trim(),
        precio: precioNumber, // se guarda como number
        categoria: categoria.trim(),
        destacado,
        timestamp: serverTimestamp(),
      }

      if (modoEdicion && productoEditandoId) {
        await updateDoc(doc(db, 'productos', productoEditandoId), data)
        toastPrintica('✅ Producto actualizado correctamente')
      } else {
        await addDoc(collection(db, 'productos'), data)
        toastPrintica('✅ Producto agregado correctamente')
      }

      resetForm()
      await fetchProductos()
    } catch (error) {
      console.error('Error al guardar:', error)
      toastPrintica('❌ Ocurrió un error al guardar', 'error')
    }
  }

  const handleEliminar = async (id: string): Promise<void> => {
    if (!window.confirm('¿Eliminar este producto?')) return
    try {
      await deleteDoc(doc(db, 'productos', id))
      toastPrintica('🗑️ Producto eliminado correctamente')
      await fetchProductos()
    } catch (e) {
      console.error(e)
      toastPrintica('❌ Error al eliminar producto', 'error')
    }
  }

  // ====================
  // 💬 CRUD TESTIMONIOS
  // ====================
  const fetchTestimonios = async (): Promise<void> => {
    try {
      const snap = await getDocs(collection(db, 'testimonios'))
      const datos = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Testimonio, 'id'>),
      })) as Testimonio[]
      setTestimonios(datos)
    } catch (e) {
      console.error(e)
      toastPrintica('Error al cargar testimonios', 'error')
    }
  }

  const guardarTestimonio = async (): Promise<void> => {
    const { nombre, mensaje, avatar } = testimonioForm
    if (!nombre || !mensaje || !avatar) {
      toastPrintica('⚠️ Completá todos los campos de testimonio.', 'error')
      return
    }

    try {
      if (modoEdicionTestimonio && idEditandoTestimonio) {
        await updateDoc(doc(db, 'testimonios', idEditandoTestimonio), { nombre, mensaje, avatar })
        toastPrintica('✅ Testimonio actualizado')
      } else {
        await addDoc(collection(db, 'testimonios'), { nombre, mensaje, avatar })
        toastPrintica('✅ Testimonio agregado')
      }
      setTestimonioForm({ id: '', nombre: '', mensaje: '', avatar: '' })
      setModoEdicionTestimonio(false)
      setIdEditandoTestimonio(null)
      await fetchTestimonios()
    } catch (error) {
      console.error(error)
      toastPrintica('❌ Error al guardar testimonio', 'error')
    }
  }

  const eliminarTestimonio = async (id: string): Promise<void> => {
    if (!confirm('¿Eliminar este testimonio?')) return
    try {
      await deleteDoc(doc(db, 'testimonios', id))
      toastPrintica('🗑️ Testimonio eliminado')
      await fetchTestimonios()
    } catch (e) {
      console.error(e)
      toastPrintica('❌ Error al eliminar testimonio', 'error')
    }
  }

  // ====================
  // 🖼️ SOBRE
  // ====================
  const obtenerSobre = async (): Promise<void> => {
    try {
      const ref = doc(db, 'config', 'sobre')
      const snap = await getDoc(ref)
      if (snap.exists()) setSobreData(snap.data() as SobreData)
    } catch (e) {
      console.error(e)
      toastPrintica('Error al cargar sección Sobre', 'error')
    }
  }

  const guardarSobre = async (): Promise<void> => {
    try {
      await setDoc(doc(db, 'config', 'sobre'), sobreData)
      toastPrintica('✅ Sección "Sobre Printica" actualizada')
    } catch (error) {
      console.error(error)
      toastPrintica('❌ Error al guardar sección Sobre', 'error')
    }
  }

  // ====================
  // 🖼️ BANNER (wrapper)
  // ====================
  const guardarBanner = async (): Promise<void> => {
    try {
      await guardarBannerSrv(bannerData)
      toastPrintica('🎉 Banner actualizado correctamente')
    } catch (error) {
      console.error(error)
      toastPrintica('❌ Error al guardar el banner', 'error')
    }
  }

  // ====================
  // 🚪 LOGOUT
  // ====================
  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (e) {
      console.error(e)
      toastPrintica('No se pudo cerrar sesión', 'error')
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 text-printica-primary">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:justify-between items-center p-6 bg-white shadow-md sticky top-0 z-20">
        <h2 className="text-2xl font-bold">Panel de Administración</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow mt-4 sm:mt-0"
        >
          Cerrar sesión
        </button>
      </header>

      {/* TABS */}
      <nav className="flex flex-wrap justify-center gap-3 bg-white shadow-sm py-4 sticky top-16 z-10">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded font-semibold border transition-colors duration-300 ${
              tab === key
                ? 'bg-printica-primary text-white'
                : 'bg-white text-printica-primary border-printica-primary hover:bg-printica-accent2/30'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* CONTENIDO */}
      <main className="p-6">
        {tab === 'productos' && (
          <>
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              modoEdicion={modoEdicion}
              resetForm={resetForm}
              handleSubmit={handleSubmit}
            />
            <ProductList
              productos={productos}
              paginaActual={paginaActual}
              setPaginaActual={setPaginaActual}
              productosPorPagina={productosPorPagina}
              handleEliminar={handleEliminar}
              handleEditar={handleEditar}
            />
          </>
        )}

        {tab === 'testimonios' && (
          <TestimoniosManager
            testimonios={testimonios}
            testimonioForm={testimonioForm}
            setTestimonioForm={setTestimonioForm}
            modoEdicion={modoEdicionTestimonio}
            setModoEdicion={setModoEdicionTestimonio}
            idEditando={idEditandoTestimonio}
            setIdEditando={setIdEditandoTestimonio}
            guardarTestimonio={guardarTestimonio}
            eliminarTestimonio={eliminarTestimonio}
          />
        )}

        {tab === 'banner' && (
          <BannerManager
            bannerData={bannerData}
            setBannerData={setBannerData}
            guardarBanner={guardarBanner}
          />
        )}

        {tab === 'sobre' && (
          <SobreEditor
            sobreData={sobreData}
            setSobreData={setSobreData}
            guardarSobre={guardarSobre}
          />
        )}

        {tab === 'servicios' && <ServiciosManager />}
      </main>
    </section>
  )
}

export default AdminPanel
