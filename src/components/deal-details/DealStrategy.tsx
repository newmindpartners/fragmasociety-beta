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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {deal.strategies.map((strategy, index) => {
              const Icon = strategyIcons[index] || Lightbulb;
              const bgImage = strategyBackgrounds[index] || propertyMalibu;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                  style={{ 
                    marginTop: isEven ? '0' : '40px',
                    perspective: '1000px'
                  }}
                >
                  {/* Blurred photo backdrop layer */}
                  <div 
                    className="absolute -inset-4 rounded-2xl bg-cover bg-center blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 -z-10"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  />
                  
                  <motion.div
                    whileHover={{ 
                      y: -12, 
                      rotateX: 5,
                      scale: 1.02
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative h-[340px]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Main dark card */}
                    <div className="relative h-full rounded-2xl overflow-hidden bg-background/95 backdrop-blur-sm border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group-hover:border-white/20 transition-all duration-500">
                      
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                      
                      {/* Content */}
                      <div className="relative h-full p-6 flex flex-col">
                        {/* Step number */}
                        <span className="absolute top-4 right-4 text-5xl font-bold text-white/5 font-mono">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        
                        {/* Icon in accent circle */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:from-primary/40 group-hover:to-primary/20 group-hover:border-primary/50 transition-all duration-500 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                          <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
                          {strategy.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-white/60 leading-relaxed flex-1">
                          {strategy.description}
                        </p>
                        
                        {/* Bottom accent line */}
                        <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-primary/60 to-transparent rounded-full group-hover:w-20 transition-all duration-500" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Connecting line to next card */}
                  {index < deal.strategies.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px]">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-white/20 to-white/5 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
