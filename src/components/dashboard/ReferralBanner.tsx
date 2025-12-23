import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-xl border border-border p-6 shadow-sm h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-semibold text-foreground">Referral Program</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        Invite friends and earn <span className="font-semibold text-primary">$100</span> when they make their first investment.
      </p>

      <Button 
        variant="outline"
        className="rounded-full px-5 h-9 font-medium group border-border text-foreground hover:bg-accent hover:text-primary hover:border-primary/40 transition-all duration-200"
      >
        Refer a Friend
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};
