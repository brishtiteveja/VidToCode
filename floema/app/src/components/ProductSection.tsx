import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionData } from "../data/sections";
import SplitText from "./SplitText";
import CategoryBadge from "./CategoryBadge";
import CatalogueCard from "./CatalogueCard";
import ScrollIndicator from "./ScrollIndicator";
import { easeOutExpo } from "../lib/animations";

interface ProductSectionProps {
  data: SectionData;
  registerSection: (
    id: string,
    element: HTMLElement | null,
    theme: "dark" | "light"
  ) => void;
}

export default function ProductSection({
  data,
  registerSection,
}: ProductSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax for background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Content fade based on scroll
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4, 0.5],
    [0.5, 1, 1, 0]
  );

  return (
    <div
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className="relative"
      style={{ height: "200vh" }}
    >
      {/* Sticky container */}
      <div
        ref={(el) => {
          (stickyRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          registerSection(data.category, el, "light");
        }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Background gradient with parallax */}
        <motion.div
          className="absolute inset-0 noise-overlay"
          style={{
            background: data.gradient,
            y: bgY,
            height: "150%",
            top: "-25%",
          }}
        />

        {/* Gradient overlay for depth */}
        <div className="section-gradient-overlay" />

        {/* Content overlay */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12 lg:p-16"
          style={{ opacity: contentOpacity }}
        >
          {/* Top section */}
          <div className="flex flex-col gap-4 pt-16">
            {/* Section number */}
            <motion.span
              className="font-body text-sm tracking-[0.3em] text-white/60"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              {data.num}
            </motion.span>

            {/* Category badge */}
            <CategoryBadge
              category={data.category}
              color={data.badge}
              delay={0.1}
            />

            {/* Made to Last label */}
            <motion.span
              className="font-body text-[10px] tracking-[0.25em] uppercase text-white/50 mt-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
            >
              Made to Last
            </motion.span>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 pb-4">
            {/* Left: Headline + CTA */}
            <div className="flex-1 max-w-xl">
              <SplitText
                text={data.headline}
                as="h2"
                className="font-display italic text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] mb-8"
                delay={0.15}
              />

              {/* CTA Button */}
              <motion.button
                className="inline-flex items-center gap-3 bg-white text-floema-dark px-6 py-3 rounded-lg font-body text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{data.cta}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Center: Scroll indicator */}
            <div className="hidden md:flex flex-col items-center">
              <ScrollIndicator parentRef={sectionRef} />
            </div>

            {/* Right: Catalogue card (if applicable) */}
            {data.hasCatalogue && (
              <div className="flex-shrink-0">
                <CatalogueCard category={data.category} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
