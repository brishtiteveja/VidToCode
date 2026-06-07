import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DottedFrame from "./DottedFrame";
import ScrollCue from "./ScrollCue";
import { useReducedMotionFlag } from "../lib/animations";

export type Slide = { key: string; content: ReactNode };

type Props = {
  slides: Slide[];
  eyebrow?: string;
  title?: ReactNode;
  className?: string;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/**
 * Scroll-scrubbed fixed-frame picture slider (Oryzo "it's wearable" lookbook).
 *
 * A tall spacer pins an inner stage with a FIXED centre frame (dashed crop box)
 * that never moves or resizes. As the user scrolls, a horizontal track of
 * full-size picture panels slides right→left THROUGH that frame: each picture
 * enters from the frame's right edge at full size, fills it, then exits left as
 * the next slides in (a hard-seam slide, no scaling). Small dimmed thumbnails of
 * the same pictures flank the frame as a parallax filmstrip, so each picture is
 * "big inside the frame, small outside it". Strictly 1:1 scroll-linked /
 * reversible — no autoplay.
 *
 * Reduced motion: a plain horizontal scroll strip.
 */
export default function FeaturedSlider({
  slides,
  eyebrow,
  title,
  className = "",
}: Props) {
  const reduced = useReducedMotionFlag();
  const total = slides.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1280, h: 800 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      const el = stageRef.current;
      if (el) setDims({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Fixed frame geometry + flanking thumbnail metrics, derived from the stage.
  const frameW = Math.min(dims.w * 0.34, 420);
  const frameH = Math.min(dims.h * 0.8, 560);
  const thumbW = frameW * 0.34;
  const thumbH = frameH * 0.34;
  const thumbSlot = frameW * 0.72; // spacing between flanking thumbnails

  // Track offset: slides one full panel-width per step so panel i centres in the
  // frame at scroll fraction i/(total-1).
  const trackX = useTransform(
    scrollYProgress,
    (p) => -p * (total - 1) * frameW,
  );

  if (reduced) {
    return (
      <section className={`relative w-full bg-inkDeep py-24 ${className}`}>
        <Header eyebrow={eyebrow} title={title} />
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 md:px-10">
          {slides.map((s) => (
            <div
              key={s.key}
              className="h-[440px] w-[300px] shrink-0 snap-center"
            >
              <DottedFrame handle className="h-full w-full overflow-hidden">
                {s.content}
              </DottedFrame>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-inkDeep ${className}`}
      style={{ height: `${Math.max(total * 80, 240)}vh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <Header eyebrow={eyebrow} title={title} pinned />

        {/* Flanking thumbnail filmstrip (behind the frame) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {slides.map((s, i) => (
            <Thumb
              key={s.key}
              i={i}
              total={total}
              progress={scrollYProgress}
              slot={thumbSlot}
              width={thumbW}
              height={thumbH}
            >
              {s.content}
            </Thumb>
          ))}
        </div>

        {/* FIXED centre frame — never moves or scales; panels slide through it */}
        <div
          className="relative z-10"
          style={{ width: frameW, height: frameH }}
        >
          <DottedFrame handle className="h-full w-full overflow-hidden">
            <motion.div
              className="flex h-full"
              style={{ x: trackX, width: total * frameW }}
            >
              {slides.map((s) => (
                <div
                  key={s.key}
                  className="h-full shrink-0"
                  style={{ width: frameW }}
                >
                  {s.content}
                </div>
              ))}
            </motion.div>
          </DottedFrame>
        </div>

        <ScrollCue />
      </div>
    </section>
  );
}

/** Small dimmed thumbnail that scrolls past the fixed frame (parallax strip). */
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
  progress: import("framer-motion").MotionValue<number>;
  slot: number;
  width: number;
  height: number;
  children: ReactNode;
}) {
  const dist = useTransform(progress, (p) => i - p * (total - 1));
  const x = useTransform(dist, (d) => d * slot);
  // hide the one sitting behind the frame and fully-exited ones
  const opacity = useTransform(dist, (d) => {
    const a = Math.abs(d);
    if (a < 0.5) return 0;
    return clamp(1.1 - a * 0.42, 0, 0.85);
  });
  const filter = useTransform(dist, () => "brightness(0.6)");

  return (
    <motion.div
      style={{
        x,
        opacity,
        filter,
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
      }}
      className="absolute left-1/2 top-1/2 overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

function Header({
  eyebrow,
  title,
  pinned = false,
}: {
  eyebrow?: string;
  title?: ReactNode;
  pinned?: boolean;
}) {
  if (!eyebrow && !title) return null;
  return (
    <div
      className={
        pinned
          ? "absolute left-[4vw] top-[14vh] z-[300] select-none"
          : "mb-8 px-8 md:px-10"
      }
    >
      {eyebrow && (
        <p className="text-xs font-bold tracking-eyebrow text-cream/70">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-display text-3xl font-800 text-cream">{title}</h2>
      )}
    </div>
  );
}
