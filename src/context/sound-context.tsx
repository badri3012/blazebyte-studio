"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { sound } from "@/lib/sound";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playPortalWeb: () => void;
  playPortalMarketing: () => void;
  playPortalAI: () => void;
  playPortalApps: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playHover: () => {},
  playClick: () => {},
  playPortalWeb: () => {},
  playPortalMarketing: () => {},
  playPortalAI: () => {},
  playPortalApps: () => {},
  playSuccess: () => {},
});

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("blazebyte_sound_enabled");
    if (saved === "true") {
      setSoundEnabled(true);
      sound.setEnabled(true);
    }
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
    localStorage.setItem("blazebyte_sound_enabled", String(next));
    if (next) {
      sound.playClick();
    }
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playHover: () => sound.playHover(),
        playClick: () => sound.playClick(),
        playPortalWeb: () => sound.playPortalWeb(),
        playPortalMarketing: () => sound.playPortalMarketing(),
        playPortalAI: () => sound.playPortalAI(),
        playPortalApps: () => sound.playPortalApps(),
        playSuccess: () => sound.playSuccess(),
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
