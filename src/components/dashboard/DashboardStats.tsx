import { motion } from "framer-motion";
import { TrendingUp, Wallet, BarChart3, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    label: "Total Returns",
    value: "€0",
    change: "+0%",
    positive: true,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Wallet,
    label: "Available Balance",
    value: "€0",
    change: "Ready to invest",
    positive: true,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    badgeBg: "bg-violet-50 text-violet-600",
  },
  {
    icon: BarChart3,
    label: "Active Investments",
    value: "0",
    change: "0 pending",
    positive: true,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50 text-blue-600",
  },
  {
    icon: Target,
    label: "Avg. Annual Return",
    value: "—",
    change: "Target: 15-25%",
    positive: true,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-50 text-amber-600",
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
            className="group relative bg-white rounded-2xl border border-slate-200/60 p-5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} strokeWidth={1.75} />
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${stat.badgeBg}`}>
                  {stat.change}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
