import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** Small uppercase letter-spaced label used above body copy across feature scenes. */
export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-eyebrow md:text-xs ${className}`}
    >
      {children}
    </p>
  );
}
