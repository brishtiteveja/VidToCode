import type { ReactNode } from "react";

/** A single item rendered by the slider/carousel components. */
export interface Slide {
  /** Stable React key. */
  key: string;
  /** Arbitrary content (image, video, card, …) rendered inside the frame. */
  content: ReactNode;
}
