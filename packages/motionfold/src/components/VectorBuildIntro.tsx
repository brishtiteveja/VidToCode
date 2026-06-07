import { useEffect, type CSSProperties, type ReactNode } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { easeOutExpo } from "../tokens/easings";
import { useElementSize } from "../hooks/useElementSize";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";
import {
  DEFAULT_ACCENT,
  DEFAULT_COVER,
  DEFAULT_FILL,
  DEFAULT_GUIDE,
  DEFAULT_LINE_STRONG,
} from "../internal/defaults";

export interface VectorBuildIntroProps {
  /** The content revealed once the build completes (e.g. a hero). */
  children: ReactNode;
  /** Flat cover color the build plays over. */
  coverColor?: string;
  /** Transform-handle / I-beam color. */
  accentColor?: string;
  /** Dashed ring color. */
  ringColor?: string;
  /** Alignment-guide color. */
  guideColor?: string;
  /** Conic fill-sweep color. */
  fillColor?: string;
  /** Ring diameter as a fraction of width (when not fixed). Default `0.25`. */
  ringFraction?: number;
  /** Max ring diameter (px). Default `330`. */
  ringMax?: number;
  /** Explicit ring diameter (px); overrides the responsive sizing. */
  ringSize?: number;
  /** Center of the build, as CSS percentages. Default `{ x: "48%", y: "52%" }`. */
  center?: { x: string; y: string };
  /** Inner-hole inset of the annulus. Default `"32%"`. */
  holeInset?: string;
  /** Skip the animation and render children immediately. */
  disabled?: boolean;
  /** Fired after the cover has fully lifted. */
  onComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * The "designed in a vector tool" intro: over a flat cover, a seed circle with
 * orange transform handles scales out, concentric dashed rings draw the shape,
 * a clockwise conic fill sweeps in — then the cover lifts to reveal `children`,
 * so the vector build appears to *morph* into the real content. Reduced motion
 * (or `disabled`) skips straight to the revealed content.
 */
export function VectorBuildIntro({
  children,
  coverColor = DEFAULT_COVER,
  accentColor = DEFAULT_ACCENT,
  ringColor = DEFAULT_LINE_STRONG,
  guideColor = DEFAULT_GUIDE,
  fillColor = DEFAULT_FILL,
  ringFraction = 0.25,
  ringMax = 330,
  ringSize,
  center = { x: "48%", y: "52%" },
  holeInset = "32%",
  disabled = false,
  onComplete,
  className,
  style,
}: VectorBuildIntroProps) {
  const reduced = useReducedMotionFlag();
  const skip = reduced || disabled;
  const { ref, size } = useElementSize<HTMLDivElement>();

  const ring =
    ringSize ?? Math.min((size.width || 1280) * ringFraction, ringMax);

  const sweep = useMotionValue(skip ? 360 : 0);
  useEffect(() => {
    if (skip) return;
    const controls = animate(sweep, 360, {
      delay: 1.0,
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    });
    const done = window.setTimeout(() => onComplete?.(), 2700);
    return () => {
      controls.stop();
      window.clearTimeout(done);
    };
  }, [skip, sweep, onComplete]);

  const fillBg = useMotionTemplate`conic-gradient(from -90deg, ${fillColor} ${sweep}deg, rgba(0,0,0,0) ${sweep}deg)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", width: "100%", overflow: "hidden", ...style }}
    >
      {children}

      {!skip && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 40,
            backgroundColor: coverColor,
            pointerEvents: "none",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.95, duration: 0.75, ease: "easeInOut" }}
        >
          {/* Alignment guides */}
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <span style={guide(guideColor, { left: "48%", top: 0, height: "100%", width: 1 })} />
            <span style={guide(guideColor, { left: 0, top: "52%", width: "100%", height: 1 })} />
          </motion.div>

          {/* Ring assembly (scales out from seed) */}
          <motion.div
            style={{
              position: "absolute",
              width: ring,
              height: ring,
              left: center.x,
              top: center.y,
              marginLeft: -ring / 2,
              marginTop: -ring / 2,
            }}
            initial={{ scale: 0.14 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease: easeOutExpo }}
          >
            {/* Conic fill sweep */}
            <motion.div
              style={{ position: "absolute", inset: 0, borderRadius: "9999px", background: fillBg }}
            />
            {/* Outer dashed ring */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "9999px",
                border: `1px dashed ${ringColor}`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
            {/* Inner hole + dashed ring */}
            <div
              style={{
                position: "absolute",
                inset: holeInset,
                borderRadius: "9999px",
                border: `1px dashed ${ringColor}`,
                backgroundColor: coverColor,
              }}
            />

            <Handles accentColor={accentColor} />
            <span style={ibeam(accentColor, { top: -12, left: "50%", width: "66%", height: 1, translateX: true })} />
            <span style={ibeam(accentColor, { bottom: -12, left: "50%", width: "66%", height: 1, translateX: true })} />
            <span style={ibeam(accentColor, { left: -12, top: "50%", height: "66%", width: 1, translateY: true })} />
            <span style={ibeam(accentColor, { right: -12, top: "50%", height: "66%", width: 1, translateY: true })} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function guide(color: string, pos: CSSProperties): CSSProperties {
  return { position: "absolute", borderStyle: "dashed", borderColor: color, borderWidth: 0, backgroundColor: color, ...pos };
}

function ibeam(
  color: string,
  pos: CSSProperties & { translateX?: boolean; translateY?: boolean },
): CSSProperties {
  const { translateX, translateY, ...rest } = pos;
  const transform =
    translateX ? "translateX(-50%)" : translateY ? "translateY(-50%)" : undefined;
  return { position: "absolute", backgroundColor: color, transform, ...rest };
}

function Handles({ accentColor }: { accentColor: string }) {
  const positions: CSSProperties[] = [
    { left: 0, top: 0 },
    { left: "50%", top: 0, transform: "translateX(-50%)" },
    { right: 0, top: 0 },
    { left: 0, top: "50%", transform: "translateY(-50%)" },
    { right: 0, top: "50%", transform: "translateY(-50%)" },
    { left: 0, bottom: 0 },
    { left: "50%", bottom: 0, transform: "translateX(-50%)" },
    { right: 0, bottom: 0 },
  ];
  return (
    <motion.div
      style={{ position: "absolute", inset: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.35 }}
    >
      {positions.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            height: 8,
            width: 8,
            margin: -4,
            border: `1px solid ${accentColor}`,
            backgroundColor: accentColor,
            ...p,
          }}
        />
      ))}
    </motion.div>
  );
}
