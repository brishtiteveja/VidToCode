import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../components/Section";
import ScrollCue from "../components/ScrollCue";
import { corkBarkSplit } from "../lib/content";

/**
 * Screen 13 — Macro cork-bark texture split-reveal: two halves translate apart
 * along a torn seam as the scene scrolls (useScroll + useTransform).
 * APPROXIMATION: the photographic bark macro is a layered brown gradient texture.
 */
export default function CorkBarkSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const topY = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-40%"]);
  const bottomY = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "40%"]);

  const barkStyle = {
    background:
      "radial-gradient(120% 80% at 50% 50%, #9a6a3a 0%, #5a3b1f 45%, #2a1a0d 100%)",
    backgroundImage:
      "repeating-linear-gradient(80deg, rgba(0,0,0,0.25) 0 3px, transparent 3px 9px), repeating-linear-gradient(100deg, rgba(255,220,170,0.08) 0 2px, transparent 2px 7px)",
  } as const;

  return (
    <Section className="relative bg-inkDeep">
      <div ref={ref} className="absolute inset-0" aria-hidden />
      <div className="relative h-screen w-full overflow-hidden">
        {/* Top bark half */}
        <motion.div
          style={{ ...barkStyle, y: topY }}
          className="absolute inset-x-0 top-0 h-[55%]"
        >
          {/* Torn seam edge */}
          <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-b from-transparent to-thermalHot/40" />
        </motion.div>
        {/* Bottom bark half */}
        <motion.div
          style={{ ...barkStyle, y: bottomY }}
          className="absolute inset-x-0 bottom-0 h-[55%]"
        >
          <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-t from-transparent to-thermalHot/40" />
        </motion.div>

        <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-xs font-bold tracking-eyebrow text-paper/80">
          {corkBarkSplit.eyebrow}
        </p>
      </div>

      <ScrollCue label={corkBarkSplit.scrollCue} />
    </Section>
  );
}
