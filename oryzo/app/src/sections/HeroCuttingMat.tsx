import { useEffect, useMemo, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion";
import Section from "../components/Section";
import ScrollCue from "../components/ScrollCue";
import { assets, hero } from "../lib/content";
import { useReducedMotionFlag } from "../lib/animations";

const MAT_GREEN = "#3f5236";
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Screen 01 — Hero on a green cutting mat with the giant ORYZO wordmark.
 *
 * On load it plays the Oryzo "designed-in-a-vector-tool" intro over a flat green
 * cover: a seed circle with orange transform handles, concentric dashed rings
 * that scale outward (drawing the coaster), and a clockwise conic fill sweep —
 * which then lifts to reveal the real photographic cork-on-cutting-mat plate
 * (extracted from the source recording), after which the wordmark and copy
 * stagger in. The vector ring is aligned over the photo's coaster so the build
 * "morphs" into the real product. Reduced motion skips to the composed hero.
 */
export default function HeroCuttingMat() {
  const reduced = useReducedMotionFlag();

  // Responsive sizing for the vector bounding box (matches the photo coaster).
  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const ring = Math.min(vw * 0.25, 330);

  // Clockwise conic fill sweep (degrees) during the construction beat.
  const sweep = useMotionValue(reduced ? 360 : 0);
  useEffect(() => {
    if (reduced) return;
    const controls = animate(sweep, 360, {
      delay: 1.0,
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    });
    return () => controls.stop();
  }, [reduced, sweep]);
  const fillBg = useMotionTemplate`conic-gradient(from -90deg, rgba(120,138,86,0.6) ${sweep}deg, rgba(120,138,86,0) ${sweep}deg)`;

  const container: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          delayChildren: reduced ? 0 : 2.45,
          staggerChildren: 0.12,
        },
      },
    }),
    [reduced],
  );
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  };

  const lateDelay = reduced ? 0 : 2.7;

  return (
    <Section className="bg-wood text-paper">
      {/* Photographic cork-on-cutting-mat plate (revealed beneath the cover) */}
      <motion.img
        src={assets.heroPlate}
        alt="Oryzo cork coaster on a green self-healing cutting mat"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduced ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ delay: reduced ? 0 : 1.9, duration: 6.5, ease: "easeOut" }}
      />
      {/* Readability scrim for the left-side wordmark/copy */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />

      {/* Wordmark + tagline */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-8 pt-24 md:px-10"
      >
        <motion.p
          variants={item}
          className="text-xs font-bold tracking-eyebrow text-paper"
        >
          {hero.tagline}
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 font-display text-[20vw] font-900 leading-[0.8] tracking-tighter text-paper md:text-[16vw]"
        >
          {hero.wordmark}
        </motion.h1>
      </motion.div>

      {/* Right body copy */}
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lateDelay + 0.2, duration: 0.6, ease: EASE_OUT }}
        className="absolute right-8 top-1/2 z-10 max-w-sm text-right font-display text-xl font-500 leading-snug text-paper md:right-12 md:text-2xl"
      >
        {hero.rightCopy}
      </motion.p>

      {/* Studio credit card, bottom-left */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lateDelay + 0.3, duration: 0.6, ease: EASE_OUT }}
        className="absolute bottom-10 left-8 z-10 w-72 border border-paper/15 bg-ink/40 p-6 backdrop-blur-sm md:left-10"
      >
        <h2 className="whitespace-pre-line font-display text-sm font-800 leading-tight tracking-wide text-paper">
          {hero.studioCard.title}
        </h2>
        <div className="my-4 border-t border-dashed border-paper/30" />
        <p className="text-xs leading-relaxed text-paper/80">
          {hero.studioCard.footnote}
        </p>
      </motion.div>

      {/* ── Intro construction overlay (vector-tool assembly) ── */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="absolute inset-0 z-40"
          style={{ backgroundColor: MAT_GREEN, pointerEvents: "none" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.95, duration: 0.75, ease: "easeInOut" }}
        >
          {/* Alignment guides (crosshair through the coaster + offset grid) */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <span className="absolute left-[48%] top-0 h-full w-px border-l border-dashed border-paper/25" />
            <span className="absolute left-0 top-[52%] h-px w-full border-t border-dashed border-paper/25" />
            <span className="absolute left-[30%] top-0 h-full w-px border-l border-dashed border-paper/12" />
            <span className="absolute left-[66%] top-0 h-full w-px border-l border-dashed border-paper/12" />
            <span className="absolute left-0 top-[30%] h-px w-full border-t border-dashed border-paper/12" />
            <span className="absolute left-0 top-[74%] h-px w-full border-t border-dashed border-paper/12" />
          </motion.div>

          {/* Vector bounding box + rings + fill + handles (scales out from seed),
              aligned over the photo's coaster (~48% x / 52% y). */}
          <motion.div
            className="absolute"
            style={{
              width: ring,
              height: ring,
              left: "48%",
              top: "52%",
              marginLeft: -ring / 2,
              marginTop: -ring / 2,
            }}
            initial={{ scale: 0.14 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease: EASE_OUT }}
          >
            {/* Conic fill sweep */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: fillBg }}
            />
            {/* Outer dashed ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-paper/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
            {/* Inner hole (punches the annulus) + dashed ring */}
            <div
              className="absolute rounded-full border border-dashed border-paper/70"
              style={{ inset: "32%", backgroundColor: MAT_GREEN }}
            />

            {/* Orange transform handles + edge I-beams */}
            <Handles />
            <span className="absolute -top-3 left-1/2 h-px w-2/3 -translate-x-1/2 bg-accent" />
            <span className="absolute -bottom-3 left-1/2 h-px w-2/3 -translate-x-1/2 bg-accent" />
            <span className="absolute -left-3 top-1/2 h-2/3 w-px -translate-y-1/2 bg-accent" />
            <span className="absolute -right-3 top-1/2 h-2/3 w-px -translate-y-1/2 bg-accent" />
          </motion.div>
        </motion.div>
      )}

      <ScrollCue label={hero.scrollCue} />
    </Section>
  );
}

/** 8 orange square transform handles at the corners + edge midpoints. */
function Handles() {
  const pos = [
    "left-0 top-0",
    "left-1/2 top-0 -translate-x-1/2",
    "right-0 top-0",
    "left-0 top-1/2 -translate-y-1/2",
    "right-0 top-1/2 -translate-y-1/2",
    "left-0 bottom-0",
    "left-1/2 bottom-0 -translate-x-1/2",
    "right-0 bottom-0",
  ];
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.35 }}
    >
      {pos.map((p) => (
        <span
          key={p}
          className={`absolute h-2 w-2 ${p} -m-1 border border-accent bg-accent`}
        />
      ))}
    </motion.div>
  );
}
