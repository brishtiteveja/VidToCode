import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Section from "../components/Section";
import ConstructionCircle from "../components/ConstructionCircle";
import ScrollCue from "../components/ScrollCue";
import { wordmarkKinetic } from "../lib/content";
import { useReducedMotionFlag } from "../lib/animations";

/**
 * Screen 10 — Oversized low-contrast ORYZO wordmark with construction circles
 * tracing the O's. As it scrolls into view the wordmark scales up (ease-out) and
 * the dotted construction circles "resolve" (shrink down + fade) onto the type,
 * with a gentle horizontal parallax drift.
 */
export default function WordmarkKinetic() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionFlag();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  // Wordmark scales up as it enters; ease-out settle via spring smoothing.
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const scale = useSpring(scaleRaw, { stiffness: 80, damping: 22 });

  // Construction circles resolve: shrink from oversized → traced, fading in.
  const circleScale = useTransform(scrollYProgress, [0, 0.5], [1.45, 1]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <Section
      className="flex items-center justify-center"
      style={{
        background:
          "radial-gradient(120% 120% at 30% 90%, #3a2410 0%, #1a120b 55%, #0c0907 100%)",
      }}
    >
      <div ref={ref} className="absolute inset-0" aria-hidden />
      <motion.h2
        style={reduced ? undefined : { x, scale }}
        className="select-none whitespace-nowrap font-display text-[26vw] font-900 leading-none tracking-tighter text-cream/[0.07]"
      >
        {wordmarkKinetic.word}
      </motion.h2>
      {/* Construction circles tracing the two O's */}
      <motion.div
        className="absolute left-[16%] top-1/2 -translate-y-1/2"
        style={
          reduced
            ? undefined
            : { y: "-50%", scale: circleScale, opacity: circleOpacity }
        }
      >
        <ConstructionCircle size={300} />
      </motion.div>
      <motion.div
        className="absolute right-[16%] top-1/2 -translate-y-1/2"
        style={
          reduced
            ? undefined
            : { y: "-50%", scale: circleScale, opacity: circleOpacity }
        }
      >
        <ConstructionCircle size={300} nodes={false} />
      </motion.div>

      <ScrollCue label={wordmarkKinetic.scrollCue} />
    </Section>
  );
}
