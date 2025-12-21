import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Euro, Percent, Diamond } from "lucide-react";
import { useState, useEffect } from "react";

const dynamicWords = ["Real Estate", "Private Credit", "Film Rights", "Luxury Assets"];

const stats = [
  { icon: Sparkles, label: "LIVE DEALS", value: "12", desc: "Active opportunities" },
  { icon: Euro, label: "MIN ENTRY", value: "€250", desc: "Accessible investing" },
  { icon: Percent, label: "TARGET RETURNS", value: "8-18%", desc: "Annual yield target" },
  { icon: Diamond, label: "ASSET CLASSES", value: "4", desc: "Diversified sectors" },
];

export const MarketplaceHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0f172a] overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center pt-24 pb-12">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1e293b] border border-[#334155] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-xs tracking-[0.25em] uppercase text-violet-400 font-medium">
                Live Opportunities
              </span>
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.95] tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Secondary
          </motion.h1>
          
          {/* Animated word */}
          <div className="h-[60px] md:h-[80px] lg:h-[100px] overflow-hidden relative mb-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-violet-300 italic leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Market
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
          >
            The world's first peer-to-peer marketplace for tokenized real-world assets. 
            Set your price. Trade on your terms.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <Button 
              size="lg"
              className="bg-white text-[#0f172a] hover:bg-white/90 rounded-full px-8 h-14 text-sm font-medium tracking-wide"
            >
              Explore Marketplace
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#334155] text-white hover:bg-white hover:text-[#0f172a] rounded-full px-8 h-14 text-sm font-medium tracking-wide bg-transparent"
            >
              <Play className="w-4 h-4 mr-2" fill="currentColor" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl p-6 hover:border-[#475569] transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-slate-400 font-medium">
                    {stat.label}
                  </span>
                  <div className="w-10 h-10 bg-[#0f172a] border border-[#334155] rounded-lg flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
