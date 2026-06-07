# ORYZO

A scroll-driven, satirical single-page marketing site for **Oryzo** — a fictional "AI-powered cork coaster" by the design studio **Lusion**. This is a faithful recreation of the UI *and behavior* of the original screen recording: animation-heavy, editorial, and entirely tongue-in-cheek.

> This entire site is a fictional creative project. Oryzo doesn't exist. No products are for sale. All claims are satirical and for entertainment purposes only.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (design tokens in `tailwind.config.ts`)
- react-router-dom (single `/` route — one-page scroll site)
- Framer Motion (all motion)
- Google Fonts: **Archivo** (display) + **Inter** (body)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build

## Notes on fidelity

The original site featured photographic 3D product renders (rotating cork discs, foil packets, thermal cups, exploding coasters). These are approximated here with layered CSS gradients, shadows, and Framer Motion transforms. Each approximation is flagged with a one-line code comment. Interactions (hover reactions, draggable arc control, horizontal carousels, scroll-linked kinetic type, newsletter submit, copy-URL) are implemented for real.
