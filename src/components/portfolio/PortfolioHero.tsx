import { motion } from "framer-motion";
import { TrendingUp, Wallet, PiggyBank, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Total Invested",
    value: "€125,000",
    icon: Wallet,
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    label: "Total Returns",
    value: "€18,750",
    change: "+15%",
    isPositive: true,
    icon: TrendingUp,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    label: "Pending Payouts",
    value: "€2,340",
    subtitle: "Next: Jan 15",
    icon: PiggyBank,
    iconBg: "bg-amber-500/15",
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
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Main Card - Deep dark navy with studio spotlight */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden group/card"
        whileHover={{ scale: 1.002 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Deep gradient background */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 10% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, hsl(230, 60%, 8%) 0%, hsl(230, 65%, 5%) 50%, hsl(230, 70%, 3%) 100%)
            `
          }}
        />
        
        {/* Animated spotlight on hover */}
        <motion.div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Border glow effect - intensifies on hover */}
        <div className="absolute inset-0 rounded-2xl border border-white/[0.08] group-hover/card:border-white/[0.12] transition-colors duration-500" />
        <div className="absolute inset-[1px] rounded-2xl border border-white/[0.03] group-hover/card:border-white/[0.05] transition-colors duration-500" />
        
        {/* Content */}
        <div className="relative z-10 p-6 lg:p-8">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 flex items-center justify-center shadow-xl shadow-violet-500/30 cursor-pointer">
                  <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-violet-500/40 blur-lg -z-10"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <div>
                <h2 className="text-sm font-semibold text-white/95 tracking-tight">Portfolio Value</h2>
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-xs text-white/40">Updated just now</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 px-4 text-xs rounded-full border-white/10 text-white/70 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white hover:border-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  Export Report
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                className="relative"
              >
                <Button 
                  size="sm" 
                  className="h-9 px-4 text-xs rounded-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-medium shadow-xl shadow-violet-500/25 transition-all duration-300"
                >
                  Add Investment
                </Button>
                <motion.div 
                  className="absolute inset-0 rounded-full bg-violet-500/30 blur-md -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Main Value Display */}
          <div className="mb-8">
            <div className="flex items-baseline gap-4 flex-wrap">
              <motion.h1 
                className="text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                €{totalPortfolioValue.toLocaleString()}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 backdrop-blur-sm cursor-default"
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                </motion.div>
                <span className="text-xs font-bold text-emerald-400">+{portfolioChange}%</span>
              </motion.div>
            </div>
            
            <motion.p 
              className="text-white/40 mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-emerald-400 font-medium">+€18,750</span>
              <span className="ml-1.5">all-time returns</span>
            </motion.p>
          </div>

          {/* Stats Cards - Glassmorphism style with hover effects */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="relative group cursor-default"
                >
                  {/* Card background with subtle glass effect */}
                  <div className="absolute inset-0 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:bg-white/[0.06] group-hover:border-white/[0.12] transition-all duration-300" />
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative p-4">
                    <div className="flex items-center justify-between mb-3">
                      <motion.div 
                        className={`w-9 h-9 rounded-lg ${stat.iconBg} border border-white/[0.08] flex items-center justify-center backdrop-blur-sm group-hover:border-white/[0.15] transition-all duration-300`}
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className={`w-4 h-4 ${stat.iconColor} transition-transform duration-300 group-hover:scale-110`} strokeWidth={1.75} />
                      </motion.div>
                      {stat.change && (
                        <motion.span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400"
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.change}
                        </motion.span>
                      )}
                    </div>
                    
                    <p className="text-xl font-serif font-bold text-white/95 mb-0.5 group-hover:text-white transition-colors duration-300">{stat.value}</p>
                    <p className="text-xs text-white/40 group-hover:text-white/50 transition-colors duration-300">{stat.label}</p>
                    {stat.subtitle && (
                      <p className="text-[10px] text-white/30 mt-0.5">{stat.subtitle}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
