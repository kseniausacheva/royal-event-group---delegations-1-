import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { Mail, Phone, MapPin, Instagram, Linkedin, Send, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';

import ContactForm from '../components/ContactForm';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 px-6">
      <SEO title={t.nav.contact} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="text-royal-pink font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
            {t.nav.contact}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none break-words">
            {t.contactPage.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-12 mb-20">
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-royal-pink" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold uppercase mb-2">{t.contactPage.labels.email}</h4>
                  <p className="text-white/40 text-lg">baxgat@yandex.ru</p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-royal-pink" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold uppercase mb-2">{t.contactPage.labels.phone}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/40 text-lg">+7 926 123 33 28</p>
                      <div className="flex gap-4 mt-1 flex-wrap">
                        <a
                          href="https://max.ru/+79261233328"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold uppercase tracking-widest text-royal-pink hover:text-white transition-colors"
                        >
                          Max
                        </a>
                        <a
                          href="https://t.me/+79261233328"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold uppercase tracking-widest text-royal-pink hover:text-white transition-colors"
                        >
                          Telegram
                        </a>
                        <a
                          href="https://wa.me/79261233328"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold uppercase tracking-widest text-royal-pink hover:text-white transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/40 text-lg">+20 110 100 5061</p>
                      <div className="flex gap-4 mt-1">
                        <a
                          href="https://t.me/+201101005061"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold uppercase tracking-widest text-royal-pink hover:text-white transition-colors"
                        >
                          Telegram
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-royal-pink" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold uppercase mb-2">{t.contactPage.labels.location}</h4>
                  <p className="text-white/40 text-lg whitespace-pre-line">{t.contactPage.locations}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/royalevent_mice_egypt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-royal-pink hover:text-royal-pink transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ksenia-usacheva-b5a7b23b5/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-royal-pink hover:text-royal-pink transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/kseniamerry"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-royal-pink hover:text-royal-pink transition-all"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://max.ru/u/f9LHodD0cOI6NopEpkHgITsu_AIEFyrbBPaFkURFR2kn3i3inUUuT4dKLgQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Max"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-royal-pink hover:text-royal-pink transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
