/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Madimi One", "sans-serif"],
        body: ["Dancing Script", "cursive"],
        bodie: ["Open Sans", "sans-serif"],
        bodiee: ["Monsieur La Doulaise", "cursive"],
      },
      backgroundImage: {
        golden: 'url("static/assets/fotoAlmaM1.jpg")',
        golden2: 'url("static/assets/fotoAlmaM8.jpg")',
        photo01: 'url("static/assets/fotoAlmaM9.jpg")',
        photo02: 'url("static/assets/fotoAlmaM3.jpg")',
        photo03: 'url("static/assets/fotoAlmaM4.jpg")',
        photo04: 'url("static/assets/fotoAlmaM5.jpg")',
        photo05: 'url("static/assets/fotoAlmaM6.jpg")',
        photo06: 'url("static/assets/fotoAlmaM7.jpg")',
        photo07: 'url("static/assets/fotoAlmaM2.jpg")',
      },
    },
  },
  plugins: [],
};
