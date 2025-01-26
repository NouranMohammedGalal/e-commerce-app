/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        active: "#0aad0a",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
