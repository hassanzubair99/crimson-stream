'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppStateContextType {
  isIntroFinished: boolean;
  finishIntro: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  const finishIntro = () => {
    setIsIntroFinished(true);
  };

  return (
    <AppStateContext.Provider value={{ isIntroFinished, finishIntro }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
