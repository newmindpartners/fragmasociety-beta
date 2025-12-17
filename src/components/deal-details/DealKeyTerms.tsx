import { motion } from "framer-motion";
import { 
  Banknote, 
  Calendar, 
  Target, 
  Coins, 
  Clock, 
  TrendingUp,
  FileText,
  Percent
} from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealKeyTermsProps {
  deal: DealData;
}

export const DealKeyTerms = ({ deal }: DealKeyTermsProps) => {
  const terms = [
    {
      icon: FileText,
      label: "Instrument Type",
      value: deal.instrumentType,
      description: "Legal structure of the investment",
    },
    {
      icon: Coins,
      label: "Currency",
      value: deal.currency,
      description: "Investment and payout currency",
    },
    {
      icon: Banknote,
      label: "Minimum Investment",
      value: deal.minTicket,
      description: "Lowest entry point",
    },
    {
      icon: TrendingUp,
      label: "Maximum Investment",
      value: deal.maxTicket,
      description: "Per-investor cap",
    },
    {
      icon: Target,
      label: "Target Return*",
      value: deal.targetReturn,
      description: "Projected annual yield",
      highlight: true,
    },
    {
      icon: Calendar,
      label: "Term / Duration",
      value: deal.term,
      description: "Expected holding period",
    },
    {
      icon: Clock,
      label: "Distribution",
      value: deal.distributionFrequency,
      description: "Payout schedule",
    },
    {
      icon: Percent,
      label: "Total Raise",
      value: deal.totalRaise,
      description: "Target funding amount",
    },
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Luxury gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0f0f1a]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/10 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-primary/20 via-emerald-400/10 to-transparent blur-[100px]"
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium mb-6"
          >
            Investment Parameters
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Key </span>
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Terms
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Essential investment parameters at a glance
          </p>
        </motion.div>

        {/* Premium Glass Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative"
            >
              {/* Animated border gradient */}
              <div className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                term.highlight 
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500' 
                  : 'bg-gradient-to-r from-white/20 via-white/40 to-white/20'
              }`} 
              style={{
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite',
              }}
              />
              
              {/* Glass card */}
              <div className={`relative h-full rounded-2xl backdrop-blur-xl p-6 transition-all duration-500 group-hover:translate-y-[-4px] ${
                term.highlight 
                  ? 'bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-amber-600/10 border border-amber-500/30' 
                  : 'bg-white/[0.03] border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.06]'
              }`}>
                
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  </div>
                </div>

                {term.highlight && (
                  <motion.div 
                    className="absolute -top-3 -right-3"
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-full shadow-lg shadow-amber-500/30">
                      Key
                    </span>
                  </motion.div>
                )}
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    term.highlight 
                      ? 'bg-gradient-to-br from-amber-500/30 to-yellow-500/20 group-hover:from-amber-500/40 group-hover:to-yellow-500/30' 
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <term.icon className={`w-5 h-5 transition-colors duration-300 ${
                      term.highlight 
                        ? 'text-amber-400' 
                        : 'text-white/50 group-hover:text-white/80'
                    }`} />
                  </div>
                  
                  {/* Label */}
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                    {term.label}
                  </p>
                  
                  {/* Value */}
                  <p className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    term.highlight 
                      ? 'bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent' 
                      : 'text-white group-hover:text-white'
                  }`}>
                    {term.value}
                  </p>
                  
                  {/* Description */}
                  <p className="text-[11px] text-white/30 mt-auto">
                    {term.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Risk Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/50 via-yellow-500/30 to-amber-500/50 p-[1px] rounded-2xl">
              <div className="absolute inset-[1px] bg-gradient-to-br from-amber-950/90 to-amber-900/80 rounded-2xl" />
            </div>
            
            <div className="relative backdrop-blur-xl bg-amber-500/5 border border-amber-500/20 rounded-2xl px-8 py-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-lg">!</span>
                </div>
                <div>
                  <p className="text-sm text-amber-200/90 leading-relaxed">
                    <strong className="text-amber-300">Important:</strong> *Target returns are projections only and are not guaranteed. 
                    Your capital is at risk. Past performance is not indicative of future results. 
                    This investment may be illiquid — you may not be able to sell your position quickly or at all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};
