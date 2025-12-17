import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Target, Wallet, AlertTriangle } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealFinancialsProps {
  deal: DealData;
}

export const DealFinancials = ({ deal }: DealFinancialsProps) => {
  if (!deal.financials) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-navy">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 100px)'
        }} 
      />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-foreground/40 uppercase mb-4 block">
            Financial Overview
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
            Financial Projections
          </h2>
          <p className="text-lg text-foreground/50 max-w-xl font-light">
            Target returns and investment scenarios
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main Projections Grid */}
          <div className="grid md:grid-cols-3 gap-px bg-foreground/10 mb-16">
            {/* Conservative */}
            {deal.financials.conservativeScenario && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-navy p-10 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-6 border border-foreground/20 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-foreground/50" />
                </div>
                <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] mb-2">Conservative</p>
                <p className="text-xs text-foreground/60 mb-4">Downside Scenario</p>
                <p className="text-3xl font-serif font-light text-foreground/80">{deal.financials.conservativeScenario}</p>
              </motion.div>
            )}

            {/* Base Case */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-navy-surface p-10 text-center border-x border-foreground/10"
            >
              <div className="w-14 h-14 mx-auto mb-6 bg-foreground/5 border border-foreground/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-foreground/70" />
              </div>
              <p className="text-[10px] text-foreground/60 uppercase tracking-[0.2em] mb-2">Base Case</p>
              <p className="text-xs text-foreground/70 mb-4">Projected Profit</p>
              <p className="text-4xl font-serif font-light text-foreground mb-2">{deal.financials.projectedProfit}</p>
              <p className="text-sm text-foreground/50">Target IRR: {deal.financials.targetIRR}</p>
            </motion.div>

            {/* Optimistic */}
            {deal.financials.optimisticScenario && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-navy p-10 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-6 border border-foreground/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-foreground/50" />
                </div>
                <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] mb-2">Optimistic</p>
                <p className="text-xs text-foreground/60 mb-4">Upside Scenario</p>
                <p className="text-3xl font-serif font-light text-foreground/80">{deal.financials.optimisticScenario}</p>
              </motion.div>
            )}
          </div>

          {/* Additional Fund Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border-t border-b border-foreground/10 py-12"
          >
            <div className="grid md:grid-cols-4 gap-12">
              {deal.financials.portfolioTarget && (
                <div className="text-center">
                  <Wallet className="w-5 h-5 text-foreground/40 mx-auto mb-3" />
                  <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] mb-2">Portfolio Target</p>
                  <p className="text-xl font-serif font-light text-foreground">{deal.financials.portfolioTarget}</p>
                </div>
              )}
              {deal.financials.resaleTarget && (
                <div className="text-center">
                  <TrendingUp className="w-5 h-5 text-foreground/40 mx-auto mb-3" />
                  <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] mb-2">Resale Target</p>
                  <p className="text-xl font-serif font-light text-foreground">{deal.financials.resaleTarget}</p>
                </div>
              )}
              {deal.financials.fundSize && (
                <div className="text-center">
                  <DollarSign className="w-5 h-5 text-foreground/40 mx-auto mb-3" />
                  <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] mb-2">Fund Size</p>
                  <p className="text-xl font-serif font-light text-foreground">{deal.financials.fundSize}</p>
                </div>
              )}
              <div className="text-center">
                <Target className="w-5 h-5 text-foreground/40 mx-auto mb-3" />
                <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] mb-2">Target IRR</p>
                <p className="text-xl font-serif font-light text-foreground">{deal.financials.targetIRR}</p>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-start gap-4 p-6 border border-foreground/10"
          >
            <AlertTriangle className="w-5 h-5 text-foreground/40 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/50 font-light leading-relaxed">
              <strong className="text-foreground/70">Important:</strong> All financial projections are targets only and are not guaranteed. 
              Actual results may vary significantly. Your capital is at risk.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
