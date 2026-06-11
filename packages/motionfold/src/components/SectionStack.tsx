import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";

export type ProgressLineVariant = "horizontal" | "vertical" | "diagonal" | "none";

export interface SectionStackItem {
  /** Unique key for the section. */
  id: string | number;
}

export interface SectionStackProps<T extends SectionStackItem = SectionStackItem> {
  /** Array of section data objects. */
  items: T[];
  /**
   * Viewport-heights of scroll space allocated per section. Higher = slower,
   * more cinematic scroll. Default `300`.
   */
  scrollVhPerSection?: number;
  /**
   * Progress indicator style rendered at viewport center.
   * `"none"` hides it. Default `"horizontal"`.
   */
  progressLine?: ProgressLineVariant;
  /** Progress line fill color. Default `"rgba(255,255,255,0.45)"`. */
  progressColor?: string;
  /** Progress line track color. Default `"rgba(255,255,255,0.08)"`. */
  progressTrackColor?: string;
  /**
   * Render the parallax background for each section. Return a div with a
   * gradient, image, or video — it will be positioned absolutely and panned.
   */
  renderBackground: (item: T, index: number) => ReactNode;
  /**
   * Render the content overlay for each section. Opacity and y-offset are
   * managed by the stack — content fades in when the section's image crosses
   * the viewport midpoint, and out when the next one does.
   */
  children: (item: T, index: number) => ReactNode;
  /** Called with the outer container element — useful for nav-theme registration. */
  containerRef?: (el: HTMLElement | null) => void;
  className?: string;
  style?: CSSProperties;
  stageClassName?: string;
  stageStyle?: CSSProperties;
}

/**
 * Multi-section stacking scroll engine. All section backgrounds live in a
 * single sticky viewport. As the user scrolls, each background image slides
 * up from below and **covers** the previous one — like stacking cards.
 *
 * Content overlays transition at the midpoint: the old section's text fades
 * out and the new one fades in when the incoming image crosses the viewport
 * center.
 *
 * An optional progress line (horizontal, vertical, or diagonal) fills within
 * each section's scroll range and resets per section.
 *
 * Reduced-motion: backgrounds stack statically, content for the first section
 * is shown.
 */
export function SectionStack<T extends SectionStackItem = SectionStackItem>({
  items,
  scrollVhPerSection = 300,
  progressLine = "horizontal",
  progressColor = "rgba(255,255,255,0.45)",
  progressTrackColor = "rgba(255,255,255,0.08)",
  renderBackground,
  children,
  containerRef: externalRef,
  className,
  style,
  stageClassName,
  stageStyle,
}: SectionStackProps<T>) {
  const reduced = useReducedMotionFlag();
  const innerRef = useRef<HTMLDivElement>(null);
  const N = items.length;

  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <div className={className} style={style}>
        {items.map((item, i) => (
          <div key={item.id} style={{ position: "relative", minHeight: "100vh" }}>
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              {renderBackground(item, i)}
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              {children(item, i)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={(el) => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        externalRef?.(el);
      }}
      className={className}
      style={{ height: `${N * scrollVhPerSection}vh`, position: "relative", ...style }}
    >
      <div
        className={stageClassName}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          ...stageStyle,
        }}
      >
        {/* Image layers — stacked by z-index, each covers the previous */}
        {items.map((item, i) => (
          <ImageLayer
            key={item.id}
            index={i}
            total={N}
            progress={scrollYProgress}
            background={renderBackground(item, i)}
          />
        ))}

        {/* Content layers — fade at midpoint transitions */}
        {items.map((item, i) => (
          <ContentLayer
            key={`c-${item.id}`}
            index={i}
            total={N}
            progress={scrollYProgress}
          >
            {children(item, i)}
          </ContentLayer>
        ))}

        {/* Progress indicator */}
        {progressLine !== "none" && (
          <ProgressLine
            progress={scrollYProgress}
            total={N}
            variant={progressLine}
            fillColor={progressColor}
            trackColor={progressTrackColor}
          />
        )}
      </div>
    </div>
  );
}

// ─── Image Layer ─────────────────────────────────────────────────────────────

