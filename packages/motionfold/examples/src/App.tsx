import { useState } from "react";
import { useTransform, motion } from "framer-motion";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  StickyScene,
  TextReveal,
  KineticHeadline,
  ShrinkToAnchor,
  FramedSlider,
  MagnifyCarousel,
  VectorBuildIntro,
  ExpandingHighlight,
  IntroCurtain,
  GlowBorder,
  CropFrame,
  ScrollCue,
  ParallaxField,
  ParallaxSection,
  SectionStack,
  DepthTunnel,
  FunnelEntrance,
  useSectionTheme,
} from "motionfold";
import type { ParallaxFieldItem, ProgressLineVariant, DepthTunnelItem, FunnelEntranceItem } from "motionfold";
import { Demo, SampleCard, makeSlides } from "./sample";

const sceneBg = { background: "linear-gradient(180deg, #141210, #0b0a09)" };

export function App() {
  const [introKey, setIntroKey] = useState(0);
  const [curtainKey, setCurtainKey] = useState(0);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          Motionfold
          <small>Examples</small>
        </div>
        <nav className="nav">
          <span className="group">Intro</span>
          <a href="#vector-build">VectorBuildIntro</a>
          <span className="group">Primitives</span>
          <a href="#reveal">Reveal</a>
          <a href="#stagger">StaggerGroup</a>
          <a href="#sticky">StickyScene</a>
          <span className="group">Headlines</span>
          <a href="#text-reveal">TextReveal</a>
          <a href="#kinetic">KineticHeadline</a>
          <a href="#shrink">ShrinkToAnchor</a>
          <span className="group">Galleries</span>
          <a href="#framed">FramedSlider</a>
          <a href="#magnify">MagnifyCarousel</a>
          <span className="group">WGB</span>
          <a href="#expanding">ExpandingHighlight</a>
          <a href="#curtain">IntroCurtain</a>
          <span className="group">Floema</span>
          <a href="#depth-tunnel">DepthTunnel</a>
          <a href="#funnel-entrance">FunnelEntrance</a>
          <a href="#section-stack">SectionStack</a>
          <a href="#parallax-field">ParallaxField</a>
          <a href="#parallax-section">ParallaxSection</a>
          <a href="#masked-rise">TextReveal (masked-rise)</a>
          <a href="#section-theme">useSectionTheme</a>
          <span className="group">Surfaces</span>
          <a href="#glow">GlowBorder</a>
          <a href="#crop">CropFrame</a>
          <a href="#cue">ScrollCue</a>
        </nav>
      </aside>

      <main className="main">
        {/* ---- VectorBuildIntro ---- */}
        <Demo
          id="vector-build"
          kicker="Intro"
          title="VectorBuildIntro"
          desc="A vector-tool build (seed circle → dashed rings → conic fill → handles) plays over a flat cover, then lifts to reveal the content beneath."
        >
          <div className="stage">
            <VectorBuildIntro key={introKey}>
              <div className="hero-plate">
                <h1 className="hero-plate__word">FIELD</h1>
                <p className="hero-plate__sub">
                  Cinematic motion, lifted from real recordings and generalized.
                </p>
              </div>
            </VectorBuildIntro>
          </div>
          <button className="pill" style={{ marginTop: 18, border: "none", cursor: "pointer" }} onClick={() => setIntroKey((k) => k + 1)}>
            Replay intro
          </button>
        </Demo>

        {/* ---- Reveal ---- */}
        <Demo
          id="reveal"
          kicker="Primitive"
          title="Reveal"
          desc="Reveals children with a variant the moment they scroll into view. Defaults to fadeUp; pass any variant."
        >
          <div className="stage stage--tall">
            <Reveal>
              <h3 className="headline-xl">Now you see me.</h3>
            </Reveal>
          </div>
        </Demo>

        {/* ---- Stagger ---- */}
        <Demo
          id="stagger"
          kicker="Primitive"
          title="StaggerGroup / StaggerItem"
          desc="A container that staggers its children in via Framer variant propagation."
        >
          <div className="stage stage--tall">
            <StaggerGroup stagger={0.12} style={{ display: "grid", gap: 14 }}>
              {["Plan", "Shoot", "Cut", "Color", "Ship"].map((w) => (
                <StaggerItem key={w}>
                  <span className="headline-xl" style={{ fontSize: 36 }}>
                    {w}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Demo>

        {/* ---- StickyScene ---- */}
        <Demo
          id="sticky"
          kicker="Primitive"
          title="StickyScene"
          desc="Pins a stage for a tall scroll and hands a 0→1 progress MotionValue to its children. Scroll through this section to scrub it."
        >
          <StickyScene heightVh={200} style={sceneBg}>
            {(progress) => <StickyDemo progress={progress} />}
          </StickyScene>
        </Demo>

        {/* ---- TextReveal ---- */}
        <Demo
          id="text-reveal"
          kicker="Headline"
          title="TextReveal"
          desc="Blur-to-sharp + left→right clip wipe. Set splitWords to stagger each word with a kinetic, settling entrance."
        >
          <div className="stage stage--tall" style={{ flexDirection: "column", gap: 28 }}>
            <TextReveal className="headline-xl">Sharper than it looks.</TextReveal>
            <TextReveal className="headline-xl" splitWords effect="blur-clip">
              Word by word, into focus.
            </TextReveal>
          </div>
        </Demo>

        {/* ---- KineticHeadline ---- */}
        <Demo
          id="kinetic"
          kicker="Headline"
          title="KineticHeadline"
          desc="An oversized wordmark that scales up and parallax-drifts as it crosses the viewport. Scroll to feel it."
        >
          <div className="stage" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 460 }}>
            <KineticHeadline className="wordmark">FIELD</KineticHeadline>
          </div>
        </Demo>

        {/* ---- ShrinkToAnchor ---- */}
        <Demo
          id="shrink"
          kicker="Headline"
          title="ShrinkToAnchor"
          desc="The signature big→small relocating headline: a giant title that scrubs down in scale and rises into a small label as you scroll."
        >
          <ShrinkToAnchor
            eyebrow="SO PORTABLE,"
            headline={<span className="headline-xl">it&rsquo;s wearable</span>}
            heightVh={240}
            style={sceneBg}
          />
        </Demo>

        {/* ---- FramedSlider ---- */}
        <Demo
          id="framed"
          kicker="Gallery"
          title="FramedSlider"
          desc="A fixed dashed crop frame stays centered while full-size panels slide through it on scroll; dimmed thumbnails parallax past as a filmstrip."
        >
          <FramedSlider
            eyebrow="LOOKBOOK"
            title="In the wild"
            slides={makeSlides(5)}
            style={sceneBg}
          />
        </Demo>

        {/* ---- MagnifyCarousel ---- */}
        <Demo
          id="magnify"
          kicker="Gallery"
          title="MagnifyCarousel"
          desc="A row of panels drifts on scroll, each scaling small→big→small and brightening as it crosses the center slot."
        >
          <MagnifyCarousel
            eyebrow="REEL"
            title="Center stage"
            slides={makeSlides(5)}
            style={sceneBg}
          />
        </Demo>

        {/* ---- ExpandingHighlight ---- */}
        <Demo
          id="expanding"
          kicker="WGB"
          title="ExpandingHighlight"
          desc="A tilted elliptical glow that expands outward as the section scrolls through view. Scroll through this block to watch it grow along the orbit rings."
        >
          <ExpandingHighlight
            color="#1e3aff"
            style={{
              minHeight: "120vh",
              borderRadius: 16,
              overflow: "hidden",
              background: "#05060a",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", width: "100%", padding: "0 clamp(24px,6vw,80px)" }}>
              <OrbitDecor />
              <div style={{ position: "relative", maxWidth: 420 }}>
                <p className="demo__kicker">THE TRUST ENGINE</p>
                <h3 className="headline-xl" style={{ fontSize: 40 }}>
                  Outreach based on real data signals
                </h3>
                <p className="demo__desc" style={{ marginTop: 12 }}>
                  As you scroll, the highlight expands outward — small and faint
                  on entry, large and bright by the time the section leaves.
                </p>
              </div>
            </div>
          </ExpandingHighlight>
        </Demo>

        {/* ---- IntroCurtain ---- */}
        <Demo
          id="curtain"
          kicker="WGB"
          title="IntroCurtain"
          desc="A full-bleed curtain holds a centered tagline over a faint grid, then lifts to reveal the content beneath. Plays once on mount."
        >
          <div className="stage" style={{ minHeight: 420 }}>
            <IntroCurtain
              key={curtainKey}
              message={
                <>
                  We <em>orbit</em> only around what matters
                </>
              }
              style={{ height: 420 }}
            >
              <div className="hero-plate" style={{ minHeight: 420 }}>
                <h1 className="hero-plate__word" style={{ fontSize: "clamp(40px,9vw,120px)" }}>
                  wgb
                </h1>
                <p className="hero-plate__sub">Engineering future growth for B2B founders.</p>
              </div>
            </IntroCurtain>
          </div>
          <button
            className="pill"
            style={{ marginTop: 18, border: "none", cursor: "pointer" }}
            onClick={() => setCurtainKey((k) => k + 1)}
          >
            Replay curtain
          </button>
        </Demo>

        {/* ---- DepthTunnel ---- */}
        <Demo
          id="depth-tunnel"
          kicker="Floema"
          title="DepthTunnel"
          desc="Continuous infinite stream from a central vanishing point. Items fly toward the viewer and loop — like flying through a starfield of product cards. Uses CSS perspective + translateZ for real 3D convergence."
        >
          <div
            style={{
              position: "relative",
              height: 500,
              background: "#E8E2D9",
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DepthTunnel
              items={TUNNEL_ITEMS}
              cycleDuration={6}
              perspective={1000}
              style={{ position: "absolute", inset: 0 }}
            >
              {(item) => (
                <div
                  style={{
                    width: 70,
                    height: 55,
                    borderRadius: 8,
                    background: FIELD_COLORS[(item as any).ci % FIELD_COLORS.length],
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  }}
                />
              )}
            </DepthTunnel>
            <h3
              className="headline-xl"
              style={{
                position: "relative",
                zIndex: 1,
                color: "#1A1A1A",
                fontSize: 32,
                fontStyle: "italic",
                textAlign: "center",
                maxWidth: 360,
                pointerEvents: "none",
              }}
            >
              Spaces for people, made for life.
            </h3>
          </div>
        </Demo>

        {/* ---- FunnelEntrance ---- */}
        <Demo
          id="funnel-entrance"
          kicker="Floema"
          title="FunnelEntrance"
          desc="One-time warp arrival: items fly from a vanishing point and settle at their scattered positions. Deeper layers arrive later. Click replay to see it again."
        >
          <FunnelEntranceDemo />
        </Demo>

        {/* ---- SectionStack ---- */}
        <Demo
          id="section-stack"
          kicker="Floema"
          title="SectionStack"
          desc="Multi-section stacking scroll engine. Images cover each other like cards as you scroll. Content switches at the midpoint. Toggle the progress line style below."
        >
          <SectionStackDemo />
        </Demo>

        {/* ---- ParallaxField ---- */}
        <Demo
          id="parallax-field"
          kicker="Floema"
          title="ParallaxField"
          desc="Scatters items across multiple depth layers. Each layer scrolls at a different speed, creating a multi-plane parallax constellation — the Floema hero pattern."
        >
          <div
            className="stage"
            style={{
              minHeight: 500,
              background: "#E8E2D9",
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <ParallaxField
              items={DEMO_FIELD_ITEMS}
              layerSpeed={60}
              scrollRange={[0, 1200]}
              style={{ position: "absolute", inset: 0 }}
            >
              {(item) => (
                <div
                  style={{
                    width: item.id === "f1" || item.id === "f6" || item.id === "f11" ? 90 : item.id === "f3" || item.id === "f8" ? 80 : 70,
                    height: item.id === "f2" || item.id === "f7" || item.id === "f12" ? 90 : item.id === "f5" || item.id === "f10" ? 80 : 60,
                    borderRadius: 8,
                    background: FIELD_COLORS[Number(item.id.slice(1)) % FIELD_COLORS.length],
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                />
              )}
            </ParallaxField>
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: 500 }}>
              <h3 className="headline-xl" style={{ color: "#1A1A1A", fontSize: 36, fontStyle: "italic", textAlign: "center", maxWidth: 400 }}>
                Spaces for people, made for life.
              </h3>
            </div>
          </div>
        </Demo>

        {/* ---- ParallaxSection (stacked — Floema wipe) ---- */}
        <Demo
          id="parallax-section"
          kicker="Floema"
          title="ParallaxSection"
          desc="Three stacked sections with parallax backgrounds that wipe into each other as you scroll — the cinematic Floema section transition. Each section pins at 100vh while its background pans, then the next section rises from below."
        >
          {PARALLAX_SECTIONS.map((s) => (
            <ParallaxSection
              key={s.num}
              heightVh={200}
              parallaxRange={["0%", "25%"]}
              background={
                <div style={{ width: "100%", height: "100%", background: s.gradient }} />
              }
            >
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "clamp(24px,4vw,64px)" }}>
                <div style={{ paddingTop: 40 }}>
                  <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)" }}>{s.num}</span>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginLeft: 16, padding: "6px 16px", borderRadius: 9999, background: s.badge, color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {s.category}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                    Made to Last
                  </div>
                </div>
                <div style={{ maxWidth: 520, paddingBottom: 40 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(28px,4vw,48px)", color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>
                    {s.headline}
                  </h3>
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#1A1A1A", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
                    SEE {s.category.toUpperCase()} PRODUCTS →
                  </button>
                </div>
              </div>
            </ParallaxSection>
          ))}
        </Demo>

        {/* ---- TextReveal masked-rise ---- */}
        <Demo
          id="masked-rise"
          kicker="Floema"
          title="TextReveal — masked-rise"
          desc='The Floema signature text animation: each word slides up through its own overflow-hidden bounding box, creating a slot-reveal effect. Compare with the "blur-clip" variant above.'
        >
          <div className="stage stage--tall" style={{ flexDirection: "column", gap: 36 }}>
            <TextReveal className="headline-xl" splitWords effect="masked-rise" stagger={0.04}>
              Spaces for people, made for life.
            </TextReveal>
            <TextReveal as="p" className="headline-xl" style={{ fontSize: 24, opacity: 0.7 }} splitWords effect="masked-rise" stagger={0.02}>
              Going beyond the expected is our calling.
            </TextReveal>
          </div>
        </Demo>

        {/* ---- useSectionTheme ---- */}
        <Demo
          id="section-theme"
          kicker="Floema"
          title="useSectionTheme"
          desc="Scroll-position-based theme detection. Register sections with light/dark themes, and the hook returns whichever theme covers the viewport probe point. Watch the badge above change as you scroll between the light and dark blocks."
        >
          <SectionThemeDemo />
        </Demo>

        {/* ---- GlowBorder ---- */}
        <Demo
          id="glow"
          kicker="Surface"
          title="GlowBorder"
          desc="A rotating conic-gradient halo behind any content. Continuous rotation is gated behind reduced motion."
        >
          <div className="stage stage--tall">
            <GlowBorder borderRadius={24}>
              <div className="glow-card">
                <h4>Pro plan</h4>
                <p>Everything in Studio, plus unlimited renders and priority queue.</p>
              </div>
            </GlowBorder>
          </div>
        </Demo>

        {/* ---- CropFrame ---- */}
        <Demo
          id="crop"
          kicker="Surface"
          title="CropFrame"
          desc="The crop-box selection motif: a dashed border with corner handles. Colors and handle size are props."
        >
          <div className="stage stage--tall">
            <CropFrame style={{ width: 280, height: 360, overflow: "hidden" }}>
              <SampleCard title="Selected" caption="240 × 360" index={2} />
            </CropFrame>
          </div>
        </Demo>

        {/* ---- ScrollCue ---- */}
        <Demo
          id="cue"
          kicker="Surface"
          title="ScrollCue"
          desc="A bobbing scroll indicator, positioned at the bottom-center of its relative parent."
        >
          <div className="stage" style={{ minHeight: 220 }}>
            <ScrollCue />
          </div>
        </Demo>
      </main>
    </div>
  );
}

/** Decorative concentric orbit rings + center sparkle (evokes the WGB motif). */
function OrbitDecor() {
  const rings = [560, 420, 290];
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        right: "-4%",
        top: "50%",
        transform: "translateY(-50%) rotate(-28deg)",
        width: 560,
        height: 560,
        pointerEvents: "none",
      }}
    >
      {rings.map((d) => (
        <span
          key={d}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: d,
            height: d * 0.62,
            marginLeft: -d / 2,
            marginTop: (-d * 0.62) / 2,
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "50%",
          }}
        />
      ))}
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 22,
          height: 22,
          marginLeft: -11,
          marginTop: -11,
          background: "#fff",
          clipPath:
            "polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)",
        }}
      />
    </div>
  );
}

