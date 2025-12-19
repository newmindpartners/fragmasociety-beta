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
    industryImage: filmIndustry,
  },
];

export const SignatureDealsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % leaders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-foreground overflow-hidden">
      {/* Clean white background with subtle grain */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 items-end min-h-[300px] md:min-h-[350px] gap-0 lg:gap-8">
          {/* Left side - Leader Image */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1 self-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative"
              >
                <motion.img
                  src={leaders[currentIndex].image}
                  alt={leaders[currentIndex].name}
                  className="h-[220px] md:h-[280px] lg:h-[320px] w-auto object-contain object-bottom grayscale"
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side - Text content and Industry Image */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 lg:order-2 py-8 lg:py-0 lg:pb-12">
            {/* Signature Deals label */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-background/50 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-sans"
            >
              Signature Deals
            </motion.span>

            {/* "Invest with :" static text */}
            <span className="text-background/60 text-xl md:text-2xl lg:text-3xl font-serif mb-2">
              Invest with :
            </span>

            {/* Dynamic name */}
            <div className="relative h-[50px] md:h-[70px] lg:h-[80px] w-full overflow-hidden mb-2">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`name-${currentIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0 flex items-center justify-center lg:justify-start text-2xl md:text-4xl lg:text-5xl font-serif text-background tracking-tight"
                >
                  {leaders[currentIndex].name}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Dynamic title */}
            <div className="relative h-[28px] md:h-[36px] w-full overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0 flex items-center justify-center lg:justify-start text-base md:text-xl lg:text-2xl font-serif text-background/70 tracking-wide"
                >
                  {leaders[currentIndex].title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Industry Image */}
            <div className="relative w-full max-w-[300px] h-[120px] md:h-[150px] overflow-hidden rounded-lg mb-6">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`industry-${currentIndex}`}
                  src={leaders[currentIndex].industryImage}
                  alt={`${leaders[currentIndex].title} industry`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-3">
              {leaders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="relative h-1 rounded-full overflow-hidden bg-background/20 transition-all duration-300"
                  style={{ width: idx === currentIndex ? '40px' : '12px' }}
                >
                  {idx === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-background/60 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-background/10" />
    </section>
  );
};
