import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Shield, Target, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    id: 1,
    type: "opportunity",
    icon: Sparkles,
    title: "Diversification Opportunity",
    description: "Your portfolio is 45% in Real Estate. Consider diversifying into other asset classes for better risk management.",
    action: "Explore Deals",
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
    description: "Malibu Sea View Villa is your best performing asset with +26.7% returns this year.",
    action: null,
    priority: "low",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    id: 3,
    type: "action",
    icon: Target,
    title: "Upcoming Milestone",
    description: "You're €6,250 away from reaching €150K portfolio value. Keep investing to hit your goal!",
    action: "Add Investment",
    priority: "high",
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
];

export const PortfolioInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-card rounded-2xl border border-border p-6 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-foreground">Smart Insights</h3>
            <p className="text-sm text-muted-foreground">AI-powered recommendations</p>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`relative p-4 rounded-xl border ${insight.borderColor} ${insight.bgColor.replace('/10', '/5')} hover:${insight.bgColor} transition-colors group`}
            >
              {/* Priority indicator */}
              {insight.priority === "high" && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${insight.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground mb-1">{insight.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                  
                  {insight.action && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`mt-3 h-8 px-3 rounded-full ${insight.color} hover:${insight.bgColor} group/btn`}
                    >
                      {insight.action}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
      >
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-primary" />
          <p className="font-medium text-foreground">Portfolio Health Score</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
            />
          </div>
          <span className="text-lg font-serif font-bold text-foreground">78/100</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Your portfolio is well-balanced. Consider adding more diversification for an optimal score.
        </p>
      </motion.div>
    </motion.div>
  );
};
