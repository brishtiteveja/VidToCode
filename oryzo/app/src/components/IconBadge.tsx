import type { ReactNode } from "react";

type IconBadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Circular outline icon badge used on feature sections (Coffee Lift, Thermo, etc.). */
export default function IconBadge({ children, className = "" }: IconBadgeProps) {
  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-pill border border-cream/30 text-cream/80 ${className}`}
    >
      {children}
    </span>
  );
}
