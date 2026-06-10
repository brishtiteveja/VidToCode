import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  preloaderLogoVariants,
  preloaderOverlayVariants,
  easeInOutExpo,
} from "../lib/animations";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useEffect(() => {
    // Logo shows at 0.6s, holds until ~2.4s, then exits
    const holdTimer = setTimeout(() => {
      setPhase("exit");
    }, 2400);

    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3400);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-beige"
          variants={preloaderOverlayVariants}
          initial="visible"
          animate={phase === "exit" ? "exit" : "visible"}
          exit="exit"
          transition={{
            duration: 0.8,
            ease: easeInOutExpo,
            delay: phase === "exit" ? 0.6 : 0,
          }}
        >
          <motion.h1
            className="font-display italic text-5xl md:text-7xl text-floema-dark select-none"
            variants={preloaderLogoVariants}
            initial="hidden"
            animate={phase === "exit" ? "exit" : "visible"}
          >
            Floema
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
