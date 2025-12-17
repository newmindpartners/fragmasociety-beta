import { motion } from "framer-motion";
import { TrendingUp, Calendar, Coins, Shield, ArrowUpRight, Clock, Wallet, Target, AlertTriangle } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

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
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-neutral-300" />
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

        {/* Terms Grid - Premium Interactive */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {terms.map((term, index) => {
            const Icon = termIcons[index];
            const isHovered = hoveredIndex === index;
            const isHighlight = term.highlight;
            const isFirstRow = index < 4;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative p-8 md:p-10 cursor-pointer transition-all duration-500 group
                  ${isFirstRow ? 'bg-white' : 'bg-[#FAFAF8]'}
                  ${index % 4 !== 0 ? 'border-l border-neutral-200' : ''}
                  ${!isFirstRow ? 'border-t border-neutral-200' : ''}
                `}
              >
                {/* Hover gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-navy to-navy-surface opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                {/* Shine effect on hover */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden"
                  initial={false}
                >
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className={`w-12 h-12 border flex items-center justify-center mb-6 transition-all duration-500
                      ${isHovered 
                        ? 'border-white/20 bg-white/10' 
                        : 'border-neutral-200 bg-transparent'
                      }
                    `}
                    animate={{ 
                      scale: isHovered ? 1.1 : 1,
                      rotate: isHovered ? 3 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-500 ${isHovered ? 'text-white' : 'text-neutral-400'}`} />
                  </motion.div>
                  
                  {/* Label */}
                  <p className={`text-[10px] tracking-[0.25em] uppercase mb-3 transition-colors duration-500 ${
                    isHovered ? 'text-primary' : isHighlight ? 'text-primary/70' : 'text-neutral-400'
                  }`}>
                    {term.label}
                  </p>
                  
                  {/* Value */}
                  <motion.p 
                    className={`text-2xl md:text-3xl font-light transition-colors duration-500 ${
                      isHovered ? 'text-white' : 'text-neutral-900'
                    }`}
                    animate={{ 
                      y: isHovered ? -4 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {term.value}
                  </motion.p>

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
                </div>

                {/* Bottom border accent on hover */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Risk Warning - Elegant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-start gap-4 p-6 border border-neutral-200 bg-[#FAFAF8] group hover:bg-navy hover:border-navy transition-all duration-500"
        >
          <AlertTriangle className="w-5 h-5 text-neutral-400 group-hover:text-primary flex-shrink-0 mt-0.5 transition-colors duration-500" />
          <p className="text-sm text-neutral-600 leading-relaxed group-hover:text-white/70 transition-colors duration-500">
            <strong className="text-neutral-800 group-hover:text-white transition-colors duration-500">*Important:</strong> Target returns are projections only and not guaranteed. 
            Capital at risk. Past performance is not indicative of future results. This investment is illiquid.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
