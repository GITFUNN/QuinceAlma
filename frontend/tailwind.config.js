/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      display : ['Madimi One', 'sans-serif'],
      body:['Dancing Script','cursive'],
      bodie:['Open Sans', 'sans-serif'],
     bodiee:['Monsieur La Doulaise', 'cursive'],

      },
      backgroundImage:{
        'flowers': 'url("./src/assets/back.png")',
        'flowers2': 'url("./src/assets/back2.jpg")',
        'golden':'url("./src/assets/back1.png")',
        'photo01': 'url("./src/assets/foto01.png")',
        'photo02': 'url("./src/assets/foto02.png")',
        'photo03': 'url("./src/assets/foto03.png")',
        'photo04': 'url("./src/assets/foto04.jpg")',
      }

    },
  },
  plugins: [],
}

