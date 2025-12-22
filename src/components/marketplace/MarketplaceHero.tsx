import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

// Category images
import malibuImage from "@/assets/malibu-sea-view.jpg";
import categoryRealEstate from "@/assets/category-realestate.jpg";
import categoryFilm from "@/assets/category-film.jpg";
import categoryLuxury from "@/assets/category-luxury.jpg";
import categoryCredit from "@/assets/category-credit.jpg";
import rwaVilla from "@/assets/rwa-villa.jpg";
import rwaCommercial from "@/assets/rwa-commercial.jpg";

const dynamicWords = ["Real Estate", "Private Credit", "Film Rights", "Luxury Assets"];

// Asset cards data for the animated grid - expanded for full height
const assetCards = [
  { image: categoryRealEstate, type: "buy" as const, price: "€892", delay: 0 },
  { image: categoryFilm, type: "sell" as const, price: "€156", delay: 0.1 },
  { image: rwaVilla, type: "sell" as const, price: "€678", delay: 0.2 },
  { image: rwaCommercial, type: "sell" as const, price: "€1025", delay: 0.15 },
  { image: categoryLuxury, type: "buy" as const, price: "€445", delay: 0.25 },
  { image: categoryCredit, type: "buy" as const, price: "€312", delay: 0.3 },
  { image: malibuImage, type: "buy" as const, price: "€1,250", delay: 0.35 },
  { image: categoryRealEstate, type: "sell" as const, price: "€567", delay: 0.4 },
];

const AssetCard = ({ 
  image, 
  type, 
  price, 
  delay,
  index 
}: { 
  image: string; 
  type: "buy" | "sell"; 
  price: string; 
  delay: number;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: 0.3 + delay, 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group w-full h-full"
    >
      <img 
        src={image} 
        alt="Asset" 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      
      {/* Price tag */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 + delay, duration: 0.4 }}
        className={`absolute ${
          type === "buy" ? "top-4 right-4" : "bottom-4 left-4"
        }`}
      >
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          className={`px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-lg ${
            type === "buy" 
              ? "bg-emerald-500/90 text-white" 
              : "bg-violet-500/90 text-white"
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            {type}
          </span>
          <span className="text-sm font-bold">{price}</span>
        </motion.div>
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 ring-2 ring-white/30 rounded-2xl pointer-events-none"
      />
    </motion.div>
  );
};

export const MarketplaceHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Deep slate/navy base - matching SignatureDealsBanner */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={malibuImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ 
            opacity: 0.35,
            filter: 'grayscale(30%) brightness(0.85)',
          }}
        />
        {/* Gradient overlays matching SignatureDealsBanner */}
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

      {/* Violet glow accents - matching SignatureDealsBanner */}
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
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm text-white/80 border border-white/20 rounded-sm">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-violet-400"
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
                  className="block text-5xl md:text-6xl lg:text-7xl font-light text-white/50 italic leading-[0.95] tracking-tight"
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
                className="border-white/20 text-white hover:bg-white/10 rounded-sm px-8 h-12 text-sm font-medium tracking-wide bg-transparent"
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

          {/* Right Content - Animated Asset Cards Grid - Full Height */}
          <div className="hidden lg:block relative h-[calc(100vh-10rem)]">
            <div className="grid grid-cols-3 gap-3 h-full max-w-2xl ml-auto">
              {/* Column 1 - 2 tall cards */}
              <div className="flex flex-col gap-3 h-full">
                <motion.div 
                  className="flex-1 min-h-0"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <AssetCard 
                    image={assetCards[5].image} 
                    type={assetCards[5].type} 
                    price={assetCards[5].price} 
                    delay={assetCards[5].delay}
                    index={0}
                  />
                </motion.div>
                <motion.div 
                  className="flex-[0.6] min-h-0"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <AssetCard 
                    image={assetCards[2].image} 
                    type={assetCards[2].type} 
                    price={assetCards[2].price} 
                    delay={assetCards[2].delay}
                    index={5}
                  />
                </motion.div>
              </div>
              
              {/* Column 2 - 3 medium cards */}
              <div className="flex flex-col gap-3 h-full">
                <motion.div 
                  className="flex-[0.7] min-h-0"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.8 }}
                >
                  <AssetCard 
                    image={assetCards[1].image} 
                    type={assetCards[1].type} 
                    price={assetCards[1].price} 
                    delay={assetCards[1].delay}
                    index={1}
                  />
                </motion.div>
                <motion.div 
                  className="flex-1 min-h-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.8 }}
                >
                  <AssetCard 
                    image={assetCards[3].image} 
                    type={assetCards[3].type} 
                    price={assetCards[3].price} 
                    delay={assetCards[3].delay}
                    index={3}
                  />
                </motion.div>
                <motion.div 
                  className="flex-[0.5] min-h-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.8 }}
                >
                  <AssetCard 
                    image={assetCards[7].image} 
                    type={assetCards[7].type} 
                    price={assetCards[7].price} 
                    delay={assetCards[7].delay}
                    index={7}
                  />
                </motion.div>
              </div>

              {/* Column 3 - 3 varied cards */}
              <div className="flex flex-col gap-3 h-full">
                <motion.div 
                  className="flex-[0.5] min-h-0"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <AssetCard 
                    image={assetCards[0].image} 
                    type={assetCards[0].type} 
                    price={assetCards[0].price} 
                    delay={assetCards[0].delay}
                    index={2}
                  />
                </motion.div>
                <motion.div 
                  className="flex-1 min-h-0"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <AssetCard 
                    image={assetCards[4].image} 
                    type={assetCards[4].type} 
                    price={assetCards[4].price} 
                    delay={assetCards[4].delay}
                    index={4}
                  />
                </motion.div>
                <motion.div 
                  className="flex-[0.7] min-h-0"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <AssetCard 
                    image={assetCards[6].image} 
                    type={assetCards[6].type} 
                    price={assetCards[6].price} 
                    delay={assetCards[6].delay}
                    index={6}
                  />
                </motion.div>
              </div>
            </div>

            {/* Floating animation particles */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-violet-500/10 blur-2xl"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 left-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl"
              animate={{ 
                y: [0, 20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </div>
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

      {/* Bottom border accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};
