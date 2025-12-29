import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeStepProps {
  onStart: () => void;
}

export function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center mx-auto mb-6"
      >
        <Sparkles className="w-8 h-8 text-violet-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-light text-white mb-4"
      >
        Get early access to Fragma
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/60 text-lg mb-8 max-w-md mx-auto"
      >
        Tell us what you're looking to invest in (≈60 seconds). We'll match you with eligible deals and notify you when access opens.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={onStart}
          size="lg"
          className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8 h-14 text-base font-medium"
        >
          Start
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-white/40 mt-6"
      >
        Capital at risk. Access depends on eligibility and jurisdiction.
      </motion.p>
    </div>
  );
}
