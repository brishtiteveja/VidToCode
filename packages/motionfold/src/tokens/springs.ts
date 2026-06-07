import type { Transition } from "framer-motion";

/** Snappy "pop" spring used for badges, cues, and small reveals. */
export const springPop: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
  mass: 0.8,
};

/** Soft, weighty spring for larger panels and hero objects. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 24,
  mass: 1,
};

/** Tight, low-overshoot spring for UI affordances (handles, toggles). */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 700,
  damping: 40,
  mass: 0.6,
};

export const springs = {
  pop: springPop,
  soft: springSoft,
  snappy: springSnappy,
} as const;

export type SpringName = keyof typeof springs;
