import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Mail,
  Smartphone,
  Monitor,
  Building2,
  Wallet,
  FileText,
  AlertCircle,
  Gift,
  Settings2,
  X,
  Check,
  Sparkles,
  Shield,
  TrendingUp
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NotificationPreferencesPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NotificationCategory {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface ChannelPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

type CategoryPreferences = Record<string, ChannelPreferences>;

const categories: NotificationCategory[] = [
  {
    id: "investments",
    label: "Investments",
    description: "New deals, confirmations, milestones",
    icon: Building2,
    color: "text-violet-600",
    bgColor: "bg-violet-100"
  },
  {
    id: "payouts",
    label: "Payouts & Earnings",
    description: "Distributions, dividends, rewards",
    icon: Wallet,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  },
  {
    id: "documents",
    label: "Documents",
    description: "New documents, signatures required",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    id: "alerts",
    label: "Price Alerts",
    description: "Price targets, market movements",
    icon: TrendingUp,
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  },
  {
    id: "rewards",
    label: "Rewards & Referrals",
    description: "Referral bonuses, loyalty rewards",
    icon: Gift,
    color: "text-pink-600",
    bgColor: "bg-pink-100"
  },
  {
    id: "security",
    label: "Security & Account",
    description: "Login alerts, security updates",
    icon: Shield,
    color: "text-slate-600",
    bgColor: "bg-slate-100"
  }
];

const channels = [
  { id: "email", label: "Email", icon: Mail, description: "Daily digest" },
  { id: "push", label: "Push", icon: Smartphone, description: "Instant alerts" },
  { id: "inApp", label: "In-App", icon: Monitor, description: "Activity feed" }
];

export const NotificationPreferencesPanel = ({ 
  open, 
  onOpenChange 
}: NotificationPreferencesPanelProps) => {
  const [preferences, setPreferences] = useState<CategoryPreferences>(() => {
    const initial: CategoryPreferences = {};
    categories.forEach(cat => {
      initial[cat.id] = { email: true, push: true, inApp: true };
    });
    return initial;
  });
  const [saving, setSaving] = useState(false);

  const togglePreference = (categoryId: string, channel: keyof ChannelPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [channel]: !prev[categoryId][channel]
      }
    }));
  };

  const toggleAllForChannel = (channel: keyof ChannelPreferences) => {
    const allEnabled = categories.every(cat => preferences[cat.id][channel]);
    setPreferences(prev => {
      const updated: CategoryPreferences = {};
      categories.forEach(cat => {
        updated[cat.id] = {
          ...prev[cat.id],
          [channel]: !allEnabled
        };
      });
      return updated;
    });
  };

  const isChannelAllEnabled = (channel: keyof ChannelPreferences) => {
    return categories.every(cat => preferences[cat.id][channel]);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaving(false);
    toast.success("Notification preferences saved");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0 gap-0 border-slate-200 bg-white">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Bell className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                Notification Preferences
              </DialogTitle>
              <p className="text-sm text-slate-500 mt-0.5">
                Customize how you receive updates
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-180px)]">
          {/* Quick Toggle Row */}
          <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Quick toggles</span>
              <div className="flex items-center gap-6">
                {channels.map((channel) => (
                  <motion.button
                    key={channel.id}
                    onClick={() => toggleAllForChannel(channel.id as keyof ChannelPreferences)}
                    className="flex flex-col items-center gap-1.5 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                      isChannelAllEnabled(channel.id as keyof ChannelPreferences)
                        ? "bg-violet-100 text-violet-600"
                        : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                    )}>
                      <channel.icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium transition-colors",
                      isChannelAllEnabled(channel.id as keyof ChannelPreferences)
                        ? "text-violet-600"
                        : "text-slate-500"
                    )}>
                      {channel.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="px-6 py-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Category Icon */}
                      <motion.div 
                        className={cn(
                          "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
                          category.bgColor
                        )}
                      >
                        <category.icon className={cn("w-5 h-5", category.color)} strokeWidth={1.75} />
                      </motion.div>

                      {/* Category Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-slate-900">
                            {category.label}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">
                          {category.description}
                        </p>

                        {/* Channel Toggles */}
                        <div className="flex items-center gap-6">
                          {channels.map((channel) => (
                            <label 
                              key={channel.id}
                              className="flex items-center gap-2 cursor-pointer group/toggle"
                            >
                              <Switch
                                checked={preferences[category.id][channel.id as keyof ChannelPreferences]}
                                onCheckedChange={() => togglePreference(category.id, channel.id as keyof ChannelPreferences)}
                                className="data-[state=checked]:bg-violet-500 data-[state=unchecked]:bg-slate-200"
                              />
                              <div className="flex items-center gap-1.5">
                                <channel.icon className={cn(
                                  "w-3.5 h-3.5 transition-colors",
                                  preferences[category.id][channel.id as keyof ChannelPreferences]
                                    ? "text-slate-600"
                                    : "text-slate-400"
                                )} />
                                <span className={cn(
                                  "text-xs font-medium transition-colors",
                                  preferences[category.id][channel.id as keyof ChannelPreferences]
                                    ? "text-slate-700"
                                    : "text-slate-400"
                                )}>
                                  {channel.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pro tip */}
          <div className="px-6 pb-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Pro tip</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Enable push notifications to never miss important investment updates and price alerts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-slate-300 text-slate-700"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-violet-600 hover:bg-violet-700 text-white gap-2 min-w-[100px]"
          >
            {saving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
              />
            ) : (
              <>
                <Check className="w-4 h-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
