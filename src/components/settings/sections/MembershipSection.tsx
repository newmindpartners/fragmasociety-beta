import { motion } from "framer-motion";
import { Crown, Check, Zap, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MembershipTier {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isCurrent: boolean;
  isPopular?: boolean;
}

const tiers: MembershipTier[] = [
  {
    id: "explorer",
    name: "Explorer",
    price: "Free",
    period: "",
    features: ["1 deal per year (up to $3,000)", "Basic portfolio tracking", "Email support"],
    isCurrent: false
  },
  {
    id: "premium",
    name: "Premium",
    price: "$49",
    period: "/month",
    features: ["3 deals per year (up to $10,000)", "Advanced analytics", "Priority support", "Early access"],
    isCurrent: true,
    isPopular: true
  },
  {
    id: "elite",
    name: "Elite",
    price: "$199",
    period: "/month",
    features: ["Unlimited deals", "Off-market opportunities", "Dedicated advisor", "VIP events access"],
    isCurrent: false
  }
];

export const MembershipSection = () => {
  const currentTier = tiers.find(t => t.isCurrent);

  return (
    <div className="space-y-6">
      {/* Current Plan Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{currentTier?.name} Plan</h4>
                <Badge className="bg-white/20 text-white hover:bg-white/20 text-[10px]">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-white/80">Renews on February 15, 2025</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
            Manage Billing
          </Button>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative p-4 rounded-xl border transition-all",
              tier.isCurrent 
                ? "bg-violet-50 border-violet-300 shadow-md" 
                : "bg-white border-slate-200 hover:border-slate-300"
            )}
          >
            {tier.isPopular && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <Badge className="bg-violet-600 text-white hover:bg-violet-600 text-[10px] gap-1">
                  <Star className="w-3 h-3" />
                  Popular
                </Badge>
              </div>
            )}
            
            <div className="text-center mb-4 pt-2">
              <h4 className="text-lg font-bold text-slate-900">{tier.name}</h4>
              <div className="mt-1">
                <span className="text-2xl font-bold text-slate-900">{tier.price}</span>
                <span className="text-sm text-slate-500">{tier.period}</span>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            {tier.isCurrent ? (
              <Button disabled className="w-full text-xs bg-slate-200 text-slate-500">
                Current Plan
              </Button>
            ) : (
              <Button 
                variant={tier.id === "elite" ? "default" : "outline"}
                className={cn(
                  "w-full text-xs gap-1",
                  tier.id === "elite" && "bg-violet-600 hover:bg-violet-700"
                )}
              >
                {tier.id === "explorer" ? "Downgrade" : "Upgrade"}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
