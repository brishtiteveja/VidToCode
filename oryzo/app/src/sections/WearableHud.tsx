import { useState } from "react";
import { motion } from "framer-motion";
import Section from "../components/Section";
import DottedFrame from "../components/DottedFrame";
import HudCard from "../components/HudCard";
import ScrollCue from "../components/ScrollCue";
import { assets, wearableHud } from "../lib/content";
import { fadeUp, inViewOnce } from "../lib/animations";

/**
 * Screen 05 — Person wearing the disc on their jacket with a glassy cyan HUD card.
 * The "Refill" button is wired to increment the cup counter (real state). The real
 * wearable lifestyle shot fills the crop-frame; the interactive HUD card stays on top.
 */
export default function WearableHud() {
  const [cups, setCups] = useState(Number(wearableHud.hud.cups));

  return (
    <Section className="flex items-center justify-center bg-gradient-to-br from-ink2 via-inkDeep to-wood/40">
      <div className="absolute left-8 top-1/2 z-10 -translate-y-1/2 md:left-10">
        <p className="text-xs font-bold tracking-eyebrow text-cream/70">
          {wearableHud.eyebrow}
        </p>
        <h2 className="font-display text-3xl font-800 text-cream">
          {wearableHud.headline}
        </h2>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
      >
        <DottedFrame className="relative h-[480px] w-[360px]">
          {/* Real wearable shot: person with the disc worn on their jacket */}
          <img
            src={assets.intro}
            alt="Person wearing the Oryzo cork disc on their jacket with a heads-up display"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute left-1/2 top-[12%] z-10 -translate-x-1/2">
            <HudCard cups={cups} onRefill={() => setCups((c) => c + 1)} />
          </div>
        </DottedFrame>
      </motion.div>

      <ScrollCue />
    </Section>
  );
}
