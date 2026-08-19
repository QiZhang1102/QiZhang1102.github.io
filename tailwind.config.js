/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#183153',
        academicBlue: '#00629B',
        academicGold: '#F5C400',
        paper: '#FAFBFC',
        ink: '#1F2D3D',
        muted: '#5C6F82',
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Palatino', 'serif'],
        sans: ['Inter', '"Avenir Next"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        academic: '0 18px 45px rgba(24, 49, 83, 0.10)',
        lift: '0 24px 60px rgba(24, 49, 83, 0.14)',
      },
    },
  },
  plugins: [],
}
