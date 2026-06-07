import type { ReactNode } from "react";
import type { Slide } from "motionfold";

const GRADIENTS = [
  "linear-gradient(160deg, #e8631a 0%, #150f0a 100%)",
  "linear-gradient(160deg, #2ee6c8 0%, #0d2b28 100%)",
  "linear-gradient(160deg, #5a1840 0%, #160a12 100%)",
  "linear-gradient(160deg, #ffd23f 0%, #2a2410 100%)",
  "linear-gradient(160deg, #3f5236 0%, #11160d 100%)",
];

export function SampleCard({
  title,
  caption,
  index,
}: {
  title: string;
  caption: string;
  index: number;
}) {
  return (
    <div className="card" style={{ background: GRADIENTS[index % GRADIENTS.length] }}>
      <h4>{title}</h4>
      <p>{caption}</p>
    </div>
  );
}

/** Build N gradient slides for the slider/carousel demos. */
export function makeSlides(n = 5): Slide[] {
  const labels = [
    ["Trailhead", "Shot on location"],
    ["Tide Pool", "Coastal capture"],
    ["Nightfall", "Long exposure"],
    ["Golden Hour", "Backlit portrait"],
    ["Summit", "Above the clouds"],
    ["Studio", "Controlled light"],
  ];
  return Array.from({ length: n }, (_, i) => ({
    key: `slide-${i}`,
    content: (
      <SampleCard title={labels[i % labels.length][0]} caption={labels[i % labels.length][1]} index={i} />
    ),
  }));
}

export function Demo({
  id,
  kicker,
  title,
  desc,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  desc: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="demo" id={id}>
      <div className="demo__head">
        <div className="demo__kicker">{kicker}</div>
        <h2 className="demo__title">{title}</h2>
        <p className="demo__desc">{desc}</p>
      </div>
      {children}
    </section>
  );
}
