/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{inc,html}",
  ],
  theme: {
    extend: {
      height: {
        '28rem': '28rem',
      }
    },
  },
  plugins: [],
}

