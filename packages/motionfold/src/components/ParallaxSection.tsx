import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";

export interface ParallaxSectionProps {
  /**
   * Total scroll height in viewport units. The section is this tall; the inner
   * stage is pinned at 100vh for the duration. Default `200`.
   */
  heightVh?: number;
  /** Background element (gradient div, image, etc.) that pans with parallax. */
  background: ReactNode;
  /**
   * How far the background translates vertically as the section scrolls.
   * `[start, end]` in CSS units. Default `["0%", "30%"]`.
   */
  parallaxRange?: [string, string];
  /**
   * Height of the background relative to the viewport.
   * Should exceed `"100%"` so the parallax has room to pan. Default `"150%"`.
   */
  backgroundHeight?: string;
  /**
   * Content-overlay opacity keyframes mapped to scroll progress `[0…1]`.
   * Four values: `[enterStart, enterEnd, exitStart, exitEnd]` → `[0, 1, 1, 0]`.
   * Default `[0, 0.1, 0.4, 0.5]` → fades in at top, fades out midway.
   */
  contentFade?: [number, number, number, number];
  /** Content rendered over the background. */
  children: ReactNode;
  /** Called with the section DOM element — useful for nav-theme registration. */
  sectionRef?: (el: HTMLElement | null) => void;
  className?: string;
  stageClassName?: string;
  style?: CSSProperties;
  stageStyle?: CSSProperties;
}

/**
 * Full-viewport sticky section with a parallax-panning background and a
 * content overlay that fades in/out with scroll progress. The signature
 * Floema section pattern: full-bleed atmospheric background, overlay text,
 * cinematic scroll transition between sections.
 *
 * Builds on the same sticky-scroll primitive as `StickyScene` but adds the
 * parallax background layer and content-fade orchestration.
 *
 * Reduced-motion: background is static, content is always visible.
 */
export function ParallaxSection({
  heightVh = 200,
  background,
  parallaxRange = ["0%", "30%"],
  backgroundHeight = "150%",
  contentFade = [0, 0.1, 0.4, 0.5],
  children,
  sectionRef: externalRef,
  className,
  stageClassName,
  style,
  stageStyle,
}: ParallaxSectionProps) {
  const reduced = useReducedMotionFlag();
  const innerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], parallaxRange);
  const contentOpacity = useTransform(
    scrollYProgress,
    contentFade,
    [0.5, 1, 1, 0],
  );

  return (
    <div
      ref={(el) => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        externalRef?.(el);
      }}
      className={className}
      style={{ position: "relative", height: `${heightVh}vh`, ...style }}
    >
      {/* Sticky viewport stage */}
      <div
        className={stageClassName}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          ...stageStyle,
        }}
      >
        {/* Parallax background */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            height: backgroundHeight,
            top: "-25%",
            y: reduced ? 0 : bgY,
          }}
        >
          {background}
        </motion.div>

        {/* Content overlay */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            opacity: reduced ? 1 : contentOpacity,
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
