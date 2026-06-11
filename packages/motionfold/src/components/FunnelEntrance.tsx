import { type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "../tokens/easings";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";

export interface FunnelEntranceItem {
  /** Unique key. */
  id: string | number;
  /** Final horizontal position as percentage (0–100). */
  x: number;
  /** Final vertical position as percentage (0–100). */
  y: number;
  /** Depth layer (0 = farthest, higher = nearer). Affects Z start and delay. */
  layer: number;
}

export interface FunnelEntranceProps<T extends FunnelEntranceItem = FunnelEntranceItem> {
  /** Items that fly in from depth and settle at their positions. */
  items: T[];
  /**
   * Whether the entrance has triggered. Items stay hidden until `true`.
   * Typically tied to a preloader completion. Default `true`.
   */
  active?: boolean;
  /** Base duration of the fly-in animation in seconds. Default `2.2`. */
  duration?: number;
  /** Base delay before the first item starts. Default `0.6`. */
  delay?: number;
  /** Per-item stagger in seconds. Default `0.035`. */
  stagger?: number;
  /** How far back in Z items start. Default `2500`. */
  depthBase?: number;
  /** Additional Z per layer index. Default `400`. */
  depthPerLayer?: number;
  /** Initial scale. Default `0.15`. */
  scaleStart?: number;
  /** CSS perspective on the container in px. Default `1200`. */
  perspective?: number;
  /** Render each item. */
  children: (item: T, index: number) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * One-time funnel entrance. Items fly from a central vanishing point toward
 * the viewer and **settle** at their final scattered positions. The "warp
 * arrival" effect: like dropping out of hyperspace into a constellation.
 *
 * Uses CSS `perspective` + Framer Motion `z` (translateZ) for real 3D
 * convergence. Deeper layers start farther back and arrive slightly later.
 *
 * After settling, items are static at their `(x%, y%)` positions — compose
 * with `ParallaxField` or scroll transforms for post-entrance behavior.
 *
 * Reduced-motion: items render at their final positions immediately.
 */
export function FunnelEntrance<T extends FunnelEntranceItem = FunnelEntranceItem>({
  items,
  active = true,
  duration = 2.2,
  delay: baseDelay = 0.6,
  stagger = 0.035,
  depthBase = 2500,
  depthPerLayer = 400,
  scaleStart = 0.15,
  perspective = 1200,
  children,
  className,
  style,
}: FunnelEntranceProps<T>) {
  const reduced = useReducedMotionFlag();

  if (!active && !reduced) return null;

  return (
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
        const zStart = -(depthBase + item.layer * depthPerLayer);
        const itemDelay = baseDelay + (3 - item.layer) * 0.12 + i * stagger;

        return (
          <motion.div
            key={item.id}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              transformStyle: "preserve-3d",
            }}
            initial={
              reduced
                ? false
                : { z: zStart, opacity: 0, scale: scaleStart }
            }
            animate={{ z: 0, opacity: 1, scale: 1 }}
            transition={{
              z: { duration, delay: itemDelay, ease: easeOutExpo as unknown as [number, number, number, number] },
              scale: {
                duration: duration * 0.9,
                delay: itemDelay,
                ease: easeOutExpo as unknown as [number, number, number, number],
              },
              opacity: {
                duration: duration * 0.45,
                delay: itemDelay,
                ease: easeOutExpo as unknown as [number, number, number, number],
              },
            }}
          >
            {children(item, i)}
          </motion.div>
        );
      })}
    </div>
  );
}
