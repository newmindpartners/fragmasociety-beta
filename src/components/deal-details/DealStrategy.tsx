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
              
              // Unique accent colors for each card
              const accentColors = [
                'from-emerald-400 to-teal-500',
                'from-amber-400 to-orange-500', 
                'from-blue-400 to-indigo-500',
                'from-violet-400 to-purple-500',
                'from-rose-400 to-pink-500'
              ];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                  style={{ marginTop: isEven ? '0' : '32px' }}
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative h-[360px]"
                  >
                    {/* Main light card */}
                    <div className="relative h-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500">
                      
                      {/* Animated background graphic */}
                      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                        {/* Animated circles */}
                        <motion.div
                          className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${accentColors[index]} opacity-10`}
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                          className={`absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br ${accentColors[index]} opacity-5`}
                          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                      </div>
                      
                      {/* Animated line pattern */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-[0.03]">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute h-[1px] bg-gray-900"
                            style={{ 
                              bottom: `${i * 16}px`, 
                              left: 0, 
                              right: 0 
                            }}
                            animate={{ 
                              x: ['-100%', '100%'],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity, 
                              delay: i * 0.3,
                              ease: "linear"
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Content */}
                      <div className="relative h-full p-6 flex flex-col">
                        {/* Step number watermark */}
                        <span className="absolute top-3 right-4 text-6xl font-bold text-gray-100 font-mono select-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        
                        {/* Icon with animated ring */}
                        <div className="relative w-14 h-14 mb-6">
                          <motion.div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${accentColors[index]} opacity-20`}
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <div className={`relative w-full h-full rounded-xl bg-gradient-to-br ${accentColors[index]} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                          {strategy.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed flex-1">
                          {strategy.description}
                        </p>
                        
                        {/* Bottom photo peek with gradient */}
                        <div className="mt-4 h-16 rounded-lg overflow-hidden relative">
                          <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${bgImage})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Connecting dots */}
                  {index < deal.strategies.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 items-center justify-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-gray-300"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                        />
                      ))}
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
