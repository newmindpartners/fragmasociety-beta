import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Play, TrendingUp, Shield, Clock } from "lucide-react";
import { useState, useEffect } from "react";

// Real asset images
import malibuImage from "@/assets/malibu-sea-view.jpg";
import villaImage from "@/assets/rwa-villa.jpg";
import commercialImage from "@/assets/rwa-commercial.jpg";
import luxuryImage from "@/assets/rwa-luxury.jpg";

// Dynamic words that cycle through - matching homepage style
const dynamicAssets = ["Real Estate", "Private Credit", "Film Rights", "Luxury Assets", "Infrastructure"];

export const MarketplaceHero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeAsset, setActiveAsset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % dynamicAssets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAsset(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredAssets = [
    { image: malibuImage, name: "Malibu Villa", price: "€2.4M", yield: "18.5%", status: "Trading" },
    { image: villaImage, name: "Pacific Palisades", price: "€3.8M", yield: "22.3%", status: "New" },
    { image: commercialImage, name: "Beverly Commercial", price: "€5.2M", yield: "15.8%", status: "Trading" },
    { image: luxuryImage, name: "Luxury Portfolio", price: "€1.9M", yield: "12.4%", status: "Closing Soon" },
  ];

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Background - Cinematic asset showcase */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAsset}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <img
              src={featuredAssets[activeAsset].image}
              alt=""
              className="w-full h-full object-cover"
              style={{
                filter: 'grayscale(30%) brightness(0.5) contrast(1.1)',
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient overlays - matching deal details page */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.7) 50%, rgba(15,23,42,0.9) 100%)'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.8) 30%, transparent 70%)'
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content - Bottom aligned like homepage */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end">
        <div className="container mx-auto px-6 lg:px-12 pb-8 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            
            {/* Left - Main Content */}
            <div className="max-w-2xl">
              {/* Badge - Minimal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-white/60 px-4 py-2 border border-white/20 rounded-full backdrop-blur-sm">
                  <motion.span 
                    className="w-1.5 h-1.5 rounded-full bg-white"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Secondary Market
                </span>
              </motion.div>

              {/* Tagline - Elegant */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-sm md:text-base tracking-[0.3em] uppercase text-white/50 font-light mb-6"
              >
                Non-Custodial · 24/7 · On-Chain
              </motion.p>

              {/* Main headline - Large Editorial */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Trade tokenized
              </motion.h1>
              
              {/* Animated dynamic word - Editorial style */}
              <div className="h-[65px] md:h-[80px] lg:h-[95px] overflow-hidden relative mb-10">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {dynamicAssets[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Progress indicator - Minimal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 mb-12 pb-8 border-b border-white/10"
              >
                {dynamicAssets.map((_, index) => (
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

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg"
              >
                The world's first peer-to-peer marketplace for tokenized real-world assets. 
                Set your price. Trade on your terms. Complete ownership, always.
              </motion.p>

              {/* CTA Buttons - Minimal, matching homepage style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8 h-14 text-base font-medium"
                >
                  Explore Marketplace
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white hover:text-slate-900 rounded-full px-8 h-14 text-base font-medium"
                >
                  <Play className="w-4 h-4 mr-2" fill="currentColor" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Trust line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm text-white/40 max-w-md"
              >
                Powered by Cardano blockchain. Fully non-custodial. Your keys, your assets.
              </motion.p>
            </div>

            {/* Right - Featured Asset Cards (Desktop only) */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                {/* Live trading indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs tracking-[0.2em] uppercase text-white/50">Live on Market</span>
                  </div>
                  <span className="text-xs text-white/30">4 Assets Trading</span>
                </div>

                {/* Asset cards */}
                {featuredAssets.map((asset, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    whileHover={{ x: -8, scale: 1.02 }}
                    className={`group relative flex items-center gap-5 p-4 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-500 ${
                      activeAsset === i 
                        ? 'bg-white/10 border-white/30' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                    onClick={() => setActiveAsset(i)}
                  >
                    {/* Asset image */}
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={asset.image} 
                        alt={asset.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    
                    {/* Asset info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium truncate">{asset.name}</h3>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                          asset.status === 'New' 
                            ? 'bg-white/20 text-white' 
                            : asset.status === 'Closing Soon'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {asset.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-white/60">{asset.price}</span>
                        <span className="text-sm text-emerald-400 font-medium">{asset.yield} Target</span>
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                      activeAsset === i ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                    }`} />
                    
                    {/* Active indicator line */}
                    {activeAsset === i && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-white rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats bar at bottom - matching homepage style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="border-t border-slate-700/50 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-3 divide-x divide-slate-700/50">
              {[
                { icon: TrendingUp, value: "€24M+", label: "Trading Volume" },
                { icon: Shield, value: "100%", label: "Non-Custodial" },
                { icon: Clock, value: "24/7", label: "Market Access" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="py-6 px-4 md:px-8 text-center group cursor-pointer hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <stat.icon className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
                    <p className="text-xl md:text-2xl font-medium text-white">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-xs tracking-[0.15em] uppercase text-slate-400 group-hover:text-slate-300 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
};
