/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        paperwarm: "#F3F1EA",
        card: "#FFFFFF",
        ink: "#1B211D",
        inksoft: "#5C655F",
        inkfaint: "#8B9289",
        line: "#DEDCD2",
        deep: "#122019",
        gold: "#9C7A2E",
        goldsoft: "#F1E8D3",
        forest: "#2F5D48",
        clay: "#8B4A3B",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        portrait: "14px 14px 0 0 #F1E8D3",
        "portrait-sm": "10px 10px 0 0 #F1E8D3",
      },
    },
  },
  plugins: [],
};