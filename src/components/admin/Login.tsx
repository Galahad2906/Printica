import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('⚠️ Completá todos los campos.')
      return
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailValido.test(email)) {
      toast.error('Correo electrónico no válido.')
      return
    }

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('✅ Sesión iniciada correctamente')
      navigate('/admin')
    } catch (err) {
      console.error(err)
      toast.error('❌ Credenciales inválidas o error al iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-printica-accent2 to-printica-accent1 px-4">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200"
        aria-label="Formulario de inicio de sesión para administradores"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-printica-primary">
          Acceso administrador
        </h2>

        {/* Campo correo */}
        <label htmlFor="email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        />

        {/* Campo contraseña */}
        <label htmlFor="password" className="sr-only">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-printica-accent1"
        />

        {/* Botón login */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className={`w-full bg-printica-primary text-white font-semibold py-2 rounded transition-transform duration-300 ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:bg-printica-secondary'
          }`}
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </motion.button>
      </motion.form>
    </div>
  )
}

export default Login
