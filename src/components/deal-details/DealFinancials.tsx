import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Target, Wallet } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealFinancialsProps {
  deal: DealData;
}

export const DealFinancials = ({ deal }: DealFinancialsProps) => {
  if (!deal.financials) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <DollarSign className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Financial Overview</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Financial </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Projections
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Target returns and investment scenarios
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main Projections Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Conservative */}
            {deal.financials.conservativeScenario && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conservative</p>
                    <p className="text-sm font-semibold text-foreground">Downside Scenario</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-amber-400">{deal.financials.conservativeScenario}</p>
              </motion.div>
            )}

            {/* Base Case */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-primary/80">Base Case</p>
                  <p className="text-sm font-semibold text-foreground">Projected Profit</p>
                </div>
              </div>
              <p className="text-4xl font-bold text-primary">{deal.financials.projectedProfit}</p>
              <p className="text-sm text-muted-foreground mt-2">Target IRR: {deal.financials.targetIRR}</p>
            </motion.div>

            {/* Optimistic */}
            {deal.financials.optimisticScenario && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Optimistic</p>
                    <p className="text-sm font-semibold text-foreground">Upside Scenario</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-green-400">{deal.financials.optimisticScenario}</p>
              </motion.div>
            )}
          </div>

          {/* Additional Fund Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="grid md:grid-cols-4 gap-6">
              {deal.financials.portfolioTarget && (
                <div className="text-center">
                  <Wallet className="w-6 h-6 text-white/50 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Portfolio Target</p>
                  <p className="text-lg font-bold text-foreground">{deal.financials.portfolioTarget}</p>
                </div>
              )}
              {deal.financials.resaleTarget && (
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-white/50 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Resale Target</p>
                  <p className="text-lg font-bold text-foreground">{deal.financials.resaleTarget}</p>
                </div>
              )}
              {deal.financials.fundSize && (
                <div className="text-center">
                  <DollarSign className="w-6 h-6 text-white/50 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Fund Size</p>
                  <p className="text-lg font-bold text-foreground">{deal.financials.fundSize}</p>
                </div>
              )}
              <div className="text-center">
                <Target className="w-6 h-6 text-white/50 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Target IRR</p>
                <p className="text-lg font-bold text-primary">{deal.financials.targetIRR}</p>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center"
          >
            <p className="text-xs text-amber-200/90">
              <strong>Important:</strong> All financial projections are targets only and are not guaranteed. 
              Actual results may vary significantly. Your capital is at risk.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
