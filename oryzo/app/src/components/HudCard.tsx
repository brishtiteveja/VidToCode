import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { wearableHud } from "../lib/content";
import {
  easeInOut,
  easeOutExpo,
  inViewOnce,
  springPop,
  useReducedMotionFlag,
} from "../lib/animations";

/**
 * Glassy cyan HUD card overlaid on the wearable demo (Screen 05). Real content:
 * cup count, heart rate, model tag, a nudge message, and a working "Refill" pill
 * that increments the cup count.
 *
 * Motion: the pills + chat bubble fade/scale in together, then the "Refill" CTA
 * pops last with a spring overshoot. A subtle idle opacity/glow shimmer pulses on
 * the teal stroke (gated behind reduced-motion).
 */

const card: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: easeOutExpo,
      when: "beforeChildren",
      staggerChildren: 0.22,
      delayChildren: 0.05,
    },
  },
};

const group: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOutExpo } },
};

const refill: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: springPop },
};

export default function HudCard({
  onRefill,
  cups,
}: {
  onRefill: () => void;
  cups: number;
}) {
  const { hud } = wearableHud;
  const reduced = useReducedMotionFlag();

  return (
    <motion.div
      variants={card}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      className="relative w-[230px] rounded-card border border-hud/60 bg-hud/10 p-3 text-hud backdrop-blur-md"
      style={{ boxShadow: "0 0 30px rgba(46,230,200,0.25)" }}
    >
      {/* Idle shimmer on the teal stroke (gated behind reduced-motion). */}
      {!reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-card border border-hud/60"
          initial={{ opacity: 0.35 }}
          animate={{
            opacity: [0.35, 0.9, 0.35],
            boxShadow: [
              "0 0 8px rgba(46,230,200,0.15)",
              "0 0 22px rgba(46,230,200,0.55)",
              "0 0 8px rgba(46,230,200,0.15)",
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: easeInOut }}
        />
      )}

      <motion.div variants={group} className="relative">
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="flex items-center gap-1 rounded-sm bg-hud/15 px-2 py-1">
            <span aria-hidden>☕</span>
            {cups}
          </span>
          <span className="flex items-center gap-1 rounded-sm bg-hud/15 px-2 py-1">
            <span aria-hidden>♡</span>
            {hud.bpm}
          </span>
          <span className="ml-auto text-[9px] tracking-eyebrow opacity-70">
            {hud.model}
          </span>
        </div>
        <p className="mt-2 text-[9px] uppercase tracking-eyebrow opacity-60">
          ORYZO-1
        </p>
        <p className="mt-1 text-xs font-medium leading-snug">{hud.message}</p>
      </motion.div>

      <motion.button
        variants={refill}
        whileTap={{ scale: 0.94 }}
        onClick={onRefill}
        className="relative mt-3 rounded-pill bg-hud px-4 py-1.5 text-[11px] font-bold text-inkDeep"
      >
        {hud.cta}
      </motion.button>
    </motion.div>
  );
}
