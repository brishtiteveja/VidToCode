import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Section from "../components/Section";
import CorkDisc from "../components/CorkDisc";
import RainbowGlowBorder from "../components/RainbowGlowBorder";
import { poweredByAi } from "../lib/content";
import {
  staggerContainer,
  clipRevealLR,
  blurToSharp,
  staggerLines,
  fadeIn,
  springPop,
  easeOutExpo,
  inViewOnce,
  useReducedMotionFlag,
} from "../lib/animations";

/**
 * Screen 03 — "Powered by AI*" with a hand holding the cork puck and a rotating
 * rainbow perimeter glow. Real hover state: hovering the product (the "TRY TO
 * HOVER HAND" hint) tilts + scales the disc and intensifies the glow.
 */

// Headline wipes left→right per word, each glyph resolving from motion-blur to
// sharp (clipRevealLR outer + blurToSharp inner).
const headlineWords = poweredByAi.headline.split(" ");

// Quick opacity + scale-in pop for the asterisk, fires after the headline.
const asteriskPop: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: easeOutExpo },
  },
};

// Hand rises up from the bottom edge, ease-out (fast then decelerating in).
const handRise: Variants = {
  hidden: { opacity: 0, y: 140 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

const tagline = staggerLines({ stagger: 0.14, y: 18 });

export default function PoweredByAi() {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotionFlag();

  return (
    <Section className="flex flex-col items-center justify-center bg-gradient-to-b from-ink2 to-inkDeep">
      <motion.h2
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="relative z-10 mt-10 text-center font-display text-[9vw] font-900 leading-none tracking-tight text-paper"
        style={hovered ? { filter: "blur(1.5px)" } : undefined}
      >
        {headlineWords.map((word) => (
          <motion.span
            key={word}
            variants={clipRevealLR}
            className="mr-[0.22em] inline-block"
          >
            <motion.span variants={blurToSharp} className="inline-block">
              {word}
            </motion.span>
          </motion.span>
        ))}
        <motion.sup variants={asteriskPop} className="inline-block text-accent">
          {poweredByAi.superscript}
        </motion.sup>
        {/* orange ORYZO mark — blur→sharp + opacity, lagging the headline */}
        <motion.span
          variants={blurToSharp}
          className="ml-3 inline-block align-super text-base font-bold tracking-eyebrow text-accent"
        >
          {poweredByAi.badge}
        </motion.span>
      </motion.h2>

      <RainbowGlowBorder active={hovered} className="relative z-10 mt-8">
        {/* Hand + disc rise into frame from below on enter, then react to hover */}
        <motion.div
          variants={handRise}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={
              hovered ? { rotate: -8, scale: 1.06 } : { rotate: 0, scale: 1 }
            }
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="cursor-pointer"
          >
            {/* APPROXIMATION: a real hand holding the disc; here just the disc with a
                soft cast shadow standing in for the hand below. */}
            <CorkDisc size={230} variant="bowl" />
            <div className="mx-auto mt-1 h-10 w-24 rounded-b-[60%] bg-gradient-to-b from-[#3a2616] to-transparent blur-md" />
          </motion.div>
        </motion.div>
      </RainbowGlowBorder>

      {!hovered && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="relative z-10 mt-4 flex items-center justify-center gap-2 text-accent"
        >
          <motion.span
            aria-hidden
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={springPop}
            className="inline-flex"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 2l16 9-7 2-3 7z" />
            </svg>
          </motion.span>
          <motion.span
            className="text-[10px] font-bold tracking-eyebrow"
            animate={reduced ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={
              reduced ? undefined : { duration: 2, repeat: Infinity }
            }
          >
            {poweredByAi.hoverHint}
          </motion.span>
        </motion.div>
      )}

      {/* Tagline — 3 lines, top→bottom stagger */}
      <motion.div
        variants={tagline.container}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="absolute bottom-16 right-10 z-10 text-right"
      >
        {poweredByAi.body.map((line) => (
          <motion.p
            key={line}
            variants={tagline.item}
            className="text-xs font-bold tracking-eyebrow text-cream"
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
      <p className="absolute bottom-6 right-10 font-mono text-[9px] tracking-eyebrow text-muted">
        {poweredByAi.footnote}
      </p>
    </Section>
  );
}
