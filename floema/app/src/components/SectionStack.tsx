import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { type SectionData } from "../data/sections";
import CategoryBadge from "./CategoryBadge";
import CatalogueCard from "./CatalogueCard";

export type ProgressLineStyle = "horizontal" | "vertical" | "diagonal";

interface SectionStackProps {
  sections: SectionData[];
  scrollVhPerSection?: number;
  progressLine?: ProgressLineStyle;
  registerSection?: (
    id: string,
    element: HTMLElement | null,
    theme: "dark" | "light"
  ) => void;
}

export default function SectionStack({
  sections,
  scrollVhPerSection = 300,
  progressLine = "horizontal",
  registerSection,
}: SectionStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const N = sections.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={(el) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
          el;
        registerSection?.("sections", el, "light");
      }}
      style={{ height: `${N * scrollVhPerSection}vh`, position: "relative" }}
    >
      {/* Sticky viewport — single frame all images live in */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#E8E2D9",
        }}
      >
        {/* Image layers — later sections have higher z-index and cover earlier ones */}
        {sections.map((section, i) => (
          <ImageLayer
            key={section.category}
            index={i}
            total={N}
            progress={scrollYProgress}
            gradient={section.gradient}
          />
        ))}

        {/* Content layers — each fades in/out based on which image is dominant */}
        {sections.map((section, i) => (
          <ContentLayer
            key={`c-${section.category}`}
            section={section}
            index={i}
            total={N}
            progress={scrollYProgress}
          />
        ))}

        {/* Progress line */}
        <ProgressLine progress={scrollYProgress} total={N} variant={progressLine} />

        {/* Scroll to Explore hint */}
        <ScrollHint progress={scrollYProgress} />
      </div>
    </div>
  );
}

// --- Image Layer ---
// Each image sits at absolute inset, z-indexed by order.
// Enters by sliding from translateY:100% → 0%.
// While active, background parallax-pans inside.
// On exit (next image covering it), recedes slightly upward.

function ImageLayer({
  index,
  total,
  progress,
  gradient,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  gradient: string;
}) {
  const f = 1 / total;

  // Entry: slide from 100% to 0%
  // Section 0 enters during [0, 0.06]
  // Section i>0 enters during last 35% of previous section's slot
  const enterStart = index === 0 ? 0 : (index - 0.35) * f;
  const enterEnd = index === 0 ? 0.06 : index * f;

  // Exit: recede to -12% while next section covers
  const exitStart = (index + 0.65) * f;
  const exitEnd = Math.min((index + 1) * f, 1);

  let yIn: number[];
  let yOut: string[];

  if (index === 0 && index < total - 1) {
    yIn = [0, enterEnd, exitStart, exitEnd, 1];
    yOut = ["100%", "0%", "0%", "-12%", "-12%"];
  } else if (index === 0) {
    yIn = [0, enterEnd, 1];
    yOut = ["100%", "0%", "0%"];
  } else if (index === total - 1) {
    yIn = [0, enterStart, enterEnd, 1];
    yOut = ["100%", "100%", "0%", "0%"];
  } else {
    yIn = [0, enterStart, enterEnd, exitStart, exitEnd, 1];
    yOut = ["100%", "100%", "0%", "0%", "-12%", "-12%"];
  }

  const y = useTransform(progress, yIn, yOut);

  // Background parallax pan within the section
  const panStart = index * f;
  const panEnd = (index + 1) * f;
  const panY = useTransform(progress, [panStart, panEnd], ["0%", "-25%"]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: index + 1,
        y,
        overflow: "hidden",
      }}
    >
      <motion.div
        className="noise-overlay"
        style={{
          position: "absolute",
          inset: 0,
          height: "140%",
          top: "-20%",
          y: panY,
          background: gradient,
        }}
      />
      <div className="section-gradient-overlay" />
    </motion.div>
  );
}

// --- Content Layer ---
// Shows section info (number, badge, headline, CTA).
// Visible when this section's image is dominant.
// Switches at the midpoint of the incoming image's transition.

