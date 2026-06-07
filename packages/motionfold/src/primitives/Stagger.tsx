import type { CSSProperties, ReactNode } from "react";
import type { Variants } from "framer-motion";
import { staggerContainer, fadeUp } from "../tokens/variants";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { motionTag, type MotionTag } from "../internal/motionTag";

export interface StaggerGroupProps {
  children: ReactNode;
  as?: MotionTag;
  /** Seconds between each child. Default `0.1`. */
  stagger?: number;
  /** Seconds before the first child starts. Default `0`. */
  delayChildren?: number;
  /** Fraction visible before triggering (0–1). Default `0.3`. */
  amount?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Container that triggers a staggered entrance for its `<StaggerItem>` children
 * when scrolled into view. Children animate via Framer's variant propagation,
 * so they only need to declare their own `variants`.
 */
export function StaggerGroup({
  children,
  as = "div",
  stagger = 0.1,
  delayChildren = 0,
  amount = 0.3,
  once = true,
  className,
  style,
}: StaggerGroupProps) {
  const reduced = useReducedMotionFlag();
  const [ref, inView] = useInViewOnce<HTMLElement>({ amount, once });
  const Comp = motionTag(as);

  return (
    <Comp
      ref={ref}
      className={className}
      style={style}
      variants={staggerContainer(stagger, delayChildren)}
      initial={reduced ? "visible" : "hidden"}
      animate={reduced || inView ? "visible" : "hidden"}
    >
      {children}
    </Comp>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  as?: MotionTag;
  /** Per-item variant. Default `fadeUp`. */
  variant?: Variants;
  className?: string;
  style?: CSSProperties;
}

/**
 * A single staggered child. Place inside a `<StaggerGroup>`; its `hidden`/
 * `visible` states are driven by the parent's animation via variant
 * propagation (no `initial`/`animate` needed here).
 */
export function StaggerItem({
  children,
  as = "div",
  variant = fadeUp,
  className,
  style,
}: StaggerItemProps) {
  const Comp = motionTag(as);
  return (
    <Comp className={className} style={style} variants={variant}>
      {children}
    </Comp>
  );
}
