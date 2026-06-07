import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { easeInOutExpo } from "../tokens/easings";
import { useReducedMotionFlag } from "../hooks/useReducedMotionFlag";

export type CurtainExit = "up" | "down" | "fade";

export interface IntroCurtainProps {
  /** Content revealed once the curtain lifts. */
  children: ReactNode;
  /** Centered message shown on the curtain (e.g. a tagline). */
  message?: ReactNode;
  /** Curtain fill color. Default near-black. */
  curtainColor?: string;
  /** Message color. Default white. */
  textColor?: string;
  /** Draw faint alignment grid lines on the curtain. Default `true`. */
  grid?: boolean;
  gridColor?: string;
  /** Seconds the curtain holds before lifting. Default `1.6`. */
  hold?: number;
  /** Lift duration (s). Default `0.9`. */
  duration?: number;
  /** How the curtain exits. Default `"up"`. */
  exit?: CurtainExit;
  /** Skip the curtain and render children immediately. */
  disabled?: boolean;
  onComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * A full-bleed curtain that holds a centered tagline over a faint grid, then
 * lifts away to reveal `children` — the WGB intro, generalized. Plays once on
 * mount. Reduced motion (or `disabled`) renders the content immediately.
 */
export function IntroCurtain({
  children,
  message,
  curtainColor = "#08070a",
  textColor = "#ffffff",
  grid = true,
  gridColor = "rgba(255,255,255,0.12)",
  hold = 1.6,
  duration = 0.9,
  exit = "up",
  disabled = false,
  onComplete,
  className,
  style,
}: IntroCurtainProps) {
  const reduced = useReducedMotionFlag();
  const skip = reduced || disabled;
  const [lift, setLift] = useState(false);
  const [done, setDone] = useState(skip);

  useEffect(() => {
    if (skip) return;
    const t = window.setTimeout(() => setLift(true), hold * 1000);
    return () => window.clearTimeout(t);
  }, [skip, hold]);

  const exitTarget =
    exit === "up"
      ? { y: "-100%" }
      : exit === "down"
        ? { y: "100%" }
        : { opacity: 0 };

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      {children}

      {!done && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            backgroundColor: curtainColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={lift ? exitTarget : { y: 0, opacity: 1 }}
          transition={{ duration, ease: easeInOutExpo }}
          onAnimationComplete={() => {
            if (lift) {
              setDone(true);
              onComplete?.();
            }
          }}
        >
          {grid && (
            <>
              <span style={gridLine(gridColor, { left: "33.33%", top: 0, width: 1, height: "100%" })} />
              <span style={gridLine(gridColor, { left: "66.66%", top: 0, width: 1, height: "100%" })} />
              <span style={gridLine(gridColor, { left: 0, top: "50%", width: "100%", height: 1 })} />
            </>
          )}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: easeInOutExpo }}
              style={{
                position: "relative",
                color: textColor,
                textAlign: "center",
                padding: "0 8vw",
                fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                lineHeight: 1.2,
              }}
            >
              {message}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

function gridLine(color: string, pos: CSSProperties): CSSProperties {
  return { position: "absolute", backgroundColor: color, ...pos };
}
