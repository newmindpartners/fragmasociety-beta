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
      className="relative h-[220px] md:h-[260px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: '#f8f7f5' }}
    >
      {/* Background - Industry image with elegant transparency */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.img
              src={current.industryImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              style={{ 
                opacity: 0.18,
                filter: 'grayscale(30%)'
              }}
            />
            {/* Gradient overlay for elegance */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(248,247,245,0.95) 0%, rgba(248,247,245,0.7) 35%, rgba(248,247,245,0.5) 50%, rgba(248,247,245,0.7) 65%, rgba(248,247,245,0.95) 100%)'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content container - 3 columns */}
      <div className="container relative z-10 h-full">
        <div className="grid grid-cols-3 items-center h-full">
          
          {/* LEFT - INVEST WITH */}
          <div className="flex flex-col justify-center items-start">
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className="h-px bg-stone-400"
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-stone-500 text-[10px] tracking-[0.2em] uppercase font-medium">
                Signature Deals
              </span>
            </div>
            
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-serif text-stone-800 tracking-tight"
            >
              Invest with
            </motion.h3>

            {/* Progress dots */}
            <div className="flex items-center gap-2.5 mt-6">
              {leaders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="group relative"
                  aria-label={`View ${leaders[idx].name}`}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    animate={{
                      backgroundColor: idx === currentIndex ? '#3b82f6' : '#d1d5db'
                    }}
                  />
                  {idx === currentIndex && (
                    <motion.div
                      className="absolute -inset-1 rounded-full border border-blue-400"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {idx === currentIndex && !isHovered && (
                    <svg className="absolute -inset-1.5 w-4 h-4 -rotate-90">
                      <motion.circle
                        cx="8"
                        cy="8"
                        r="6"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="1"
                        strokeDasharray="37.7"
                        initial={{ strokeDashoffset: 37.7 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* MIDDLE - Leader portrait */}
          <div className="relative h-full flex items-end justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`portrait-${currentIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ 
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative h-full"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-full w-auto object-contain object-bottom"
                  style={{ 
                    filter: 'grayscale(100%) contrast(1.1)',
                    mixBlendMode: 'multiply',
                    maxHeight: '100%'
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT - Name and position */}
          <div className="flex flex-col justify-center items-end text-right">
            <div className="relative overflow-hidden mb-1">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`name-${currentIndex}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-2xl md:text-[38px] font-serif text-stone-800 tracking-tight leading-none"
                >
                  {current.name}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${currentIndex}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-sm md:text-base font-serif italic text-stone-500"
                >
                  {current.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
    </section>
  );
};
