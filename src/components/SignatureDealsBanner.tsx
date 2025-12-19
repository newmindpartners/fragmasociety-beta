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
    <section className="relative h-[220px] md:h-[260px] overflow-hidden">
      {/* Background industry image with soft blue overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={leaders[currentIndex].industryImage}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Soft blue-grey gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#d8e3eb]/95 via-[#dfe8ef]/90 to-[#e5ecf2]/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#cddbe6]/30 via-transparent to-[#d0dce5]/40" />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="container relative z-10 h-full">
        <div className="grid grid-cols-[1fr_auto] items-center h-full">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center py-8">
            {/* Signature Deals label with lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-[1px] bg-foreground/30" />
              <span className="text-foreground/50 text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans">
                Signature Deals
              </span>
            </motion.div>

            {/* Dynamic name - large serif */}
            <div className="relative h-[44px] md:h-[56px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`name-${currentIndex}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-3xl md:text-[44px] font-serif text-[#1a2e3d] tracking-tight leading-tight"
                >
                  {leaders[currentIndex].name}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Dynamic title - italic serif */}
            <div className="relative h-[28px] md:h-[32px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-lg md:text-2xl font-serif italic text-[#5a7a8f] tracking-wide"
                >
                  {leaders[currentIndex].title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-2 mt-8">
              {leaders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="relative h-[2px] rounded-full overflow-hidden bg-[#1a2e3d]/15 transition-all duration-500"
                  style={{ width: idx === currentIndex ? '36px' : '8px' }}
                >
                  {idx === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-[#1a2e3d]/50 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Leader Image - 100% height */}
          <div className="relative h-full flex items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full flex items-end"
              >
                <img
                  src={leaders[currentIndex].image}
                  alt={leaders[currentIndex].name}
                  className="h-full w-auto object-contain object-bottom"
                  style={{ filter: 'grayscale(100%) contrast(1.05)' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
