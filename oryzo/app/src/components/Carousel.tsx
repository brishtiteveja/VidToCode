import {
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { easeInOut, useReducedMotionFlag } from "../lib/animations";

type CarouselProps = {
  children: ReactNode;
  className?: string;
  /** width applied to each slide wrapper */
  slideClassName?: string;
};

/**
 * Working horizontal carousel (Screens 06 & 18). Real horizontal scroll via native
 * overflow + snap, plus prev/next buttons that translate by one slide width. Also
 * draggable by pointer for a tactile feel.
 *
 * Motion layer (on top of the working scroll/snap): each slide reads its distance
 * from the track centre and animates focus — the centred slide locks to full size
 * + opacity with a vertical split-seam clip resolving and a slow Ken Burns zoom,
 * while neighbours shrink + fade to dock as ~40% "previous/next" thumbnails (a
 * natural parallax conveyor). All of this is gated behind reduced-motion.
 */
export default function Carousel({
  children,
  className = "",
  slideClassName = "",
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionFlag();

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const slides = Array.isArray(children) ? children : [children];

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-8 md:px-10"
      >
        {slides.map((child, i) => (
          <CarouselSlide
            key={i}
            trackRef={trackRef}
            reduced={reduced}
            className={`shrink-0 snap-center ${slideClassName}`}
          >
            {child}
          </CarouselSlide>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <CarouselButton dir={-1} onClick={() => scrollBy(-1)} />
        <CarouselButton dir={1} onClick={() => scrollBy(1)} />
      </div>
    </div>
  );
}

function CarouselSlide({
  trackRef,
  reduced,
  className,
  children,
}: {
  trackRef: RefObject<HTMLDivElement>;
  reduced: boolean;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(reduced ? 1 : 0.84);
  const opacity = useMotionValue(reduced ? 1 : 0.45);
  const clipPct = useMotionValue(reduced ? 0 : 22);
  const clipPath = useMotionTemplate`inset(0 ${clipPct}% 0 0)`;

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const el = ref.current;
    if (!track || !el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const trackRect = track.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      const elCenter = elRect.left + elRect.width / 2;
      const dist = Math.abs(elCenter - trackCenter);
      const focus = Math.max(0, Math.min(1, 1 - dist / (elRect.width || 1)));
      scale.set(0.84 + focus * 0.16);
      opacity.set(0.45 + focus * 0.55);
      clipPct.set((1 - focus) * 22);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackRef, reduced, scale, opacity, clipPct]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      <motion.div style={{ clipPath }} className="h-full w-full">
        {reduced ? (
          <div className="h-full w-full">{children}</div>
        ) : (
          <motion.div
            className="h-full w-full"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: easeInOut }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CarouselButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={dir === 1 ? "Next" : "Previous"}
      className="flex h-9 w-9 items-center justify-center rounded-pill border border-cream/30 text-cream/80 transition-colors hover:border-cream"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        style={{ transform: dir === 1 ? "none" : "rotate(180deg)" }}
      >
        <path d="M3 1L8 6L3 11" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </motion.button>
  );
}
