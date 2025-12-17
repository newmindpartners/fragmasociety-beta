import { motion } from "framer-motion";
import { TrendingUp, Calendar, Coins, Shield, ArrowUpRight, Clock, Wallet, Target } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealKeyTermsProps {
  deal: DealData;
}

const termIcons = [
  { icon: Shield, color: "text-blue-600 bg-blue-50" },
  { icon: Coins, color: "text-purple-600 bg-purple-50" },
  { icon: Wallet, color: "text-emerald-600 bg-emerald-50" },
  { icon: ArrowUpRight, color: "text-rose-600 bg-rose-50" },
  { icon: Target, color: "text-amber-600 bg-amber-50" },
  { icon: Calendar, color: "text-indigo-600 bg-indigo-50" },
  { icon: Clock, color: "text-teal-600 bg-teal-50" },
  { icon: TrendingUp, color: "text-orange-600 bg-orange-50" },
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
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-50 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-neutral-50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-amber-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-amber-600 font-medium">
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
            Key <span className="italic text-amber-700">Terms</span>
          </motion.h2>
        </div>

        {/* Terms Grid - Clean & Minimal with icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {terms.map((term, index) => {
            const iconInfo = termIcons[index];
            const Icon = iconInfo.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 ${
                  term.highlight 
                    ? 'bg-gradient-to-br from-amber-50 to-white border-amber-200' 
                    : 'bg-white border-neutral-100 hover:border-neutral-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${iconInfo.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  {term.label}
                </p>
                <p className={`text-2xl md:text-3xl font-light ${
                  term.highlight ? 'text-amber-700' : 'text-neutral-900'
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
          className="mt-12 flex items-start gap-4 p-6 bg-amber-50/50 rounded-2xl border border-amber-100"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-700 font-semibold text-sm">!</span>
          </div>
          <p className="text-sm text-amber-800/80 leading-relaxed">
            <strong className="text-amber-900">*Important:</strong> Target returns are projections only and not guaranteed. 
            Capital at risk. Past performance is not indicative of future results. This investment is illiquid.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
