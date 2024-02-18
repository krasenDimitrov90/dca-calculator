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
        'app-purple-secondary': '#282A51'
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
        'app-xs': '4px',
        'app-s': '6px',
        'app-sm': '10px',
        'app-base': '14px',
        'app-lg': '18px',
        'app-xl': '24px',
      },
      margin: {
        'app-xs': '4px',
        'app-s': '6px',
        'app-sm': '10px',
        'app-base': '14px',
        'app-lg': '18px',
        'app-xl': '24px',
      },
      spacing: {
        'app-sm': '10px', // Optional if you want to use the same values for spacing and margin
      },
      gap: {
        'app-sm': '10px',
        'app-base': '14px',
        'app-lg': '18px',
        'app-xl': '24px',
      },
      borderRadius: {
        'app-xs': '4px',
        'app-s': '6px',
        'app-sm': '10px',
        'app-base': '14px',
        'app-lg': '18px',
        'app-xl': '24px',
      }
    },
  },
  plugins: [],
}