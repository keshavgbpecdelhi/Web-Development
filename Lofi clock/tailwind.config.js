/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      colors:{
        custom:{
          'bittersweet':'#B75C5B',
          'peach':'#FFE6A7',
          'cool-gray':'#8D99AE',
          'lapis-lazuli':'#175676',
          'mint-green':'#D5EAE2',
        }
      }
    },
  },
  plugins: [],
}

