import { motion } from "framer-motion";

type ScrollCueProps = {
  label?: string;
  className?: string;
};

/** "SCROLL TO CONTINUE" cue with a gently bobbing chevron, centered at scene bottom. */
export default function ScrollCue({
  label = "SCROLL TO CONTINUE",
  className = "",
}: ScrollCueProps) {
  return (
    <div
      className={`pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[10px] font-semibold tracking-eyebrow text-cream/70 ${className}`}
    >
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-4 w-4 items-center justify-center rounded-pill border border-cream/40"
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 2L4 5L7 2" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.span>
      {label}
    </div>
  );
}
