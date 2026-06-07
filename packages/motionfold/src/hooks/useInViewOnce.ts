import { useRef } from "react";
import { useInView } from "framer-motion";
import type { RefObject } from "react";

export interface InViewOnceOptions {
  /** Fraction of the element that must be visible to trigger (0–1). */
  amount?: number;
  /** Root margin string, e.g. `"-10% 0px"`. */
  margin?: string;
  /** Stay `true` after the first trigger (default `true`). */
  once?: boolean;
}

/**
 * Returns a `[ref, inView]` tuple. `inView` flips to `true` when the element
 * scrolls into view. Defaults to firing once at 30% visibility — the standard
 * Motionfold entrance trigger.
 */
export function useInViewOnce<T extends Element = HTMLDivElement>(
  options: InViewOnceOptions = {},
): [RefObject<T | null>, boolean] {
  const { amount = 0.3, margin, once = true } = options;
  const ref = useRef<T>(null);
  const inView = useInView(ref, {
    amount,
    once,
    ...(margin ? { margin: margin as `${number}px` } : {}),
  });
  return [ref, inView];
}
