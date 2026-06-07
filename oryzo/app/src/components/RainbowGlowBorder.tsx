import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionFlag, easeInOut } from "../lib/animations";

type RainbowGlowBorderProps = {
  children: ReactNode;
  active?: boolean;
  className?: string;
};

/**
 * Rotating rainbow perimeter glow (Screen 03). A conic-gradient ring sits behind
 * the content; when `active` its hue travels continuously around the frame
 * (rotating masked ring) and its brightness builds in with an ease-in ramp.
 *
 * The continuous rotation loop is gated behind the reduced-motion flag — when
 * reduced motion is requested the ring holds still and only fades in/out.
 */
export default function RainbowGlowBorder({
  children,
  active = true,
  className = "",
}: RainbowGlowBorderProps) {
  const reduced = useReducedMotionFlag();

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -inset-6 overflow-hidden rounded-[40px]">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, #E8631A, #FFD23F, #2EE6C8, #5A1840, #FF7A1A, #E8631A)",
            filter: "blur(48px)",
          }}
          // Continuous hue travel around the frame (gated behind reduced motion).
          animate={
            active && !reduced
              ? { rotate: 360, opacity: 0.55 }
              : { rotate: 0, opacity: active ? 0.5 : 0 }
          }
          transition={{
            rotate: { duration: 6, ease: "linear", repeat: Infinity },
            // Brightness ease-in build as the glow ignites.
            opacity: { duration: 0.6, ease: easeInOut },
          }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
