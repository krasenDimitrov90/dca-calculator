/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-background-primary": "#1F213E",
        "app-text-primary": "#FFFFFF",
      },
      fontFamily: {
        "app-font-family-primary": ["Quicksand", "sans-serif"],
      }
    },
  },
  plugins: [],
}