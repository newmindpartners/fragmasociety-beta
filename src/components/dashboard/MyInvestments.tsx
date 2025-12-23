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
      className="bg-card rounded-xl border border-border p-4 shadow-sm max-h-[320px] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-foreground">My Investments</h3>
        <button className="p-0.5">
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      {hasInvestments ? (
        <div className="space-y-3">
          {/* Investment items would go here */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-3 text-center">
          {/* Empty State */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="mb-3"
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-1">
              You Haven't Made Any Investments Yet
            </h4>
            <p className="text-xs text-muted-foreground mb-3 max-w-[220px] leading-relaxed">
              Explore our guide to get started with investing today!
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
