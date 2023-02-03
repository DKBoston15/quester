module.exports = {
  darkMode: "class",
  theme: {
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
    './components/**/*.{js,ts,jsx,tsx}'
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
