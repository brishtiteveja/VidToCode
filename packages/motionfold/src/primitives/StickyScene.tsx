import type { CSSProperties, ReactNode } from "react";
import type { MotionValue } from "framer-motion";
import { useScrubbedProgress, type ScrollOffset } from "../hooks/useScrubbedProgress";

export interface StickySceneProps {
  /** Total scroll length of the scene, in viewport heights. Default `240`. */
  heightVh?: number;
  /** Scroll offset pair forwarded to the scrubbed-progress hook. */
  offset?: ScrollOffset;
  /** Render-prop receiving a 0→1 progress MotionValue for the pinned stage. */
  children: (progress: MotionValue<number>) => ReactNode;
  className?: string;
  style?: CSSProperties;
  stageClassName?: string;
  stageStyle?: CSSProperties;
}

/**
 * Pins an inner stage for the duration of a tall scroll spacer and exposes a
 * 0→1 scrub `progress` to its children. The building block for scrollytelling
 * scenes (`ShrinkToAnchor`, `FramedSlider`, `MagnifyCarousel` all use it).
 */
export function StickyScene({
  heightVh = 240,
  offset,
  children,
  className,
  style,
  stageClassName,
  stageStyle,
}: StickySceneProps) {
  const { ref, progress } = useScrubbedProgress<HTMLDivElement>(
    offset ? { offset } : {},
  );

  return (
    <section
      ref={ref}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: `${heightVh}vh`,
        ...style,
      }}
    >
      <div
        className={stageClassName}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...stageStyle,
        }}
      >
        {children(progress)}
      </div>
    </section>
  );
}
