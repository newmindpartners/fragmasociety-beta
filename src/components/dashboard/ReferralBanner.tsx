import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative rounded-xl bg-card border border-border p-6 h-full flex items-center shadow-sm overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-10">
        <svg 
          viewBox="0 0 200 150" 
          className="w-[160px] h-[120px]"
          fill="none"
        >
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1={20 + i * 14}
              y1={75 - 20 - Math.sin(i * 0.5) * 30}
              x2={20 + i * 14}
              y2={75 + 20 + Math.sin(i * 0.5) * 30}
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4 + i * 0.02, duration: 0.5 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4 w-full">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg lg:text-xl font-serif text-foreground mb-2 whitespace-nowrap">
            Earn{" "}
            <span className="inline-flex items-center px-2 py-0.5 bg-primary text-white rounded-md font-semibold text-base">
              $100
            </span>
            {" "}to refer a friend
          </h3>
          <p className="text-muted-foreground text-sm leading-snug">
            Invite friends and earn $100 when they invest.
          </p>
        </div>

        <Button 
          variant="outline"
          className="rounded-full px-5 h-9 font-medium group border-border text-foreground hover:bg-accent hover:text-primary hover:border-primary/40 transition-all duration-200 flex-shrink-0"
        >
          Refer a Friend
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};
