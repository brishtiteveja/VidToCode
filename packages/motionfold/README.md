# Motionfold

Cinematic, scroll-driven, brand-decoupled React animation primitives and components — built on [Framer Motion](https://www.framer.com/motion/).

Motionfold extracts the motion language from real product recordings (the Oryzo and WGB demos) and generalizes it into reusable, headless building blocks you can drop into any React or Next.js App Router project.

> **Status:** `0.0.0` — tokens, hooks, primitives, and Oryzo-derived components. WGB-derived components (`ExpandingHighlight`, `IntroCurtain`) land in Phase 3.

## Install

```bash
npm install motionfold framer-motion
```

`react`, `react-dom`, and `framer-motion` are **peer dependencies** (React 18+/19, Framer Motion 11+).

## Compatibility

- React 18 and 19.
- Next.js 14 App Router. The package ships with a `"use client"` banner, so it can be imported directly into Server Components — the boundary is handled for you.
- Tailwind-agnostic. Nothing here requires Tailwind; styling is done via inline styles and your own `className`s.

## What's in 0.0.0

### Tokens

```ts
import {
  easings, durations,           // easeOutExpo, easeInExpo, ...
  springs, springPop,           // pop / soft / snappy
  fadeUp, fadeIn, scaleReveal,  // ready-made Framer variants
  clipRevealLR, blurToSharp,
  staggerContainer, inViewOnce,
} from "motionfold";
```

### Hooks

| Hook | Purpose |
| --- | --- |
| `useIsClient()` | SSR-safe "are we hydrated yet?" flag. |
| `useReducedMotionFlag()` | `true` when the user prefers reduced motion. |
| `useElementSize()` | `{ ref, size }` via `ResizeObserver`. |
| `useInViewOnce(opts)` | `[ref, inView]`, fires once at 30% visibility by default. |
| `useScrubbedProgress(opts)` | `{ ref, progress }` 0→1 MotionValue for scrollytelling. |

### Utils

`clamp`, `lerp`, `mapRange`.

### Primitives

| Primitive | Purpose |
| --- | --- |
| `<Reveal variant>` | Reveal children with a variant when scrolled into view. |
| `<StaggerGroup>` + `<StaggerItem>` | Staggered in-view entrance via variant propagation. |
| `<StickyScene heightVh>` | Pins a stage and exposes a `0→1` scrub `progress` to a render-prop child. |

### Components (headless, props-driven)

| Component | Generalized from |
| --- | --- |
| `<TextReveal>` | blur-to-sharp + clip headline (optional per-word stagger) |
| `<KineticHeadline>` | scroll-scaled, parallax-drifting wordmark |
| `<ShrinkToAnchor>` | big→small relocating headline |
| `<FramedSlider>` | fixed-frame slide-through picture slider |
| `<MagnifyCarousel>` | center-magnify scroll carousel |
| `<VectorBuildIntro>` | seed-circle → dashed-rings → conic-fill → reveal intro |
| `<GlowBorder>` | rotating conic-gradient perimeter glow |
| `<CropFrame>` | dashed crop box with corner handles |
| `<ScrollCue>` | bobbing scroll indicator |

All components are **unstyled and brand-decoupled**: colors come from props (with neutral defaults), sizing from `className`/`style`, and every animated component renders a settled, static fallback under `prefers-reduced-motion`.

## Example

```tsx
"use client";
import { Reveal, ShrinkToAnchor, FramedSlider } from "motionfold";

export function Showcase() {
  return (
    <>
      <Reveal>
        <h2>Hello, motion.</h2>
      </Reveal>

      <ShrinkToAnchor eyebrow="SO PORTABLE," headline="it's wearable" />

      <FramedSlider
        eyebrow="LOOKBOOK"
        title="In the wild"
        slides={[
          { key: "a", content: <img src="/a.jpg" alt="" /> },
          { key: "b", content: <img src="/b.jpg" alt="" /> },
        ]}
      />
    </>
  );
}
```

## Development

```bash
npm install      # install dev tooling + peers
npm run build    # bundle ESM + CJS + types via tsup
npm run typecheck
```

### Live examples gallery

A Vite gallery that demos every primitive and component (aliased to live `src/`, so edits hot-reload):

```bash
cd examples
npm install
npm run dev      # http://localhost:5180
```

## License

MIT
