import type { CSSProperties, ReactNode } from "react";
import {
  motion,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { StickyScene } from "../primitives/StickyScene";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import { DEFAULT_MUTED } from "../internal/defaults";

export interface ShrinkToAnchorProps {
  /** The headline that relocates from giant → small label. */
  headline: ReactNode;
  /** Optional eyebrow shown above the resting headline. */
  eyebrow?: ReactNode;
  /** Scroll length of the scene (vh). Default `260`. */
  heightVh?: number;
  /** Starting scale of the headline. Default `6`. */
  fromScale?: number;
  /** Resting scale. Default `1`. */
  toScale?: number;
  /** Initial downward offset (px) the block rises from. Default `200`. */
  fromY?: number;
  /** CSS position for the anchored (resting) block. */
  anchor?: { left?: string; top?: string; right?: string; bottom?: string };
  eyebrowColor?: string;
  /**
   * Extra scene content rendered behind the headline, receiving the scrub
   * progress so callers can choreograph their own props alongside the relocate.
   */
  children?: (progress: MotionValue<number>) => ReactNode;
  className?: string;
  style?: CSSProperties;
  headlineClassName?: string;
  headlineStyle?: CSSProperties;
}

/**
 * The signature "big → small relocating headline": a giant headline anchored at
 * a corner that scrubs down in scale (ease-out) and rises into a small resting
 * label as you scroll. The transform-origin sits at the anchor, so the words
 * contract *into* their final position. Reduced motion shows the settled label.
 */
export function ShrinkToAnchor({
  headline,
  eyebrow,
  heightVh = 260,
  fromScale = 6,
  toScale = 1,
  fromY = 200,
  anchor = { left: "4vw", top: "26vh" },
  eyebrowColor = DEFAULT_MUTED,
  children,
  className,
  style,
  headlineClassName,
  headlineStyle,
}: ShrinkToAnchorProps) {
  const reduced = useReducedMotionFlag();

  const eyebrowNode = eyebrow ? (
    <p
      style={{
        margin: "0 0 0.15em",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: eyebrowColor,
      }}
    >
      {eyebrow}
    </p>
  ) : null;

  if (reduced) {
    return (
      <section
        className={className}
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            userSelect: "none",
            ...anchor,
          }}
        >
          {eyebrowNode}
          <div className={headlineClassName} style={headlineStyle}>
            {headline}
          </div>
        </div>
      </section>
    );
  }

  return (
    <StickyScene heightVh={heightVh} className={className} style={style}>
      {(progress) => (
        <>
          {children?.(progress)}
          <Relocating
            progress={progress}
            fromScale={fromScale}
            toScale={toScale}
            fromY={fromY}
            anchor={anchor}
            headlineClassName={headlineClassName}
            headlineStyle={headlineStyle}
          >
            {eyebrowNode}
            {headline}
          </Relocating>
        </>
      )}
    </StickyScene>
  );
}

function Relocating({
  progress,
  fromScale,
  toScale,
  fromY,
  anchor,
  headlineClassName,
  headlineStyle,
  children,
}: {
  progress: MotionValue<number>;
  fromScale: number;
  toScale: number;
  fromY: number;
  anchor: { left?: string; top?: string; right?: string; bottom?: string };
  headlineClassName?: string;
  headlineStyle?: CSSProperties;
  children: ReactNode;
}) {
  const mid1 = fromScale - (fromScale - toScale) * 0.55;
  const mid2 = toScale + (mid1 - toScale) * 0.18;
  const scale = useTransform(
    progress,
    [0, 0.1, 0.26, 0.42],
    [fromScale, mid1, mid2, toScale],
  );
  const y = useTransform(progress, [0, 0.42], [fromY, 0]);
  const blur = useTransform(progress, [0, 0.1], [10, 0]);
  const bright = useTransform(progress, [0, 0.3, 0.42], [0.6, 1.12, 1]);
  const filter = useMotionTemplate`blur(${blur}px) brightness(${bright})`;
  const opacity = useTransform(progress, [0, 0.05], [0, 1]);

  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: 10,
        transformOrigin: "top left",
        userSelect: "none",
        y,
        scale,
        opacity,
        filter,
        ...anchor,
      }}
    >
      <div className={headlineClassName} style={headlineStyle}>
        {children}
      </div>
    </motion.div>
  );
}
