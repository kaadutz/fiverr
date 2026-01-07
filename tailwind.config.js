/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ini penting agar dark mode berfungsi
  theme: {
    extend: {
      colors: {
        "primary": "#b8860b", // Aged Gold (DarkGoldenrod)
        "secondary": "#2f4f4f", // Dark Slate Gray (for body text)
        "accent": "#385C4F", // Muted Moss Green (formerly Dark Slate Blue)
        "forest-deep": "#0A3A2A", // Dark, deep forest green
        "emerald-dark": "#004d40", // Dark Green-Cyan (Deep Emerald)
        "gold-aged": "#b8860b", // Dark Goldenrod (Aged Gold)
        "cream-parchment": "#fdf7e3", // Light, warm background
        "text-light": "#e0e0e0", // Lighter text for dark backgrounds
      },
      fontFamily: {
        "display": ["Montserrat", "sans-serif"],
        "body": ["Source Sans 3", "sans-serif"]
      },
      backgroundImage: {
        // Pattern SVG
        'heritage-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23cec3b3\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm0 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2h4v-2H6zM6 0H4v4H0v2h4v4h2V6h4V4H6zm0 20v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0 20v-4H4v4H0v2h4v4h2v-4h4v-2H6zm30-20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 0H34v4h-4v2h4v4h2V6h4V4h-4zm-20 0v-4h-2v4h-4v2h4v4h2V6h4V4h-4zm0 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }
    },
  },
  plugins: [],
}
