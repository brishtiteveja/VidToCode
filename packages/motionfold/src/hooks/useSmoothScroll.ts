import { useEffect, useRef } from "react";

export interface SmoothScrollOptions {
  /** Scroll duration multiplier (seconds). Default `1.2`. */
  duration?: number;
  /** Easing function mapping `t ∈ [0,1]` to progress. Default: exponential ease-out. */
  easing?: (t: number) => number;
  /** Enable smooth mouse-wheel scrolling. Default `true`. */
  smoothWheel?: boolean;
}

const defaultEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Initializes Lenis smooth scroll on mount and tears it down on unmount.
 * Lenis is loaded via dynamic `import("lenis")` — install it as a peer dep
 * (`npm i lenis`) or the hook silently no-ops.
 *
 * Returns a ref to the Lenis instance (or null if not yet loaded / unavailable).
 *
 * ```tsx
 * const lenis = useSmoothScroll({ duration: 1.2 });
 * ```
 */
export function useSmoothScroll(options?: SmoothScrollOptions) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let destroyed = false;
    let rafId: number;

    import("lenis")
      .then((mod) => {
        if (destroyed) return;
        const Lenis = mod.default ?? mod;
        const lenis = new Lenis({
          duration: options?.duration ?? 1.2,
          easing: options?.easing ?? defaultEasing,
          smoothWheel: options?.smoothWheel ?? true,
        });
        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      })
      .catch(() => {
        // lenis not installed — hook is a no-op
      });

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [options?.duration, options?.easing, options?.smoothWheel]);

  return lenisRef;
}
