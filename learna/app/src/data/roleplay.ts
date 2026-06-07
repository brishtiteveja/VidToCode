export type ScenarioType = "Task" | "Scenario" | "Discussion" | "English Test";

export type Scenario = {
  id: string;
  title: string;
  type: ScenarioType;
  level: string;
  tint: string;
  icon: string;
};

export type Collection = {
  id: string;
  title: string;
  scenes: number;
  icon: string;
};

export type RoleplaySection = {
  title: string;
  items: Scenario[];
};

export const levelCards = [
  { id: "beginner", title: "Beginner", scenes: 26, emoji: "🐤" },
  { id: "pre-int", title: "Pre-Intermediate", scenes: 27, emoji: "📚" },
];

export const collections: Collection[] = [
  { id: "restaurant", title: "Restaurant", scenes: 12, icon: "🍽️" },
  { id: "travel", title: "Travel", scenes: 12, icon: "🧳" },
  { id: "social", title: "Social Dynamics", scenes: 12, icon: "🫂" },
  { id: "shopping", title: "Shopping", scenes: 4, icon: "🛍️" },
  { id: "activities", title: "Activities", scenes: 8, icon: "🚲" },
];

export const roleplaySections: RoleplaySection[] = [
  {
    title: "School & Job",
    items: [
      { id: "job-interview", title: "Job Interview", type: "Scenario", level: "Upper-Intermediate", tint: "#FCE7D6", icon: "💼" },
      { id: "applying-job", title: "Applying for a Job", type: "Task", level: "Upper-Intermediate", tint: "#DCEBFB", icon: "📝" },
      { id: "talking-skills", title: "Talking About Your Skills", type: "Task", level: "Beginner", tint: "#E3F2E0", icon: "⭐" },
    ],
  },
  {
    title: "Daily Interactions",
    items: [
      { id: "directions", title: "Asking for Directions", type: "Task", level: "Beginner", tint: "#DCEBFB", icon: "🧭" },
      { id: "pharmacy", title: "Visiting the Pharmacy", type: "Task", level: "Pre-Intermediate", tint: "#E3F2E0", icon: "💊" },
      { id: "clothes", title: "Shopping for Clothes", type: "Task", level: "Pre-Intermediate", tint: "#FBE3EC", icon: "👕" },
    ],
  },
  {
    title: "Activities",
    items: [
      { id: "recipe", title: "Explaining a Recipe", type: "Task", level: "Pre-Intermediate", tint: "#E3F2E0", icon: "🍳" },
      { id: "dinner-party", title: "Hosting a Dinner Party", type: "Scenario", level: "Intermediate", tint: "#FDF3D6", icon: "🎉" },
      { id: "cleanup", title: "Organizing a Local Clean-Up Event", type: "Task", level: "Advanced", tint: "#FBE3E0", icon: "🧹" },
    ],
  },
  {
    title: "Flirting",
    items: [
      { id: "first-date", title: "First Date Tips", type: "Scenario", level: "Beginner", tint: "#FBE3EC", icon: "💖" },
      { id: "romantic", title: "Planning a Romantic Evening", type: "Scenario", level: "Upper-Intermediate", tint: "#F3E3FB", icon: "🌹" },
    ],
  },
];
