import { TrendingUp, Calendar, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

interface TotalInvestedCardProps {
  totalInvested?: number;
  totalEarnings?: number;
  earningsPercent?: number;
  nextPayoutDays?: number;
  nextPayoutAmount?: number;
}

export const TotalInvestedCard = ({
  totalInvested = 4250,
  totalEarnings = 312.40,
  earningsPercent = 7.3,
  nextPayoutDays = 5,
  nextPayoutAmount = 23.50,
}: TotalInvestedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-3xl h-full min-h-[320px] flex flex-col"
    >
      {/* Background - matching wallet card dark theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
      
      {/* Ambient glow - emerald/green tint for "invested" theme */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[60px] translate-x-1/2" />
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      
      {/* Inner glow border */}
      <div className="absolute inset-0 rounded-3xl border border-white/[0.08]" />
      <div className="absolute inset-[1px] rounded-3xl border border-white/[0.04]" />

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/40 to-teal-500/40 rounded-full blur-md" />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600/80 to-teal-600/80 flex items-center justify-center ring-1 ring-white/10 backdrop-blur-sm">
              <Briefcase className="w-6 h-6 text-white/90" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white tracking-tight">Portfolio</h3>
            <p className="text-xs text-white/40">Your investments</p>
          </div>
        </div>

        {/* Total Invested */}
        <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-2">Total Invested</p>
        <div className="mb-6">
          <p className="text-[2.75rem] font-bold text-white tracking-tight leading-none">
            <span className="text-white/80">€</span>{totalInvested.toLocaleString()}
          </p>
        </div>

        {/* Total Earnings */}
        <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-2">Total Earnings</p>
        <div className="flex items-baseline gap-3 mb-6">
          <p className="text-2xl font-bold text-white tracking-tight">
            <span className="text-white/80">€</span>{totalEarnings.toLocaleString()}
          </p>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium ring-1 ring-emerald-500/30">
            <TrendingUp className="w-3 h-3" />
            +{earningsPercent}%
          </span>
        </div>

        {/* Next Payout */}
        <div className="mt-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-violet-500/15 border border-violet-400/20">
            <Calendar className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300/90 font-medium">
              Next payout: in {nextPayoutDays} days
            </span>
            <span className="text-white/30">·</span>
            <span className="text-sm text-violet-200 font-semibold">
              est. €{nextPayoutAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[12px] text-white/25 mt-5 tracking-wide">
          Since first investment
        </p>
      </div>
    </motion.div>
  );
};
