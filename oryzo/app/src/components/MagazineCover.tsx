import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { assets, productGallery } from "../lib/content";
import { easeOutExpo, inViewOnce, useReducedMotionFlag } from "../lib/animations";

/**
 * Satirical "RISE" magazine cover tile seen in the product gallery carousel.
 *
 * Motion: the card scale/zoom-settles on enter, and the issue badge counter
 * ticks once (25 → 26) shortly after it comes into view, matching the recording.
 */
export default function MagazineCover() {
  const { magazine } = productGallery;
  const reduced = useReducedMotionFlag();

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const base = parseInt(magazine.issue.replace(/\D/g, ""), 10) || 25;
  const [issueNo, setIssueNo] = useState(base);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setIssueNo(base + 1), 750);
    return () => clearTimeout(t);
  }, [inView, base]);
  const issueText = magazine.issue.replace(/\d+/, String(issueNo));

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={inViewOnce}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className="flex h-full flex-col justify-between bg-paperWarm p-4 text-ink"
    >
      <div className="flex items-start justify-between">
        <h4 className="font-serif text-4xl font-900 leading-none tracking-tight">
          {magazine.title}
        </h4>
        <motion.span
          key={issueNo}
          initial={reduced ? false : { opacity: 0.3, scale: 1.25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
          className="font-mono text-[9px] font-semibold tracking-eyebrow"
        >
          {issueText}
        </motion.span>
      </div>
      {/* The cover's hero photo — the real RISE "We Are So Cooked!" cup shot.
          object-cover crops to the central cup so the headline/title stay readable. */}
      <img
        src={assets.outro}
        alt="RISE magazine cover featuring an Oryzo coffee cup"
        loading="lazy"
        className="my-3 min-h-0 flex-1 rounded-sm object-cover"
      />
      <p className="whitespace-pre-line font-serif text-2xl font-800 leading-none">
        {magazine.cover}
      </p>
    </motion.div>
  );
}
