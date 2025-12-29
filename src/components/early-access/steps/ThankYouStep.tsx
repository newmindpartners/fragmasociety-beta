import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ThankYouStepProps {
  onClose: () => void;
}

export function ThankYouStep({ onClose }: ThankYouStepProps) {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-20 h-20 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-10 h-10 text-violet-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-light text-white mb-4"
      >
        You're on the list
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/60 text-lg mb-8 max-w-md mx-auto"
      >
        We'll review your profile and notify you when your eligible opportunities open.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Button
          onClick={onClose}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 rounded-full px-6"
        >
          Close
        </Button>
        <Button
          asChild
          className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-6"
        >
          <a href="https://t.me/+BGJB5RBN2wAwODY0" target="_blank" rel="noopener noreferrer">
            Join Community
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-white/40 mt-8"
      >
        Capital at risk. Access depends on eligibility and jurisdiction.
      </motion.p>
    </div>
  );
}
