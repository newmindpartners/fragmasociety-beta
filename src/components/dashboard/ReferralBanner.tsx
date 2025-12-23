import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-xl bg-card border border-border p-8 h-full shadow-sm"
    >
      {/* Decorative bar chart pattern */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-end gap-1.5 h-32 pointer-events-none">
        {[40, 65, 35, 80, 50, 95, 45, 70, 55, 85, 30, 75, 60, 90, 42, 68, 38, 82].map((height, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4 + i * 0.03, duration: 0.4, ease: "easeOut" }}
            className="w-1.5 rounded-full bg-primary/20 origin-bottom"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="max-w-sm">
          {/* Heading */}
          <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-1 leading-tight">
            Earn{" "}
            <span className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground rounded-lg font-semibold text-xl lg:text-2xl">
              $100
            </span>
          </h3>
          <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-4 leading-tight">
            to refer a friend
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed">
            Know someone who could benefit from Fragma? Refer a friend and earn $100 when they make their first investment.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex-shrink-0"
        >
          <Button 
            variant="outline"
            className="rounded-full px-6 h-11 font-medium group border-border text-foreground hover:bg-accent hover:text-primary hover:border-primary/40 transition-all duration-200"
          >
            Refer a Friend
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
