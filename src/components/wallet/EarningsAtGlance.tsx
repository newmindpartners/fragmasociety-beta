import { Clock, TrendingUp, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { EarningsDetailsDrawer } from "./EarningsDetailsDrawer";

interface EarningsAtGlanceProps {
  inProgress?: number;
  upcomingThisMonth?: number;
}

export const EarningsAtGlance = ({
  inProgress = 89.10,
  upcomingThisMonth = 78.10,
}: EarningsAtGlanceProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Your earnings at a glance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* In Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/60 p-6"
          >
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            
            <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold mb-2">
              In Progress
            </p>
            
            <p className="text-4xl font-bold text-slate-800 tracking-tight mb-1">
              €{inProgress.toFixed(2)}
            </p>
            
            <p className="text-sm text-slate-500">
              Distributions being processed
            </p>
            
            <button
              onClick={() => setDetailsOpen(true)}
              className="mt-4 text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors font-medium"
            >
              View details <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Upcoming This Month Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50/50 border border-violet-200/60 p-6"
          >
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-violet-600" />
              </div>
            </div>
            
            <p className="text-xs text-violet-700 uppercase tracking-wider font-semibold mb-2">
              Upcoming This Month
            </p>
            
            <p className="text-4xl font-bold text-slate-800 tracking-tight mb-1">
              €{upcomingThisMonth.toFixed(2)}
            </p>
            
            <p className="text-sm text-slate-500">
              Based on your current holdings
            </p>
          </motion.div>
        </div>
      </div>

      <EarningsDetailsDrawer 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen}
        inProgressAmount={inProgress}
      />
    </>
  );
};
