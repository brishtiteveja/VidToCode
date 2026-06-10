import type { Variants, Transition } from "framer-motion";

// Floema signature easing curves
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeInOutExpo: [number, number, number, number] = [0.87, 0, 0.13, 1];
export const easeOutCubic: [number, number, number, number] = [0.33, 1, 0.68, 1];

// Shared transition presets
export const smoothTransition: Transition = {
  duration: 0.8,
  ease: easeOutExpo,
};

export const slowTransition: Transition = {
  duration: 1.2,
  ease: easeOutExpo,
};

export const snappyTransition: Transition = {
  duration: 0.5,
  ease: easeOutExpo,
};

// Preloader variants
export const preloaderLogoVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
      delay: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: {
      duration: 0.6,
      ease: easeInOutExpo,
    },
  },
};

export const preloaderOverlayVariants: Variants = {
  visible: {
    y: "0%",
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.8,
      ease: easeInOutExpo,
      delay: 0.2,
    },
  },
};

// Text reveal variants
export const wordRevealVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
      delay: i * 0.03,
    },
  }),
};

// Fade up variants for general elements
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
      delay,
    },
  }),
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Nav variants
export const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
      delay,
    },
  }),
};

// Scale in for thumbnails
export const thumbnailVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: easeOutExpo,
      delay,
    },
  }),
};

// CTA button hover
export const ctaHoverVariants = {
  rest: {
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  hover: {
    scale: 1.03,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    transition: {
      duration: 0.3,
      ease: easeOutCubic,
    },
  },
};
