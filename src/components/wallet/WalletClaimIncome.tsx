import { Info, Sparkles, Calendar, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const WalletClaimIncome = () => {
  const incomeData = {
    earnedThisWeek: 23,
    availableToClaim: 112.45,
    availableAda: 58.23,
    lastClaimed: "$85.10",
    lastClaimedDate: "Apr 13, 2025",
    nextClaim: "6 Days",
    nextClaimDate: "Apr 16, 2025",
  };

  const handleClaimIncome = () => {
    toast.success("Income claimed successfully!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-3xl h-full min-h-[280px] flex flex-col"
    >
      {/* Background with soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-slate-100/60" />
      
      {/* Ambient light spots - soft pastels */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-200/40 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-200/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-1/2 right-0 w-56 h-56 bg-cyan-200/25 rounded-full blur-[60px] translate-x-1/2" />
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      
      {/* Elegant border with inner shadow effect */}
      <div className="absolute inset-0 rounded-3xl border border-slate-200/80" />
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]" />

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/50 to-teal-300/50 rounded-full blur-md" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center ring-1 ring-emerald-200/60 shadow-sm">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <h3 className="font-semibold text-xl text-slate-800 tracking-tight">Claim Income</h3>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-200/80 flex items-center justify-center transition-all duration-300 ring-1 ring-slate-200/60 hover:ring-slate-300/80 shadow-sm">
            <Info className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 flex-1">
          {/* Earned this week */}
          <div className="relative group">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm group-hover:bg-white/80 group-hover:shadow-md group-hover:border-slate-200/80 transition-all duration-300" />
            <div className="relative p-4 flex flex-col h-full">
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500/80" />
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Earned this week</p>
              </div>
              <p className="text-2xl font-bold text-slate-800 tracking-tight">{incomeData.earnedThisWeek}</p>
              <p className="text-xs text-slate-400 mt-1">ADA</p>
            </div>
          </div>

          {/* Available to claim - highlighted */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50/80 rounded-2xl border border-emerald-200/80 shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-100/50 group-hover:border-emerald-300/80 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-4 flex flex-col h-full">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <p className="text-[11px] text-emerald-700 uppercase tracking-wider font-medium">Available to claim</p>
              </div>
              <p className="text-2xl font-bold text-slate-800 tracking-tight">${incomeData.availableToClaim}</p>
              <p className="text-xs text-emerald-600/70 mt-1">≈ {incomeData.availableAda} ADA</p>
            </div>
          </div>

          {/* Last claimed */}
          <div className="relative group">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm group-hover:bg-white/80 group-hover:shadow-md group-hover:border-slate-200/80 transition-all duration-300" />
            <div className="relative p-4 flex flex-col h-full">
              <div className="flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Last claimed</p>
              </div>
              <p className="text-2xl font-bold text-slate-800 tracking-tight">{incomeData.lastClaimed}</p>
              <p className="text-xs text-slate-400 mt-1">{incomeData.lastClaimedDate}</p>
            </div>
          </div>

          {/* Next claim */}
          <div className="relative group">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm group-hover:bg-white/80 group-hover:shadow-md group-hover:border-slate-200/80 transition-all duration-300" />
            <div className="relative p-4 flex flex-col h-full">
              <div className="flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Next claim</p>
              </div>
              <p className="text-2xl font-bold text-slate-800 tracking-tight">{incomeData.nextClaim}</p>
              <p className="text-xs text-slate-400 mt-1">{incomeData.nextClaimDate}</p>
            </div>
          </div>
        </div>

        {/* Claim Button */}
        <button
          onClick={handleClaimIncome}
          className="w-full h-14 mt-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold text-white tracking-wide">Claim Income</span>
        </button>
      </div>
    </motion.div>
  );
};
