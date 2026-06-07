import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section";
import Pill from "../components/Pill";
import DottedFrame from "../components/DottedFrame";
import { assets, contactFooter } from "../lib/content";
import { fadeUp, inViewOnce } from "../lib/animations";

/**
 * Screen 23 — Contact / footer. Working newsletter input (controlled state, fake
 * submit -> "thanks" toast), COPY URL button (navigator.clipboard), social + legal
 * links, the Lusion "L" mark, drifting coffee-bean particles, and the verbatim
 * satire disclaimer.
 */
export default function ContactFooter() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Pre-compute deterministic bean positions so they don't reshuffle on re-render.
  const beans = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        left: (i * 53) % 100,
        top: (i * 37) % 100,
        delay: (i % 8) * 0.6,
        size: 6 + (i % 4) * 3,
        rot: (i * 47) % 180,
      })),
    [],
  );

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast(contactFooter.newsletter.success);
    setEmail("");
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("URL copied to clipboard");
    } catch {
      showToast("Copy failed — copy from the address bar");
    }
  };

  return (
    <Section className="relative flex flex-col justify-between bg-inkDeep pt-28">
      {/* Drifting coffee-bean particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {beans.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: b.size,
              height: b.size * 1.4,
              transform: `rotate(${b.rot}deg)`,
              background:
                "radial-gradient(circle at 50% 30%, #6b4a2a, #2a1a0d)",
              opacity: 0.5,
            }}
            animate={{ y: [0, -22, 0], x: [0, 12, 0], opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 7 + (i % 5), repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Headline block */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="relative z-10 flex items-start gap-6 px-8 md:px-10"
      >
        {/* Lusion "L" mark */}
        <div className="mt-1 hidden shrink-0 md:block">
          <div className="relative h-16 w-12">
            <span className="absolute left-0 top-0 h-10 w-4 bg-paper" />
            <span className="absolute bottom-0 left-0 h-4 w-12 bg-paper" />
          </div>
        </div>
        <div>
          <h2 className="font-display text-3xl font-900 leading-none tracking-tight text-paper md:text-5xl">
            {contactFooter.headline.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <h3 className="mt-6 font-display text-3xl font-900 leading-none tracking-tight text-paper md:text-5xl">
            {contactFooter.subhead.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h3>
        </div>

        <div className="ml-auto hidden flex-col items-end gap-4 md:flex">
          {/* Real "we caught your attention" shot — coasters held over the eyes */}
          <DottedFrame className="w-40" handle={false}>
            <img
              src={assets.attention}
              alt="Person holding two Oryzo coasters over their eyes, grinning"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </DottedFrame>
          <a href={contactFooter.ctaHref} target="_blank" rel="noreferrer">
            <Pill variant="ghost">{contactFooter.cta}</Pill>
          </a>
        </div>
      </motion.div>

      {/* Footer grid */}
      <div className="relative z-10 mt-20 grid grid-cols-1 gap-10 px-8 pb-10 md:grid-cols-[260px_1fr_auto] md:px-10">
        {/* Share / copy box */}
        <div className="border border-dashed border-cream/25 p-5">
          <p className="text-[10px] font-bold tracking-eyebrow text-accent">
            {contactFooter.share.builtBy} <span aria-hidden>♥</span>
          </p>
          <p className="text-[10px] font-bold tracking-eyebrow text-accent">
            {contactFooter.share.withLove}
          </p>
          <p className="mt-3 text-[11px] font-bold tracking-eyebrow text-cream">
            {contactFooter.share.shareLine1}
          </p>
          <p className="text-[11px] font-bold tracking-eyebrow text-cream">
            {contactFooter.share.shareLine2}
          </p>
          <button
            onClick={handleCopyUrl}
            className="mt-4 rounded-pill border border-dashed border-cream/40 px-4 py-1.5 text-[10px] font-bold tracking-eyebrow text-cream transition-colors hover:border-cream"
          >
            {contactFooter.share.copyUrl}
          </button>
        </div>

        {/* Newsletter + contacts */}
        <div>
          <form onSubmit={handleSubscribe}>
            <label className="text-[10px] font-bold tracking-eyebrow text-muted">
              {contactFooter.newsletter.label}
            </label>
            <div className="mt-2 flex items-center gap-3 border-b border-dotted border-cream/30 pb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={contactFooter.newsletter.placeholder}
                className="w-full bg-transparent text-sm tracking-eyebrow text-cream placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-cream transition-transform hover:translate-x-1"
              >
                →
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap gap-10">
            {contactFooter.contacts.map((c) => (
              <div key={c.label}>
                <p className="text-[10px] font-bold tracking-eyebrow text-muted">
                  {c.label}
                </p>
                <p className="text-[11px] font-bold tracking-eyebrow text-cream">
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-2">
          {contactFooter.socials.map((s) => (
            <a
              key={s}
              href={contactFooter.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-bold tracking-eyebrow text-cream transition-opacity hover:opacity-60"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar: legal + disclaimer */}
      <div className="relative z-10 flex flex-col gap-4 border-t border-cream/10 px-8 py-5 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex gap-6">
          {contactFooter.legal.map((l) => (
            <a
              key={l}
              href={contactFooter.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold tracking-eyebrow text-muted hover:text-cream"
            >
              {l}
            </a>
          ))}
        </div>
        <p className="max-w-md text-right text-[9px] leading-relaxed tracking-wide text-muted">
          {contactFooter.disclaimer}
        </p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-pill bg-accent px-5 py-2.5 text-xs font-bold tracking-eyebrow text-paper shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
