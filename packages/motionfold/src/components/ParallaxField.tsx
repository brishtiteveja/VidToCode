import type { CSSProperties, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";

export interface ParallaxFieldItem {
  /** Unique key for the item. */
  id: string | number;
  /** Horizontal position as a percentage (0–100). */
  x: number;
  /** Vertical position as a percentage (0–100). */
  y: number;
  /** Depth layer index. 0 = farthest / slowest, higher = nearer / faster. */
  layer: number;
}

export interface ParallaxFieldProps<T extends ParallaxFieldItem = ParallaxFieldItem> {
  /** Array of items to scatter across the field. */
  items: T[];
  /**
   * Pixels of scroll offset per layer index.
   * A layer-2 item moves `2 × layerSpeed` px over the scroll range.
   * Default `50`.
   */
  layerSpeed?: number;
  /** Scroll Y range `[start, end]` in px over which the parallax runs. Default `[0, 1000]`. */
  scrollRange?: [number, number];
  /** Fade items toward transparent as they scroll out of view. Default `true`. */
  fade?: boolean;
  /** Render each item. Return whatever should appear at its position. */
  children: (item: T, index: number) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

function FieldItem<T extends ParallaxFieldItem>({
  item,
  index,
  layerSpeed,
  scrollRange,
  fade,
  render,
}: {
  item: T;
  index: number;
  layerSpeed: number;
  scrollRange: [number, number];
  fade: boolean;
  render: (item: T, index: number) => ReactNode;
}) {
  const reduced = useReducedMotionFlag();
  const { scrollY } = useScroll();
  const speed = item.layer * layerSpeed;
  const y = useTransform(scrollY, scrollRange, [0, -speed]);
  const opacity = useTransform(
    scrollY,
    [scrollRange[0], scrollRange[1] * 0.6, scrollRange[1]],
    [1, fade ? 0.6 : 1, fade ? 0 : 1],
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${item.x}%`,
        top: `${item.y}%`,
        y: reduced ? 0 : y,
        opacity: reduced ? 1 : opacity,
        willChange: "transform",
      }}
    >
      {render(item, index)}
    </motion.div>
  );
}

/**
 * Scatters items across a container at multiple depth layers. Each layer
 * scrolls at a different speed, creating a multi-plane parallax constellation.
 * Inspired by the Floema hero's floating product thumbnails.
 *
 * Items are positioned with absolute `%` coordinates; the container should
 * be `position: relative` (applied automatically). The render-prop receives
 * each item so consumers control the visual (images, cards, colored blocks).
 *
 * Reduced-motion: items render at their base positions with no scroll offset.
 */
export function ParallaxField<T extends ParallaxFieldItem = ParallaxFieldItem>({
  items,
  layerSpeed = 50,
  scrollRange = [0, 1000],
  fade = true,
  children,
  className,
  style,
}: ParallaxFieldProps<T>) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <FieldItem
          key={item.id}
          item={item}
          index={i}
          layerSpeed={layerSpeed}
          scrollRange={scrollRange}
          fade={fade}
          render={children}
        />
      ))}
    </div>
  );
}
