/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Blau fosc
        secondary: '#3B82F6', // Blau clar
        accent: '#EF4444', // Vermell per botons de logout
        background: '#F3F4F6', // Gris clar per fons
      },
    },
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { height: '0', opacity: '0' },
          '100%': { height: 'auto', opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};