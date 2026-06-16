---
name: vector-illustrations
description: Use when creating SVG illustrations, icons, decorative graphics, or hero background images for apps or websites — generates geometric flat-vector art in a bold editorial style (Imprint/Notion/Headspace aesthetic). Supports three formats — icon (200×200), mobile-hero (390×844), desktop-hero (1440×900). Output as HTML preview files, React Native SVG components, or web SVG/CSS backgrounds. Trigger on "create illustration", "make an icon", "design graphics", "SVG art", "geometric illustration", "hero image", "background image", or when building onboarding/marketing/course visuals.
---

# Vector Illustrations

Generate geometric flat-vector SVG art with a bold, editorial aesthetic. Supports three formats:

| Format | ViewBox | Background | Elements | Use Case |
|--------|---------|------------|----------|----------|
| **icon** | 200×200 | Circle (r=88) | 8-20 | Cards, badges, empty states |
| **mobile-hero** | 390×844 | Full rectangle | 20-50 | App hero sections, onboarding screens |
| **desktop-hero** | 1440×900 | Full rectangle | 30-80 | Website hero banners, landing pages |

All formats share the same color palette and flat geometric style. Output as HTML preview files for approval, then optionally convert to React Native SVG components or web-ready assets.

## When to Use

- Building onboarding screens, course cards, achievement badges, empty states
- Need consistent illustration set across an app
- Want Imprint/Notion/Headspace-style geometric art
- Creating subject/topic icons for edtech, health, finance apps
- Need culturally-specific illustrations (Bangladeshi, Indian, etc.)
- **Hero backgrounds** for app or website landing pages
- **Mobile splash screens** or full-bleed onboarding visuals
- **Desktop banners** for marketing pages, dashboards, or above-the-fold sections

## Style Rules (Non-Negotiable)

### All Formats
1. **Flat geometric vector** — hard-edged shapes only. No gradients, no realistic detail, no outlines on filled shapes (strokes OK for decorative lines)
2. **Bold, confident shapes** — substantial, not thin or delicate. Minimum stroke-width of 2 for visible strokes
3. **Abstract/stylized** — represent concepts through geometric metaphor, not literal depiction

### Icon Format (200×200)
4. **Circle background** — every icon starts with `<circle cx="100" cy="100" r="88" fill="..."/>` as the canvas
5. **3-5 colors** from the palette below. Pick a dominant bg color + 2-3 accent colors
6. **8-20 SVG elements** — visually rich, not cluttered
7. **No text** — unless the concept requires it (alphabet, math symbols). Max 1-3 characters

### Mobile Hero Format (390×844)
4. **Full rectangle background** — `<rect width="390" height="844" fill="..."/>` as canvas. No circle constraint
5. **3-6 colors** from palette. Use a dominant bg + layered shapes to create depth zones (top/middle/bottom)
6. **20-50 SVG elements** — more visual space demands more elements to avoid emptiness
7. **Vertical composition** — design flows top-to-bottom. Place primary visual in upper 60%, leave breathing room at bottom for text/CTA overlay
8. **Safe zones** — keep main content within x:30–360, y:60–780 (inset from edges for notch/home indicator)
9. **Text OK** — short headlines (1-4 words) in bold geometric style at most. Text should be part of the composition, not a label

### Desktop Hero Format (1440×900)
4. **Full rectangle background** — `<rect width="1440" height="900" fill="..."/>` as canvas
5. **4-7 colors** from palette. More space = more color variety allowed
6. **30-80 SVG elements** — fill the wide canvas with layered geometric scenes
7. **Horizontal composition** — design reads left-to-right or uses a central focal point with radiating elements
8. **Content zones** — left 40% or center for primary visual, right side or edges for decorative elements. Leave clear space where text/UI will overlay (typically left-center)
9. **Edge treatment** — elements should bleed to or extend beyond edges. Avoid "floating island" look where all shapes cluster in the center with empty edges
10. **Parallax-ready** — optionally group elements into 2-3 depth layers (`data-layer="bg|mid|fg"`) for CSS/JS parallax effects

## Color Palette

Pick colors by role, not randomly:

