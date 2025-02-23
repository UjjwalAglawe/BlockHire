/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#4E65FF ',
        secondary: '#92EFFD',
      },
      fontFamily:{
        title:'Inter'
      }
    },
  },
  plugins: [require('tailwindcss-motion')],
}

