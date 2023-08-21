/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      content: {
        'blurback': 'url("/src/images/shadow.svg")',
        'photobackblur': 'url("/src/images/photobackblur.svg")',
        // 'arrowUpIcon': 'url("../src/arrow-up-icon.svg")',
      },
      backgroundImage: {
        'blurback': 'url("/src/images/shadow.svg")',
        'photobackblur': 'url("/src/images/photobackblur.svg")',
      },
      fontFamily: {
        'custom': ['Ubuntu','Nunito Sans', 'sans-serif'],
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

