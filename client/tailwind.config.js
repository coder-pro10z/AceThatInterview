/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#33678A',
        secondary: '#78A6C9',
        background: '#EAEFF3',
        highlight: '#E65C4F',
      },
    },
  },
  plugins: [],
};
  