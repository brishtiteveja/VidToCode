import React, { createContext, useContext, useMemo, useState } from "react";

export type Profile = {
  name: string;
  nativeLanguage: string;
  targetLanguage: string;
  explanationLanguage: string;
  interests: string[];
  level: string;
  areas: string[];
  dailyGoal: string;
  reminder: string;
};

const defaultProfile: Profile = {
  name: "Ananda",
  nativeLanguage: "বাংলা",
  targetLanguage: "English",
  explanationLanguage: "বাংলা",
  interests: ["Cooking", "Food", "Traveling"],
  level: "Advanced",
  areas: ["Career & job"],
  dailyGoal: "10 min / day",
  reminder: "21:30",
};

type Ctx = {
  onboarded: boolean;
  profile: Profile;
  setProfile: (patch: Partial<Profile>) => void;
  completeOnboarding: () => void;
};

const AppStateContext = createContext<Ctx | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfileState] = useState<Profile>(defaultProfile);

  const value = useMemo<Ctx>(
    () => ({
      onboarded,
      profile,
      setProfile: (patch) => setProfileState((p) => ({ ...p, ...patch })),
      completeOnboarding: () => setOnboarded(true),
    }),
    [onboarded, profile]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
