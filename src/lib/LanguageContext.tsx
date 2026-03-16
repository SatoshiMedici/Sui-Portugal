"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Locale, type Translations } from "./i18n";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

const FADE_DURATION = 150;
const FADE_MIN_OPACITY = 0.6;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [opacity, setOpacity] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const browserLang = navigator.language;
    if (browserLang.startsWith("pt")) {
      setLocaleState("pt");
    }
    const saved = localStorage.getItem("locale");
    if (saved === "en" || saved === "pt") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setOpacity(FADE_MIN_OPACITY);
    setTimeout(() => {
      setLocaleState(l);
      localStorage.setItem("locale", l);
      setOpacity(1);
    }, FADE_DURATION);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t: translations[locale], setLocale }}
    >
      <div
        ref={wrapperRef}
        style={{
          opacity,
          transition: `opacity ${FADE_DURATION}ms ease-in-out`,
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
