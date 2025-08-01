// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Login from './components/admin/Login'
import AdminPanel from './components/admin/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute'

import './index.css'
import 'swiper/css'
import 'swiper/css/pagination'

import { CarritoProvider } from './context/CarritoContext'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* 🛒 Contexto global del carrito */}
    <CarritoProvider>
      {/* 🌐 Router principal */}
      <BrowserRouter>
        <Routes>
          {/* 🏠 Página principal */}
          <Route path="/" element={<App />} />
          {/* 🔐 Login de administrador */}
          <Route path="/login" element={<Login />} />
          {/* 🎛 Panel de administración protegido */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      {/* 🔔 Notificaciones globales */}
      <Toaster position="top-right" richColors />
    </CarritoProvider>
  </React.StrictMode>
)
