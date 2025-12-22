import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Shield, Zap, Layers, Sparkles, Play } from "lucide-react";
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
            opacity: 0.25,
            filter: 'grayscale(30%) brightness(0.85)',
          }}
        />
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

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm text-white/80 border border-white/20 rounded-sm">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              </motion.div>
              Fragma One
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
            }}
          >
            <span className="text-white">One allocation.</span>
            <br />
            <span 
              style={{
                background: 'linear-gradient(135deg, #c4b5d4 0%, #9a8cb0 50%, #c4b5d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Complete RWA exposure.
            </span>
          </motion.h1>
          
          {/* Animated phrase */}
          <div className="h-[40px] md:h-[50px] overflow-hidden relative mb-8 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block text-xl md:text-2xl lg:text-3xl font-light text-white/40 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {dynamicPhrases[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Skip the complexity. Access Fragma's curated portfolio of signature deals 
            and real-world assets through a single, professionally managed vehicle.
          </motion.p>

          {/* Value props */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { icon: Shield, label: "Vetted Opportunities" },
              { icon: Layers, label: "Diversified Exposure" },
              { icon: Zap, label: "One Simple Entry" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <item.icon className="w-4 h-4 text-violet-400" />
                {item.label}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center items-center gap-4"
          >
            {isAuthenticated ? (
              <>
                <Button 
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
                >
                  Request Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-sm px-8 h-12 text-sm font-medium tracking-wide bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Speak with Us
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
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-sm px-8 h-12 text-sm font-medium tracking-wide bg-transparent"
                >
                  <Play className="w-4 h-4 mr-2" fill="currentColor" />
                  See How It Works
                </Button>
              </>
            )}
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 text-xs text-white/30"
          >
            Luxembourg-regulated · Bank custody · Professional governance
          </motion.p>
        </div>
      </div>
    </section>
  );
};
