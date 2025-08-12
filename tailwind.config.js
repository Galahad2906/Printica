/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Detecta clases en todos los archivos fuente
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        printica: {
          primary: '#FD3D00',   // Naranja rojizo
          secondary: '#D10046', // Magenta oscuro
          accent1: '#F787B5',   // Rosa claro vibrante
          accent2: '#FFBDE4',   // Rosa pastel
          deep: '#BB2649',      // Rojo borgoña profundo
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Fuente base
        titulo: ['"Fun City Level 2 Stencil"', 'sans-serif'], // Fuente decorativa
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.6s ease-out',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
