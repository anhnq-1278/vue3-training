module.exports = {
  content: ['./src/**/*.{html,ts,vue,js}'],
  theme: {
    extend: {
      colors: {
        grey: {
          dc: '#dcdcdc'
        },
        red: {
          default: 'rgba(175, 47, 47, 0.15)',
          b8: '#b83f45'
        },
        white: {
          fb: '#fbfbfb',
          f5: '#f5f5f5',
          f1: '#f1f1f1'
        },
        green: {
          ed: '#9eddd2'
        }
      }
    },
    boxShadow: {
      '3xl':
        '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)',
      default: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
    }
  },
  plugins: []
}