| Name | Hex | Use For |
|------|-----|---------|
| Navy | `#1A1A3E` | Dark backgrounds, tech/space themes |
| Teal | `#1B7A5A` | Science, nature, growth, success |
| Dark Green | `#2D6B4F` | Biology, environment, earth |
| BD Green | `#006A4E` | Bangladeshi/cultural themes |
| Coral | `#E85D4A` | Energy, urgency, errors, highlights |
| Gold | `#F4C542` | Achievement, warmth, math, light |
| Sky Blue | `#4A9FE8` | Technology, water, calm, info |
| Purple | `#7C5CBF` | Creativity, language, arts |
| Orange | `#E8924A` | Warmth, community, practice |
| Pink | `#F2A7B3` | Wellness, writing, soft |
| Mint | `#A8E6CF` | Fresh, beginner, nature accents |
| Off-white | `#F5F0EB` | Shapes on dark backgrounds |
| Warm Gray | `#D4C5B5` | Neutral elements, bases, frames |
| BD Red | `#F42A41` | Bangladesh flag, cultural accents |
| Indigo | `#6366F1` | AI, technology, brand accents |

## Composition Patterns

### Icon — Basic Structure
```
Circle bg → Primary shape(s) → Detail elements → Accent dots/sparkles
```

### Icon — Common Motifs
- **Overlapping shapes** — triangle + circle + square for math/abstract
- **Concentric rings** — orbits, targets, focus
- **Stacked bars** — progress, charts, growth
- **Connected nodes** — networks, molecules, neural
- **Silhouettes** — people, buildings, cultural landmarks
- **Floating particles** — sparkles, confetti, knowledge bits

### Icon — Sparkle/Accent Pattern
Add 2-4 small accent elements outside the main composition:
```svg
<!-- Cross sparkle -->
<rect x="42" y="56" width="3" height="12" rx="1" fill="#F4C542" opacity="0.6"/>
<rect x="37" y="61" width="12" height="3" rx="1" fill="#F4C542" opacity="0.6"/>
<!-- Dot accents -->
<circle cx="155" cy="50" r="4" fill="#F4C542" opacity="0.5"/>
<circle cx="45" cy="155" r="3" fill="#1B7A5A" opacity="0.4"/>
```

### Mobile Hero — Composition Patterns
```
Full bg rect → Layered depth bands (2-3) → Primary focal element → Scattered accents → Edge bleeds
```

**Layered depth bands** — Stack 2-3 large organic shapes (rounded rects, ellipses, or paths) at different opacities to create a sense of atmospheric depth. Background band at 0.1–0.2 opacity, midground at 0.4–0.6, foreground elements at full opacity.

**Common layouts:**
- **Centered radial** — large circular/diamond focal shape at y:250–400, radiating geometric elements outward
- **Cascading stack** — overlapping rectangular/rounded shapes flowing downward like cards
- **Landscape scene** — abstract terrain at bottom third, sky/space above with floating elements
- **Diagonal split** — bold diagonal line dividing two color zones with elements on both sides

**Scattered accents for heroes** — use more (6-12) and larger accent elements than icons:
```svg
<!-- Large decorative dots -->
<circle cx="45" cy="120" r="12" fill="#F4C542" opacity="0.3"/>
<circle cx="340" cy="300" r="18" fill="#E85D4A" opacity="0.2"/>
<!-- Geometric lines -->
<line x1="280" y1="50" x2="350" y2="130" stroke="#A8E6CF" stroke-width="2" opacity="0.4"/>
<!-- Cross sparkles (bigger) -->
<rect x="60" y="700" width="4" height="20" rx="2" fill="#F4C542" opacity="0.5"/>
<rect x="52" y="708" width="20" height="4" rx="2" fill="#F4C542" opacity="0.5"/>
```

### Desktop Hero — Composition Patterns
```
Full bg rect → Wide atmospheric layer → Scene elements (left/center weighted) → Decorative edge extensions → Floating accents
```

**Wide compositions work differently than tall or square ones.** Key patterns:

- **Horizon scene** — abstract landscape: geometric "mountains" or "buildings" along bottom third, sky above with scattered geometric clouds/stars. Good for SaaS, edtech, dashboards
- **Left-weighted focal** — primary illustration anchored left-center (~x:200–700), decorative elements trailing right. Good for hero sections with right-aligned text
- **Symmetric cathedral** — mirror geometric patterns from center axis outward. Bold, impressive. Good for landing pages
- **Scattered constellation** — elements distributed across full width at varying sizes/opacities. No single focal point. Good for abstract/tech themes
- **Wave/band layers** — 3-5 horizontal or diagonal color bands creating a layered paper-cut effect

**Edge treatment examples:**
```svg
<!-- Shape bleeding off left edge -->
<circle cx="-30" cy="450" r="200" fill="#1B7A5A" opacity="0.15"/>
<!-- Shape bleeding off right edge -->
<rect x="1350" y="100" width="200" height="400" rx="40" fill="#7C5CBF" opacity="0.1"/>
<!-- Shape bleeding off bottom -->
<ellipse cx="720" cy="940" rx="500" ry="120" fill="#1A1A3E" opacity="0.2"/>
```

