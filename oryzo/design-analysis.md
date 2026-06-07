# Design analysis — oryzo.ai

- **Source video:** `Recordings/oryzo.ai.mov` (69.9s, 1280×760, 60fps)
- **Frames:** 70 extracted at 1 fps → `frames/frame_00001.png … frame_00070.png`
- **Run:** `video-to-ui-1780813924`
- **What it is:** A scroll-driven, satirical product marketing site for "Oryzo" — a fictional "AI-powered cork coaster" by the design studio **Lusion**. Animation-heavy: 3D product rotation, kinetic typography, horizontal carousels, parallax, split-reveal seams, rainbow perimeter glow, motion blur. The whole site is a creative/comedy piece (explicit disclaimer in the footer).

---

## Artifact 1 — Design system observed

### Palette
The site is sectioned into themed "acts," but a consistent core palette runs throughout:

- **Backgrounds (dark, warm):** `#1A120B`, `#1A0F08`, `#0D0A07`, `#0C0907` (near-black warm browns)
- **Paper / cream sections:** `#F5E3CF`, `#F3E4CF`, `#F3EAD9`
- **Cutting-mat green (hero):** `#3FAE8E` (bright) / `#2E3A24` (deep olive)
- **Wood / desk surface:** `#7A5230`, `#B8915E`
- **Cork (product):** `#C9A36A`, `#C58A4E`, `#D98A3D`
- **Primary accent — orange/terracotta:** `#E8631A`, `#C43B15`, `#E8623A`, `#FF7A1A` (links, highlights, CTAs, panels)
- **HUD cyan (wearable section only):** `#2EE6C8`
- **Thermal section:** magenta `#5A1840`, hot `#FFD23F`
- **Text:** cream `#F2ECE4` / `#F3E4CF` on dark; near-black `#16120C` on cream
- **Muted text:** `#8A7A6A`, `#A89C8C`

### Type
- **Display:** very heavy geometric/extended grotesque sans. Used at massive sizes (≈110–280px). Mixes **uppercase** section labels ("ISN'T JUST A COASTER.", "ORYZO-1") and **lowercase** kinetic headlines ("it's wearable", "sustainability"). Closest free match: **Archivo / Archivo Black** (or Anton for the heaviest weights).
- **Body / UI:** clean grotesque, ~14–16px regular. Closest free match: **Inter**.
- **Eyebrows / labels:** ~11–14px, uppercase, letter-spaced, bold.
- **Footnotes / overlays:** small caps, often satirical ("* ADOBE ILLUSTRATOR", math notation).

### Spacing & layout
- Full-bleed, edge-to-edge sections; one viewport-height "scene" per scroll beat.
- Fixed top nav: wordmark left, `INTRO · FEATURES · PRODUCT · CONTACT` right; active item underlined.
- Faux browser chrome bar at the very top (`oryzo.ai/`, `Ask Chat` pill) — part of the recording's framing.
- Feature sections: left text column (eyebrow + body + footer headline) over a full-bleed photographic render.

### Radii, surfaces, motifs
- **Sharp (0px)** corners for editorial/full-bleed type and image panels.
- **Fully-rounded pills** for buttons (`DECODE MESSAGE`, `Refill`, `SEND`, `PAPER`, `MODEL (.OBJ)`).
- **Cards** ~6–8px radius (facts grid, HUD card).
- **Signature design-tool aesthetic:** dotted construction circles, crop-box selection frames with corner handles, orange square node/Bézier handles — as if the product is being designed live in Illustrator/Figma.
- Photographic 3D product renders (cork disc, foil packet, desk props).
- Math/ML notation overlays played for laughs (`pᵢ(T)=e^(zᵢ/T)/Σe^(zⱼ/T)`, `C = πA/P²`, "RoPE: Roundness Optimization & Perimeter Engineering").
- Circular outline icon badges on feature sections.
- Star-rating glyphs in reviews.

