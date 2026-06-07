/**
 * All real copy / labels / names transcribed verbatim from the Oryzo recording
 * and the design report. Sections read their text from here so nothing is invented
 * inline. Brand voice is deliberately satirical (the site is a creative piece by Lusion).
 */

export const brand = {
  wordmark: "ORYZO",
  tagline: "MADE FOR MUGS. BUILT FOR TABLES.",
  studio: "LUSION",
};

/**
 * Real photographic/3D assets extracted from the original Oryzo site, served from
 * /public/assets/oryzo. Sections import these by name so paths live in one place.
 */
export const assets = {
  heroPlate: "/assets/oryzo/hero_plate.webp",
  intro: "/assets/oryzo/intro.webp",
  outro: "/assets/oryzo/outro.webp",
  rtx3090: "/assets/oryzo/3090_MOBILE.webp",
  dropTest: "/assets/oryzo/drop_test_MOBILE.webp",
  perfect: "/assets/oryzo/perfect_MOBILE.webp",
  legacySupport: "/assets/oryzo/legacy_support_MOBILE.webp",
  alwaysOn: "/assets/oryzo/always_on_MOBILE.webp",
  edge: "/assets/oryzo/edge_MOBILE.webp",
  color: "/assets/oryzo/color_MOBILE.webp",
  flatEarth: "/assets/oryzo/flat_earth_MOBILE.webp",
  sticker1: "/assets/oryzo/sticker_1_MOBILE.webp",
  sticker2: "/assets/oryzo/sticker_2_MOBILE.webp",
  bikini: "/assets/oryzo/bikini.webp",
  bikiniOn: "/assets/oryzo/bikini_on.webp",
  glasses: "/assets/oryzo/glasses.webp",
  pocket: "/assets/oryzo/pocket.webp",
  shoulder: "/assets/oryzo/shoulder.webp",
  yoga: "/assets/oryzo/yoga.webp",
  bite: "/assets/oryzo/bite.webp",
  astronaut: "/assets/oryzo/astronut_MOBILE.webp",
  pirateKing: "/assets/oryzo/pirate_king_MOBILE.webp",
  youtuber: "/assets/oryzo/youtuber_MOBILE.webp",
  attention: "/assets/oryzo/attention_MOBILE.webp",
  videoThumb: "/assets/oryzo/video_thumb.webp",
} as const;

export const navLinks: { label: string; href: string }[] = [
  { label: "INTRO", href: "#intro" },
  { label: "FEATURES", href: "#features" },
  { label: "PRODUCT", href: "#product" },
  { label: "CONTACT", href: "#contact" },
];

// Screen 01 — Hero cutting-mat
export const hero = {
  tagline: brand.tagline,
  wordmark: "ORYZO",
  rightCopy:
    "Designed to lift, insulate, and grip in all the right ways. Oryzo makes the simplest moment feel considered.",
  studioCard: {
    title: "DESIGNED\nBY LUSION,\nTHE AWARD-WINNING\nDESIGN STUDIO.",
    footnote: "The world's most unnecessarily sophisticated cork coaster.",
  },
  scrollCue: "SCROLL TO CONTINUE",
};

// Screen 02 — Isn't just a coaster
export const isntJustACoaster = {
  headline: ["ISN'T JUST", "A COASTER."],
  body: "Oryzo isn't just a coaster. It's the result of unprecedented AI* breakthroughs.",
  footnote: "* TECHNICALLY NOT AI",
};

// Screen 03 — Powered by AI
export const poweredByAi = {
  headline: "Powered by AI",
  superscript: "*",
  badge: "ORYZO-1",
  hoverHint: "TRY TO HOVER HAND",
  body: ["AI FILLS IN THE GAPS.", "WE SAID HIGH FIVE.", "IT HEARD SIX."],
  footnote: "* ADOBE ILLUSTRATOR",
};

// Screen 04 — So portable / it's wearable
export const soPortableWearable = {
  eyebrow: "SO PORTABLE,",
  headline: "it's wearable",
};

// Screen 05 — Wearable HUD
export const wearableHud = {
  eyebrow: "SO PORTABLE,",
  headline: "it's wearable",
  hud: {
    cups: "3",
    bpm: "112 bpm",
    model: "ORYZO-1",
    message: "You only had 3 cups of coffee today. Want more?",
    cta: "Refill",
  },
};

