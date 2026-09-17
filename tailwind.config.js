/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#080808',
        secondaryBg: '#111111',
        elevatedBg: '#181818',
        primaryText: '#f4f0e8',
        secondaryText: '#c8c1b7',
        mutedText: '#817b73',
        borderDark: 'rgba(244, 240, 232, 0.1)',
        brand: {
          orange: '#ff5a1f',
          orangeLight: '#ff7a45',
          orangeDark: '#c83f12',
          accent: '#ff8a3d',
          accentLight: '#ffb27a',
          bg: '#080808',
          bgPrimary: '#0b0b0b',
          bgSecondary: '#111111',
          bgElevated: '#181818',
          surface: 'rgba(18, 18, 18, 0.72)',
          surfaceLight: 'rgba(244, 240, 232, 0.06)',
          surfaceHover: 'rgba(244, 240, 232, 0.1)',
          surfaceOrange: 'rgba(255, 90, 31, 0.12)',
          border: 'rgba(244, 240, 232, 0.1)',
          borderLight: 'rgba(244, 240, 232, 0.06)',
          borderOrange: 'rgba(255, 90, 31, 0.4)',
          text: '#f4f0e8',
          textSecondary: '#c8c1b7',
          muted: '#817b73',
          success: '#a8c686',
          error: '#d96c4f',
          warning: '#ff9b4a',
          info: '#b8b0a4',
        },
        editorial: {
          light: '#f4f0e8',
          muted: '#817b73',
          dim: '#55514b',
          border: 'rgba(244, 240, 232, 0.1)',
          borderHover: 'rgba(255, 90, 31, 0.4)',
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
