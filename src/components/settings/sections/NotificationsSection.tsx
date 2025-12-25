import { useState } from "react";
import { Bell, Mail, Smartphone, Monitor, Building2, Wallet, FileText, TrendingUp, Gift, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface NotificationCategory {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const categories: NotificationCategory[] = [
  { id: "investments", label: "Investments", description: "New deals, confirmations", icon: Building2, color: "text-violet-600", bgColor: "bg-violet-100" },
  { id: "payouts", label: "Payouts & Earnings", description: "Distributions, dividends", icon: Wallet, color: "text-emerald-600", bgColor: "bg-emerald-100" },
  { id: "documents", label: "Documents", description: "New documents, signatures", icon: FileText, color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: "alerts", label: "Price Alerts", description: "Price targets, movements", icon: TrendingUp, color: "text-amber-600", bgColor: "bg-amber-100" },
  { id: "rewards", label: "Rewards & Referrals", description: "Bonuses, loyalty rewards", icon: Gift, color: "text-pink-600", bgColor: "bg-pink-100" },
  { id: "security", label: "Security & Account", description: "Login alerts, updates", icon: Shield, color: "text-slate-600", bgColor: "bg-slate-200" },
];

type ChannelPrefs = { email: boolean; push: boolean; inApp: boolean };
type CategoryPrefs = Record<string, ChannelPrefs>;

export const NotificationsSection = () => {
  const [preferences, setPreferences] = useState<CategoryPrefs>(() => {
    const initial: CategoryPrefs = {};
    categories.forEach(cat => {
      initial[cat.id] = { email: true, push: true, inApp: true };
    });
    return initial;
  });

  const togglePreference = (categoryId: string, channel: keyof ChannelPrefs) => {
    setPreferences(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [channel]: !prev[categoryId][channel]
      }
    }));
  };

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-end gap-8 pr-2 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-1.5 w-16 justify-center">
          <Mail className="w-3.5 h-3.5" />
          Email
        </div>
        <div className="flex items-center gap-1.5 w-16 justify-center">
          <Smartphone className="w-3.5 h-3.5" />
          Push
        </div>
        <div className="flex items-center gap-1.5 w-16 justify-center">
          <Monitor className="w-3.5 h-3.5" />
          In-App
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", category.bgColor)}>
                <category.icon className={cn("w-4 h-4", category.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{category.label}</p>
                <p className="text-xs text-slate-500">{category.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="w-16 flex justify-center">
                <Switch
                  checked={preferences[category.id].email}
                  onCheckedChange={() => togglePreference(category.id, "email")}
                  className="data-[state=checked]:bg-violet-500"
                />
              </div>
              <div className="w-16 flex justify-center">
                <Switch
                  checked={preferences[category.id].push}
                  onCheckedChange={() => togglePreference(category.id, "push")}
                  className="data-[state=checked]:bg-violet-500"
                />
              </div>
              <div className="w-16 flex justify-center">
                <Switch
                  checked={preferences[category.id].inApp}
                  onCheckedChange={() => togglePreference(category.id, "inApp")}
                  className="data-[state=checked]:bg-violet-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
