import Section from "../components/Section";
import FeatureSection from "../components/FeatureSection";
import MathOverlay from "../components/MathOverlay";
import ConstructionCircle from "../components/ConstructionCircle";
import { circularityBlueprint } from "../lib/content";

/**
 * Screen 09 — da Vinci-style blueprint sketch with construction nodes, the
 * "NOW 37.9% MORE CIRCULAR" headline and the circularity formula.
 * APPROXIMATION: the hand-drawn Vitruvian/coaster sketch is suggested with faint
 * orange concentric rings + the construction-circle node overlay.
 */
export default function CircularityBlueprint() {
  return (
    <Section
      className="bg-inkDeep"
      style={{
        background:
          "radial-gradient(120% 100% at 70% 50%, #2a1c10 0%, #14100b 60%, #0c0907 100%)",
      }}
    >
      <FeatureSection
        eyebrow={circularityBlueprint.eyebrow}
        body={circularityBlueprint.body}
        footerHeadline={circularityBlueprint.headline}
        textTone="cream"
        icon={<span aria-hidden>◎</span>}
        background={
          <div className="absolute inset-0">
            {/* Faint blueprint rings, left of center */}
            <div className="absolute left-[28%] top-1/2 -translate-y-1/2 opacity-40">
              {[420, 320, 220].map((d) => (
                <div
                  key={d}
                  className="absolute rounded-full border border-accent/40"
                  style={{
                    width: d,
                    height: d,
                    left: -d / 2,
                    top: -d / 2,
                  }}
                />
              ))}
            </div>
            {/* Construction node overlay, right of center */}
            <div className="absolute right-[26%] top-1/2 -translate-y-1/2">
              <ConstructionCircle size={200} />
            </div>
            <p className="absolute right-10 top-[58%] text-[10px] tracking-eyebrow text-cream/50">
              {circularityBlueprint.ropeLabel}
            </p>
          </div>
        }
        overlay={
          <MathOverlay
            formula={circularityBlueprint.formula}
            label={circularityBlueprint.formulaLabel}
          />
        }
      />
    </Section>
  );
}
