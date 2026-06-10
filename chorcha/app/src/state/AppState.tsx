import React, { createContext, useContext, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  batch: string;
  institution: string;
  points: number;
  streak: number;
  rank: number;
  totalExams: number;
}

export interface AppStateContextValue {
  user: UserProfile;
  currentLeague: 'iron' | 'bronze' | 'silver' | 'gold' | 'amethyst';
  isLoggedIn: boolean;
}

const defaultUser: UserProfile = {
  name: 'Andy - Abdullah Khan Zehady',
  email: 'andy@chorcha.app',
  batch: 'BCS-52',
  institution: 'Bangladesh University of Engineering & Technology',
  points: 0,
  streak: 1,
  rank: 0,
  totalExams: 0,
};

const defaultState: AppStateContextValue = {
  user: defaultUser,
  currentLeague: 'iron',
  isLoggedIn: true,
};

const AppStateContext = createContext<AppStateContextValue>(defaultState);

export function useAppState() {
  return useContext(AppStateContext);
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  return (
    <AppStateContext.Provider value={defaultState}>
      {children}
    </AppStateContext.Provider>
  );
}