function ContentLayer({
  section,
  index,
  total,
  progress,
}: {
  section: SectionData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const f = 1 / total;

  // Content becomes visible when this image crosses viewport midpoint during entry
  // and hides when the NEXT image crosses midpoint
  const showAt = index === 0 ? 0 : (index - 0.17) * f;
  const showFull = index === 0 ? 0.04 : (index - 0.05) * f;
  const hideAt = index === total - 1 ? 1 : (index + 0.8) * f;
  const hideFull = index === total - 1 ? 1 : (index + 0.88) * f;

  let oIn: number[];
  let oOut: number[];

  if (index === 0 && index === total - 1) {
    oIn = [0, 0.04, 1];
    oOut = [0, 1, 1];
  } else if (index === 0) {
    oIn = [0, 0.04, hideAt, hideFull];
    oOut = [0, 1, 1, 0];
  } else if (index === total - 1) {
    oIn = [showAt, showFull, 1];
    oOut = [0, 1, 1];
  } else {
    oIn = [showAt, showFull, hideAt, hideFull];
    oOut = [0, 1, 1, 0];
  }

  const opacity = useTransform(progress, oIn, oOut);

  // Slight vertical slide during transitions
  let cIn: number[];
  let cOut: number[];
  if (index === 0) {
    cIn = [0, 0.04, hideAt, hideFull];
    cOut = [20, 0, 0, -20];
  } else if (index === total - 1) {
    cIn = [showAt, showFull, 1];
    cOut = [20, 0, 0];
  } else {
    cIn = [showAt, showFull, hideAt, hideFull];
    cOut = [20, 0, 0, -20];
  }

  const contentY = useTransform(progress, cIn, cOut);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: total + 1,
        opacity,
        y: contentY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "6vh clamp(24px,4vw,64px) 3vh",
        pointerEvents: "none",
      }}
    >
      {/* Mid-left: section number + badge + "Made to Last" */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, maxWidth: 200 }}>
        <span
          className="font-body"
          style={{
            fontSize: 13,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {section.num}
        </span>
        <CategoryBadge
          category={section.category}
          color={section.badge}
          delay={0}
        />
        <span
          className="font-body"
          style={{
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.4)",
            marginTop: 2,
          }}
        >
          Made to Last
        </span>
      </div>

      {/* Bottom: headline + CTA + catalogue card */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap" as const,
        }}
      >
        <div style={{ flex: 1, maxWidth: 520 }}>
          <h2
            className="font-display"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(26px, 3.5vw, 48px)",
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {section.headline}
          </h2>
          <button
            className="font-body"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#fff",
              color: "#1A1A1A",
              border: "none",
              padding: "10px 20px",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
              pointerEvents: "auto" as const,
            }}
          >
            <span>{section.cta}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {section.hasCatalogue && (
          <div style={{ pointerEvents: "auto" as const, flexShrink: 0 }}>
            <CatalogueCard category={section.category} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- Progress Line ---
// Three variants: horizontal (center of viewport), vertical (centered),
// diagonal (angled slash across center). Fills based on section scroll progress.

function ProgressLine({
  progress,
  total,
  variant,
}: {
  progress: MotionValue<number>;
  total: number;
  variant: ProgressLineStyle;
}) {
  const sectionProgress = useTransform(progress, (p) => {
    const idx = Math.min(Math.floor(p * total), total - 1);
    return p * total - idx;
  });

  if (variant === "horizontal") return <HorizontalLine sectionProgress={sectionProgress} total={total} />;
  if (variant === "diagonal") return <DiagonalLine sectionProgress={sectionProgress} total={total} />;
  return <VerticalLine sectionProgress={sectionProgress} total={total} />;
}

function HorizontalLine({ sectionProgress, total }: { sectionProgress: MotionValue<number>; total: number }) {
  const scaleX = useTransform(sectionProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.6, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(60vw, 400px)",
        height: 1,
        background: "rgba(255,255,255,0.08)",
        zIndex: total + 2,
        borderRadius: 1,
        overflow: "visible",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.45)",
          transformOrigin: "left",
          scaleX,
          borderRadius: 1,
        }}
      />
      {/* Glow dot at the leading edge */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: useTransform(sectionProgress, [0, 1], ["0%", "100%"]),
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.8)",
          transform: "translateY(-50%) translateX(-50%)",
          opacity: glowOpacity,
          boxShadow: "0 0 12px rgba(255,255,255,0.4)",
        }}
      />
    </div>
  );
}

function VerticalLine({ sectionProgress, total }: { sectionProgress: MotionValue<number>; total: number }) {
  const scaleY = useTransform(sectionProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.6, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 1,
        height: "min(40vh, 300px)",
        background: "rgba(255,255,255,0.08)",
        zIndex: total + 2,
        borderRadius: 1,
        overflow: "visible",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.45)",
          transformOrigin: "top",
          scaleY,
          borderRadius: 1,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: useTransform(sectionProgress, [0, 1], ["0%", "100%"]),
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.8)",
          transform: "translateX(-50%) translateY(-50%)",
          opacity: glowOpacity,
          boxShadow: "0 0 12px rgba(255,255,255,0.4)",
        }}
      />
    </div>
  );
}

function DiagonalLine({ sectionProgress, total }: { sectionProgress: MotionValue<number>; total: number }) {
  const scaleX = useTransform(sectionProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.7, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%) rotate(-35deg)",
        width: "min(50vw, 320px)",
        height: 1,
        background: "rgba(255,255,255,0.06)",
        zIndex: total + 2,
        borderRadius: 1,
        overflow: "visible",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)",
          transformOrigin: "left",
          scaleX,
          borderRadius: 1,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          right: -3,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          transform: "translateY(-50%)",
          opacity: glowOpacity,
          boxShadow: "0 0 16px rgba(255,255,255,0.5)",
        }}
      />
    </div>
  );
}

// --- Scroll Hint ---
// "Scroll to Explore" that fades out once scrolling begins.

function ScrollHint({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0.05, 0.1], [1, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        opacity,
      }}
    >
      <span
        className="font-body"
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Scroll to Explore
      </span>
      <svg
        className="scroll-indicator-chevron"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3 6L8 11L13 6"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