// Screen 06 — Product gallery carousel
export const productGallery = {
  items: [
    { id: "yoga", caption: "FLOW STATE", tone: "olive", img: assets.yoga, alt: "Person mid-yoga wearing the Oryzo coaster as a pendant" },
    { id: "cap", caption: "WEARS LIKE A DREAM", tone: "cork", img: assets.shoulder, alt: "Person in an ORYZO cap with a cork coaster resting on their shoulder" },
    { id: "bikini", caption: "POOLSIDE READY", tone: "matGreen", img: assets.bikiniOn, alt: "Teal bikini laid out on an Oryzo cork coaster" },
    { id: "freckles", caption: "SKINCARE, REIMAGINED", tone: "cork2", img: assets.glasses, alt: "Close-up of a dewy face with a cork coaster held over one eye" },
    { id: "magazine", caption: "AS SEEN IN RISE", tone: "wood" },
    { id: "tongue", caption: "TASTES LIKE INNOVATION", tone: "accentDeep", img: assets.bite, alt: "Person playfully biting an Oryzo cork coaster" },
    { id: "pocket", caption: "POCKET-SIZED", tone: "accentDeep", img: assets.pocket, alt: "Cork coaster tucked into a red knit pocket" },
    { id: "studio", caption: "JUST ADD MUG", tone: "accentDeep", img: assets.bikini, alt: "Studio product shot of the Oryzo cork coaster on a red backdrop" },
  ],
  magazine: {
    title: "RISE",
    cover: "We are\nCooked.",
    issue: "ISSUE 25",
  },
  prompt: "WOULD IT LOOK GOOD ON A BIKINI?",
  send: "SEND",
};

// Screen 07 — Coffee Lift
export const coffeeLift = {
  eyebrow: "RISE ABOVE MEDIOCRITY",
  body: "With a precision-engineered lift (exactly one coaster thick), Oryzo doesn't just hold your mug - it elevates it. Literally. Above every boring surface you've ever known.",
  headline: ["ELEVATE YOUR", "COFFEE EXPERIENCE"],
  formula: "Δh ≈ t",
  formulaLabel: "Constant lift via geometry",
};

// Screen 08 — Thermodynamic Stability
export const thermodynamicStability = {
  eyebrow: "HANDLES EXTREMES WITH EASE",
  body: "From piping-hot mugs to ice-cold drinks - Oryzo stays perfectly stable. Your coffee table already tapped out three sips ago.",
  headline: ["THERMODYNAMIC", "STABILITY"],
  scale: [
    { label: "CREATIVE", value: "T = 10" },
    { label: "BALANCED", value: "T = 1" },
    { label: "DETERMINISTIC", value: "T = 0.1" },
  ],
  modelLabel: "THERMAL DIFFUSION MODEL (TDM)",
  modelNote: "A visualization, not a warranty",
  formula: "pᵢ(T) = e^(zᵢ/T) / Σ e^(zⱼ/T)",
};

// Screen 09 — Circularity blueprint
export const circularityBlueprint = {
  eyebrow: "PERFECTLY ROUND, SERIOUSLY",
  body: "Our engineers recalibrated its circumference with disturbing levels of attention to detail - just because we could.",
  headline: ["NOW 37.9% MORE", "CIRCULAR"],
  formula: "C = πA / P²",
  formulaLabel: "Circularity (circle = 1.0)",
  ropeLabel: "RoPE: Roundness Optimization & Perimeter Engineering",
};

// Screen 10 — ORYZO wordmark kinetic
export const wordmarkKinetic = {
  word: "ORYZO",
  scrollCue: "SCROLL TO CONTINUE",
};

// Screen 11 — Smart Flip Encryption
export const smartFlipEncryption = {
  headline: "SECURE COMMUNICATIONS SIMPLIFIED",
  discLabel: "ORYZO",
  cta: "DECODE MESSAGE",
  decoded: "MESSAGE DECODED: PLEASE USE A COASTER.",
};

// Screen 12 — Grip-Locked Antislip
export const gripLockedAntislip = {
  eyebrow: "PRECISION GRIP, ZERO DRAMA",
  headline: ["GRIP-LOCKED ANTISLIP", "TECHNOLOGY"],
  body: "Micro-textured cork so grippy your drink files a restraining order against gravity. Spills? Consider them politely discouraged.",
  readoutLabel: "FRICTION COEFFICIENT (EST):",
  readoutDefault: "0.80",
};

