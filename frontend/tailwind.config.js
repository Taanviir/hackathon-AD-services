/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(241deg, #D5CAA8 2.95%, #CAC6B9 54.56%, #A5A193 78.2%)',
      },
      colors: {
        'gold': {
          50: '#f9f8f5',
          100: '#f3f0e9',
          200: '#e6dcbf',
          300: '#d9c794',
          400: '#bf9e4b',
          500: '#a58301',
          600: '#947a01',
          700: '#7d6701',
          800: '#625201',
          900: '#504201',
        },
      },
      boxShadow: {
        'whiteGold': '0 4px 30px #e6dcbf', // Customize this as needed
      },
    },
  },
  plugins: [],
}
