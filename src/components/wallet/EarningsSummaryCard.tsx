import { TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface EarningsSummaryCardProps {
  totalInvested: number;
  totalEarnings: number;
  earningsPercent: number;
  nextPayoutDays: number;
  nextPayoutAmount: number;
}

export const EarningsSummaryCard = ({
  totalInvested = 4250,
  totalEarnings = 312.40,
  earningsPercent = 7.3,
  nextPayoutDays = 5,
  nextPayoutAmount = 23.50,
}: Partial<EarningsSummaryCardProps>) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-3xl"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-[60px]" />
      
      {/* Border */}
      <div className="absolute inset-0 rounded-3xl border border-white/10" />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Stats Row */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mb-6">
          {/* Total Invested */}
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
              Total invested
            </p>
            <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              €{totalInvested?.toLocaleString()}
            </p>
          </div>

          {/* Total Earnings */}
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
              Total earnings
            </p>
            <div className="flex items-baseline gap-3">
              <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                €{totalEarnings?.toLocaleString()}
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                +{earningsPercent}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">since first investment</p>
          </div>
        </div>

        {/* Next Payout Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-violet-500/20 border border-violet-400/30">
          <Calendar className="w-4 h-4 text-violet-400" />
          <span className="text-sm text-violet-200 font-medium">
            Next payout: in {nextPayoutDays} days
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-sm text-violet-300 font-semibold">
            est. €{nextPayoutAmount?.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
