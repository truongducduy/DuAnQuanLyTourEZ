/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainbg: '#111C18',        // nền chính trang login
        borderInt: '#1F3A57',      // border input
        btnColor: '#2ECC71',        // nút đăng nhập, đăng kí
        btnHover: '#28b865',   // hover nút đăng nhập, đăng kí
        facebook: '#1877F2',       // nút FB
        google: '#DB4437',         // nút Google
      }
    },
  },
  plugins: [],
}

