import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Shield, Target, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const insights = [
  {
    id: 1,
    type: "opportunity",
    icon: Sparkles,
    title: "Diversification Opportunity",
    description: "Your portfolio is 45% in Real Estate. Consider diversifying into other asset classes.",
    action: "Explore Deals",
    actionLink: "/deals",
    priority: "medium",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    id: 2,
    type: "performance",
    icon: TrendingUp,
    title: "Top Performer",
    description: "Malibu Sea View Villa is your best asset with +26.7% returns this year.",
    action: "View Deal",
    actionLink: "/deal/malibu-villa",
    priority: "low",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    id: 3,
    type: "action",
    icon: Target,
    title: "Upcoming Milestone",
    description: "You're €6,250 away from reaching €150K portfolio value.",
    action: "Add Investment",
    actionLink: "/deals",
    priority: "high",
    color: "text-slate-700",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/20",
  },
];

export const PortfolioInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-card rounded-2xl border border-border p-5 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-serif font-semibold text-foreground">Smart Insights</h3>
            <p className="text-xs text-muted-foreground">AI-powered recommendations</p>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className={`relative p-3.5 rounded-xl border ${insight.borderColor} bg-card hover:bg-muted/30 transition-colors group`}
            >
              {/* Priority indicator */}
              {insight.priority === "high" && (
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${insight.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-0.5">{insight.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                  
                  {insight.action && (
                    <Link to={insight.actionLink}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-7 px-2.5 text-xs rounded-full text-primary hover:bg-primary/10 group/btn"
                      >
                        {insight.action}
                        <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Portfolio Health Score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/10"
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-foreground">Portfolio Health</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
            />
          </div>
          <span className="text-base font-serif font-bold text-foreground">78</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          Well-balanced. Add diversification for optimal score.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="mt-4 flex items-center gap-2">
        <Link to="/deals" className="flex-1">
          <Button variant="outline" size="sm" className="w-full h-8 text-xs rounded-full">
            Browse Deals
          </Button>
        </Link>
        <Link to="/dashboard/settings" className="flex-1">
          <Button variant="outline" size="sm" className="w-full h-8 text-xs rounded-full">
            Settings
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
