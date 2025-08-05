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
import { toast } from 'react-hot-toast'

import { Producto, Testimonio, BannerData, SobreData } from 'types'
import BannerManager from './BannerManager'
import SobreEditor from './SobreEditor'
import TestimoniosManager from './TestimoniosManager'
import ServiciosManager from './ServiciosManager' // ✅ Importado nuevo componente
import ProductForm from './ProductForm'
import ProductList from './ProductList'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'productos' | 'testimonios' | 'banner' | 'sobre' | 'servicios'>('productos') // ✅ Agregado "servicios"

  // 🛍 Productos
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: '',
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
    nombre: '',
    mensaje: '',
    avatar: '',
  })
  const [modoEdicionTestimonio, setModoEdicionTestimonio] = useState(false)
  const [idEditandoTestimonio, setIdEditandoTestimonio] = useState<string | null>(null)

  // 🖼️ Banner
  const [bannerData, setBannerData] = useState<BannerData & { enlace?: string }>({
    imagen: '',
    enlace: '',
    activo: false,
  })

  // 🧾 Sobre nosotros
  const [sobreData, setSobreData] = useState<SobreData>({ texto: '', imagen: '' })

  // 🎨 Toast personalizado para Printica
  const toastPrintica = (mensaje: string, tipo: 'success' | 'error' = 'success') =>
    toast[tipo](mensaje, {
      icon: tipo === 'success' ? '🎉' : '⚠️',
      style: {
        background: '#FD3D00',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      },
      duration: 3000,
    })

  // ====================
  // 🔄 CARGA INICIAL
  // ====================
  useEffect(() => {
    fetchProductos()
    fetchTestimonios()
    obtenerBanner()
    obtenerSobre()
  }, [])

  // ====================
  // 📦 CRUD PRODUCTOS
  // ====================
  const fetchProductos = async () => {
    const snapshot = await getDocs(collection(db, 'productos'))
    const datos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Producto, 'id'>),
    }))
    setProductos(datos)
  }

  const handleEditar = (producto: Producto) => {
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      precio: producto.precio.toString(),
      categoria: producto.categoria,
      destacado: producto.destacado,
    })
    setProductoEditandoId(producto.id)
    setModoEdicion(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { nombre, descripcion, imagen, precio, categoria, destacado } = formData

    if (!nombre || !descripcion || !imagen || !precio || !categoria) {
      toastPrintica('⚠️ Completá todos los campos obligatorios.', 'error')
      return
    }

    try {
      const data = {
        nombre,
        descripcion,
        imagen,
        precio: parseFloat(precio),
        categoria,
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

  const handleEliminar = async (id: string) => {
    if (!window.confirm('¿Eliminar este producto?')) return
    await deleteDoc(doc(db, 'productos', id))
    toastPrintica('🗑️ Producto eliminado correctamente')
    await fetchProductos()
  }

  // ====================
  // 💬 CRUD TESTIMONIOS
  // ====================
  const fetchTestimonios = async () => {
    const snap = await getDocs(collection(db, 'testimonios'))
    const datos = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonio[]
    setTestimonios(datos)
  }

  const guardarTestimonio = async () => {
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
      setTestimonioForm({ nombre: '', mensaje: '', avatar: '' })
      setModoEdicionTestimonio(false)
      setIdEditandoTestimonio(null)
      await fetchTestimonios()
    } catch (error) {
      console.error(error)
      toastPrintica('❌ Error al guardar testimonio', 'error')
    }
  }

  const eliminarTestimonio = async (id: string) => {
    if (confirm('¿Eliminar este testimonio?')) {
      await deleteDoc(doc(db, 'testimonios', id))
      toastPrintica('🗑️ Testimonio eliminado')
      await fetchTestimonios()
    }
  }

  // ====================
  // 🖼️ BANNER & SOBRE
  // ====================
  const obtenerBanner = async () => {
    try {
      const ref = doc(db, 'banner', 'principal')
      const snap = await getDoc(ref)
      if (snap.exists()) setBannerData(snap.data() as BannerData & { enlace?: string })
    } catch (error) {
      console.error('Error al cargar banner:', error)
    }
  }

  const obtenerSobre = async () => {
    const ref = doc(db, 'config', 'sobre')
    const snap = await getDoc(ref)
    if (snap.exists()) setSobreData(snap.data() as SobreData)
  }

  const guardarBanner = async () => {
    try {
      await setDoc(doc(db, 'banner', 'principal'), bannerData)
      toastPrintica('🎉 Banner actualizado correctamente')
    } catch (error) {
      console.error(error)
      toastPrintica('❌ Error al guardar el banner', 'error')
    }
  }

  const guardarSobre = async () => {
    try {
      await setDoc(doc(db, 'config', 'sobre'), sobreData)
      toastPrintica('✅ Sección "Sobre Printica" actualizada')
    } catch (error) {
      console.error(error)
      toastPrintica('❌ Error al guardar sección sobre', 'error')
    }
  }

  // ====================
  // 🚪 LOGOUT
  // ====================
  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
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
        {[
          { key: 'productos', label: '🧾 Productos' },
          { key: 'testimonios', label: '💬 Testimonios' },
          { key: 'banner', label: '📸 Banner' },
          { key: 'sobre', label: '📝 Sobre Printica' },
          { key: 'servicios', label: '🛠 Servicios' }, // ✅ Nueva pestaña
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
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

        {tab === 'servicios' && (
          <ServiciosManager /> // ✅ Nuevo componente renderizado
        )}
      </main>
    </section>
  )
}

export default AdminPanel
