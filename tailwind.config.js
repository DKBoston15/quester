const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        'quester': '#2563EB'
      },
    },
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    // ...
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
  theme: {},
};