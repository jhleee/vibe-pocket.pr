/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Claude warm neutrals
        neutral: {
          950: '#0A0908',
          900: '#161412',
          850: '#221F1D',
          800: '#2A2724',
          700: '#3D3935',
          600: '#524D48',
          500: '#8E8880',
          400: '#B3AEA8',
          300: '#D4CFC8',
          200: '#E8E4DF',
          100: '#F5F2EE',
          50: '#FDFCFB',
        },
        // Claude accent (warm copper/amber)
        accent: {
          950: '#2D1810',
          900: '#4A3428',
          800: '#6B4735',
          700: '#8C5A42',
          600: '#A04F35',
          500: '#D97757', // Primary
          400: '#E68B6D',
          300: '#F4A889',
          200: '#FFC4A5',
          100: '#FFE0D2',
          50: '#FFF9F5',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          '"SF Mono"',
          'Monaco',
          '"Cascadia Code"',
          'Consolas',
          'monospace',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '75': '75ms',
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
}
