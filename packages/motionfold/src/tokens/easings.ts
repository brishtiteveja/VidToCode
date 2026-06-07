import type { Easing } from "framer-motion";

/**
 * Cubic-bezier easing curves used across Motionfold.
 * Tuples are typed as `Easing` so they can be passed directly to
 * Framer Motion transitions.
 */
export const easeOutExpo: Easing = [0.16, 1, 0.3, 1];
export const easeInExpo: Easing = [0.7, 0, 0.84, 0];
export const easeInOutExpo: Easing = [0.87, 0, 0.13, 1];
export const easeOutQuint: Easing = [0.22, 1, 0.36, 1];
export const easeInOutSoft: Easing = [0.45, 0, 0.55, 1];
export const easeOutBack: Easing = [0.34, 1.56, 0.64, 1];

export const easings = {
  outExpo: easeOutExpo,
  inExpo: easeInExpo,
  inOutExpo: easeInOutExpo,
  outQuint: easeOutQuint,
  inOutSoft: easeInOutSoft,
  outBack: easeOutBack,
} as const;

export type EasingName = keyof typeof easings;

/** Common duration scale (seconds). */
export const durations = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.4,
} as const;

export type DurationName = keyof typeof durations;
