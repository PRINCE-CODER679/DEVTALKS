/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#070707',
        noir: '#0D0D0E',
        surface: '#131416',
        subtle: '#1B1D20',
        elevated: '#24272C',
        brand: {
          red: '#FF2A1A',
          crimson: '#D91C1C',
          darkRed: '#7A0C0C',
          lightRed: '#FF4D3D',
          glow: 'rgba(255, 42, 26, 0.35)',
        },
        editorial: {
          light: '#F2F2F2',
          muted: '#8A8F98',
          dim: '#555B66',
          border: 'rgba(255, 255, 255, 0.09)',
          borderHover: 'rgba(255, 255, 255, 0.22)',
          redBorder: 'rgba(255, 42, 26, 0.3)',
        }
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        handwritten: ['"Caveat"', 'cursive'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        editorial: ['"Syne"', '"Cabinet Grotesk"', 'sans-serif'],
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
