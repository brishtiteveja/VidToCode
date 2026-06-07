import Section from "../components/Section";
import Carousel from "../components/Carousel";
import ScrollCue from "../components/ScrollCue";
import { alwaysOnGallery } from "../lib/content";

const toneMap: Record<string, string> = {
  accentDeep: "#C43B15",
  cork: "#C9A36A",
  olive: "#2E3A24",
};

/**
 * Screen 18 — "Always On" horizontal panel carousel ending on
 * "24/7 UPTIME. NO POWER REQUIRED." Working horizontal scroll.
 */
export default function AlwaysOnGallery() {
  return (
    <Section className="flex flex-col justify-center bg-inkDeep py-24">
      <Carousel slideClassName="h-[460px] w-[400px]">
        {alwaysOnGallery.panels.map((panel) => (
          <div
            key={panel.id}
            className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-sm p-7"
            style={{
              background: `linear-gradient(160deg, ${toneMap[panel.tone]} 0%, #120d08 100%)`,
            }}
          >
            <img
              src={panel.img}
              alt={panel.alt}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient scrim so the caption stays legible over the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
            <p className="relative z-10 whitespace-pre-line font-display text-3xl font-900 leading-none tracking-tight text-paper">
              {panel.caption}
            </p>
            {panel.id === "always" && (
              <p className="relative z-10 text-xs font-bold tracking-eyebrow text-paper">
                {alwaysOnGallery.footer}
              </p>
            )}
          </div>
        ))}
      </Carousel>

      <p className="mt-6 text-center text-xs font-bold tracking-eyebrow text-cream/70">
        {alwaysOnGallery.footer}
      </p>

      <ScrollCue />
    </Section>
  );
}
