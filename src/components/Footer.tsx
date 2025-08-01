import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/logo-printica-blanco.png'

const Footer = () => {
  return (
    <footer
      className="bg-printica-deep text-white py-10 px-4 sm:px-6 mt-16"
      role="contentinfo"
      aria-label="Pie de página de Printica"
      data-aos="fade"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Logo y nombre */}
        <div className="flex items-center justify-center md:justify-start gap-3">
          <img 
            src={logo} 
            alt="Logo de Printica" 
            className="h-10 w-auto" 
            loading="lazy"
          />
          <span className="font-bold text-lg font-sans tracking-wide">Printica</span>
        </div>

        {/* Menú de navegación */}
        <nav aria-label="Enlaces rápidos">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            <li>
              <a href="#inicio" className="hover:text-printica-accent2 transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <a href="#productos" className="hover:text-printica-accent2 transition-colors">
                Productos
              </a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-printica-accent2 transition-colors">
                Servicios
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-printica-accent2 transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        {/* Redes sociales */}
        <div className="flex justify-center md:justify-end gap-4" aria-label="Redes sociales de Printica">
          <a
            href="https://wa.me/595986271647"
            target="_blank"
            rel="noopener noreferrer"
            title="Enviar mensaje por WhatsApp"
            aria-label="WhatsApp de Printica"
            className="hover:text-printica-accent1 transition-colors"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://instagram.com/printica"
            target="_blank"
            rel="noopener noreferrer"
            title="Visitar Instagram de Printica"
            aria-label="Instagram de Printica"
            className="hover:text-printica-accent1 transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Derechos reservados */}
      <p className="text-center text-xs sm:text-sm mt-6 text-white/70">
        © {new Date().getFullYear()} <span className="font-semibold">Printica</span> · Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
