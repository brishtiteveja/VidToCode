import { motion, useTime, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionFlag } from "../lib/animations";

type Props = {
  labels: string[];
  variant?: "line" | "glow";
  className?: string;
  period?: number; // ms for one full revolution
  spin?: boolean; // continuous rotation of rings + orbiting dots
  // Optional scroll-driven halo rendered in the SVG's own coordinate space so
  // its bright edge aligns exactly with the ring radii. scale 1 === outer ring.
  glowScale?: MotionValue<number>;
  glowOpacity?: MotionValue<number>;
};

const C = 280; // centre
const PHI = (-28 * Math.PI) / 180; // tilt of the orbital plane
const COS = Math.cos(PHI);
const SIN = Math.sin(PHI);

// Ring radii (rx, ry) from outer → inner.
const RINGS: Array<[number, number]> = [
  [250, 150],
  [196, 118],
  [142, 85],
];

// project a parametric point on the tilted outer ellipse to screen space
function project(angleRad: number) {
  const lx = RINGS[0][0] * Math.cos(angleRad);
  const ly = RINGS[0][1] * Math.sin(angleRad);
  return {
    x: lx * COS - ly * SIN + C,
    y: lx * SIN + ly * COS + C,
  };
}

const BASE_ANGLES = [-50, 35, 165]; // deg, where the labelled dots sit

/**
 * WGB orbital line-art: concentric tilted ellipses, a central spark, and
 * labelled dots that orbit the outer ring. "glow" renders the dark-section
 * blue-haloed variant; "line" renders the cream-section hairline variant.
 */
export default function OrbitDiagram({
  labels,
  variant = "line",
  className = "",
  period = 24000,
  spin = true,
  glowScale,
  glowOpacity,
}: Props) {
  const reduced = useReducedMotionFlag();
  const animate = spin && !reduced;
  const time = useTime();
  // 0 → 2π over `period`, looping (frozen at 0 when rotation is disabled)
  const orbitAngle = useTransform(time, (t) => (animate ? ((t % period) / period) * Math.PI * 2 : 0));

  const stroke = variant === "glow" ? "#3d39ff" : "#0a0a0a";
  const ringOpacity = variant === "glow" ? 0.9 : 0.55;
  const sparkColor = variant === "glow" ? "#f7efe6" : "#0a0a0a";
  const labelColor = variant === "glow" ? "#cfcdf5" : "#0a0a0a";

  return (
    <svg viewBox="0 0 560 560" className={className} aria-hidden="true">
      <defs>
        <filter id={`glow-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={variant === "glow" ? 9 : 0} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="halo">
          <stop offset="0%" stopColor="#3a34ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#3a34ff" stopOpacity="0.07" />
          <stop offset="84%" stopColor="#4a44ff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1e18ff" stopOpacity="0.4" />
        </radialGradient>
        <filter id="haze" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* scroll-driven halo — sized to the outer ring so scale 1 sits on it */}
      {glowScale && (
        <motion.g style={{ scale: glowScale, opacity: glowOpacity ?? 1, originX: "280px", originY: "280px" }}>
          <g transform={`rotate(-28 ${C} ${C})`}>
            <ellipse cx={C} cy={C} rx={RINGS[0][0]} ry={RINGS[0][1]} fill="url(#halo)" filter="url(#haze)" />
          </g>
        </motion.g>
      )}

      {/* very slow decorative drift of the whole ring system */}
      <motion.g
        style={{ originX: "280px", originY: "280px" }}
        animate={animate ? { rotate: [0, 360] } : {}}
        transition={{ duration: period / 1000 / 2, ease: "linear", repeat: Infinity }}
        filter={`url(#glow-${variant})`}
      >
        <g transform={`rotate(-28 ${C} ${C})`}>
          {RINGS.map(([rx, ry], i) => (
            <ellipse
              key={i}
              cx={C}
              cy={C}
              rx={rx}
              ry={ry}
              fill="none"
              stroke={stroke}
              strokeWidth={variant === "glow" ? 2.5 : 1}
              opacity={ringOpacity - i * 0.12}
            />
          ))}
        </g>
      </motion.g>

      {/* central spark */}
      <path
        d="M280 196 C286 262 298 274 364 280 C298 286 286 298 280 364 C274 298 262 286 196 280 C262 274 274 262 280 196 Z"
        fill={sparkColor}
        transform="rotate(-12 280 280)"
      />

      {/* orbiting labelled dots */}
      {labels.map((label, i) => (
        <OrbitDot key={label} label={label} base={BASE_ANGLES[i] ?? i * 90} spin={orbitAngle} color={stroke} labelColor={labelColor} />
      ))}
    </svg>
  );
}

function OrbitDot({
  label,
  base,
  spin,
  color,
  labelColor,
}: {
  label: string;
  base: number;
  spin: MotionValue<number>;
  color: string;
  labelColor: string;
}) {
  const baseRad = (base * Math.PI) / 180;
  const cx = useTransform(spin, (s) => project(baseRad + s).x);
  const cy = useTransform(spin, (s) => project(baseRad + s).y);
  const lx = useTransform(spin, (s) => project(baseRad + s).x + 14);
  const ly = useTransform(spin, (s) => project(baseRad + s).y + 4);

  return (
    <>
      <motion.circle cx={cx} cy={cy} r={4} fill={color} />
      <motion.text x={lx} y={ly} fill={labelColor} fontSize={15} fontFamily="Inter, sans-serif">
        {label}
      </motion.text>
    </>
  );
}
