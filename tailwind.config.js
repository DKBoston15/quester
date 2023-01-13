const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
    },
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [
    // ...
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
};
