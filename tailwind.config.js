/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D2A43",
        "primary-container": "#2A3C5E",
        secondary: "#34A853",
        "secondary-hover": "#2D9147",
        "secondary-container": "#42C167",
        "on-surface-variant": "#cbc3d7",
        "surface-container-highest": "#353534",
        "outline-variant": "#494454",
        "grow-navy": "#1D2A43",
        "grow-green": "#34A853",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        bengali: ["var(--font-hind)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-50%) translateY(0)" },
          "50%": { transform: "translateY(-50%) translateY(-20px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};
