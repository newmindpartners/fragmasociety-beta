import { motion } from "framer-motion";
import { TrendingUp, Wallet, PiggyBank, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Total Invested",
    value: "€125,000",
    icon: Wallet,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    label: "Total Returns",
    value: "€18,750",
    change: "+15%",
    isPositive: true,
    icon: TrendingUp,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    label: "Pending Payouts",
    value: "€2,340",
    subtitle: "Next: Jan 15",
    icon: PiggyBank,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
];

export const PortfolioHero = () => {
  const totalPortfolioValue = 143750;
  const portfolioChange = 15.0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Main Card - Dark themed, compact */}
      <div className="relative rounded-xl border border-white/10 bg-[hsl(225,65%,8%)] overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 p-5 lg:p-6">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Portfolio Value</h2>
                <p className="text-xs text-white/50">Updated just now</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-4 text-xs rounded-full border-violet-400/50 text-violet-300 bg-transparent hover:bg-violet-500/10"
              >
                Export Report
              </Button>
              <Button 
                size="sm" 
                className="h-8 px-4 text-xs rounded-full bg-violet-500 hover:bg-violet-600 text-white shadow-lg shadow-violet-500/25"
              >
                Add Investment
              </Button>
            </div>
          </div>

          {/* Main Value Display */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-none">
                €{totalPortfolioValue.toLocaleString()}
              </h1>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span className="text-xs font-bold">+{portfolioChange}%</span>
              </div>
            </div>
            
            <p className="text-white/50 mt-1.5 text-sm">
              <span className="text-emerald-400 font-medium">+€18,750</span>
              <span className="ml-1">all-time returns</span>
            </p>
          </div>

          {/* Stats Cards - Compact */}
          <div className="grid grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-[hsl(225,65%,8%)] p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${stat.iconColor}`} strokeWidth={1.75} />
                    </div>
                    {stat.change && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xl font-serif font-bold text-white mb-0.5">{stat.value}</p>
                  <p className="text-xs text-white/50">{stat.label}</p>
                  {stat.subtitle && (
                    <p className="text-[10px] text-white/40 mt-0.5">{stat.subtitle}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
