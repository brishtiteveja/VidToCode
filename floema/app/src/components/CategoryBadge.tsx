import { motion } from "framer-motion";
import { easeOutExpo } from "../lib/animations";

interface CategoryBadgeProps {
  category: string;
  color: string;
  delay?: number;
}

// Simple icon paths for each category
const categoryIcons: Record<string, JSX.Element> = {
  Urban: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="4" width="5" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="1" width="5" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="3" y1="6" x2="4" y2="6" stroke="currentColor" strokeWidth="1" />
      <line x1="3" y1="8" x2="4" y2="8" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="3" x2="11" y2="3" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  Nature: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 13V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 8C5 8 3 6 3 3C5 3 7 5 7 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 6C9 5 11 3 11 1C9 1 7 3 7 6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),
  RePlastic: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7A5 5 0 0 1 7 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 7A5 5 0 0 1 7 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 2L7 2L6 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L7 12L8 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Golf: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 2L12 4.5L7 7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <ellipse cx="7" cy="12.5" rx="3" ry="1" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  Details: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 4V7.5L9.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function CategoryBadge({ category, color, delay = 0 }: CategoryBadgeProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-pill text-white text-xs font-body font-medium tracking-[0.1em] uppercase"
      style={{ backgroundColor: color }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay }}
    >
      {categoryIcons[category]}
      <span>{category}</span>
    </motion.div>
  );
}
