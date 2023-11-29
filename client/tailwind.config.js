/** @type {import('tailwindcss').Config} */

export const content = ["./src/**/*.{js,jsx,ts,tsx}",
  "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  colors: {
    "dim-gray": "#646464",
    "battleship-gray": "#999999",
    "air-force-blue": "#5382A1",
    sage: "#A9B07C",
    "carrot-orange": "#F89820",
    mustard: "#FFDE57",
    white: "#FFFFFF",
    black: "#000000"
  },
  fontFamily: {
    cal: ['"Cal Sans"', "sans-serif"],
    sans: ['"Inter var"', "serif"],
    mono: ["Roboto Mono", "monospace"],
  },
  extend: {
    spacing: {
      128: "32rem",
      144: "36rem",
    },
    borderRadius: {
      "4xl": "2rem",
    },
  },
};
export const plugins = [require('flowbite/plugin')];