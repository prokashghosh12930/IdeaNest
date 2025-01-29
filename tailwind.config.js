module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern': "url('../src/assets/images/Rangitikei.svg')",
      },
      fontFamily: {
        'Emilys': ['Emilys Candy', 'cursive'],
        'Poppins': ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
}