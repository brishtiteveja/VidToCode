import { motion } from "framer-motion";
import Section from "../components/Section";
import ScrollCue from "../components/ScrollCue";
import { sustainability } from "../lib/content";
import { clipReveal, fadeUp, inViewOnce } from "../lib/animations";

/**
 * Screen 14 — Cream scene with a giant lowercase "sustainability" headline, a
 * palm-frond shadow, and the vegan joke. The headline clip-reveals on scroll.
 */
export default function Sustainability() {
  return (
    <Section className="flex flex-col items-center justify-center bg-paper text-ink">
      {/* Palm-frond shadow, top-right */}
      <div
        className="absolute right-0 top-0 h-2/3 w-2/3 opacity-[0.12]"
        style={{
          background:
            "radial-gradient(closest-side, transparent 40%, #1A120B 41% 43%, transparent 44%), conic-gradient(from 200deg at 100% 0%, #1A120B 0 8deg, transparent 8deg 22deg, #1A120B 22deg 30deg, transparent 30deg 44deg, #1A120B 44deg 52deg, transparent 52deg)",
        }}
      />

      <p className="absolute top-24 text-[11px] font-bold tracking-eyebrow text-ink">
        {sustainability.topLabel}
      </p>

      <div className="relative z-10 w-full px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="text-[11px] font-bold tracking-eyebrow text-ink"
        >
          {sustainability.eyebrow}
        </motion.p>
        <motion.h2
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="font-display text-[15vw] font-900 leading-[0.85] tracking-tighter text-ink"
        >
          {sustainability.headline}
        </motion.h2>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="relative z-10 mt-8 text-center"
      >
        {sustainability.body.map((line) => (
          <p key={line} className="text-sm font-medium text-ink">
            {line}
          </p>
        ))}
      </motion.div>

      <ScrollCue className="text-ink/60" />
    </Section>
  );
}
