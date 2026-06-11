import { motion, useScroll, useTransform } from "framer-motion";
import { thumbnails, ThumbnailData } from "../data/sections";

function ThumbnailItem({ data, index, total }: { data: ThumbnailData; index: number; total: number }) {
  const { scrollY } = useScroll();

  const layerSpeeds = [50, 100, 150, 200];
  const speed = layerSpeeds[data.layer];
  const scrollOffsetY = useTransform(scrollY, [0, 1000], [0, -speed]);
  const scrollOpacity = useTransform(scrollY, [0, 400, 800], [1, 0.7, 0]);

  // Stagger evenly across the cycle so there's always a stream
  const cycleDuration = 7;
  const delay = (index / total) * cycleDuration;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${data.x}%`,
        top: `${data.y}%`,
        width: data.width,
        height: data.height,
        y: scrollOffsetY,
        opacity: scrollOpacity,
        transformStyle: "preserve-3d" as const,
      }}
    >
      <div
        className="funnel-fly"
        style={{
          width: "100%",
          height: "100%",
          animationDuration: `${cycleDuration}s`,
          animationDelay: `${delay}s`,
          transformStyle: "preserve-3d" as const,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            background: data.color,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            transform: `rotate(${data.rotation}deg)`,
          }}
        />
      </div>
    </motion.div>
  );
}

interface FloatingThumbnailsProps {
  visible: boolean;
}

export default function FloatingThumbnails({ visible }: FloatingThumbnailsProps) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        perspective: 1200,
        perspectiveOrigin: "50% 50%",
      }}
    >
      {thumbnails.map((thumb, i) => (
        <ThumbnailItem key={thumb.id} data={thumb} index={i} total={thumbnails.length} />
      ))}
    </div>
  );
}
