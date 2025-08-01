// src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { ReactNode } from 'react'
import Loader from './Loader'

type ProtectedRouteProps = {
  children: ReactNode
}

/**
 * ✅ Ruta protegida:
 * - Muestra un loader mientras verifica la sesión.
 * - Redirige a /login si el usuario no está autenticado.
 * - Permite acceso si hay un usuario válido.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, loading] = useAuthState(auth)

  // 🔄 Mientras carga el estado de autenticación, muestra el loader
  if (loading) {
    return <Loader />
  }

  // 🚫 Si no hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // ✅ Si está autenticado, renderiza el contenido protegido
  return <>{children}</>
}

export default ProtectedRoute
