/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    fontFamily: {
      'display': ['Playfair Display', 'serif'],
      'body': ['Merriweather', 'serif']
    },
    extend: {
      colors: {
        "primary": "#b8860b", 
        "secondary": "#2f4f4f", 
        "forest-deep": "#0A3A2A", 
        "gold-aged": "#b8860b", 
        "cream-parchment": "#fdf7e3", 
        "text-light": "#e0e0e0", 
      },
      // UPDATE ANIMASI DISINI
      animation: {
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards', // Lebih smooth
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
