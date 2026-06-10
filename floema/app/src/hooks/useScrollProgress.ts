import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

interface ScrollProgressOptions {
  target: RefObject<HTMLElement | null>;
  offset?: [string, string];
}

export function useScrollProgress({ target, offset }: ScrollProgressOptions) {
  const { scrollYProgress } = useScroll({
    target: target,
    offset: (offset as any) || ["start start", "end start"],
  });

  return scrollYProgress;
}

export function useParallax(
  scrollYProgress: MotionValue<number>,
  range: [number, number] = [-15, 15]
) {
  return useTransform(scrollYProgress, [0, 1], [`${range[0]}%`, `${range[1]}%`]);
}