/* ---- Tunnel / Funnel demo data ---- */

const TUNNEL_ITEMS: (DepthTunnelItem & { ci: number })[] = Array.from({ length: 16 }, (_, i) => ({
  id: `t${i}`,
  x: 8 + ((i * 37 + 13) % 84),
  y: 6 + ((i * 29 + 7) % 88),
  ci: i,
}));

const FUNNEL_ITEMS: (FunnelEntranceItem & { ci: number })[] = [
  { id: "e1", x: 8, y: 15, layer: 0, ci: 0 },
  { id: "e2", x: 82, y: 10, layer: 1, ci: 1 },
  { id: "e3", x: 18, y: 55, layer: 2, ci: 2 },
  { id: "e4", x: 72, y: 42, layer: 1, ci: 3 },
  { id: "e5", x: 42, y: 8, layer: 3, ci: 4 },
  { id: "e6", x: 28, y: 72, layer: 0, ci: 5 },
  { id: "e7", x: 62, y: 68, layer: 2, ci: 0 },
  { id: "e8", x: 90, y: 52, layer: 3, ci: 1 },
  { id: "e9", x: 6, y: 35, layer: 1, ci: 2 },
  { id: "e10", x: 52, y: 32, layer: 0, ci: 3 },
  { id: "e11", x: 22, y: 22, layer: 3, ci: 4 },
  { id: "e12", x: 75, y: 78, layer: 2, ci: 5 },
];