// Screen 13 — Cork bark split
export const corkBarkSplit = {
  eyebrow: "RAW. NATURAL. UNFILTERED.",
  scrollCue: "SCROLL TO CONTINUE",
};

// Screen 14 — Sustainability
export const sustainability = {
  eyebrow: "VEGAN-FRIENDLY",
  topLabel: "100% PLANT-BASED",
  headline: "sustainability",
  body: [
    "Pure cork sourced sustainably.",
    "Completely vegan - no cows were harmed,",
    'but it might be full of "bull"sh*t.',
  ],
};

// Screen 15 — Facts grid
export const factsGrid = {
  cards: [
    {
      title: ["AVERAGE", "AGE OF FIRST", "HARVEST"],
      body: "Cork oaks are typically first harvested at around 25 years, once the bark is thick enough to remove safely.",
      bigNumber: "25",
      tone: "olive" as const,
    },
    {
      title: ["HARVESTING", "INTERVAL"],
      body: "After each harvest, the bark takes about 9 years to regrow, making cork a renewable material.",
      tone: "paper" as const,
    },
    {
      title: ["POWER DRAW", "WHILE IN USE"],
      body: 'No compute. No tokens. So you can say "please" and "thank you" as much as you want, guilt free.',
      thanks: ["SALAMAT PO", "ДЯКУЮ", "GRACIAS", "THANK YOU", "MERCI", "GRAZIE"],
      tone: "paper" as const,
    },
  ],
};

// Screen 16 — Reviews intro
export const reviewsIntro = {
  body: "Do not take our word for it, see what people say after living with Oryzo.",
  ratingLabel: "RATING & REVIEWS",
  reviewCount: "CUSTOM REVIEWS [ 364 ]",
  score: "[ 4.9/5 ]",
  inUseLabel: "ORYZO IN USE",
  firstReview: {
    stars: "[ 5/5 ]",
    quote: 'This is the best coaster that I\'ve ever used. I can\'t go to the space without it',
    highlight: "best coaster",
  },
};

// Screen 17 — Reviews list
export const reviewsList = {
  reviews: [
    {
      name: "EDAN K.",
      role: "NASA ASTRONAUT WANNABE",
      stars: "[ 4.5/5 ]",
      quote:
        "My coaster? If you want it, I'll let you have it. Look for it! I left everything I gathered together in one place!",
      highlight: "one place!",
      img: assets.astronaut,
      alt: "Astronaut standing on the surface of the Moon",
    },
    {
      name: "GOL D. ROGER",
      role: "OLD-SCHOOL PIRATE",
      stars: "[ 5/5 ]",
      quote: "We are so cooked. Hollywood is not ready for a coaster this cinematic.",
      highlight: "We are so cooked.",
      img: assets.pirateKing,
      alt: "Comic-style pirate king grinning over a drink",
    },
    {
      name: "JAMIE R.",
      role: "AI INFLUENCER, EX-WEB3 INFLUENCER",
      stars: "[ 5/5 ]",
      quote: "I tried the wearable mode. I achieved... attention.",
      highlight: "attention",
      img: assets.youtuber,
      alt: "Wide-eyed YouTuber reaction-video thumbnail",
    },
  ],
};

// Screen 18 — Always On gallery
export const alwaysOnGallery = {
  panels: [
    { id: "edge", caption: "the edge\nthe cloud", tone: "accentDeep", img: assets.edge, alt: "Macro view of stacked Oryzo cork coaster edges" },
    { id: "stickers", caption: "EXPRESS YOURSELF", tone: "cork", img: assets.sticker1, alt: "Cork coaster bombed with colorful stickers" },
    { id: "always", caption: "Always On", tone: "olive", img: assets.alwaysOn, alt: "Blue enamel mug on an Oryzo coaster at a campsite under the stars" },
    { id: "flatearth", caption: "FLAT-EARTH\nAPPROVED", tone: "olive", img: assets.flatEarth, alt: "Dimly lit society meeting in a hall" },
    { id: "stickers2", caption: "STICK WITH IT", tone: "accentDeep", img: assets.sticker2, alt: "Assorted cartoon stickers scattered across cork" },
  ],
  footer: "24/7 UPTIME. NO POWER REQUIRED.",
};