function ImageLayer({
  index,
  total,
  progress,
  background,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  background: ReactNode;
}) {
  const f = 1 / total;

  const enterStart = index === 0 ? 0 : (index - 0.35) * f;
  const enterEnd = index === 0 ? 0.06 : index * f;
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
        style={{
          position: "absolute",
          inset: 0,
          height: "140%",
          top: "-20%",
          y: panY,
        }}
      >
        {background}
      </motion.div>
    </motion.div>
  );
}

// ─── Content Layer ───────────────────────────────────────────────────────────

function ContentLayer({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const f = 1 / total;

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
        pointerEvents: "none",
      }}
    >
      <div style={{ height: "100%", pointerEvents: "auto" }}>{children}</div>
    </motion.div>
  );
}

// ─── Progress Line ───────────────────────────────────────────────────────────

function ProgressLine({
  progress,
  total,
  variant,
  fillColor,
  trackColor,
}: {
  progress: MotionValue<number>;
  total: number;
  variant: ProgressLineVariant;
  fillColor: string;
  trackColor: string;
}) {
  const sectionProgress = useTransform(progress, (p) => {
    const idx = Math.min(Math.floor(p * total), total - 1);
    return p * total - idx;
  });

  if (variant === "horizontal") {
    return <HLine sp={sectionProgress} total={total} fill={fillColor} track={trackColor} />;
  }
  if (variant === "diagonal") {
    return <DLine sp={sectionProgress} total={total} fill={fillColor} track={trackColor} />;
  }
  return <VLine sp={sectionProgress} total={total} fill={fillColor} track={trackColor} />;
}

function HLine({ sp, total, fill, track }: { sp: MotionValue<number>; total: number; fill: string; track: string }) {
  const scaleX = useTransform(sp, [0, 1], [0, 1]);
  const dotLeft = useTransform(sp, [0, 1], ["0%", "100%"]);
  const dotOp = useTransform(sp, [0, 0.3, 0.7, 1], [0, 0.4, 0.6, 0]);

  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "min(60vw,400px)", height: 1, background: track, zIndex: total + 2, borderRadius: 1, overflow: "visible" }}>
      <motion.div style={{ width: "100%", height: "100%", background: fill, transformOrigin: "left", scaleX, borderRadius: 1 }} />
      <motion.div style={{ position: "absolute", top: "50%", left: dotLeft, width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.8)", transform: "translateY(-50%) translateX(-50%)", opacity: dotOp, boxShadow: "0 0 12px rgba(255,255,255,0.4)" }} />
    </div>
  );
}

function VLine({ sp, total, fill, track }: { sp: MotionValue<number>; total: number; fill: string; track: string }) {
  const scaleY = useTransform(sp, [0, 1], [0, 1]);
  const dotTop = useTransform(sp, [0, 1], ["0%", "100%"]);
  const dotOp = useTransform(sp, [0, 0.3, 0.7, 1], [0, 0.4, 0.6, 0]);

  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 1, height: "min(40vh,300px)", background: track, zIndex: total + 2, borderRadius: 1, overflow: "visible" }}>
      <motion.div style={{ width: "100%", height: "100%", background: fill, transformOrigin: "top", scaleY, borderRadius: 1 }} />
      <motion.div style={{ position: "absolute", left: "50%", top: dotTop, width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.8)", transform: "translateX(-50%) translateY(-50%)", opacity: dotOp, boxShadow: "0 0 12px rgba(255,255,255,0.4)" }} />
    </div>
  );
}

function DLine({ sp, total, fill, track }: { sp: MotionValue<number>; total: number; fill: string; track: string }) {
  const scaleX = useTransform(sp, [0, 1], [0, 1]);
  const dotOp = useTransform(sp, [0, 0.3, 0.7, 1], [0, 0.5, 0.7, 0]);

  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%) rotate(-35deg)", width: "min(50vw,320px)", height: 1, background: track, zIndex: total + 2, borderRadius: 1, overflow: "visible" }}>
      <motion.div style={{ width: "100%", height: "100%", background: `linear-gradient(90deg, ${fill} 0%, rgba(255,255,255,0.2) 100%)`, transformOrigin: "left", scaleX, borderRadius: 1 }} />
      <motion.div style={{ position: "absolute", top: "50%", right: -3, width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.9)", transform: "translateY(-50%)", opacity: dotOp, boxShadow: "0 0 16px rgba(255,255,255,0.5)" }} />
    </div>
  );
}
