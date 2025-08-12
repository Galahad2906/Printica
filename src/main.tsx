import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CarritoProvider } from './context/CarritoContext'
import { Toaster } from 'sonner'

import './index.css'
import 'swiper/css'
import 'swiper/css/pagination'

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento #root en index.html')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <App />
          <Toaster position="top-right" richColors />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
