import { motion } from "framer-motion";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
        />
        
        {/* Graph-like decoration */}
        <svg className="absolute bottom-0 right-0 w-2/3 h-32 opacity-20">
          <motion.path
            d="M0,100 Q50,80 100,60 T200,40 T300,30 T400,20"
            fill="none"
            stroke="hsl(172 83% 50%)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1">
          {/* Icon badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-white/80">Referral Program</span>
          </motion.div>

          {/* Heading */}
          <h3 className="text-2xl lg:text-3xl font-serif text-white mb-3">
            Earn{" "}
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="inline-flex items-center px-3 py-1 bg-primary/90 rounded-lg mx-1"
            >
              €10,000
            </motion.span>
            {" "}for Referring a Founder!
          </h3>

          <p className="text-white/60 text-sm lg:text-base max-w-lg leading-relaxed">
            Do you know an inspiring entrepreneur or founder who could benefit from our program? 
            If so, refer them to us, and you could earn a generous €10,000 reward!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            variant="outline"
            className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/30 rounded-full px-6 h-12 font-semibold group transition-all duration-300"
          >
            Learn How To Qualify
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
