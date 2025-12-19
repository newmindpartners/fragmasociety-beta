import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import bryanImage from "@/assets/bryan-banner.png";
import philippeImage from "@/assets/philippe-banner.png";
import timImage from "@/assets/tim-banner.png";
import andreImage from "@/assets/andre-messika.png";

const leaders = [
  {
    name: "Bryan Balsiger",
    title: "European Champion Jumping",
    image: bryanImage,
  },
  {
    name: "Philippe Naouri",
    title: "Private Credit Pioneer",
    image: philippeImage,
  },
  {
    name: "André Messika",
    title: "Luxury Jewelry Empire",
    image: andreImage,
  },
  {
    name: "Tim Levy",
    title: "Real Estate Developer",
    image: timImage,
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
        <div className="grid lg:grid-cols-2 items-center min-h-[300px] md:min-h-[350px] gap-8 lg:gap-0">
          {/* Left side - Image */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
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
                  className="h-[220px] md:h-[280px] lg:h-[320px] w-auto object-contain grayscale"
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side - Text content */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 lg:order-2 py-8 lg:py-0">
            {/* Signature Deals label */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-background/50 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-sans"
            >
              Signature Deals
            </motion.span>

            {/* Dynamic name */}
            <div className="relative h-[60px] md:h-[80px] lg:h-[90px] w-full overflow-hidden mb-2">
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
                  className="absolute inset-0 flex items-center justify-center lg:justify-start text-3xl md:text-5xl lg:text-6xl font-serif text-background tracking-tight"
                >
                  {leaders[currentIndex].name}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Dynamic title */}
            <div className="relative h-[32px] md:h-[40px] w-full overflow-hidden">
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
                  className="absolute inset-0 flex items-center justify-center lg:justify-start text-lg md:text-2xl lg:text-3xl font-serif text-background/70 tracking-wide"
                >
                  {leaders[currentIndex].title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-3 mt-8">
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
