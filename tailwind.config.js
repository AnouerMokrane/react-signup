/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-dark": "#333333",
        "secondary-dark": "#111111",
        gray1: "#666666",
        "primary-button": "#c3c3c3",
      },
    },
  },
  plugins: [],
};
