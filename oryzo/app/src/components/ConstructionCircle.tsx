type ConstructionCircleProps = {
  size?: number;
  className?: string;
  nodes?: boolean;
};

/**
 * Dotted construction circle + crop box with orange Bézier-style node handles.
 * Used as the "designed in a vector tool" overlay (Screens 04, 09, 10).
 */
export default function ConstructionCircle({
  size = 360,
  className = "",
  nodes = true,
}: ConstructionCircleProps) {
  const r = size / 2;
  const nodePositions = [
    { x: r, y: 0 },
    { x: size, y: r },
    { x: r, y: size },
    { x: 0, y: r },
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width={size - 2}
        height={size - 2}
        fill="none"
        stroke="rgba(242,236,228,0.35)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        stroke="rgba(232,99,26,0.45)"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      {nodes &&
        nodePositions.map((n, i) => (
          <rect
            key={i}
            x={n.x - 4}
            y={n.y - 4}
            width="8"
            height="8"
            fill="#E8631A"
          />
        ))}
    </svg>
  );
}
