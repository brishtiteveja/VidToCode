import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#E8E2D9",
          light: "#F0EBE3",
        },
        floema: {
          dark: "#1A1A1A",
          urban: "#C44B2B",
          nature: "#7A8B3C",
          replastic: "#3A7D5C",
          golf: "#4A5D3A",
          details: "#8B8B8B",
          chat: "#F5D800",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Sora"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
