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
}

const assets: AssetItem[] = [
  { id: "1", image: propertyMalibu, name: "Malibu Estate", price: 524.50, type: "buy" },
  { id: "2", image: rwaFilm, name: "Film Rights", price: 156.80, type: "sell" },
  { id: "3", image: rwaVilla, name: "Tuscan Villa", price: 892.25, type: "buy" },
  { id: "4", image: rwaCommercial, name: "Paris Office", price: 1025.00, type: "sell" },
  { id: "5", image: rwaLuxury, name: "Luxury Asset", price: 445.00, type: "buy" },
  { id: "6", image: propertyNimes, name: "Nimes Road", price: 678.50, type: "sell" },
];

// Animated Badge Component
const TradeBadge = ({ 
  type, 
  price, 
  delay 
}: { 
  type: "buy" | "sell"; 
  price: number;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), delay);
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 300);
    }, 4000 + delay);
    
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
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
      className={`absolute px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2 ${
        type === "buy" 
          ? "bg-emerald-500/90 text-white" 
          : "bg-violet-600/90 text-white"
      }`}
      style={{
        top: type === "buy" ? "15%" : "auto",
        bottom: type === "sell" ? "15%" : "auto",
        left: type === "buy" ? "10%" : "auto",
        right: type === "sell" ? "10%" : "auto",
      }}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {type === "buy" ? "Buy" : "Sell"}
      </span>
      <span className="text-sm font-mono font-bold">
        €{price.toFixed(0)}
      </span>
    </motion.div>
  );
};

// Photo Card Component
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 30,
        scale: isInView ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.6, 
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative rounded-2xl overflow-hidden group ${sizes[index]}`}
    >
      <img 
        src={asset.image} 
        alt={asset.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
      
      {/* Animated Trade Badge */}
      <TradeBadge 
        type={asset.type} 
        price={asset.price} 
        delay={index * 500}
      />
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
