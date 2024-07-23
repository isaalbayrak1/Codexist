/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/Components/*.jsx",
    "./src/App.js",
    "./src/index.html",
    "./src/index.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        gemunu: ["Gemunu Libre", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      colors: {
        "gaga-red": "#BC1A45",
        "gaga-melon": "#FFD369",
        "gaga-grey": "#DDDDDD",
        "gaga-white": "#F7F7F7",
      },
    },
  },
  plugins: [],
};
