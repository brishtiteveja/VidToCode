import { useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";
import FloatingThumbnails from "./FloatingThumbnails";
import { easeOutExpo } from "../lib/animations";

interface HeroSectionProps {
  visible: boolean;
  registerSection: (
    id: string,
    element: HTMLElement | null,
    theme: "dark" | "light"
  ) => void;
}

export default function HeroSection({
  visible,
  registerSection,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        registerSection("hero", el, "dark");
      }}
      className="relative min-h-screen bg-beige flex items-center justify-center overflow-hidden"
    >
      {/* Floating product thumbnails */}
      <FloatingThumbnails visible={visible} />

      {/* Hero headline */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
        >
          <SplitText
            text="Spaces for people, made for life."
            as="h1"
            className="font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-floema-dark leading-[1.1] tracking-[-0.02em]"
            delay={0.5}
          />
        </motion.div>

        {/* Subtle tagline */}
        <motion.p
          className="mt-8 font-body text-sm text-floema-dark/50 tracking-[0.15em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 20,
          }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 1.2 }}
        >
          Portuguese design &middot; Since 2007
        </motion.p>
      </div>

      {/* Scroll hint at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
        transition={{ duration: 0.6, ease: easeOutExpo, delay: 1.8 }}
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-floema-dark/40">
          Scroll to Explore
        </span>
        <svg
          className="scroll-indicator-chevron w-4 h-4 text-floema-dark/40"
          viewBox="0 0 16 16"
          fill="none"
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
    </section>
  );
}
