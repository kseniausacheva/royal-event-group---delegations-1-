import React from 'react';
import { Instagram, Facebook, Linkedin, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, language } = useLanguage();
  const lp = useLocalizedPath();

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/royalevent_mice_egypt', label: 'Instagram' },
{ icon: Linkedin, href: 'https://www.linkedin.com/in/ksenia-usacheva-b5a7b23b5/', label: 'LinkedIn' },
    { icon: Send, href: 'https://t.me/kseniamerry', label: 'Telegram' },
    { icon: MessageCircle, href: 'https://max.ru/u/f9LHodD0cOI6NopEpkHgITsu_AIEFyrbBPaFkURFR2kn3i3inUUuT4dKLgQ', label: 'Max' },
  ];

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-royal-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="group">
            <img src="/logo.png" alt="ROYAL EVENT" className="h-24 w-auto group-hover:opacity-80 transition-opacity" />
          </Link>
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            {t.footer.rights}
          </p>
        </div>

        <div className="flex gap-6">
          {socialLinks.map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-royal-pink hover:text-royal-pink transition-all group"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-2">
          <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">
            {t.footer.legal.ip}<br />
            {t.footer.legal.inn}<br />
            {t.footer.legal.ogrnip}<br />
            {language === 'ru' ? 'г. Москва, ул. Шепелюгинская, д. 5, к. 1, кв. 91' : 'Moscow, Shepelyuginskaya st., 5, bldg. 1, apt. 91'}
          </p>
          <div className="mt-4 space-y-1">
            <a href="mailto:baxgat@yandex.ru" className="text-white/40 text-[10px] uppercase tracking-widest hover:text-royal-pink transition-colors block">
              baxgat@yandex.ru
            </a>
            <a href="tel:+79261233328" className="text-white/40 text-[10px] uppercase tracking-widest hover:text-royal-pink transition-colors block">
              +7 (926) 123-33-28
            </a>
            <a href="tel:+201101005061" className="text-white/40 text-[10px] uppercase tracking-widest hover:text-royal-pink transition-colors block">
              +20 (110) 100-50-61
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Link to={lp('/privacy')} className="text-white/40 text-[10px] uppercase tracking-widest hover:text-royal-pink transition-colors">
            {t.footer.legal.privacy}
          </Link>
          <Link to={lp('/data-consent')} className="text-white/40 text-[10px] uppercase tracking-widest hover:text-royal-pink transition-colors">
            {language === 'ru' ? 'Согласие на обработку персональных данных' : 'Personal Data Processing Consent'}
          </Link>
          <Link to={lp('/mailing-consent')} className="text-white/40 text-[10px] uppercase tracking-widest hover:text-royal-pink transition-colors">
            {language === 'ru' ? 'Согласие на рассылку' : 'Mailing Consent'}
          </Link>
          <Link to={lp('/offer')} className="text-white/40 text-[10px] uppercase tracking-widest hover:text-royal-pink transition-colors">
            {language === 'ru' ? 'Договор оферты' : 'Public Offer Agreement'}
          </Link>
        </div>
        <div>
          <p className="text-white/20 text-[10px] leading-relaxed italic">
            {t.footer.legal.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
