import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easeInOut, easeOutExpo, useReducedMotionFlag } from "../lib/animations";

type Props = { onDone: () => void };

// Phase timings (seconds) — mirrors the recorded overture.
const T = {
  draw: 0.15, // grid lines draw in at centre
  frame: 0.7, // verticals slide apart + headline wipes open in sync
  converge: 2.7, // verticals slide back to centre, grid fades out
  oval: 3.7, // oval traces on the cream background
  ovalMove: 5.0, // oval slides right toward the hero orbit
  total: 5.4, // hand off to the hero
};

// Horizontal offset of each vertical gridline from centre, as a fraction of
// viewport width. They emerge from centre, slide apart to bracket the headline
// (snug to its edges), then collapse back to the centre cross.
const VERT = {
  enter: { left: 0, right: 0 },
  frame: { left: -0.16, right: 0.16 },
  converge: { left: 0, right: 0 },
} as const;

type Phase = "enter" | "frame" | "converge";

/**
 * Play-once intro overture reconstructed from wgb_intro_animation.mov:
 * black grid whose vertical lines slide apart to frame a headline that wipes
 * open in sync → grid fades + crossfade to cream → oval traces, then slides
 * right into the hero orbit. Skipped under prefers-reduced-motion.
 */
export default function Intro({ onDone }: Props) {
  const reduced = useReducedMotionFlag();
  const [phase, setPhase] = useState<Phase>("enter");
  const [slide, setSlide] = useState(false);
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1440));

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers = [
      window.setTimeout(() => setPhase("frame"), T.frame * 1000),
      window.setTimeout(() => setPhase("converge"), T.converge * 1000),
      window.setTimeout(() => setSlide(true), T.ovalMove * 1000),
      window.setTimeout(onDone, T.total * 1000),
    ];
    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = prev;
    };
  }, [reduced, onDone]);

  if (reduced) return null;

  const leftX = VERT[phase].left * vw;
  const rightX = VERT[phase].right * vw;
  const gridOpacity = phase === "converge" ? 0 : 1;
  const lineMove = { duration: 1.0, ease: easeInOut };

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-paper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: easeInOut }}
    >
      {/* cream-phase oval: traces in place, then slides right into the hero orbit */}
      <svg
        viewBox="0 0 1000 620"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <motion.g
          style={{ transformOrigin: "500px 310px" }}
          initial={{ x: 0, scale: 1 }}
          animate={slide ? { x: 235, scale: 0.72 } : { x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: easeInOut }}
        >
          <motion.ellipse
            cx={500}
            cy={310}
            rx={330}
            ry={210}
            transform="rotate(-25 500 310)"
            fill="none"
            stroke="#2a1d12"
            strokeWidth={1.3}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { delay: T.oval, duration: 1.3, ease: easeInOut },
              opacity: { delay: T.oval, duration: 0.2 },
            }}
          />
        </motion.g>
      </svg>

      {/* black phase: moving grid + kinetic line, then fades to reveal cream */}
      <motion.div
        className="absolute inset-0 bg-ink"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: T.converge + 0.35, duration: 0.7, ease: easeInOut }}
      >
        {/* horizontal gridline — sweeps out from centre, fades on converge */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 bg-cream/45"
          style={{ transformOrigin: "center" }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: gridOpacity }}
          transition={{ scaleX: { delay: T.draw, duration: 0.8, ease: easeOutExpo }, opacity: { duration: 0.5 } }}
        />

        {/* left vertical — draws at centre, slides left to frame text, then back */}
        <motion.div
          className="absolute left-1/2 top-0 h-full w-px bg-cream/45"
          style={{ transformOrigin: "center" }}
          initial={{ scaleY: 0, x: 0, opacity: 1 }}
          animate={{ scaleY: 1, x: leftX, opacity: gridOpacity }}
          transition={{
            scaleY: { delay: T.draw, duration: 0.6, ease: easeOutExpo },
            x: lineMove,
            opacity: { duration: 0.5 },
          }}
        />

        {/* right vertical — draws at centre, slides right to frame text, then back */}
        <motion.div
          className="absolute left-1/2 top-0 h-full w-px bg-cream/45"
          style={{ transformOrigin: "center" }}
          initial={{ scaleY: 0, x: 0, opacity: 1 }}
          animate={{ scaleY: 1, x: rightX, opacity: gridOpacity }}
          transition={{
            scaleY: { delay: T.draw + 0.1, duration: 0.6, ease: easeOutExpo },
            x: lineMove,
            opacity: { duration: 0.5 },
          }}
        />

        {/* headline — wipes open from the centre in lockstep with the lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            className="whitespace-nowrap px-6 text-center font-display text-lg font-medium tracking-tight text-cream md:text-2xl"
            initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 1 }}
            animate={{
              clipPath: phase === "enter" ? "inset(0 50% 0 50%)" : "inset(0 0% 0 0%)",
              opacity: phase === "converge" ? 0 : 1,
            }}
            transition={{ clipPath: { duration: 1.0, ease: easeInOut }, opacity: { duration: 0.4 } }}
          >
            We <span className="em">orbit</span> only around what matters
          </motion.h2>
        </div>
      </motion.div>
    </motion.div>
  );
}
