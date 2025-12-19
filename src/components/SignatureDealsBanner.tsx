import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import bryanImage from "@/assets/bryan-banner.png";
import philippeImage from "@/assets/philippe-banner.png";
import timImage from "@/assets/tim-banner.png";
import sportsIndustry from "@/assets/category-sports.jpg";
import realEstateIndustry from "@/assets/malibu-sea-view.jpg";
import filmIndustry from "@/assets/category-film.jpg";

const leaders = [
  {
    name: "Bryan Balsiger",
    title: "European Champion Jumping",
    image: bryanImage,
    industryImage: sportsIndustry,
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
    industryImage: filmIndustry,
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
      className="relative h-[240px] md:h-[280px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: '#f5f3f0' }}
    >
      {/* Background - Industry image with Ken Burns effect */}
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
              transition={{ duration: 8, ease: "linear" }}
              style={{ opacity: 0.15 }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Clean gradient overlay - ensures text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(245,243,240,0.97) 0%, rgba(245,243,240,0.85) 50%, rgba(245,243,240,0.6) 100%)'
          }}
        />
      </div>

      {/* Content container */}
      <div className="container relative z-10 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Left - Text content */}
          <div className="flex flex-col justify-center max-w-lg py-10">
            
            {/* Label with animated line */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="h-px bg-stone-400"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-stone-500 text-[11px] tracking-[0.25em] uppercase font-medium">
                Signature Deals
              </span>
            </div>

            {/* Name - staggered character animation */}
            <div className="relative overflow-hidden mb-2">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`name-${currentIndex}`}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-3xl md:text-[42px] font-serif text-stone-800 tracking-tight leading-none"
                >
                  {current.name}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Title - follows with delay */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${currentIndex}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-base md:text-lg font-serif italic text-stone-500"
                >
                  {current.title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Elegant progress dots */}
            <div className="flex items-center gap-3 mt-8">
              {leaders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="group relative"
                  aria-label={`View ${leaders[idx].name}`}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-stone-400 transition-colors"
                    animate={{
                      scale: idx === currentIndex ? 1 : 1,
                      backgroundColor: idx === currentIndex ? '#78716c' : '#d6d3d1'
                    }}
                  />
                  {idx === currentIndex && (
                    <motion.div
                      className="absolute -inset-1 rounded-full border border-stone-400"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Progress ring for active */}
                  {idx === currentIndex && !isHovered && (
                    <svg className="absolute -inset-1.5 w-5 h-5 -rotate-90">
                      <motion.circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="#78716c"
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

          {/* Right - Leader portrait */}
          <div className="relative h-full flex items-end justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`portrait-${currentIndex}`}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.95 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative h-full"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-full w-auto object-contain object-bottom max-w-[280px] md:max-w-[360px]"
                  style={{ 
                    filter: 'grayscale(100%) contrast(1.1)',
                    mixBlendMode: 'multiply'
                  }}
                />
                {/* Subtle shadow under portrait */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-xl"
                  style={{ background: 'rgba(0,0,0,0.1)' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
    </section>
  );
};
