import type { CSSProperties, ReactNode } from "react";
import { DEFAULT_MUTED } from "./defaults";

export interface SceneHeaderProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Pin to the top-left of a sticky stage (absolute) vs. flow above content. */
  pinned?: boolean;
  eyebrowColor?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Small unstyled eyebrow + title used by the slider/carousel scenes.
 * Font family is inherited; only structural/typographic hints are inline.
 */
export function SceneHeader({
  eyebrow,
  title,
  pinned = false,
  eyebrowColor = DEFAULT_MUTED,
  className = "",
  style,
}: SceneHeaderProps) {
  if (!eyebrow && !title) return null;
  const base: CSSProperties = pinned
    ? {
        position: "absolute",
        left: "4vw",
        top: "14vh",
        zIndex: 300,
        userSelect: "none",
      }
    : { marginBottom: "2rem" };
  return (
    <div className={className} style={{ ...base, ...style }}>
      {eyebrow && (
        <p
          style={{
            margin: 0,
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: eyebrowColor,
          }}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <div
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
}
