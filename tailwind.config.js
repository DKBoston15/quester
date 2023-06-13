module.exports = {
  darkMode: "class",
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        quester: {
          500: '#2563EB'
        },
        linearlight: '#1F2130',
        lineardark: '#181922'
      },
    },
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}', "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  plugins: [
    // ...
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
  theme: {},
};


// dark:bg-gray-700
// dark:bg-gray-700 dark:text-white dark:border-gray-700
// dark:bg-[#1f242b]
// dark:text-[#2563EB] dark:hover:text-blue-700
