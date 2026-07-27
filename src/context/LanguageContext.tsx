import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LANGUAGE_STORAGE_KEY } from '../core/constants/app';

export type AppLanguage = 'en' | 'ur';

interface LanguageContextValue {
  language: AppLanguage;
  isUrdu: boolean;
  toggleLanguage: () => void;
  setLanguage: (language: AppLanguage) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function loadLanguage(): AppLanguage {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'ur' ? 'ur' : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>(() => loadLanguage());

  useEffect(() => {
    document.documentElement.lang = language === 'ur' ? 'ur' : 'en';
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === 'en' ? 'ur' : 'en'));
  }, []);

  const value = useMemo(
    () => ({ language, isUrdu: language === 'ur', toggleLanguage, setLanguage }),
    [language, toggleLanguage],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
