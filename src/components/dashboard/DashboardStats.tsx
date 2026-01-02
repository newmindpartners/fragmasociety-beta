import { motion } from "framer-motion";
import { TrendingUp, Wallet, BarChart3, Target, Loader2 } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

const formatCurrency = (value: number): string => {
  if (value === 0) return "€0";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(1)}K`;
  }
  return `€${value.toFixed(0)}`;
};

export const DashboardStats = () => {
  const { profile, stats, loading } = useUserProfile();

  // Calculate available balance from wallets
  const availableBalance = profile?.wallets?.reduce(
    (sum, w) => sum + Number(w.balance || 0),
    0
  ) || 0;

  const pendingBalance = profile?.wallets?.reduce(
    (sum, w) => sum + Number(w.pendingBalance || 0),
    0
  ) || 0;

  const totalReturns = stats?.totalReturns || Number(profile?.totalReturns) || 0;
  const activeInvestments = stats?.activeInvestments || profile?.activeInvestments || 0;
  const completedInvestments = stats?.completedInvestments || profile?.completedInvestments || 0;
  const avgReturn = stats?.averageReturn || 0;

  const statsData = [
    {
      icon: TrendingUp,
      label: "Total Returns",
      value: formatCurrency(totalReturns),
      change: totalReturns > 0 ? `+${avgReturn.toFixed(1)}%` : "No returns yet",
    },
    {
      icon: Wallet,
      label: "Available Balance",
      value: formatCurrency(availableBalance),
      change: pendingBalance > 0 ? `${formatCurrency(pendingBalance)} pending` : "Ready to invest",
    },
    {
      icon: BarChart3,
      label: "Active Investments",
      value: activeInvestments.toString(),
      change: `${completedInvestments} completed`,
    },
    {
      icon: Target,
      label: "Avg. Annual Return",
      value: avgReturn > 0 ? `${avgReturn.toFixed(1)}%` : "—",
      change: "Target: 15-25%",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border p-6 shadow-sm animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
              </div>
              <div className="h-3 w-20 bg-muted rounded"></div>
            </div>
            <div className="flex items-end justify-between">
              <div className="h-7 w-16 bg-muted rounded"></div>
              <div className="h-3 w-12 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + index * 0.05 }}
            className="group relative bg-card rounded-xl border border-border p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
            </div>

            <div className="flex items-end justify-between">
              <p className="text-2xl font-serif font-semibold text-foreground tracking-tight">{stat.value}</p>
              <span className="text-[11px] text-muted-foreground font-medium">
                {stat.change}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
