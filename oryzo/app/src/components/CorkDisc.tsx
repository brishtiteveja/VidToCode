import { motion } from "framer-motion";
import type { MotionStyle } from "framer-motion";

type CorkDiscProps = {
  size?: number;
  /** "bowl" shows the recessed inner well; "puck" is a solid flat disc; "rim" is edge-on. */
  variant?: "bowl" | "puck";
  label?: string;
  className?: string;
  style?: MotionStyle;
  /** speckle intensity 0-1 */
  speckle?: boolean;
};

/**
 * APPROXIMATION: the original video rendered the cork coaster as a photographic
 * 3D object. Here it is approximated with layered radial-gradients (cork grain +
 * speckle) and inset shadows to fake the recessed bowl and rounded rim.
 */
export default function CorkDisc({
  size = 320,
  variant = "bowl",
  label,
  className = "",
  style,
  speckle = true,
}: CorkDiscProps) {
  const speckleBg = speckle
    ? `, radial-gradient(circle at 30% 25%, rgba(26,18,11,0.55) 0 1.5px, transparent 2px) 0 0 / 9px 9px, radial-gradient(circle at 70% 60%, rgba(26,18,11,0.4) 0 1px, transparent 2px) 4px 6px / 13px 13px`
    : "";

  return (
    <motion.div
      className={`relative rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 38% 32%, #D9A86B 0%, #C58A4E 55%, #9A6A3A 100%)${speckleBg}`,
        boxShadow:
          "0 40px 80px -20px rgba(0,0,0,0.7), inset 0 2px 6px rgba(255,225,180,0.35)",
        ...style,
      }}
    >
      {variant === "bowl" && (
        <div
          className="absolute rounded-full"
          style={{
            inset: size * 0.09,
            background: `radial-gradient(circle at 45% 40%, #B07C44 0%, #8A5C30 70%, #6F4824 100%)${speckleBg}`,
            boxShadow:
              "inset 0 12px 28px rgba(0,0,0,0.55), inset 0 -6px 14px rgba(255,210,150,0.25)",
          }}
        />
      )}
      {label && (
        <span
          className="absolute inset-0 flex items-center justify-center font-display font-bold tracking-tight text-ink/70"
          style={{ fontSize: size * 0.11 }}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}
