import { motion } from "framer-motion";
import type { ElementType } from "react";

/** Intrinsic HTML/SVG tag names usable as a polymorphic `as` prop. */
export type MotionTag = keyof React.JSX.IntrinsicElements;

/**
 * Resolve a `motion.<tag>` component for a dynamic tag name. Centralizes the
 * one unavoidable cast (the `motion` proxy isn't indexable by an arbitrary
 * intrinsic-element key in a type-safe way).
 */
export function motionTag(as: MotionTag): ElementType {
  return (motion as unknown as Record<string, ElementType>)[as as string];
}
