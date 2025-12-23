import { motion } from "framer-motion";
import { Info, TrendingUp, Wallet, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InvestmentOverview = () => {
  const portfolioData = {
    invested: 0,
    cash: 0,
    growth: 0,
  };

  // Calculate stroke-dashoffset for donut chart animation
  const circumference = 2 * Math.PI * 60;
  const investedPercent = portfolioData.invested > 0 
    ? (portfolioData.invested / (portfolioData.invested + portfolioData.cash)) * 100 
    : 0;
  const strokeDashoffset = circumference - (investedPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 font-sans">
            Investment & Cash Overview
          </h3>
          <p className="text-sm text-slate-500 mt-1">Track your portfolio balance</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Info className="w-4 h-4 text-slate-400" />
        </motion.button>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center gap-8 mb-6">
        <div className="relative">
          <svg className="w-36 h-36 -rotate-90">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r="60"
              fill="none"
              stroke="hsl(var(--slate-100, 210 40% 96.1%))"
              strokeWidth="12"
              className="text-slate-100"
              style={{ stroke: '#f1f5f9' }}
            />
            {/* Progress circle */}
            <motion.circle
              cx="72"
              cy="72"
              r="60"
              fill="none"
              stroke="url(#gradientProgress)"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradientProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(262 84% 64%)" />
                <stop offset="100%" stopColor="hsl(222 90% 66%)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-3xl font-bold text-slate-900"
            >
              {portfolioData.growth}%
            </motion.span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-slate-500">Your Balance Growth</span>
              <Info className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-slate-600">Invest.</span>
            </div>
            <span className="text-lg font-bold text-slate-900">€{portfolioData.invested.toLocaleString()}</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-sm font-medium text-slate-600">Cash</span>
            </div>
            <span className="text-lg font-bold text-slate-900">€{portfolioData.cash.toLocaleString()}</span>
          </motion.div>
        </div>
      </div>

      {/* Deposit Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 group">
          <PiggyBank className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Deposit
        </Button>
      </motion.div>
    </motion.div>
  );
};