**Parallax layer grouping (optional):**
```svg
<g data-layer="bg"><!-- Slow-moving background elements --></g>
<g data-layer="mid"><!-- Mid-speed elements --></g>
<g data-layer="fg"><!-- Fast foreground elements --></g>
```

## Workflow

### Step 1: Gather Requirements

Ask the user:
1. **Concepts** — what topics/ideas need illustrations? (e.g., "8 school subjects + 6 achievements")
2. **Format** — icon (200×200), mobile-hero (390×844), or desktop-hero (1440×900)?
3. **Cultural context** — any cultural elements to include? (e.g., Bangladeshi, Japanese)
4. **Output format** — HTML preview only, React Native SVG components, or web-ready SVG/CSS?
5. **Card/page background** — for icons: dark cards, light cards, or both? For heroes: what color is the page around them?
6. **Overlay text?** — for heroes: will text/CTAs overlay the image? If so, where? (affects where to leave clear space)

### Step 2: Generate HTML Previews

Create one HTML file per illustration at `<output-dir>/NN-name.html`. Each shows the illustration on dark and light card backgrounds for comparison.

**HTML template:**
```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NN — Name (LocalName)</title>
<style>
  body{font-family:-apple-system,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0F0F0F;color:#fff}
  h2{margin-bottom:4px;font-size:22px}
  .local{color:#888;margin-bottom:30px;font-size:16px}
  .cards{display:flex;gap:24px;flex-wrap:wrap;justify-content:center;margin-bottom:30px}
  .card{border-radius:20px;padding:28px;display:flex;align-items:center;justify-content:center;width:200px;height:200px}
  .dark{background:#1A1A2E}.light{background:#F5F0EB}
  .label{text-align:center;font-size:12px;color:#666;margin-top:8px}
  .desc{color:#666;font-size:13px;max-width:500px;text-align:center;line-height:1.6}
  .nav{display:flex;gap:12px;margin-top:20px}
  .nav a{color:#6366F1;text-decoration:none;font-size:14px}
</style></head><body>
<h2>NN — Name</h2>
<p class="local">LocalizedName</p>
<div class="cards">
  <div><div class="card dark">
    <svg width="160" height="160" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- ILLUSTRATION SVG HERE -->
    </svg>
  </div><p class="label">Dark card</p></div>
  <div><div class="card light">
    <!-- SAME SVG DUPLICATED -->
  </div><p class="label">Light card</p></div>
</div>
<p class="desc"><strong style="color:#aaa">Elements:</strong> Description of shapes and colors used.</p>
<div class="nav">
  <a href="NN-prev.html">← Prev</a>
  <a href="NN-next.html">Next →</a>
</div>
</body></html>
```

**Mobile hero HTML template:**
```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NN — Name (mobile hero)</title>
<style>
  body{font-family:-apple-system,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0F0F0F;color:#fff}
  h2{margin-bottom:4px;font-size:22px}
  .sub{color:#888;margin-bottom:24px;font-size:14px}
  .preview{display:flex;gap:32px;flex-wrap:wrap;justify-content:center;margin-bottom:24px}
  .frame{border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.4)}
  .frame svg{display:block}
  .phone-frame{width:195px;height:422px}.phone-frame svg{width:195px;height:422px}
  .full-frame{width:390px;height:844px}
  .label{text-align:center;font-size:12px;color:#666;margin-top:8px}
  .desc{color:#666;font-size:13px;max-width:600px;text-align:center;line-height:1.6}
  .nav{display:flex;gap:12px;margin-top:20px}
  .nav a{color:#6366F1;text-decoration:none;font-size:14px}
</style></head><body>
<h2>NN — Name</h2>
<p class="sub">Mobile Hero · 390×844</p>
<div class="preview">
  <div><div class="frame phone-frame">
    <svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- ILLUSTRATION SVG HERE -->
    </svg>
  </div><p class="label">50% scale</p></div>
  <div><div class="frame full-frame">
    <!-- SAME SVG AT FULL SIZE -->
  </div><p class="label">100% scale</p></div>
</div>
<p class="desc"><strong style="color:#aaa">Elements:</strong> Description of shapes and colors used.</p>
<div class="nav">
  <a href="NN-prev.html">← Prev</a>
  <a href="NN-next.html">Next →</a>
</div>
</body></html>
```

