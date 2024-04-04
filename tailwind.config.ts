import type { Config } from "tailwindcss";
const { fuchsia, sky, violet, cyan, orange } = require("tailwindcss/colors");

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        herocard: "url(../assets/cute-fish.jpg)",
        smallfish: "url(../assets/small-fish.jpg)",
        community: "url(../assets/community-2.jpg)",
      },
      backgroundSize: {
        "50%": "50%",
        "85%": "85%",
      },
      colors: {
        fuchsia,
        sky,
        violet,
        cyan,
        orange,
        vulcan: {
          50: "#4e5359",
          100: "#42484e",
          200: "#363c43",
          300: "#2b3138",
          400: "#1f252d",
          500: "#131a22",
          600: "#121920",
          700: "#11171f",
          800: "#10161d",
          900: "#0f151b",
        },
        chetwode: "#7987d9",
        picton: "#28a8eb",
      },
      fontFamily: {
        sans: ["Exo Soft", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
