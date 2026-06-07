# Motionfold — Reusable Animation Library Plan

> A publishable, framework-agnostic React animation library that generalizes the
> cinematic, scroll-driven motion built for the `oryzo/` demo (and the
> `wgb_agency` recordings) into reusable, brand-decoupled components.

**Package name:** `motionfold` (npm — verified available at time of writing; reserve it)
**Status:** PLAN ONLY — do not build yet.
**Primary consumer:** `/Users/andy/Documents/projects/TheChangeLab/change-engine`
(Next.js 14 App Router · React 19 · TypeScript · Tailwind 3.4 · **no framer-motion yet**)

---

## 1. Goals

- Extract the animation work from the `oryzo/` demo into reusable, **brand-decoupled** components (no Oryzo colors/fonts/Tailwind tokens).
- Generalize the `wgb_agency` recordings (`wgb_intro_animation.mov`, `oval_expansion_highlight_as_mouse_scrolls.mov`, `wgb.agency.mov`) into additional primitives.
- Ship as a **publishable npm package** that also works as a local `file:`/workspace dependency now.
- Be **Next 14 / React 19 / RSC-safe** and **Tailwind-agnostic**.

---

## 2. Compatibility constraints (confirmed against change-engine)

- React 19 + Next 14 App Router → every animated component/hook needs `"use client"`; SSR-safe rendering with a hydration guard.
- `framer-motion` is **not** installed there yet → ship it as a **peer dependency** (change-engine adds it).
- change-engine uses Tailwind, but Motionfold must **not** depend on it → style via props / inline style / CSS variables / className passthrough. Components are **headless/unstyled** by default.

---

## 3. Prior art & build-vs-fork decision

**Do NOT fork the animation engine.** Framer Motion (now distributed as `motion`,
`npm install motion`) is the de-facto engine. Build on top of it.

Landscape evaluated (2026):

| Project | Model | Engine | RSC-safe | License | Relevance |
|---|---|---|---|---|---|
| **react-kino** | npm **+** shadcn registry | own <1KB scroll core + React | ✅ SSR-safe | MIT | **Closest prior art.** Cinematic scroll storytelling: `Scene` (pinned), `Reveal`, `Parallax`, `TextReveal`, `CompareSlider`, `HorizontalScroll`, `VideoScroll`, `Progress`, `Marquee`, `StickyHeader`, `ScrollTransform`; hooks `useScrollProgress`/`useSceneProgress`/`useIsClient`. |
| Motion Primitives | copy-paste | Framer Motion | client-only | MIT | Lift/adapt individual component source. |
| Aceternity UI | copy-paste | Framer Motion (+Three.js) | client-only | MIT | Dramatic effects; adapt source w/ attribution. |
| Magic UI | copy-paste/CLI | Framer Motion | client-only | MIT | Micro-interactions; adapt source. |
| Animata | copy-paste | Framer Motion | mixed | MIT | 158+ components; adapt source. |
| react-bits | copy-paste CLI | CSS + opt GSAP/Three | partial | **MIT + Commons Clause** | ⚠️ Commons Clause restricts *selling* — avoid copying if Motionfold may be commercial. |
| USAL.js | npm (multi-framework) | WAAPI | ✅ | — | Alt engine approach; reference only. |
| react-scroll-media | npm | sticky/CSS | ✅ | — | Apple-style scroll image sequences; reference for `VideoScroll`. |

