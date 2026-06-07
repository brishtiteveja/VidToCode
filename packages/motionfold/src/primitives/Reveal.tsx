import type { CSSProperties, ReactNode } from "react";
import type { Variants } from "framer-motion";
import { fadeUp } from "../tokens/variants";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { motionTag, type MotionTag } from "../internal/motionTag";

export interface RevealProps {
  children: ReactNode;
  /** Element tag to render. Default `"div"`. */
  as?: MotionTag;
  /** Entrance variant (must expose `hidden`/`visible`). Default `fadeUp`. */
  variant?: Variants;
  /** Fraction visible before triggering (0–1). Default `0.3`. */
  amount?: number;
  /** Stay revealed after the first trigger. Default `true`. */
  once?: boolean;
  /** Optional delay (seconds) before the entrance. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Reveals its children with a Framer variant when scrolled into view.
 * Respects reduced motion by rendering the settled state immediately.
 */
export function Reveal({
  children,
  as = "div",
  variant = fadeUp,
  amount = 0.3,
  once = true,
  delay,
  className,
  style,
}: RevealProps) {
  const reduced = useReducedMotionFlag();
  const [ref, inView] = useInViewOnce<HTMLElement>({ amount, once });
  const Comp = motionTag(as);

  return (
    <Comp
      ref={ref}
      className={className}
      style={style}
      variants={variant}
      initial={reduced ? "visible" : "hidden"}
      animate={reduced || inView ? "visible" : "hidden"}
      transition={delay != null ? { delay } : undefined}
    >
      {children}
    </Comp>
  );
}
