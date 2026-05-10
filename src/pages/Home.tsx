import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  ShieldCheck, 
  Languages, 
  Star, 
  Mail,
  ArrowRight,
  Award,
  Briefcase,
  Settings,
  Hammer,
  Speaker,
  Monitor,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import SEO from '../components/SEO';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16">
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-royal-pink font-bold text-xs uppercase tracking-[0.4em] mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-2xl sm:text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      className="h-1 bg-royal-pink mt-8" 
    />
  </div>
);

const Home = () => {
  const { t, language } = useLanguage();
  const lp = useLocalizedPath();
  const carouselRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef(null);
  const productionRef = useRef(null);
  const philosophyRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-royal-black text-white selection:bg-royal-pink selection:text-white font-manrope overflow-x-hidden">
      <SEO 
        title={language === 'ru' ? 'Организация корпоративных мероприятий в Египте, ОАЭ и России' : 'Corporate Event Organization in Egypt, UAE, and Russia'}
        description={t.hero.subtitle}
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-28 md:pt-0 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full h-full">
            <motion.img 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000" 
              alt="Large Scale Event Background" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-royal-black via-royal-black/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden md:inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-royal-pink text-[10px] font-bold uppercase tracking-[0.4em] mb-10"
            >
              {t.hero.tag}
            </motion.span>
            <h1 className="text-[1.5rem] sm:text-6xl md:text-[6rem] font-display font-black leading-[0.85] tracking-tighter mb-10 uppercase">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="block"
              >
                {t.hero.title}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-royal-pink via-purple-400 to-royal-pink bg-[length:200%_auto] animate-gradient-x"
              >
                {t.hero.titleAccent}
              </motion.span>
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-12 max-w-4xl">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl md:text-2xl text-white/50 font-light leading-relaxed border-l-2 border-royal-pink/30 pl-8"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={lp('/contact')} className="group px-12 py-6 bg-royal-pink text-royal-black font-display font-bold rounded-full flex items-center gap-4 shadow-2xl shadow-royal-pink/20 transition-all whitespace-nowrap">
                  {t.hero.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap gap-8 md:gap-12 mt-10"
            >
              {t.hero.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-display font-black text-white">{stat.value}</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-40 px-6 bg-royal-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-royal-pink font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
                {t.nav.services}
              </span>
              <h2 className="text-2xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none text-left">
                {t.servicesOverview.title} <br /> {t.servicesOverview.titleAccent}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to={lp('/services')} className="px-8 py-4 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-royal-black transition-all">
                {t.servicesOverview.cta}
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.servicesOverview.items.map((service, i) => {
              const icons = [Briefcase, Star, Globe, Languages];
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="p-10 rounded-[40px] bg-white/5 border border-white/10 hover:border-royal-pink/50 transition-all group h-full flex flex-col"
                >
                  <div className="w-16 h-16 rounded-2xl bg-royal-pink/10 flex items-center justify-center mb-8 group-hover:bg-royal-pink group-hover:text-royal-black transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-base sm:text-xl md:text-2xl font-display font-bold uppercase mb-4 leading-tight whitespace-pre-line">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mt-auto">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Section (USP) */}
      <section ref={productionRef} className="py-40 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeader title={t.production.title} subtitle={t.production.subtitle} />
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl text-white/50 font-light leading-relaxed mb-16"
              >
                {t.production.desc}
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {t.production.items.map((item, i) => {
                  const icons = [Hammer, Speaker, Monitor, Settings];
                  const Icon = icons[i];
                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-royal-pink/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-royal-pink/10 flex items-center justify-center mb-6 group-hover:bg-royal-pink group-hover:text-royal-black transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-display font-bold mb-3 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }} 
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring" }}
              className="relative"
            >
              <div className="aspect-square rounded-[60px] overflow-hidden border border-white/10">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" alt="Production" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={t.cases.title} subtitle={t.cases.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {t.cases.items.map((item: any, i: number) => (
              <Link key={i} to={lp(`/portfolio/${item.id}`)}>
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative h-[500px] rounded-[40px] overflow-hidden border border-white/10"
                >
                  <img src={item.image} alt={item.client} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-black via-royal-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-12">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-royal-pink font-bold text-xs uppercase tracking-widest mb-4 block">{item.people}</span>
                        <h3 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-2">{item.client}</h3>
                        <p className="text-white/60 text-sm max-w-xs">{item.desc}</p>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-royal-pink group-hover:text-royal-black transition-all">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Carousel Section */}
      <section className="py-40 px-6 bg-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto mb-20 flex justify-between items-end">
          <SectionHeader title={t.videos.title} subtitle={t.videos.subtitle} />
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 mb-16"
          >
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-royal-pink hover:text-royal-black transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-royal-pink hover:text-royal-black transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
        
        <div className="relative py-20">
          {/* Featured Hero Video */}
          <div className="max-w-7xl mx-auto flex justify-center mb-32 px-6">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="w-full max-w-[450px] aspect-[9/16] rounded-[60px] overflow-hidden border-2 border-royal-pink bg-royal-black relative group z-20 shadow-[0_0_60px_rgba(255,46,141,0.3)] cursor-pointer"
              onClick={() => setActiveVideo(t.videos.items[0].id)}
            >
              {t.videos.items[0].url ? (
                <video 
                  src={t.videos.items[0].url}
                  poster={t.videos.items[0].poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              ) : (
                <img 
                  src={t.videos.items[0].poster} 
                  alt={t.videos.items[0].label} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-royal-black/20 group-hover:bg-transparent transition-colors">
                <div className="w-24 h-24 rounded-full bg-royal-pink text-royal-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-12 left-12 right-12">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/60">
                  {t.videos.videoLabel} {t.videos.featuredLabel}
                </span>
                <div className="text-white font-display font-bold mt-3 text-2xl">{t.videos.items[0].label}</div>
              </div>
            </motion.div>
          </div>

          {/* Gallery Carousel */}
          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-8 px-6 pb-12 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {t.videos.items.slice(1).map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="flex-shrink-0 w-[240px] sm:w-[280px] aspect-[9/16] rounded-[32px] overflow-hidden border border-white/10 bg-royal-black relative group snap-center cursor-pointer hover:border-royal-pink/50 transition-all duration-500"
                  onClick={() => setActiveVideo(item.id)}
                >
                  {item.url ? (
                    <video 
                      src={item.url}
                      poster={item.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <img 
                      src={item.poster} 
                      alt={item.label} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-royal-black/20 group-hover:bg-transparent transition-colors">
                    <div className="w-12 h-12 rounded-full bg-royal-pink/80 text-royal-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white font-display font-bold text-sm line-clamp-1">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Video Modal */}
          <AnimatePresence>
            {activeVideo && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-royal-black/95 flex items-center justify-center p-6"
                onClick={() => setActiveVideo(null)}
              >
                <div 
                  className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.videos.items.find(v => v.id === activeVideo)?.url ? (
                    <video 
                      src={t.videos.items.find(v => v.id === activeVideo)?.url} 
                      controls 
                      autoPlay 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white/40 font-display text-xl uppercase tracking-widest">Video Not Available</p>
                    </div>
                  )}
                  <button 
                    className="absolute top-6 right-6 text-white hover:text-royal-pink transition-colors z-10"
                    onClick={() => setActiveVideo(null)}
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Instructions */}
          <div className="max-w-7xl mx-auto mt-24 px-6 text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20"
            >
              {t.videos.instruction}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-40 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={t.team.title} subtitle={t.team.subtitle} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <p className="text-2xl text-white/50 font-light leading-relaxed mb-12">
                {t.team.desc}
              </p>
            </motion.div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
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
                  <h4 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">{ceo.name}</h4>
                  <p className="text-royal-pink font-bold text-xs uppercase tracking-widest">{ceo.role}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Full Team Photos */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative group aspect-video rounded-[30px] md:rounded-[40px] overflow-hidden border border-white/10 bg-royal-black/50"
            >
              <img 
                src="/team-full-1.jpg" 
                alt="Full Team 1" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-tighter">{language === 'ru' ? 'Наша команда' : 'Our Team'}</h3>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative group aspect-video rounded-[30px] md:rounded-[40px] overflow-hidden border border-white/10 bg-royal-black/50"
            >
              <img 
                src="/team-full-2.jpg" 
                alt="Full Team 2" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-tighter">{language === 'ru' ? 'Наша команда' : 'Our Team'}</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accessible Event Section */}
      <section className="py-40 px-6 bg-royal-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={t.whyUs.title} subtitle={t.whyUs.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyUs.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[40px] bg-white/[0.03] border border-white/10 hover:border-royal-pink/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-royal-pink/10 flex items-center justify-center text-royal-pink mb-8 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Event Section */}
      <section className="py-40 px-6 bg-royal-black overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
              {t.accessibleSection.header}
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none mb-8 italic">
              <span className="text-white block">{t.accessibleSection.titleLine1}</span>
              <span className="text-white block">{t.accessibleSection.titleLine2}</span>
              <span className="text-royal-pink block">{t.accessibleSection.titleLine3}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {t.accessibleSection.cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative p-8 pt-16 rounded-[40px] text-left flex flex-col h-full ${
                  i === 1 ? 'bg-white/5 border border-white/10 text-white' : 'bg-white text-royal-black'
                }`}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-royal-black rounded-b-2xl" />
                
                {/* Number */}
                <div className="absolute top-6 right-8 text-royal-pink font-display font-black text-xl">
                  {card.number}
                </div>

                <div className="mt-auto">
                  <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-2">
                    {card.title.split(' ')[0]}
                  </h3>
                  <h3 className="text-4xl font-display font-black uppercase tracking-tighter mb-6">
                    {card.title.split(' ')[1]}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-8 ${i === 1 ? 'text-white/60' : 'text-royal-black/60'}`}>
                    {card.desc.split('. ').map((part, index, array) => (
                      <React.Fragment key={index}>
                        {part.includes('глаза и уши') || part.includes('eyes and ears') || part.includes('работаете напрямую') || part.includes('work directly') ? (
                          <span className={i === 1 ? 'text-white font-bold' : 'text-royal-black font-bold'}>{part}</span>
                        ) : part}
                        {index < array.length - 1 ? '. ' : ''}
                      </React.Fragment>
                    ))}
                  </p>
                  
                  {card.partners && (
                    <div className={`flex items-start gap-3 pt-6 border-t ${i === 1 ? 'border-white/10' : 'border-royal-black/10'}`}>
                      <div className="w-5 h-5 rounded-full border border-royal-pink flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-royal-pink" />
                      </div>
                      <p className={`text-[10px] uppercase tracking-widest font-bold ${i === 1 ? 'text-white/40' : 'text-royal-black/50'}`}>
                        {card.partners}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-display font-black uppercase tracking-tighter text-white/40"
          >
            {t.accessibleSection.footer.split('. ')[0]}. <span className="text-white">{t.accessibleSection.footer.split('. ')[1]}</span>
          </motion.p>
        </div>
      </section>

      {/* Locations Map Section */}
      <section className="py-40 px-6 bg-royal-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={t.locations.title} subtitle={t.locations.subtitle} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square md:aspect-[21/9] w-full bg-white/[0.02] rounded-[30px] md:rounded-[60px] border border-white/10 overflow-hidden"
          >
            {/* Stylized Map Background (Simple SVG pattern or abstract lines) */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 200C200 200 300 100 500 100C700 100 800 300 1000 300" stroke="white" strokeWidth="0.5" strokeDasharray="5 5" />
                <path d="M0 100C200 100 400 300 600 300C800 300 1000 100" stroke="white" strokeWidth="0.5" strokeDasharray="5 5" />
              </svg>
            </div>

            {/* Location Markers */}
            <div className="absolute inset-0">
              {/* Moscow & Russia */}
              <div className="absolute top-[20%] left-[55%] group">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-4 h-4 bg-royal-pink rounded-full shadow-[0_0_20px_rgba(255,99,33,0.8)]"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-royal-pink text-royal-black px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  {t.locations.items[4].name}
                </div>
              </div>
              <div className="absolute top-[15%] left-[65%] w-32 h-32 bg-royal-pink/5 rounded-full border border-royal-pink/20 animate-pulse flex items-center justify-center">
                <span className="text-[8px] uppercase tracking-widest text-royal-pink/40 font-bold">{t.locations.items[5].name}</span>
              </div>

              {/* Egypt: Cairo & Sharm */}
              <div className="absolute top-[45%] left-[48%] group">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="w-4 h-4 bg-royal-pink rounded-full shadow-[0_0_20px_rgba(255,99,33,0.8)]"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-royal-pink text-royal-black px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  {t.locations.items[0].name}
                </div>
              </div>
              <div className="absolute top-[52%] left-[50%] group">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className="w-4 h-4 bg-royal-pink rounded-full shadow-[0_0_20px_rgba(255,99,33,0.8)]"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-royal-pink text-royal-black px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  {t.locations.items[1].name}
                </div>
              </div>

              {/* UAE: Dubai & Abu Dhabi */}
              <div className="absolute top-[55%] left-[58%] group">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
                  className="w-4 h-4 bg-royal-pink rounded-full shadow-[0_0_20px_rgba(255,99,33,0.8)]"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-royal-pink text-royal-black px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  {t.locations.items[2].name}
                </div>
              </div>
              <div className="absolute top-[58%] left-[57%] group">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, delay: 2 }}
                  className="w-4 h-4 bg-royal-pink rounded-full shadow-[0_0_20px_rgba(255,99,33,0.8)]"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-royal-pink text-royal-black px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  {t.locations.items[3].name}
                </div>
              </div>
            </div>

            {/* Location List Overlay */}
            <div className="absolute bottom-6 right-6 left-6 md:left-auto md:bottom-12 md:right-12">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
                {t.locations.items.map((loc, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 md:gap-3 bg-royal-black/60 backdrop-blur-md border border-white/10 p-2 md:p-4 rounded-xl md:rounded-2xl"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-royal-pink rounded-full shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white truncate">{loc.name}</div>
                      <div className="text-[6px] md:text-[8px] uppercase tracking-widest text-white/40 truncate">{loc.country}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-40 px-6 bg-royal-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={t.partners.title} subtitle={t.partners.subtitle} />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'Carlsberg', logo: '/partners/carlsberg.png' },
              { name: 'NL International', logo: '/partners/nl-international.png' },
              { name: 'Ewa Product', logo: '/partners/ewa-product.png' },
              { name: 'AFA', logo: '/partners/afa.png' },
              { name: 'Samsung', logo: '/partners/samsung.png' },
              { name: 'Space', logo: '/partners/space.png' },
              { name: 'Four Seasons', logo: '/partners/four-seasons.png' },
              { name: 'Rixos', logo: '/partners/rixos.png' },
              { name: 'Myway', logo: '/partners/myway.png' },
              { name: 'Adidas', logo: '/partners/adidas.png' },
              { name: 'Puma', logo: '/partners/puma.png' },
              { name: 'Lionsdale', logo: '/partners/lionsdale.png' },
            ].map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className={`aspect-video rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group hover:border-royal-pink/50 transition-all ${['Four Seasons', 'Samsung', 'Carlsberg', 'Ewa Product'].includes(partner.name) ? 'p-0' : 'p-4'}`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 mix-blend-lighten grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 ${partner.name === 'Samsung' ? 'scale-150' : ['Four Seasons', 'Carlsberg', 'Ewa Product'].includes(partner.name) ? 'scale-110' : ''}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-40 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <SectionHeader title={t.blogPage.title} subtitle={t.blogPage.subtitle} />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to={lp('/blog')}
                className="inline-flex items-center gap-4 text-royal-pink text-[10px] font-bold uppercase tracking-[0.3em] group"
              >
                {t.blogPage.readMore}
                <div className="w-12 h-[1px] bg-royal-pink/30 group-hover:w-20 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.blogPage.articles.slice(0, 3).map((article: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={lp(`/blog/${article.id}`)} className="block">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-8">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-royal-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-white/40">
                      <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-1 border border-white/10 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-widest">{article.date}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-royal-pink transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader title={t.philosophy.title} subtitle={t.philosophy.subtitle} />
            <div className="space-y-12">
              {t.philosophy.items.map((item, i) => {
                const icons = [ShieldCheck, Star, Languages];
                const Icon = icons[i];
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex flex-col sm:flex-row gap-6 sm:gap-8 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-royal-pink/5 border border-royal-pink/10 flex items-center justify-center group-hover:bg-royal-pink group-hover:text-royal-black transition-all duration-500">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-2xl font-display font-bold mb-3 uppercase tracking-tight hyphens-none">{item.title}</h4>
                      <p className="text-white/40 leading-relaxed max-w-md text-sm sm:text-base">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }} 
            whileInView={{ opacity: 1, scale: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10 shadow-2xl shadow-royal-pink/10">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000" alt="Corporate" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="py-40 px-6 bg-royal-pink text-royal-black">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none mb-8"
          >
            {t.ctaSection.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-12 opacity-80"
          >
            {t.ctaSection.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to={lp('/contact')}
              className="inline-flex items-center gap-4 px-16 py-8 bg-royal-black text-white font-display font-bold rounded-full text-xl hover:scale-105 transition-transform"
            >
              {t.ctaSection.button} <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
