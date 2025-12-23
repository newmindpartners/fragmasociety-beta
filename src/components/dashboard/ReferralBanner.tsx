import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className="relative overflow-hidden rounded-xl bg-white border border-slate-200 p-6 lg:p-8 h-full flex items-center cursor-pointer transition-shadow duration-300 hover:shadow-lg hover:border-slate-300"
    >
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 w-full">
        {/* Icon */}
        <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 border border-teal-100 flex-shrink-0">
          <Gift className="w-6 h-6 text-teal-600" />
        </div>

        <div className="flex-1">
          {/* Heading */}
          <h3 className="text-xl lg:text-2xl font-serif text-slate-900 mb-2">
            Earn{" "}
            <span className="inline-flex items-center px-3 py-1 bg-teal-500 text-white rounded-md font-semibold text-lg">
              $100
            </span>
            {" "}to refer a friend
          </h3>

          <p className="text-slate-500 text-sm max-w-md leading-relaxed">
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
            className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-full px-5 h-10 font-medium group transition-all duration-200"
          >
            Refer a Friend
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
