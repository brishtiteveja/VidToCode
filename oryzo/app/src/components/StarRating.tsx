type StarRatingProps = {
  value: number;
  outOf?: number;
  className?: string;
};

/** Star-rating glyph row used in the reviews scenes. Supports a single half-star. */
export default function StarRating({
  value,
  outOf = 5,
  className = "",
}: StarRatingProps) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} out of ${outOf}`}>
      {Array.from({ length: outOf }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <span key={i} className="relative inline-block text-cream/25">
            ★
            <span
              className="absolute inset-0 overflow-hidden text-cream"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}
