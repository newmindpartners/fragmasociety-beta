import { motion } from "framer-motion";
import { Info, ArrowRight, LineChart, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const MyInvestments = () => {
  const hasInvestments = false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-900 font-sans">My Investments</h3>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1"
          >
            <Info className="w-4 h-4 text-slate-400" />
          </motion.button>
        </div>
      </div>

      {hasInvestments ? (
        <div className="space-y-4">
          {/* Investment items would go here */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          {/* Empty State Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center border border-slate-200/50">
              <Briefcase className="w-10 h-10 text-slate-300" />
            </div>
            {/* Decorative dots */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/50"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-accent/50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h4 className="text-base font-semibold text-slate-900 mb-2">
              You Haven't Made Any Investments Yet
            </h4>
            <p className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
              This is where your investment history and project details will appear. 
              Explore our guide to get started with investing today!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/live-deals">
              <Button 
                variant="outline"
                className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-primary hover:text-primary transition-all duration-300 group"
              >
                Explore
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
