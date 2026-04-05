import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import SEO from '../components/SEO';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 px-6">
      <SEO 
        title={t.aboutPage.seo.title} 
        description={t.aboutPage.seo.description} 
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="text-royal-pink font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
            {t.nav.about}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none mb-6 break-words">
            {t.aboutPage.title}
          </h1>
          <p className="text-xl md:text-2xl text-royal-pink font-bold uppercase tracking-widest max-w-3xl">
            {t.aboutPage.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl text-white/80 font-light leading-relaxed mb-8">
              {t.aboutPage.description}
            </p>
            <p className="text-lg text-white/40 leading-relaxed">
              {t.aboutPage.history}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-video rounded-[40px] overflow-hidden border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1000" 
              alt="Office" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* CEOs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
          {t.team.ceos.map((ceo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden mb-8 border border-white/10">
                <img src={ceo.image} alt={ceo.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <h4 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">{ceo.name}</h4>
              <p className="text-royal-pink font-bold text-sm uppercase tracking-widest">{ceo.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission & Values Section */}
        <div className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none mb-8">
                {t.aboutPage.mission.title}
              </h2>
              <p className="text-xl text-white/60 leading-relaxed">
                {t.aboutPage.mission.desc}
              </p>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.aboutPage.values.items.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[40px] bg-white/5 border border-white/10"
                >
                  <h3 className="text-2xl font-display font-bold uppercase mb-4 text-royal-pink">{value.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
