/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,vue,js}"],
  theme: {
    extend: {
      animation:{
        fadeup: 'animate-fade-up animate-infinite animate-duration-[2000ms] animate-delay-[1ms] animate-ease-linear animate-normal animate-fill-forwards'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
/* 애니메이션 동작 
 한번 animate-once
 두번 animate-twice 
 반복 animate-infinite
*/