**Desktop hero HTML template:**
```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NN — Name (desktop hero)</title>
<style>
  body{font-family:-apple-system,sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;margin:0;background:#0F0F0F;color:#fff;padding:40px 20px}
  h2{margin-bottom:4px;font-size:22px}
  .sub{color:#888;margin-bottom:24px;font-size:14px}
  .preview{display:flex;flex-direction:column;gap:24px;align-items:center;margin-bottom:24px;width:100%;max-width:1480px}
  .frame{border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.4);width:100%}
  .frame svg{display:block;width:100%;height:auto}
  .half-frame{max-width:720px}
  .full-frame{max-width:1440px}
  .label{text-align:center;font-size:12px;color:#666;margin-top:8px}
  .desc{color:#666;font-size:13px;max-width:700px;text-align:center;line-height:1.6}
  .overlay-demo{position:relative;max-width:1440px;width:100%}
  .overlay-demo svg{display:block;width:100%;height:auto;border-radius:12px}
  .overlay-text{position:absolute;top:50%;left:8%;transform:translateY(-50%);color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.3)}
  .overlay-text h3{font-size:clamp(24px,3vw,48px);margin:0 0 8px}
  .overlay-text p{font-size:clamp(12px,1.2vw,18px);opacity:0.8;margin:0}
  .nav{display:flex;gap:12px;margin-top:20px}
  .nav a{color:#6366F1;text-decoration:none;font-size:14px}
</style></head><body>
<h2>NN — Name</h2>
<p class="sub">Desktop Hero · 1440×900</p>
<div class="preview">
  <div><div class="frame half-frame">
    <svg width="1440" height="900" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- ILLUSTRATION SVG HERE -->
    </svg>
  </div><p class="label">50% scale</p></div>
  <div class="overlay-demo">
    <!-- SAME SVG -->
    <div class="overlay-text">
      <h3>Sample Headline Here</h3>
      <p>Preview of text overlay positioning</p>
    </div>
  </div>
  <p class="label">With text overlay demo</p>
</div>
<p class="desc"><strong style="color:#aaa">Elements:</strong> Description of shapes and colors used.</p>
<div class="nav">
  <a href="NN-prev.html">← Prev</a>
  <a href="NN-next.html">Next →</a>
</div>
</body></html>
```

Serve previews with `python3 -m http.server <port>` so the user can browse and approve.

### Step 3: Get Approval

Show user each illustration. They approve, request tweaks, or reject. Only proceed to code conversion after approval.

### Step 4: Convert to React Native SVG (Optional)

Convert approved HTML SVGs to React Native components:

**Conversion rules:**
| HTML SVG | React Native SVG |
|----------|-----------------|
| `<svg>` | `<Svg>` from `react-native-svg` |
| `<circle>` | `<Circle>` |
| `<rect>` | `<Rect>` |
| `<path>` | `<Path>` |
| `<line>` | `<Line>` |
| `<ellipse>` | `<Ellipse>` |
| `<polygon>` | `<Polygon>` |
| `<g>` | `<G>` |
| `<text>` | `<SvgText>` (import as `Text as SvgText`) |
| `stroke-width` | `strokeWidth` |
| `stroke-linecap` | `strokeLinecap` |
| `stroke-linejoin` | `strokeLinejoin` |
| `text-anchor` | `textAnchor` |
| `font-size` | `fontSize` |
| `font-weight` | `fontWeight` |
| `font-family` | `fontFamily` |
| `fill-opacity` | `fillOpacity` |
| `stroke-dasharray` | `strokeDasharray` |
| `opacity="0.5"` | `opacity={0.5}` (number, not string) |
| `xmlns="..."` | remove entirely |

**Component pattern:**
```tsx
import React from 'react';
import { Svg, Circle, Rect, Path, Line, Polygon, Ellipse, Text as SvgText } from 'react-native-svg';

interface Props {
  size?: number;
}

export function MathIllustration({ size = 160 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="88" fill="#1A1A3E" />
      {/* ... converted shapes ... */}
    </Svg>
  );
}
```

Create barrel `index.ts` exporting all components.

### Step 5: Convert to Web-Ready Assets (Optional — Heroes)

For hero format illustrations, convert to web-ready assets:

**Option A: Inline SVG React component (Vite/Next.js/CRA)**
```tsx
interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function HeroBackground({ className, style }: Props) {
  return (
    <svg
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: 'auto', ...style }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ... SVG elements ... */}
    </svg>
  );
}
```

**Option B: CSS background with SVG data URI**
```css
.hero {
  background-image: url("data:image/svg+xml,...");
  background-size: cover;
  background-position: center;
}
```
Encode the SVG (URL-encode `#` → `%23`, `"` → `'` inside the data URI). Good for static backgrounds where interactivity/parallax not needed.

