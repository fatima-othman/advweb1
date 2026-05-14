/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: "#355872",     // Dark Blue
      secondary: "#7AAACE",   // Medium Blue
      accent: "#9CD5FF",      // Light Blue
      background: "#F7F8F0",  // Off White
    },
  },
},
  plugins: [],
}