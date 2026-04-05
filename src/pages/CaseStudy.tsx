import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { ArrowLeft, Users, Calendar, MapPin, Play, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

import ContactForm from '../components/ContactForm';

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const lp = useLocalizedPath();
  const navigate = useNavigate();

  const caseItem = t.cases.items.find((item: any) => item.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 340;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!caseItem) {
      navigate(lp('/portfolio'));
    }
  }, [caseItem, navigate]);

  if (!caseItem) return null;

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 pb-20">
      <SEO title={`${caseItem.client} | Royal Event Group`} description={caseItem.desc} />
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-royal-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-10 right-10 text-white hover:text-royal-pink transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl shadow-royal-pink/20"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to={lp('/portfolio')} className="inline-flex items-center gap-2 text-royal-pink font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all">
            <ArrowLeft className="w-4 h-4" /> {t.nav.portfolio}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-royal-pink font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
              Case Study
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-8">
              {caseItem.client}
            </h1>
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="flex items-center gap-3 text-white/60">
                <Users className="w-5 h-5 text-royal-pink" />
                <span className="text-sm font-bold uppercase tracking-widest">{caseItem.people}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Calendar className="w-5 h-5 text-royal-pink" />
                <span className="text-sm font-bold uppercase tracking-widest">{id === 'world-stars' ? (language === 'ru' ? 'Любой райдер' : 'Any rider') : '7 Days'}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-royal-pink" />
                <span className="text-sm font-bold uppercase tracking-widest">Egypt</span>
              </div>
            </div>
            <p className="text-2xl text-white/50 font-light leading-relaxed">
              {caseItem.fullDesc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10"
          >
            <img 
              src={caseItem.image} 
              alt={caseItem.client} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Gallery Section */}
        {caseItem.gallery && caseItem.gallery.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <ImageIcon className="w-6 h-6 text-royal-pink" />
              <h2 className="text-3xl font-display font-black uppercase tracking-tighter">Photo Gallery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseItem.gallery.map((img: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in relative z-0 hover:z-10"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-125 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-royal-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Video Section */}
        {caseItem.videos && caseItem.videos.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <Play className="w-6 h-6 text-royal-pink" />
              <h2 className="text-3xl font-display font-black uppercase tracking-tighter">
                {language === 'ru' ? 'Видеоотчет' : 'Video Highlights'}
              </h2>
            </div>
            
            {/* Horizontal Videos Grid */}
            {caseItem.videos.some((v: any) => v.type === 'horizontal') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {caseItem.videos.filter((v: any) => v.type === 'horizontal').map((video: any, i: number) => (
                  <motion.div
                    key={`h-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative aspect-video rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 group"
                  >
                    <video
                      src={video.url}
                      poster={video.poster}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      controls
                      preload="metadata"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Vertical Videos Carousel */}
            {caseItem.videos.some((v: any) => v.type === 'vertical') && (
              <div className="relative group/carousel">
                {/* Navigation Buttons */}
                <button
                  onClick={() => scrollCarousel('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-royal-black/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-royal-pink hover:text-royal-black transition-all -translate-x-1/2 opacity-0 group-hover/carousel:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-royal-black/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-royal-pink hover:text-royal-black transition-all translate-x-1/2 opacity-0 group-hover/carousel:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div ref={carouselRef} className="flex gap-6 overflow-x-auto pb-8 scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {caseItem.videos.filter((v: any) => v.type === 'vertical').map((video: any, i: number) => (
                    <motion.div
                      key={`v-${i}`}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative flex-none w-[280px] md:w-[320px] aspect-[9/16] rounded-[40px] overflow-hidden border border-white/10 group snap-center bg-white/5"
                    >
                      <video
                        src={video.url}
                        poster={video.poster}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000"
                        controls
                        preload="metadata"
                        playsInline
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {!caseItem.videos && (
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <Play className="w-6 h-6 text-royal-pink" />
              <h2 className="text-3xl font-display font-black uppercase tracking-tighter">Video Highlights</h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-[60px] overflow-hidden border border-white/10 group cursor-pointer"
            >
              <img 
                src={`https://picsum.photos/seed/video-${id}/1920/1080`} 
                alt="Video Preview" 
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-royal-black/40 group-hover:bg-royal-black/20 transition-colors">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-royal-pink group-hover:text-royal-black transition-all">
                  <Play className="w-10 h-10 fill-current" />
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Contact Form Section */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-black uppercase tracking-tighter mb-4">
              {language === 'ru' ? 'Хотите такой же проект?' : 'Want a similar project?'}
            </h2>
            <p className="text-white/40 uppercase tracking-widest text-sm font-bold">
              {language === 'ru' ? 'Оставьте заявку, и мы свяжемся с вами' : 'Submit an application, and we will contact you'}
            </p>
          </div>
          <ContactForm />
        </section>
      </div>
    </div>
  );
};

export default CaseStudy;
