import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import strategyHeroBg from "@/assets/strategy-hero-bg.jpg";

const dynamicPhrases = [
  "Real Estate",
  "Private Credit", 
  "Digital Infrastructure",
  "Signature Deals"
];

interface StrategyHeroProps {
  isAuthenticated?: boolean;
}

export const StrategyHero = ({ isAuthenticated = false }: StrategyHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Deep slate/navy base */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={strategyHeroBg} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ 
            opacity: 0.3,
            filter: 'grayscale(30%) brightness(0.85)',
          }}
        />
        {/* Gradient overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 90% at 50% 100%, transparent 0%, rgba(15,23,42,0.3) 50%, rgba(15,23,42,0.7) 100%),
              radial-gradient(ellipse 100% 60% at 50% 50%, transparent 0%, rgba(15,23,42,0.4) 100%)
            `
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.6) 40%, transparent 80%)'
          }}
        />
      </div>

      {/* Violet glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-violet-900/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-slate-700/20 rounded-full blur-3xl" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.08) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center pt-24">
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm text-white/80 border border-white/20 rounded-sm">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              </motion.div>
              Exclusive Investment Vehicle
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xs tracking-[0.25em] uppercase text-white/40 font-light mb-6"
          >
            Luxembourg Structure · Tokenized · Professional Grade
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-3"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Fragma One
          </motion.h1>
          
          {/* Animated word */}
          <div className="h-[50px] md:h-[60px] lg:h-[70px] overflow-hidden relative mb-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -70, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block text-3xl md:text-4xl lg:text-5xl font-light text-white/50 italic leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {dynamicPhrases[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mb-8"
          >
            {dynamicPhrases.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === currentIndex 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                style={{
                  boxShadow: i === currentIndex ? '0 0 10px rgba(255,255,255,0.4)' : 'none'
                }}
              />
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-white/50 max-w-xl mb-8 leading-relaxed"
          >
            One fund. Broad exposure to real-world yield & digital infrastructure. 
            Powered by the Fragma ecosystem.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            {isAuthenticated ? (
              <>
                <Button 
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
                >
                  Request PPM
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-sm px-8 h-12 text-sm font-medium tracking-wide bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book Call
                </Button>
              </>
            ) : (
              <>
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
                >
                  <Link to="/auth">
                    Register to View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-sm px-8 h-12 text-sm font-medium tracking-wide bg-transparent"
                >
                  <Play className="w-4 h-4 mr-2" fill="currentColor" />
                  Watch Overview
                </Button>
              </>
            )}
          </motion.div>

          {/* Trust indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-xs text-white/30"
          >
            For qualified investors only. Capital at risk. Past performance is not indicative of future results.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
