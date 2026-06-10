import { motion } from "framer-motion";
import { easeOutExpo } from "../lib/animations";

interface CatalogueCardProps {
  category: string;
}

export default function CatalogueCard({ category }: CatalogueCardProps) {
  return (
    <motion.div
      className="catalogue-card cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-white"
          >
            <path
              d="M2 2H5L6 4H14L12 10H4L2 2Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M3 13L13 13"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M3 15L13 15"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="font-body text-[10px] tracking-[0.15em] uppercase text-white/60">
            Download
          </p>
          <p className="font-body text-sm font-medium text-white">
            {category} Catalogue
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300">
        <span className="font-body text-xs">PDF — 12MB</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transform group-hover:translate-y-0.5 transition-transform duration-300"
        >
          <path
            d="M7 2V10M7 10L4 7M7 10L10 7"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12H12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}
