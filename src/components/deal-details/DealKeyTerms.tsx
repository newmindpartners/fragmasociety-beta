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
    },
    {
      icon: Coins,
      label: "Currency",
      value: deal.currency,
    },
    {
      icon: Banknote,
      label: "Minimum Investment",
      value: deal.minTicket,
    },
    {
      icon: TrendingUp,
      label: "Maximum Investment",
      value: deal.maxTicket,
    },
    {
      icon: Target,
      label: "Target Return*",
      value: deal.targetReturn,
      highlight: true,
    },
    {
      icon: Calendar,
      label: "Term / Duration",
      value: deal.term,
    },
    {
      icon: Clock,
      label: "Distribution",
      value: deal.distributionFrequency,
    },
    {
      icon: Percent,
      label: "Total Raise",
      value: deal.totalRaise,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Premium background image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')`,
          }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Subtle gold tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/15 via-transparent to-amber-800/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-5">
            Investment Parameters
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">Key </span>
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Terms
            </span>
          </h2>
        </motion.div>

        {/* Compact Glass Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -2, scale: 1.02 }}
              className="group relative"
            >
              <div className={`relative rounded-xl backdrop-blur-md p-4 transition-all duration-300 ${
                term.highlight 
                  ? 'bg-gradient-to-br from-amber-500/15 to-amber-600/10 border border-amber-500/40' 
                  : 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20'
              }`}>
                
                {term.highlight && (
                  <div className="absolute -top-2 -right-2">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-full">
                      Key
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    term.highlight 
                      ? 'bg-amber-500/20' 
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <term.icon className={`w-4 h-4 ${
                      term.highlight 
                        ? 'text-amber-400' 
                        : 'text-white/50 group-hover:text-white/70'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="min-w-0">
                    <p className="text-[10px] text-white/70 uppercase tracking-wider font-medium truncate">
                      {term.label}
                    </p>
                    <p className={`text-base font-bold truncate ${
                      term.highlight 
                        ? 'bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent' 
                        : 'text-white'
                    }`}>
                      {term.value}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Risk Warning */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-10"
        >
          <div className="backdrop-blur-md bg-amber-500/5 border border-amber-500/20 rounded-xl px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-amber-400 font-bold text-sm">!</span>
              </div>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                <strong className="text-amber-300">*Important:</strong> Target returns are projections only and not guaranteed. 
                Capital at risk. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
