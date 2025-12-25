import { Film, Building2, Music, TrendingUp, ChevronRight, Check, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PayoutDetailDrawer } from "./PayoutDetailDrawer";
import { InfoTooltip } from "@/components/ui/info-tooltip";

type PayoutStatus = "paid" | "processing" | "upcoming";

interface Payout {
  id: string;
  category: "film" | "realestate" | "music" | "other";
  title: string;
  status: PayoutStatus;
  amount: number;
  date?: string;
  method?: "auto-claimed" | "withdrawn" | "manual";
}

interface RecentPayoutsProps {
  onViewAll?: () => void;
}

export const RecentPayouts = ({ onViewAll }: RecentPayoutsProps) => {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  const payouts: Payout[] = [
    {
      id: "1",
      category: "film",
      title: "Film Fund – September earnings",
      status: "paid",
      amount: 27.30,
      date: "03 Oct",
      method: "auto-claimed",
    },
    {
      id: "2",
      category: "realestate",
      title: "Malibu Villa – Q3 distribution",
      status: "processing",
      amount: 45.80,
    },
    {
      id: "3",
      category: "music",
      title: "Music Rights – August royalties",
      status: "paid",
      amount: 18.50,
      date: "28 Sep",
      method: "withdrawn",
    },
    {
      id: "4",
      category: "film",
      title: "Film Fund – October earnings",
      status: "upcoming",
      amount: 23.50,
    },
  ];

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, typeof Film> = {
      film: Film,
      realestate: Building2,
      music: Music,
      other: TrendingUp,
    };
    return icons[category] || icons.other;
  };

  const getStatusConfig = (status: PayoutStatus) => {
    const configs = {
      paid: {
        label: "Paid",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        icon: Check,
      },
      processing: {
        label: "Processing",
        bg: "bg-amber-100",
        text: "text-amber-700",
        icon: Clock,
      },
      upcoming: {
        label: "Upcoming",
        bg: "bg-violet-100",
        text: "text-violet-700",
        icon: Clock,
      },
    };
    return configs[status];
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-800">Recent payouts</h3>
            <InfoTooltip 
              content="Your latest earnings and distributions from active investments. Click on any payout for detailed transaction information."
              side="right"
            />
          </div>
          {onViewAll && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewAll}
              className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 gap-1"
            >
              View all earnings <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {payouts.map((payout, index) => {
            const Icon = getCategoryIcon(payout.category);
            const statusConfig = getStatusConfig(payout.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.button
                key={payout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedPayout(payout)}
                className="w-full bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  {/* Category Icon */}
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>

                  {/* Title & Status */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{payout.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                      {payout.date && payout.method && (
                        <span className="text-xs text-slate-400">
                          Paid on {payout.date} · {payout.method === "auto-claimed" ? "Auto-claimed" : "Withdrawn"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-semibold ${payout.status === "paid" ? "text-emerald-600" : "text-slate-700"}`}>
                      +€{payout.amount.toFixed(2)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <PayoutDetailDrawer
        open={!!selectedPayout}
        onOpenChange={(open) => !open && setSelectedPayout(null)}
        payout={selectedPayout}
      />
    </>
  );
};
