/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#d0bcff",
        "primary-container": "#a078ff",
        "secondary": "#4cd7f6",
        "on-surface-variant": "#cbc3d7",
        "surface-container-highest": "#353534",
        "outline-variant": "#494454",
      },
    },
  },
  plugins: [],
}
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#a078ff',
          600: '#6d3bd7',
        },
        cyan: {
          400: '#4cd7f6',
        }
      }
    }
  }
}
