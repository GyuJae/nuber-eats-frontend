module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        green: {
          DEFAULT: "#3E9920",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
