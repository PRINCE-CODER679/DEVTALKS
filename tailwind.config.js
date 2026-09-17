/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#080808',
        noir: '#0D0D0D',
        surface: '#141414',
        subtle: '#1C1C1C',
        elevated: '#242424',
        brand: {
          orange: '#FF5500',
          amber: '#FFAA00',
          darkOrange: '#CC4400',
          lightOrange: '#FF7A00',
          glow: 'rgba(255, 85, 0, 0.45)',
          red: '#FF5500',
          crimson: '#FF6A00',
        },
        editorial: {
          light: '#F5F5F7',
          muted: '#A1A1A6',
          dim: '#6E6E73',
          border: 'rgba(255, 255, 255, 0.1)',
          borderHover: 'rgba(255, 85, 0, 0.35)',
          orangeBorder: 'rgba(255, 85, 0, 0.3)',
        }
      },
      fontFamily: {
        display: ['"Syne"', '"Outfit"', 'sans-serif'],
        accent: ['"Outfit"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        handwritten: ['"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        editorial: ['"Syne"', '"Outfit"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.4em',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
