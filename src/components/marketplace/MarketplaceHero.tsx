import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

// Category images
import malibuImage from "@/assets/malibu-sea-view.jpg";

const dynamicWords = ["Real Estate", "Private Credit", "Film Rights", "Luxury Assets"];

export const MarketplaceHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={malibuImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ 
            filter: 'grayscale(30%) brightness(0.5) contrast(1.1)',
          }}
        />
        {/* Gradient overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.7) 50%, rgba(15,23,42,0.9) 100%)'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.6) 40%, transparent 80%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm text-white/80 border border-white/20 rounded-sm">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-white"
              />
              Secondary Market — Live
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xs tracking-[0.25em] uppercase text-white/40 font-light mb-6"
          >
            Non-Custodial · 24/7 · On-Chain
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trade tokenized
          </motion.h1>
          
          {/* Animated word */}
          <div className="h-[60px] md:h-[80px] lg:h-[90px] overflow-hidden relative mb-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block text-5xl md:text-6xl lg:text-7xl font-light text-white/70 italic leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {dynamicWords[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mb-10"
          >
            {dynamicWords.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === currentIndex 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-white/50 max-w-xl mb-10 leading-relaxed"
          >
            The world's first peer-to-peer marketplace for tokenized real-world assets.
            Set your price. Trade on your terms.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button 
              size="lg"
              className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
            >
              Explore Marketplace
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-slate-900 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
            >
              <Play className="w-4 h-4 mr-2" fill="currentColor" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-xs text-white/30"
          >
            Powered by Cardano · Non-custodial · Your keys, your assets
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
};
