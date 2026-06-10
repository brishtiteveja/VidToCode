type Props = { items: string[] };

/** Infinite horizontal logo strip (CSS keyframe, duplicated track). */
export default function Marquee({ items }: Props) {
  const track = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-6">
      <div className="flex w-max animate-marquee gap-0">
        {track.map((name, i) => (
          <div
            key={i}
            className="flex min-w-[220px] items-center justify-center border-r border-line px-10 font-display text-lg font-bold tracking-tight text-ink/80"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
