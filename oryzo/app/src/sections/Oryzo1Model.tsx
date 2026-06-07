import { motion } from "framer-motion";
import Section from "../components/Section";
import Pill from "../components/Pill";
import { oryzo1Model } from "../lib/content";
import { fadeUp, staggerContainer, staggerItem, inViewOnce } from "../lib/animations";

const iconFor: Record<string, string> = {
  paper: "▤",
  cube: "◳",
  code: "⌥",
};

/**
 * Screen 22 — "ORYZO-1" SOTA open-weight model page: three size-comparison tiles
 * up top, the big model name, PAPER / MODEL (.OBJ) / CODE COMING SOON pills (last
 * disabled), and the verbatim abstract.
 */
export default function Oryzo1Model() {
  const [pre, name, post] = (() => {
    const parts = oryzo1Model.abstract.split(oryzo1Model.abstractHighlight);
    return [parts[0], oryzo1Model.abstractHighlight, parts.slice(1).join(oryzo1Model.abstractHighlight)];
  })();

  return (
    <Section className="flex flex-col items-center justify-center bg-inkDeep py-28">
      {/* Top comparison tiles */}
      <div className="grid w-full grid-cols-1 gap-4 px-8 md:grid-cols-3 md:px-10">
        {oryzo1Model.topTiles.map((tile, i) => (
          <div
            key={i}
            className="rounded-card border border-cream/10 bg-ink2/70 p-5 text-center"
          >
            <p className="text-[9px] tracking-eyebrow text-muted">{tile.never}</p>
            <p className="mt-4 text-[9px] font-bold tracking-eyebrow text-muted">
              {tile.bestFor}
            </p>
            <p className="mt-1 text-[11px] font-bold tracking-eyebrow text-cream">
              {tile.text}
            </p>
          </div>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mt-16 flex flex-col items-center"
      >
        <motion.p variants={staggerItem} className="text-[11px] font-bold tracking-eyebrow text-muted">
          {oryzo1Model.eyebrow}
        </motion.p>
        <motion.h2
          variants={staggerItem}
          className="font-display text-[14vw] font-900 leading-none tracking-tighter text-paper md:text-[9rem]"
        >
          {oryzo1Model.headline}
        </motion.h2>

        <motion.div variants={staggerItem} className="mt-6 flex flex-wrap justify-center gap-3">
          {oryzo1Model.pills.map((pill) => (
            <Pill
              key={pill.label}
              variant="ghost"
              disabled={pill.disabled}
              icon={iconFor[pill.icon]}
            >
              {pill.label}
            </Pill>
          ))}
        </motion.div>
      </motion.div>

      {/* Abstract */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mt-12 max-w-2xl px-8"
      >
        <p className="font-mono text-[11px] font-bold tracking-eyebrow text-muted">
          {oryzo1Model.abstractLabel}
        </p>
        <p className="mt-2 font-serif text-sm leading-relaxed text-cream/85">
          {pre}
          <span className="text-accent">{name}</span>
          {post}
        </p>
      </motion.div>
    </Section>
  );
}
