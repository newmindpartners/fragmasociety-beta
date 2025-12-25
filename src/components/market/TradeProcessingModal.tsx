import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface TradeProcessingModalProps {
  open: boolean;
}

export const TradeProcessingModal = ({ open }: TradeProcessingModalProps) => {
  return (
    <Dialog open={open}>
      <DialogContent 
        className="sm:max-w-[420px] p-8 text-center bg-white border border-slate-200 shadow-2xl rounded-2xl"
        hideClose
      >
        {/* Animated Loader */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              className="w-20 h-20 rounded-full border-4 border-slate-100"
              style={{ borderTopColor: 'hsl(var(--primary))' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner pulse */}
            <motion.div
              className="absolute inset-2 rounded-full bg-primary/5"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Transaction in progress...
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Your transaction is being processed.
          <br />
          This may take a few moments.
        </p>
        
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        
        <p className="text-xs text-slate-400">
          Don't close the window
        </p>
      </DialogContent>
    </Dialog>
  );
};
