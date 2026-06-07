import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { easeOutExpo, durations } from "../tokens/easings";
import { staggerContainer } from "../tokens/variants";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { motionTag, type MotionTag } from "../internal/motionTag";

export type TextRevealEffect = "blur" | "clip" | "blur-clip" | "rise";

export interface TextRevealProps {
  /** Text to reveal. Provide a `string` to enable word splitting. */
  children: ReactNode;
  as?: MotionTag;
  /** Reveal style. Default `"blur-clip"` (motion-blur resolving + wipe). */
  effect?: TextRevealEffect;
  /** Split a string child into words and stagger them. Default `false`. */
  splitWords?: boolean;
  /** Seconds between words when `splitWords`. Default `0.08`. */
  stagger?: number;
  /** Reveal duration (s). Default `durations.slow`. */
  duration?: number;
  amount?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

function buildVariant(effect: TextRevealEffect, duration: number): Variants {
  const transition = { duration, ease: easeOutExpo };
  switch (effect) {
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(12px)" },
        visible: { opacity: 1, filter: "blur(0px)", transition },
      };
    case "clip":
      return {
        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition },
      };
    case "rise":
      return {
        hidden: { opacity: 0, y: "0.6em" },
        visible: { opacity: 1, y: 0, transition },
      };
    case "blur-clip":
    default:
      return {
        hidden: { opacity: 0, filter: "blur(10px)", clipPath: "inset(0 100% 0 0)" },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          clipPath: "inset(0 0% 0 0)",
          transition,
        },
      };
  }
}

/**
 * Headline / text reveal: motion-blur resolving to sharp with a left→right clip
 * wipe (and rise). Optionally splits a string into words for a staggered,
 * kinetic entrance. Triggers in-view; respects reduced motion.
 */
export function TextReveal({
  children,
  as = "h2",
  effect = "blur-clip",
  splitWords = false,
  stagger = 0.08,
  duration = durations.slow,
  amount = 0.4,
  once = true,
  className,
  style,
}: TextRevealProps) {
  const reduced = useReducedMotionFlag();
  const [ref, inView] = useInViewOnce<HTMLElement>({ amount, once });
  const Comp = motionTag(as);
  const variant = buildVariant(effect, duration);
  const animateState = reduced || inView ? "visible" : "hidden";
  const initialState = reduced ? "visible" : "hidden";

  if (splitWords && typeof children === "string") {
    const words = children.split(/(\s+)/);
    return (
      <Comp
        ref={ref}
        className={className}
        style={style}
        variants={staggerContainer(stagger)}
        initial={initialState}
        animate={animateState}
      >
        {words.map((w, i) =>
          /\s+/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <motion.span
              key={i}
              variants={variant}
              style={{ display: "inline-block", willChange: "filter, transform" }}
            >
              {w}
            </motion.span>
          ),
        )}
      </Comp>
    );
  }

  return (
    <Comp
      ref={ref}
      className={className}
      style={style}
      variants={variant}
      initial={initialState}
      animate={animateState}
    >
      {children}
    </Comp>
  );
}
