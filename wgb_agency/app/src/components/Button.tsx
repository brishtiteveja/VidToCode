import type { ReactNode } from "react";

type Variant = "dark" | "blue" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  dark: "bg-ink text-cream hover:bg-inkSoft",
  blue: "bg-blue text-cream hover:brightness-110",
  outline: "border border-ink/25 text-ink hover:bg-ink hover:text-cream",
  ghost: "text-cream/90 hover:text-cream",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  spark?: boolean;
  className?: string;
  href?: string;
};

/** Pill-rounded CTA with an optional leading spark glyph. */
export default function Button({
  children,
  variant = "dark",
  spark = true,
  className = "",
  href = "#",
}: Props) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-md px-5 py-3 text-[13px] font-semibold tracking-tight transition duration-200 ${styles[variant]} ${className}`}
    >
      {spark && (
        <svg viewBox="0 0 100 100" className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true">
          <path
            d="M50 6 C53 36 64 47 94 50 C64 53 53 64 50 94 C47 64 36 53 6 50 C36 47 47 36 50 6 Z"
            fill="currentColor"
          />
        </svg>
      )}
      {children}
    </a>
  );
}
