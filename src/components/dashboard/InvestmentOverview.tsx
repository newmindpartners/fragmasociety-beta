import { motion } from "framer-motion";
import { Info, TrendingUp, Wallet, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InvestmentOverview = () => {
  const portfolioData = {
    invested: 0,
    cash: 0,
    growth: 0,
  };

  const circumference = 2 * Math.PI * 54;
  const investedPercent = portfolioData.invested > 0 
    ? (portfolioData.invested / (portfolioData.invested + portfolioData.cash)) * 100 
    : 0;
  const strokeDashoffset = circumference - (investedPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Investment & Cash Overview
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Track your portfolio balance</p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
          <Info className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative flex-shrink-0">
          <svg className="w-32 h-32 -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-2xl font-bold text-slate-900"
            >
              {portfolioData.growth}%
            </motion.span>
            <span className="text-[10px] text-slate-400 font-medium">Balance Growth</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-200/60 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-500">Invested</span>
            </div>
            <span className="text-base font-bold text-slate-900">€{portfolioData.invested.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/60 flex items-center justify-center">
                <Wallet className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-slate-500">Cash</span>
            </div>
            <span className="text-base font-bold text-slate-900">€{portfolioData.cash.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Deposit Button */}
      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 font-medium transition-all duration-200 group">
        <PiggyBank className="w-4 h-4 mr-2 group-hover:scale-105 transition-transform" />
        Deposit
      </Button>
    </motion.div>
  );
};
