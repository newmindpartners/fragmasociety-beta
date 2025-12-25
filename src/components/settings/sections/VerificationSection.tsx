import { motion } from "framer-motion";
import { CheckCircle2, Clock, Upload, AlertCircle, FileText, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VerificationStep {
  id: string;
  label: string;
  description: string;
  status: "complete" | "pending" | "incomplete";
  icon: React.ElementType;
}

const steps: VerificationStep[] = [
  { id: "email", label: "Email Verification", description: "Confirm your email address", status: "complete", icon: CheckCircle2 },
  { id: "identity", label: "Identity Verification", description: "Upload government-issued ID", status: "complete", icon: User },
  { id: "address", label: "Proof of Address", description: "Recent utility bill or bank statement", status: "pending", icon: FileText },
  { id: "investor", label: "Investor Accreditation", description: "Professional investor status", status: "incomplete", icon: Building },
];

const statusConfig = {
  complete: { color: "text-emerald-600", bg: "bg-emerald-100", badge: "Verified", badgeColor: "bg-emerald-100 text-emerald-700" },
  pending: { color: "text-amber-600", bg: "bg-amber-100", badge: "In Review", badgeColor: "bg-amber-100 text-amber-700" },
  incomplete: { color: "text-slate-400", bg: "bg-slate-100", badge: "Required", badgeColor: "bg-slate-100 text-slate-600" },
};

export const VerificationSection = () => {
  const completedSteps = steps.filter(s => s.status === "complete").length;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Verification Progress</h4>
          <p className="text-xs text-slate-500 mt-0.5">{completedSteps} of {steps.length} steps complete</p>
        </div>
        <div className="flex items-center gap-1">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={cn(
                "w-8 h-2 rounded-full transition-colors",
                step.status === "complete" ? "bg-emerald-500" :
                step.status === "pending" ? "bg-amber-400" : "bg-slate-200"
              )}
            />
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const config = statusConfig[step.status];
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-colors",
                step.status === "complete" ? "bg-emerald-50/50 border-emerald-200" :
                step.status === "pending" ? "bg-amber-50/50 border-amber-200" :
                "bg-white border-slate-200 hover:border-slate-300"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.bg)}>
                  <Icon className={cn("w-5 h-5", config.color)} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{step.label}</p>
                    <Badge className={cn("text-[10px]", config.badgeColor, "hover:" + config.badgeColor)}>
                      {config.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
              </div>
              {step.status === "incomplete" && (
                <Button size="sm" className="gap-2 bg-violet-600 hover:bg-violet-700 text-xs">
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                </Button>
              )}
              {step.status === "pending" && (
                <div className="flex items-center gap-1.5 text-xs text-amber-600">
                  <Clock className="w-3.5 h-3.5" />
                  Under review
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
