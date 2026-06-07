import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { easeInOutSoft } from "../tokens/easings";
import { DEFAULT_GLOW_COLORS } from "../internal/defaults";

export interface GlowBorderProps {
  children: ReactNode;
  /** Drive the glow on/off. Default `true`. */
  active?: boolean;
  /** Conic-gradient color stops. Default rainbow. */
  colors?: string[];
  /** Blur radius (px) of the halo. Default `48`. */
  blur?: number;
  /** Rotation period (s) when active. Default `6`. */
  duration?: number;
  /** Halo opacity when active. Default `0.55`. */
  opacity?: number;
  /** Outset of the halo behind the content (px). Default `24`. */
  inset?: number;
  borderRadius?: number | string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Rotating conic-gradient perimeter glow behind arbitrary content. The
 * continuous rotation is gated behind reduced motion (then it holds still and
 * only fades).
 */
export function GlowBorder({
  children,
  active = true,
  colors = DEFAULT_GLOW_COLORS,
  blur = 48,
  duration = 6,
  opacity = 0.55,
  inset = 24,
  borderRadius = 40,
  className,
  style,
}: GlowBorderProps) {
  const reduced = useReducedMotionFlag();
  const gradient = `conic-gradient(from 0deg, ${colors.join(", ")})`;

  return (
    <div
      className={className}
      style={{ position: "relative", ...style }}
    >
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: -inset,
          overflow: "hidden",
          borderRadius,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            height: "160%",
            width: "160%",
            translateX: "-50%",
            translateY: "-50%",
            background: gradient,
            filter: `blur(${blur}px)`,
          }}
          animate={
            active && !reduced
              ? { rotate: 360, opacity }
              : { rotate: 0, opacity: active ? opacity * 0.9 : 0 }
          }
          transition={{
            rotate: { duration, ease: "linear", repeat: Infinity },
            opacity: { duration: 0.6, ease: easeInOutSoft },
          }}
        />
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}
