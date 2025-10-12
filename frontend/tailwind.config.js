/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
      },
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#f59e0b",
      },
    },
  },
  plugins: [],
};
