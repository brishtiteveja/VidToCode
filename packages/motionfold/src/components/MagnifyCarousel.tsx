import type { CSSProperties, ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { StickyScene } from "../primitives/StickyScene";
import { ScrollCue } from "./ScrollCue";
import { SceneHeader } from "../internal/SceneHeader";
import { useElementSize } from "../hooks/useElementSize";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { clamp } from "../utils/math";
import type { Slide } from "../types";

export interface MagnifyCarouselProps {
  slides: Slide[];
  eyebrow?: ReactNode;
  title?: ReactNode;
  vhPerSlide?: number;
  minVh?: number;
  itemWidthFraction?: number;
  itemMaxWidth?: number;
  itemHeightFraction?: number;
  itemMaxHeight?: number;
  /** How much neighbors shrink per step away from center (0–1). Default `0.28`. */
  shrink?: number;
  showCue?: boolean;
  scrollLabel?: string | null;
  className?: string;
  style?: CSSProperties;
}

/**
 * Center-magnify scroll carousel: a horizontal row of panels drifts as you
 * scroll, with each panel scaling small→big→small (and brightening) as it
 * crosses the center slot. Reduced motion → a plain horizontal scroll strip.
 */
export function MagnifyCarousel({
  slides,
  eyebrow,
  title,
  vhPerSlide = 80,
  minVh = 240,
  itemWidthFraction = 0.3,
  itemMaxWidth = 380,
  itemHeightFraction = 0.66,
  itemMaxHeight = 500,
  shrink = 0.28,
  showCue = true,
  scrollLabel,
  className,
  style,
}: MagnifyCarouselProps) {
  const reduced = useReducedMotionFlag();
  const total = slides.length;
  const { ref: sizeRef, size } = useElementSize<HTMLDivElement>();

  const stageW = size.width || 1280;
  const stageH = size.height || 800;
  const itemW = Math.min(stageW * itemWidthFraction, itemMaxWidth);
  const itemH = Math.min(stageH * itemHeightFraction, itemMaxHeight);
  const slot = itemW * 1.12;

  if (reduced) {
    return (
      <section
        className={className}
        style={{ position: "relative", width: "100%", padding: "6rem 0", ...style }}
      >
        <div style={{ padding: "0 2rem", marginBottom: "2rem" }}>
          <SceneHeader eyebrow={eyebrow} title={title} />
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            padding: "0 2rem",
          }}
        >
          {slides.map((s) => (
            <div
              key={s.key}
              style={{ flex: "0 0 auto", width: 300, height: 420, scrollSnapAlign: "center" }}
            >
              {s.content}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <StickyScene
      heightVh={Math.max(total * vhPerSlide, minVh)}
      offset={["start start", "end end"]}
      className={className}
      style={style}
    >
      {(progress) => (
        <div
          ref={sizeRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SceneHeader eyebrow={eyebrow} title={title} pinned />
          {slides.map((s, i) => (
            <Item
              key={s.key}
              i={i}
              total={total}
              progress={progress}
              slot={slot}
              width={itemW}
              height={itemH}
              shrink={shrink}
            >
              {s.content}
            </Item>
          ))}
          {showCue && <ScrollCue label={scrollLabel} />}
        </div>
      )}
    </StickyScene>
  );
}

function Item({
  i,
  total,
  progress,
  slot,
  width,
  height,
  shrink,
  children,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  slot: number;
  width: number;
  height: number;
  shrink: number;
  children: ReactNode;
}) {
  const dist = useTransform(progress, (p) => i - p * (total - 1));
  const x = useTransform(dist, (d) => d * slot);
  const scale = useTransform(dist, (d) => 1 - clamp(Math.abs(d), 0, 2) * shrink);
  const opacity = useTransform(dist, (d) => clamp(1 - Math.abs(d) * 0.35, 0.12, 1));
  const filter = useTransform(
    dist,
    (d) => `brightness(${1 - clamp(Math.abs(d), 0, 2) * 0.3})`,
  );
  const zIndex = useTransform(dist, (d) => Math.round(100 - Math.abs(d) * 10));

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        overflow: "hidden",
        x,
        scale,
        opacity,
        filter,
        zIndex,
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
      }}
    >
      {children}
    </motion.div>
  );
}
