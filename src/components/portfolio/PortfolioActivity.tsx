import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const activities = [
  {
    id: 1,
    type: "payout",
    title: "Dividend Received",
    description: "Palisades Rebuild Fund",
    dealId: "palisades-rebuild",
    amount: "+€625",
    date: "Today, 10:30 AM",
    status: "completed",
    icon: ArrowDownLeft,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    type: "investment",
    title: "Investment Completed",
    description: "Music Royalty Portfolio",
    dealId: "music-rights-portfolio",
    amount: "-€10,000",
    date: "Dec 20, 2024",
    status: "completed",
    icon: ArrowUpRight,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 3,
    type: "reinvest",
    title: "Auto-Reinvestment",
    description: "Film Production Fund III",
    dealId: "film-production-fund",
    amount: "€500",
    date: "Dec 15, 2024",
    status: "completed",
    icon: RefreshCw,
    color: "text-slate-600",
    bgColor: "bg-slate-500/10",
  },
  {
    id: 4,
    type: "document",
    title: "Tax Document Ready",
    description: "2024 Annual Statement",
    dealId: null,
    amount: null,
    date: "Dec 10, 2024",
    status: "action_required",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 5,
    type: "payout",
    title: "Dividend Received",
    description: "Malibu Sea View Villa",
    dealId: "malibu-villa",
    amount: "+€475",
    date: "Dec 5, 2024",
    status: "completed",
    icon: ArrowDownLeft,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const ActivityItem = ({ activity }: { activity: typeof activities[0] }) => {
  const Icon = activity.icon;
  
  const content = (
    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
      <div className={`w-9 h-9 rounded-lg ${activity.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
        <Icon className={`w-4 h-4 ${activity.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{activity.title}</p>
          {activity.status === "completed" && (
            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
          )}
          {activity.status === "action_required" && (
            <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
              Action
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
          <span className="text-muted-foreground/30">•</span>
          <p className="text-[10px] text-muted-foreground flex-shrink-0">{activity.date}</p>
        </div>
      </div>
      {activity.amount && (
        <p className={`text-sm font-semibold flex-shrink-0 ${
          activity.amount.startsWith('+') ? 'text-primary' : 'text-foreground'
        }`}>
          {activity.amount}
        </p>
      )}
    </div>
  );

  if (activity.dealId) {
    return <Link to={`/deal/${activity.dealId}`}>{content}</Link>;
  }
  return content;
};

export const PortfolioActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl border border-border p-5 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-serif font-semibold text-foreground">Recent Activity</h3>
          <p className="text-xs text-muted-foreground">Your latest transactions</p>
        </div>
        <Link 
          to="/dashboard/wallet" 
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Activity List */}
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.03 }}
          >
            <ActivityItem activity={activity} />
          </motion.div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
        <Link to="/dashboard/wallet">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            Wallet
          </motion.button>
        </Link>
        <Link to="/dashboard/documents">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            Documents
          </motion.button>
        </Link>
        <Link to="/dashboard/earnings">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            Earnings
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};
