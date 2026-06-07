import { useReducedMotion } from "framer-motion";
import type { Variants, Transition, Easing } from "framer-motion";

/* ------------------------------------------------------------------ *
 * Easing vocabulary (cubic-bezier tuples)
 * Matches the eases observed in the Oryzo recording / MOTION-SPEC.md:
 *  - text reveals & entrances  → ease-out  (fast in, decelerating settle)
 *  - section exits             → ease-in   (accelerate out)
 *  - carousel / symmetric      → ease-in-out
 * ------------------------------------------------------------------ */
export const easeOutExpo: Easing = [0.16, 1, 0.3, 1];
export const easeInExpo: Easing = [0.7, 0, 0.84, 0];
export const easeInOut: Easing = [0.65, 0, 0.35, 1];

/** Back-compat alias — existing code imports `easeOut`. */
export const easeOut: Transition["ease"] = easeOutExpo;

/* ------------------------------------------------------------------ *
 * Spring config for CTA buttons / pops (slight overshoot).
 * ------------------------------------------------------------------ */
export const springPop: Transition = {
  type: "spring",
  stiffness: 480,
  damping: 15,
  mass: 0.8,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeOutExpo } },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

/* ------------------------------------------------------------------ *
 * clipRevealLR — clip-path inset reveal left→right (for headlines/text).
 * Hidden state masks from the right edge; visible wipes the content in.
 * Compose with `blurToSharp` (nest a child span) for the "motion blur
 * resolving to sharp" headline effect from the spec.
 * ------------------------------------------------------------------ */
export const clipRevealLR: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/* ------------------------------------------------------------------ *
 * blurToSharp — filter blur(px)+opacity → blur(0)+opacity 1.
 * The leading-edge motion-blur that resolves as each glyph/word settles.
 * ------------------------------------------------------------------ */
export const blurToSharp: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/* ------------------------------------------------------------------ *
 * staggerLines — parent/child variants for multi-line copy that rises
 * (translateY up + opacity, ease-out) with a configurable stagger.
 * Returns `{ container, item }`; spread `container` on the wrapper and
 * `item` on each line.
 * ------------------------------------------------------------------ */
export function staggerLines(options?: {
  /** delay between each line (seconds) */
  stagger?: number;
  /** delay before the first line (seconds) */
  delayChildren?: number;
  /** initial downward offset (px) lines rise from */
  y?: number;
  /** per-line reveal duration (seconds) */
  duration?: number;
}): { container: Variants; item: Variants } {
  const {
    stagger = 0.12,
    delayChildren = 0.05,
    y = 28,
    duration = 0.6,
  } = options ?? {};

  return {
    container: {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren },
      },
    },
    item: {
      hidden: { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: easeOutExpo },
      },
    },
  };
}

// Generic stagger container/child (kept for back-compat).
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

// Default viewport config so reveals fire once when scrolled into view
export const inViewOnce = { once: true, amount: 0.35 } as const;

/* ------------------------------------------------------------------ *
 * useReducedMotionFlag — thin wrapper over Framer's useReducedMotion.
 * Returns a plain boolean (Framer can return null before hydration).
 *
 * GATING POLICY: any continuous/looping motion (rotating glows, idle
 * bobs) and heavy scroll-scrubbed transforms (disc rotation, scrubbed
 * clip reveals, parallax) MUST be gated behind this flag and fall back
 * to a simple fade or an instant settled state when it is true.
 * ------------------------------------------------------------------ */
export function useReducedMotionFlag(): boolean {
  return useReducedMotion() ?? false;
}
