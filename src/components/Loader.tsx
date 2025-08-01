const Loader = () => {
  return (
    <div
      className="fixed inset-0 bg-printica-primary text-white flex items-center justify-center z-50"
      role="status"
      aria-live="polite"
      aria-label="Cargando el sitio de Printica"
    >
      <div className="flex flex-col items-center">
        {/* Texto animado */}
        <div className="animate-pulse text-4xl sm:text-5xl font-black tracking-widest drop-shadow-md">
          <span aria-hidden="true">PRINTICA</span>
        </div>

        {/* Indicador visual adicional */}
        <div className="mt-4 flex space-x-2">
          <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
      <span className="sr-only">Cargando Printica...</span>
    </div>
  )
}

export default Loader
