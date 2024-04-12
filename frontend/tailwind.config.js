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
        backAlma: 'url("/static/fotoAlma1.jpg")',
        photo1: 'url("/static/fotoAlma3.jpg")',
        photo2: 'url("/static/fotoAlma4.jpg")',
        photo3: 'url("/static/fotoAlma5.jpg")',
        photo4: 'url("/static/fotoAlma6.jpg")',
        photo5: 'url("/static/fotoAlma8.jpg")',
        photo6: 'url("/static/fotoAlma9.jpg")',
      },
    },
  },
  plugins: [],
};
