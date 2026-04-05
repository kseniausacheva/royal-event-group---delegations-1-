import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { translations } from './translations';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine language from URL
  const getLangFromPath = (pathname: string): Language => {
    if (pathname.startsWith('/en')) return 'en';
    return 'ru';
  };

  const [language, setLanguageState] = useState<Language>(getLangFromPath(location.pathname));

  useEffect(() => {
    const lang = getLangFromPath(location.pathname);
    setLanguageState(lang);
    document.documentElement.lang = lang;
  }, [location.pathname]);

  // Redirect root "/" to "/ru"
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/ru', { replace: true });
    }
  }, [location.pathname, navigate]);

  const setLanguage = (lang: Language) => {
    const currentLang = getLangFromPath(location.pathname);
    const pathWithoutLang = location.pathname.replace(`/${currentLang}`, '') || '';
    navigate(`/${lang}${pathWithoutLang}`);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
