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
    <section className="relative h-[200px] md:h-[220px] bg-foreground overflow-hidden">
      {/* Background industry image with gradient overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={leaders[currentIndex].industryImage}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Multi-layer gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/95 to-foreground/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/40" />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="container relative z-10 h-full">
        <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_280px] items-end h-full gap-4 lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center py-6 lg:py-8">
            {/* Signature Deals label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-background/40 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-3 font-sans"
            >
              Signature Deals
            </motion.span>

            {/* "Invest with" and dynamic content */}
            <div className="flex flex-col gap-0">
              <span className="text-background/50 text-sm md:text-base font-serif italic">
                Invest with
              </span>

              {/* Dynamic name */}
              <div className="relative h-[32px] md:h-[42px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={`name-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-xl md:text-3xl font-serif text-background tracking-tight"
                  >
                    {leaders[currentIndex].name}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Dynamic title */}
              <div className="relative h-[20px] md:h-[24px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`title-${currentIndex}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-xs md:text-sm font-serif text-background/60 tracking-wide"
                  >
                    {leaders[currentIndex].title}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-2 mt-4">
              {leaders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="relative h-[2px] rounded-full overflow-hidden bg-background/15 transition-all duration-500"
                  style={{ width: idx === currentIndex ? '32px' : '8px' }}
                >
                  {idx === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-background/50 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Leader Image */}
          <div className="relative self-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.img
                  src={leaders[currentIndex].image}
                  alt={leaders[currentIndex].name}
                  className="h-[160px] md:h-[200px] w-auto object-contain object-bottom drop-shadow-2xl"
                  style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                  initial={{ scale: 1.03 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                {/* Subtle gradient fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-foreground/50 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
