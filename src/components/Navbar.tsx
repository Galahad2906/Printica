import logo from '../assets/logo-printica-blanco.png'

const enlaces = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#productos', texto: 'Productos' },
  { href: '#servicios', texto: 'Servicios' },
  { href: '#contacto', texto: 'Contacto' },
]

const Navbar = () => {
  return (
    <nav
      className="bg-printica-primary w-full py-4 px-4 sm:px-6 shadow-md fixed top-0 left-0 z-50"
      role="navigation"
      aria-label="Navegación principal de Printica"
      data-aos="fade-down"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <a href="#inicio" aria-label="Ir al inicio de Printica" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Logo de Printica" 
            className="h-10 w-auto"
            loading="lazy"
          />
        </a>

        {/* Enlaces */}
        <ul className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-white font-semibold text-sm sm:text-base font-sans">
          {enlaces.map(({ href, texto }) => (
            <li key={href}>
              <a
                href={href}
                aria-label={`Ir a la sección ${texto}`}
                className="hover:text-printica-accent2 transition-colors duration-300 relative group"
              >
                {texto}
                {/* Subrayado animado */}
                <span className="block h-0.5 bg-printica-accent2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
