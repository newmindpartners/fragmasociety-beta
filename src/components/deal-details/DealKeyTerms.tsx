import { motion } from "framer-motion";
import { TrendingUp, Calendar, Coins, Shield, ArrowUpRight, Clock, Wallet, Target, AlertTriangle } from "lucide-react";
import type { DealData } from "@/types/deal";

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

        {/* Terms Grid - Clean & Minimal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200">
          {terms.map((term, index) => {
            const Icon = termIcons[index];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`p-8 bg-white hover:bg-neutral-50 transition-colors ${
                  term.highlight ? 'bg-[#F8F7F5]' : ''
                }`}
              >
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center mb-5">
                  <Icon className="w-4 h-4 text-neutral-400" />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  {term.label}
                </p>
                <p className={`text-2xl md:text-3xl font-light ${
                  term.highlight ? 'text-neutral-800' : 'text-neutral-900'
                }`}>
                  {term.value}
                </p>
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
          className="mt-12 flex items-start gap-4 p-6 border border-neutral-200 bg-[#F8F7F5]"
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
