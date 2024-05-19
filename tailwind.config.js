/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        notsoblack: '#121212',
        blacker:"#080404",
        jade: "#06b69d",
        darkjade:"#046053",
        lightjade:"#D2FEF8",
      },
    },
  },
  plugins: [],
};
