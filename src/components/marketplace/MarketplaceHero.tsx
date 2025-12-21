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

      {/* Content - Compact layout */}
      <div className="relative z-10 h-screen flex flex-col justify-end">
        <div className="container mx-auto px-6 lg:px-12 pb-6 pt-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            
            {/* Left - Main Content */}
            <div className="max-w-xl">
              {/* Badge - Minimal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-4"
              >
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/60 px-3 py-1.5 border border-white/20 rounded-full backdrop-blur-sm">
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
                className="text-xs tracking-[0.25em] uppercase text-white/50 font-light mb-4"
              >
                Non-Custodial · 24/7 · On-Chain
              </motion.p>

              {/* Main headline - Editorial */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[0.95] tracking-tight mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Trade tokenized
              </motion.h1>
              
              {/* Animated dynamic word - Editorial style */}
              <div className="h-[50px] md:h-[60px] lg:h-[70px] overflow-hidden relative mb-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[0.95] tracking-tight"
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
                className="flex items-center gap-1.5 mb-6"
              >
                {dynamicAssets.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-0.5 rounded-full transition-all duration-500 ${
                      index === currentWordIndex 
                        ? "w-6 bg-white" 
                        : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-sm text-white/50 leading-relaxed mb-6 max-w-md"
              >
                The world's first peer-to-peer marketplace for tokenized real-world assets. 
                Set your price. Trade on your terms.
              </motion.p>

              {/* CTA Buttons - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center gap-3 mb-4"
              >
                <Button 
                  className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-6 h-11 text-sm font-medium"
                >
                  Explore Marketplace
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white hover:text-slate-900 rounded-full px-6 h-11 text-sm font-medium"
                >
                  <Play className="w-3 h-3 mr-2" fill="currentColor" />
                  Demo
                </Button>
              </motion.div>
              {/* Trust line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xs text-white/40"
              >
                Powered by Cardano · Non-custodial · Your keys, your assets
              </motion.p>
            </div>

            {/* Right - Featured Asset Cards (Desktop only) */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-2"
              >
                {/* Live trading indicator */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[10px] tracking-[0.15em] uppercase text-white/50">Live on Market</span>
                  </div>
                  <span className="text-[10px] text-white/30">4 Assets</span>
                </div>

                {/* Asset cards - Compact */}
                {featuredAssets.map((asset, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                    whileHover={{ x: -4 }}
                    className={`group relative flex items-center gap-4 p-3 rounded-lg border backdrop-blur-md cursor-pointer transition-all duration-300 ${
                      activeAsset === i 
                        ? 'bg-white/10 border-white/30' 
                        : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                    }`}
                    onClick={() => setActiveAsset(i)}
                  >
                    {/* Asset image */}
                    <div className="relative w-14 h-11 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={asset.image} 
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Asset info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-white font-medium truncate">{asset.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50">{asset.price}</span>
                        <span className="text-xs text-emerald-400">{asset.yield}</span>
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      asset.status === 'New' 
                        ? 'bg-white/20 text-white' 
                        : asset.status === 'Closing Soon'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {asset.status}
                    </span>
                    
                    {/* Active indicator line */}
                    {activeAsset === i && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats bar at bottom - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-3 divide-x divide-slate-700/50">
              {[
                { icon: TrendingUp, value: "€24M+", label: "Volume" },
                { icon: Shield, value: "100%", label: "Non-Custodial" },
                { icon: Clock, value: "24/7", label: "Access" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="py-4 px-3 md:px-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-0.5">
                    <stat.icon className="w-3 h-3 text-white/40" />
                    <p className="text-lg md:text-xl font-medium text-white">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-slate-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - repositioned */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
};