// Screen 19 — Runs on RTX 3090
export const runsOnRtx = {
  eyebrow: "NO MORE OOM ON ANY CONSUMER GPUS",
  headline: "Runs on RTX 3090",
};

// Screen 20 — Drop-Tested
export const dropTested = {
  sideLabel: "PERFECT BY DESIGN",
  headline: "Drop-Tested",
  meta: [
    { label: "TEST CONDITIONS", value: "HARD SURFACE" },
    { label: "DATE", value: "02/29/2026" },
    { label: "DAMAGE", value: "NONE DETECTED" },
  ],
};

// Screen 21 — Legacy Support
export const legacySupport = {
  eyebrow: "SUPPORTING BACKWARD COMPATIBILITY SINCE THE 5TH MILLENNIUM BCE",
  headline: "Legacy Support",
  artifacts: [
    "ANCIENT GREECE. C. 500 BCE",
    "ROMAN EMPIRE. 1ST CENTURY CE",
    "ANCIENT EGYPT. C. 1350 BCE",
    "ANCIENT CHINA C. 1100 BCE",
  ],
};

// Screen 22 — ORYZO-1 model / paper
export const oryzo1Model = {
  topTiles: [
    { never: "NEVER", bestFor: "BEST FOR:", text: "DAILY MUGS AND QUIET DESKS" },
    { never: "NEVER", bestFor: "BEST FOR:", text: "TALLER CUPS AND EXTRA STABILITY" },
    { never: "NEVER", bestFor: "BEST FOR:", text: "MAXIMUM LIFT AND MAXIMUM PRESENCE" },
  ],
  eyebrow: "OUR SOTA OPEN WEIGHT MODEL",
  headline: "ORYZO-1",
  pills: [
    { label: "PAPER", icon: "paper", disabled: false },
    { label: "MODEL (.OBJ)", icon: "cube", disabled: false },
    { label: "CODE COMING SOON", icon: "code", disabled: true },
  ],
  abstractLabel: "Abstract",
  abstract:
    "We present Oryzo-1, an open-weight 3D model of a cork coaster for rendering, simulation, and gloriously unnecessary research. Oryzo-1 faithfully reproduces key coaster behaviors - table protection, perfect circularity, and passive thermal moderation under everyday beverage conditions. Released in clean OBJ format with baseline results on our own WoodenBench (a standardized evaluation suite conducted on a single desk and very possibly rigged by us). Limitations include heavy dependency on gravity, mugs, and human deployment.",
  abstractHighlight: "Oryzo-1",
};

// Screen 23 — Contact / footer
export const contactFooter = {
  headline: ["WE CAUGHT YOUR ATTENTION WITH A", "NON-EXISTENT PRODUCT."],
  subhead: ["IF WE CAN SELL A COASTER, IMAGINE", "WHAT WE CAN DO FOR YOUR BRAND."],
  cta: "LUSION.CO",
  ctaHref: "https://lusion.co",
  share: {
    builtBy: "BUILT BY LUSION",
    withLove: "WITH LOVE",
    shareLine1: "SHARE WITH FRIENDS",
    shareLine2: "IF YOU LIKE IT",
    copyUrl: "COPY URL",
  },
  newsletter: {
    label: "SUBSCRIBE TO LUSION'S NEWSLETTER",
    placeholder: "YOUR EMAIL",
    success: "Thanks — you're on the list.",
  },
  contacts: [
    { label: "NEW BUSINESS", value: "BUSINESS@LUSION.CO" },
    { label: "GENERAL ENQUIRES", value: "HELLO@LUSION.CO" },
  ],
  socials: ["X", "INSTAGRAM", "LINKEDIN"],
  legal: ["TERMS & CONDITIONS", "PRIVACY POLICY"],
  disclaimer:
    "THIS ENTIRE SITE IS A FICTIONAL CREATIVE PROJECT BY LUSION. ORYZO DOESN'T EXIST. NO PRODUCTS ARE FOR SALE. ALL CLAIMS ARE SATIRICAL AND FOR ENTERTAINMENT PURPOSES ONLY.",
};
