/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // A shade of blue
        secondary: "#60A5FA", // Lighter blue
        accent: "#10B981", // Green accent
        neutral: "#F3F4F6", // Light gray
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Outfit', 'serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
  },
};