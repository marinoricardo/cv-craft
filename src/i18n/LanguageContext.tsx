import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, Language, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('meucv_language');
    return (stored === 'en' || stored === 'pt') ? stored : 'pt';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('meucv_language', lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLang);
  }, [language, setLanguage]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
