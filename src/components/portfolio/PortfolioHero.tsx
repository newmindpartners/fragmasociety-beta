import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Total Invested",
    value: "€125,000",
    icon: Wallet,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Total Returns",
    value: "€18,750",
    change: "+15%",
    isPositive: true,
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Pending Payouts",
    value: "€2,340",
    subtitle: "Next: Jan 15",
    icon: PiggyBank,
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
];

export const PortfolioHero = () => {
  const totalPortfolioValue = 143750;
  const portfolioChange = 15.0;
  const isPositive = portfolioChange > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      {/* Main Value Card */}
      <div className="relative rounded-2xl border border-border bg-card p-8 lg:p-10 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10">
          {/* Top Row - Portfolio Label & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Portfolio Value</p>
                <p className="text-xs text-muted-foreground/70">Updated just now</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full h-9 px-5">
                Export Report
              </Button>
              <Button size="sm" className="rounded-full h-9 px-5 bg-primary hover:bg-primary/90">
                Add Investment
              </Button>
            </div>
          </div>

          {/* Main Value Display */}
          <div className="mb-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="flex items-baseline gap-4 flex-wrap"
            >
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground tracking-tight">
                €{totalPortfolioValue.toLocaleString()}
              </h2>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  isPositive 
                    ? 'bg-emerald-500/10 text-emerald-600' 
                    : 'bg-red-500/10 text-red-600'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {isPositive ? '+' : ''}{portfolioChange}%
              </motion.div>
            </motion.div>
            <p className="text-muted-foreground mt-2">
              <span className="text-emerald-600 font-medium">+€18,750</span> all-time returns
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group relative bg-background/50 rounded-xl border border-border/50 p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    {stat.change && (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        stat.isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-serif font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-muted-foreground/70 mt-1">{stat.subtitle}</p>
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