### Animation language
- Scroll-driven 3D product **rotation** (disc face → edge-on → back).
- **Kinetic type:** giant headlines scale up / clip / reveal letter-by-letter.
- **Horizontal carousels** (product gallery, "Always On" panels).
- **Parallax** zoom on photographic backgrounds.
- **Split-reveal** seam (cork bark slides apart).
- **Rainbow perimeter glow** rotating around the viewport ("TRY TO HOVER HAND").
- **Motion blur** on "Powered by AI".
- **Fade in/out** of headline + body copy per scene.
- Footer **coffee-bean** particle drift.
- Timing reads as smooth, eased (≈300–600ms), continuous scroll-linked rather than discrete.

---

## Artifact 2 — Screen inventory (chronological)

| # | Screen | Frames | Role |
|---|--------|--------|------|
| 01 | Hero — cutting-mat landing | 001–010 | Wordmark + "MADE FOR MUGS. BUILT FOR TABLES.", cork coaster on green cutting mat |
| 02 | "Isn't Just a Coaster" | 011–019 | 3D rotating disc, "ISN'T JUST / A COASTER.", "result of unprecedented AI* breakthroughs" |
| 03 | "Powered by AI" + hover hint | 020–026 | Hand holding cork puck, rainbow glow border, "TRY TO HOVER HAND" |
| 04 | "SO PORTABLE / it's wearable" | 027–034 | Red foil packet unwraps to reveal cork disc; massive kinetic headline |
| 05 | Wearable demo + cyan HUD | 035–036 | Person wearing disc; glassy cyan HUD card ("3", "112 bpm", "Refill") |
| 06 | Product gallery carousel | 037–040 | Lookbook tiles, "RISE" magazine cover, satirical editorial copy |
| 07 | Feature: Coffee Lift | 042–043 | "ELEVATE YOUR COFFEE EXPERIENCE", "Constant lift via geometry", `Δh ≈ t` |
| 08 | Feature: Thermodynamic Stability | 044–046 | Thermal heatmap render, softmax-temperature joke scale |
| 09 | Feature: Circularity blueprint | 047–048 | da Vinci-style sketch, "NOW 37.9% MORE CIRCULAR", `C = πA/P²` |
| 10 | Giant ORYZO wordmark (kinetic) | 049–050 | Oversized low-contrast wordmark with construction circles |
| 11 | Smart Flip Encryption | 051–052 | "SECURE COMMUNICATIONS SIMPLIFIED", "DECODE MESSAGE" pill |
| 12 | Grip-Locked Antislip | 053–054 | Cream-on-black, friction-coefficient card, draggable arc control |
| 13 | Cork bark split-scroll | 055–056 | Macro bark texture splitting along a torn seam |
| 14 | Sustainability (typographic) | 057 | Cream, giant lowercase "sustainability", palm shadow, vegan joke |
| 15 | Facts grid (3 cards) | 058 | Cork-harvest facts; "No compute. No tokens." thank-you pills |
| 16 | Reviews intro | 059 | Glowing cork bowl, "RATING & REVIEWS", 4.9/5 |
| 17 | Reviews list | 060 | Testimonial rows (Edan K., Gol D. Roger, Jamie R.) with media thumbs |
| 18 | "Always On" horizontal gallery | 061–062 | Horizontal panel carousel, "24/7 UPTIME. NO POWER REQUIRED." |
| 19 | Runs on RTX 3090 | 063 | Orange panel, "NO MORE OOM ON ANY CONSUMER GPUS" |
| 20 | Drop-Tested | 064 | "PERFECT BY DESIGN", test-conditions metadata |
| 21 | Legacy Support | 065 | Ancient vessels on coasters, "SINCE THE 5TH MILLENNIUM BCE" |
| 22 | ORYZO-1 model / paper | 066 | "OUR SOTA OPEN WEIGHT MODEL", PAPER / MODEL (.OBJ) / CODE pills, abstract |
| 23 | Contact / footer | 067–070 | "WE CAUGHT YOUR ATTENTION WITH A NON-EXISTENT PRODUCT.", newsletter, Lusion links, satire disclaimer |

> Note: This is a single-page scroll experience, not a multi-route app. The scaffold renders these as stacked full-viewport sections in order (one component per screen), with a fixed nav whose four links (`INTRO/FEATURES/PRODUCT/CONTACT`) jump-scroll to anchors. Heavy 3D renders are approximated with CSS/Framer Motion stand-ins and labeled placeholders.
