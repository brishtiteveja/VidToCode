import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../components/Section";
import FeatureSection from "../components/FeatureSection";
import MathOverlay from "../components/MathOverlay";
import { coffeeLift } from "../lib/content";
import { easeOutExpo, inViewOnce, useReducedMotionFlag } from "../lib/animations";

/**
 * Screen 07 — "ELEVATE YOUR COFFEE EXPERIENCE". Desk scene with a takeaway cup
 * lifted on the coaster. APPROXIMATION: the pegboard-desk photo render is a CSS
 * scene (warm gradient + dotted pegboard pattern + wood desktop band).
 *
 * Motion: as scroll progresses the framed desk scene scales up past its frame
 * (camera push), the dotted selection frame dissolves and the surrounding dark
 * canvas fades — reading as the magazine card expanding into a full-bleed scene.
 * A gradient scrim slides in from the left behind the copy, and the "Δh ≈ t"
 * formula fades in last. The shared FeatureSection still staggers the left text
 * column (icon → eyebrow → body) top-to-bottom. Scroll/scrim motion is gated
 * behind reduced-motion.
 */
export default function CoffeeLift() {
  const reduced = useReducedMotionFlag();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const deskScale = useTransform(scrollYProgress, [0.1, 0.55], [1.14, 1]);
  const frameDissolve = useTransform(scrollYProgress, [0.15, 0.45], [0.9, 0]);
  const canvasFade = useTransform(scrollYProgress, [0.1, 0.45], [0.55, 0]);

  return (
    <Section className="bg-paperWarm">
      <div ref={ref}>
        <FeatureSection
          eyebrow={coffeeLift.eyebrow}
          body={coffeeLift.body}
          footerHeadline={coffeeLift.headline}
          textTone="ink"
          icon={<span aria-hidden>↑</span>}
          background={
            <div className="absolute inset-0 overflow-hidden">
              {/* Desk scene — scales up past its frame on scroll (camera push). */}
              <motion.div
                className="absolute inset-0"
                style={reduced ? undefined : { scale: deskScale }}
              >
                {/* Pegboard wall */}
                <div
                  className="absolute inset-x-0 top-0 h-2/3"
                  style={{
                    background: "linear-gradient(180deg, #EFE7D8 0%, #D8CDBA 100%)",
                    backgroundImage:
                      "radial-gradient(circle, rgba(122,82,48,0.35) 0 2px, transparent 3px)",
                    backgroundSize: "26px 26px",
                  }}
                />
                {/* Wood desktop */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background:
                      "linear-gradient(180deg, #7A5230 0%, #4d3219 100%)",
                  }}
                />
                {/* Coffee cup lifted on a cork disc */}
                <div className="absolute bottom-[30%] right-[26%] flex flex-col items-center">
                  <div className="h-28 w-20 rounded-b-md rounded-t-sm bg-paper shadow-xl" />
                  <div className="mt-1 h-3 w-24 rounded-pill bg-cork2 shadow-md" />
                </div>
              </motion.div>

              {/* Surrounding dark canvas fading out as the scene takes over */}
              {!reduced && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-inkDeep"
                  style={{ opacity: canvasFade }}
                />
              )}

              {/* Dotted selection frame that dissolves as it expands to full-bleed */}
              {!reduced && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-6 border border-dashed border-ink/30"
                  style={{ opacity: frameDissolve }}
                />
              )}

              {/* Left gradient scrim sliding in from the left behind the copy */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-paperWarm via-paperWarm/70 to-transparent"
                initial={reduced ? false : { x: "-60%", opacity: 0 }}
                whileInView={reduced ? undefined : { x: "0%", opacity: 1 }}
                viewport={inViewOnce}
                transition={{ duration: 0.7, ease: easeOutExpo }}
              />
            </div>
          }
          overlay={
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.7 }}
            >
              <MathOverlay
                formula={coffeeLift.formula}
                label={coffeeLift.formulaLabel}
                className="text-ink [&_*]:text-ink"
              />
            </motion.div>
          }
        />
      </div>
    </Section>
  );
}
