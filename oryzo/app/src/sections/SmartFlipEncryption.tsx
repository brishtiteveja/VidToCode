import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section";
import CorkDisc from "../components/CorkDisc";
import Pill from "../components/Pill";
import ScrollCue from "../components/ScrollCue";
import { smartFlipEncryption } from "../lib/content";
import { fadeUp, inViewOnce } from "../lib/animations";

/**
 * Screen 11 — "SECURE COMMUNICATIONS SIMPLIFIED" on a green cutting mat with the
 * ORYZO-branded disc. The "DECODE MESSAGE" pill flips the disc (3D rotateY) and
 * reveals the decoded message (real interaction).
 */
export default function SmartFlipEncryption() {
  const [decoded, setDecoded] = useState(false);

  return (
    <Section className="flex flex-col items-center justify-center">
      {/* Green cutting mat backdrop with wood strip on the left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, #6B4626 0 14%, #3FAE8E 14% 100%)",
          backgroundImage:
            "linear-gradient(rgba(245,227,207,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(245,227,207,0.16) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 36px 36px, 36px 36px",
        }}
      />

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="relative z-10 text-center font-display text-2xl font-800 tracking-eyebrow text-paper md:text-3xl"
      >
        {smartFlipEncryption.headline}
      </motion.h2>

      <motion.div
        whileHover={{ scale: 1.03 }}
        animate={{ rotateY: decoded ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10 my-10"
      >
        <CorkDisc size={240} variant="puck" label={smartFlipEncryption.discLabel} />
      </motion.div>

      <AnimatePresence>
        {decoded && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mb-4 text-xs font-bold tracking-eyebrow text-ink"
          >
            {smartFlipEncryption.decoded}
          </motion.p>
        )}
      </AnimatePresence>

      <Pill variant="solid" className="relative z-10" onClick={() => setDecoded((d) => !d)}>
        {smartFlipEncryption.cta}
      </Pill>

      <ScrollCue />
    </Section>
  );
}
