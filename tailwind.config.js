/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brown-red': 'rgba(175, 47, 47, 0.15)',
        gray: 'rgb(135, 137, 135)'
      },
      boxShadow: {
        todo: '0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%)',
        'todo-footer': `0 1px 1px rgb(0 0 0 / 20%), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgb(0 0 0 / 20%),
        0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgb(0 0 0 / 20%)`,
        'todo-edit': 'inset 0 -1px 5px 0 rgb(0 0 0 / 20%)',
        form: '0 15px 50px rgba(0, 0, 0, 0.1)',
        info: '0 0 100px -5px rgb(0 0 0 / 25%)'
      },
      backgroundImage: {
        completed:
          "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')",
        check:
          "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')"
      }
    }
  },
  plugins: []
}
