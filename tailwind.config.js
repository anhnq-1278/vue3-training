module.exports = {
  content: ['./src/**/*.{html,ts,vue,js}'],
  theme: {
    extend: {
      colors: {
        grey: {
          dc: '#dcdcdc',
          f8: '#F8F8F8'
        },
        red: {
          default: 'rgba(175, 47, 47, 0.15)',
          b8: '#b83f45',
          fd: '#fddfe2'
        },
        white: {
          fb: '#fbfbfb',
          f5: '#f5f5f5',
          f1: '#f1f1f1'
        },
        green: {
          ed: '#9eddd2'
        },
        blue: {
          '3b': '#3B5998',
          e8: '#e8f0fe'
        }
      }
    },
    boxShadow: {
      '3xl':
        '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)',
      default: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
      xs: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
    }
  },
  plugins: []
}
