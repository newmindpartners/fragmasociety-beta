import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 lg:p-8 h-full"
    >
      {/* Subtle gradient accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-violet-900/20 rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 h-full">
        <div className="flex-1">
          {/* Icon badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4"
          >
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-xs font-medium text-white/70">Referral Program</span>
          </motion.div>

          {/* Heading */}
          <h3 className="text-xl lg:text-2xl font-serif text-white mb-3">
            Earn{" "}
            <span className="inline-flex items-center px-2.5 py-0.5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg border border-slate-500/30">
              €10,000
            </span>
            {" "}for Referring a Founder!
          </h3>

          <p className="text-white/50 text-sm max-w-md leading-relaxed">
            Know an inspiring entrepreneur? Refer them to us and earn a generous €10,000 reward when they join.
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
            className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 rounded-full px-5 h-10 font-medium group transition-all duration-200"
          >
            Learn How To Qualify
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
