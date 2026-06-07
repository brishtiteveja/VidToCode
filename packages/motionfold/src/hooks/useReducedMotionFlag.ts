import { useReducedMotion } from "framer-motion";

/**
 * Thin, SSR-safe wrapper over Framer Motion's `useReducedMotion`.
 *
 * Returns `true` when the user has requested reduced motion. Components should
 * branch on this to render a static (or minimal) fallback. Returns `false`
 * during SSR / before the media query resolves, so the default is full motion.
 */
export function useReducedMotionFlag(): boolean {
  return useReducedMotion() ?? false;
}
