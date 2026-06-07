import { motion } from "framer-motion";
import Section from "../components/Section";
import FeatureSection from "../components/FeatureSection";
import MathOverlay from "../components/MathOverlay";
import { thermodynamicStability } from "../lib/content";

/**
 * Screen 08 — Thermal-camera heatmap render of a steaming cup, with a
 * softmax-temperature joke scale (CREATIVE/BALANCED/DETERMINISTIC).
 * APPROXIMATION: the thermal photo is rebuilt with a magenta→hot radial gradient
 * scene and a glowing cup; the rising heat plume is an animated blurred shape.
 */
export default function ThermodynamicStability() {
  return (
    <Section className="bg-thermalMagenta">
      <FeatureSection
        eyebrow={thermodynamicStability.eyebrow}
        body={thermodynamicStability.body}
        footerHeadline={thermodynamicStability.headline}
        textTone="cream"
        icon={<span aria-hidden>🌡</span>}
        background={
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 60% 70%, #FFD23F 0%, #E8631A 18%, #8a1f5a 45%, #5A1840 70%, #2a0c20 100%)",
              }}
            />
            {/* Glowing cup */}
            <div className="absolute bottom-[34%] left-[52%] -translate-x-1/2">
              <div
                className="h-32 w-24 rounded-b-md"
                style={{
                  background:
                    "linear-gradient(180deg, #FFD23F 0%, #FF7A1A 60%, #E8631A 100%)",
                  boxShadow: "0 0 60px 10px rgba(255,210,63,0.6)",
                }}
              />
              {/* Heat plume */}
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4], scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="absolute -top-24 left-1/2 h-28 w-10 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(255,122,26,0.8), transparent)",
                  filter: "blur(10px)",
                }}
              />
            </div>
            {/* Softmax temperature scale, right edge */}
            <div className="absolute right-8 top-1/4 flex flex-col gap-16">
              {thermodynamicStability.scale.map((s) => (
                <div key={s.label} className="text-right">
                  <p className="font-mono text-[10px] font-bold tracking-eyebrow text-cream">
                    {s.label}
                  </p>
                  <p className="font-mono text-[10px] text-thermalHot">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        }
        overlay={
          <MathOverlay
            formula={thermodynamicStability.formula}
            label={thermodynamicStability.modelLabel}
            note={thermodynamicStability.modelNote}
          />
        }
      />
    </Section>
  );
}
