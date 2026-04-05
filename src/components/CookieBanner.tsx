import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const CookieBanner = () => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <p className="text-white/70 text-sm leading-relaxed flex-1">
              {language === 'ru'
                ? 'Мы используем cookie, чтобы анализировать поведение посетителей сайта и делать его лучше. Продолжая пользоваться сайтом, вы соглашаетесь с использованием файлов cookie.'
                : 'We use cookies to analyze visitor behavior and improve the website. By continuing to use the site, you agree to the use of cookies.'}
            </p>
            <button
              onClick={handleAccept}
              className="px-8 py-3 bg-royal-pink text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-royal-pink/80 transition-all whitespace-nowrap flex-shrink-0"
            >
              {language === 'ru' ? 'Согласен' : 'Accept'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