function FunnelEntranceDemo() {
  const [key, setKey] = useState(0);
  return (
    <div>
      <div
        style={{
          position: "relative",
          height: 500,
          background: "#E8E2D9",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FunnelEntrance
          key={key}
          items={FUNNEL_ITEMS}
          duration={2}
          delay={0.3}
          perspective={1000}
          style={{ position: "absolute", inset: 0 }}
        >
          {(item) => (
            <div
              style={{
                width: 75,
                height: 55,
                borderRadius: 8,
                background: FIELD_COLORS[item.ci % FIELD_COLORS.length],
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            />
          )}
        </FunnelEntrance>
        <h3
          className="headline-xl"
          style={{
            position: "relative",
            zIndex: 1,
            color: "#1A1A1A",
            fontSize: 32,
            fontStyle: "italic",
            textAlign: "center",
            maxWidth: 360,
            pointerEvents: "none",
          }}
        >
          Warp arrival
        </h3>
      </div>
      <button
        className="pill"
        style={{ marginTop: 16, border: "none", cursor: "pointer" }}
        onClick={() => setKey((k) => k + 1)}
      >
        Replay entrance
      </button>
    </div>
  );
}

/* ---- SectionStack demo ---- */

function SectionStackDemo() {
  const [lineStyle, setLineStyle] = useState<ProgressLineVariant>("horizontal");

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["horizontal", "vertical", "diagonal", "none"] as const).map((v) => (
          <button
            key={v}
            className="pill"
            onClick={() => setLineStyle(v)}
            style={{
              border: "none",
              cursor: "pointer",
              opacity: lineStyle === v ? 1 : 0.5,
              fontWeight: lineStyle === v ? 700 : 400,
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <SectionStack
        items={STACK_SECTIONS}
        scrollVhPerSection={250}
        progressLine={lineStyle}
        stageStyle={{ borderRadius: 12 }}
        renderBackground={(item) => (
          <div style={{ width: "100%", height: "100%", background: item.gradient }} />
        )}
      >
        {(item) => (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "clamp(24px,4vw,48px)" }}>
            <div style={{ paddingTop: 32 }}>
              <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)" }}>{item.num}</span>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginLeft: 16, padding: "6px 16px", borderRadius: 9999, background: item.badge, color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {item.label}
              </div>
            </div>
            <div style={{ maxWidth: 480, paddingBottom: 24 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(24px,3.5vw,42px)", color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
                {item.headline}
              </h3>
              <button style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#1A1A1A", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                Explore →
              </button>
            </div>
          </div>
        )}
      </SectionStack>
    </div>
  );
}

const STACK_SECTIONS = [
  { id: "s1", num: "01", label: "Urban", badge: "#C44B2B", headline: "Signage, furniture, and equipment for welcoming urban spaces", gradient: "linear-gradient(180deg, #2C3E50 0%, #34495E 20%, #2A3A4A 40%, #1F2D3A 60%, #1A252F 80%, #141D26 100%)" },
  { id: "s2", num: "02", label: "Nature", badge: "#7A8B3C", headline: "Signage and equipment for all facets of the great outdoors", gradient: "linear-gradient(180deg, #3E5C3B 0%, #4A6B44 15%, #5C7A4C 35%, #4A6840 55%, #365A32 75%, #2D4A2C 100%)" },
  { id: "s3", num: "03", label: "RePlastic", badge: "#3A7D5C", headline: "Custom projects and furniture crafted out of 100% recyclable plastic", gradient: "linear-gradient(180deg, #1F4037 0%, #245545 15%, #2C5A4A 35%, #234D3F 55%, #1B3D32 75%, #162D24 100%)" },
];

/* ---- Floema demo data ---- */

const PARALLAX_SECTIONS = [
  {
    num: "01",
    category: "Urban",
    badge: "#C44B2B",
    headline: "Signage, furniture, and equipment for welcoming urban spaces",
    gradient: "linear-gradient(180deg, #2C3E50 0%, #34495E 20%, #2A3A4A 40%, #1F2D3A 60%, #1A252F 80%, #141D26 100%)",
  },
  {
    num: "02",
    category: "Nature",
    badge: "#7A8B3C",
    headline: "Signage and equipment for all facets of the great outdoors",
    gradient: "linear-gradient(180deg, #3E5C3B 0%, #4A6B44 15%, #5C7A4C 35%, #4A6840 55%, #365A32 75%, #2D4A2C 100%)",
  },
  {
    num: "03",
    category: "RePlastic",
    badge: "#3A7D5C",
    headline: "Custom projects and furniture crafted out of 100% recyclable plastic",
    gradient: "linear-gradient(180deg, #1F4037 0%, #245545 15%, #2C5A4A 35%, #234D3F 55%, #1B3D32 75%, #162D24 100%)",
  },
];

const FIELD_COLORS = [
  "linear-gradient(135deg, #C4A882, #8B7355)",
  "linear-gradient(135deg, #6B8E5A, #4A6B3A)",
  "linear-gradient(135deg, #8B6E4E, #5C4833)",
  "linear-gradient(135deg, #A0522D, #6B3A1F)",
  "linear-gradient(135deg, #556B2F, #3B4A1F)",
  "linear-gradient(135deg, #4A6B8B, #2C4A5C)",
];

const DEMO_FIELD_ITEMS: (ParallaxFieldItem & { id: string })[] = [
  { id: "f1", x: 8, y: 12, layer: 0 },
  { id: "f2", x: 82, y: 8, layer: 1 },
  { id: "f3", x: 18, y: 55, layer: 2 },
  { id: "f4", x: 72, y: 42, layer: 1 },
  { id: "f5", x: 42, y: 6, layer: 3 },
  { id: "f6", x: 28, y: 72, layer: 0 },
  { id: "f7", x: 62, y: 68, layer: 2 },
  { id: "f8", x: 90, y: 52, layer: 3 },
  { id: "f9", x: 6, y: 35, layer: 1 },
  { id: "f10", x: 52, y: 32, layer: 0 },
  { id: "f11", x: 22, y: 22, layer: 3 },
  { id: "f12", x: 75, y: 78, layer: 2 },
];

function SectionThemeDemo() {
  const { theme, registerSection } = useSectionTheme<"dark" | "light">("dark");
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 12,
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            padding: "8px 20px",
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            background: theme === "light" ? "#fff" : "#1A1A1A",
            color: theme === "light" ? "#1A1A1A" : "#fff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          }}
        >
          theme: {theme}
        </div>
      </div>
      <div
        ref={(el) => registerSection("theme-dark-1", el, "dark")}
        style={{ height: 300, background: "#E8E2D9", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, margin: "16px 0" }}
      >
        <span style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A" }}>Light section → dark nav text</span>
      </div>
      <div
        ref={(el) => registerSection("theme-light-1", el, "light")}
        style={{ height: 300, background: "linear-gradient(180deg, #2C3E50, #1A252F)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, margin: "16px 0" }}
      >
        <span style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>Dark section → light nav text</span>
      </div>
      <div
        ref={(el) => registerSection("theme-dark-2", el, "dark")}
        style={{ height: 300, background: "#E8E2D9", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, margin: "16px 0" }}
      >
        <span style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A" }}>Light section again</span>
      </div>
    </div>
  );
}

function StickyDemo({ progress }: { progress: import("framer-motion").MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], ["-38%", "38%"]);
  const rotate = useTransform(progress, [0, 1], [0, 180]);
  const pct = useTransform(progress, (p) => `${Math.round(p * 100)}%`);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        style={{
          x,
          rotate,
          width: 120,
          height: 120,
          borderRadius: 24,
          background: "linear-gradient(160deg, #e8631a, #5a1840)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: 24,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 48,
        }}
      >
        {pct}
      </motion.div>
      <ScrollCue label="SCROLL TO SCRUB" />
    </div>
  );
}
