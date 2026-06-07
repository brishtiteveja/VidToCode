import type { Variants } from "framer-motion";
import { easeOutExpo, durations } from "./easings";

/** Fade + rise. The workhorse entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easeOutExpo },
  },
};

/** Plain opacity fade. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.base, ease: easeOutExpo },
  },
};

/** Scale-up reveal from slightly shrunk. */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.base, ease: easeOutExpo },
  },
};

/** Wipe in from the left via clip-path. */
export const clipRevealLR: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: durations.slow, ease: easeOutExpo },
  },
};

/** Blur-to-sharp focus pull. */
export const blurToSharp: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: durations.slow, ease: easeOutExpo },
  },
};

/**
 * Parent container that staggers its children.
 * @param stagger seconds between each child
 * @param delayChildren seconds before the first child starts
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Alias kept for line-by-line text reveals. */
export const staggerLines = staggerContainer;

/** Standard `whileInView` viewport config: fire once, when ~30% visible. */
export const inViewOnce = { once: true, amount: 0.3 } as const;
