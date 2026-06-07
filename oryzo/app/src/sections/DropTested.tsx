import { motion } from "framer-motion";
import Section from "../components/Section";
import ScrollCue from "../components/ScrollCue";
import { assets, dropTested } from "../lib/content";
import { fadeUp, inViewOnce } from "../lib/animations";

/**
 * Screen 20 — Split: left macro cork close-up ("PERFECT BY DESIGN"), right an
 * olive panel with the "Drop-Tested" headline, test metadata, and the real
 * high-speed impact shot, still wrapped in the floating debris/shake animation.
 */
export default function DropTested() {
  return (
    <Section className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
      {/* Left macro — real cork close-up */}
      <div className="relative flex items-end p-8">
        <img
          src={assets.perfect}
          alt="Macro close-up of the Oryzo cork coaster's recessed well"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <p className="relative z-10 font-mono text-[10px] font-bold tracking-eyebrow text-ink">
          {dropTested.sideLabel}
        </p>
      </div>

      {/* Right olive panel */}
      <div className="relative flex flex-col justify-center overflow-hidden bg-oliveCard py-16">
        <div className="flex flex-wrap justify-between gap-4 px-10 font-mono text-[10px] font-bold tracking-eyebrow text-paper/80">
          {dropTested.meta.map((m) => (
            <span key={m.label}>
              {m.label}: {m.value}
            </span>
          ))}
        </div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="px-10 font-display text-[9vw] font-900 leading-none tracking-tight text-paper"
        >
          {dropTested.headline}
        </motion.h2>

        {/* Real impact shot + floating debris */}
        <div className="relative mt-6 flex h-48 items-center justify-center">
          <motion.div
            animate={{ rotate: [-6, 6, -6], y: [0, -6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={assets.dropTest}
              alt="Oryzo cork disc captured mid-impact in a drop test, kicking up dust"
              loading="lazy"
              className="h-44 w-44 rounded-sm object-cover shadow-2xl"
            />
          </motion.div>
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-cork2"
              style={{
                left: `${50 + (Math.cos(i) * 30)}%`,
                top: `${55 + Math.sin(i * 1.7) * 25}%`,
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>

      <ScrollCue />
    </Section>
  );
}
