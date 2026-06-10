import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "framer-motion";
import Button from "../components/Button";
import OrbitDiagram from "../components/OrbitDiagram";
import { useReducedMotionFlag } from "../lib/animations";
import { trustEngine } from "../content";

/**
 * Pinned scrollytelling reconstructed from oval_expansion_highlight_as_mouse_scrolls.mov:
 * the orbit stays fixed on the right while a blue gradient glow grows outward
 * ring-by-ring (the "sphere of influence"), and the left copy swaps through the
 * intro → Founder-Led Content → ABM Ads → Outreach in lockstep with scroll.
 *
 * Under prefers-reduced-motion it collapses to a static, stacked layout.
 */
export default function TrustEngine() {
  const reduced = useReducedMotionFlag();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Glow boundary expands ring-by-ring, its bright edge landing on each ring as
  // the copy steps Content → Ad → Outreach. The halo is sized to the OUTER ring
  // (scale 1), so inner ring = 142/250 ≈ 0.57 and middle = 196/250 ≈ 0.78.
  const glowScale = useTransform(p, [0.08, 0.35, 0.6, 0.85, 1], [0.4, 0.57, 0.78, 1.0, 1.08]);
  const glowOpacity = useTransform(p, [0.06, 0.26, 1], [0, 0.9, 1]);

  // Cross-fade ranges for the four left-hand panels.
  const op0 = useTransform(p, [0, 0.16, 0.22], [1, 1, 0]);
  const op1 = useTransform(p, [0.2, 0.27, 0.44, 0.5], [0, 1, 1, 0]);
  const op2 = useTransform(p, [0.48, 0.55, 0.68, 0.74], [0, 1, 1, 0]);
  const op3 = useTransform(p, [0.72, 0.79, 1, 1], [0, 1, 1, 1]);

  const y1 = useTransform(p, [0.2, 0.27], [24, 0]);
  const y2 = useTransform(p, [0.48, 0.55], [24, 0]);
  const y3 = useTransform(p, [0.72, 0.79], [24, 0]);

  const [s1, s2, s3] = trustEngine.services;

  if (reduced) return <TrustEngineStatic />;

  return (
    <section id="services" ref={ref} className="relative bg-ink text-cream" style={{ height: "360vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto grid h-full max-w-shell grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          {/* LEFT — cross-fading copy panels */}
          <div className="relative h-[64vh]">
            <Panel opacity={op0}>
              <h2 className="font-display text-4xl font-extrabold leading-[1.03] tracking-tightest md:text-[3.2rem]">
                {trustEngine.pre}
                <span className="em font-normal">{trustEngine.em}</span>
                {trustEngine.post}
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-creamMut">{trustEngine.intro}</p>
              <div className="mt-8">
                <Button variant="blue">{trustEngine.cta}</Button>
              </div>
            </Panel>

            <ServicePanel opacity={op1} y={y1} pre={s1.pre} em={s1.em} post={s1.post} body={s1.body} cta={trustEngine.cta} />
            <ServicePanel opacity={op2} y={y2} pre={s2.pre} em={s2.em} post={s2.post} body={s2.body} cta={trustEngine.cta} />
            <ServicePanel opacity={op3} y={y3} pre={s3.pre} em={s3.em} post={s3.post} body={s3.body} cta={trustEngine.cta} />
          </div>

          {/* RIGHT — pinned orbit with a scroll-driven expanding glow (in-SVG, ring-aligned) */}
          <div className="relative flex h-full items-center justify-center">
            <OrbitDiagram
              labels={["Content", "Ads", "Outreach"]}
              variant="glow"
              spin={false}
              glowScale={glowScale}
              glowOpacity={glowOpacity}
              className="relative h-[78vh] max-h-[600px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Static, stacked fallback for prefers-reduced-motion (no pin, no scrub). */
function TrustEngineStatic() {
  const glowScale = useMotionValue(1.0);
  const glowOpacity = useMotionValue(0.92);
  return (
    <section id="services" className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto grid max-w-shell grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-extrabold leading-[1.03] tracking-tightest md:text-[3.2rem]">
            {trustEngine.pre}
            <span className="em font-normal">{trustEngine.em}</span>
            {trustEngine.post}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-creamMut">{trustEngine.intro}</p>

          <div className="mt-10 space-y-5">
            {trustEngine.services.map((s) => (
              <div key={s.em} className="border-t border-cream/15 pt-5">
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {s.pre}
                  <span className="em font-normal">{s.em}</span>
                  {s.post}
                </h3>
                <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-creamMut">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <Button variant="blue">{trustEngine.cta}</Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <OrbitDiagram
            labels={["Content", "Ads", "Outreach"]}
            variant="glow"
            spin={false}
            glowScale={glowScale}
            glowOpacity={glowOpacity}
            className="relative h-[540px] w-full"
          />
        </div>
      </div>
    </section>
  );
}

function Panel({ opacity, children }: { opacity: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col justify-center">
      {children}
    </motion.div>
  );
}

function ServicePanel({
  opacity,
  y,
  pre,
  em,
  post,
  body,
  cta,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  pre: string;
  em: string;
  post: string;
  body: string;
  cta: string;
}) {
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <h3 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tightest md:text-[3.1rem]">
        {pre}
        <span className="em font-normal">{em}</span>
        {post}
      </h3>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-creamMut">{body}</p>
      <div className="mt-8">
        <Button variant="blue">{cta}</Button>
      </div>
    </motion.div>
  );
}
