import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

// Asset images
import rwaVilla from "@/assets/rwa-villa.jpg";
import rwaFilm from "@/assets/rwa-film.jpg";
import rwaCommercial from "@/assets/rwa-commercial.jpg";
import rwaLuxury from "@/assets/rwa-luxury.jpg";
import propertyMalibu from "@/assets/property-malibu.jpg";
import propertyNimes from "@/assets/property-nimes-road.jpg";

interface AssetItem {
  id: string;
  image: string;
  name: string;
  price: number;
  type: "buy" | "sell";
  badgePosition: { top?: string; bottom?: string; left?: string; right?: string };
  floatDelay: number;
  floatDuration: number;
}

const assets: AssetItem[] = [
  { id: "1", image: propertyMalibu, name: "Malibu Estate", price: 524, type: "buy", badgePosition: { top: "12%", left: "8%" }, floatDelay: 0, floatDuration: 4 },
  { id: "2", image: rwaFilm, name: "Film Rights", price: 156, type: "sell", badgePosition: { bottom: "18%", right: "12%" }, floatDelay: 0.5, floatDuration: 4.5 },
  { id: "3", image: rwaVilla, name: "Tuscan Villa", price: 892, type: "buy", badgePosition: { top: "20%", right: "10%" }, floatDelay: 1, floatDuration: 5 },
  { id: "4", image: rwaCommercial, name: "Paris Office", price: 1025, type: "sell", badgePosition: { bottom: "25%", left: "15%" }, floatDelay: 0.3, floatDuration: 4.2 },
  { id: "5", image: rwaLuxury, name: "Luxury Asset", price: 445, type: "buy", badgePosition: { bottom: "15%", right: "8%" }, floatDelay: 0.8, floatDuration: 4.8 },
  { id: "6", image: propertyNimes, name: "Nimes Road", price: 678, type: "sell", badgePosition: { top: "15%", left: "12%" }, floatDelay: 0.2, floatDuration: 4.3 },
];

// Animated Badge Component
const TradeBadge = ({ 
  type, 
  price,
  position,
  delay 
}: { 
  type: "buy" | "sell"; 
  price: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), delay);
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 400);
    }, 3500 + delay);
    
    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [delay]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ type: "spring", damping: 12, stiffness: 200 }}
      className={`absolute z-10 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2 ${
        type === "buy" 
          ? "bg-emerald-500/90 text-white" 
          : "bg-violet-600/90 text-white"
      }`}
      style={position}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {type === "buy" ? "Buy" : "Sell"}
      </span>
      <span className="text-sm font-mono font-bold">
        €{price}
      </span>
    </motion.div>
  );
};

// Photo Card Component with floating animation
const PhotoCard = ({ 
  asset, 
  index, 
  isInView 
}: { 
  asset: AssetItem; 
  index: number;
  isInView: boolean;
}) => {
  const sizes = [
    "col-span-1 row-span-2",
    "col-span-1 row-span-1", 
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];

  // Different float patterns for variety
  const floatPatterns = [
    { y: [0, -8, 0], rotate: [0, 1, 0] },
    { y: [0, -6, 0], rotate: [0, -1, 0] },
    { y: [0, -10, 0], rotate: [0, 0.5, 0] },
    { y: [0, -7, 0], rotate: [0, -0.5, 0] },
    { y: [0, -5, 0], rotate: [0, 1.5, 0] },
    { y: [0, -9, 0], rotate: [0, -1.5, 0] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 40,
        scale: isInView ? 1 : 0.9
      }}
      transition={{ 
        duration: 0.7, 
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative ${sizes[index]}`}
    >
      <motion.div
        animate={isInView ? floatPatterns[index] : {}}
        transition={{
          duration: asset.floatDuration,
          delay: asset.floatDelay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full h-full rounded-2xl overflow-hidden group shadow-lg shadow-slate-200/50"
      >
        <img 
          src={asset.image} 
          alt={asset.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Animated Trade Badge */}
        <TradeBadge 
          type={asset.type} 
          price={asset.price}
          position={asset.badgePosition}
          delay={800 + index * 400}
        />
      </motion.div>
    </motion.div>
  );
};

export const Marketplace = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-[#f8f9fa]"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-violet-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-slate-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="text-[11px] tracking-[0.4em] uppercase text-slate-400 font-medium mb-6 block"
            >
              Secondary Market
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Trade tokenized
              <br />
              <span className="text-slate-500">real-world assets</span>
            </h2>
            
            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-md">
              Buy and sell your positions directly with other investors. 
              24/7 liquidity, instant settlement, transparent pricing.
            </p>
            
            <Button 
              size="lg" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base rounded-full shadow-xl shadow-slate-900/20"
              onClick={() => window.location.href = '/marketplace'}
            >
              Explore Marketplace
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
          
          {/* Right - Photo Grid */}
          <div className="grid grid-cols-3 gap-3 lg:gap-4 h-[500px] lg:h-[600px]">
            {assets.map((asset, index) => (
              <PhotoCard
                key={asset.id}
                asset={asset}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
