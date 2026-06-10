// All copy lifted from the live wgb.agency/en homepage.

export const nav = {
  links: ["Manifesto", "Services", "Cases", "Resources", "About"],
  cta: "Talk to us",
};

export const hero = {
  // headline rendered with an italic-serif emphasis on "growth"
  pre: "Engineering future ",
  em: "growth",
  post: " for B2B founders",
  sub: "Feeling lost in the noise? We help you generate trust & revenue with LinkedIn content, ads & outbound.",
  primary: "Explore cases",
  secondary: "Talk to us",
  orbit: ["Capture", "Amplify", "Create"],
};

export const statement = {
  pre: "We ",
  em: "orbit",
  post: " only around what matters",
};

export const problem = {
  pre: "Your delivery is world-class. Your ",
  em: "sales pipeline",
  post: " isn’t.",
  cards: [
    {
      title: "Your sales pipeline depends on luck",
      body: "You rely entirely on referrals and sporadic inbound. When they dry up, you have no engineered mechanism to generate demand on your own terms.",
    },
    {
      title: "Your own marketing is the first thing you cut",
      body: 'Client delivery consumes all your oxygen. Your company\'s growth strategy becomes a "side project" that lacks the consistency to generate real results.',
    },
    {
      title: "Your distinct value is lost in the noise",
      body: "You’re visible, but not memorable. You haven’t built the thought leadership or positioning needed to become the only choice for your dream client.",
    },
    {
      title: "You’ve tried content, ads, and outreach — but never in sync",
      body: "You tried these tactics in silos, and they failed to convert. Without a holistic Trust Engine to integrate them, your efforts feel busy rather than strategic.",
    },
    {
      title: "You’re unable to book the client meetings you actually want",
      body: "You know who your dream clients are, but you can't reach them. You lack the intent data and trust required to break through and start the conversation.",
    },
  ],
  believe: {
    title: "Sounds familiar? Here’s what we believe.",
    cta: "Read our manifesto",
  },
};

export type CaseCard = {
  name: string;
  stat: string;
  statLabel: string;
  tone: string; // gradient classes for the placeholder portrait
};

export const cases = {
  pre: "Proven with 30+ founders that trusted us in guiding ",
  em: "their growth",
  post: "",
  cta: "Explore our cases",
  items: [
    { name: "beilmann.", stat: "1.34M", statLabel: "Impressions generated", tone: "from-stone-400 to-stone-700" },
    { name: "VOGGSMEDIA", stat: "340K", statLabel: "Impressions generated", tone: "from-indigo-400 to-slate-800" },
    { name: "Service Factory", stat: "400K", statLabel: "Impressions generated", tone: "from-emerald-300 to-stone-700" },
    { name: "adspecialist", stat: "3.74M", statLabel: "Impressions generated", tone: "from-zinc-500 to-zinc-900" },
    { name: "adsventure", stat: "90%", statLabel: "LinkedIn revenue", tone: "from-amber-200 to-stone-700" },
  ] as CaseCard[],
  logos: ["The Optimized Agency", "ECOM HOUSE", "adsventure", "adspecialist", "audiencly", "beilmann."],
};

