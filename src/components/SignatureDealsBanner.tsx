import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
    accentColor: "#8b9a7d",
  },
  {
    name: "Philippe Naouri",
    title: "Malibu Mid-Century Villa Designer",
    image: philippeImage,
    industryImage: realEstateIndustry,
    accentColor: "#7a9eb5",
  },
  {
    name: "Tim Levy",
    title: "Hollywood Blockbuster Film Financier",
    image: timImage,
    industryImage: timIndustry,
    accentColor: "#9a8b7d",
  },
];

export const SignatureDealsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % leaders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const current = leaders[currentIndex];

  return (
    <section 
      className="relative h-[320px] md:h-[380px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: '#1a1a1a' }}
    >
      {/* Background - Industry image */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.img
              src={current.industryImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: "linear" }}
              style={{ 
                opacity: 0.55,
                filter: 'grayscale(40%) brightness(0.8)'
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Studio Harcourt spotlight effect - dramatic vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 80% at 50% 100%, transparent 0%, rgba(15,15,15,0.3) 50%, rgba(15,15,15,0.85) 100%),
              radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(15,15,15,0.6) 100%)
            `
          }}
        />
        
        {/* Top spotlight glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(255,250,240,0.08) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Content container - 3 columns */}
      <div className="container relative z-10 h-full">
        <div className="grid grid-cols-3 items-center h-full gap-4">
          
          {/* LEFT - INVEST WITH */}
          <div className="flex flex-col justify-center items-start pl-4">
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                className="h-px"
                style={{ background: 'rgba(255,255,255,0.3)' }}
                initial={{ width: 0 }}
                animate={{ width: 28 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span 
                className="text-[10px] tracking-[0.25em] uppercase font-light"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Signature Deals
              </span>
            </div>
            
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-serif tracking-tight"
              style={{ 
                color: 'rgba(255,255,255,0.9)',
                fontStyle: 'italic',
                fontWeight: 300
              }}
            >
              Invest with
            </motion.h3>

            {/* Progress dots */}
            <div className="flex items-center gap-3 mt-8">
              {leaders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="group relative"
                  aria-label={`View ${leaders[idx].name}`}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: idx === currentIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
                      boxShadow: idx === currentIndex ? '0 0 10px rgba(255,255,255,0.4)' : 'none'
                    }}
                  />
                  {idx === currentIndex && !isHovered && (
                    <svg className="absolute -inset-1.5 w-5 h-5 -rotate-90">
                      <motion.circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1"
                        strokeDasharray="50.27"
                        initial={{ strokeDashoffset: 50.27 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* MIDDLE - Leader portrait with spotlight */}
          <div className="relative h-full flex items-end justify-center">
            {/* Spotlight on leader */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px]"
              style={{
                background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,250,240,0.06) 0%, transparent 60%)'
              }}
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`portrait-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative h-[85%] flex items-end"
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
                {/* Subtle glow under portrait */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT - Name and position - fixed height containers */}
          <div className="flex flex-col justify-center items-end text-right pr-4">
            <div className="h-[50px] md:h-[52px] flex items-center justify-end mb-2">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`name-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-[42px] font-serif tracking-tight leading-none"
                  style={{ 
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 400
                  }}
                >
                  {current.name}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="h-[24px] flex items-center justify-end">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm md:text-base font-serif"
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

      {/* Decorative bottom line - subtle golden accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,250,240,0.15) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};
