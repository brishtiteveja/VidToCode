import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "solid" | "outline" | "cyan" | "ghost";
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
};

const variants: Record<NonNullable<PillProps["variant"]>, string> = {
  solid: "bg-accent text-paper hover:bg-accentSoft",
  outline: "border border-cream/40 text-cream hover:border-cream",
  cyan: "bg-hud text-inkDeep hover:brightness-110",
  ghost: "bg-ink2/80 text-cream border border-cream/15 hover:border-cream/40",
};

export default function Pill({
  children,
  onClick,
  disabled = false,
  variant = "solid",
  icon,
  className = "",
  type = "button",
}: PillProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-xs font-semibold tracking-eyebrow transition-colors ${
        variants[variant]
      } ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      {icon && <span className="text-sm leading-none">{icon}</span>}
      {children}
    </motion.button>
  );
}