**Decision:**
1. **Engine:** depend on `motion`/`framer-motion` (peer). Optionally compose `lenis` (smooth scroll) and `embla-carousel`/`keen-slider` for slider internals instead of reinventing.
2. **Base:** **mirror `react-kino`'s proven API shape** (`Scene` / `Reveal` / `Parallax` / `useSceneProgress`) so Motionfold feels familiar and we don't re-derive scroll math. Either (a) **fork react-kino** and extend it with our distinctive components, or (b) keep Motionfold independent but API-compatible. _Recommended: independent + API-compatible_, to keep our headless/Tailwind-agnostic and recording-derived components first-class.
3. **Lift, don't fork (for sub-problems):** adapt component source from the MIT registries (Motion Primitives / Aceternity / Animata) with attribution where they already solve a piece well. Avoid react-bits sources (Commons Clause).
4. **Differentiation (Motionfold's edge):** recording-derived, **cinematic, brand-decoupled** components that the registries don't have — the vector-build intro, the big→small relocating headline, the fixed-frame slide-through slider, and the wgb oval-expansion-on-scroll highlight.

---

## 4. Packaging & layout

Standalone, publishable package (local `file:`/workspace now; `npm publish` later):

```
VidToCode/packages/motionfold/
  package.json        # peerDeps: react, react-dom, framer-motion; exports ESM+CJS+types
  tsup.config.ts      # dist/ (esm, cjs, .d.ts); preserve "use client" banner
  src/
    index.ts          # barrel
    tokens/           # easings, springs, durations, variants
    hooks/            # useReducedMotionFlag, useScrubbedProgress, useElementSize, useInViewOnce, useIsClient
    primitives/       # Reveal, StaggerGroup/Item, StickyScene
    components/        # higher-level animated components
    styles.css         # minimal, CSS-vars only (crop dashes, scroll cue)
  examples/           # Vite live gallery (not published)
  README.md
  PLAN.md             # (this doc, moved here when scaffolded)
```

- **Build:** `tsup` → dual ESM/CJS + `.d.ts`, tree-shakeable, per-component imports.
- **Optional:** also expose a **shadcn-style registry** later (matches the dominant 2026 distribution pattern) in addition to the npm package.

---

## 5. API surface

**tokens/** (debranded from oryzo `animations.ts`)
- Easings: `easeOutExpo`, `easeInExpo`, `easeInOut` · Spring: `springPop` · duration scale
- Variants: `fadeUp`, `fadeIn`, `scaleReveal`, `clipRevealLR`, `blurToSharp`, `staggerLines()`

**hooks/**
- `useReducedMotionFlag()` · `useScrubbedProgress(ref, offset)` · `useElementSize()` · `useInViewOnce()` · `useIsClient()`

**primitives/**
- `<Reveal variant>` · `<StaggerGroup>` + `<StaggerItem>` · `<StickyScene heightVh>` (pins a stage, exposes scrub progress to children)

**components/** (props-driven, unstyled)

| Motionfold component | Generalized from |
|---|---|
| `<TextReveal>` / `<KineticHeadline>` | blur-to-sharp + clip headline, WordmarkKinetic |
| `<ShrinkToAnchor>` | big→small relocating "it's wearable" headline |
| `<FramedSlider>` | fixed-frame slide-through picture slider |
| `<MagnifyCarousel>` | center-magnify scroll carousel (alt mode) |
| `<VectorBuildIntro>` | seed-circle → dashed-rings → conic-fill → reveal intro |
| `<GlowBorder>` | RainbowGlowBorder (configurable hue/colors) |
| `<CropFrame>` | DottedFrame (crop-box w/ handles) |
| `<ScrollCue>` | scroll indicator |
| `<ExpandingHighlight>` | **wgb** oval-expansion-on-scroll highlight |
| `<IntroCurtain>` | **wgb** intro animation |

Branded/content pieces (CorkDisc, MagazineCover, HUD, Oryzo nav) stay in the demo — not generalized.

---

## 6. wgb_agency generalization

Run the same frame-extraction + batched subagent analysis pipeline on all three
recordings, then distill:
- `wgb_intro_animation.mov` → `<IntroCurtain>`
- `oval_expansion_highlight_as_mouse_scrolls.mov` → `<ExpandingHighlight>` (scroll-driven expanding shape/highlight)
- `wgb.agency.mov` (full site) → harvest any additional reusable scroll patterns.

---

## 7. Integration into change-engine

- Add `framer-motion` (`motion`) to change-engine.
- Reference Motionfold via workspace/`file:` (or installed once published).
- Migration notes: wrap usage in client components; map your Tailwind theme into components via props / CSS variables (no token coupling).

---

## 8. Quality & docs

- `vitest` + React Testing Library smoke tests; assert reduced-motion fallbacks on every animated component.
- README with copy-paste examples; `examples/` Vite app as a live gallery.
- Semver; optional `changesets` for automated publishing.

---

## 9. Milestones

1. Scaffold package + tooling + tokens/hooks (compiles, importable).
2. Port debranded primitives + oryzo-derived components + examples gallery.
3. Analyze all 3 wgb_agency recordings → add `<IntroCurtain>`, `<ExpandingHighlight>`, extra patterns.
4. Wire into change-engine + tests + docs + (optional) publish / shadcn registry.

---

## 10. Open decisions / notes

- License: ship **MIT** (keeps it reusable across your projects; avoid Commons-Clause-encumbered sources).
- Confirm whether to also publish a shadcn registry alongside npm.
- Decide fork-react-kino vs independent-but-API-compatible at Phase 1 kickoff.
- Smooth-scroll dependency (`lenis`) optional — keep core dependency-light.
