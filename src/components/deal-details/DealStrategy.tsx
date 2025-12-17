import { motion } from "framer-motion";
import { Target, Pickaxe, DollarSign, Lightbulb, LogOut, ArrowRight } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

// Background image
import strategyBg from "@/assets/strategy-hero-bg.jpg";

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
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={strategyBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header - Editorial Style */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-neutral-400" />
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

        {/* Strategy Steps - Glassmorphism Cards */}
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
                {/* Card with glassmorphism */}
                <motion.div 
                  className="relative p-8 h-full overflow-hidden"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(135deg, rgba(225,240,245,0.95) 0%, rgba(255,255,255,0.9) 100%)'
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isHovered ? '1px solid rgba(0, 200, 180, 0.3)' : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 200, 180, 0.1)'
                      : '0 4px 20px -5px rgba(0, 0, 0, 0.08)',
                  }}
                  animate={{ 
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.02 : 1 
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-primary/10 via-transparent to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Step number - Large */}
                    <motion.div 
                      className="mb-8"
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        x: isHovered ? 8 : 0 
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className={`text-7xl font-extralight transition-colors duration-500 ${
                        isHovered ? 'text-primary/60' : 'text-neutral-200'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-14 h-14 border flex items-center justify-center mb-6 transition-all duration-500 ${
                        isHovered 
                          ? 'border-primary/40 bg-primary/10 shadow-lg shadow-primary/20' 
                          : 'border-neutral-200/80 bg-white/50'
                      }`}
                      animate={{ 
                        rotate: isHovered ? 6 : 0,
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={`w-6 h-6 transition-colors duration-500 ${
                        isHovered ? 'text-primary' : 'text-neutral-400'
                      }`} strokeWidth={1.5} />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.h3 
                      className={`text-lg font-medium mb-3 leading-tight transition-colors duration-500 ${
                        isHovered ? 'text-neutral-900' : 'text-neutral-800'
                      }`}
                      animate={{ y: isHovered ? -2 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {strategy.title}
                    </motion.h3>
                    
                    <p className={`text-sm leading-relaxed font-light transition-colors duration-500 ${
                      isHovered ? 'text-neutral-600' : 'text-neutral-500'
                    }`}>
                      {strategy.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Corner accent */}
                  <motion.div 
                    className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent -translate-y-1/2 translate-x-1/2 rotate-45" />
                  </motion.div>
                </motion.div>
                
                {/* Arrow connector - Hidden on last item */}
                {index < deal.strategies.length - 1 && (
                  <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <motion.div 
                      className="w-6 h-6 bg-white/80 backdrop-blur border border-neutral-200/50 flex items-center justify-center shadow-sm"
                      animate={{ 
                        scale: isHovered ? 1.2 : 1,
                        backgroundColor: isHovered ? 'hsl(172, 83%, 50%)' : 'rgba(255,255,255,0.8)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className={`w-3 h-3 transition-colors duration-300 ${
                        isHovered ? 'text-white' : 'text-neutral-400'
                      }`} />
                    </motion.div>
                  </div>
                )}
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
          className="mt-16 pt-8 border-t border-neutral-200/50"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1] }}
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
