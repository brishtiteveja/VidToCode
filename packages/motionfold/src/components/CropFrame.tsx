import type { CSSProperties, ReactNode } from "react";
import { DEFAULT_ACCENT, DEFAULT_LINE } from "../internal/defaults";

export interface CropFrameProps {
  children?: ReactNode;
  /** Show the four corner handles. Default `true`. */
  handles?: boolean;
  /** Dashed selection border color. */
  lineColor?: string;
  /** Corner handle fill color. */
  handleColor?: string;
  /** Handle square size in px. Default `8`. */
  handleSize?: number;
  /** Use a dashed (vs. solid) border. Default `true`. */
  dashed?: boolean;
  borderRadius?: number | string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Crop-box selection frame with corner handles — the "designed live in a vector
 * tool" motif. Headless: pass any `children` and size it via `className`/`style`.
 */
export function CropFrame({
  children,
  handles = true,
  lineColor = DEFAULT_LINE,
  handleColor = DEFAULT_ACCENT,
  handleSize = 8,
  dashed = true,
  borderRadius,
  className,
  style,
}: CropFrameProps) {
  const offset = -handleSize / 2;
  const handleBase: CSSProperties = {
    position: "absolute",
    width: handleSize,
    height: handleSize,
    backgroundColor: handleColor,
  };
  const corners: CSSProperties[] = [
    { top: offset, left: offset },
    { top: offset, right: offset },
    { bottom: offset, left: offset },
    { bottom: offset, right: offset },
  ];

  return (
    <div
      className={className}
      style={{
        position: "relative",
        border: `1px ${dashed ? "dashed" : "solid"} ${lineColor}`,
        borderRadius,
        ...style,
      }}
    >
      {handles &&
        corners.map((c, i) => (
          <span key={i} aria-hidden style={{ ...handleBase, ...c }} />
        ))}
      {children}
    </div>
  );
}
