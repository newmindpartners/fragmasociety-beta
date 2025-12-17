import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Target, Wallet, AlertTriangle, Sparkles, ArrowUpRight } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealFinancialsProps {
  deal: DealData;
}

export const DealFinancials = ({ deal }: DealFinancialsProps) => {
  if (!deal.financials) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Elegant pattern overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-slate-200 rounded-full blur-3xl opacity-50" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-400" />
            <div className="px-5 py-2 rounded-full bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
              <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-medium">
                Financial Overview
              </span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-400" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] mb-6">
            Financial{" "}
            <span className="italic font-serif bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
              Projections
            </span>
          </h2>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-slate-300 via-violet-400 to-slate-300 mx-auto mb-6" />
          
          <p className="text-lg text-gray-500 max-w-xl mx-auto font-light">
            Target returns and investment scenarios across different market conditions
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Projections - Premium Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            
            {/* Conservative - Dark Navy */}
            {deal.financials.conservativeScenario && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 rounded-3xl shadow-2xl shadow-slate-900/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-10 text-center">
                  {/* Icon */}
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg shadow-slate-900/30 border border-slate-600/50"
                    whileHover={{ rotate: -5 }}
                  >
                    <TrendingDown className="w-7 h-7 text-slate-300" />
                  </motion.div>
                  
                  {/* Label */}
                  <div className="mb-6">
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-1">Conservative</p>
                    <p className="text-xs text-slate-500">Downside Scenario</p>
                  </div>
                  
                  {/* Value */}
                  <div className="relative">
                    <p className="text-4xl font-light text-white mb-2">{deal.financials.conservativeScenario}</p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto" />
                  </div>
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 rounded-b-3xl" />
                </div>
              </motion.div>
            )}

            {/* Base Case - Black with shine */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative md:-mt-4"
            >
              {/* Premium glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-gray-400 via-black to-gray-600 rounded-[28px] opacity-30 blur-sm group-hover:opacity-50 transition-opacity" />
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 rounded-3xl" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl" />
                
                <div className="relative p-12 text-center">
                  {/* Featured badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                      <span className="text-[9px] text-white/70 uppercase tracking-wider">Base Case</span>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center shadow-xl shadow-black/50 border border-gray-700/50"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <Target className="w-9 h-9 text-white" />
                  </motion.div>
                  
                  {/* Label */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Sparkles className="w-3 h-3 text-gray-400" />
                      <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">Projected Profit</p>
                    </div>
                    <p className="text-xs text-gray-500">Target Outcome</p>
                  </div>
                  
                  {/* Value - Hero number */}
                  <div className="relative mb-4">
                    <p className="text-5xl font-light text-white mb-3">{deal.financials.projectedProfit}</p>
                    <div className="flex items-center justify-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-400">IRR: {deal.financials.targetIRR}</p>
                    </div>
                  </div>
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gray-800 via-white/20 to-gray-800 rounded-b-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Optimistic - Violet Gradient */}
            {deal.financials.optimisticScenario && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-400 to-violet-700 rounded-[26px] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900 rounded-3xl" />
                  {/* Inner shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-white/10 rounded-3xl" />
                  
                  <div className="relative p-10 text-center">
                    {/* Icon */}
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/40 border border-violet-400/30"
                      whileHover={{ rotate: 5 }}
                    >
                      <TrendingUp className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    {/* Label */}
                    <div className="mb-6">
                      <p className="text-[10px] text-violet-200 uppercase tracking-[0.3em] mb-1">Optimistic</p>
                      <p className="text-xs text-violet-300/70">Upside Scenario</p>
                    </div>
                    
                    {/* Value */}
                    <div className="relative">
                      <p className="text-4xl font-light text-white mb-2">{deal.financials.optimisticScenario}</p>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-violet-300 to-transparent mx-auto" />
                    </div>
                    
                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-700 via-violet-400 to-violet-700 rounded-b-3xl" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Additional Fund Details - Elegant Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Glass container */}
            <div className="relative backdrop-blur-sm bg-white/70 rounded-3xl border border-gray-200/50 shadow-xl shadow-gray-200/30 overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
              
              <div className="p-10">
                <div className="flex items-center justify-center gap-3 mb-10">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">Fund Metrics</p>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {deal.financials.portfolioTarget && (
                    <motion.div 
                      className="text-center group"
                      whileHover={{ y: -3 }}
                    >
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200 group-hover:shadow-lg transition-shadow">
                        <Wallet className="w-5 h-5 text-gray-600" />
                      </div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-2">Portfolio Target</p>
                      <p className="text-xl font-light text-slate-900">{deal.financials.portfolioTarget}</p>
                    </motion.div>
                  )}
                  {deal.financials.resaleTarget && (
                    <motion.div 
                      className="text-center group"
                      whileHover={{ y: -3 }}
                    >
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200 group-hover:shadow-lg transition-shadow">
                        <TrendingUp className="w-5 h-5 text-gray-600" />
                      </div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-2">Resale Target</p>
                      <p className="text-xl font-light text-slate-900">{deal.financials.resaleTarget}</p>
                    </motion.div>
                  )}
                  {deal.financials.fundSize && (
                    <motion.div 
                      className="text-center group"
                      whileHover={{ y: -3 }}
                    >
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200 group-hover:shadow-lg transition-shadow">
                        <DollarSign className="w-5 h-5 text-gray-600" />
                      </div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-2">Fund Size</p>
                      <p className="text-xl font-light text-slate-900">{deal.financials.fundSize}</p>
                    </motion.div>
                  )}
                  <motion.div 
                    className="text-center group"
                    whileHover={{ y: -3 }}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center border border-violet-200 group-hover:shadow-lg group-hover:shadow-violet-200/50 transition-shadow">
                      <Target className="w-5 h-5 text-violet-600" />
                    </div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-2">Target IRR</p>
                    <p className="text-xl font-light text-violet-700">{deal.financials.targetIRR}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer - Refined */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-start gap-4 p-6 rounded-2xl bg-gray-100/50 border border-gray-200/50"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">Important Disclosure</p>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                All financial projections are targets only and are not guaranteed. 
                Actual results may vary significantly based on market conditions. Your capital is at risk.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </section>
  );
};
