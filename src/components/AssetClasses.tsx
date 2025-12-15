import { useState, useRef, useEffect } from "react";
import { Building2, Clapperboard, Gem, BarChart3, Leaf, Briefcase, ArrowRight } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const assets = [
  {
    title: "Prime Real Estate",
    icon: Building2,
    description: "Income and appreciation from landmark properties.",
    bullets: ["Premium commercial & residential assets", "Rental yield + capital growth", "Global diversification"],
    examples: "Office towers, luxury residences, logistics hubs"
  },
  {
    title: "Entertainment",
    icon: Clapperboard,
    description: "Participations in films, media & IP revenues.",
    bullets: ["Film & TV production stakes", "Music royalties & catalog rights", "Gaming & digital content"],
    examples: "Feature films, streaming series, music catalogs"
  },
  {
    title: "Luxury Goods",
    icon: Gem,
    description: "Curated diamonds, art & collectible assets.",
    bullets: ["Investment-grade diamonds", "Blue-chip art & collectibles", "Rare watches & jewelry"],
    examples: "GIA-certified stones, contemporary art, vintage timepieces"
  },
  {
    title: "Private Credit",
    icon: BarChart3,
    description: "Yield from SME loans and private debt.",
    bullets: ["Senior secured lending", "Revenue-based financing", "Trade finance"],
    examples: "SME growth loans, invoice factoring, asset-backed credit"
  },
  {
    title: "ESG & Impact",
    icon: Leaf,
    description: "Capital into climate & positive-impact projects.",
    bullets: ["Renewable energy infrastructure", "Sustainable agriculture", "Social impact bonds"],
    examples: "Solar farms, carbon credits, microfinance"
  },
  {
    title: "Institutional",
    icon: Briefcase,
    description: "Structured products built with partners.",
    bullets: ["Co-investment opportunities", "Fund-of-funds access", "Bespoke mandates"],
    examples: "PE secondaries, hedge fund allocations, private placements"
  }
];

interface AssetCardProps {
  asset: typeof assets[0];
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
}

const AssetCard = ({ asset, index, isActive, isHovered, onHover, onClick }: AssetCardProps) => {
  const Icon = asset.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(index)}
      className="relative"
    >
      <div
        className={cn(
          "relative p-6 rounded-2xl cursor-pointer transition-all duration-300",
          "bg-gradient-to-b from-[hsl(225,50%,15%)]/60 to-[hsl(225,50%,10%)]/80",
          "backdrop-blur-xl border border-white/5",
          "before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300",
          "before:bg-gradient-to-t before:from-transparent before:to-white/5",
          isHovered && "before:opacity-100",
          isActive && "border-primary/40 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]"
        )}
        style={{
          transform: isHovered 
            ? "translateY(-8px) scale(1.02)" 
            : "translateY(0) scale(1)",
          boxShadow: isHovered 
            ? "0 20px 40px -15px rgba(0,0,0,0.5), 0 0 0 1px hsl(var(--primary)/0.3)" 
            : "0 4px 20px -10px rgba(0,0,0,0.3)"
        }}
      >
      {/* Inner glow at top */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Floating particles on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, x: Math.random() * 40 - 20 }}
                animate={{ 
                  opacity: [0, 0.6, 0], 
                  y: -40,
                  x: Math.random() * 60 - 30
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                className="absolute bottom-1/2 left-1/2 w-1 h-1 rounded-full bg-primary/60"
              />
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Icon with animation */}
      <div className="relative mb-4 flex justify-center">
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Icon 
            className={cn(
              "transition-colors duration-300",
              isHovered || isActive ? "text-primary" : "text-muted-foreground"
            )} 
            size={32} 
            strokeWidth={1.5}
          />
        </motion.div>
      </div>
      
      {/* Title */}
      <motion.p 
        className="text-foreground font-medium text-sm text-center mb-1"
        animate={isHovered ? { y: -4 } : { y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {asset.title}
      </motion.p>
      
      {/* Description reveal on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-muted-foreground text-xs text-center leading-relaxed"
          >
            {asset.description}
          </motion.p>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const AssetClasses = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 overflow-hidden"
    >
      {/* Background - transparent to blend with page */}
      <div className="absolute inset-0 bg-transparent" />
      
      {/* Moving spotlight */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)",
          filter: "blur(60px)"
        }}
        animate={{
          x: hoveredIndex !== null 
            ? `calc(${(hoveredIndex / 5) * 100}% - 200px)` 
            : "calc(50% - 200px)",
          y: "20%"
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Title animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Private asset classes
          </h2>
        </motion.div>
        
        {/* Subtitle animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-center text-primary text-lg mb-3"
        >
          Curated private markets at your fingertips.
        </motion.p>
        
        {/* Micro-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-center text-muted-foreground text-sm max-w-xl mx-auto mb-12"
        >
          Diversify across real estate, entertainment, credit, ESG and institutional-grade products in a few clicks.
        </motion.p>
        
        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {assets.map((asset, i) => (
            <AssetCard
              key={i}
              asset={asset}
              index={i}
              isActive={activeIndex === i}
              isHovered={hoveredIndex === i}
              onHover={setHoveredIndex}
              onClick={handleClick}
            />
          ))}
        </div>
        
        {/* Expandable detail panel */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="mt-8 p-8 rounded-2xl bg-gradient-to-b from-[hsl(225,50%,15%)]/60 to-[hsl(225,50%,10%)]/80 backdrop-blur-xl border border-primary/20">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2 flex items-center gap-3">
                      {(() => {
                        const Icon = assets[activeIndex].icon;
                        return <Icon className="text-primary" size={24} />;
                      })()}
                      {assets[activeIndex].title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{assets[activeIndex].description}</p>
                    <ul className="space-y-2 mb-4">
                      {assets[activeIndex].bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:w-64">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Example deals</p>
                    <p className="text-sm text-foreground/80 mb-6">{assets[activeIndex].examples}</p>
                    <Button variant="outline" size="sm" className="group border-white text-white hover:bg-white hover:text-background transition-all duration-300">
                      View deals in this class
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
