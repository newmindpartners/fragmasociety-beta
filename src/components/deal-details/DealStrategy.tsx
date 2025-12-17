import { motion } from "framer-motion";
import { Target, Pickaxe, DollarSign, Lightbulb, LogOut, ArrowRight } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

interface DealStrategyProps {
  deal: DealData;
}

const strategyIcons: React.ElementType[] = [
  Target,
  Pickaxe,
  DollarSign,
  Lightbulb,
  LogOut,
];

export const DealStrategy = ({ deal }: DealStrategyProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!deal.strategies || deal.strategies.length === 0) return null;

  return (
    <section className="py-32 bg-[#F8F7F5] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header - Editorial Style */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-neutral-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-500 font-medium">
              Strategy
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-light text-neutral-900 leading-[1.15] tracking-tight"
          >
            A methodical approach
            <br />
            <span className="italic text-neutral-600">to exceptional returns</span>
          </motion.h2>
        </div>

        {/* Strategy Steps - Premium Interactive Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {deal.strategies.map((strategy, index) => {
            const Icon = strategyIcons[index] || Lightbulb;
            const isHovered = hoveredIndex === index;

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div className="bg-white border border-neutral-200 p-8 h-full relative overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl">
                  
                  {/* Hover background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-navy via-navy-surface to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />

                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Step number - Large */}
                    <motion.div 
                      className="mb-8"
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        x: isHovered ? 10 : 0 
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className={`text-6xl font-extralight transition-colors duration-500 ${
                        isHovered ? 'text-primary' : 'text-neutral-200'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-12 h-12 border flex items-center justify-center mb-6 transition-all duration-500 ${
                        isHovered ? 'border-primary/50 bg-primary/10' : 'border-neutral-200'
                      }`}
                      animate={{ 
                        rotate: isHovered ? 6 : 0,
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={`w-5 h-5 transition-colors duration-500 ${
                        isHovered ? 'text-primary' : 'text-neutral-400'
                      }`} strokeWidth={1.5} />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.h3 
                      className={`text-base font-medium mb-3 leading-tight transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-neutral-900'
                      }`}
                      animate={{ y: isHovered ? -2 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {strategy.title}
                    </motion.h3>
                    
                    <p className={`text-sm leading-relaxed font-light transition-colors duration-500 ${
                      isHovered ? 'text-white/60' : 'text-neutral-500'
                    }`}>
                      {strategy.description}
                    </p>

                    {/* Progress indicator */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: isHovered ? '100%' : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  
                  {/* Arrow connector - Hidden on last item */}
                  {index < deal.strategies.length - 1 && (
                    <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <motion.div 
                        className="w-6 h-6 bg-white border border-neutral-200 flex items-center justify-center shadow-sm"
                        animate={{ 
                          scale: isHovered ? 1.2 : 1,
                          backgroundColor: isHovered ? 'hsl(var(--primary))' : '#fff'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className={`w-3 h-3 transition-colors duration-300 ${
                          isHovered ? 'text-white' : 'text-neutral-400'
                        }`} />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-neutral-200"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-sm text-neutral-500 tracking-wide font-light">
              Each phase executed with precision to maximize value creation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
