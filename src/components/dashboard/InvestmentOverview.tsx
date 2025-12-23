import { motion } from "framer-motion";
import { TrendingUp, Wallet, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InvestmentOverview = () => {
  const portfolioData = {
    invested: 0,
    cash: 0,
    growth: 0,
  };

  const circumference = 2 * Math.PI * 50;
  const investedPercent = portfolioData.invested > 0 
    ? (portfolioData.invested / (portfolioData.invested + portfolioData.cash)) * 100 
    : 0;
  const strokeDashoffset = circumference - (investedPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl border border-slate-200/80 p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Investment & Cash Overview
        </h3>
        <button className="p-1 rounded hover:bg-slate-50 transition-colors">
          <Info className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* Donut Chart */}
      <div className="flex flex-col items-center mb-6 flex-1">
        <div className="relative">
          <svg className="w-36 h-36 -rotate-90">
            {/* Background arc */}
            <circle
              cx="72"
              cy="72"
              r="50"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.75} ${circumference}`}
            />
            {/* Progress arc */}
            <motion.circle
              cx="72"
              cy="72"
              r="50"
              fill="none"
              stroke="#1e293b"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.75} ${circumference}`}
              initial={{ strokeDashoffset: circumference * 0.75 }}
              animate={{ strokeDashoffset: circumference * 0.75 - (investedPercent / 100) * circumference * 0.75 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-3xl font-semibold text-slate-900"
            >
              {portfolioData.growth}%
            </motion.span>
            <span className="text-[10px] text-slate-400 mt-0.5">Your Balance Growth</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500">Invest.</span>
            <span className="text-sm font-semibold text-slate-900">€{portfolioData.invested}</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-2">
            <Wallet className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500">Cash</span>
            <span className="text-sm font-semibold text-slate-900">€{portfolioData.cash}</span>
          </div>
        </div>
      </div>

      {/* Deposit Button */}
      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg h-11 font-medium">
        Deposit
      </Button>
    </motion.div>
  );
};
