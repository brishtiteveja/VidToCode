import { motion } from "framer-motion";
import Spark from "../components/Spark";
import { comparison } from "../content";
import { rise, stagger, viewportOnce } from "../lib/animations";

function Row({ text, kind }: { text: string; kind: "x" | "plus" }) {
  return (
    <motion.div
      variants={rise}
      className="flex items-start gap-3 rounded-card border border-line bg-paper2 p-4"
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
          kind === "x" ? "bg-red/12 text-red" : "bg-blue/12 text-blue"
        }`}
      >
        {kind === "x" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        ) : (
          <Spark className="h-3.5 w-3.5" rotate={0} />
        )}
      </span>
      <p className="text-[13.5px] leading-snug text-ink/85">{text}</p>
    </motion.div>
  );
}

export default function Comparison() {
  return (
    <section className="relative overflow-hidden bg-paperPink py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-display text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink md:text-[3.2rem]"
        >
          {comparison.pre}
          <span className="em font-normal">{comparison.em}</span>
        </motion.h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-inkMut">
          {comparison.sub}
        </p>

        <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* central connector spark */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-blue md:block">
            <Spark className="h-10 w-10" />
          </div>

          <div>
            <div className="mb-5">
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">{comparison.left.title}</h3>
              <p className="text-[12.5px] text-inkMut">{comparison.left.subtitle}</p>
            </div>
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="space-y-3"
            >
              {comparison.left.items.map((t) => (
                <Row key={t} text={t} kind="x" />
              ))}
            </motion.div>
          </div>

          <div>
            <div className="mb-5">
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">{comparison.right.title}</h3>
              <p className="text-[12.5px] text-inkMut">{comparison.right.subtitle}</p>
            </div>
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="space-y-3"
            >
              {comparison.right.items.map((t) => (
                <Row key={t} text={t} kind="plus" />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
