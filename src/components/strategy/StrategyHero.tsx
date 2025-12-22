import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Shield, Zap, Layers, Play } from "lucide-react";
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
      {/* Background Image - Full coverage */}
      <div className="absolute inset-0">
        <img 
          src={strategyHeroBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay - matching homepage style */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-end pb-24 pt-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block text-xs tracking-[0.4em] uppercase text-white/60 px-4 py-2 border border-white/20 rounded-full backdrop-blur-sm">
              Fragma One
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 font-light mb-6"
          >
            One Allocation · Complete Exposure · Professionally Managed
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight mb-4"
          >
            Access the best of
          </motion.h1>
          
          {/* Animated phrase */}
          <div className="h-[60px] md:h-[80px] lg:h-[90px] overflow-hidden relative mb-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight"
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
            className="flex items-center gap-2 mb-12 pb-12 border-b border-white/10"
          >
            {dynamicPhrases.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === currentIndex 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed"
          >
            Skip the complexity. Access Fragma's curated portfolio of signature deals 
            and real-world assets through a single, professionally managed vehicle.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            {isAuthenticated ? (
              <>
                <Button 
                  size="lg"
                  className="bg-white text-neutral-900 hover:bg-white/90 rounded-full px-8 h-14 text-base font-medium"
                >
                  Request Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-14 text-base font-medium bg-transparent"
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
                  className="bg-white text-neutral-900 hover:bg-white/90 rounded-full px-8 h-14 text-base font-medium"
                >
                  <Link to="/auth">
                    Register your interest
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-14 text-base font-medium bg-transparent"
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
            transition={{ delay: 0.6 }}
            className="text-sm text-white/50"
          >
            Luxembourg-regulated · Bank custody · Professional governance
          </motion.p>
        </div>
      </div>

      {/* Value props bar - matching homepage style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 border-t border-white/10 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { icon: Shield, label: "VETTED", desc: "Rigorous due diligence" },
              { icon: Layers, label: "DIVERSIFIED", desc: "Multi-asset exposure" },
              { icon: Zap, label: "SIMPLE", desc: "One allocation" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="py-6 px-4 md:px-8 text-center group cursor-pointer hover:bg-white/5 transition-colors"
              >
                <item.icon className="w-5 h-5 mx-auto mb-2 text-white/40 group-hover:text-white/60 transition-colors" />
                <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-1 group-hover:text-white/70 transition-colors">
                  {item.label}
                </p>
                <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
