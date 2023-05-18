/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,ts,txs,js,jsx,html}'],
  theme: {
    extend: {},
    fontSize: {
      xs: ['var(--fs-text-xs)', 'var(--lh-18)'],
      sm: ['var(--fs-text-sm)', 'var(--lh-21)'],
      base: ['var(--fs-text-base)', 'var(--lh-24)'],
      l: ['var(--fs-text-l)', 'var(--lh-30)'],
      xl: ['var(--fs-text-xl)', 'var(--lh-36)'],
      '2xl': ['var(--fs-text-2xl)', 'var(--lh-36)']
    }
  },
  plugins: []
}
