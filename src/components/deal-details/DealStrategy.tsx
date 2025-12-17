import { motion } from "framer-motion";
import { Target, Pickaxe, DollarSign, Lightbulb, LogOut } from "lucide-react";
import type { DealData } from "@/types/deal";

// Import background images
import propertyMalibu from "@/assets/property-malibu.jpg";
import propertyNimes from "@/assets/property-nimes-road.jpg";
import propertyDeerhead from "@/assets/property-deerhead-ranch.jpg";
import propertyPalisades from "@/assets/property-palisades-site.jpg";
import rwaVilla from "@/assets/rwa-villa.jpg";

interface DealStrategyProps {
  deal: DealData;
}

const strategyIcons: React.ElementType[] = [
  Target,      // Acquire
  Pickaxe,     // Permit & Construction
  DollarSign,  // Development Phase
  Lightbulb,   // Value Enhancement
  LogOut,      // Strategic Exit
];

const strategyBackgrounds = [
  propertyMalibu,      // Acquire - landscape
  propertyPalisades,   // Permit & Construction
  propertyNimes,       // Development Phase
  rwaVilla,            // Value Enhancement
  propertyDeerhead,    // Strategic Exit
];

export const DealStrategy = ({ deal }: DealStrategyProps) => {
  if (!deal.strategies || deal.strategies.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Target className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Value Creation</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground italic">Investment </span>
            <span className="text-white italic">Strategy</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A methodical approach to creating exceptional value in premium real estate
          </p>
        </motion.div>

        {/* Strategy Steps */}
        <div className="max-w-7xl mx-auto">
          {/* Step Numbers Row with connecting line */}
          <div className="relative mb-8">
            {/* Connecting line - main */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/15 hidden lg:block" />
            
            {/* Animated glowing dots - traveling wave left to right */}
            <div className="absolute top-1/2 left-[10%] right-[10%] hidden lg:flex justify-between items-center -translate-y-1/2 px-[8%]">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white"
                  animate={{
                    opacity: [0.1, 1, 0.1],
                    scale: [0.6, 1.3, 0.6],
                    boxShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 12px rgba(255,255,255,0.8)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <div className="flex justify-between px-4 lg:px-8">
              {deal.strategies.map((_, index) => (
                <motion.div
                  key={`number-${index}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-background font-bold text-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
            {deal.strategies.map((strategy, index) => {
              const Icon = strategyIcons[index] || Lightbulb;
              const bgImage = strategyBackgrounds[index] || propertyMalibu;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group h-[320px]"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative h-full"
                  >
                    {/* Card with white to photo transition */}
                    <div className="relative h-full rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 bg-white">
                      {/* Background image - positioned at bottom with transparency */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${bgImage})` }}
                      />
                      
                      {/* White to transparent gradient overlay - top to bottom */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 via-40% to-white/20" />
                      
                      {/* Left accent stripe */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
                      
                      {/* Content */}
                      <div className="relative h-full p-6 flex flex-col">
                        {/* Icon - dark style */}
                        <div className="w-14 h-14 rounded-xl bg-background/90 backdrop-blur-sm border border-border/30 flex items-center justify-center mb-auto group-hover:bg-background group-hover:border-border/50 transition-all duration-500 shadow-sm">
                          <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-serif font-medium text-foreground mb-3 tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                          {strategy.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-foreground/80 leading-relaxed drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
                          {strategy.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
