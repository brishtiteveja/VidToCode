import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Marquee from "../components/Marquee";
import { cases } from "../content";
import { rise, stagger, viewportOnce } from "../lib/animations";

export default function Cases() {
  const [active, setActive] = useState(2);

  return (
    <section id="cases" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink md:text-[3rem]"
          >
            {cases.pre}
            <span className="em font-normal">{cases.em}</span>
          </motion.h2>
          <Button variant="dark">{cases.cta}</Button>
        </div>

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5"
        >
          {cases.items.map((c, i) => (
            <motion.button
              key={c.name}
              variants={rise}
              onMouseEnter={() => setActive(i)}
              className="group relative aspect-[3/4.4] overflow-hidden rounded-card text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${c.tone}`} />
              <div className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/0" />

              {/* stat overlay */}
              <div className="absolute left-3 top-3 text-cream drop-shadow">
                <div className="font-display text-2xl font-extrabold leading-none">{c.stat}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wide text-cream/80">{c.statLabel}</div>
              </div>

              {/* blue label bar */}
              <div className="absolute inset-x-2 bottom-2 rounded-md bg-blue px-3 py-3 text-center">
                <span className="font-display text-[13px] font-bold uppercase tracking-wide text-cream">
                  {c.name}
                </span>
                <motion.div
                  initial={false}
                  animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <span className="mt-2 block text-[11px] font-medium text-cream/80">Explore case →</span>
                </motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* carousel controls (decorative) */}
        <div className="mt-8 flex justify-center gap-2">
          <Arrow dir={-1} />
          <Arrow dir={1} />
        </div>
      </div>

      <div className="mt-16">
        <Marquee items={cases.logos} />
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: 1 | -1 }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-cream transition hover:bg-inkSoft">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: dir === -1 ? "rotate(180deg)" : "none" }}>
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
