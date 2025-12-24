import { Wallet, Clock, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EarningsDetailsDrawer } from "./EarningsDetailsDrawer";

interface EarningsAtGlanceProps {
  availableNow: number;
  inProgress: number;
  upcomingThisMonth: number;
  onWithdraw?: () => void;
}

export const EarningsAtGlance = ({
  availableNow = 145.20,
  inProgress = 89.10,
  upcomingThisMonth = 78.10,
  onWithdraw,
}: Partial<EarningsAtGlanceProps>) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const cards = [
    {
      id: "available",
      label: "Available now",
      value: availableNow,
      caption: "Already in your Fragma wallet",
      icon: Wallet,
      color: "emerald",
      action: onWithdraw ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={onWithdraw}
          className="mt-3 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-1 px-0"
        >
          Withdraw <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      ) : null,
    },
    {
      id: "progress",
      label: "In progress",
      value: inProgress,
      caption: "Distributions being processed",
      icon: Clock,
      color: "amber",
      action: (
        <button
          onClick={() => setDetailsOpen(true)}
          className="mt-3 text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
        >
          View details <ChevronRight className="w-3.5 h-3.5" />
        </button>
      ),
    },
    {
      id: "upcoming",
      label: "Upcoming this month",
      value: upcomingThisMonth,
      caption: "Based on your current holdings",
      icon: TrendingUp,
      color: "violet",
      action: null,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; iconBg: string; icon: string; border: string }> = {
      emerald: {
        bg: "from-emerald-50 to-green-50/50",
        iconBg: "bg-emerald-100",
        icon: "text-emerald-600",
        border: "border-emerald-200/60",
      },
      amber: {
        bg: "from-amber-50 to-orange-50/50",
        iconBg: "bg-amber-100",
        icon: "text-amber-600",
        border: "border-amber-200/60",
      },
      violet: {
        bg: "from-violet-50 to-purple-50/50",
        iconBg: "bg-violet-100",
        icon: "text-violet-600",
        border: "border-violet-200/60",
      },
    };
    return colors[color] || colors.violet;
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Your earnings at a glance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => {
            const colors = getColorClasses(card.color);
            const Icon = card.icon;
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-5`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                  {card.label}
                </p>
                
                <p className="text-3xl font-bold text-slate-800 tracking-tight">
                  €{card.value?.toFixed(2)}
                </p>
                
                <p className="text-xs text-slate-500 mt-1">
                  {card.caption}
                </p>
                
                {card.action}
              </motion.div>
            );
          })}
        </div>
      </div>

      <EarningsDetailsDrawer 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen}
        inProgressAmount={inProgress ?? 89.10}
      />
    </>
  );
};
