import { motion } from "framer-motion";
import StarRating from "./StarRating";
import { fadeUp, inViewOnce } from "../lib/animations";

type ReviewRowProps = {
  name: string;
  role: string;
  stars: string;
  starValue: number;
  quote: string;
  highlight: string;
  thumbTone: string;
  thumbImg?: string;
  thumbAlt?: string;
};

/** A single testimonial row: name/role, stars, quote with one highlighted phrase, media thumb. */
export default function ReviewRow({
  name,
  role,
  stars,
  starValue,
  quote,
  highlight,
  thumbTone,
  thumbImg,
  thumbAlt,
}: ReviewRowProps) {
  const [before, after] = quote.split(highlight);
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      className="grid grid-cols-1 items-center gap-6 border-t border-dotted border-cream/20 py-6 md:grid-cols-[1fr_auto]"
    >
      <div className="max-w-xl">
        <p className="text-[10px] font-bold tracking-eyebrow text-cream">{name}</p>
        <p className="text-[10px] tracking-eyebrow text-muted">{role}</p>
        <div className="mt-2 flex items-center gap-2">
          <StarRating value={starValue} className="text-sm" />
          <span className="text-[10px] tracking-eyebrow text-muted">{stars}</span>
        </div>
        <p className="mt-3 font-display text-xl font-700 leading-snug text-cream md:text-2xl">
          &ldquo;{before}
          <span className="text-accent">{highlight}</span>
          {after}&rdquo;
        </p>
      </div>
      {/* Reviewer media thumbnail — real reviewer still, with the tinted gradient
          kept as a fallback background while the image loads. */}
      {thumbImg ? (
        <img
          src={thumbImg}
          alt={thumbAlt ?? `${name} review thumbnail`}
          loading="lazy"
          className="h-28 w-full rounded-sm object-cover md:w-52"
          style={{ backgroundImage: `linear-gradient(135deg, ${thumbTone}, #1A120B)` }}
        />
      ) : (
        <div
          className="h-28 w-full rounded-sm md:w-52"
          style={{
            backgroundImage: `linear-gradient(135deg, ${thumbTone}, #1A120B)`,
          }}
        />
      )}
    </motion.div>
  );
}
