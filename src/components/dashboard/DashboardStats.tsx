import { motion } from "framer-motion";
import { TrendingUp, Wallet, BarChart3, Target } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    label: "Total Returns",
    value: "€0",
    change: "+0%",
  },
  {
    icon: Wallet,
    label: "Available Balance",
    value: "€0",
    change: "Ready to invest",
  },
  {
    icon: BarChart3,
    label: "Active Investments",
    value: "0",
    change: "0 pending",
  },
  {
    icon: Target,
    label: "Avg. Annual Return",
    value: "—",
    change: "Target: 15-25%",
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + index * 0.05 }}
            className="group relative bg-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all duration-300"
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
