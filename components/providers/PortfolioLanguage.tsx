"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ProfileLanguage } from "@/data/profile-language";

const LanguageContext = createContext<{
  language: ProfileLanguage;
  toggleLanguage: () => void;
} | null>(null);
const storageKey = "ba6kir:profile-language:v1";

export function PortfolioLanguage({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<ProfileLanguage>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "en" || saved === "ru") setLanguage(saved);
    } catch {
      // Language selection also works without browser storage.
    }
  }, []);

  function toggleLanguage() {
    const next = language === "en" ? "ru" : "en";
    setLanguage(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // Persistence is optional.
    }
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function usePortfolioLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("PortfolioLanguage provider is required");
  return context;
}
