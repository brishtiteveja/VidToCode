import { type CSSProperties, type ReactNode, useId } from "react";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";

export interface DepthTunnelItem {
  /** Unique key. */
  id: string | number;
  /** Horizontal position as percentage (0–100). */
  x: number;
  /** Vertical position as percentage (0–100). */
  y: number;
}

export interface DepthTunnelProps<T extends DepthTunnelItem = DepthTunnelItem> {
  /** Items to stream through the tunnel. */
  items: T[];
  /**
   * Full cycle duration in seconds. Each item is staggered evenly across
   * this period so there's always a steady stream. Default `7`.
   */
  cycleDuration?: number;
  /**
   * How far back (in px) items start in Z-space.
   * Higher = longer tunnel. Default `3500`.
   */
  depthStart?: number;
  /**
   * How far forward (past the viewer) items travel before looping.
   * Default `500`.
   */
  depthEnd?: number;
  /** Scale at the far end of the tunnel. Default `0.04`. */
  scaleStart?: number;
  /** Scale as items pass the viewer. Default `1.35`. */
  scaleEnd?: number;
  /** CSS perspective on the container in px. Default `1200`. */
  perspective?: number;
  /**
   * Start with the stream already mid-flight (negative animation delays)
   * instead of building up over the first cycle. Default `false`.
   */
  prefill?: boolean;
  /** Render each item. */
  children: (item: T, index: number) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Continuous depth tunnel. Items stream from a central vanishing point toward
 * the viewer in an infinite loop — like flying through a starfield of cards.
 *
 * Uses CSS `perspective` + `translateZ` keyframe animation for true 3D
 * convergence. Items are positioned at their `(x%, y%)` coordinates, but
 * at deep Z they converge to the vanishing point, spreading outward as they
 * approach `Z = 0`.
 *
 * Items are staggered evenly across the cycle so 3–5 are always visible.
 *
 * Reduced-motion: items render at their resting positions with no animation.
 */
export function DepthTunnel<T extends DepthTunnelItem = DepthTunnelItem>({
  items,
  cycleDuration = 7,
  depthStart = 3500,
  depthEnd = 500,
  scaleStart = 0.04,
  scaleEnd = 1.35,
  perspective = 1200,
  prefill = false,
  children,
  className,
  style,
}: DepthTunnelProps<T>) {
  const reduced = useReducedMotionFlag();
  const uid = useId().replace(/:/g, "");
  const animName = `mf-depth-${uid}`;

  return (
    <>
      {!reduced && (
        <style>{`
          @keyframes ${animName} {
            0% { transform: translateZ(-${depthStart}px) scale(${scaleStart}); opacity: 0; }
            8% { opacity: 0.3; }
            25% { opacity: 0.7; }
            55% { opacity: 1; }
            85% { opacity: 0.6; }
            100% { transform: translateZ(${depthEnd}px) scale(${scaleEnd}); opacity: 0; }
          }
        `}</style>
      )}
      <div
        className={className}
        style={{
          position: "relative",
          overflow: "hidden",
          pointerEvents: "none",
          perspective,
          perspectiveOrigin: "50% 50%",
          ...style,
        }}
      >
        {items.map((item, i) => {
          const delay = (i / items.length) * cycleDuration - (prefill ? cycleDuration : 0);
          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                left: `${item.x}%`,
                top: `${item.y}%`,
                transformStyle: "preserve-3d",
                animation: reduced
                  ? "none"
                  : `${animName} ${cycleDuration}s linear ${delay}s infinite both`,
                willChange: reduced ? undefined : "transform, opacity",
              }}
            >
              {children(item, i)}
            </div>
          );
        })}
      </div>
    </>
  );
}
