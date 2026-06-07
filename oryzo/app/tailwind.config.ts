import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Exact brand palette extracted from the original oryzo.ai CSS custom properties.
        ink: "#100904", // --color-black (primary dark bg)
        inkDeep: "#000000", // --color-pure-black
        ink2: "#382416", // --color-brown
        paper: "#f6e0c6", // --color-green-lightest (warm cream section bg)
        paper2: "#ffedd6", // near-white cream
        paperWarm: "#ffedd7", // --color-white (cream)
        matGreen: "#445231", // --color-green (cutting-mat green)
        olive: "#4b5c3d",
        oliveCard: "#445231",
        greenLight: "#5d6c49", // --color-green-light
        wood: "#7A5230",
        cork: "#C9A36A",
        cork2: "#C58A4E",
        corkWarm: "#D98A3D",
        accent: "#dc5000", // --color-orange (brand accent)
        accentDeep: "#b34000",
        accentSoft: "#ff8c00",
        ember: "#e6500a",
        hud: "#2EE6C8",
        thermalMagenta: "#5A1840",
        thermalHot: "#FFD23F",
        cream: "#ffedd7", // --color-white (text on dark)
        creamMuted: "#bbac97",
        muted: "#6c5f51", // --color-grey-brown
        // Rainbow perimeter-glow stops (screen 03)
        glowPink: "#ff6b6b",
        glowMagenta: "#cd197d",
        glowPurple: "#8c019c",
        glowYellow: "#ffbf02",
        glowAmber: "#ffa000",
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"], // free stand-in for paid "Halyard Display"
        sans: ["Archivo", "system-ui", "sans-serif"], // body also Halyard on the original; Archivo matches
        serif: ["Literata", "Georgia", "serif"], // real font, editorial/magazine bits
        mono: ['"DM Mono"', "ui-monospace", "monospace"], // real font, captions/labels
      },
      fontWeight: {
        "400": "400",
        "500": "500",
        "600": "600",
        "700": "700",
        "800": "800",
        "900": "900",
      },
      borderRadius: {
        pill: "9999px",
        card: "8px",
        sm: "4px",
      },
      spacing: {
        section: "100vh",
        gutter: "2.5rem",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
