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
      className="bg-card rounded-xl border border-border p-6 h-full shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <h3 className="text-sm font-semibold text-foreground">My Investments</h3>
        <button className="p-0.5">
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      {hasInvestments ? (
        <div className="space-y-4">
          {/* Investment items would go here */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center">
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
            <h4 className="text-sm font-semibold text-foreground mb-2">
              You Haven't Made Any Investments Yet
            </h4>
            <p className="text-xs text-muted-foreground mb-5 max-w-[220px] leading-relaxed">
              This is where your investment history and project details will appear. Explore our guide to get started with investing today!
            </p>
          </motion.div>

          <Link to="/live-deals">
            <Button 
              variant="outline"
              size="sm"
              className="rounded-full h-9 px-5 text-xs font-medium border-border text-foreground hover:bg-accent hover:text-primary hover:border-primary/40 transition-all duration-200 group"
            >
              Explore
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};
