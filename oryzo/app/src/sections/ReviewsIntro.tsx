import { motion } from "framer-motion";
import Section from "../components/Section";
import CorkDisc from "../components/CorkDisc";
import DottedFrame from "../components/DottedFrame";
import StarRating from "../components/StarRating";
import { assets, reviewsIntro } from "../lib/content";
import { fadeUp, inViewOnce } from "../lib/animations";

/**
 * Screen 16 — Glowing cork bowl center stage, "RATING & REVIEWS", 4.9/5 and the
 * first highlighted testimonial along the bottom rail.
 */
export default function ReviewsIntro() {
  const { firstReview } = reviewsIntro;
  const [before, after] = firstReview.quote.split(reviewsIntro.firstReview.highlight);

  return (
    <Section
      className="flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(80% 60% at 50% 45%, #4a2e16 0%, #1a120b 55%, #0c0907 100%)",
      }}
    >
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="absolute right-10 top-1/4 z-10 max-w-xs text-right font-display text-2xl font-700 leading-snug text-cream"
      >
        {reviewsIntro.body}
      </motion.p>

      {/* "ORYZO IN USE" — real interview/video still */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="absolute left-10 top-1/4 z-10 hidden md:block"
      >
        <DottedFrame className="w-48" handle={false}>
          <img
            src={assets.videoThumb}
            alt="ORYZO brand video still of a founder on camera"
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        </DottedFrame>
        <p className="mt-2 font-mono text-[9px] font-bold tracking-eyebrow text-cream/70">
          {reviewsIntro.inUseLabel}
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
        style={{ filter: "drop-shadow(0 0 60px rgba(232,99,26,0.45))" }}
      >
        <CorkDisc size={300} variant="bowl" />
      </motion.div>

      {/* Bottom rail */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-dotted border-cream/20 px-8 pb-6 pt-4 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold tracking-eyebrow text-cream/80">
          <span>{reviewsIntro.ratingLabel}</span>
          <span className="flex items-center gap-2">
            {reviewsIntro.reviewCount}
            <StarRating value={4.9} className="text-sm" />
            {reviewsIntro.score}
          </span>
          <span>{reviewsIntro.inUseLabel}</span>
        </div>
        <div className="mt-3 max-w-lg">
          <StarRating value={5} className="text-sm text-cream" />
          <span className="ml-2 text-[10px] tracking-eyebrow text-muted">
            {firstReview.stars}
          </span>
          <p className="mt-1 font-display text-lg font-700 leading-snug text-cream">
            &ldquo;{before}
            <span className="text-accent">{reviewsIntro.firstReview.highlight}</span>
            {after}&rdquo;
          </p>
        </div>
      </div>
    </Section>
  );
}
