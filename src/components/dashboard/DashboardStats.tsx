import { motion } from "framer-motion";
import { TrendingUp, Wallet, BarChart3, Target } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    label: "Total Returns",
    value: "€0",
    change: "+0%",
    positive: true,
    color: "from-emerald-500/10 to-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  {
    icon: Wallet,
    label: "Available Balance",
    value: "€0",
    change: "Ready to invest",
    positive: true,
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: BarChart3,
    label: "Active Investments",
    value: "0",
    change: "0 pending",
    positive: true,
    color: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Target,
    label: "Avg. Annual Return",
    value: "—",
    change: "Target: 15-25%",
    positive: true,
    color: "from-amber-500/10 to-amber-500/5",
    iconColor: "text-amber-500",
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
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -2, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
            className="group relative bg-white rounded-2xl border border-slate-200/60 p-5 overflow-hidden cursor-pointer transition-all duration-300"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} strokeWidth={1.5} />
                </motion.div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}>
                  {stat.change}
                </span>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>

            {/* Hover decoration */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.1 }}
              className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color.replace('/10', '/30').replace('/5', '/20')}`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
