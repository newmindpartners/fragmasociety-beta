import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setSwipeDirection('left');
    setCurrentIndex((prev) => (prev + 1) % leaders.length);
  }, []);

  const goToPrev = useCallback(() => {
    setSwipeDirection('right');
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
    setSwipeDirection(index > currentIndex ? 'left' : 'right');
    setCurrentIndex(index);
    // Reset the autoplay timer when manually navigating
    if (!isHovered) {
      startAutoplay();
    }
  };

  // Swipe gesture handler for mobile
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const velocity = 0.3;
    
    if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      goToNext();
    } else if (info.offset.x > threshold || info.velocity.x > velocity) {
      goToPrev();
    }
  }, [goToNext, goToPrev]);

  const current = leaders[currentIndex];

  return (
    <section 
      className="relative h-[480px] sm:h-[380px] md:h-[400px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 3000)}
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
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[150px] sm:h-[250px] bg-violet-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[400px] h-[100px] sm:h-[200px] bg-slate-700/20 rounded-full blur-3xl" />
        
        {/* Top spotlight glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[100px] sm:h-[200px]"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.08) 0%, transparent 70%)'
          }}
        />
      </div>
      
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Navigation Arrows - Larger tap targets */}
      <button
        onClick={() => { goToPrev(); handleManualNavigation((currentIndex - 1 + leaders.length) % leaders.length); }}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-2 rounded-full transition-all duration-300 hover:bg-white/10 active:bg-white/20 min-w-[48px] min-h-[48px] flex items-center justify-center"
        style={{ color: 'rgba(255,255,255,0.6)' }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="sm:w-7 sm:h-7" strokeWidth={1.5} />
      </button>
      
      <button
        onClick={() => { goToNext(); handleManualNavigation((currentIndex + 1) % leaders.length); }}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-2 rounded-full transition-all duration-300 hover:bg-white/10 active:bg-white/20 min-w-[48px] min-h-[48px] flex items-center justify-center"
        style={{ color: 'rgba(255,255,255,0.6)' }}
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="sm:w-7 sm:h-7" strokeWidth={1.5} />
      </button>

      {/* Content container - Mobile: stacked layout with swipe, Desktop: grid */}
      <div className="container relative z-10 h-full px-4 sm:px-6">
        {/* Mobile Layout - Enhanced with swipe gestures */}
        <motion.div 
          className="flex sm:hidden flex-col items-center justify-center h-full text-center pt-6 touch-pan-y select-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          style={{ touchAction: "pan-y" }}
        >
          {/* Signature Deals label */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Signature Deals
            </span>
            <div className="h-px w-6" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </div>
          
          <h3 className="text-xl font-light tracking-wide uppercase mb-4" style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em' }}>
            Invest with
          </h3>
          
          {/* Portrait - Larger for mobile */}
          <div className="relative h-[180px] mb-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={`portrait-mobile-${currentIndex}`}
                src={current.image}
                alt={current.name}
                initial={{ opacity: 0, x: swipeDirection === 'left' ? 60 : swipeDirection === 'right' ? -60 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: swipeDirection === 'left' ? -60 : swipeDirection === 'right' ? 60 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-auto object-contain"
                style={{ filter: 'grayscale(100%) contrast(1.15) brightness(1.1)', mixBlendMode: 'luminosity' }}
              />
            </AnimatePresence>
          </div>
          
          {/* Name - Larger for mobile */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={`name-mobile-${currentIndex}`}
              initial={{ opacity: 0, x: swipeDirection === 'left' ? 30 : swipeDirection === 'right' ? -30 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: swipeDirection === 'left' ? -30 : swipeDirection === 'right' ? 30 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl font-bold tracking-tight leading-none uppercase mb-2"
              style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {current.name}
            </motion.h2>
          </AnimatePresence>
          
          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`title-mobile-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-sm font-serif mb-5 px-4"
              style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}
            >
              {current.title}
            </motion.p>
          </AnimatePresence>
          
          {/* CTA - Larger tap target */}
          <a href="#request-access">
            <Button
              size="default"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-slate-900 active:bg-white/90 rounded-full px-6 h-11 text-sm font-medium tracking-wide transition-all duration-300 group"
            >
              Register your interest
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </a>
          
          {/* Progress dots - Larger tap targets */}
          <div className="flex items-center gap-4 mt-6">
            {leaders.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleManualNavigation(idx)}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`View ${leaders[idx].name}`}
              >
                <motion.div
                  className="rounded-full transition-all duration-300"
                  animate={{
                    width: idx === currentIndex ? 24 : 10,
                    height: 10,
                    backgroundColor: idx === currentIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                  }}
                  style={{
                    boxShadow: idx === currentIndex ? '0 0 12px rgba(255,255,255,0.5)' : 'none'
                  }}
                />
              </button>
            ))}
          </div>
          
          {/* Swipe hint */}
          <div className="flex items-center gap-1.5 mt-4 text-white/30 text-[10px]">
            <motion.span
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ←
            </motion.span>
            <span>Swipe</span>
            <motion.span
              animate={{ x: [2, -2, 2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
        
        {/* Desktop Layout - Original grid */}
        <div className="hidden sm:grid grid-cols-3 items-center h-full gap-4" style={{ transform: 'translateZ(0)' }}>
          {/* LEFT - INVEST WITH */}
          <div className="flex flex-col justify-center items-start pl-8 md:pl-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-7" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <span className="text-[10px] tracking-[0.25em] uppercase font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Signature Deals
              </span>
            </div>
            
            <h3
              className="text-2xl md:text-4xl font-light tracking-wide uppercase"
              style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.15em' }}
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

          {/* MIDDLE - Leader portrait */}
          <div className="relative h-full flex items-end justify-center">
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px]"
              style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,250,240,0.06) 0%, transparent 60%)' }}
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`portrait-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative h-[85%] flex items-end"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-full w-auto object-contain object-bottom max-w-[220px] md:max-w-[320px]"
                  style={{ filter: 'grayscale(100%) contrast(1.15) brightness(1.1)', mixBlendMode: 'luminosity' }}
                />
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT - Name and position */}
          <div className="flex flex-col justify-center items-end text-right pr-4 md:pr-6">
            <div className="flex items-center justify-end mb-3">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`name-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none uppercase whitespace-nowrap"
                  style={{ 
                    background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 700,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {current.name}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="h-[24px] flex items-center justify-end overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
                  className="text-xs sm:text-sm md:text-base font-serif whitespace-nowrap"
                  style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', fontWeight: 300 }}
                >
                  {current.title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <a href="#request-access">
                <Button
                  size="sm"
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-slate-900 rounded-full px-5 h-9 text-xs font-medium tracking-wide transition-all duration-300 group"
                >
                  Register your interest
                  <ArrowRight className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)' }}
      />
    </section>
  );
};
