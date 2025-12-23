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
      className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">My Investments</h3>
          <button className="p-1">
            <Info className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>
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
            className="relative mb-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-slate-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h4 className="text-sm font-semibold text-slate-800 mb-2">
              No Investments Yet
            </h4>
            <p className="text-xs text-slate-400 mb-5 max-w-[200px] leading-relaxed">
              Your investment history and project details will appear here.
            </p>
          </motion.div>

          <Link to="/live-deals">
            <Button 
              variant="outline"
              size="sm"
              className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 h-9 px-4 text-xs font-medium transition-all duration-200 group"
            >
              Explore Deals
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};
