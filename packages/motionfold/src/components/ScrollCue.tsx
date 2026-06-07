import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { DEFAULT_MUTED } from "../internal/defaults";

export interface ScrollCueProps {
  /** Caption text. Default `"SCROLL TO CONTINUE"`. Pass `null` for none. */
  label?: string | null;
  color?: string;
  /** Position the cue absolutely at the bottom-center of its parent. Default `true`. */
  absolute?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Scroll indicator with a gently bobbing chevron. */
export function ScrollCue({
  label = "SCROLL TO CONTINUE",
  color = DEFAULT_MUTED,
  absolute = true,
  className,
  style,
}: ScrollCueProps) {
  const reduced = useReducedMotionFlag();
  const position: CSSProperties = absolute
    ? {
        position: "absolute",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
      }
    : {};

  return (
    <div
      className={className}
      style={{
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
        ...position,
        ...style,
      }}
    >
      <motion.span
        animate={reduced ? undefined : { y: [0, 4, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 16,
          width: 16,
          borderRadius: 9999,
          border: `1px solid ${color}`,
        }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 2L4 5L7 2" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.span>
      {label}
    </div>
  );
}
