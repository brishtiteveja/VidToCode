import { motion } from "framer-motion";
import { statement } from "../content";
import { viewportOnce } from "../lib/animations";

/** Full-bleed black divider with a faint grid and a single editorial line. */
export default function StatementBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40">
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f7efe6 1px, transparent 1px), linear-gradient(to bottom, #f7efe6 1px, transparent 1px)",
          backgroundSize: "50% 50%",
        }}
      />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-shell px-6 text-center font-display text-3xl font-medium tracking-tight text-cream md:text-5xl"
      >
        {statement.pre}
        <span className="em">{statement.em}</span>
        {statement.post}
      </motion.h2>
    </section>
  );
}
