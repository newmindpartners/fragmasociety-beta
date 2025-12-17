import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Target, Wallet, AlertTriangle } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealFinancialsProps {
  deal: DealData;
}

export const DealFinancials = ({ deal }: DealFinancialsProps) => {
  if (!deal.financials) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-slate-800">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 100px)'
        }} 
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-slate-600" />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
              Financial Overview
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
            Financial <span className="italic text-slate-400 font-serif">Projections</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl font-light">
            Target returns and investment scenarios
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main Projections Grid */}
          <div className="grid md:grid-cols-3 gap-px bg-slate-600/50 mb-16">
            {/* Conservative */}
            {deal.financials.conservativeScenario && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800 p-10 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-6 border border-slate-600 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-slate-500" />
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2">Conservative</p>
                <p className="text-xs text-slate-400 mb-4">Downside Scenario</p>
                <p className="text-3xl font-light text-slate-300">{deal.financials.conservativeScenario}</p>
              </motion.div>
            )}

            {/* Base Case */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-700 p-10 text-center border-x border-slate-600/50"
            >
              <div className="w-14 h-14 mx-auto mb-6 bg-slate-600/50 border border-slate-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2">Base Case</p>
              <p className="text-xs text-slate-300 mb-4">Projected Profit</p>
              <p className="text-4xl font-light text-white mb-2">{deal.financials.projectedProfit}</p>
              <p className="text-sm text-slate-400">Target IRR: {deal.financials.targetIRR}</p>
            </motion.div>

            {/* Optimistic */}
            {deal.financials.optimisticScenario && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-slate-800 p-10 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-6 border border-slate-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-slate-500" />
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2">Optimistic</p>
                <p className="text-xs text-slate-400 mb-4">Upside Scenario</p>
                <p className="text-3xl font-light text-slate-300">{deal.financials.optimisticScenario}</p>
              </motion.div>
            )}
          </div>

          {/* Additional Fund Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border-t border-b border-slate-600/50 py-12"
          >
            <div className="grid md:grid-cols-4 gap-12">
              {deal.financials.portfolioTarget && (
                <div className="text-center">
                  <Wallet className="w-5 h-5 text-slate-500 mx-auto mb-3" />
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2">Portfolio Target</p>
                  <p className="text-xl font-light text-white">{deal.financials.portfolioTarget}</p>
                </div>
              )}
              {deal.financials.resaleTarget && (
                <div className="text-center">
                  <TrendingUp className="w-5 h-5 text-slate-500 mx-auto mb-3" />
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2">Resale Target</p>
                  <p className="text-xl font-light text-white">{deal.financials.resaleTarget}</p>
                </div>
              )}
              {deal.financials.fundSize && (
                <div className="text-center">
                  <DollarSign className="w-5 h-5 text-slate-500 mx-auto mb-3" />
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2">Fund Size</p>
                  <p className="text-xl font-light text-white">{deal.financials.fundSize}</p>
                </div>
              )}
              <div className="text-center">
                <Target className="w-5 h-5 text-slate-500 mx-auto mb-3" />
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2">Target IRR</p>
                <p className="text-xl font-light text-white">{deal.financials.targetIRR}</p>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-start gap-4 p-6 border border-slate-600/50"
          >
            <AlertTriangle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              <strong className="text-slate-300">Important:</strong> All financial projections are targets only and are not guaranteed. 
              Actual results may vary significantly. Your capital is at risk.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
