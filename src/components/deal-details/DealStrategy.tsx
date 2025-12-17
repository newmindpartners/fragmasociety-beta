import { motion } from "framer-motion";
import { Target, Pickaxe, DollarSign, Lightbulb, LogOut } from "lucide-react";
import type { DealData } from "@/types/deal";

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
            
            {/* Dashed overlay for elegance */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] hidden lg:block overflow-hidden">
              <div className="w-full h-full border-t border-dashed border-white/10" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {deal.strategies.map((strategy, index) => {
              const Icon = strategyIcons[index] || Lightbulb;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full overflow-hidden rounded-2xl"
                  >
                    {/* Card background with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1f] via-[#16161a] to-[#0f0f12]" />
                    
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
                    
                    {/* Border */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300" />
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-white/[0.02] to-transparent" />
                    
                    {/* Content */}
                    <div className="relative p-6 h-full flex flex-col">
                      {/* Icon container */}
                      <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center mb-5 group-hover:bg-white/[0.12] transition-colors duration-300">
                        <Icon className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                        {strategy.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-white/50 leading-relaxed flex-grow">
                        {strategy.description}
                      </p>
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
