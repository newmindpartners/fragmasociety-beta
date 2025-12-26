import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Dynamic words that cycle through
const dynamicWords = ["Real Estate", "Film & Entertainment", "Luxury Assets", "Music Rights", "Sports", "Infrastructure Technology", "Hospitality"];

export const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Loading skeleton */}
        <AnimatePresence>
          {!videoLoaded && (
            <motion.div 
              initial={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-neutral-900 z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 animate-pulse" />
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          onLoadedData={() => setVideoLoaded(true)} 
          className={`w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/videos/hero-bg.mp4?v=3" type="video/mp4" />
        </video>
        
        {/* Elegant gradient overlay - matching deal details */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      {/* Content - Bottom aligned like luxury brands */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24 pt-24 sm:pt-32">
          <div className="max-w-5xl">
            {/* Badge - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/60 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 rounded-full backdrop-blur-sm">
                Coming Soon
              </span>
            </motion.div>

            {/* Main headline - Large Editorial */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white/80 leading-[1.1] tracking-tight mb-2"
            >
              Be part of the story.
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.95] tracking-tight mb-4 sm:mb-6"
            >
              Own the extraordinary.
            </motion.h2>
            
            {/* Animated dynamic word - Editorial style */}
            <div className="h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] overflow-hidden relative mb-4 sm:mb-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/60 leading-[1.2] tracking-tight"
                >
                  {dynamicWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Progress indicator - Minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-white/10"
            >
              {dynamicWords.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    index === currentWordIndex 
                      ? "w-6 sm:w-8 bg-white" 
                      : "w-1.5 sm:w-2 bg-white/20"
                  }`}
                />
              ))}
            </motion.div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mb-8 sm:mb-10 font-light"
            >
              Join a community of discerning investors with exclusive access to curated extraordinary assets.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-neutral-900 hover:bg-white/90 rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-medium"
              >
                Register your interest
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* OWN - EARN - EXIT - Horizontal bar at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="border-t border-slate-700/50 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-3 divide-x divide-slate-700/50">
              {[
                { label: "OWN", desc: "Fractional stakes from €50" },
                { label: "EARN", desc: "Automated yield distributions" },
                { label: "EXIT", desc: "Trade on secondary market" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="py-4 sm:py-6 px-2 sm:px-4 md:px-8 text-center group cursor-pointer hover:bg-slate-800/50 transition-colors"
                >
                  <p className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-violet-400/70 mb-0.5 sm:mb-1 group-hover:text-violet-300 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-slate-300 group-hover:text-white transition-colors line-clamp-2 sm:line-clamp-none">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
};
