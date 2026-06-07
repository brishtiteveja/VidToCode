import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Section from "../components/Section";
import CorkDisc from "../components/CorkDisc";
import { isntJustACoaster } from "../lib/content";
import { useReducedMotionFlag } from "../lib/animations";

/**
 * Screen 02 — Near-black scene with the cork disc, large faint headline
 * "ISN'T JUST / A COASTER." This is the START of the continuous disc
 * "through-line": the disc rotates from oblique (rotateX ~60°) toward face-on
 * and drifts upward, scroll-driven (near-linear with an ease-out settle).
 * The headline + paragraph reveal on enter and un-reveal from the right on exit.
 */
export default function IsntJustACoaster() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionFlag();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // --- Disc through-line: oblique → face-on, drift up, slight scale-down ---
  const rotateXRaw = useTransform(scrollYProgress, [0, 0.55, 1], [60, 2, 0]);
  const yRaw = useTransform(scrollYProgress, [0, 0.6, 1], [90, -28, -8]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.05, 0.97]);
  // Ease-out settle (spring smoothing on top of the scroll scrub).
  const rotateX = useSpring(rotateXRaw, { stiffness: 70, damping: 20 });
  const y = useSpring(yRaw, { stiffness: 70, damping: 20 });
  const scale = useSpring(scaleRaw, { stiffness: 70, damping: 20 });

  // --- Headline: reveal L→R on enter, un-reveal from the RIGHT on exit ---
  // A single right-inset value covers both: 100→0 (enter wipe) then 0→100
  // (exit clip eats letters from the right edge). ease-in accelerating exit.
  const headlineRightInset = useTransform(
    scrollYProgress,
    [0, 0.16, 0.78, 0.96],
    [100, 0, 0, 100],
  );
  const headlineClip = useMotionTemplate`inset(0 ${headlineRightInset}% 0 0)`;

  // --- Paragraph: fade in on enter, fade top-line-first on exit (ease-in) ---
  const paraOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.74, 0.94],
    [0, 1, 1, 0],
  );
  const paraTopInset = useTransform(scrollYProgress, [0.74, 0.96], [0, 100]);
  const paraY = useTransform(scrollYProgress, [0, 0.18], [24, 0]);
  const paraClip = useMotionTemplate`inset(${paraTopInset}% 0 0 0)`;

  // --- Ambient warm glow brightens with scroll (linear) ---
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.12, 0.6]);

  return (
    <Section className="flex items-center justify-center bg-inkDeep">
      {/* Ambient warm glow, bottom-left */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-[80%] w-[80%]"
        style={{
          opacity: reduced ? 0.35 : glowOpacity,
          background:
            "radial-gradient(circle at 30% 70%, rgba(220,80,0,0.55) 0%, rgba(220,80,0,0.18) 38%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="relative flex w-full items-center justify-center"
        style={{ perspective: 1200 }}
      >
        {/* Big low-contrast headline behind the disc */}
        <motion.h2
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center font-display text-[12vw] font-900 leading-[0.85] tracking-tighter text-cream/[0.06]"
          style={reduced ? undefined : { clipPath: headlineClip }}
        >
          {isntJustACoaster.headline.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </motion.h2>

        <motion.div
          style={
            reduced
              ? undefined
              : { rotateX, y, scale, transformStyle: "preserve-3d" }
          }
        >
          <CorkDisc size={360} variant="bowl" />
        </motion.div>

        <motion.p
          style={
            reduced
              ? undefined
              : { opacity: paraOpacity, x: "-50%", y: paraY, clipPath: paraClip }
          }
          className="absolute bottom-16 left-1/2 max-w-md -translate-x-1/2 text-center text-sm leading-relaxed text-cream/80"
        >
          {isntJustACoaster.body}{" "}
          <span className="text-muted">{isntJustACoaster.footnote}</span>
        </motion.p>
      </div>
    </Section>
  );
}
