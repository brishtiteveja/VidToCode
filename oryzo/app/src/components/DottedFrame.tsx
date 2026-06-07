import type { ReactNode } from "react";

type DottedFrameProps = {
  children?: ReactNode;
  className?: string;
  handle?: boolean;
};

/**
 * Crop-box selection frame with corner handles — the signature "designed live in
 * Illustrator/Figma" motif seen around the product across several scenes.
 */
export default function DottedFrame({
  children,
  className = "",
  handle = true,
}: DottedFrameProps) {
  return (
    <div
      className={`relative border border-dashed border-cream/40 ${className}`}
    >
      {handle && (
        <>
          <span className="crop-handle -left-1 -top-1 bg-ink" />
          <span className="crop-handle -right-1 -top-1 bg-ink" />
          <span className="crop-handle -bottom-1 -left-1 bg-ink" />
          <span className="crop-handle -bottom-1 -right-1 bg-ink" />
        </>
      )}
      {children}
    </div>
  );
}
