import { motion, useScroll, useTransform } from "framer-motion";
import { thumbnails, ThumbnailData } from "../data/sections";
import { thumbnailVariants } from "../lib/animations";

interface ThumbnailItemProps {
  data: ThumbnailData;
  index: number;
}

function ThumbnailItem({ data, index }: ThumbnailItemProps) {
  const { scrollY } = useScroll();

  // Each layer moves at a different speed
  const layerSpeeds = [50, 100, 150, 200];
  const speed = layerSpeeds[data.layer];

  const y = useTransform(scrollY, [0, 1000], [0, -speed]);
  const opacity = useTransform(scrollY, [0, 600, 900], [1, 0.6, 0]);

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        width: data.width,
        height: data.height,
        y,
        opacity,
        rotate: data.rotation,
      }}
      variants={thumbnailVariants}
      initial="hidden"
      animate="visible"
      custom={0.8 + index * 0.06}
    >
      <div
        className="w-full h-full rounded-lg shadow-lg"
        style={{
          background: data.color,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      />
    </motion.div>
  );
}

interface FloatingThumbnailsProps {
  visible: boolean;
}

export default function FloatingThumbnails({ visible }: FloatingThumbnailsProps) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {thumbnails.map((thumb, i) => (
        <ThumbnailItem key={thumb.id} data={thumb} index={i} />
      ))}
    </div>
  );
}
