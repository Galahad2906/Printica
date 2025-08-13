# 🎨 Printica   

**Sitio web moderno, profesional y accesible para Printica** – marca creativa paraguaya especializada en artículos personalizados, diseño gráfico y soluciones visuales para regalos únicos, marcas y eventos.  

![Printica Preview](https://printica.vercel.app/og-image.jpg)  

---

## 📑 Índice
- [🧠 ¿Qué es Printica?](#-qué-es-printica)  
- [🔗 Sitio en línea](#-sitio-en-línea)  
- [🛠️ Tecnologías utilizadas](#️-tecnologías-utilizadas)  
- [✨ Funcionalidades destacadas](#-funcionalidades-destacadas)  
- [🛍️ Panel Admin y E-commerce](#️-panel-admin-y-e-commerce)  
- [🖼️ Sistema de banners mejorado](#️-sistema-de-banners-mejorado)  
- [🔐 Autenticación y seguridad](#-autenticación-y-seguridad)  
- [🚀 Optimización y rendimiento](#-optimización-y-rendimiento)  
- [📜 Cambios recientes](#-cambios-recientes)  
- [👨‍💻 Desarrollador](#-desarrollador)  
- [📝 Licencia](#-licencia)  

---

## 🧠 ¿Qué es Printica?  

**Printica** nace en Encarnación con la misión de crear artículos personalizados que inmortalicen momentos especiales. Combinamos **creatividad, estilo y tecnología** para ofrecer:  
- 🎁 Regalos únicos y personalizados  
- 🖼️ Cuadros y afiches QR  
- 🏢 Branding visual para marcas y emprendedores  
- 🎨 Productos diseñados con atención a cada detalle  

> Enviamos a todo Paraguay, llevando diseño y personalización a cada rincón del país.  

---

## 🔗 Sitio en línea  

👉 **[printica.vercel.app](https://printica.vercel.app)**  

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com)  

---

## 🛠️ Tecnologías utilizadas  

- ⚛️ **React + Vite + TypeScript** → Arquitectura moderna y escalable  
- 💨 **Tailwind CSS** → Diseño responsive rápido y personalizable  
- 🧩 **React Icons** → Íconos accesibles y consistentes  
- 🎞️ **Framer Motion & AOS** → Animaciones fluidas y microinteracciones  
- 🖼️ **SwiperJS** → Carrusel profesional para testimonios  
- 🔥 **Firebase Firestore + Auth** → Base de datos, autenticación y reglas de seguridad  
- 🚀 **Vercel** → Deploy continuo integrado con GitHub  

---

## ✨ Funcionalidades destacadas  

- 🚀 **Loader inicial animado** para transiciones suaves  
- 🛍️ **Catálogo de productos dinámico** con filtros por categoría y destacados  
- 🧾 **Carrito integrado con WhatsApp**, persistente en LocalStorage  
- 🖥️ **Panel administrativo seguro (CRUD)** para productos, testimonios y secciones editables  
- 🗣️ **Testimonios reales** cargados dinámicamente desde Firebase  
- 📱 **Responsive total**: optimizado para móviles, tablets y escritorio  
- 🔧 **SEO y Open Graph integrados** (Meta Tags, Twitter Cards y OG Image)  

---

## 🛍️ Panel Admin y E-commerce  

Desde el panel de administración se puede:  
- ➕ Agregar, editar y eliminar productos  
- ⭐ Destacar productos en portada  
- 🖼️ Administrar testimonios de clientes  
- ✍️ Editar la sección “Sobre Printica”  
- 🖼️ **Editar banner principal** con soporte para imagen PC, Tablet y Móvil, y enlaces personalizados  

### 🔜 Próximas funciones:  
- 🛒 **Historial de pedidos** guardado en el navegador  
- 🧾 **Checkout validado con resumen previo**  
- 📱 **Datos del comprador integrados en pedidos vía WhatsApp**  
- 💳 Integración futura con pagos online  

---

## 🖼️ Sistema de banners mejorado  

- 📌 **Compatibilidad con formatos antiguos y nuevos** (`/banners/principal` y `/config/banner`)  
- 🖼️ **Fallback automático**: si Tablet o Móvil están vacíos, usan la imagen de PC  
- 🛡️ **Reglas Firestore actualizadas** para que solo el admin autorizado pueda editarlos  
- 🪄 **Botón en panel admin** para completar vacíos automáticamente  
- 🔄 Sincronización entre colecciones para transición sin cortes  

---

## 🔐 Autenticación y seguridad  

- 🔑 Acceso protegido al panel admin con **Firebase Auth**  
- 📧 **Whitelist por email** (`admin@bambulab.com`) para escritura en Firestore  
- 💾 Sesión persistente en navegador para gestión fluida  
- 🛡️ Validaciones de esquema en reglas Firestore para datos limpios  

---

## 🚀 Optimización y rendimiento  

- 🖼️ Imágenes con `lazy-loading` y `decoding="async"`  
- 🧭 Scroll suave con `scroll-behavior`  
- ⚡ Divisiones de código (lazy loading) en secciones secundarias  
- 🎯 Mejora de Core Web Vitals con carga diferida y cache en Vercel  
- 🔎 Preparado para **PWA (offline e instalación como app)** en futuras mejoras  

---

## 📜 Cambios recientes  

- 🔹 **PublicBanner.tsx**: soporte de fallbacks y placeholders.  
- 🔹 **BannerManager.tsx**: autocompletado de imágenes faltantes y botón rápido.  
- 🔹 **services/banner.ts**: guardado con prioridad en `/banners/principal` y fallback a `/config/banner`.  
- 🔹 **Reglas Firestore**: añadida colección `/banners/{id}`, mantenida `/config/banner`, validaciones estrictas y whitelist por email.  
- 🔹 Compatibilidad total con formatos de banner antiguos y nuevos.  

---

## 👨‍💻 Desarrollador  

Creado con ❤️ por **Guillermo Zaracho Zayas**  
📲 Contacto: [WhatsApp](https://wa.me/595972166248)  

---

## 📝 Licencia  

Este proyecto es de uso exclusivo para **Printica**.  
Todos los derechos reservados © 2025.  
