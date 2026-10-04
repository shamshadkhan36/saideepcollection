/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111820',
          darker: '#0B0F14',
          surface: '#18212B',
          red: '#F20D16',
          'red-hover': '#D80911',
          gold: '#F5A623',
          'gold-dark': '#D98205',
          cream: '#FAF8F5',
          'cream-dark': '#F0ECE4',
          muted: '#8C97A5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(17, 24, 32, 0.12)',
        'luxury-lg': '0 25px 50px -12px rgba(17, 24, 32, 0.25)',
        'glow-red': '0 0 25px rgba(242, 13, 22, 0.25)',
        'glow-gold': '0 0 25px rgba(245, 166, 35, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
