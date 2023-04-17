/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,vue}'],
  theme: {
    extend: {
      colors: {
        pink: {
          8: '#867070',
          d5: '#D5B4B4',
          e4: '#E4D0D0',
          f5: '#F5EBEB',
          f6: '#f4f0f0'
        }
      }
    }
  },
  plugins: []
}
