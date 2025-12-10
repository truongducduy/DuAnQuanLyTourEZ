/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'tour-card': "rgb(35, 44, 38)",
        'section-tours': "rgb(28, 35, 31)",
      },
      colors: {
        'yl-hover': "#ffb400",
      },
    },
  },
  plugins: []
};
