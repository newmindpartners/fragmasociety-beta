import { useState } from "react";
import { Eye, Users, TrendingUp, Mail, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface PrivacyOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

export const PrivacySection = () => {
  const [options, setOptions] = useState<PrivacyOption[]>([
    { id: "profile_visibility", label: "Profile Visibility", description: "Show your profile to other investors", icon: Users, enabled: false },
    { id: "activity_feed", label: "Activity Feed", description: "Display your investment activity publicly", icon: TrendingUp, enabled: false },
    { id: "marketing_emails", label: "Marketing Emails", description: "Receive promotional content and offers", icon: Mail, enabled: true },
    { id: "analytics", label: "Analytics & Improvements", description: "Help us improve with anonymous usage data", icon: FileText, enabled: true },
  ]);

  const toggleOption = (id: string) => {
    setOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
    ));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Control how your data is used and who can see your activity.
      </p>

      <div className="space-y-2">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
                <option.icon className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{option.label}</p>
                <p className="text-xs text-slate-500">{option.description}</p>
              </div>
            </div>
            <Switch
              checked={option.enabled}
              onCheckedChange={() => toggleOption(option.id)}
              className="data-[state=checked]:bg-violet-500"
            />
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-red-50 border border-red-200">
        <h4 className="text-sm font-semibold text-red-900 mb-1">Danger Zone</h4>
        <p className="text-xs text-red-700 mb-3">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline">
          Delete my account
        </button>
      </div>
    </div>
  );
};
