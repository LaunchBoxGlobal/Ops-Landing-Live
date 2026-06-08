/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xsm: "320px",
      // => @media (min-width: 320px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      midlg: "1366px",
      lglg: "1370px",
      xl: "1440px",
      // => @media (min-width: 1280px) { ... }
      mac: "1470px",

      midxl: "1530px",

      "2xl": "1920px",
    },
    extend: {},
  },
  plugins: [],
};
