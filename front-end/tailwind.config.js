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
        'app-purple-secondary': '#282A51',
        'app-purple-third': '#444788',
        'app-purple-forth': '#35376A',
        'app-blue-primary': '#737CD9',
        'app-bluepurple-primary': '#4834d4',
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
      },
      borderWidth: {
        'app-xs': '1px',
        'app-s': '2px',
        'app-sm': '4px',
        'app-base': '8px',
        'app-lg': '12px',
        'app-xl': '16px',
      },
      height: {
        'app-2xl': '36px',
      },
      backgroundSize: {
        '200%': '200%'
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      flexGrow: {
        'app-1': '1',
        'app-2': '2',
        'app-3': '3',
      },
      flexShrink: {
        'app-1': '1',
        'app-2': '2',
        'app-3': '3',
      },
    },
  },
  plugins: [],
}