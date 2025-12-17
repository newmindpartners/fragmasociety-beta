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
    <section className="py-32 relative overflow-hidden">
      {/* Studio Spotlight Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100">
        {/* Spotlight gradients */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-white/80 via-slate-50/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-slate-200/60 via-slate-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-white/90 via-transparent to-transparent rounded-full blur-2xl" />
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
            <div className="w-12 h-px bg-slate-400" />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
              Investment Parameters
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 leading-[1.1]"
          >
            Key <span className="italic text-slate-500 font-serif">Terms</span>
          </motion.h2>
        </div>

        {/* Terms Grid */}
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
                className="cursor-pointer group"
              >
                <motion.div
                  className="relative p-8 h-full overflow-hidden"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(135deg, rgba(30,41,59,0.97) 0%, rgba(51,65,85,0.95) 100%)'
                      : term.highlight 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isHovered 
                      ? '1px solid rgba(100, 116, 139, 0.3)' 
                      : '1px solid rgba(148, 163, 184, 0.2)',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(15, 23, 42, 0.25)'
                      : '0 4px 20px -5px rgba(0, 0, 0, 0.04)',
                  }}
                  animate={{ 
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.03 : 1
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Decorative graphic per card */}
                  <div className={`absolute top-4 right-4 w-16 h-16 transition-opacity duration-500 ${isHovered ? 'opacity-10' : 'opacity-[0.04]'}`}>
                    {index === 0 && (
                      <svg viewBox="0 0 64 64" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                        <path d="M32 8 L32 56 M8 32 L56 32" stroke="currentColor" strokeWidth="1" fill="none" />
                        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
                        <circle cx="32" cy="32" r="8" fill="currentColor" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg viewBox="0 0 64 64" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <text x="32" y="38" textAnchor="middle" fontSize="16" fill="currentColor" fontWeight="300">€</text>
                      </svg>
                    )}
                    {index === 2 && (
                      <svg viewBox="0 0 64 64" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                        <rect x="12" y="20" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <path d="M12 30 L52 30" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg viewBox="0 0 64 64" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                        <path d="M16 48 L32 16 L48 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <path d="M22 38 L42 38" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    )}
                    {index === 4 && (
                      <svg viewBox="0 0 64 64" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
                        <circle cx="32" cy="32" r="3" fill="currentColor" />
                      </svg>
                    )}
                    {index === 5 && (
                      <svg viewBox="0 0 64 64" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                        <rect x="12" y="12" width="40" height="40" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <path d="M12 24 L52 24 M24 12 L24 52 M36 12 L36 52" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    )}
                    {index === 6 && (
                      <svg viewBox="0 0 64 64" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <path d="M32 16 L32 32 L44 32" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    )}
                    {index === 7 && (
                      <svg viewBox="0 0 64 64" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                        <path d="M12 48 L24 36 L36 42 L52 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <circle cx="52" cy="20" r="4" fill="currentColor" />
                      </svg>
                    )}
                  </div>

                  {/* Icon */}
                  <motion.div 
                    className={`w-12 h-12 border flex items-center justify-center mb-6 transition-all duration-500 ${
                      isHovered 
                        ? 'border-slate-400 bg-white/10' 
                        : 'border-slate-200 bg-white/80'
                    }`}
                    animate={{ 
                      rotate: isHovered ? 6 : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-500 ${
                      isHovered ? 'text-white' : 'text-slate-500'
                    }`} />
                  </motion.div>
                  
                  {/* Label */}
                  <p className={`text-[10px] tracking-[0.25em] uppercase mb-3 transition-colors duration-500 ${
                    isHovered ? 'text-slate-300' : 'text-slate-400'
                  }`}>
                    {term.label}
                  </p>
                  
                  {/* Value */}
                  <motion.p 
                    className={`text-2xl md:text-3xl font-light transition-colors duration-500 ${
                      isHovered ? 'text-white' : 'text-slate-900'
                    }`}
                    animate={{ y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {term.value}
                  </motion.p>

                  {/* Bottom accent - violet/navy gradient */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-slate-700 via-violet-600 to-slate-500"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Hover indicator dot */}
                  <motion.div 
                    className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-slate-400"
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

        {/* Risk Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50"
        >
          <AlertTriangle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">*Important:</strong> Target returns are projections only and not guaranteed. 
            Capital at risk. Past performance is not indicative of future results. This investment is illiquid.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
