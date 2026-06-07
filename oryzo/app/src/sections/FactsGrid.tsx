import { motion } from "framer-motion";
import Section from "../components/Section";
import { factsGrid } from "../lib/content";
import { staggerContainer, staggerItem, inViewOnce } from "../lib/animations";

/**
 * Screen 15 — Three cork-harvest fact cards on a cream field. The third card shows
 * the "No compute. No tokens." thank-you pills radiating in concentric dotted rings.
 */
export default function FactsGrid() {
  return (
    <Section className="flex items-center bg-paper py-24" full>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="grid w-full grid-cols-1 gap-4 px-8 md:grid-cols-3 md:px-10"
      >
        {factsGrid.cards.map((card, i) => {
          const isOlive = card.tone === "olive";
          return (
            <motion.div
              key={i}
              variants={staggerItem}
              className={`relative flex min-h-[360px] flex-col overflow-hidden rounded-sm p-7 ${
                isOlive ? "bg-olive text-paper" : "bg-paperWarm text-olive"
              }`}
            >
              <h3 className="font-display text-2xl font-800 leading-tight tracking-tight">
                {card.title.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </h3>

              {/* Big watermark number */}
              {"bigNumber" in card && card.bigNumber && (
                <span className="pointer-events-none absolute -bottom-6 left-4 font-display text-[10rem] font-900 leading-none text-paper/10">
                  {card.bigNumber}
                </span>
              )}

              {/* Center motif for card 2: wood-grain bark chip */}
              {i === 1 && (
                <div className="my-auto flex justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-olive">
                    <div
                      className="h-16 w-12 rounded-sm bg-paperWarm"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(90deg, #2E3A24 0 1px, transparent 1px 6px)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Thank-you pills for card 3 */}
              {"thanks" in card && card.thanks && (
                <div className="relative my-auto h-44">
                  {[180, 140, 100].map((d) => (
                    <div
                      key={d}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-olive/30"
                      style={{ width: d, height: d }}
                    />
                  ))}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                    {card.thanks.map((t, idx) => (
                      <span
                        key={t}
                        className="rounded-pill bg-olive px-3 py-1 text-[9px] font-bold tracking-eyebrow text-paper"
                        style={{ marginLeft: idx % 2 ? 40 : -40 }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-auto text-sm leading-relaxed opacity-90">
                {card.body}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
