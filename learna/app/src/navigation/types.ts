import type { LessonNode } from "../data/lessons";

export type RootStackParamList = {
  Onboarding: undefined;
  Tabs: undefined;
  Lesson: { title: string; mode: "Lecture" | "Practice"; tint?: string };
  Paywall: undefined;
  ScenarioDetail: { title: string; level: string };
};

export type TabParamList = {
  Home: undefined;
  RolePlay: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type TopicSheetTarget = LessonNode | null;
