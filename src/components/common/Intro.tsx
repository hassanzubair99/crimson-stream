'use client';

import { useState, useEffect } from 'react';
import { useAppState } from '@/context/AppStateContext';

export function Intro({ children }: { children: React.ReactNode }) {
  const { isIntroFinished, finishIntro } = useAppState();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      // Wait for fade-out animation to complete before finishing intro
      const finishTimer = setTimeout(finishIntro, 500); 
      return () => clearTimeout(finishTimer);
    }, 3500); // Total duration of the intro screen

    return () => clearTimeout(timer);
  }, [finishIntro]);

  if (isIntroFinished) {
    return <>{children}</>;
  }

  return (
    <div className={`fixed inset-0 bg-black flex justify-center items-center z-[100] transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="font-display text-6xl md:text-8xl lg:text-9xl animate-flicker">
        Crimson Stream
      </h1>
    </div>
  );
}
