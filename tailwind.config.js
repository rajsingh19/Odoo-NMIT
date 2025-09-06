/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1fcf6",
          100: "#dff8ea",
          200: "#b6eed1",
          300: "#88e2b6",
          400: "#5fd79d",
          500: "#3acb87",   /* primary */
          600: "#25b675",
          700: "#1d915e",
          800: "#18734c",
          900: "#135a3c"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl2: "1rem",
        xl3: "1.25rem"
      }
    },
  },
  plugins: [],
}
