import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ShieldCheck, 
  Languages, 
  Star, 
  ChevronRight,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

interface ServiceItemProps {
  icon: any;
  title: string;
  description: string;
  delay: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="flex gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-royal-pink/30 transition-all"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-royal-pink/10 flex items-center justify-center">
      <Icon className="text-royal-pink w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-display font-bold mb-2 uppercase tracking-tight">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const Delegations = () => {
  const { t } = useLanguage();
  const lp = useLocalizedPath();
  const icons = [Languages, ShieldCheck, Globe, Star];

  return (
    <div className="min-h-screen bg-royal-black text-white selection:bg-royal-pink selection:text-white font-manrope">
      <SEO 
        title={t.delegationsPage.seo.title} 
        description={t.delegationsPage.seo.description} 
      />
      
      {/* Internal Hero */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-royal-pink/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-royal-pink transition-colors">
              <ArrowLeft className="w-3 h-3" /> {t.delegationsPage.backToHome}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 break-words uppercase">
              {t.delegationsPage.title}
            </h1>
            <div className="w-24 h-1.5 bg-royal-pink mb-8" />
            <p className="max-w-2xl text-xl text-white/60 font-light leading-relaxed">
              {t.delegationsPage.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight flex items-center gap-4">
                <span className="text-royal-pink">01.</span> {t.delegationsPage.sections[0].title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.delegationsPage.sections[0].items.map((item, i) => (
                  <ServiceItem 
                    key={i}
                    icon={icons[i]}
                    title={item.title}
                    description={item.desc}
                    delay={0.1 * (i + 1)}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight flex items-center gap-4">
                <span className="text-royal-pink">02.</span> {t.delegationsPage.sections[1].title}
              </h2>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  {t.delegationsPage.sections[1].desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {t.delegationsPage.sections[1].features.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-white/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-royal-pink" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: CTA Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32 p-10 rounded-[40px] bg-royal-pink text-royal-black overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full -mr-16 -mt-16" />
              
              <h3 className="text-3xl font-display font-black mb-6 relative z-10">
                {t.delegationsPage.cta.title}
              </h3>
              <p className="font-bold mb-10 text-royal-black/80 relative z-10">
                {t.delegationsPage.cta.desc}
              </p>
              
              <Link
                to={lp('/contact')}
                className="flex items-center justify-between w-full p-6 bg-royal-black text-white rounded-2xl font-display font-bold hover:scale-[1.02] transition-transform group"
              >
                {t.delegationsPage.cta.button}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-8 pt-8 border-t border-royal-black/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-royal-black/10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Email</p>
                  <p className="font-bold">baxgat@yandex.ru</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Delegations;
