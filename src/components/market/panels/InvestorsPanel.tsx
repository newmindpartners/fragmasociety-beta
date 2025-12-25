import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Wallet, Clock, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const topInvestors = [
  { rank: 1, name: "W****5", shares: 12500, percentage: 8.2, joinedDate: "Jan 2024" },
  { rank: 2, name: "M****3", shares: 9800, percentage: 6.4, joinedDate: "Feb 2024" },
  { rank: 3, name: "K****7", shares: 7200, percentage: 4.7, joinedDate: "Jan 2024" },
  { rank: 4, name: "J****9", shares: 5100, percentage: 3.3, joinedDate: "Mar 2024" },
  { rank: 5, name: "T****2", shares: 4500, percentage: 2.9, joinedDate: "Feb 2024" },
];

const investorStats = [
  { label: "Total Investors", value: "419", change: "+12", icon: Users },
  { label: "Avg. Holding Size", value: "$2,340", change: "+8%", icon: Wallet },
  { label: "Avg. Hold Time", value: "6.2 mo", change: "", icon: Clock },
  { label: "Top 10 Holders", value: "42%", change: "-3%", icon: Award },
];

export const InvestorsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {investorStats.map((stat) => (
          <Card key={stat.label} className="p-4 border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              {stat.change && (
                <span className={`text-xs font-medium ${stat.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {stat.change}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Top Investors Table */}
      <Card className="border-border/50 overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Top Shareholders
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Largest token holders by ownership percentage</p>
        </div>
        
        <div className="divide-y divide-border/50">
          {topInvestors.map((investor, index) => (
            <motion.div
              key={investor.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                investor.rank === 1 ? 'bg-yellow-500/20 text-yellow-600' :
                investor.rank === 2 ? 'bg-slate-300/30 text-slate-600' :
                investor.rank === 3 ? 'bg-orange-500/20 text-orange-600' :
                'bg-muted text-muted-foreground'
              }`}>
                {investor.rank}
              </div>

              {/* Investor Info */}
              <div className="flex-1">
                <p className="font-medium text-foreground font-mono">{investor.name}</p>
                <p className="text-xs text-muted-foreground">Joined {investor.joinedDate}</p>
              </div>

              {/* Shares */}
              <div className="text-right">
                <p className="font-semibold text-foreground tabular-nums">
                  {investor.shares.toLocaleString()} shares
                </p>
                <p className="text-xs text-muted-foreground">{investor.percentage}% ownership</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Distribution Chart Placeholder */}
      <Card className="p-6 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Ownership Distribution
        </h3>
        <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg border border-dashed border-border">
          <p className="text-sm text-muted-foreground">Distribution chart coming soon</p>
        </div>
      </Card>
    </motion.div>
  );
};
