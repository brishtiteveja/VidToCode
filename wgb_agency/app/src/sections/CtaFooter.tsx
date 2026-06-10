import { motion } from "framer-motion";
import Spark from "../components/Spark";
import Button from "../components/Button";
import { footer } from "../content";
import { viewportOnce } from "../lib/animations";

export default function CtaFooter() {
  return (
    <footer id="about" className="relative overflow-hidden bg-ink text-cream">
      {/* diagonal blue swoosh */}
      <div
        className="pointer-events-none absolute -left-[10%] bottom-0 h-[140%] w-[80%] -rotate-[34deg] rounded-[40%] bg-gradient-to-tr from-blue via-blueBright to-blue/0 blur-[2px]"
        style={{ transformOrigin: "bottom left" }}
      />

      <div className="relative mx-auto max-w-shell px-6 pb-10 pt-24 md:pt-28">
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2">
          {/* big wordmark */}
          <div className="flex items-end gap-4">
            <Spark className="h-16 w-16" />
            <div>
              <div className="font-display text-7xl font-extrabold lowercase leading-none tracking-tightest md:text-8xl">
                wgb
              </div>
              <div className="mt-2 text-sm leading-tight text-creamMut">
                we go
                <br />
                beyond
              </div>
            </div>
          </div>

          {/* founder CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="justify-self-end rounded-xl border border-cream/10 bg-ink/60 p-6 backdrop-blur-sm"
          >
            <div className="flex gap-3">
              {footer.founders.map((f) => (
                <div key={f.name} className="relative h-40 w-32 overflow-hidden rounded-lg">
                  <div className={`absolute inset-0 bg-gradient-to-b ${f.tone}`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-2">
                    <div className="text-[12px] font-bold leading-tight">{f.name}</div>
                    <div className="text-[10px] text-creamMut">{f.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight">
              {footer.pre}
              <span className="em font-normal">{footer.em}</span>
              {footer.post}
            </h3>
            <div className="mt-4">
              <Button variant="blue">{footer.cta}</Button>
            </div>
          </motion.div>
        </div>

        {/* footer nav */}
        <div className="relative mt-24 flex flex-col items-start justify-between gap-6 border-t border-cream/10 pt-8 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-creamMut">
            {footer.links.map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-cream">
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md border border-cream/20 px-4 py-2 text-[13px] font-medium transition-colors hover:bg-cream hover:text-ink"
          >
            <span className="font-bold">in</span> Follow us
          </a>
        </div>

        <div className="relative mt-8 flex flex-col gap-3 text-[12px] text-creamMut md:flex-row md:items-center md:justify-between">
          <span>{footer.copyright}</span>
          <div className="flex gap-5">
            {footer.legal.map((l) => (
              <a key={l} href="#" className="hover:text-cream">
                {l}
              </a>
            ))}
          </div>
          <span>{footer.credits}</span>
        </div>
      </div>
    </footer>
  );
}
