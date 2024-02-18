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
        "app-text-secondary": "#7477BC",
        'app-purple': "#383B6D",
      },
      fontFamily: {
        "app-font-family-primary": ["Quicksand", "sans-serif"],
      },
      fontSize: {
        'app-sm': ['10px', '10px'],
        'app-base': ['14px', '14px'],
        'app-lg': ['18px', '18px'],
        'app-xl': ['24px', '24px'],
        'app-2xl': ['30px', '30px'],
        'app-3xl': ['34px', '34px'],
      },
      lineHeight: {
        'app-zero': '0px',
      },
      padding: {
        'app-sm': '10px',
        'app-base': '14px',
        'app-lg': '18px',
        'app-xl': '24px',
      },
      margin: {
        'app-sm': '10px',
        'app-base': '14px',
        'app-lg': '18px',
        'app-xl': '24px',
      }
    },
  },
  plugins: [],
}