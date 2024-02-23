/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      body : ['Pinyon Script', 'cursive'],
      display:['Dancing Script','cursive'],

      },
      backgroundImage:{
        'flowers': 'url("./src/assets/back.png")',
      }

    },
  },
  plugins: [],
}

