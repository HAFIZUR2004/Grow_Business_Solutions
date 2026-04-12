"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { LanguageType } from "@/constants/translations";

interface LanguageContextType {
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LanguageType>("EN");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
