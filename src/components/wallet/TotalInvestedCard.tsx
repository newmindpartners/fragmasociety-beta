import { TrendingUp, Calendar, Briefcase, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { EarningsDetailsDrawer } from "./EarningsDetailsDrawer";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface TotalInvestedCardProps {
  totalInvested?: number;
  totalEarnings?: number;
  earningsPercent?: number;
  nextPayoutDays?: number;
  nextPayoutAmount?: number;
  inProgress?: number;
  upcomingThisMonth?: number;
}

export const TotalInvestedCard = ({
  totalInvested = 4250,
  totalEarnings = 312.40,
  earningsPercent = 7.3,
  nextPayoutDays = 5,
  nextPayoutAmount = 23.50,
  inProgress = 89.10,
  upcomingThisMonth = 78.10,
}: TotalInvestedCardProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-3xl h-full min-h-[320px] flex flex-col"
      >
        {/* Background - matching wallet card dark theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        
        {/* Ambient glow - violet tint for "invested" theme */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[60px] translate-x-1/2" />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        
        {/* Inner glow border */}
        <div className="absolute inset-0 rounded-3xl border border-white/[0.08]" />
        <div className="absolute inset-[1px] rounded-3xl border border-white/[0.04]" />

        {/* Content */}
        <div className="relative z-10 p-7 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/40 to-purple-500/40 rounded-full blur-md" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-violet-600/80 to-purple-600/80 flex items-center justify-center ring-1 ring-white/10 backdrop-blur-sm">
                <Briefcase className="w-6 h-6 text-white/90" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white tracking-tight">Portfolio</h3>
              <p className="text-xs text-white/40">Your investments</p>
            </div>
          </div>

          {/* Total Invested */}
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs text-white/40 uppercase tracking-wider font-medium">Total Invested</p>
            <InfoTooltip 
              content="The total amount you have invested across all active deals in your portfolio." 
              iconClassName="text-white/30 hover:text-white/60 w-3 h-3"
              className="hover:bg-white/10"
            />
          </div>
          <div className="mb-4">
            <p className="text-[2.5rem] font-bold text-white tracking-tight leading-none">
              <span className="text-white/80">€</span>{totalInvested.toLocaleString()}
            </p>
          </div>

          {/* Total Earnings */}
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs text-white/40 uppercase tracking-wider font-medium">Total Earnings</p>
            <InfoTooltip 
              content="Your cumulative earnings from all investments, including dividends and capital gains." 
              iconClassName="text-white/30 hover:text-white/60 w-3 h-3"
              className="hover:bg-white/10"
            />
          </div>
          <div className="flex items-baseline gap-3 mb-4">
            <p className="text-xl font-bold text-white tracking-tight">
              <span className="text-white/80">€</span>{totalEarnings.toLocaleString()}
            </p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium ring-1 ring-emerald-500/30">
              <TrendingUp className="w-3 h-3" />
              +{earningsPercent}%
            </span>
          </div>

          {/* In Progress & Upcoming Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* In Progress */}
            <button
              onClick={() => setDetailsOpen(true)}
              className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-3 border border-amber-500/20 hover:bg-white/[0.08] transition-all text-left group"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-md bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-[10px] text-amber-400/80 uppercase tracking-wider font-medium">In Progress</span>
                <InfoTooltip 
                  content="Earnings currently being processed. These will be available in your wallet soon." 
                  iconClassName="text-amber-400/50 hover:text-amber-400 w-2.5 h-2.5"
                  className="hover:bg-amber-500/20 ml-auto"
                  side="top"
                />
              </div>
              <p className="text-lg font-bold text-white">€{inProgress.toFixed(2)}</p>
              <div className="flex items-center gap-0.5 mt-1">
                <span className="text-[10px] text-white/40">View details</span>
                <ChevronRight className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
            </button>

            {/* Upcoming */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-3 border border-emerald-500/20">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-medium">Upcoming</span>
                <InfoTooltip 
                  content="Expected earnings scheduled for this month based on your active investments." 
                  iconClassName="text-emerald-400/50 hover:text-emerald-400 w-2.5 h-2.5"
                  className="hover:bg-emerald-500/20 ml-auto"
                  side="top"
                />
              </div>
              <p className="text-lg font-bold text-white">€{upcomingThisMonth.toFixed(2)}</p>
              <span className="text-[10px] text-white/40">This month</span>
            </div>
          </div>

          {/* Next Payout */}
          <div className="mt-auto">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-violet-500/15 border border-violet-400/20">
              <Calendar className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs text-violet-300/90 font-medium">
                Next: in {nextPayoutDays} days
              </span>
              <span className="text-white/30">·</span>
              <span className="text-xs text-violet-200 font-semibold">
                est. €{nextPayoutAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <EarningsDetailsDrawer 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen}
        inProgressAmount={inProgress}
      />
    </>
  );
};