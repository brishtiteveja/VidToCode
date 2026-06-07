import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import IconBadge from "./IconBadge";
import { fadeUp, staggerContainer, staggerItem, inViewOnce } from "../lib/animations";

type FeatureSectionProps = {
  eyebrow: string;
  body: string;
  /** Big footer headline shown bottom-left (one line per array entry). */
  footerHeadline: string[];
  icon?: ReactNode;
  background: ReactNode;
  overlay?: ReactNode;
  textTone?: "cream" | "ink";
  className?: string;
};

/**
 * Reusable feature layout: left text column (icon badge + eyebrow + body) over a
 * full-bleed photographic render, with a giant footer headline bottom-left and an
 * optional bottom-right math overlay. Matches Screens 07 / 08 / 09.
 */
export default function FeatureSection({
  eyebrow,
  body,
  footerHeadline,
  icon,
  background,
  overlay,
  textTone = "cream",
  className = "",
}: FeatureSectionProps) {
  const tone = textTone === "cream" ? "text-cream" : "text-ink";
  return (
    <div className={`relative min-h-screen w-full ${className}`}>
      <div className="absolute inset-0">{background}</div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className={`relative z-10 max-w-sm px-8 pt-28 md:px-10 ${tone}`}
      >
        {icon && (
          <motion.div variants={staggerItem}>
            <IconBadge>{icon}</IconBadge>
          </motion.div>
        )}
        <motion.div variants={staggerItem} className="mt-5">
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.p
          variants={staggerItem}
          className="mt-3 text-sm leading-relaxed opacity-90"
        >
          {body}
        </motion.p>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className={`absolute bottom-12 left-8 z-10 font-display text-4xl font-900 leading-none tracking-tight md:left-10 md:text-6xl ${tone}`}
      >
        {footerHeadline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.h2>

      {overlay && (
        <div className="absolute bottom-10 right-8 z-10 md:right-10">{overlay}</div>
      )}
    </div>
  );
}
