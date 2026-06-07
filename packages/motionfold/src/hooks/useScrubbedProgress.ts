import { useRef } from "react";
import { useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { RefObject } from "react";

/**
 * Framer Motion scroll offset pair. See the `useScroll` docs for the full
 * grammar (e.g. `"start end"`, `"center center"`, `"end start"`).
 */
export type ScrollOffset = [string, string];

export interface ScrubbedProgressOptions {
  /**
   * When the scrub starts and ends, relative to the target and viewport.
   * Defaults to `["start start", "end end"]` — progress runs 0→1 while the
   * target is pinned/scrolling through the viewport.
   */
  offset?: ScrollOffset;
}

/**
 * Attach `ref` to a tall section, then drive transforms from `progress`
 * (a `0→1` MotionValue) for scroll-scrubbed scrollytelling.
 */
export function useScrubbedProgress<T extends HTMLElement = HTMLElement>(
  options: ScrubbedProgressOptions = {},
): { ref: RefObject<T | null>; progress: MotionValue<number> } {
  const { offset = ["start start", "end end"] } = options;
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Cast: Framer types `offset` as a template-literal union; we accept the
    // looser string tuple for ergonomics.
    offset: offset as never,
  });
  return { ref, progress: scrollYProgress };
}
