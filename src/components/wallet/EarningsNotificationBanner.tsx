import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Coins, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface EarningsNotification {
  id: string;
  dealName: string;
  amount: number;
  period: string;
  isNew: boolean;
}

interface EarningsNotificationBannerProps {
  notifications?: EarningsNotification[];
  onViewEarnings?: (notification: EarningsNotification) => void;
  onReinvest?: (notification: EarningsNotification) => void;
  onDismiss?: (id: string) => void;
}

const mockNotifications: EarningsNotification[] = [
  {
    id: "1",
    dealName: "Santexpat.fr",
    amount: 45.20,
    period: "Q4 2024",
    isNew: true,
  },
];

export const EarningsNotificationBanner = ({
  notifications = mockNotifications,
  onViewEarnings,
  onReinvest,
  onDismiss,
}: EarningsNotificationBannerProps) => {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const visibleNotifications = notifications.filter(
    (n) => n.isNew && !dismissedIds.includes(n.id)
  );

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => [...prev, id]);
    onDismiss?.(id);
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {visibleNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 25 }}
            className="relative overflow-hidden rounded-2xl"
          >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]" />
            
            {/* Animated spotlight glows */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/30 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-[50px]" />
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-fuchsia-500/15 rounded-full blur-[40px]" />
            
            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-violet-400/20" />
            
            {/* Content */}
            <div className="relative z-10 px-5 py-4 flex items-center gap-4">
              {/* Icon */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-emerald-400/40 rounded-full blur-md animate-pulse" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center ring-2 ring-emerald-400/30">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <Coins className="w-3 h-3" />
                    New Earnings
                  </span>
                </div>
                <p className="text-white font-semibold">
                  You received <span className="text-emerald-400">€{notification.amount.toFixed(2)}</span> from {notification.dealName}
                </p>
                <p className="text-xs text-violet-300/70 mt-0.5">
                  {notification.period} distribution • Just now
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  onClick={() => onViewEarnings?.(notification)}
                  className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm text-xs font-medium px-4"
                >
                  View Earnings
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => onReinvest?.(notification)}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 text-xs font-medium px-4"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Reinvest
                </Button>
                <InfoTooltip 
                  content="Reinvest your earnings into the same or different deals to compound your returns."
                  iconClassName="text-white/40 hover:text-white/70 w-3 h-3"
                  className="hover:bg-white/10"
                  side="left"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => handleDismiss(notification.id)}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
