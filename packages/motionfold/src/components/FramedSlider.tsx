import type { CSSProperties, ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { StickyScene } from "../primitives/StickyScene";
import { CropFrame } from "./CropFrame";
import { ScrollCue } from "./ScrollCue";
import { SceneHeader } from "../internal/SceneHeader";
import { useElementSize } from "../hooks/useElementSize";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { clamp } from "../utils/math";
import { DEFAULT_ACCENT, DEFAULT_LINE } from "../internal/defaults";
import type { Slide } from "../types";

export interface FramedSliderProps {
  slides: Slide[];
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** vh of scroll per slide. Default `80`. */
  vhPerSlide?: number;
  /** Minimum scene height (vh). Default `240`. */
  minVh?: number;
  /** Frame width as a fraction of the stage. Default `0.34`. */
  frameWidthFraction?: number;
  /** Max frame width (px). Default `420`. */
  frameMaxWidth?: number;
  /** Frame height as a fraction of the stage. Default `0.8`. */
  frameHeightFraction?: number;
  /** Max frame height (px). Default `560`. */
  frameMaxHeight?: number;
  lineColor?: string;
  handleColor?: string;
  showCue?: boolean;
  scrollLabel?: string | null;
  className?: string;
  style?: CSSProperties;
}

/**
 * Fixed-frame slide-through picture slider. A dashed crop frame stays centered
 * and motionless while full-size panels slide right→left *through* it as you
 * scroll; dimmed thumbnails of the same panels parallax past as a filmstrip.
 * Strictly 1:1 scroll-linked, fully reversible. Reduced motion → a plain
 * horizontal scroll strip.
 */
export function FramedSlider({
  slides,
  eyebrow,
  title,
  vhPerSlide = 80,
  minVh = 240,
  frameWidthFraction = 0.34,
  frameMaxWidth = 420,
  frameHeightFraction = 0.8,
  frameMaxHeight = 560,
  lineColor = DEFAULT_LINE,
  handleColor = DEFAULT_ACCENT,
  showCue = true,
  scrollLabel,
  className,
  style,
}: FramedSliderProps) {
  const reduced = useReducedMotionFlag();
  const total = slides.length;
  const { ref: sizeRef, size } = useElementSize<HTMLDivElement>();

  const stageW = size.width || 1280;
  const stageH = size.height || 800;
  const frameW = Math.min(stageW * frameWidthFraction, frameMaxWidth);
  const frameH = Math.min(stageH * frameHeightFraction, frameMaxHeight);
  const thumbW = frameW * 0.34;
  const thumbH = frameH * 0.34;
  const thumbSlot = frameW * 0.72;

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
              style={{ flex: "0 0 auto", width: 300, height: 440, scrollSnapAlign: "center" }}
            >
              <CropFrame
                lineColor={lineColor}
                handleColor={handleColor}
                className="mf-framed-slide"
                style={{ height: "100%", width: "100%", overflow: "hidden" }}
              >
                {s.content}
              </CropFrame>
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

          {/* Flanking thumbnail filmstrip (behind the frame) */}
          <div
            style={{ pointerEvents: "none", position: "absolute", inset: 0, zIndex: 0 }}
          >
            {slides.map((s, i) => (
              <Thumb
                key={s.key}
                i={i}
                total={total}
                progress={progress}
                slot={thumbSlot}
                width={thumbW}
                height={thumbH}
              >
                {s.content}
              </Thumb>
            ))}
          </div>

          {/* Fixed centre frame — panels slide through it */}
          <Track
            slides={slides}
            total={total}
            progress={progress}
            frameW={frameW}
            frameH={frameH}
            lineColor={lineColor}
            handleColor={handleColor}
          />

          {showCue && <ScrollCue label={scrollLabel} />}
        </div>
      )}
    </StickyScene>
  );
}

function Track({
  slides,
  total,
  progress,
  frameW,
  frameH,
  lineColor,
  handleColor,
}: {
  slides: Slide[];
  total: number;
  progress: MotionValue<number>;
  frameW: number;
  frameH: number;
  lineColor: string;
  handleColor: string;
}) {
  const trackX = useTransform(progress, (p) => -p * (total - 1) * frameW);
  return (
    <div style={{ position: "relative", zIndex: 10, width: frameW, height: frameH }}>
      <CropFrame
        lineColor={lineColor}
        handleColor={handleColor}
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        <motion.div
          style={{ display: "flex", height: "100%", x: trackX, width: total * frameW }}
        >
          {slides.map((s) => (
            <div key={s.key} style={{ height: "100%", flex: "0 0 auto", width: frameW }}>
              {s.content}
            </div>
          ))}
        </motion.div>
      </CropFrame>
    </div>
  );
}

function Thumb({
  i,
  total,
  progress,
  slot,
  width,
  height,
  children,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  slot: number;
  width: number;
  height: number;
  children: ReactNode;
}) {
  const dist = useTransform(progress, (p) => i - p * (total - 1));
  const x = useTransform(dist, (d) => d * slot);
  const opacity = useTransform(dist, (d) => {
    const a = Math.abs(d);
    if (a < 0.5) return 0;
    return clamp(1.1 - a * 0.42, 0, 0.85);
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        overflow: "hidden",
        x,
        opacity,
        filter: "brightness(0.6)",
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
