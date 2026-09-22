/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f6',
          100: '#d7e0ea',
          200: '#b7c6d8',
          300: '#93aac3',
          400: '#3d5b7d',
          500: '#5c6672',
          600: '#2c4562',
          700: '#1c3a5e',
          800: '#16283f',
          900: '#0f1f33',
          950: '#0b1727',
        },
        cream: {
          DEFAULT: '#f1efe8',
          100: '#f6f5f0',
          200: '#ecebe2',
        },
        crimson: {
          DEFAULT: '#dc2430',
          600: '#dc2430',
          700: '#b91c27',
        },
        moss: {
          DEFAULT: '#1f9d58',
        },
        ink: '#12233a',
        muted: '#5c6672',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 31, 51, 0.06)',
      },
      keyframes: {
        'route-draw': {
          '0%': { strokeDashoffset: '400' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'route-draw': 'route-draw 2.4s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
