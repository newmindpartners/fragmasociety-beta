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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Main Card - Dark themed */}
      <div className="relative rounded-2xl border border-white/10 bg-[hsl(225,65%,8%)] overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 p-8 lg:p-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="relative"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Sparkles className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-violet-500/30 blur-xl -z-10" />
              </motion.div>
              <div>
                <h2 className="text-base font-semibold text-white tracking-tight">Portfolio Value</h2>
                <p className="text-sm text-white/60">Updated just now</p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 px-5 rounded-full border-violet-400/50 text-violet-300 bg-transparent hover:bg-violet-500/10 font-medium"
              >
                Export Report
              </Button>
              <Button 
                size="sm" 
                className="h-10 px-5 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-medium shadow-lg shadow-violet-500/30"
              >
                Add Investment
              </Button>
            </motion.div>
          </div>

          {/* Main Value Display */}
          <div className="mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-baseline gap-5 flex-wrap"
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-none">
                €{totalPortfolioValue.toLocaleString()}
              </h1>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400"
              >
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-sm font-bold">+{portfolioChange}%</span>
              </motion.div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/60 mt-3 text-base"
            >
              <span className="text-emerald-400 font-semibold">+€18,750</span>
              <span className="ml-1">all-time returns</span>
            </motion.p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08, duration: 0.5 }}
                  className="group relative bg-[hsl(225,65%,8%)] p-6 hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center backdrop-blur-sm`}
                    >
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} strokeWidth={1.75} />
                    </motion.div>
                    {stat.change && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-3xl font-serif font-bold text-white mb-1 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-white/60">{stat.label}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-white/40 mt-1">{stat.subtitle}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
