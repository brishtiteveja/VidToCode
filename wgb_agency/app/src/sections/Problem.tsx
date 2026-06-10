import { motion } from "framer-motion";
import Button from "../components/Button";
import { problem } from "../content";
import { rise, stagger, viewportOnce } from "../lib/animations";

function XMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-red">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Problem() {
  return (
    <section id="manifesto" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-4xl font-extrabold leading-[1.04] tracking-tightest text-ink md:text-[3.4rem]"
        >
          Your delivery is world-class. Your <span className="em font-normal">sales pipeline</span> isn’t.
        </motion.h2>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {problem.cards.map((c) => (
            <motion.article
              key={c.title}
              variants={rise}
              className="rounded-card border border-line bg-paper2 p-6"
            >
              <XMark />
              <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-inkMut">{c.body}</p>
            </motion.article>
          ))}

          <motion.article
            variants={rise}
            className="flex flex-col justify-between rounded-card bg-blue p-6 text-cream"
          >
            <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">
              {problem.believe.title}
            </h3>
            <div className="mt-6">
              <Button variant="dark" className="bg-ink/20 hover:bg-ink/40">
                {problem.believe.cta}
              </Button>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
