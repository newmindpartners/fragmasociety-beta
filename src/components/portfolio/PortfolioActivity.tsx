import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, CheckCircle, Clock, FileText } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "payout",
    title: "Dividend Received",
    description: "Palisades Rebuild Fund",
    amount: "+€625",
    date: "Today, 10:30 AM",
    status: "completed",
    icon: ArrowDownLeft,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: 2,
    type: "investment",
    title: "Investment Completed",
    description: "Music Royalty Portfolio",
    amount: "-€10,000",
    date: "Dec 20, 2024",
    status: "completed",
    icon: ArrowUpRight,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 3,
    type: "reinvest",
    title: "Auto-Reinvestment",
    description: "Film Production Fund III",
    amount: "€500",
    date: "Dec 15, 2024",
    status: "completed",
    icon: RefreshCw,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 4,
    type: "document",
    title: "Tax Document Ready",
    description: "2024 Annual Statement",
    amount: null,
    date: "Dec 10, 2024",
    status: "action_required",
    icon: FileText,
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 5,
    type: "payout",
    title: "Dividend Received",
    description: "Malibu Sea View Villa",
    amount: "+€475",
    date: "Dec 5, 2024",
    status: "completed",
    icon: ArrowDownLeft,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
];

export const PortfolioActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl border border-border p-6 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Your latest transactions</p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${activity.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-5 h-5 ${activity.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground truncate">{activity.title}</p>
                  {activity.status === "completed" && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  )}
                  {activity.status === "action_required" && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                      Action
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  <span className="text-muted-foreground/50">•</span>
                  <p className="text-xs text-muted-foreground flex-shrink-0">{activity.date}</p>
                </div>
              </div>

              {/* Amount */}
              {activity.amount && (
                <p className={`font-semibold flex-shrink-0 ${
                  activity.amount.startsWith('+') ? 'text-emerald-600' : 'text-foreground'
                }`}>
                  {activity.amount}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
