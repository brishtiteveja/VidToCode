type MathOverlayProps = {
  label?: string;
  formula: string;
  note?: string;
  className?: string;
};

/** Small bottom-right math/ML notation overlay played for laughs across feature scenes. */
export default function MathOverlay({
  label,
  formula,
  note,
  className = "",
}: MathOverlayProps) {
  return (
    <div className={`flex items-end gap-4 ${className}`}>
      <div className="text-right">
        {label && (
          <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-cream/70">
            {label}
          </p>
        )}
        {note && <p className="font-mono text-[10px] text-cream/45">{note}</p>}
      </div>
      <p className="font-mono text-2xl text-cream md:text-3xl">{formula}</p>
    </div>
  );
}
