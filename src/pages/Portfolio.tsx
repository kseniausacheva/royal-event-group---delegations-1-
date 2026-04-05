import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import SEO from '../components/SEO';

const Portfolio = () => {
  const { t } = useLanguage();
  const lp = useLocalizedPath();

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 px-6">
      <SEO title={t.nav.portfolio} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="text-royal-pink font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
            {t.nav.portfolio}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none break-words">
            {t.portfolioPage.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {t.cases.items.map((project: any, i: number) => (
            <Link key={i} to={lp(`/portfolio/${project.id}`)}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-[40px] overflow-hidden mb-8 border border-white/10 bg-white/5 flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.client} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                  ) : (
                    <Play className="w-12 h-12 text-royal-pink/50" />
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-display font-bold uppercase mb-2">{project.client}</h3>
                    <p className="text-white/40 leading-relaxed">{project.desc}</p>
                  </div>
                  <span className="text-royal-pink font-bold text-sm uppercase tracking-widest">{project.people}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
