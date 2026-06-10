import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easeOutExpo } from "../lib/animations";

interface ScrollIndicatorProps {
  parentRef?: React.RefObject<HTMLElement | null>;
}

export default function ScrollIndicator({ parentRef }: ScrollIndicatorProps) {
  const { scrollYProgress } = useScroll({
    target: parentRef || undefined,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      style={{ opacity }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: 2.5 }}
    >
      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/70">
        Scroll to Explore
      </span>
      <svg
        className="scroll-indicator-chevron w-4 h-4 text-white/70"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 6L8 11L13 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
