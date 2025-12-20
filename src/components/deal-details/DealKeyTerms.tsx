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
    <section className="py-12 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-slate-300" />
          <span className="text-xs tracking-[0.3em] uppercase text-slate-500 font-medium">
            Key Terms
          </span>
        </motion.div>

        {/* Compact Terms Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {terms.map((term, index) => {
            const Icon = termIcons[index];
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <motion.div
                  className="relative p-4 h-full bg-white border border-slate-200/80 transition-all duration-300"
                  style={{
                    boxShadow: isHovered 
                      ? '0 8px 24px -8px rgba(15, 23, 42, 0.15)'
                      : '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                  animate={{ 
                    y: isHovered ? -3 : 0,
                    borderColor: isHovered ? 'rgb(100, 116, 139)' : 'rgba(226, 232, 240, 0.8)'
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Icon */}
                  <Icon className={`w-4 h-4 mb-3 transition-colors duration-300 ${
                    isHovered ? 'text-slate-700' : 'text-slate-400'
                  }`} />
                  
                  {/* Label */}
                  <p className="text-[9px] tracking-[0.2em] uppercase mb-1 text-slate-400">
                    {term.label}
                  </p>
                  
                  {/* Value */}
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    term.highlight ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {term.value}
                  </p>

                  {/* Hover accent */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-slate-600"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact Risk Warning */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xs text-slate-500 flex items-center gap-2"
        >
          <AlertTriangle className="w-3 h-3 text-slate-400 flex-shrink-0" />
          <span>*Target returns are projections only. Capital at risk. Past performance is not indicative of future results.</span>
        </motion.p>
      </div>
    </section>
  );
};
