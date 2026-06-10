import { motion } from "framer-motion";
import { testimonials } from "../content";
import { rise, stagger, viewportOnce } from "../lib/animations";

export default function Testimonials() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink md:text-[3rem]"
        >
          {testimonials.pre}
          <span className="em font-normal">{testimonials.em}</span>
        </motion.h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-inkMut">{testimonials.sub}</p>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4"
        >
          {testimonials.items.map((t) => (
            <motion.figure
              key={t.name}
              variants={rise}
              className="break-inside-avoid rounded-card border border-line bg-paper2 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-ink to-inkMut text-[13px] font-bold text-cream">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <figcaption className="font-display text-[14px] font-bold tracking-tight text-ink">
                    {t.name}
                  </figcaption>
                  <div className="text-[12px] text-inkMut">{t.role}</div>
                </div>
              </div>
              <blockquote className="mt-4 text-[14px] leading-relaxed text-ink/80">“{t.quote}”</blockquote>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
