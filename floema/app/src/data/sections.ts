export interface SectionData {
  num: string;
  category: string;
  badge: string;
  headline: string;
  cta: string;
  hasCatalogue: boolean;
  gradient: string;
}

export const sections: SectionData[] = [
  {
    num: "01",
    category: "Urban",
    badge: "#C44B2B",
    headline: "Signage, furniture, and equipment for welcoming urban spaces",
    cta: "SEE URBAN PRODUCTS",
    hasCatalogue: true,
    gradient:
      "linear-gradient(180deg, #2C3E50 0%, #34495E 20%, #2A3A4A 40%, #1F2D3A 60%, #1A252F 80%, #141D26 100%)",
  },
  {
    num: "02",
    category: "Nature",
    badge: "#7A8B3C",
    headline: "Signage and equipment for all facets of the great outdoors",
    cta: "SEE NATURE PRODUCTS",
    hasCatalogue: false,
    gradient:
      "linear-gradient(180deg, #3E5C3B 0%, #4A6B44 15%, #5C7A4C 35%, #4A6840 55%, #365A32 75%, #2D4A2C 100%)",
  },
  {
    num: "03",
    category: "RePlastic",
    badge: "#3A7D5C",
    headline:
      "Custom projects and furniture crafted out of 100% recyclable plastic",
    cta: "SEE REPLASTIC PRODUCTS",
    hasCatalogue: false,
    gradient:
      "linear-gradient(180deg, #1F4037 0%, #245545 15%, #2C5A4A 35%, #234D3F 55%, #1B3D32 75%, #162D24 100%)",
  },
  {
    num: "04",
    category: "Golf",
    badge: "#4A5D3A",
    headline:
      "Revamp your course with best practices golf equipment and signage",
    cta: "SEE GOLF PRODUCTS",
    hasCatalogue: true,
    gradient:
      "linear-gradient(180deg, #8B6914 0%, #9A7520 15%, #A67C2E 30%, #8B6914 50%, #7A5A0F 70%, #6B4F0E 100%)",
  },
  {
    num: "05",
    category: "Details",
    badge: "#8B8B8B",
    headline: "People and environment-friendly custom signage",
    cta: "SEE DETAILS PRODUCTS",
    hasCatalogue: true,
    gradient:
      "linear-gradient(180deg, #2D2D2D 0%, #353535 15%, #3D3D3D 35%, #333333 55%, #262626 75%, #1A1A1A 100%)",
  },
];

// Thumbnail data for hero floating images
export interface ThumbnailData {
  id: number;
  x: number; // percentage position
  y: number; // percentage position
  width: number; // px
  height: number; // px
  rotation: number; // degrees
  layer: number; // 0-3 parallax layer
  color: string; // gradient color
}

export const thumbnails: ThumbnailData[] = [
  { id: 1, x: 5, y: 15, width: 80, height: 60, rotation: -3, layer: 0, color: "linear-gradient(135deg, #C4A882, #8B7355)" },
  { id: 2, x: 85, y: 10, width: 70, height: 90, rotation: 2, layer: 1, color: "linear-gradient(135deg, #6B8E5A, #4A6B3A)" },
  { id: 3, x: 15, y: 55, width: 90, height: 65, rotation: -1, layer: 2, color: "linear-gradient(135deg, #8B6E4E, #5C4833)" },
  { id: 4, x: 75, y: 45, width: 65, height: 85, rotation: 4, layer: 1, color: "linear-gradient(135deg, #A0522D, #6B3A1F)" },
  { id: 5, x: 45, y: 8, width: 75, height: 55, rotation: -2, layer: 3, color: "linear-gradient(135deg, #556B2F, #3B4A1F)" },
  { id: 6, x: 30, y: 70, width: 85, height: 60, rotation: 1, layer: 0, color: "linear-gradient(135deg, #8B7D6B, #5C5346)" },
  { id: 7, x: 60, y: 65, width: 70, height: 90, rotation: -4, layer: 2, color: "linear-gradient(135deg, #4A6B8B, #2C4A5C)" },
  { id: 8, x: 92, y: 55, width: 60, height: 75, rotation: 3, layer: 3, color: "linear-gradient(135deg, #8B8B6B, #5C5C46)" },
  { id: 9, x: 8, y: 35, width: 75, height: 55, rotation: -5, layer: 1, color: "linear-gradient(135deg, #C44B2B, #8B3420)" },
  { id: 10, x: 50, y: 35, width: 60, height: 80, rotation: 2, layer: 0, color: "linear-gradient(135deg, #3A7D5C, #265A40)" },
  { id: 11, x: 22, y: 25, width: 70, height: 50, rotation: -2, layer: 3, color: "linear-gradient(135deg, #B8A080, #8B7860)" },
  { id: 12, x: 70, y: 20, width: 80, height: 60, rotation: 1, layer: 2, color: "linear-gradient(135deg, #7A8B3C, #556B2F)" },
  { id: 13, x: 40, y: 80, width: 65, height: 85, rotation: -3, layer: 1, color: "linear-gradient(135deg, #4A5D3A, #344228)" },
  { id: 14, x: 88, y: 75, width: 75, height: 55, rotation: 5, layer: 0, color: "linear-gradient(135deg, #9B8B7B, #6B5E50)" },
  { id: 15, x: 3, y: 78, width: 60, height: 70, rotation: -1, layer: 2, color: "linear-gradient(135deg, #5A4A3A, #3A3228)" },
  { id: 16, x: 55, y: 52, width: 70, height: 55, rotation: 3, layer: 3, color: "linear-gradient(135deg, #8B6B4A, #5C4833)" },
  { id: 17, x: 35, y: 45, width: 55, height: 70, rotation: -4, layer: 1, color: "linear-gradient(135deg, #6B8B8B, #4A6060)" },
  { id: 18, x: 78, y: 85, width: 80, height: 60, rotation: 2, layer: 0, color: "linear-gradient(135deg, #A08B6B, #7A6B50)" },
];

// News items for footer
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  color: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Floema launches new sustainable urban furniture line for European cities",
    date: "March 2024",
    color: "linear-gradient(135deg, #C4A882, #8B7355)",
  },
  {
    id: 2,
    title: "RePlastic collection wins Portuguese Design Award for circular innovation",
    date: "January 2024",
    color: "linear-gradient(135deg, #3A7D5C, #265A40)",
  },
];
