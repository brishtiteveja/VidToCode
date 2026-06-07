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
} from "motionfold";
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