export const trustEngine = {
  pre: "Guiding your ",
  em: "growth",
  post: " beyond the known using our Trust Engine",
  intro:
    "The Trust Engine replaces the chaos of isolated marketing tactics with a holistic system of Content, Ads, and Outreach, earning you the trust of your ideal clients long before you ever make the sale.",
  cta: "Discover our solutions",
  services: [
    {
      pre: "Founder-Led ",
      em: "Content",
      post: "",
      body: "We tell your unique story and turn your expertise into content that is worth sharing. This engineers trust at scale, positioning you as a liked and respected authority long before the first contact.",
    },
    {
      pre: "Account-Based Marketing ",
      em: "Ads",
      post: "",
      body: "Stop leaving your growth to the luck of an algorithm. We use Account-Based Marketing (ABM) to guarantee your best content actually reaches your dream clients. By promoting your insights directly to a specific list of decision-makers, we ensure you stay consistently top-of-mind and in their orbit.",
    },
    {
      pre: "",
      em: "Outreach",
      post: " based on real data signals",
      body: "We replace generic cold mails with precise and natural outreach based on real data signals. Because the prospect already knows and trusts your brand from your content, the conversation is warm from the start. We simply turn that existing gravity into booked meetings.",
    },
  ],
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonials = {
  pre: "We treat your sales pipeline like ",
  em: "it’s our own",
  post: "",
  sub: "You don’t just hire an agency. We engineer your growth with the same obsession we apply to our own business.",
  items: [
    {
      name: "Florian Litterst",
      role: "Founder, adsventure",
      quote:
        "Our LinkedIn content funnel has already made a massive impact. For one of our biggest deals, we had a 5-month sales cycle — and throughout that entire time, we were consistently putting content in front of the decision-makers. The pipeline has never been this full.",
    },
    {
      name: "Johannes Rehbehn",
      role: "Managing Director, Service Factory",
      quote:
        "I wanted to position Service Factory as a strategic partner — not just a service provider. LinkedIn has helped me communicate exactly that and generate new business in a targeted way.",
    },
    {
      name: "Guido Thiemann",
      role: "Managing Director, Pushfire",
      quote: "Niklas and his team have a deep understanding of how communication works.",
    },
    {
      name: "Daniel Bidmon",
      role: "Co-Founder & CEO, ECOM HOUSE",
      quote:
        "By working with Niklas and his team, I am achieving 100,000 impressions per month and systematically gaining hundreds of new leads.",
    },
    {
      name: "Lukas Maria Beilmann",
      role: "Co-Founder & CEO, Beilmann",
      quote: "WGB has an excellent feel for LinkedIn and a good understanding of our target group.",
    },
    {
      name: "Moritz Lamprecht",
      role: "Co-Founder & CEO, Ad Specialist",
      quote:
        "LinkedIn is our most important sales channel — we have generated multiple 6-figure revenues in only 2 years.",
    },
    {
      name: "Mio",
      role: "Founder & CEO, Optimates",
      quote: "Today I make nearly 100% of my revenue with LinkedIn, proven through my posts.",
    },
  ] as Testimonial[],
};

export const comparison = {
  pre: "Stop relying on ",
  em: "isolated tactics",
  post: "",
  sub: "You cannot engineer predictable growth with random acts of marketing. To fill your pipeline consistently, you need to replace isolated efforts with a holistic system.",
  left: {
    title: "Isolated tactics",
    subtitle: "Personal Branding vs. Lead Gen Ads vs. Cold Outreach",
    items: [
      "You post content, but the right people never see it — or never reach out.",
      "You run ads, but without trust, people scroll past or ignore them.",
      "You do cold outreach, but you’re unknown — and untrusted.",
      "You treat content, ads, and outreach as separate efforts.",
    ],
  },
  right: {
    title: "WGB Trust Engine",
    subtitle: "A holistic system for real growth",
    items: [
      "Strategic content is amplified and targeted directly at your ICP.",
      "Thought Leader Ads build authority and awareness, not just clicks.",
      "Outreach is powered by brand visibility and warm signals.",
      "The Trust Engine combines all three into a single flywheel system.",
    ],
  },
};

export const footer = {
  pre: "Talk to an ",
  em: "expert",
  post: ", not sales",
  cta: "Talk to us",
  founders: [
    { name: "Niklas Götz", role: "Co-Founder WGB", tone: "from-emerald-700 to-stone-900" },
    { name: "Joshua Frosch", role: "Co-Founder WGB", tone: "from-lime-700 to-stone-900" },
  ],
  tagline: "we go beyond",
  links: ["Manifesto", "Services", "Cases", "Blog", "Growth Assets", "About"],
  legal: ["Privacy Policy", "Imprint", "Cookies"],
  credits: "©Branding by Ali  ©Design by Dylan",
  copyright: "© 2026 WGB. All rights reserved.",
};
