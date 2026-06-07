export const colors = {
  primary: "#2F86EB",
  primaryDark: "#2569C8",
  navy: "#16335E",
  navySoft: "#1E3A5F",
  bg: "#EEF1F5",
  bgAlt: "#F2F4F7",
  surface: "#FFFFFF",
  muted: "#8A94A6",
  mutedSoft: "#9AA3AF",
  border: "#E3E7EC",

  bubbleAi: "#F0F1F3",
  bubbleUser: "#D6E8FB",

  green: "#34C759",
  greenSoft: "#2BA84A",
  red: "#FF3B30",
  orange: "#F5A623",
  amber: "#FBE7BE",
  amberText: "#6B4E1E",
  lecture: "#F7A833",

  heroFrom: "#2A4A86",
  heroTo: "#16294E",

  white: "#FFFFFF",
  black: "#000000",
} as const;

// CEFR level → badge color
export const levelColors: Record<string, string> = {
  Beginner: "#2F86EB",
  "Pre-Intermediate": "#2BA84A",
  Intermediate: "#E0A21A",
  "Upper-Intermediate": "#E8772A",
  Advanced: "#E0463C",
  Proficient: "#7B5CD6",
};

// Cycle of node colors used on the lesson map.
export const nodeColors = [
  "#2F86EB",
  "#19B5C9",
  "#7B57E0",
  "#E2374A",
  "#F0572D",
  "#C13DBE",
  "#5DBB46",
  "#F4A300",
  "#1FB89B",
] as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const spacing = (n: number) => n * 4;

export const shadow = {
  card: {
    shadowColor: "#1B2A52",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  button: {
    shadowColor: "#1B2A52",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
} as const;

export const font = {
  // System rounded-ish stack; the real app uses a Nunito/SF-Rounded family.
  black: "800" as const,
  bold: "700" as const,
  semibold: "600" as const,
  medium: "500" as const,
  regular: "400" as const,
};
