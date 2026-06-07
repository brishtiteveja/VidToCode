import { Ionicons } from "@expo/vector-icons";

export type WordCard = { word: string; translation: string };

export type LessonNode = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  state: "current" | "done" | "locked";
  words?: WordCard[];
  grammar?: number;
  subtitle?: string;
};

export type LessonSection = {
  label: string;
  nodes: LessonNode[];
};

const w = (word: string, translation: string): WordCard => ({ word, translation });

export const lessonSections: LessonSection[] = [
  {
    label: "Advanced",
    nodes: [
      {
        id: "catching-up",
        title: "Catching Up",
        icon: "hand-left",
        state: "current",
        grammar: 1,
        subtitle: "Reconnect and talk about what you've been meaning to do.",
        words: [
          w("postpone", "পিছিয়ে দেওয়া"),
          w("reschedule", "নতুন সময় ঠিক করা"),
          w("availability", "সময় আছে কিনা"),
          w("tentative", "সম্ভাব্য"),
          w("reconnect", "আবার যোগাযোগ"),
          w("coordinate", "একসাথে পরিকল্পনা"),
        ],
      },
      {
        id: "thats-so-true",
        title: "That's So True",
        icon: "chatbubble-ellipses",
        state: "locked",
        grammar: 1,
        words: [w("agree", "একমত"), w("indeed", "নিশ্চিতভাবে"), w("exactly", "ঠিক বলেছ")],
      },
      {
        id: "weekend-getaway",
        title: "Weekend Getaway",
        icon: "briefcase",
        state: "locked",
        grammar: 1,
        words: [w("itinerary", "ভ্রমণসূচি"), w("getaway", "ছুটি"), w("scenic", "নৈসর্গিক")],
      },
      {
        id: "spending-free-time",
        title: "Spending Free Time",
        icon: "cafe",
        state: "locked",
        grammar: 1,
        words: [w("hobby", "শখ"), w("leisure", "অবসর"), w("unwind", "বিশ্রাম")],
      },
      {
        id: "missed-opportunities",
        title: "Missed Opportunities",
        icon: "time",
        state: "locked",
        grammar: 1,
        subtitle: "অতীতের কাল্পনিক পরিণতি নিয়ে কথা বলতে শিখুন।",
        words: [
          w("risk", "ঝুঁকি"),
          w("opportunity", "সুযোগ"),
          w("disappointment", "হতাশা"),
          w("regret", "অনুশোচনা"),
        ],
      },
      {
        id: "travel-plans",
        title: "Travel Plans",
        icon: "airplane",
        state: "locked",
        grammar: 1,
        words: [
          w("passport", "পাসপোর্ট"),
          w("luggage", "লাগেজ"),
          w("insurance", "বীমা"),
          w("cancel", "বাতিল"),
        ],
      },
    ],
  },
  {
    label: "Proficient",
    nodes: [
      { id: "public-opinion", title: "Public Opinion", icon: "megaphone", state: "locked", grammar: 1 },
      { id: "negotiations", title: "Negotiations", icon: "git-compare", state: "locked", grammar: 1 },
      { id: "small-talk", title: "The Art of Small Talk", icon: "people", state: "locked", grammar: 1 },
      { id: "presentation", title: "Presentation Starters", icon: "easel", state: "locked", grammar: 1 },
      { id: "office-drama", title: "Office Drama", icon: "flame", state: "locked", grammar: 1 },
    ],
  },
];
