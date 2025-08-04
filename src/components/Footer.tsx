import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/logo-printica-blanco.png'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-printica-deep text-white py-10 px-4 sm:px-6 mt-16"
      role="contentinfo"
      aria-label="Pie de página de Printica"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Logo y nombre */}
        <div className="flex items-center justify-center md:justify-start gap-3 transition-transform hover:scale-105">
          <img
            src={logo}
            alt="Logo de Printica"
            className="h-10 w-auto"
            width={120}
            height={40}
            loading="eager"
            decoding="async"
          />
          <span className="font-bold text-lg tracking-wide">Printica</span>
        </div>

        {/* Menú de navegación */}
        <nav aria-label="Enlaces rápidos">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            {['Inicio', 'Productos', 'Servicios', 'Contacto'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative group transition-colors duration-300 hover:text-printica-accent2"
                  aria-label={`Ir a la sección ${item}`}
                >
                  {item}
                  {/* Subrayado animado */}
                  <span className="block h-0.5 bg-printica-accent2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              </li>
            ))}
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
            className="hover:text-printica-accent1 transition-transform transform hover:scale-110"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://instagram.com/printica"
            target="_blank"
            rel="noopener noreferrer"
            title="Visitar Instagram de Printica"
            aria-label="Instagram de Printica"
            className="hover:text-printica-accent1 transition-transform transform hover:scale-110"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Derechos reservados */}
      <p className="text-center text-xs sm:text-sm mt-6 text-white/70">
        © {year} <span className="font-semibold">Printica</span> · Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
