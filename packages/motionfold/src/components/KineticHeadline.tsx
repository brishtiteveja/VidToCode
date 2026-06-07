import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { motionTag, type MotionTag } from "../internal/motionTag";

export interface KineticHeadlineProps {
  children: ReactNode;
  as?: MotionTag;
  /** Scale at scene entry → exit. Default `[0.8, 1]`. */
  scaleRange?: [number, number];
  /** Horizontal parallax drift across the scene, e.g. `["8%", "-8%"]`. */
  parallaxX?: [string, string];
  className?: string;
  style?: CSSProperties;
}

/**
 * Oversized wordmark that scales up and parallax-drifts as it scrolls through
 * the viewport — the "kinetic ORYZO" treatment, generalized. Reduced motion
 * renders it static.
 */
export function KineticHeadline({
  children,
  as = "h2",
  scaleRange = [0.8, 1],
  parallaxX = ["8%", "-8%"],
  className,
  style,
}: KineticHeadlineProps) {
  const reduced = useReducedMotionFlag();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], parallaxX);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5], scaleRange);
  const scale = useSpring(scaleRaw, { stiffness: 80, damping: 22 });
  const Comp = motionTag(as);

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center" }}>
      <Comp
        className={className}
        style={{
          margin: 0,
          userSelect: "none",
          whiteSpace: "nowrap",
          willChange: "transform",
          ...(reduced ? {} : { x, scale }),
          ...style,
        }}
      >
        {children}
      </Comp>
    </div>
  );
}
