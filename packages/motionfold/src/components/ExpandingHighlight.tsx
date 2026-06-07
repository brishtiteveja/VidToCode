import type { CSSProperties, ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import { useScrubbedProgress, type ScrollOffset } from "../hooks/useScrubbedProgress";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";

export interface ExpandingHighlightProps {
  children: ReactNode;
  /** Glow color. Default a deep electric blue. */
  color?: string;
  /** Ellipse width (CSS length). Default `"68%"`. */
  width?: string | number;
  /** Ellipse height (CSS length). Default `"48%"`. */
  height?: string | number;
  /** Tilt of the ellipse in degrees. Default `-28`. */
  tilt?: number;
  /** Blur radius (px). Default `70`. */
  blur?: number;
  /** Scale at scene entry. Default `0.35`. */
  fromScale?: number;
  /** Scale at scene center/exit. Default `1.1`. */
  toScale?: number;
  /** Peak opacity. Default `0.85`. */
  maxOpacity?: number;
  /** Outer transparent stop of the radial gradient (%). Default `60`. */
  spread?: number;
  /** Center of the glow. Default `{ x: "50%", y: "50%" }`. */
  position?: { x: string; y: string };
  /** Render the glow behind (default) or in front of the content. */
  behind?: boolean;
  /** Scroll offset pair. Default `["start end", "end start"]`. */
  offset?: ScrollOffset;
  className?: string;
  style?: CSSProperties;
}

/**
 * A tilted elliptical glow that expands outward as the section scrolls through
 * the viewport — the WGB "oval expansion highlight on scroll", generalized.
 * Wrap any content; the glow scrubs from small/faint to large/bright behind
 * (or over) it. Reduced motion renders the settled glow.
 */
export function ExpandingHighlight({
  children,
  color = "#1e3aff",
  width = "68%",
  height = "48%",
  tilt = -28,
  blur = 70,
  fromScale = 0.35,
  toScale = 1.1,
  maxOpacity = 0.85,
  spread = 60,
  position = { x: "50%", y: "50%" },
  behind = true,
  offset,
  className,
  style,
}: ExpandingHighlightProps) {
  const reduced = useReducedMotionFlag();
  const { ref, progress } = useScrubbedProgress<HTMLDivElement>({
    offset: offset ?? ["start end", "end start"],
  });

  const scale = useTransform(progress, [0, 0.6, 1], [fromScale, toScale, toScale]);
  const opacity = useTransform(
    progress,
    [0, 0.2, 0.5, 1],
    [0, maxOpacity * 0.6, maxOpacity, maxOpacity],
  );

  const gradient = `radial-gradient(ellipse at center, ${color} 0%, ${color} ${spread * 0.4}%, rgba(0,0,0,0) ${spread}%)`;

  const glowStatic: CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    width,
    height,
    borderRadius: "50%",
    background: gradient,
    filter: `blur(${blur}px)`,
    pointerEvents: "none",
    zIndex: behind ? 0 : 2,
  };

  return (
    <div ref={ref} className={className} style={{ position: "relative", ...style }}>
      {reduced ? (
        <div
          aria-hidden
          style={{
            ...glowStatic,
            transform: `translate(-50%, -50%) rotate(${tilt}deg) scale(${toScale})`,
            opacity: maxOpacity,
          }}
        />
      ) : (
        <motion.div
          aria-hidden
          style={{
            ...glowStatic,
            x: "-50%",
            y: "-50%",
            rotate: tilt,
            scale,
            opacity,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: behind ? 1 : 0 }}>{children}</div>
    </div>
  );
}
