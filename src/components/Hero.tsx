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
        <div className="container mx-auto px-6 lg:px-12 pb-24 pt-32">
          <div className="max-w-5xl">
            {/* Badge - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-block text-xs tracking-[0.4em] uppercase text-white/60 px-4 py-2 border border-white/20 rounded-full backdrop-blur-sm">
                Coming Soon
              </span>
            </motion.div>

            {/* Tagline - Elegant */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 font-light mb-6"
            >
              Fractional · Liquid · Compliant
            </motion.p>

            {/* Main headline - Large Editorial */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.95] tracking-tight mb-4"
            >
              Buy and sell
            </motion.h1>
            
            {/* Animated dynamic word - Editorial style */}
            <div className="h-[70px] md:h-[90px] lg:h-[100px] xl:h-[120px] overflow-hidden relative mb-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.95] tracking-tight"
                >
                  {dynamicWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Progress indicator - Minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 mb-12 pb-12 border-b border-white/10"
            >
              {dynamicWords.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    index === currentWordIndex 
                      ? "w-8 bg-white" 
                      : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </motion.div>

            {/* CTA Buttons - Minimal, matching deal details style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <Button 
                size="lg" 
                className="bg-white text-neutral-900 hover:bg-white/90 rounded-full px-8 h-14 text-base font-medium"
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

            {/* Disclaimer - Elegant */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm text-white/50 max-w-lg"
            >
              Limited spots available. Register now to secure your place in our exclusive early access program.
            </motion.p>
          </div>
        </div>

        {/* OWN - EARN - EXIT - Horizontal bar at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="border-t border-white/10 bg-black/30 backdrop-blur-sm"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-3 divide-x divide-white/10">
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
                  className="py-6 px-4 md:px-8 text-center group cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1 group-hover:text-white/60 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
};
