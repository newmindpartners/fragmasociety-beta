import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bryanImage from "@/assets/bryan-banner.png";
import philippeImage from "@/assets/philippe-banner.png";
import timImage from "@/assets/tim-banner.png";
import bryanIndustry from "@/assets/bryan-horse-jumping.png";
import realEstateIndustry from "@/assets/malibu-sea-view.jpg";
import timIndustry from "@/assets/tim-film-posters.png";

const leaders = [
  {
    name: "Bryan Balsiger",
    title: "European Champion Jumping",
    image: bryanImage,
    industryImage: bryanIndustry,
  },
  {
    name: "Philippe Naouri",
    title: "Malibu Mid-Century Villa Designer",
    image: philippeImage,
    industryImage: realEstateIndustry,
  },
  {
    name: "Tim Levy",
    title: "Hollywood Blockbuster Film Financier",
    image: timImage,
    industryImage: timIndustry,
  },
];

const SLIDE_DURATION = 5000;

export const SignatureDealsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % leaders.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + leaders.length) % leaders.length);
  }, []);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(goToNext, SLIDE_DURATION);
  }, [goToNext]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovered) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isHovered, startAutoplay, stopAutoplay]);

  const handleManualNavigation = (index: number) => {
    setCurrentIndex(index);
    // Reset the autoplay timer when manually navigating
    if (!isHovered) {
      startAutoplay();
    }
  };

  const current = leaders[currentIndex];

  return (
    <section 
      className="relative h-[320px] md:h-[380px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Deep Slate/Navy Background - matching legal footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Background - Industry image with deep overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={current.industryImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                opacity: 0.40,
                filter: 'grayscale(30%) brightness(0.85)'
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Softer navy gradient overlay for better image visibility */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 90% at 50% 100%, transparent 0%, rgba(15,23,42,0.3) 50%, rgba(15,23,42,0.7) 100%),
              radial-gradient(ellipse 100% 60% at 50% 50%, transparent 0%, rgba(15,23,42,0.4) 100%)
            `
          }}
        />
        
        {/* Subtle violet glow accents */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-violet-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-slate-700/20 rounded-full blur-3xl" />
        
        {/* Top spotlight glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.08) 0%, transparent 70%)'
          }}
        />
      </div>
      
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Navigation Arrows */}
      <button
        onClick={() => { goToPrev(); handleManualNavigation((currentIndex - 1 + leaders.length) % leaders.length); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-all duration-300 hover:bg-white/10"
        style={{ color: 'rgba(255,255,255,0.6)' }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} strokeWidth={1.5} />
      </button>
      
      <button
        onClick={() => { goToNext(); handleManualNavigation((currentIndex + 1) % leaders.length); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-all duration-300 hover:bg-white/10"
        style={{ color: 'rgba(255,255,255,0.6)' }}
        aria-label="Next slide"
      >
        <ChevronRight size={28} strokeWidth={1.5} />
      </button>

      {/* Content container */}
      <div className="container relative z-10 h-full">
        {/* LEFT - INVEST WITH - Absolute positioning for consistent placement */}
        <div 
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col justify-center items-start"
          style={{ transform: 'translateY(-50%) translateZ(0)' }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="h-px w-7"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            />
            <span 
              className="text-[10px] tracking-[0.25em] uppercase font-light"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Signature Deals
            </span>
          </div>
          
          <h3
            className="text-2xl md:text-4xl font-light tracking-wide uppercase"
            style={{ 
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.15em'
            }}
          >
            Invest with
          </h3>

          {/* Progress dots */}
          <div className="flex items-center gap-3 mt-8">
            {leaders.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleManualNavigation(idx)}
                className="group relative p-1"
                aria-label={`View ${leaders[idx].name}`}
              >
                <div
                  className="w-2 h-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: idx === currentIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
                    boxShadow: idx === currentIndex ? '0 0 10px rgba(255,255,255,0.4)' : 'none'
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Grid for center portrait and right name */}
        <div className="grid grid-cols-3 items-center h-full gap-4" style={{ transform: 'translateZ(0)' }}>
          {/* Empty left column spacer */}
          <div />

          {/* MIDDLE - Leader portrait */}
          <div className="relative h-full flex items-end justify-center">
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px]"
              style={{
                background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,250,240,0.06) 0%, transparent 60%)'
              }}
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`portrait-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeInOut"
                }}
                className="relative h-[85%] flex items-end"
                style={{ transform: 'translateZ(0)' }}
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-full w-auto object-contain object-bottom max-w-[280px] md:max-w-[320px]"
                  style={{ 
                    filter: 'grayscale(100%) contrast(1.15) brightness(1.1)',
                    mixBlendMode: 'luminosity'
                  }}
                />
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT - Name and position - Fixed positioning */}
          <div className="flex flex-col justify-center items-end text-right pr-4" style={{ transform: 'translateZ(0)' }}>
            {/* Fixed height container for name */}
            <div className="h-[60px] md:h-[80px] flex items-center justify-end mb-3 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`name-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut"
                  }}
                  className="text-3xl md:text-[58px] font-bold tracking-tight leading-none uppercase whitespace-nowrap"
                  style={{ 
                    transform: 'translateZ(0)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 60px rgba(180, 160, 200, 0.25)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {current.name}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Fixed height container for title */}
            <div className="h-[24px] flex items-center justify-end overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.1,
                    ease: "easeInOut"
                  }}
                  className="text-sm md:text-base font-serif whitespace-nowrap"
                  style={{ 
                    color: 'rgba(255,255,255,0.5)',
                    fontStyle: 'italic',
                    fontWeight: 300
                  }}
                >
                  {current.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom line - violet accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};
