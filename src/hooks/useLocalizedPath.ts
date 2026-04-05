import { useLanguage } from '../LanguageContext';

export const useLocalizedPath = () => {
  const { language } = useLanguage();
  return (path: string) => `/${language}${path === '/' ? '' : path}`;
};
