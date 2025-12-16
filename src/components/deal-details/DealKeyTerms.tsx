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
import type { DealData } from "@/pages/DealDetails";

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
    <section className="py-24 relative overflow-hidden bg-white/[0.02]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Key </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Terms
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Essential investment parameters at a glance
          </p>
        </motion.div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 ${
                term.highlight 
                  ? 'border-primary/30 bg-primary/5' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {term.highlight && (
                <div className="absolute -top-2 -right-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-background rounded-full">
                    Key
                  </span>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  term.highlight ? 'bg-primary/20' : 'bg-white/10'
                }`}>
                  <term.icon className={`w-5 h-5 ${term.highlight ? 'text-primary' : 'text-white/70'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">{term.label}</p>
                  <p className={`text-lg font-bold truncate ${term.highlight ? 'text-primary' : 'text-foreground'}`}>
                    {term.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground/70 mt-1">{term.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Risk Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-200/90 leading-relaxed">
              <strong>Important:</strong> *Target returns are projections only and are not guaranteed. 
              Your capital is at risk. Past performance is not indicative of future results. 
              This investment may be illiquid - you may not be able to sell your position quickly or at all.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
