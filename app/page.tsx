"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { StoryExperience } from "@/components/story/StoryExperience";

export type Language = "en" | "pt";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";
  }, [language]);

  return (
    <>
      <Navigation language={language} onLanguageChange={setLanguage} />
      <StoryExperience language={language} />
    </>
  );
}
