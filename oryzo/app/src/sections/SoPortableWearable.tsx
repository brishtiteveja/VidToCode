import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import CorkDisc from "../components/CorkDisc";
import ConstructionCircle from "../components/ConstructionCircle";
import DottedFrame from "../components/DottedFrame";
import ScrollCue from "../components/ScrollCue";
import { assets, soPortableWearable } from "../lib/content";
import { useReducedMotionFlag } from "../lib/animations";

/**
 * Screen 04 — Kinetic "it's wearable" showcase stage.
 *
 * A tall scroll spacer pins an inner sticky stage so the whole choreography can
 * be scroll-scrubbed (useScroll + useTransform): the eyebrow types in, the giant
 * headline parallaxes in from the right with a typewriter clip + blur→sharp +
 * brightness ramp, a red foil packet rotates face-on and peels into two halves
 * that fling outward, the cork puck rises and tilts, a HUD reticle assembles
 * (circle first, then brackets + ticks), and finally the framed disc descends to
 * edge-on while a media panel fills the frame.
 *
 * Reduced-motion: the scrubbed stage is skipped entirely in favour of a single
 * static, fully-settled composition with a plain fade-in.
 */
export default function SoPortableWearable() {
  const reduced = useReducedMotionFlag();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const sp = scrollYProgress;

  /* Title block ("SO PORTABLE," + giant "it's wearable") — the signature
     big→small relocation. It starts huge, anchored at the LEFT edge with the
     baseline low, then scrubs down in scale (ease-out: fast early, decelerating
     to a clean settle) and rises to a small pinned rest at top-left. The block's
     transform-origin is top-left, so it contracts toward the anchor rather than
     the centre — the word appears to shrink "into" its final label position. */
  const titleScale = useTransform(
    sp,
    [0, 0.1, 0.26, 0.42],
    [6, 3.1, 1.4, 1],
  );
  const titleY = useTransform(sp, [0, 0.42], [200, 0]);
  const titleBlur = useTransform(sp, [0, 0.1], [10, 0]);
  const titleBright = useTransform(sp, [0, 0.3, 0.42], [0.6, 1.12, 1]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px) brightness(${titleBright})`;
  const titleOpacity = useTransform(sp, [0, 0.05], [0, 1]);
  const eyebrowOpacity = useTransform(sp, [0.04, 0.14], [0, 1]);

  /* Red foil packet (closed) — rotateY edge-on→face-on + scale-up, then fades
     as it tears into the two peel halves. */
  const packetRotateY = useTransform(sp, [0.08, 0.45], [88, 0]);
  const packetScale = useTransform(sp, [0.08, 0.45], [0.5, 1]);
  const packetOpacity = useTransform(sp, [0.1, 0.42, 0.5], [1, 1, 0]);

  /* Foil peel halves — diverge L/R, rotate ~50°, fling outward + fade (ease-out
     fling reads near-linear over the slow scrub). */
  const halfOpacity = useTransform(sp, [0.44, 0.5, 0.66, 0.72], [0, 1, 1, 0]);
  const leftX = useTransform(sp, [0.46, 0.7], [0, -440]);
  const leftRot = useTransform(sp, [0.46, 0.7], [-6, -54]);
  const rightX = useTransform(sp, [0.46, 0.7], [0, 440]);
  const rightRot = useTransform(sp, [0.46, 0.7], [6, 54]);

  /* Cork puck — appears as foil clears, rises + tilts (float settle), then
     descends to edge-on for the final disc-descent beat. */
  const puckOpacity = useTransform(sp, [0.48, 0.56], [0, 1]);
  const puckY = useTransform(sp, [0.6, 0.78, 0.82, 1], [0, -42, -42, 120]);
  const puckRotateX = useTransform(sp, [0.6, 0.78, 0.82, 1], [0, 16, 16, 82]);

  /* HUD reticle — circle scales in first, then the bracket frame, then ticks. */
  const circleScale = useTransform(sp, [0.5, 0.62], [0.4, 1]);
  const circleOpacity = useTransform(sp, [0.5, 0.6], [0, 1]);
  const frameOpacity = useTransform(sp, [0.58, 0.7], [0, 1]);
  const tickTop = useTransform(sp, [0.6, 0.66], [0, 1]);
  const tickRight = useTransform(sp, [0.62, 0.68], [0, 1]);
  const tickBottom = useTransform(sp, [0.64, 0.7], [0, 1]);
  const tickLeft = useTransform(sp, [0.66, 0.72], [0, 1]);

  /* Disc-descent media panel — opacity-fills inside the frame (ease-in). */
  const panelOpacity = useTransform(sp, [0.84, 1], [0, 1]);
  const panelScale = useTransform(sp, [0.84, 1], [1.08, 1]);

  /* Ambient floating particle drift (gated). */
  const dotY = useTransform(sp, [0, 1], [0, -28]);

  if (reduced) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-inkDeep">
        <div className="absolute left-8 top-1/3 z-20 md:left-10">
          <p className="text-xs font-bold tracking-eyebrow text-cream/70">
            {soPortableWearable.eyebrow}
          </p>
        </div>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 select-none font-display text-[16vw] font-900 leading-none tracking-tighter text-paper"
        >
          {soPortableWearable.headline}
        </motion.h2>
        <div className="absolute z-20 flex items-center justify-center">
          <ConstructionCircle size={320} className="absolute" />
          <DottedFrame
            className="flex h-[340px] w-[340px] items-center justify-center"
            handle={false}
          >
            <CorkDisc size={150} variant="bowl" />
          </DottedFrame>
        </div>
        <ScrollCue />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[280vh] w-full bg-inkDeep">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Title block — big→small relocation, anchored top-left, origin top-left */}
        <motion.div
          style={{
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity,
            filter: titleFilter,
          }}
          className="absolute left-[4vw] top-[26vh] z-10 origin-top-left select-none"
        >
          <motion.p
            style={{ opacity: eyebrowOpacity }}
            className="mb-[0.15em] text-[0.7rem] font-bold tracking-eyebrow text-cream/70"
          >
            {soPortableWearable.eyebrow}
          </motion.p>
          <h2 className="font-display text-[2.7rem] font-900 leading-[0.9] tracking-tighter text-paper">
            {soPortableWearable.headline}
          </h2>
        </motion.div>

        {/* HUD reticle + framed disc + descent media panel */}
        <div className="absolute z-20 flex items-center justify-center">
          <motion.div
            style={{ scale: circleScale, opacity: circleOpacity }}
            className="absolute"
          >
            <ConstructionCircle size={320} />
          </motion.div>

          {/* Side ticks staggering in around the frame */}
          <motion.span
            style={{ opacity: tickTop }}
            className="absolute -top-4 left-1/2 z-30 h-3 w-px -translate-x-1/2 bg-accent"
          />
          <motion.span
            style={{ opacity: tickRight }}
            className="absolute -right-4 top-1/2 z-30 h-px w-3 -translate-y-1/2 bg-accent"
          />
          <motion.span
            style={{ opacity: tickBottom }}
            className="absolute -bottom-4 left-1/2 z-30 h-3 w-px -translate-x-1/2 bg-accent"
          />
          <motion.span
            style={{ opacity: tickLeft }}
            className="absolute -left-4 top-1/2 z-30 h-px w-3 -translate-y-1/2 bg-accent"
          />

          <motion.div style={{ opacity: frameOpacity }}>
            <DottedFrame
              className="relative flex h-[340px] w-[340px] items-center justify-center overflow-hidden"
              handle={false}
            >
              {/* Media panel fills the frame during disc descent */}
              <motion.img
                src={assets.intro}
                alt="Hand holding the Oryzo cork disc against fabric"
                loading="lazy"
                style={{ opacity: panelOpacity, scale: panelScale }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <CorkDisc
                size={150}
                variant="bowl"
                style={{
                  y: puckY,
                  rotateX: puckRotateX,
                  opacity: puckOpacity,
                  transformPerspective: 800,
                }}
              />
            </DottedFrame>
          </motion.div>
        </div>

        {/* Red foil packet (closed) */}
        <motion.div
          style={{
            rotateY: packetRotateY,
            scale: packetScale,
            opacity: packetOpacity,
            transformPerspective: 900,
          }}
          className="absolute z-30 h-24 w-32 rounded-md bg-gradient-to-br from-accentDeep to-accent shadow-xl"
        />

        {/* Foil peel halves */}
        <motion.div
          style={{ x: leftX, rotate: leftRot, opacity: halfOpacity }}
          className="absolute z-30 h-24 w-16 origin-right -translate-x-8 rounded-l-md bg-gradient-to-br from-accentDeep to-accent shadow-xl"
        />
        <motion.div
          style={{ x: rightX, rotate: rightRot, opacity: halfOpacity }}
          className="absolute z-30 h-24 w-16 origin-left translate-x-8 rounded-r-md bg-gradient-to-bl from-accentDeep to-accent shadow-xl"
        />

        {/* Ambient drifting particle */}
        <motion.span
          style={{ y: dotY }}
          className="absolute right-[34%] top-[34%] z-20 h-1.5 w-1.5 rounded-full bg-cream/70"
        />

        <ScrollCue />
      </div>
    </section>
  );
}
