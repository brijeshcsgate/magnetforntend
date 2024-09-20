/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "gray-primary": "#393938",
        "gray-secondary": "#252524",
        "gray-tertiary": "#747372",
        "gray-quaternary": "#9A9998",
        "blue-primary-200": "#006CB8",
        "blue-primary-100": "#CDE9F6",
        "border-primary": "#e0e0e0",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "custom-focus": "0 0 0 3px #a4cafe73",
      },
      borderColor: {
        "custom-focus": "#a4cafe",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
