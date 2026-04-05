import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { Briefcase, Users, Globe, Zap, Shield, Star, Languages } from 'lucide-react';
import SEO from '../components/SEO';

const Services = () => {
  const { t } = useLanguage();

  const icons = [Briefcase, Users, Globe, Languages, Zap, Shield, Star];

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 px-6">
      <SEO 
        title={t.servicesPage.seo.title} 
        description={t.servicesPage.seo.description} 
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <span className="text-royal-pink font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
            {t.nav.services}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none break-words">
            {t.servicesPage.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {t.servicesPage.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[40px] bg-white/5 border border-white/10 hover:border-royal-pink/50 transition-all group"
              >
                <Icon className="w-12 h-12 text-royal-pink mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-display font-bold uppercase mb-4">{service.title}</h3>
                <p className="text-white/40 leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* How We Work Section */}
        <div className="mb-40">
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none mb-16 text-center">
            {t.servicesPage.process.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {t.servicesPage.process.items.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-8xl font-display font-black text-white/5 absolute -top-10 -left-4 select-none">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold uppercase mb-4 text-royal-pink">{step.title}</h3>
                  <p className="text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
