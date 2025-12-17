import { motion } from "framer-motion";
import { TrendingUp, Calendar, Coins, Shield, ArrowUpRight, Clock, Wallet, Target, AlertTriangle } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

// Background
import keyTermsBg from "@/assets/rwa-luxury.jpg";

interface DealKeyTermsProps {
  deal: DealData;
}

const termIcons = [
  Shield,
  Coins,
  Wallet,
  ArrowUpRight,
  Target,
  Calendar,
  Clock,
  TrendingUp,
];

export const DealKeyTerms = ({ deal }: DealKeyTermsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const terms = [
    { label: "Instrument", value: deal.instrumentType },
    { label: "Currency", value: deal.currency },
    { label: "Minimum", value: deal.minTicket },
    { label: "Maximum", value: deal.maxTicket },
    { label: "Target Return*", value: deal.targetReturn, highlight: true },
    { label: "Term", value: deal.term },
    { label: "Distribution", value: deal.distributionFrequency },
    { label: "Total Raise", value: deal.totalRaise },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={keyTermsBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/97 via-white/95 to-white/97" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-neutral-400" />
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-500 font-medium">
              Investment Parameters
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-neutral-900 leading-[1.1]"
          >
            Key <span className="italic text-neutral-600">Terms</span>
          </motion.h2>
        </div>

        {/* Terms Grid - Glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {terms.map((term, index) => {
            const Icon = termIcons[index];
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <motion.div
                  className="relative p-8 h-full overflow-hidden"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(135deg, rgba(20,35,60,0.95) 0%, rgba(30,50,80,0.9) 100%)'
                      : term.highlight 
                        ? 'rgba(248, 247, 245, 0.8)' 
                        : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isHovered 
                      ? '1px solid rgba(0, 200, 180, 0.3)' 
                      : '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                      : '0 4px 20px -5px rgba(0, 0, 0, 0.06)',
                  }}
                  animate={{ 
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.03 : 1
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-primary/10 via-transparent to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  {/* Icon */}
                  <motion.div 
                    className={`w-12 h-12 border flex items-center justify-center mb-6 transition-all duration-500 ${
                      isHovered 
                        ? 'border-primary/40 bg-primary/10' 
                        : 'border-neutral-200/80 bg-white/50'
                    }`}
                    animate={{ 
                      rotate: isHovered ? 6 : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-500 ${
                      isHovered ? 'text-primary' : 'text-neutral-400'
                    }`} />
                  </motion.div>
                  
                  {/* Label */}
                  <p className={`text-[10px] tracking-[0.25em] uppercase mb-3 transition-colors duration-500 ${
                    isHovered ? 'text-primary' : 'text-neutral-400'
                  }`}>
                    {term.label}
                  </p>
                  
                  {/* Value */}
                  <motion.p 
                    className={`text-2xl md:text-3xl font-light transition-colors duration-500 ${
                      isHovered ? 'text-white' : 'text-neutral-900'
                    }`}
                    animate={{ y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {term.value}
                  </motion.p>

                  {/* Bottom accent */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Hover indicator dot */}
                  <motion.div 
                    className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-primary"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isHovered ? 1 : 0,
                      opacity: isHovered ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Risk Warning - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-start gap-4 p-6 group cursor-pointer"
          style={{
            background: 'rgba(248, 247, 245, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          <AlertTriangle className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-neutral-600 leading-relaxed">
            <strong className="text-neutral-800">*Important:</strong> Target returns are projections only and not guaranteed. 
            Capital at risk. Past performance is not indicative of future results. This investment is illiquid.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
