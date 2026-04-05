import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import SEO from '../components/SEO';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const { language } = useLanguage();
  const lp = useLocalizedPath();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-royal-black text-white flex items-center justify-center px-6">
      <SEO title={language === 'ru' ? 'Страница не найдена | Royal Event Group' : 'Page Not Found | Royal Event Group'} noindex />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <div className="text-[120px] sm:text-[180px] font-display font-black leading-none tracking-tighter text-white/5 select-none">
          404
        </div>

        <h1 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter -mt-8 mb-4">
          {language === 'ru' ? 'Страница не найдена' : 'Page Not Found'}
        </h1>

        <p className="text-white/40 text-sm sm:text-base mb-12 leading-relaxed">
          {language === 'ru'
            ? 'К сожалению, запрашиваемая страница не существует или была перемещена. Вернитесь на главную или свяжитесь с нами.'
            : 'Sorry, the page you are looking for does not exist or has been moved. Return to the homepage or contact us.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={lp('/')}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-royal-pink text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-royal-pink/80 transition-all"
          >
            <Home className="w-4 h-4" />
            {language === 'ru' ? 'На главную' : 'Homepage'}
          </Link>
          <Link
            to={lp('/contact')}
            className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest rounded-2xl hover:border-royal-pink hover:text-royal-pink transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'ru' ? 'Связаться с нами' : 'Contact Us'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