**Option C: Parallax-ready layers (separate SVGs per depth layer)**
```tsx
export function HeroParallax() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <HeroLayerBg className="absolute inset-0 scale-110" style={{ transform: 'translateY(var(--parallax-bg))' }} />
      <HeroLayerMid className="absolute inset-0 scale-105" style={{ transform: 'translateY(var(--parallax-mid))' }} />
      <HeroLayerFg className="absolute inset-0" style={{ transform: 'translateY(var(--parallax-fg))' }} />
    </div>
  );
}
```
Split the SVG into separate components by `data-layer` groups. Wire up scroll transforms via CSS custom properties or Framer Motion.

## Cultural Customization

### Bangladeshi Elements
- **Shaheed Minar** — 3 geometric pillars (center tall, sides angled) on a platform
- **Bangladesh flag** — green `#006A4E` bg + red `#F42A41` circle
- **Alpona patterns** — decorative dot/curve patterns (floor art tradition)
- **Bangla script** — অ আ ক for alphabet, Bangla numerals ১২৩৪৫ for numbers
- **Rickshaw** — colorful geometric rickshaw with decorated hood
- **Shapla** — water lily (national flower), layered ellipse petals
- **Padma Bridge** — geometric truss structure over water
- **Sundarbans** — mangrove trees with aerial roots + Royal Bengal Tiger
- **Pohela Boishakh** — sun with 8 rays, dhol drum, Mangal Shobhajatra owl mask
- **Greetings** — "আসসালামু আলাইকুম", "নমস্কার!", "Hello!"
- **Day names** — শ, র, সো, ম, বু, বৃ, শু

### Adding Other Cultures
Follow the same pattern: identify 8-12 iconic visual symbols, map each to geometric shapes using palette colors. Keep shapes abstract enough to read at 48px.

## Batch Creation Strategy

For large sets (20+), organize by category and create in parallel batches:

**Icons:**

| Category | Examples |
|----------|----------|
| **Subjects** | Math, Physics, Chemistry, Biology, English, Language, CS, GK |
| **Features** | AI Tutor, Practice, Quiz, Flashcards, Progress, Streak |
| **Achievements** | Trophy, Crown, Level Up, Certificate, Graduation, Star |
| **Onboarding** | Welcome, Choose Path, Set Goal, Personalize, Rocket, Ready |
| **App States** | Empty, Error/Offline, Loading, Celebration, Encouragement |
| **Cultural** | National symbols, holidays, landmarks, traditional art |

Create 6-8 per batch. Get approval per batch before continuing.

**Heroes (mobile/desktop):**

| Category | Examples |
|----------|----------|
| **Landing pages** | Product hero, pricing bg, features section, testimonials bg |
| **App screens** | Login/signup bg, onboarding slides, dashboard header |
| **Marketing** | Launch announcement, newsletter header, social banner |
| **Sections** | About, contact, 404, maintenance, coming soon |
| **Seasonal** | Holiday, event, campaign-specific backgrounds |

Create 2-4 hero images per batch (they're more complex). Get approval per batch.

## Common Mistakes

### All Formats

| Mistake | Fix |
|---------|-----|
| Too many colors | Icons: 3-5. Mobile hero: 3-6. Desktop hero: 4-7. Stick to palette |
| Thin/delicate shapes | Make shapes bold — minimum 4px wide for filled, 2px stroke |
| Literal/realistic depiction | Abstract it — a beaker shape, not a photorealistic flask |
| Forgetting opacity | Use opacity={0.3-0.6} on accent elements for depth |
| All same bg color | Vary bg colors across a set so cards/pages look distinct |

### Icon-Specific

| Mistake | Fix |
|---------|-----|
| No circle background | Every icon starts with the r=88 circle canvas |
| Text-heavy | Max 1-3 characters. Let shapes tell the story |
| No sparkle accents | Add 2-4 small dots/crosses outside main composition |

### Hero-Specific

| Mistake | Fix |
|---------|-----|
| Empty/sparse canvas | Heroes need more elements. Fill the space — 20-50 (mobile), 30-80 (desktop) |
| All shapes centered | Use edge bleeds. Shapes should extend beyond canvas edges for immersive feel |
| Ignoring text overlay zones | Leave clear/low-contrast areas where text will sit. Mark with comments |
| Flat depth (no layers) | Use 2-3 opacity levels to create atmospheric depth. Background shapes at 0.1-0.2, midground 0.4-0.6, foreground at full |
| Same-size elements | Vary element sizes dramatically (8px dots to 300px shapes) for visual hierarchy |
| Square composition on wide canvas | Desktop heroes are 1.6:1. Use horizontal flow, not square focal points |
| No `preserveAspectRatio` | Use `xMidYMid slice` for hero SVGs that need to cover varying viewport sizes |
