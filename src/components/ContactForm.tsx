import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';

const ContactForm = () => {
  const { t, language } = useLanguage();
  const lp = useLocalizedPath();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', messenger: '', message: '' });
  const [mailingConsent, setMailingConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // On reg.ru hosting use contact.php; on Vercel use /api/contact
    const isRu = typeof window !== 'undefined' && window.location.hostname.endsWith('.ru');
    const endpoint = isRu ? '/contact.php' : '/api/contact';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, mailingConsent }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', messenger: '', message: '' });
        setMailingConsent(false);
      } else {
        setStatus('error');
        setErrorMsg(data.error || (language === 'ru' ? 'Ошибка отправки' : 'Sending failed'));
      }
    } catch {
      setStatus('error');
      setErrorMsg(language === 'ru' ? 'Ошибка сети. Попробуйте позже.' : 'Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 md:p-12 rounded-[40px] bg-white/5 border border-white/10 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-royal-pink/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-royal-pink" />
        </div>
        <h3 className="text-2xl font-display font-bold uppercase mb-4">
          {language === 'ru' ? 'Заявка отправлена!' : 'Request sent!'}
        </h3>
        <p className="text-white/50 mb-8">
          {language === 'ru'
            ? 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.'
            : 'Thank you for reaching out! We will contact you shortly.'}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-8 py-4 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest rounded-2xl hover:border-royal-pink hover:text-royal-pink transition-all"
        >
          {language === 'ru' ? 'Отправить ещё' : 'Send another'}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="p-8 md:p-12 rounded-[40px] bg-white/5 border border-white/10"
    >
      <h3 className="text-3xl font-display font-bold uppercase mb-12">{t.contactPage.formTitle}</h3>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/40 font-bold">{t.contactPage.labels.name} <span className="text-royal-pink">*</span></label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-royal-pink outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/40 font-bold">{t.contactPage.labels.emailAddr} <span className="text-royal-pink">*</span></label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-royal-pink outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/40 font-bold">{t.contactPage.labels.phoneNumber} <span className="text-royal-pink">*</span></label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-royal-pink outline-none transition-all"
            placeholder={language === 'ru' ? '+7 (___) ___-__-__' : '+1 (___) ___-____'}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/40 font-bold">{t.contactPage.labels.messenger} <span className="text-royal-pink">*</span></label>
          <select
            required
            value={formData.messenger}
            onChange={(e) => setFormData(prev => ({ ...prev, messenger: e.target.value }))}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-royal-pink outline-none transition-all text-white [&>option]:bg-royal-black [&>option]:text-white"
          >
            <option value="" disabled>{language === 'ru' ? 'Выберите мессенджер' : 'Select messenger'}</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Max">{language === 'ru' ? 'Макс' : 'Max'}</option>
            <option value="VK">VK</option>
            <option value="Email">{language === 'ru' ? 'Электронная почта' : 'Email'}</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/40 font-bold">{t.contactPage.labels.message} <span className="text-royal-pink">*</span></label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-royal-pink outline-none transition-all resize-none"
          ></textarea>
        </div>

        {/* Checkbox: consent to personal data processing */}
        <div className="flex items-start gap-3">
          <input type="checkbox" id="data-consent" className="mt-1 w-4 h-4 accent-royal-pink flex-shrink-0 cursor-pointer" required />
          <label htmlFor="data-consent" className="text-white/50 text-xs leading-relaxed cursor-pointer">
            {language === 'ru' ? (
              <>Я даю <Link to={lp('/data-consent')} className="text-royal-pink hover:underline">согласие</Link> на обработку своих персональных данных</>
            ) : (
              <>I give my <Link to={lp('/data-consent')} className="text-royal-pink hover:underline">consent</Link> to the processing of my personal data</>
            )}
          </label>
        </div>

        {/* Checkbox: consent to public offer */}
        <div className="flex items-start gap-3">
          <input type="checkbox" id="offer-consent" className="mt-1 w-4 h-4 accent-royal-pink flex-shrink-0 cursor-pointer" required />
          <label htmlFor="offer-consent" className="text-white/50 text-xs leading-relaxed cursor-pointer">
            {language === 'ru' ? (
              <>Я подтверждаю согласие с публичной <Link to={lp('/offer')} className="text-royal-pink hover:underline">Офертой</Link></>
            ) : (
              <>I confirm my agreement with the <Link to={lp('/offer')} className="text-royal-pink hover:underline">Public Offer</Link></>
            )}
          </label>
        </div>

        {/* Checkbox: consent to mailing (unchecked, not required) */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="mailing-consent"
            checked={mailingConsent}
            onChange={(e) => setMailingConsent(e.target.checked)}
            className="mt-1 w-4 h-4 accent-royal-pink flex-shrink-0 cursor-pointer"
          />
          <label htmlFor="mailing-consent" className="text-white/50 text-xs leading-relaxed cursor-pointer">
            {language === 'ru' ? (
              <>Я даю <Link to={lp('/mailing-consent')} className="text-royal-pink hover:underline">согласие на рекламную рассылку</Link></>
            ) : (
              <>I give my <Link to={lp('/mailing-consent')} className="text-royal-pink hover:underline">consent to receive promotional mailings</Link></>
            )}
          </label>
        </div>

        {errorMsg && (
          <p className="text-red-400 text-sm text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-6 bg-royal-pink text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-royal-pink/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {language === 'ru' ? 'Отправка...' : 'Sending...'}
            </>
          ) : (
            t.contactPage.labels.submit
          )}
        </button>

        <p className="text-white/30 text-[10px] text-center leading-relaxed">
          {language === 'ru' ? (
            <>Нажимая на кнопку, вы соглашаетесь с <Link to={lp('/privacy')} className="text-royal-pink hover:underline">политикой конфиденциальности</Link></>
          ) : (
            <>By clicking the button, you agree to the <Link to={lp('/privacy')} className="text-royal-pink hover:underline">privacy policy</Link></>
          )}
        </p>
      </form>
    </motion.div>
  );
};

export default ContactForm;
