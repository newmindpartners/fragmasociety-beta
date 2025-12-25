import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Key, 
  Smartphone, 
  Monitor, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const recentLogins = [
  { device: "MacBook Pro", location: "Zurich, Switzerland", time: "2 hours ago", current: true },
  { device: "iPhone 15 Pro", location: "Geneva, Switzerland", time: "Yesterday" },
  { device: "Chrome on Windows", location: "Paris, France", time: "3 days ago" },
];

export const SecuritySection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
              <Key className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Password</h4>
              <p className="text-xs text-slate-500">Last changed 45 days ago</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Change Password
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className={cn(
        "p-4 rounded-xl border transition-colors",
        twoFactorEnabled 
          ? "bg-emerald-50 border-emerald-200" 
          : "bg-amber-50 border-amber-200"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              twoFactorEnabled ? "bg-emerald-200" : "bg-amber-200"
            )}>
              <Smartphone className={cn(
                "w-5 h-5",
                twoFactorEnabled ? "text-emerald-600" : "text-amber-600"
              )} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-slate-900">Two-Factor Authentication</h4>
                {twoFactorEnabled ? (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px]">
                    Enabled
                  </Badge>
                ) : (
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px]">
                    Recommended
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {twoFactorEnabled 
                  ? "Your account is protected with 2FA" 
                  : "Add an extra layer of security to your account"
                }
              </p>
            </div>
          </div>
          <Switch 
            checked={twoFactorEnabled} 
            onCheckedChange={setTwoFactorEnabled}
            className="data-[state=checked]:bg-emerald-500"
          />
        </div>
      </div>

      {/* Recent Login Activity */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Recent Login Activity</h4>
        <div className="space-y-2">
          {recentLogins.map((login, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-3 rounded-xl border flex items-center justify-between",
                login.current ? "bg-violet-50 border-violet-200" : "bg-white border-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center",
                  login.current ? "bg-violet-200" : "bg-slate-100"
                )}>
                  <Monitor className={cn(
                    "w-4 h-4",
                    login.current ? "text-violet-600" : "text-slate-500"
                  )} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{login.device}</p>
                    {login.current && (
                      <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100 text-[10px]">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3 h-3" />
                    {login.location}
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    {login.time}
                  </div>
                </div>
              </div>
              {!login.current && (
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs">
                  Revoke
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
