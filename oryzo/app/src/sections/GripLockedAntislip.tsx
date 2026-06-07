import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import Section from "../components/Section";
import ScrollCue from "../components/ScrollCue";
import { gripLockedAntislip } from "../lib/content";
import { fadeUp, staggerContainer, staggerItem, inViewOnce } from "../lib/animations";

/**
 * Screen 12 — Cream-on-black macro cork scene with a friction-coefficient card
 * and a draggable arc control. Dragging the dot along the arc updates the
 * FRICTION COEFFICIENT (EST) readout (Framer Motion drag + motion values).
 */
const ARC_WIDTH = 220;
const ARC_DEPTH = 36;

export default function GripLockedAntislip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); // -ARC_WIDTH/2 .. ARC_WIDTH/2
  // Dot rides a shallow parabolic arc: y dips lowest at the center.
  const y = useTransform(x, (v) => {
    const t = v / (ARC_WIDTH / 2); // -1..1
    return ARC_DEPTH * (1 - t * t) * -1 + ARC_DEPTH;
  });

  const [coef, setCoef] = useState(gripLockedAntislip.readoutDefault);
  useMotionValueEvent(x, "change", (v) => {
    const t = (v + ARC_WIDTH / 2) / ARC_WIDTH; // 0..1
    const value = 0.4 + t * 0.8; // 0.40 .. 1.20
    setCoef(value.toFixed(2));
  });

  return (
    <Section className="flex flex-col items-center justify-center bg-inkDeep text-paper">
      {/* Macro cork texture top, grid floor bottom */}
      <div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "radial-gradient(120% 140% at 50% 0%, #2a2018 0%, #14100b 70%, #0c0907 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,120,120,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(120,120,120,0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transform: "perspective(400px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="relative z-10 mt-16 text-center"
      >
        <motion.p variants={staggerItem} className="text-xs font-bold tracking-eyebrow text-paper/80">
          {gripLockedAntislip.eyebrow}
        </motion.p>
        <motion.h2
          variants={staggerItem}
          className="mt-2 font-display text-4xl font-900 leading-none tracking-tight md:text-5xl"
        >
          {gripLockedAntislip.headline.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </motion.h2>
        <motion.p variants={staggerItem} className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/80">
          {gripLockedAntislip.body}
        </motion.p>
      </motion.div>

      {/* Friction card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="relative z-10 mt-10 w-56"
      >
        <div className="flex items-center justify-between bg-paper px-3 py-1.5 font-mono text-[10px] font-bold tracking-eyebrow text-ink">
          <span>{gripLockedAntislip.readoutLabel}</span>
          <span className="tabular-nums">{coef}</span>
        </div>
        {/* Micro-texture preview */}
        <div
          className="h-20 w-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #777 0 1px, transparent 2px), radial-gradient(circle at 70% 60%, #999 0 1px, transparent 2px), #2a2a2a",
            backgroundSize: "8px 8px, 11px 11px, 100% 100%",
          }}
        />
      </motion.div>

      {/* Draggable arc control */}
      <div className="relative z-10 mt-8" style={{ width: ARC_WIDTH, height: 80 }}>
        <svg width={ARC_WIDTH} height={60} className="absolute left-0 top-0 overflow-visible">
          <path
            d={`M 0 ${ARC_DEPTH} Q ${ARC_WIDTH / 2} ${-ARC_DEPTH} ${ARC_WIDTH} ${ARC_DEPTH}`}
            fill="none"
            stroke="rgba(242,236,228,0.35)"
            strokeWidth="1"
            strokeDasharray="2 5"
          />
        </svg>
        <div ref={trackRef} className="absolute left-1/2 top-2 -translate-x-1/2">
          <motion.button
            drag="x"
            dragConstraints={{ left: -ARC_WIDTH / 2, right: ARC_WIDTH / 2 }}
            dragElastic={0}
            dragMomentum={false}
            style={{ x, y }}
            whileTap={{ scale: 1.3 }}
            aria-label="Drag to adjust friction coefficient"
            className="h-3.5 w-3.5 cursor-grab rounded-full bg-paper shadow-[0_0_12px_rgba(242,236,228,0.6)] active:cursor-grabbing"
          />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-paper/40" aria-hidden>
          <span className="text-lg">☝</span>
        </div>
      </div>

      <ScrollCue />
    </Section>
  );
}
