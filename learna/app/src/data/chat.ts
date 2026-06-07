export type ChatMessage = {
  id: string;
  role: "ai" | "user";
  text: string;
  bold?: string[]; // substrings to render bold
};

// Sample "Catching Up" lecture transcript (bilingual scaffolding).
export const lectureTranscript: ChatMessage[] = [
  {
    id: "m1",
    role: "ai",
    text: "হ্যালো Ananda! কেমন আছো আজ?\nআজকের সেশনে আমরা শিখব কীভাবে ইংরেজিতে Present Perfect-এর \"I've been meaning to...\" ব্যবহার করা যায়।\nতুমি কি প্রস্তুত?",
    bold: ["I've been meaning to..."],
  },
  { id: "m2", role: "user", text: "Yes, I'm ready!" },
  {
    id: "m3",
    role: "ai",
    text: "দারুণ! \"I've been meaning to…\" ব্যবহার করা হয় যখন তুমি অনেকদিন ধরে কিছু করতে চেয়েছিলে, কিন্তু এখনো করোনি।",
    bold: ["I've been meaning to…"],
  },
  {
    id: "m4",
    role: "ai",
    text: "উদাহরণ:\n• I've been meaning to call you.\n• I've been meaning to reschedule our meeting.",
    bold: ["call", "reschedule"],
  },
  {
    id: "m5",
    role: "ai",
    text: "কিছু জিজ্ঞেস করতে চাও? নাকি আমরা একটু প্র্যাকটিস শুরু করব?",
  },
];

export const practiceTranscript: ChatMessage[] = [
  {
    id: "p1",
    role: "ai",
    text: "চল শুরু করি! প্রথমে, আমি একটি বাক্য বলব, তোমাকে ঠিক করতে হবে।",
  },
  {
    id: "p2",
    role: "ai",
    text: "I've been meaning to ___ our meeting. (postpone / eat / sing)\nকোনটি সঠিক হবে?",
  },
  { id: "p3", role: "user", text: "postpone" },
  {
    id: "p4",
    role: "ai",
    text: "ঠিক বলেছো! I've been meaning to postpone our meeting.",
    bold: ["postpone"],
  },
  {
    id: "p5",
    role: "ai",
    text: "এবার আরেকটা প্রশ্ন: I've been meaning to ___ with my old friend. (reconnect / cook / sleep)\nতুমি কী মনে করো, কোনটা হবে?",
  },
];

export const inspireHint =
  "I think I would use 'reconnect' here. So, I've been meaning to reconnect with my cousin. We haven't spoken in a long time, so it would be nice to catch up.";
