import { useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { newsItems } from "../data/sections";
import { easeOutExpo } from "../lib/animations";

interface FooterSectionProps {
  registerSection: (
    id: string,
    element: HTMLElement | null,
    theme: "dark" | "light"
  ) => void;
}

export default function FooterSection({ registerSection }: FooterSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        registerSection("footer", el, "dark");
      }}
      className="relative bg-beige"
    >
      {/* Main footer content */}
      <div className="px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        {/* Heading */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <SplitText
            text="Floema®, Est. 2007"
            as="h2"
            className="font-display italic text-4xl md:text-5xl lg:text-6xl text-floema-dark leading-[1.1] mb-12"
          />

          <div className="max-w-3xl">
            <SplitText
              text="Going beyond the expected is our calling. True sustainability demands creativity to be aligned with strict principles and answer to the highest standards."
              as="p"
              className="font-display italic text-xl md:text-2xl lg:text-3xl text-floema-dark/80 leading-[1.4]"
              delay={0.2}
            />
          </div>
        </motion.div>

        {/* Recent News */}
        <div className="mb-24 md:mb-32">
          <motion.h3
            className="font-body text-xs tracking-[0.2em] uppercase text-floema-dark/50 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            Recent News
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={item.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  ease: easeOutExpo,
                  delay: index * 0.1,
                }}
              >
                {/* Thumbnail placeholder */}
                <div
                  className="w-full aspect-[16/9] rounded-xl mb-5 overflow-hidden"
                  style={{ background: item.color }}
                >
                  <motion.div
                    className="w-full h-full"
                    style={{ background: item.color }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: easeOutExpo }}
                  />
                </div>

                {/* Date */}
                <span className="font-body text-[11px] tracking-[0.15em] uppercase text-floema-dark/40 mb-2 block">
                  {item.date}
                </span>

                {/* Title */}
                <h4 className="font-display italic text-xl md:text-2xl text-floema-dark leading-[1.3] group-hover:text-floema-dark/70 transition-colors duration-300">
                  {item.title}
                </h4>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-floema-dark/10 px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          className="font-body text-xs text-floema-dark/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          &copy; {new Date().getFullYear()} Floema. All rights reserved.
        </motion.p>

        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 }}
        >
          <a
            href="#"
            className="font-body text-xs text-floema-dark/40 hover:text-floema-dark/70 transition-colors duration-300 tracking-[0.1em] uppercase"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-body text-xs text-floema-dark/40 hover:text-floema-dark/70 transition-colors duration-300 tracking-[0.1em] uppercase"
          >
            Terms
          </a>
          <a
            href="#"
            className="font-body text-xs text-floema-dark/40 hover:text-floema-dark/70 transition-colors duration-300 tracking-[0.1em] uppercase"
          >
            Instagram
          </a>
          <a
            href="#"
            className="font-body text-xs text-floema-dark/40 hover:text-floema-dark/70 transition-colors duration-300 tracking-[0.1em] uppercase"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
