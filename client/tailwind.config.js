/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#2B1B2F",
        "secondary-bg": "#3D2C40",
        "tertiary-bg": "#4E3A50",
        "primary-text": "#FFFFFF",
        "secondary-text": "#D9D9D9",
        "accent-text": "#F3ACB4",
      },
    },
  },
  plugins: [],
};
