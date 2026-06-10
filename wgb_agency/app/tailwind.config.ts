import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7efe6", // warm cream — light section bg
        paper2: "#fbf6ef", // slightly lighter cream (cards)
        paperPink: "#f7e3da", // peachy tint — comparison section
        ink: "#0a0a0a", // near-black — dark sections / text
        inkSoft: "#141414",
        inkMut: "#6b6258", // muted brown-grey text on cream
        line: "#e4d8c9", // hairline borders on cream
        blue: "#1e18ff", // electric brand blue (CTAs, badges)
        blueBright: "#2b27ff", // brighter glow blue (swoosh)
        red: "#e74a1a", // orange-red ✕ marks
        cream: "#f7efe6", // text on dark
        creamMut: "#a59c8f",
      },
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      borderRadius: {
        card: "10px",
      },
      maxWidth: {
        shell: "1240px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
