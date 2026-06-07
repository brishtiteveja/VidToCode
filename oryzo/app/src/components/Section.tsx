import type { ReactNode, CSSProperties } from "react";

type SectionProps = {
  id?: string;
  anchor?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  full?: boolean;
};

/**
 * Full-bleed scene wrapper. Each screen is roughly one viewport tall (the original
 * is one scroll-beat per scene). `anchor` adds a nested invisible region so the
 * nav's IntersectionObserver can map INTRO/FEATURES/PRODUCT/CONTACT to ranges.
 */
export default function Section({
  id,
  children,
  className = "",
  style,
  full = true,
}: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={`relative w-full overflow-hidden ${
        full ? "min-h-screen" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}
