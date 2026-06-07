import FeaturedSlider, { type Slide } from "../components/FeaturedSlider";
import MagazineCover from "../components/MagazineCover";
import Pill from "../components/Pill";
import { productGallery } from "../lib/content";

const toneMap: Record<string, string> = {
  olive: "#2E3A24",
  cork: "#C9A36A",
  matGreen: "#3FAE8E",
  cork2: "#C58A4E",
  wood: "#7A5230",
  accentDeep: "#C43B15",
};

/**
 * Screen 06 — Lookbook picture slider of editorial product tiles plus the
 * satirical "RISE" magazine cover. Uses the scroll-scrubbed FeaturedSlider: as
 * the user scrolls, each small tile travels through a fixed centre lens, growing
 * small→big→small. Captions/SEND prompt are baked into their tile so they ride
 * with the image as it magnifies.
 */
export default function ProductGallery() {
  const slides: Slide[] = productGallery.items.map((item) => ({
    key: item.id,
    content:
      item.id === "magazine" ? (
        <MagazineCover />
      ) : (
        <div
          className="relative flex h-full w-full flex-col justify-end overflow-hidden p-5"
          style={{
            background: `linear-gradient(160deg, ${toneMap[item.tone]} 0%, #150f0a 100%)`,
          }}
        >
          {"img" in item && item.img && (
            <>
              <img
                src={item.img}
                alt={"alt" in item ? item.alt : item.caption}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            </>
          )}
          {item.id === "bikini" && (
            <div className="absolute inset-x-4 bottom-16 z-10 flex items-end justify-between gap-2">
              <span className="max-w-[60%] font-mono text-[10px] font-bold leading-tight tracking-eyebrow text-paper">
                {productGallery.prompt}
              </span>
              <Pill variant="solid" className="px-3 py-1.5 text-[10px]">
                {productGallery.send}
              </Pill>
            </div>
          )}
          <p className="relative z-10 font-display text-xl font-800 tracking-tight text-paper">
            {item.caption}
          </p>
        </div>
      ),
  }));

  return (
    <FeaturedSlider
      slides={slides}
      eyebrow="SO PORTABLE,"
      title={<>it&rsquo;s wearable</>}
    />
  );
}
