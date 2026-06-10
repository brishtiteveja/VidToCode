type Props = {
  className?: string;
  /** rotation in degrees — the WGB mark leans slightly */
  rotate?: number;
};

/**
 * WGB four-point "northstar" mark — a sharp sparkle with concave sides.
 * Used as the logo glyph and as the small accent inside buttons.
 */
export default function Spark({ className = "h-5 w-5", rotate = -12 }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M50 1 C53 34 56 47 99 50 C56 53 53 66 50 99 C47 66 44 53 1 50 C44 47 47 34 50 1 Z"
        fill="currentColor"
      />
    </svg>
  );
}
