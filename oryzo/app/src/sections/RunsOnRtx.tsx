import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../components/Section";
import ScrollCue from "../components/ScrollCue";
import { assets, runsOnRtx } from "../lib/content";
import { fadeUp, inViewOnce } from "../lib/animations";

/**
 * Screen 19 — Split layout: left a stack of colorful coaster discs, right an orange
 * panel with a mug on a GPU and the "Runs on RTX 3090" headline that slides
 * horizontally on scroll (oversized, runs off-canvas like the original).
 */
export default function RunsOnRtx() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-18%"]);

  return (
    <Section className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
      <div ref={ref} className="absolute inset-0" aria-hidden />
      {/* Left: real stack of colorful coasters on a neutral field */}
      <div className="relative flex items-center justify-center bg-[#D8D2C6] py-16">
        <img
          src={assets.color}
          alt="Stack of Oryzo coasters in assorted colorways"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Right: orange panel — real mug-on-GPU shot as the scene fill */}
      <div className="relative flex flex-col justify-center overflow-hidden bg-accentDeep py-16">
        <img
          src={assets.rtx3090}
          alt="Geometric mug resting on an Oryzo coaster atop an RTX GPU"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(179,64,0,0.85) 0%, rgba(179,64,0,0.35) 45%, rgba(179,64,0,0) 70%)",
          }}
        />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="relative z-10 px-10 text-xs font-bold tracking-eyebrow text-paper"
        >
          {runsOnRtx.eyebrow}
        </motion.p>
        <motion.h2
          style={{ x }}
          className="relative z-10 whitespace-nowrap px-10 font-display text-[9vw] font-900 leading-none tracking-tight text-paper"
        >
          {runsOnRtx.headline}
        </motion.h2>
      </div>

      <ScrollCue />
    </Section>
  );
}
