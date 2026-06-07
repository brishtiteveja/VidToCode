import { motion } from "framer-motion";
import Section from "../components/Section";
import ScrollCue from "../components/ScrollCue";
import { assets, legacySupport } from "../lib/content";
import { staggerContainer, staggerItem, inViewOnce } from "../lib/animations";

/**
 * Screen 21 — "Legacy Support": real photographed antiquities (an alabaster jar,
 * a bronze ewer, a Chinese bronze gu) each sitting on an Oryzo cork coaster over a
 * terracotta panel, captioned by era.
 */
export default function LegacySupport() {
  return (
    <Section className="grid grid-cols-1 md:grid-cols-[1fr_4fr]">
      {/* Left corkboard strip */}
      <div
        className="relative hidden md:block"
        style={{
          background: "radial-gradient(circle at 40% 40%, #C9A36A, #8a5c30)",
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.15) 0 1px, transparent 2px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Right terracotta panel with the real artifacts shot as the lower scene */}
      <div className="relative flex flex-col justify-center overflow-hidden bg-accentDeep py-16">
        <img
          src={assets.legacySupport}
          alt="Ancient vessels each resting on an Oryzo cork coaster against a terracotta backdrop"
          loading="lazy"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 w-full object-cover object-bottom"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #b34000 0%, rgba(179,64,0,0.65) 30%, rgba(179,64,0,0) 60%)",
          }}
        />
        <p className="relative z-10 px-10 text-center font-mono text-[11px] font-bold tracking-eyebrow text-paper">
          {legacySupport.eyebrow}
        </p>
        <h2 className="relative z-10 px-10 text-center font-display text-[8vw] font-900 leading-none tracking-tight text-paper">
          {legacySupport.headline}
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="relative z-10 mt-auto grid grid-cols-2 gap-6 px-10 pt-10 md:grid-cols-4"
        >
          {legacySupport.artifacts.map((caption) => (
            <motion.p
              key={caption}
              variants={staggerItem}
              className="text-center font-mono text-[9px] font-bold tracking-eyebrow text-paper drop-shadow"
            >
              {caption}
            </motion.p>
          ))}
        </motion.div>
      </div>

      <ScrollCue />
    </Section>
  );
}
