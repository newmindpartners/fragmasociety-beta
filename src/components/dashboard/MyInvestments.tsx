import { motion } from "framer-motion";
import { Info, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const MyInvestments = () => {
  const hasInvestments = false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-xl border border-border p-6 shadow-sm h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">My Investments</h3>
          <button className="p-0.5">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Active Investments</span>
          <span className="text-sm font-bold text-foreground bg-accent px-2 py-0.5 rounded-md">0</span>
        </div>
      </div>

      {hasInvestments ? (
        <div className="space-y-3 flex-1">
          {/* Investment items would go here */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          {/* Empty State */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="mb-4"
          >
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h4 className="text-base font-semibold text-foreground mb-2">
              You Haven't Made Any Investments Yet
            </h4>
            <p className="text-sm text-muted-foreground mb-5 max-w-[280px] leading-relaxed">
              This is where your investment history and project details will appear. Explore our guide to get started with investing today!
            </p>
          </motion.div>

          <Link to="/live-deals">
            <Button 
              variant="outline"
              size="sm"
              className="rounded-full h-10 px-6 text-sm font-medium border-border text-foreground hover:bg-accent hover:text-primary hover:border-primary/40 transition-all duration-200 group"
            >
              Explore Deals
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};
